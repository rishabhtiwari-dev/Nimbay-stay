"use client";

import React from "react";
import { useBooking } from "@/hooks/useBooking";
import NimbaStayPageDesign from "@/components/design/NimbaStayPageDesign";

export default function HomePage() {
  const {
    checkIn,
    checkOut,
    category,
    searching,
    setCheckIn,
    setCheckOut,
    setCategory,
    handleSearch,
    rooms,
    hasSearched,
    selectedRoom,
    setSelectedRoom,
    guestName,
    guestPhone,
    setGuestName,
    setGuestPhone,
    booking,
    handleBook,
    error,
    success,
    clearError,
    clearSuccess,
  } = useBooking();

  return (
    <NimbaStayPageDesign
      checkIn={checkIn}
      checkOut={checkOut}
      category={category}
      searching={searching}
      onCheckInChange={setCheckIn}
      onCheckOutChange={setCheckOut}
      onCategoryChange={setCategory}
      onSearch={handleSearch}
      rooms={rooms}
      hasSearched={hasSearched}
      selectedRoom={selectedRoom}
      onSelectRoom={setSelectedRoom}
      guestName={guestName}
      guestPhone={guestPhone}
      booking={booking}
      onGuestNameChange={setGuestName}
      onGuestPhoneChange={setGuestPhone}
      onBookStay={handleBook}
      error={error}
      success={success}
      onClearError={clearError}
      onClearSuccess={clearSuccess}
    />
  );
}
