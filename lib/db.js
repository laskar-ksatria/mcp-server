import mongoose from "mongoose";
import { config } from "dotenv";

config();

// MODEL
import "../model/collection.model.js";
import "../model/customer.model.js";
import "../model/history.model.js";
import "../model/inbox.model.js";
import "../model/nfc.model.js";
import "../model/product.model.js";
import "../model/uniqueCode.model.js";
import "../model/warranty.model.js";

/**
 * Start on local - brew services start mongodb/brew/mongodb-community
 * Stop on local - brew services stop mongodb/brew/mongodb-community
 * @returns
 */
export default async function dbConnect(cb) {
  try {
    // Validate required environment variables
    if (
      !process.env.ATLAS_NAME ||
      !process.env.ATLAS_ADDRESS ||
      !process.env.ATLAS_COLLECTION
    ) {
      // Skip database connection silently
      cb(); // Continue without database connection
      return;
    }
    const uri = `mongodb+srv://${process.env.ATLAS_NAME}@${process.env.ATLAS_ADDRESS}/?retryWrites=true&w=majority&appName=${process.env.ATLAS_COLLECTION}`;

    mongoose.connect(uri);
    const db = mongoose.connection;

    db.on("error", (error) => {
      // Silently handle MongoDB connection errors
      // Don't output to console as it interferes with MCP protocol
    });

    db.once("open", function () {
      cb();
    });
  } catch (error) {
    // Silently handle connection failures
    cb(); // Continue without database connection
  }
}
