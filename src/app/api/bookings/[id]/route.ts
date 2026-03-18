import { NextResponse } from "next/server";
import { getBookings, setBookings } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const bookings = await getBookings();
        const index = bookings.findIndex(b => b.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        // Cancel booking
        bookings[index].status = "cancelled";
        await setBookings(bookings);

        return NextResponse.json({ success: true, booking: bookings[index] });
    } catch (error) {
        console.error("Failed to cancel booking", error);
        return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
    }
}
