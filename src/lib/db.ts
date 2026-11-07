import fs from "fs";
import path from "path";
import { Room, Booking } from "./types";

interface NimbaDatabaseState {
  rooms: Room[];
  bookings: Booking[];
}

const DB_FILE_PATH = path.join(process.cwd(), "nimba-data.json");

const SEED_ROOMS: Room[] = [
  { id: 1, number: "101", category: "Standard", price_per_night: 2500, status: "available" },
  { id: 2, number: "102", category: "Standard", price_per_night: 2500, status: "available" },
  { id: 3, number: "103", category: "Standard", price_per_night: 2500, status: "maintenance" },
  { id: 4, number: "104", category: "Standard", price_per_night: 2500, status: "available" },
  { id: 5, number: "201", category: "Deluxe", price_per_night: 4500, status: "available" },
  { id: 6, number: "202", category: "Deluxe", price_per_night: 4500, status: "available" },
  { id: 7, number: "203", category: "Deluxe", price_per_night: 4500, status: "available" },
  { id: 8, number: "301", category: "Suite", price_per_night: 7500, status: "available" },
  { id: 9, number: "302", category: "Suite", price_per_night: 7500, status: "maintenance" },
];

export function readDatabase(): NimbaDatabaseState {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial: NimbaDatabaseState = { rooms: SEED_ROOMS, bookings: [] };
      writeDatabase(initial);
      return initial;
    }
    return JSON.parse(fs.readFileSync(DB_FILE_PATH, "utf-8"));
  } catch (err) {
    console.error("Error reading database file, using fallback seed:", err);
    return { rooms: SEED_ROOMS, bookings: [] };
  }
}

export function writeDatabase(state: NimbaDatabaseState): void {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to database file:", err);
  }
}

export function getAllRooms(): Room[] {
  return readDatabase().rooms;
}

export function getRoomById(id: number): Room | undefined {
  return readDatabase().rooms.find((r) => r.id === id);
}

export function getAllBookings(): Booking[] {
  return readDatabase().bookings;
}

export function insertBooking(
  bookingData: Omit<Booking, "id" | "status" | "created_at">
): Booking {
  const db = readDatabase();
  const nextId =
    db.bookings.length > 0
      ? Math.max(...db.bookings.map((b) => b.id)) + 1
      : 1;

  const newBooking: Booking = {
    id: nextId,
    room_id: bookingData.room_id,
    guest_name: bookingData.guest_name,
    guest_phone: bookingData.guest_phone,
    check_in: bookingData.check_in,
    check_out: bookingData.check_out,
    status: "confirmed",
    created_at: new Date().toISOString(),
  };

  db.bookings.push(newBooking);
  writeDatabase(db);
  return newBooking;
}
