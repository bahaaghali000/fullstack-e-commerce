const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const APIFeatures = require("../utils/APIFeatures");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getTrendingProducts = async (req, res, next) => {
  req.query.sort = "-views";
  next();
};

const getBestSalesProducts = async (req, res, next) => {
  req.query.sort = "price";
  next();
};

const createProduct = asyncErrorHandler(async (req, res, next) => {
  const newProduct = await Product.create({
    ...req.body,
    imgUrl: req.file.path,
  });

  return res.status(201).json({
    status: "success",
    data: newProduct,
    message: "Product created successfully",
  });
});

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const searchRegex = new RegExp(req.query.search, "i");
  const searchArr = [{ productName: { $regex: searchRegex } }];

  const limit = parseInt(req.query.limit) || 10;

  const features = new APIFeatures(
    Product.find().populate({
      path: "category",
      select: "categoryName",
    }),
    req.query
  )
    .filter(searchArr)
    .sort()
    .paginate()
    .limitFields();

  const products = await features.query;

  const count = await Product.countDocuments();

  const pages = Math.ceil(count / limit);

  res.status(200).json({
    status: "success",
    data: {
      products,
      totalPages: pages,
      totalProducts: count,
    },
  });
});

const getProduct = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const productAggregation = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "productId",
        as: "ratings",
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: {
            if: { $gt: [{ $size: "$ratings" }, 0] }, // If there are ratings
            then: { $avg: "$ratings.rating" }, // Calculate average
            else: 0, // Else return 0
          },
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },

    {
      $unwind: {
        path: "$categoryDetails",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        productName: 1,
        shortDesc: 1,
        description: 1,
        category: 1,
        price: 1,
        imgUrl: 1,
        views: 1,
        quantity: 1,
        averageRating: 1,
        category: "$categoryDetails",
      },
    },
  ]);

  if (!productAggregation || productAggregation.length === 0)
    return next(new AppError("Product not found", 404));

  let isFavorite = false;

  if (req?.user?._id) {
    const favoriteList = await Favorite.findOne({
      userId: req.user._id,
      items: productId,
    });
    if (favoriteList) isFavorite = true;
  }

  // Increment product views and save it
  await Product.findByIdAndUpdate(productId, { $inc: { views: 1 } });

  res.status(200).json({
    status: "success",
    data: {
      product: productAggregation[0],
      isFavorite,
    },
  });
});

const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) return next(new AppError("Product not found", 404));

  await Product.findByIdAndUpdate(product._id, {
    ...req.body,
    imgUrl: req?.file?.path,
  });

  return res
    .status(200)
    .json({ status: "success", message: "Product Updated successfully" });
});

const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) return next(new AppError("Product not found", 404));

  res
    .status(200)
    .json({ status: "success", message: "product is deleted successfully" });
});

const getRelatedProducts = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) return next(new AppError("Product not found", 404));

  const features = new APIFeatures(
    Product.find({
      category: product.category,
      _id: { $ne: productId },
    }).populate({
      path: "category",
      select: "categoryName",
    }),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const relatedProducts = await features.query;

  res.status(200).json({ status: "success", data: relatedProducts });
});

const getMostViewedProductsByCategory = asyncErrorHandler(
  async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const mostViewedProducts = await Product.aggregate([
      {
        $sort: { views: -1 },
      },
      {
        $group: {
          _id: "$category",
          productData: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      {
        $project: {
          _id: "$productData._id",
          productName: "$productData.productName",
          views: "$productData.views",
          price: "$productData.price",
          imgUrl: "$productData.imgUrl",
          quantity: "$productData.quantity",
          category: "$categoryData",
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({
      status: "success",
      results: mostViewedProducts.length,
      data: mostViewedProducts,
      currentPage: page,
    });
  }
);

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
  getTrendingProducts,
  getBestSalesProducts,
  getMostViewedProductsByCategory,
};
