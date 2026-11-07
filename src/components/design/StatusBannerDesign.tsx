"use client";

import React from "react";

export interface StatusBannerDesignProps {
  message: string;
  type: "error" | "success";
  containerClass: string;
  iconClass: string;
  title: string;
  onDismissClick: () => void;
}

export default function StatusBannerDesign({
  message,
  type,
  containerClass,
  iconClass,
  title,
  onDismissClick,
}: StatusBannerDesignProps) {
  return (
    <div
      role="alert"
      className={`border rounded-xl p-4 mb-5 flex items-start justify-between shadow-sm transition ${containerClass}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex-shrink-0 ${iconClass}`}>
          {type === "error" ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-0.5">
            {title}
          </h4>
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onDismissClick}
        aria-label="Dismiss banner"
        className="p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
