import { getAllRooms, getAllBookings } from "./db";
import { AvailableRoom } from "./types";

// Checkout on date X does not block checkin on date X
export function doIntervalsClash(
  existingIn: string,
  existingOut: string,
  requestedIn: string,
  requestedOut: string
): boolean {
  return existingIn < requestedOut && existingOut > requestedIn;
}

export function findAvailableRooms(
  checkIn: string,
  checkOut: string,
  category?: string
): AvailableRoom[] {
  const allRooms = getAllRooms();
  const allBookings = getAllBookings();

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const bookedRoomIds = new Set(
    allBookings
      .filter(
        (b) =>
          b.status === "confirmed" &&
          doIntervalsClash(b.check_in, b.check_out, checkIn, checkOut)
      )
      .map((b) => b.room_id)
  );

  return allRooms
    .filter((room) => {
      if (room.status === "maintenance") return false;
      if (bookedRoomIds.has(room.id)) return false;
      if (category && room.category !== category) return false;
      return true;
    })
    .map((room) => ({
      id: room.id,
      number: room.number,
      category: room.category,
      price_per_night: room.price_per_night,
      total_price: room.price_per_night * nights,
    }));
}
