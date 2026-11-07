"use client";

import React from "react";

export interface RoomCardDesignProps {
  roomNumber: string;
  category: string;
  formattedPricePerNight: string;
  formattedTotalPrice: string;
  badgeClass: string;
  containerClass: string;
  isSelected: boolean;
  onSelectClick: () => void;
}

export default function RoomCardDesign({
  roomNumber,
  category,
  formattedPricePerNight,
  formattedTotalPrice,
  badgeClass,
  containerClass,
  isSelected,
  onSelectClick,
}: RoomCardDesignProps) {
  return (
    <button
      type="button"
      onClick={onSelectClick}
      className={`relative w-full rounded-xl border p-5 text-left transition-all duration-150 focus:outline-none ${containerClass}`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-emerald-600 text-white rounded-full p-1 shadow-sm">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${badgeClass}`}
        >
          {category}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">Room {roomNumber}</h3>
        <p className="text-xs text-gray-500">
          {formattedPricePerNight} per night
        </p>
      </div>

      <div className="pt-3 border-t border-gray-200/70 flex items-baseline justify-between">
        <span className="text-xs font-medium text-gray-500">Total Stay Price</span>
        <span className="text-lg font-bold text-emerald-800">
          {formattedTotalPrice}
        </span>
      </div>
    </button>
  );
}
