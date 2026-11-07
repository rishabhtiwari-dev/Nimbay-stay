import {
  validateBooking,
  validateAvailabilityParams,
} from "../lib/validators";

describe("Validation Rules", () => {
  describe("validateBooking", () => {
    it("rejects when checkout is not strictly after checkin", () => {
      const sameDay = validateBooking({
        room_id: 1,
        guest_name: "John Doe",
        guest_phone: "9876543210",
        check_in: "2026-11-20",
        check_out: "2026-11-20",
      });
      expect(sameDay).toBe("Check-out date must be after check-in date");

      const earlierOut = validateBooking({
        room_id: 1,
        guest_name: "John Doe",
        guest_phone: "9876543210",
        check_in: "2026-11-20",
        check_out: "2026-11-19",
      });
      expect(earlierOut).toBe("Check-out date must be after check-in date");
    });

    it("rejects phone numbers that are not exactly 10 digits", () => {
      const shortPhone = validateBooking({
        room_id: 1,
        guest_name: "John Doe",
        guest_phone: "98765",
        check_in: "2026-11-20",
        check_out: "2026-11-22",
      });
      expect(shortPhone).toBe("Phone number must be exactly 10 digits");

      const alphaPhone = validateBooking({
        room_id: 1,
        guest_name: "John Doe",
        guest_phone: "987654321a",
        check_in: "2026-11-20",
        check_out: "2026-11-22",
      });
      expect(alphaPhone).toBe("Phone number must be exactly 10 digits");
    });

    it("accepts valid booking data", () => {
      const valid = validateBooking({
        room_id: 1,
        guest_name: "John Doe",
        guest_phone: "9876543210",
        check_in: "2026-11-20",
        check_out: "2026-11-22",
      });
      expect(valid).toBeNull();
    });
  });

  describe("validateAvailabilityParams", () => {
    it("rejects missing checkIn or checkOut", () => {
      expect(validateAvailabilityParams({})).toBe(
        "checkIn and checkOut query params are required"
      );
      expect(validateAvailabilityParams({ checkIn: "2026-11-20" })).toBe(
        "checkIn and checkOut query params are required"
      );
    });

    it("rejects checkOut not after checkIn", () => {
      expect(
        validateAvailabilityParams({
          checkIn: "2026-11-20",
          checkOut: "2026-11-20",
        })
      ).toBe("checkOut must be after checkIn");
    });

    it("rejects invalid room category", () => {
      expect(
        validateAvailabilityParams({
          checkIn: "2026-11-20",
          checkOut: "2026-11-22",
          category: "PresidentialPenthouse",
        })
      ).toBe("category must be one of: Standard, Deluxe, Suite");
    });

    it("accepts valid params", () => {
      expect(
        validateAvailabilityParams({
          checkIn: "2026-11-20",
          checkOut: "2026-11-22",
          category: "Deluxe",
        })
      ).toBeNull();
    });
  });
});
