"use client";

import { useState } from "react";
import { AvailableRoom } from "@/lib/types";
import { fetchAvailability, submitBooking } from "@/lib/api-client";

export function useBooking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [category, setCategory] = useState("");
  const [searching, setSearching] = useState(false);

  const [rooms, setRooms] = useState<AvailableRoom[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [booking, setBooking] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSearch() {
    setError(null);
    setSuccess(null);
    setSelectedRoom(null);
    setSearching(true);

    try {
      const result = await fetchAvailability(checkIn, checkOut, category || undefined);
      setRooms(result);
      setHasSearched(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to search";
      setError(msg);
    } finally {
      setSearching(false);
    }
  }

  async function handleBook() {
    if (!selectedRoom) return;

    setError(null);
    setSuccess(null);
    setBooking(true);

    try {
      const result = await submitBooking({
        room_id: selectedRoom.id,
        guest_name: guestName.trim(),
        guest_phone: guestPhone,
        check_in: checkIn,
        check_out: checkOut,
      });

      setSuccess(
        `Booking #${result.booking.id} confirmed — Room ${selectedRoom.number} for ${guestName.trim()}`
      );

      setSelectedRoom(null);
      setGuestName("");
      setGuestPhone("");

      const updated = await fetchAvailability(checkIn, checkOut, category || undefined);
      setRooms(updated);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Booking failed";
      setError(msg);
    } finally {
      setBooking(false);
    }
  }

  function clearError() {
    setError(null);
  }

  function clearSuccess() {
    setSuccess(null);
  }

  return {
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
  };
}
