export interface Room {
  id: number;
  number: string;
  category: "Standard" | "Deluxe" | "Suite";
  price_per_night: number;
  status: "available" | "maintenance";
}

export interface Booking {
  id: number;
  room_id: number;
  guest_name: string;
  guest_phone: string;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  status: "confirmed" | "cancelled";
  created_at: string;
}

export interface AvailableRoom {
  id: number;
  number: string;
  category: string;
  price_per_night: number;
  total_price: number;
}

export interface BookingRequest {
  room_id: number;
  guest_name: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
}

export interface ApiError {
  error: string;
}
