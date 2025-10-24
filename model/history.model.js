import { Schema, model } from "mongoose";

const historySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
    },
    productCollection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      index: true,
    },
    nfcCode: {
      type: String,
      index: true,
    },
    uniqueCode: {
      type: String,
      index: true,
    },
    owningSince: {
      type: String,
    },
    lastOwned: {
      type: String,
      default: "current",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const HistoryModel = model("History", historySchema);
export default HistoryModel;
