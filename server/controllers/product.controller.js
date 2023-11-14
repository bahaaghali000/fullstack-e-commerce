const Product = require("../models/product.model");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res) => {
  const { category, description, photoBase64, price, productName, shortDesc } =
    req.body;

  if (
    !category ||
    !description ||
    !photoBase64 ||
    !price ||
    !productName ||
    !shortDesc
  ) {
    return res.status(404).json({ msg: "all fields are required" });
  }

  try {
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

    res.status(200).json({ data: newProduct });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    res.status(200).json({ data: allProducts });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { category, description, photoBase64, price, productName, shortDesc } =
    req.body;

  try {
    if (photoBase64) {
      const result = await cloudinary.uploader.upload(photoBase64);
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        category,
        description,
        photoBase64,
        price,
        productName,
        shortDesc,
        imgUrl: result.url,
      });

      if (!updatedProduct) {
        return res.status(400).json({ msg: "Product does not exist" });
      }

      res.status(200).json({ data: { updateProduct } });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        category,
        description,
        photoBase64,
        price,
        productName,
        shortDesc,
      });

      if (!updatedProduct) {
        return res.status(400).json({ msg: "Product does not exist" });
      }

      res.status(200).json({ data: { updatedProduct } });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "product is deleted successfully" });
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
