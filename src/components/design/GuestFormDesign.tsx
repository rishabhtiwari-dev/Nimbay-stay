"use client";

import React from "react";

export interface GuestFormDesignProps {
  guestName: string;
  guestPhone: string;
  selectedRoomNumber: string | null;
  buttonLabel: string;
  isSubmitDisabled: boolean;
  loading: boolean;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onSubmitClick: () => void;
}

export default function GuestFormDesign({
  guestName,
  guestPhone,
  selectedRoomNumber,
  buttonLabel,
  isSubmitDisabled,
  loading,
  onNameChange,
  onPhoneChange,
  onSubmitClick,
}: GuestFormDesignProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Guest Details
          </h2>
          <p className="text-xs text-gray-500">
            Enter guest contact details to complete the reservation
          </p>
        </div>

        {selectedRoomNumber && (
          <div className="mt-2 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-800">
              Selected Room: {selectedRoomNumber}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="guestName"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1"
          >
            Guest Full Name *
          </label>
          <input
            id="guestName"
            type="text"
            suppressHydrationWarning
            placeholder="e.g. Ramesh Patel"
            value={guestName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

        <div>
          <label
            htmlFor="guestPhone"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1"
          >
            Contact Phone (10 digits) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-xs font-semibold text-gray-400">+91</span>
            </div>
            <input
              id="guestPhone"
              type="tel"
              suppressHydrationWarning
              placeholder="9876543210"
              value={guestPhone}
              maxLength={10}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-11 pr-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
            />
          </div>
          <p className="mt-1 text-[11px] text-gray-400">
            Must be exactly 10 digits
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSubmitClick}
          disabled={isSubmitDisabled}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm transition"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              {buttonLabel}
            </span>
          ) : (
            buttonLabel
          )}
        </button>
      </div>
    </section>
  );
}
