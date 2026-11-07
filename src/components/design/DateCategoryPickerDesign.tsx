"use client";

import React from "react";

export interface DateCategoryPickerDesignProps {
  checkIn: string;
  checkOut: string;
  category: string;
  minCheckInDate: string;
  minCheckOutDate: string;
  disabled: boolean;
  loading: boolean;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onSearchClick: () => void;
}

export default function DateCategoryPickerDesign({
  checkIn,
  checkOut,
  category,
  minCheckInDate,
  minCheckOutDate,
  disabled,
  loading,
  onCheckInChange,
  onCheckOutChange,
  onCategoryChange,
  onSearchClick,
}: DateCategoryPickerDesignProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Check Room Availability
          </h2>
          <p className="text-xs text-gray-500">
            Select arrival and departure dates to search for open rooms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label
            htmlFor="checkIn"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1"
          >
            Check-In Date
          </label>
          <input
            id="checkIn"
            type="date"
            min={minCheckInDate}
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

        <div>
          <label
            htmlFor="checkOut"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1"
          >
            Check-Out Date
          </label>
          <input
            id="checkOut"
            type="date"
            min={minCheckOutDate}
            value={checkOut}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1"
          >
            Room Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition"
          >
            <option value="">All Categories (Standard, Deluxe, Suite)</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSearchClick}
          disabled={disabled}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm transition"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Searching Rooms...
            </span>
          ) : (
            "Search Available Rooms"
          )}
        </button>
      </div>
    </section>
  );
}
