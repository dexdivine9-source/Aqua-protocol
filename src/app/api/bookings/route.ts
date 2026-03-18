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

        // Prevent double booking
        const isConflict = currentBookings.some(
            (b) =>
                b.status === "upcoming" &&
                b.date === body.date &&
                b.timeSlot === body.timeSlot &&
                b.lane === body.lane
        );

        if (isConflict) {
            return NextResponse.json(
                { error: "This slot is already booked. Please choose another lane or time." },
                { status: 409 }
            );
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
