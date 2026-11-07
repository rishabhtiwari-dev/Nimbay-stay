import { BookingRequest } from "./types";

export function validateBooking(body: Partial<BookingRequest>): string | null {
  const { room_id, guest_name, guest_phone, check_in, check_out } = body;

  if (!room_id || !guest_name || !guest_phone || !check_in || !check_out) {
    return "Missing required fields: room_id, guest_name, guest_phone, check_in, check_out";
  }

  if (!/^\d{10}$/.test(guest_phone)) {
    return "Phone number must be exactly 10 digits";
  }

  const inDate = new Date(check_in);
  const outDate = new Date(check_out);

  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
    return "Invalid date format. Use YYYY-MM-DD";
  }

  if (outDate <= inDate) {
    return "Check-out date must be after check-in date";
  }

  return null;
}

export function validateAvailabilityParams(params: {
  checkIn?: string;
  checkOut?: string;
  category?: string;
}): string | null {
  const { checkIn, checkOut } = params;

  if (!checkIn || !checkOut) {
    return "checkIn and checkOut query params are required";
  }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
    return "Invalid date format. Use YYYY-MM-DD";
  }

  if (outDate <= inDate) {
    return "checkOut must be after checkIn";
  }

  const validCategories = ["Standard", "Deluxe", "Suite"];
  if (params.category && !validCategories.includes(params.category)) {
    return `category must be one of: ${validCategories.join(", ")}`;
  }

  return null;
}
