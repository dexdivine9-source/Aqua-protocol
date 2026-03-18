"use client";
import { useState, useEffect } from "react";

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

export function useBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings");
            if (!res.ok) throw new Error("Failed to fetch bookings");
            const data = await res.json();
            setBookings(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const addBooking = async (data: Omit<Booking, "id" | "status" | "createdAt" | "paymentIntentId">): Promise<Booking> => {
        const res = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const resData = await res.json();
        if (!res.ok) {
            throw new Error(resData.error || "Failed to book slot");
        }

        setBookings((prev) => [...prev, resData.booking]);
        return resData.booking;
    };

    const cancelBooking = async (id: string) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: "PATCH" });
            if (!res.ok) throw new Error("Failed to cancel");
            setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)));
        } catch (e) {
            console.error(e);
            alert("Failed to cancel the booking. Please try again.");
        }
    };

    return { bookings, addBooking, cancelBooking, loading, error, refreshBookings: fetchBookings };
}
