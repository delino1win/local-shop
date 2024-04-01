import mongoose, { Schema } from "mongoose";
import User from "./user";

const ProductSchema = new Schema<Product>(
  {
    userId: { //The id of the person who creates the product which is SELLER
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
    },
    categories: {
      _id: false,
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    images: {
      _id: false,
      type: [String],
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.virtual("user", {
  ref: User, // reference schema
  localField: "userId", // field di schema ini
  foreignField: "userId", // field di reference schema
  justOne: true, // ambil cuma 1 data (kalau false return Array)
});

const Product: mongoose.Model<Product> =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
