import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createProduct = async (req, res) => {
  const { productName, unitsOfMeasure } = req.body;

  if (!productName || !unitsOfMeasure) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  req.body.createdByClient = req.user.client;
  console.log("Request body is", req.body);

  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const { sort, productName, unitsOfMeasure, all } = req.query;

  const queryObject = {
    createdByClient: req.user.client,
  };
  // add stuff based on condition

  if (!all) {
    if (productName) {
      queryObject.productName = { $regex: productName, $options: "i" };
    }
    if (unitsOfMeasure) {
      queryObject.unitsOfMeasure = { $regex: unitsOfMeasure, $options: "i" };
    }
    // NO AWAIT
  }

  let result = Product.find(queryObject);

  // chain sort conditions

  if (sort === "Latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "Oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "Ascending") {
    result = result.sort("name");
  }
  if (sort === "Descending") {
    result = result.sort("-name");
  }

  if (!all) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const products = await result;

    const totalCustomers = await Product.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalCustomers / limit);
    res.status(StatusCodes.OK).json({ products, totalCustomers, numOfPages });
  } else {
    const products = await result;

    res.status(StatusCodes.OK).json({ products });
  }

  // setup pagination
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { productName, unitsOfMeasure } = req.body;

  if (!productName || !unitsOfMeasure) {
    throw new BadRequestError("Please provide all values");
  }
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id :${productId}`);
  }
  // check permissions

  checkPermissions(req.user.client, product.createdByClient);

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedProduct });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No customer with id :${productId}`);
  }

  checkPermissions(req.user.client, product.createdByClient);

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Product removed" });
};

export { createProduct, deleteProduct, getAllProducts, updateProduct };
