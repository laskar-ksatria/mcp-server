import {
  storefront,
  Q_PRODUCT,
  Q_SINGLE_PRODUCT,
  getUturn,
} from "../lib/storefront.js";
import { calculateWarrantyExpired, monthNames } from "../lib/utils.js";
import CollectionModel from "../model/collection.model.js";
import CustomerModel from "../model/customer.model.js";
import HistoryModel from "../model/history.model.js";
import ProductModel from "../model/product.model.js";
import UniqueCodeModel from "../model/uniqueCode.model.js";

function formatDate(date) {
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
}

const contentResult = (text) => ({ content: [{ type: "text", text }] });

// ===================================================================================== //
// ERROR_HANDLING
// ===================================================================================== //
const errorHandling = (err) => {
  const errors = [];
  if (err.errors) {
    Object.entries(err.errors).forEach(([key, value]) => {
      errors.push({
        [key]: value?.message,
      });
    });
    return JSON.stringify(errors);
  }
  return `Oops, something went wrong. This is error: ${JSON.stringify(err)}`;
};

// SAMPLE
export const getProductData = async ({ slug }) => {
  try {
    const product = await storefront.request(Q_PRODUCT, { handle: slug });
    return contentResult(
      `Success! product: ${JSON.stringify(
        { product: product?.data?.product?.title },
        null,
        2
      )}`
    );
  } catch (error) {
    return contentResult(errorHandling(error));
  }
};

// ===================================================================================== //
// GET_CUSTOMER_INFORMATION
// ===================================================================================== //
export const get_customer_information = async ({ email }) => {
  try {
    const customer = await CustomerModel.findOne({ email }).populate(
      "productCollections"
    );
    return contentResult(`Success! Customer: ${JSON.stringify(customer)}`);
  } catch (error) {
    return contentResult(errorHandling(error));
  }
};

// ===================================================================================== //
// UNPAIR_PRODUCT_COLLECTION
// ===================================================================================== //
export const unpair_product_collection = async ({ unique_code }) => {
  try {
    const collection = await CollectionModel.findOne({
      uniqueCode: unique_code,
    });
    if (!collection) throw new Error("Collection Not Found!");
    const { owner } = collection;
    await Promise.all([
      // Update Owner
      await CustomerModel.updateOne(
        { _id: owner },
        {
          $pull: { productCollections: collection._id },
        }
      ),
      // Update Unique Code
      await UniqueCodeModel.updateOne(
        { uniqueCode: unique_code },
        {
          $unset: { nfcCode: "" },
          isOwning: false,
        }
      ),
      // Delete Collection
      await CollectionModel.deleteOne({ uniqueCode: unique_code }),
    ]);
    // Return
    return contentResult(`Unique Code ${unique_code} unpair successfully`);
  } catch (error) {
    return contentResult(errorHandling(error));
  }
};

// ===================================================================================== //
// ADD_NEW_UNIQUE_CODE
// ===================================================================================== //
export const add_new_unique_code = async ({ unique_code }) => {
  await UniqueCodeModel.create({ uniqueCode: unique_code, isOwning: false });
  return contentResult(`${unique_code} successfully added!`);
};

// ===================================================================================== //
// INJECT_PRODUCT_COLLECTION
// ===================================================================================== //
export const add_product_collection = async ({
  email,
  nfc_code,
  unique_code,
  slug,
}) => {
  try {
    // Validate required parameters
    if (!email || !nfc_code || !unique_code || !slug) {
      return contentResult(
        "Error: All parameters (email, nfc_code, unique_code, slug) are required"
      );
    }

    // UNIQUE_CODE VALIDATION
    const uniqueCode = await UniqueCodeModel.findOne({
      uniqueCode: unique_code,
    });

    if (!uniqueCode) return contentResult(`${unique_code} not found!`);

    if (uniqueCode.isOwning)
      return contentResult(`${uniqueCode} already have owner!`);

    // FETCH PRODUCT & OWNER
    const [fetchProduct, owner, productSku] = await Promise.all([
      storefront.request(Q_SINGLE_PRODUCT, { handle: slug }),
      CustomerModel.findOne({ email }),
      ProductModel.findOne({ slug }),
    ]);

    // Validate owner exists
    if (!owner) {
      return contentResult(`Error: Customer with email ${email} not found`);
    }

    const product = fetchProduct.data?.product;

    // Validate product exists
    if (!product) {
      return contentResult(`Error: Product with slug ${slug} not found`);
    }

    const owningSince = new Date();
    const formattedDate = formatDate(owningSince);

    // CREATE COLLECTION ! IMMPORTANT PART
    const newCollection = await CollectionModel.create({
      nfcCode: nfc_code,
      uniqueCode: unique_code,
      owner: owner._id,
      skuProduct: productSku?.sku || "",
      productName: product?.title,
      productSlug: product?.handle,
      image: product?.pngImage?.reference?.image?.url,
      warrantyExpired: calculateWarrantyExpired(),
      owningSince: formattedDate,
    });

    await Promise.all([
      CustomerModel.findByIdAndUpdate(owner._id, {
        $push: { productCollections: newCollection._id },
      }).exec(),
      HistoryModel.create({
        owner: owner._id,
        productCollection: newCollection._id,
        uniqueCode: unique_code,
        nfcCode: nfc_code,
        owningSince: formattedDate,
      }),
      await UniqueCodeModel.findOneAndUpdate(
        { uniqueCode: unique_code },
        { isOwning: true, nfcCode: nfc_code },
        { new: true }
      ).exec(),
    ]);
    return contentResult(
      `Success! Product ${product?.title} successfully added!`
    );
  } catch (error) {
    console.log(error);
    return contentResult(errorHandling(error));
  }
};

// ===================================================================================== //
// INJECT_PRODUCT_COLLECTION
// ===================================================================================== //
export const get_uturn_information = async ({ nfc_code }) => {
  try {
    const data = await getUturn(nfc_code, { skip: true });
    return contentResult(
      `Success! data: ${JSON.stringify(data || {}, null, 2)}`
    );
  } catch (error) {
    return contentResult(errorHandling(error));
  }
};

// ===================================================================================== //
// GET_PRODUCT_STORIES
// ===================================================================================== //
export const get_product_stories = async ({ slug }) => {
  try {
    const product = await storefront.request(Q_SINGLE_PRODUCT, {
      handle: slug,
    });
    return contentResult(
      `data: ${JSON.stringify(product?.data?.product, null, 2)}`
    );
  } catch (error) {
    return contentResult(errorHandling(error));
  }
};

// ===================================================================================== //
// ADD_PRODUCT_DATA
// ===================================================================================== //
export const add_product_data = async ({
  slug,
  uturn_title,
  shopify_title,
  color,
  sku,
}) => {
  try {
    await ProductModel.create({
      uturnTitle: uturn_title,
      shopifySlug: slug,
      shopifyTitle: shopify_title,
      color,
      sku,
    });
    return contentResult(`Success! ${shopify_title} successfully added`);
  } catch (error) {
    return contentResult(errorHandling(error));
  }
};
