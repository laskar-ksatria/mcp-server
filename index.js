#!/usr/bin/env node
import z from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  add_new_unique_code,
  add_product_collection,
  get_customer_information,
  get_product_stories,
  get_uturn_information,
  getProductData,
  unpair_product_collection,
} from "./tools/tools.js";
import dbConnect from "./lib/db.js";
import { config } from "dotenv";

config();

// ================================================================================================================= //
// INITIALIZE MCP SERVER
// ================================================================================================================= //
const server = new McpServer(
  {
    name: "mcp-nfc-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ================================================================================================================= //
// TOOLS
// ================================================================================================================= //
server.registerTool(
  "get_product_detail",
  {
    title: "Get Product detail",
    description: "Tools for get product detail by slug",
    inputSchema: { slug: z.string() },
  },
  async ({ slug }) => {
    const data = await getProductData({ slug });
    return data;
  }
);

// 1. CONNECTION_TEST ---------------------------------------------------- >
server.registerTool(
  "ping",
  {
    title: "ping",
    description: "Call this if user ask to check connection",
    inputSchema: undefined,
  },
  () => {
    return { content: [{ type: "text", text: "Pong!" }] };
  }
);

// 2. GET_CUSTOMER_INFORMATION ---------------------------------------------------- >
server.registerTool(
  "get_customer_information",
  {
    title: "Get Customer Information",
    description: "Will get customer data by email",
    inputSchema: { email: z.string() },
  },
  get_customer_information
);

// 3. UNPAIR_PRODUCT_COLLECTION ---------------------------------------------------- >
server.registerTool(
  "unpair_product_collection",
  {
    title: "Unpair Product Collection",
    description:
      "This function will unpair product collection user. Requirement parameter is unique code. When call this tools, don't call other tool",
    inputSchema: {
      unique_code: z.string().min(1, "Unique Code required!"),
    },
  },
  unpair_product_collection
);

// 4. ADD_CUSTOMER_PRODUCT_COLLECTION ---------------------------------------------------- >
server.registerTool(
  "add_customer_product_collection",
  {
    title: "Add Customer Product Collection",
    description: "This function will add product collection for customer",
    inputSchema: {
      slug: z.string(),
      unique_code: z.string(),
      email: z.string(),
      nfc_code: z.string(),
    },
  },
  add_product_collection
);

// 5. GET_UTURN_INFORMATION ---------------------------------------------------- >
server.registerTool(
  "get_uturn_information",
  {
    title: "Get Uturn Information",
    description: "This function will call API from uturn and return data",
    inputSchema: {
      nfc: z.string().min(1, "NFC Code required!"),
    },
  },
  get_uturn_information
);

// 6. CHECK_PRODUCT_STORIES ---------------------------------------------------- >
server.registerTool(
  "get_product_stories",
  {
    title: "Get Product Stories",
    description: "Get Product Stories Data with Slug as Parameter",
    inputSchema: {
      slug: z.string().min(1, "Slug required!"),
    },
  },
  get_product_stories
);

// 7. ADD_PRODUCT_DATA
server.registerTool(
  "add_product_data",
  {
    title: "Add Product Data",
    description: "Get Product Stories Data with Slug as Parameter",
    inputSchema: {
      slug: z.string().min(1, "Slug required!"),
    },
  },
  get_product_stories
);

// 8. ADD_UNIQUE_CODE
server.registerTool(
  "add_unique_code",
  {
    title: "Add Unique Code",
    description: "Add unique code to database",
    inputSchema: {
      unique_code: z.string().min(1, "Unique Code Required!"),
    },
  },
  add_new_unique_code
);

// ================================================================================================================= //
// START SERVER
// ================================================================================================================= //
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

dbConnect(() => {
  main().catch(console.error);
});
