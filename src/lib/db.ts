import fs from "fs/promises";
import path from "path";

export interface Booking {
    id: string;
    name: string;
    email: string;
    date: string;
    timeSlot: string;
    lane: number;
    swimmers: number;
    status: "upcoming" | "completed" | "cancelled";
    createdAt: string;
    paymentIntentId?: string;
}

const DB_PATH = path.join(process.cwd(), "booking-db.json");

async function ensureDB() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, JSON.stringify([]), "utf-8");
    }
}

export async function getBookings(): Promise<Booking[]> {
    await ensureDB();
    const data = await fs.readFile(DB_PATH, "utf-8");
    const bookings: Booking[] = JSON.parse(data || "[]");

    // Auto-update status based on current time
    const now = new Date();
    let changed = false;

    const updated = bookings.map(b => {
        if (b.status === "cancelled") return b;
        const bookingTime = new Date(`${b.date}T${to24h(b.timeSlot)}`);
        if (bookingTime < now && b.status === "upcoming") {
            changed = true;
            return { ...b, status: "completed" as const };
        }
        return b;
    });

    if (changed) {
        await setBookings(updated);
    }

    return updated;
}

export async function setBookings(bookings: Booking[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2), "utf-8");
}

function to24h(slot: string): string {
    const [time, period] = slot.split(" ");
    let [h] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:00:00`;
}
