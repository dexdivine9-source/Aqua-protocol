"use client";
import { useState } from "react";
import Link from "next/link";
import { useBookings, Booking } from "@/hooks/useBookings";

type Filter = "all" | "upcoming" | "completed" | "cancelled";

export default function DashboardPage() {
    const { bookings, cancelBooking, loading, error, refreshBookings } = useBookings();
    const [filter, setFilter] = useState<Filter>("all");

    const counts = {
        all: bookings.length,
        upcoming: bookings.filter(b => b.status === "upcoming").length,
        completed: bookings.filter(b => b.status === "completed").length,
        cancelled: bookings.filter(b => b.status === "cancelled").length,
    };

    const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);
    const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const statCards = [
        { label: "Total Bookings", value: counts.all, icon: "📋", color: "#06b6d4" },
        { label: "Upcoming", value: counts.upcoming, icon: "⏳", color: "#22d3ee" },
        { label: "Completed", value: counts.completed, icon: "✅", color: "#4ade80" },
        { label: "Cancelled", value: counts.cancelled, icon: "❌", color: "#f87171" },
    ];

    const filterTabs: { key: Filter; label: string }[] = [
        { key: "all", label: "All" },
        { key: "upcoming", label: "Upcoming" },
        { key: "completed", label: "Completed" },
        { key: "cancelled", label: "Cancelled" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#060e1a", paddingTop: 90 }}>
            {/* Header */}
            <div style={{ padding: "48px 24px 36px", maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                    <div>
                        <p style={{ color: "#22d3ee", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Your Account</p>
                        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "white", marginBottom: 8 }}>My Dashboard</h1>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Manage and track all your pool reservations. Data is synced from the backend.</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button onClick={refreshBookings} className="btn-secondary" style={{ padding: "11px 20px", fontSize: 13 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                            Refresh
                        </button>
                        <Link href="/booking" className="btn-primary" style={{ padding: "11px 20px", fontSize: 13 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            New Booking
                        </Link>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
                    {statCards.map((s, i) => (
                        <div key={i} className="glass-card" style={{ padding: "22px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{
                                width: 50, height: 50, borderRadius: 14, fontSize: 22,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                background: `${s.color}18`, border: `1px solid ${s.color}30`,
                            }}>{s.icon}</div>
                            <div>
                                <div style={{ fontSize: loading ? "1rem" : "1.9rem", fontWeight: 900, color: s.color }}>
                                    {loading ? "—" : s.value}
                                </div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Error banner */}
                {error && (
                    <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "14px 20px", marginBottom: 20, color: "#fca5a5", fontSize: 14 }}>
                        ⚠️ {error} — Make sure the dev server is running and try refreshing.
                    </div>
                )}

                {/* Filter tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                    {filterTabs.map(tab => (
                        <button key={tab.key} onClick={() => setFilter(tab.key)} style={{
                            padding: "8px 18px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer",
                            transition: "all 0.2s",
                            background: filter === tab.key ? "linear-gradient(135deg,#06b6d4,#6366f1)" : "rgba(255,255,255,0.05)",
                            color: filter === tab.key ? "white" : "rgba(255,255,255,0.5)",
                            border: filter === tab.key ? "none" : "1px solid rgba(255,255,255,0.1)",
                        }}>
                            {tab.label} <span style={{ opacity: 0.7, fontSize: 12 }}>({loading ? "…" : counts[tab.key]})</span>
                        </button>
                    ))}
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-card" style={{ padding: "28px", borderRadius: 18, display: "flex", gap: 16, alignItems: "center" }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.05)", animation: "pulseGlow 1.5s ease-in-out infinite" }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ width: "40%", height: 14, borderRadius: 7, background: "rgba(255,255,255,0.06)", marginBottom: 10 }} />
                                    <div style={{ width: "70%", height: 11, borderRadius: 7, background: "rgba(255,255,255,0.04)" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bookings list */}
                {!loading && sorted.length === 0 && (
                    <div className="glass-card" style={{ padding: "80px 40px", textAlign: "center" }}>
                        <div style={{ fontSize: 52, marginBottom: 16 }}>🏊</div>
                        <h3 style={{ color: "white", fontWeight: 700, fontSize: "1.2rem", marginBottom: 12 }}>
                            {filter === "all" ? "No bookings yet" : `No ${filter} bookings`}
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 28 }}>
                            {filter === "all" ? "Make your first reservation and dive in!" : "Switch filters to see other bookings."}
                        </p>
                        {filter === "all" && (
                            <Link href="/booking" className="btn-primary" style={{ padding: "12px 28px", fontSize: 14 }}>Book a Lane</Link>
                        )}
                    </div>
                )}

                {!loading && sorted.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {sorted.map((b: Booking) => (
                            <BookingCard key={b.id} booking={b} onCancel={cancelBooking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel: (id: string) => void }) {
    const [cancelling, setCancelling] = useState(false);
    const dateStr = new Date(booking.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "short", year: "numeric", month: "short", day: "numeric",
    });

    const handleCancel = async () => {
        if (!confirm(`Cancel booking ${booking.id}?`)) return;
        setCancelling(true);
        await onCancel(booking.id);
        setCancelling(false);
    };

    return (
        <div className="glass-card" style={{
            padding: "22px 26px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 16, flexWrap: "wrap", borderRadius: 18,
            borderColor: booking.status === "upcoming" ? "rgba(6,182,212,0.2)" : undefined,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flex: 1, flexWrap: "wrap" }}>
                {/* Lane badge */}
                <div style={{
                    width: 54, height: 54, borderRadius: 14, flexShrink: 0,
                    background: "linear-gradient(135deg,rgba(6,182,212,0.12),rgba(99,102,241,0.12))",
                    border: "1px solid rgba(6,182,212,0.2)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>LANE</span>
                    <span style={{ fontSize: 22, fontWeight: 900, color: "#22d3ee", lineHeight: 1 }}>{booking.lane}</span>
                </div>

                <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{booking.name}</span>
                        <span className={`badge-${booking.status}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                        {booking.paymentIntentId && (
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
                                {booking.paymentIntentId}
                            </span>
                        )}
                    </div>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                        {[
                            ["📅", dateStr],
                            ["⏰", booking.timeSlot],
                            ["👥", `${booking.swimmers} swimmer${booking.swimmers > 1 ? "s" : ""}`],
                            ["🆔", booking.id],
                        ].map(([icon, val]) => (
                            <span key={String(icon)} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4 }}>
                                {icon} {val}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {booking.status === "upcoming" && (
                <button className="btn-danger" disabled={cancelling} onClick={handleCancel} style={{ flexShrink: 0, opacity: cancelling ? 0.6 : 1 }}>
                    {cancelling ? "Cancelling…" : "Cancel"}
                </button>
            )}
        </div>
    );
}
