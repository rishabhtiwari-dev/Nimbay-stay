import { NextRequest, NextResponse } from "next/server";
import { validateAvailabilityParams } from "@/lib/validators";
import { findAvailableRooms } from "@/lib/rooms";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const checkIn = searchParams.get("checkIn") || undefined;
  const checkOut = searchParams.get("checkOut") || undefined;
  const category = searchParams.get("category") || undefined;

  const err = validateAvailabilityParams({ checkIn, checkOut, category });
  if (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }

  const rooms = findAvailableRooms(checkIn!, checkOut!, category);

  return NextResponse.json({ rooms });
}
