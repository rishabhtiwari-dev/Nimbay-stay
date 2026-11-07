"use client";

import React from "react";
import DateCategoryPicker from "@/components/DateCategoryPicker";
import RoomCard from "@/components/RoomCard";
import GuestForm from "@/components/GuestForm";
import StatusBanner from "@/components/StatusBanner";
import { AvailableRoom } from "@/lib/types";

export interface NimbaStayPageDesignProps {
  checkIn: string;
  checkOut: string;
  category: string;
  searching: boolean;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onSearch: () => void;

  rooms: AvailableRoom[];
  hasSearched: boolean;
  selectedRoom: AvailableRoom | null;
  onSelectRoom: (room: AvailableRoom) => void;

  guestName: string;
  guestPhone: string;
  booking: boolean;
  onGuestNameChange: (val: string) => void;
  onGuestPhoneChange: (val: string) => void;
  onBookStay: () => void;

  error: string | null;
  success: string | null;
  onClearError: () => void;
  onClearSuccess: () => void;
}

export default function NimbaStayPageDesign({
  checkIn,
  checkOut,
  category,
  searching,
  onCheckInChange,
  onCheckOutChange,
  onCategoryChange,
  onSearch,
  rooms,
  hasSearched,
  selectedRoom,
  onSelectRoom,
  guestName,
  guestPhone,
  booking,
  onGuestNameChange,
  onGuestPhoneChange,
  onBookStay,
  error,
  success,
  onClearError,
  onClearSuccess,
}: NimbaStayPageDesignProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-emerald-800 text-white shadow-sm border-b border-emerald-900">
        <div className="max-w-5xl mx-auto px-4 py-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <h1 className="text-2xl font-bold tracking-tight">Nimba Stay</h1>
            </div>
            <p className="text-emerald-200 text-xs mt-0.5">
              Front-Desk Room Availability & Guest Reservation System
            </p>
          </div>
          <div className="mt-3 sm:mt-0 text-right">
            <span className="inline-block text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded bg-emerald-900/60 text-emerald-100 border border-emerald-700/50">
              Nimba Nature Cure Village
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <StatusBanner type="error" message={error} onDismiss={onClearError} />
        )}
        {success && (
          <StatusBanner
            type="success"
            message={success}
            onDismiss={onClearSuccess}
          />
        )}

        <DateCategoryPicker
          checkIn={checkIn}
          checkOut={checkOut}
          category={category}
          onCheckInChange={onCheckInChange}
          onCheckOutChange={onCheckOutChange}
          onCategoryChange={onCategoryChange}
          onSearch={onSearch}
          loading={searching}
        />

        {hasSearched && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Available Rooms
                </h2>
                <p className="text-xs text-gray-500">
                  {rooms.length === 0
                    ? "No rooms match the selected dates & criteria"
                    : `Found ${rooms.length} room${
                        rooms.length > 1 ? "s" : ""
                      } ready for occupancy`}
                </p>
              </div>

              {rooms.length > 0 && !selectedRoom && (
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Click a room to select
                </span>
              )}
            </div>

            {rooms.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                <p className="text-sm font-medium text-gray-600">
                  No rooms are currently free for this date range.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try adjusting the check-in/check-out dates or changing the category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    selected={selectedRoom?.id === room.id}
                    onSelect={onSelectRoom}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {selectedRoom && (
          <section className="mt-8">
            <GuestForm
              guestName={guestName}
              guestPhone={guestPhone}
              onNameChange={onGuestNameChange}
              onPhoneChange={onGuestPhoneChange}
              onSubmit={onBookStay}
              loading={booking}
              selectedRoomNumber={selectedRoom.number}
            />
          </section>
        )}
      </main>
    </div>
  );
}
