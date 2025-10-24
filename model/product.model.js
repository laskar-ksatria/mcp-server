import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    uturnTitle: { type: String, index: true },
    shopifySlug: { type: String },
    shopifyTitle: { type: String },
    jubelioTitle: { type: String },
    color: { type: String, index: true },
    sku: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;
