import { getAllBookings, insertBooking } from "./db";
import { doIntervalsClash } from "./rooms";
import { BookingRequest, Booking } from "./types";

export function hasClash(
  roomId: number,
  checkIn: string,
  checkOut: string
): boolean {
  const bookings = getAllBookings();

  return bookings.some(
    (b) =>
      b.room_id === roomId &&
      b.status === "confirmed" &&
      doIntervalsClash(b.check_in, b.check_out, checkIn, checkOut)
  );
}

export function createBooking(data: BookingRequest): Booking {
  return insertBooking({
    room_id: data.room_id,
    guest_name: data.guest_name,
    guest_phone: data.guest_phone,
    check_in: data.check_in,
    check_out: data.check_out,
  });
}
