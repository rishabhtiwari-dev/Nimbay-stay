import { NextRequest, NextResponse } from "next/server";
import { validateBooking } from "@/lib/validators";
import { hasClash, createBooking } from "@/lib/bookings";
import { getRoomById } from "@/lib/db";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validationError = validateBooking(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const room = getRoomById(body.room_id);
  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  if (room.status === "maintenance") {
    return NextResponse.json({ error: "Room is under maintenance" }, { status: 400 });
  }

  if (hasClash(body.room_id, body.check_in, body.check_out)) {
    return NextResponse.json(
      { error: "Room is already booked for the selected dates" },
      { status: 409 }
    );
  }

  const booking = createBooking(body);
  return NextResponse.json({ booking }, { status: 201 });
}
