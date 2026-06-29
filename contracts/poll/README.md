# Stellar Live Poll Contract

Soroban smart contract for the Stellar Live Poll dApp.

## Build

```bash
stellar contract build
```

The optimized WASM should be produced at:

```text
target/wasm32v1-none/release/stellar_live_poll_contract.wasm
```

## Deploy To Testnet

Configure an identity with a funded Stellar testnet account first:

```bash
stellar keys generate live-poll --network testnet --fund
```

Then deploy:

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/stellar_live_poll_contract.wasm \
  --source live-poll \
  --network testnet
```

Initialize the poll:

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

Set the returned contract ID as `NEXT_PUBLIC_CONTRACT_ID` in the frontend.
