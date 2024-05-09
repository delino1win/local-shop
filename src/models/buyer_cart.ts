import mongoose, { Schema } from "mongoose";
import Product from "./product";

const BuyerCartSchema = new Schema<Cart>({
  // buyerId: mongoose.Types.ObjectId,
  buyerId: String,
  productId: String,
  totalItem: Number
});

BuyerCartSchema.virtual("product", {
  ref: Product, //From source wehere this schema will be populated
  localField: "productId", //this will inherit value from _id in product schema, and regain all data from product with specified _Id
  foreignField: "_id", //from product _id in schema when document/object was created
  justOne: true,
});

const BuyerCart: mongoose.Model<Cart> =
  mongoose.models.BuyerCart || mongoose.model("BuyerCart", BuyerCartSchema);

export default BuyerCart;
