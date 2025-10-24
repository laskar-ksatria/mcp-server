import { Schema, model } from "mongoose";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const customerSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email cannot be empty!"],
      index: true,
      validate: [
        {
          validator: function (value) {
            return emailRegex.test(value);
          },
          message: (props) =>
            `${props.value} is not valid email, please fill email correctly`,
        },
        {
          validator: function (value) {
            return this.model("Customer")
              .findOne({ email: value })
              .then(function (email) {
                if (email) {
                  return false;
                } else {
                  return true;
                }
              });
          },
          message: (props) =>
            `${props.value} already taken, please take another one`,
        },
      ],
    },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phone: { type: String, default: null },
    shopifyToken: { type: String, default: null },
    productCollections: {
      type: [Schema.Types.ObjectId],
      ref: "Collections",
    },
    availableContent: {
      type: [String],
      default: [],
    },
    isLogin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "minutes",
    },
  }
);

const CustomerModel = model("Customer", customerSchema);

export default CustomerModel;
