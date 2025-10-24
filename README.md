# MCP NFC Server

A Model Context Protocol (MCP) server for NFC operations with product collection management, customer tracking, and Shopify integration.

## 🚀 Installation

```bash
# Install globally
npm install -g mcp-server-nfc

# Or install locally
npm install mcp-server-nfc
```

## 🛠️ Available Tools

### 1. **`ping`** - Connection Test

Test server connection and health status.

- **Parameters**: None
- **Returns**: "Pong!" if server is working

### 2. **`get_customer_information`** - Get Customer Data

Retrieve customer information and their product collections.

- **Parameters**:
  - `email` (string) - Customer email address
- **Returns**: Customer data with product collections

### 3. **`unpair_product_collection`** - Remove Product

Remove a product from customer's collection.

- **Parameters**:
  - `unique_code` (string) - Unique code of the product
- **Returns**: Confirmation of unpairing

### 4. **`add_customer_product_collection`** - Add Product Collection

Add a product to customer's collection.

- **Parameters**:
  - `slug` (string) - Product slug
  - `unique_code` (string) - Unique code for the product
  - `email` (string) - Customer email
  - `nfc_code` (string) - NFC code
- **Returns**: Success confirmation with product details

### 5. **`get_uturn_information`** - Get Uturn Data

Fetch data from Uturn API using NFC code.

- **Parameters**:
  - `nfc` (string) - NFC code to query
- **Returns**: Data from Uturn API

### 6. **`get_product_stories`** - Get Product Details

Retrieve detailed product information and stories.

- **Parameters**:
  - `slug` (string) - Product slug
- **Returns**: Complete product data including stories

### 7. **`get_product_detail`** - Get Basic Product Info

Get basic product information.

- **Parameters**:
  - `slug` (string) - Product slug
- **Returns**: Basic product title and information

## 🔧 Environment Configuration

Create a `.env` file with the following variables:

```bash
# Database Configuration
ATLAS_NAME=your_mongodb_username:password
ATLAS_ADDRESS=your_cluster.mongodb.net
ATLAS_COLLECTION=your_database_name

# API Configuration
UTURN_API=your_uturn_api
SHOPIFY_STOREFRONT_ACCESSTOKEN=your_shopify_token
SHOPIFY_STORE_DOMAIN=https://your-store.myshopify.com
SHOPIFY_API_VERSION=2024-10

# Security
KEY=your_encryption_key
```

## 📋 Claude Desktop Configuration

Add to your `claude-desktop-config.json`:

```json
{
  "mcpServers": {
    "nfc-server": {
      "command": "npx",
      "args": ["mcp-server-nfc"],
      "env": {
        "ATLAS_NAME": "your_mongodb_username:password",
        "ATLAS_ADDRESS": "your_cluster.mongodb.net",
        "ATLAS_COLLECTION": "your_database_name",
        "UTURN_API": "uturn_api",
        "SHOPIFY_STOREFRONT_ACCESSTOKEN": "your_shopify_token",
        "SHOPIFY_STORE_DOMAIN": "https://your-store.myshopify.com",
        "SHOPIFY_API_VERSION": "2024-10",
        "KEY": "your_encryption_key"
      }
    }
  }
}
```

## 🎯 Usage Examples

### Test Connection

```bash
# Test if server is running
ping
```

### Get Customer Information

```bash
# Get customer data
get_customer_information email="customer@example.com"
```

### Add Product to Collection

```bash
# Add product to customer collection
add_customer_product_collection \
  slug="product-handle" \
  unique_code="UNIQUE123" \
  email="customer@example.com" \
  nfc_code="NFC456"
```

### Get Uturn Information

```bash
# Get data from Uturn API
get_uturn_information nfc="NFC456"
```

### Get Product Details

```bash
# Get product information
get_product_stories slug="product-handle"
```

## 🔍 Key Features

- **Product Collection Management** - Add/remove products from customer collections
- **Customer Data Retrieval** - Get customer information and their products
- **NFC Integration** - Work with NFC codes and external APIs
- **Shopify Integration** - Fetch product data from Shopify storefront
- **Warranty Tracking** - Automatic warranty expiration calculation
- **History Logging** - Track product ownership history
- **Error Handling** - Comprehensive error management and validation

## 📊 Tool Categories

| Category                  | Tools                                                          |
| ------------------------- | -------------------------------------------------------------- |
| **Connection**            | `ping`                                                         |
| **Customer Management**   | `get_customer_information`                                     |
| **Product Management**    | `get_product_detail`, `get_product_stories`                    |
| **Collection Management** | `add_customer_product_collection`, `unpair_product_collection` |
| **External API**          | `get_uturn_information`                                        |

## 🚀 Quick Start

1. **Install the package**:

   ```bash
   npm install -g mcp-server-nfc
   ```

2. **Configure environment variables** in your `.env` file

3. **Add to Claude Desktop configuration**:

   ```json
   {
     "mcpServers": {
       "nfc-server": {
         "command": "npx",
         "args": ["mcp-server-nfc"],
         "env": {
           /* your environment variables */
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop** to load the MCP server

## 📄 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

**LaskarAntikode** - [GitHub](https://github.com/laskar-ksatria)

---

_Built with ❤️ for NFC product management and customer tracking_
