import { Schema, model } from "mongoose";

const nfcSchema = new Schema(
  {
    nfcCode: {
      type: String,
    },
    uniqueCode: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const NFCModel = model("NFC", nfcSchema);
export default NFCModel;
