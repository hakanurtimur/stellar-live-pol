import { describe, expect, it } from "vitest";

import {
  buildExplorerUrl,
  formatErrorMessage,
  normalizeTransactionStatus,
  shortenAddress,
} from "./format";

describe("shortenAddress", () => {
  it("keeps short strings unchanged", () => {
    expect(shortenAddress("GABC")).toBe("GABC");
  });

  it("shows a compact Stellar address", () => {
    expect(
      shortenAddress("GDUKMGUGDZQK6YJ6N3P3GFH4IS6E7VYWIXZAXWTBNY3HQ2SGO4ZPDI3F"),
    ).toBe("GDUKMG...ZPDI3F");
  });
});

describe("buildExplorerUrl", () => {
  it("points testnet transactions to Stellar Expert", () => {
    expect(buildExplorerUrl("abc123", "testnet")).toBe(
      "https://stellar.expert/explorer/testnet/tx/abc123",
    );
  });
});

describe("normalizeTransactionStatus", () => {
  it("maps RPC terminal states into UI states", () => {
    expect(normalizeTransactionStatus("SUCCESS")).toBe("success");
    expect(normalizeTransactionStatus("FAILED")).toBe("failed");
    expect(normalizeTransactionStatus("NOT_FOUND")).toBe("pending");
  });
});

describe("formatErrorMessage", () => {
  it("recognizes wallet, rejection, and balance errors", () => {
    expect(formatErrorMessage(new Error("Freighter is not connected"))).toBe(
      "Wallet not found. Please install or enable a supported Stellar wallet.",
    );
    expect(formatErrorMessage(new Error("User rejected request"))).toBe(
      "Request rejected by user.",
    );
    expect(formatErrorMessage(new Error("tx_bad_auth: insufficient balance"))).toBe(
      "Insufficient testnet XLM. Please fund your wallet on Stellar Testnet.",
    );
  });
});
