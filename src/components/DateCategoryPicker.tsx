"use client";

import React, { useState, useEffect } from "react";
import DateCategoryPickerDesign from "./design/DateCategoryPickerDesign";
import {
  getTodayDateString,
  getMinCheckOutDate,
  isSearchDisabled,
} from "./functions/datePickerFunctions";

export interface DateCategoryPickerProps {
  checkIn: string;
  checkOut: string;
  category: string;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function DateCategoryPicker({
  checkIn,
  checkOut,
  category,
  onCheckInChange,
  onCheckOutChange,
  onCategoryChange,
  onSearch,
  loading,
}: DateCategoryPickerProps) {
  const [minCheckInDate, setMinCheckInDate] = useState("");

  useEffect(() => {
    setMinCheckInDate(getTodayDateString());
  }, []);

  const minCheckOutDate = getMinCheckOutDate(checkIn);
  const disabled = isSearchDisabled(loading, checkIn, checkOut);

  return (
    <DateCategoryPickerDesign
      checkIn={checkIn}
      checkOut={checkOut}
      category={category}
      minCheckInDate={minCheckInDate}
      minCheckOutDate={minCheckOutDate}
      disabled={disabled}
      loading={loading}
      onCheckInChange={onCheckInChange}
      onCheckOutChange={onCheckOutChange}
      onCategoryChange={onCategoryChange}
      onSearchClick={onSearch}
    />
  );
}
