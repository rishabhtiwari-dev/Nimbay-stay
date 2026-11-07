import { AvailableRoom, BookingRequest, ApiError } from "@/lib/types";

export async function fetchAvailability(
  checkIn: string,
  checkOut: string,
  category?: string
): Promise<AvailableRoom[]> {
  const params = new URLSearchParams({ checkIn, checkOut });
  if (category) params.set("category", category);

  const res = await fetch(`/api/availability?${params}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ApiError).error || "Failed to fetch availability");
  }

  return data.rooms;
}

export async function submitBooking(
  booking: BookingRequest
): Promise<{ booking: { id: number } }> {
  const res = await fetch(`/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ApiError).error || "Booking failed");
  }

  return data;
}
