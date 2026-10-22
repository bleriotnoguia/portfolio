import React from "react";
import { FiSend } from "react-icons/fi";

export default function SubmitBtn({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      className="group inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-ink px-6 font-semibold text-paper transition hover:opacity-90 disabled:opacity-60"
      disabled={pending}
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
          {pendingLabel}
        </>
      ) : (
        <>
          {label}
          <FiSend
            aria-hidden
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
}
