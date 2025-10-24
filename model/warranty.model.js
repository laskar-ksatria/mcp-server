import { Schema, model } from "mongoose";

export const EWarrantyStatusEnum = {
  ACTIVE: "ACTIVE",
  PROCESSING: "IN PROCESS",
  REVIEW: "IN REVIEW",
  SENDING: "SENDING",
  EXPIRED: "EXPIRED",
  CLAIMED: "USED",
  APPROVED: "APPROVED",
};
const contactDetailsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const warrantySchema = new Schema(
  {
    claimer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productCollection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
      index: true,
    },
    damageType: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    contactDetails: {
      type: contactDetailsSchema,
      required: true,
    },
    requestDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const WarrantyModel = model("Warranty", warrantySchema);

export default WarrantyModel;
