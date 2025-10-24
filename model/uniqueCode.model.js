import { Schema, model } from "mongoose";

const uniqueCodeSchema = new Schema(
  {
    uniqueCode: {
      type: String,
      required: [true, "Unique Code must not empty"],
      index: true,
      unique: [true, "Unique Code already taken"],
    },
    nfcCode: {
      type: String,
      // index: true,
    },
    isOwning: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const UniqueCodeModel = model("UniqueCode", uniqueCodeSchema);

export default UniqueCodeModel;
