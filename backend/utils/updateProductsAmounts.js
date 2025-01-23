import Product from "../models/productModel.js";

const updateProductsAmounts = async (order) => {
  order.orderItems.forEach(async (item) => {
    const product = await Product.findOne({ _id: item.product });
    product.countInStock = product.countInStock - item.qty;
    await product.save();
  });
};

export default updateProductsAmounts;
