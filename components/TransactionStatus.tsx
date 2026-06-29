import { CheckCircle2, Clock3, ExternalLink, Loader2, XCircle } from "lucide-react";

import { buildExplorerUrl, shortenAddress, type TransactionStatus as Status } from "@/lib/format";

type Props = {
  status: Status;
  txHash?: string;
  error?: string;
};

const statusLabels: Record<Status, string> = {
  idle: "Idle",
  preparing: "Preparing transaction",
  awaiting_signature: "Awaiting signature",
  pending: "Pending on testnet",
  success: "Success",
  failed: "Failed",
};

export function TransactionStatus({ status, txHash, error }: Props) {
  const isBusy = status === "preparing" || status === "awaiting_signature" || status === "pending";
  const isSuccess = status === "success";
  const isFailed = status === "failed";
  const Icon = isSuccess ? CheckCircle2 : isFailed ? XCircle : isBusy ? Loader2 : Clock3;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Transaction status
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">{statusLabels[status]}</h2>
        </div>
        <Icon
          className={`h-6 w-6 ${isBusy ? "animate-spin text-cyan-600" : ""} ${
            isSuccess ? "text-emerald-600" : ""
          } ${isFailed ? "text-rose-600" : "text-slate-500"}`}
        />
      </div>

      <div className="mt-5 space-y-3 rounded-md bg-slate-50 p-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Current status</span>
          <span className="font-medium text-slate-900">{status}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Transaction hash</span>
          <span className="font-mono text-xs text-slate-900">{txHash ? shortenAddress(txHash) : "None yet"}</span>
        </div>
        {txHash ? (
          <a
            className="inline-flex items-center gap-2 font-medium text-cyan-700 hover:text-cyan-900"
            href={buildExplorerUrl(txHash)}
            target="_blank"
            rel="noreferrer"
          >
            View on Stellar Expert <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
        {error ? <p className="rounded-md bg-rose-50 p-3 text-rose-700">{error}</p> : null}
      </div>
    </section>
  );
}
