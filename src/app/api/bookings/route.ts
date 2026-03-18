import { NextResponse } from "next/server";
import { getBookings, setBookings, Booking } from "@/lib/db";

export async function GET() {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
}

export async function POST(req: Request) {
    try {
        const body: Omit<Booking, "id" | "status" | "createdAt" | "paymentIntentId"> = await req.json();

        const currentBookings = await getBookings();

        // Prevent double booking logic (handling All-Lanes vs Single-Lane)
        const isConflict = currentBookings.some((b) => {
            if (b.status !== "upcoming" || b.date !== body.date || b.timeSlot !== body.timeSlot) {
                return false;
            }
            // If new booking is for ALL lanes, it conflicts with any existing booking
            if (body.lane === 0) return true;
            // If existing booking is for ALL lanes, it conflicts with any new lane request
            if (b.lane === 0) return true;
            // Otherwise, conflict only if it's the same lane
            return b.lane === body.lane;
        });

        if (isConflict) {
            const msg = body.lane === 0 
                ? "This time slot has existing lane bookings. A full-pool party cannot be scheduled."
                : "This lane or the entire pool is already booked for this time.";
            return NextResponse.json({ error: msg }, { status: 409 });
        }

        // Mock generating a Payment Intent
        const paymentIntentId = "pi_" + Math.random().toString(36).substring(2, 15);

        const newBooking: Booking = {
            ...body,
            id: `BK${Date.now()}`,
            status: "upcoming",
            createdAt: new Date().toISOString(),
            paymentIntentId, // simulating a Stripe or backend payment handler
        };

        currentBookings.push(newBooking);
        await setBookings(currentBookings);

        return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error("Failed to create booking", error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
