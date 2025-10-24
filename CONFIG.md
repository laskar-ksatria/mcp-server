# MCP NFC Server Configuration

## Environment Variables Setup

### 1. Buat file `.env` berdasarkan template `env.example`:

```bash
cp env.example .env
```

### 2. Edit file `.env` dengan nilai yang sesuai:

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nfc-database

# Server Configuration
NODE_ENV=production
PORT=3000

# API Configuration
API_BASE_URL=https://api.yourdomain.com
SHOPIFY_STORE_URL=https://your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_shopify_access_token

# Uturn API Configuration
UTURN_API_URL=https://api.uturn.com
UTURN_API_KEY=your_uturn_api_key

# Security
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_encryption_key_here
```

## Claude Desktop Configuration

### Opsi 1: Menggunakan npx (Recommended)

Tambahkan ke `claude-desktop-config.json`:

```json
{
  "mcpServers": {
    "nfc-server": {
      "command": "npx",
      "args": [
        "mcp-server-nfc"
      ],
      "env": {
        "MONGODB_URI": "${MONGODB_URI}",
        "NODE_ENV": "${NODE_ENV:-production}",
        "PORT": "${PORT:-3000}",
        "API_BASE_URL": "${API_BASE_URL}",
        "SHOPIFY_STORE_URL": "${SHOPIFY_STORE_URL}",
        "SHOPIFY_ACCESS_TOKEN": "${SHOPIFY_ACCESS_TOKEN}",
        "UTURN_API_URL": "${UTURN_API_URL}",
        "UTURN_API_KEY": "${UTURN_API_KEY}",
        "JWT_SECRET": "${JWT_SECRET}",
        "ENCRYPTION_KEY": "${ENCRYPTION_KEY}"
      }
    }
  }
}
```

### Opsi 2: Menggunakan path absolut

```json
{
  "mcpServers": {
    "nfc-server": {
      "command": "node",
      "args": [
        "/path/to/your/mcp-server-nfc/index.js"
      ],
      "env": {
        "MONGODB_URI": "${MONGODB_URI}",
        "NODE_ENV": "${NODE_ENV:-production}",
        "PORT": "${PORT:-3000}",
        "API_BASE_URL": "${API_BASE_URL}",
        "SHOPIFY_STORE_URL": "${SHOPIFY_STORE_URL}",
        "SHOPIFY_ACCESS_TOKEN": "${SHOPIFY_ACCESS_TOKEN}",
        "UTURN_API_URL": "${UTURN_API_URL}",
        "UTURN_API_KEY": "${UTURN_API_KEY}",
        "JWT_SECRET": "${JWT_SECRET}",
        "ENCRYPTION_KEY": "${ENCRYPTION_KEY}"
      }
    }
  }
}
```

## Setup Instructions

### 1. Install Package

```bash
# Install global
npm install -g mcp-server-nfc

# Atau install lokal
npm install mcp-server-nfc
```

### 2. Setup Environment

```bash
# Copy template
cp env.example .env

# Edit dengan nilai yang sesuai
nano .env
```

### 3. Setup Database

Pastikan MongoDB sudah running:

```bash
# Start MongoDB
mongod

# Atau menggunakan Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Test Connection

```bash
# Test ping
npx mcp-server-nfc

# Atau jika install global
mcp-nfc-server
```

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | Yes | - | MongoDB connection string |
| `NODE_ENV` | No | `production` | Environment mode |
| `PORT` | No | `3000` | Server port |
| `API_BASE_URL` | No | - | Base URL for API calls |
| `SHOPIFY_STORE_URL` | No | - | Shopify store URL |
| `SHOPIFY_ACCESS_TOKEN` | No | - | Shopify access token |
| `UTURN_API_URL` | No | - | Uturn API URL |
| `UTURN_API_KEY` | No | - | Uturn API key |
| `JWT_SECRET` | No | - | JWT secret for authentication |
| `ENCRYPTION_KEY` | No | - | Encryption key for sensitive data |

## Troubleshooting

### 1. MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"

# Start MongoDB if not running
brew services start mongodb-community
```

### 2. Environment Variables Not Loading
```bash
# Check if .env file exists
ls -la .env

# Verify environment variables
echo $MONGODB_URI
```

### 3. Claude Desktop Not Loading MCP
- Restart Claude Desktop
- Check logs in Claude Desktop
- Verify configuration syntax in `claude-desktop-config.json`
