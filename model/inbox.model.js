import { Schema, model } from "mongoose";

export const inboxMessage = {
  welcome: {
    title: "WELCOME TO COMPASS® FAMILY!",
    description:
      "Start your collection by scanning NFC tags attached to your Compass shoes.",
  },
};

export const SendingStatusEnum = {
  ACTIVE: "ACTIVE",
  ACCEPT: "ACCEPT",
  REJECT: "REJECT",
  EXPIRED: "EXPIRED",
};

export const typeInboxEnum = {
  GENERAL: "GENERAL",
  TRANSFER: "TRANSFER",
  WARRANTY: "WARRANTY",
};

const inboxSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title are required!"],
    },
    description: {
      type: String,
      required: [true, "Description are required!"],
    },
    description2: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      index: true,
    },
    transferProduct: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
    },
    acceptTransfer: {
      type: Boolean,
    },
    sendingStatus: {
      type: String,
    },
    statusInboxWarranty: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: typeInboxEnum.GENERAL,
    },
    createdAt: {
      type: Date,
      default: null,
    },
    showCta: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const InboxModel = model("Inbox", inboxSchema);

export default InboxModel;
