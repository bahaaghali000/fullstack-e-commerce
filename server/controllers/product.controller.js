const Product = require("../models/product.model");
const cloudinary = require("cloudinary").v2;
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createProduct = asyncErrorHandler(async (req, res) => {
  const { category, description, photoBase64, price, productName, shortDesc } =
    req.body;

  const photo = await cloudinary.uploader.upload(photoBase64);

  const newProduct = await Product.create({
    category,
    description,
    imgUrl: photo.url,
    price,
    productName,
    shortDesc,
  });

  await newProduct.save();

  return res.status(200).json({ status: "success", data: newProduct });
});

const getAllProducts = asyncErrorHandler(async (req, res) => {
  let query = {};
  let sort = {};

  if (req.query.search !== undefined) {
    query = {
      ...query,
      $or: [
        {
          productName: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ],
    };
  }

  if (req.query.category !== undefined) {
    query = {
      ...query,
      category: {
        $regex: req.query.category,
        $options: "i",
      },
    };
  }

  if (req.query.sorting !== undefined) {
    if (req.query.sorting === "ascending") {
      sort.price = "asc";
    } else if (req.query.sorting === "descending") {
      sort.price = "desc";
    } else {
      sort = {};
    }
  }

  const products = await Product.find(query).sort(sort);

  res.status(200).json({ status: "success", data: products });
});

const getProduct = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }
  res.status(200).json({ status: "success", data: product });
});

const updateProduct = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product does not exist" });
  }

  const result = req.body.photoBase64
    ? await cloudinary.uploader.upload(req.body.photoBase64)
    : "";

  const updatedProduct = await Product.findByIdAndUpdate(product._id, {
    ...req.body,
    imgUrl: result?.url,
  });

  return res
    .status(200)
    .json({ status: "success", message: "Product Updated successfully" });
});

const deleteProduct = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.status(200).json({ msg: "product is deleted successfully" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
