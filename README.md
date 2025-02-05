# Agent Registration Service

This repo is a micro service enabling the registration of agents. It uses the next.js framework if ever we decide to add a user interface on top of it.

## Prerequisites

Before running the service, you need to:

1. Create a `.env` file in the root directory
2. Add your private key from a wallet that contains Base Sepolia test ETH:
   ```
   PRIVATE_KEY=your_private_key_here
   ```

> ⚠️ **Important**:
>
> - Never commit your private key or share it with anyone
> - Make sure your wallet has Base Sepolia test ETH to cover transaction fees
> - You can get Base Sepolia test ETH from [the Base faucet](https://www.base.org/faucet)

## Getting Started

Install dependencies

```bash
npm i
```

start the dev server

```bash
npm run dev
```
