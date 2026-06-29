# Stellar Live Poll

Live Demo: TODO - Add Vercel deployment URL

Deployed Contract Address: TODO - Add deployed testnet contract address

Contract Call Transaction Hash: TODO - Add verifiable testnet transaction hash

Stellar Live Poll is a Level 2 Stellar dApp submission project. It is a single-question live poll where a user connects a Stellar wallet, votes once, writes that vote to a Soroban smart contract on testnet, reads poll state back from RPC, and sees transaction status plus synced activity.

## Features

- Next.js App Router dashboard with TypeScript and Tailwind CSS.
- StellarWalletsKit multi-wallet modal with Freighter and other default supported wallet modules.
- Wallet connected state, disconnect, short public key display, and copy address action.
- Soroban contract read helpers for `get_question`, `get_options`, `get_results`, and `has_voted`.
- Soroban contract write helper for `vote(voter, option_id)`.
- Transaction status states: `idle`, `preparing`, `awaiting_signature`, `pending`, `success`, and `failed`.
- Testnet Stellar Expert transaction link after a successful submission hash is returned.
- Activity feed populated from real submitted vote hashes and RPC event polling when a contract ID is configured.
- Error handling for wallet not found, user rejection, insufficient testnet XLM, wrong network, RPC unavailable, invalid contract address, and contract failures.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- StellarWalletsKit
- `@stellar/stellar-sdk` RPC client
- Soroban Rust smart contract
- Stellar Testnet
- Vercel-compatible frontend

## Run Locally

```bash
pnpm install --ignore-scripts
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Environment Variables

```bash
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_CONTRACT_ID=
```

Do not commit `.env` or secret keys. `.env.example` is safe to commit.

## Contract

Contract source lives in `contracts/poll`.

Functions:

- `init(question, options)`
- `vote(voter, option_id)`
- `get_question()`
- `get_options()`
- `get_results()`
- `has_voted(voter)`

Behavior:

- Stores one poll question and option list.
- Allows each wallet to vote once.
- Rejects invalid option IDs.
- Increments the chosen option count.
- Publishes a `vote` event with voter and option ID data.

## Build Contract

```bash
cd contracts/poll
stellar contract build
```

## Deploy Contract To Testnet

```bash
stellar keys generate live-poll --network testnet --fund
stellar contract deploy \
  --wasm target/wasm32v1-none/release/stellar_live_poll_contract.wasm \
  --source live-poll \
  --network testnet
```

Initialize after deploy:

```bash
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source live-poll \
  --network testnet \
  -- \
  init \
  --question "Which Stellar developer experience matters most for Level 2?" \
  --options '["Multi-wallet UX","On-chain poll state","Live activity feed"]'
```

Set the deployed contract ID in `NEXT_PUBLIC_CONTRACT_ID`.

## Frontend Contract Calls

Reads:

- `get_question`
- `get_options`
- `get_results`
- `has_voted`

Write:

- `vote(voter, option_id)`

The frontend builds a Soroban transaction, prepares it through Stellar RPC, asks StellarWalletsKit to sign the XDR, submits through RPC, polls transaction status, refreshes poll state, and adds the confirmed transaction hash to the activity feed.

## Wallet Support

The app initializes StellarWalletsKit with `defaultModules()` on testnet. The modal can show Freighter, Albedo, Fordefi, Rabet, xBull, Lobstr, Hana, Klever, OneKey, Bitget, and Cactus Link depending on platform availability and wallet support.

## Error Handling

- Wallet not found: `Wallet not found. Please install or enable a supported Stellar wallet.`
- User rejected: `Request rejected by user.`
- Insufficient balance: `Insufficient testnet XLM. Please fund your wallet on Stellar Testnet.`
- Wrong network warning for non-testnet wallet state.
- Contract call, RPC, and invalid contract address errors are displayed in the dashboard banner and transaction status card.

## Transaction Status

The transaction card displays current status, transaction hash, Stellar Expert link, and error message. Write flow status moves through preparing, awaiting signature, pending, success, or failed.

## Event And Live Sync

When `NEXT_PUBLIC_CONTRACT_ID` is configured, the frontend polls Stellar RPC every 10 seconds for fresh poll state and contract vote events via `getEvents`. After a vote submission, the returned real transaction hash is immediately added to the activity feed and state is refreshed from RPC. If no contract ID is configured, the UI shows the poll shell but disables voting instead of faking contract activity.

## Screenshots

Add final screenshots before submission:

- `screenshots/wallet-options.png`
- `screenshots/wallet-connected.png`
- `screenshots/vote-pending.png`
- `screenshots/vote-success.png`
- `screenshots/activity-feed.png`

## Submission Checklist

- [x] Clean Level 2 project created.
- [x] Next.js App Router frontend.
- [x] StellarWalletsKit multi-wallet modal integration.
- [x] Freighter support via default wallet modules.
- [x] Wallet connect, disconnect, short address, and copy address UI.
- [x] Soroban Rust poll contract.
- [x] Contract read/write helper functions in frontend.
- [x] Transaction status UI.
- [x] Activity feed and live sync polling.
- [x] Error handling for required wallet and transaction cases.
- [x] `.env.example` included and `.env` ignored.
- [ ] Contract deployed to Stellar Testnet.
- [ ] Contract address added above.
- [ ] Verifiable contract call transaction hash added above.
- [ ] Vercel live demo URL added above.
- [ ] Screenshots captured and added.

## Commit Plan

Recommended meaningful commits:

1. Initialize Stellar Live Poll frontend with multi-wallet UI
2. Add Soroban poll contract and deployment configuration
3. Connect frontend contract read/write calls with transaction status
4. Add activity feed, README, screenshots, and submission checklist
