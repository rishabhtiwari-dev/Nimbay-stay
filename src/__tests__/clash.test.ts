import { doIntervalsClash, findAvailableRooms } from "../lib/rooms";
import { hasClash } from "../lib/bookings";
import * as db from "../lib/db";
import { Room, Booking } from "../lib/types";

describe("Nimba Stay — Clash Rules & Availability", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("Rule 1: Same-day checkout & check-in do not clash", () => {
    it("should allow a new guest to arrive on the exact day an existing guest departs", () => {
      const clash = doIntervalsClash(
        "2026-11-15",
        "2026-11-20",
        "2026-11-20",
        "2026-11-25"
      );
      expect(clash).toBe(false);
    });

    it("should allow a new guest to depart on the exact day an existing guest arrives", () => {
      const clash = doIntervalsClash(
        "2026-11-20",
        "2026-11-25",
        "2026-11-15",
        "2026-11-20"
      );
      expect(clash).toBe(false);
    });

    it("should detect an actual clash when dates overlap by even 1 night", () => {
      const clash = doIntervalsClash(
        "2026-11-15",
        "2026-11-20",
        "2026-11-19",
        "2026-11-23"
      );
      expect(clash).toBe(true);
    });

    it("should detect a clash when requested stay is completely inside an existing stay", () => {
      const clash = doIntervalsClash(
        "2026-11-10",
        "2026-11-25",
        "2026-11-12",
        "2026-11-15"
      );
      expect(clash).toBe(true);
    });
  });

  describe("Rule 2: Cancelled bookings block nothing", () => {
    it("should ignore cancelled bookings and report room as available", () => {
      const mockRooms: Room[] = [
        {
          id: 1,
          number: "101",
          category: "Standard",
          price_per_night: 2500,
          status: "available",
        },
      ];

      const mockBookings: Booking[] = [
        {
          id: 10,
          room_id: 1,
          guest_name: "Rahul Verma",
          guest_phone: "9876543210",
          check_in: "2026-11-15",
          check_out: "2026-11-20",
          status: "cancelled",
          created_at: new Date().toISOString(),
        },
      ];

      jest.spyOn(db, "getAllRooms").mockReturnValue(mockRooms);
      jest.spyOn(db, "getAllBookings").mockReturnValue(mockBookings);

      const available = findAvailableRooms("2026-11-15", "2026-11-20");
      expect(available.map((r) => r.id)).toContain(1);

      const clash = hasClash(1, "2026-11-15", "2026-11-20");
      expect(clash).toBe(false);
    });

    it("should still block if there is a confirmed booking alongside a cancelled one", () => {
      const mockBookings: Booking[] = [
        {
          id: 1,
          room_id: 1,
          guest_name: "Cancelled Guest",
          guest_phone: "9876543210",
          check_in: "2026-11-15",
          check_out: "2026-11-20",
          status: "cancelled",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          room_id: 1,
          guest_name: "Confirmed Guest",
          guest_phone: "9123456780",
          check_in: "2026-11-18",
          check_out: "2026-11-22",
          status: "confirmed",
          created_at: new Date().toISOString(),
        },
      ];

      jest.spyOn(db, "getAllBookings").mockReturnValue(mockBookings);

      const clash = hasClash(1, "2026-11-17", "2026-11-19");
      expect(clash).toBe(true);
    });
  });

  describe("Rule 3: Rooms with status maintenance are never free", () => {
    it("should never include maintenance rooms in available search results", () => {
      const mockRooms: Room[] = [
        {
          id: 1,
          number: "101",
          category: "Standard",
          price_per_night: 2500,
          status: "available",
        },
        {
          id: 2,
          number: "102",
          category: "Standard",
          price_per_night: 2500,
          status: "maintenance",
        },
        {
          id: 3,
          number: "301",
          category: "Suite",
          price_per_night: 7500,
          status: "maintenance",
        },
      ];

      jest.spyOn(db, "getAllRooms").mockReturnValue(mockRooms);
      jest.spyOn(db, "getAllBookings").mockReturnValue([]);

      const available = findAvailableRooms("2026-12-01", "2026-12-05");

      const availableIds = available.map((r) => r.id);
      expect(availableIds).toContain(1);
      expect(availableIds).not.toContain(2);
      expect(availableIds).not.toContain(3);
    });

    it("should calculate correct total stay price for available rooms", () => {
      const mockRooms: Room[] = [
        {
          id: 1,
          number: "101",
          category: "Standard",
          price_per_night: 2500,
          status: "available",
        },
      ];

      jest.spyOn(db, "getAllRooms").mockReturnValue(mockRooms);
      jest.spyOn(db, "getAllBookings").mockReturnValue([]);

      const available = findAvailableRooms("2026-12-01", "2026-12-04");
      expect(available).toHaveLength(1);
      expect(available[0].price_per_night).toBe(2500);
      expect(available[0].total_price).toBe(7500);
    });
  });
});
