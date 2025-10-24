import { Schema, model } from "mongoose";

export const WarrantyEnum = {
  ACTIVE: "ACTIVE",
  EXPIRING_SOON: "EXPIRING SOON",
  EXPIRED: "EXPIRED",
  CLAIMED: "USED",
  PROCESSING: "PROCESSING",
  INREVIEW: "IN REVIEW",
  APPROVED: "APPROVED",
  DECLINED: "DECLINED",
  REJECTED: "REJECTED",
};

export const CollectionStatusEnum = {
  ACTIVE: "ACTIVE",
  SENDING: "SENDING",
};

const collectionSchema = new Schema(
  {
    nfcCode: {
      type: String,
      required: [true, "NFC code are required!"],
      unique: [true, "Nfc code already claim!"],
    },
    uniqueCode: {
      type: String,
      required: [true, "Unique code are required!"],
      unique: [true, "Unique code already claim!"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    productName: {
      type: String,
      required: [true, "Product Name are required!"],
    },
    productSlug: {
      type: String,
      required: [true, "Product Slug are required!"],
    },
    image: {
      type: String,
      required: [true, "image are required!"],
    },
    warranty: {
      type: Schema.Types.ObjectId,
      ref: "Warranty",
      // localField: '_id',
      // foreignField: 'warrantyId',
      // justOne: true,
    },
    warrantyStatus: {
      type: String,
      default: WarrantyEnum.ACTIVE,
    },
    warrantyInformationStatus: {
      type: String,
      default: WarrantyEnum.ACTIVE,
    },
    warrantyExpired: {
      type: Date,
    },
    // used for transfer owner
    collectionStatus: {
      type: String,
      default: CollectionStatusEnum.ACTIVE,
    },
    sendingExpiredDate: {
      type: Schema.Types.Mixed,
      default: null,
    },
    owningSince: {
      type: String,
    },
    count: {
      type: Number,
      default: 1,
    },
    availableTransfer: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CollectionModel = model("Collections", collectionSchema);

export default CollectionModel;
