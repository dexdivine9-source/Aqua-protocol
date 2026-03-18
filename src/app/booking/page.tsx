"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookings } from "@/hooks/useBookings";

const TIME_SLOTS = {
    Morning: ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
    Afternoon: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
    Evening: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
};

const today = new Date().toISOString().split("T")[0];

export default function BookingPage() {
    const router = useRouter();
    const { addBooking, bookings } = useBookings();

    const [form, setForm] = useState({ 
        name: "", 
        email: "", 
        date: "", 
        timeSlot: "", 
        lane: 0, 
        swimmers: 1, 
        type: "lane" as "lane" | "birthday" | "hangout" | "night_party" 
    });
    const [submitted, setSubmitted] = useState(false);
    const [bookingId, setBookingId] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setField = (key: string, val: string | number) => {
        setForm(f => ({ ...f, [key]: val }));
        setErrors(e => ({ ...e, [key]: "" }));
        setSubmitError("");
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
        if (!form.date) e.date = "Please select a date";
        if (!form.timeSlot) e.timeSlot = "Please select a time slot";
        if (!form.lane) e.lane = "Please select a lane";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // Check if a slot is taken, accounting for full-pool (lane 0) vs individual lanes
    const isSlotTaken = (slot: string, lane: number) =>
        bookings.some(b => {
            if (b.status !== "upcoming" || b.date !== form.date || b.timeSlot !== slot) return false;
            // If the EXISTING booking is all-lanes, or the NEW request is all-lanes, it's taken
            if (b.lane === 0 || lane === 0) return true;
            // Otherwise, only if same lane
            return b.lane === lane;
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        // Client-side double-booking check before even hitting the API
        if (isSlotTaken(form.timeSlot, form.lane)) {
            setSubmitError("This lane and time slot is already booked. Please pick a different lane or time.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const b = await addBooking({
                name: form.name,
                email: form.email,
                date: form.date,
                timeSlot: form.timeSlot,
                lane: form.type === "lane" ? form.lane : 0,
                swimmers: form.swimmers,
                type: form.type,
            });
            setBookingId(b.id);
            setSubmitted(true);
        } catch (err: any) {
            setSubmitError(err.message || "Failed to book slot. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ── SUCCESS SCREEN ── */
    if (submitted) {
        return (
            <div style={{ minHeight: "100vh", background: "#060e1a", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px" }}>
                <div className="glass-card animate-fade-in-up" style={{ maxWidth: 520, width: "100%", padding: "60px 40px", textAlign: "center" }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                    <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", marginBottom: 8 }}>Booking Confirmed!</h2>
                    <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 4, fontSize: 14 }}>
                        Booking ID: <span style={{ color: "#22d3ee", fontWeight: 700 }}>{bookingId}</span>
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 24 }}>
                        A payment record has been created and stored in the system.
                    </p>

                    <div className="glass" style={{ borderRadius: 16, padding: 24, margin: "0 0 28px", textAlign: "left" }}>
                        {[
                            ["👤 Name", form.name],
                            ["📧 Email", form.email],
                            ["📅 Date", new Date(form.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
                            ["⏰ Time", form.timeSlot],
                            ["🏊 Mode", form.type === "lane" ? `Lane ${form.lane}` : "Full Pool (All Lanes)"],
                            ["🎉 Type", form.type.charAt(0).toUpperCase() + form.type.slice(1)],
                            ["👥 Swimmers", String(form.swimmers)],
                        ].map(([label, val]) => (
                            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{label}</span>
                                <span style={{ color: "white", fontWeight: 600, fontSize: 13 }}>{val}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                        <button className="btn-primary" style={{ padding: "12px 28px", fontSize: 14 }} onClick={() => router.push("/dashboard")}>
                            View Dashboard
                        </button>
                        <button className="btn-secondary" style={{ padding: "12px 28px", fontSize: 14 }}
                            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", date: "", timeSlot: "", lane: 0, swimmers: 1, type: "lane" }); }}>
                            Book Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── FORM ── */
    return (
        <div style={{ minHeight: "100vh", background: "#060e1a", paddingTop: 90 }}>
            {/* Header */}
            <div style={{ textAlign: "center", padding: "48px 24px 40px" }}>
                <p style={{ color: "#22d3ee", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Reserve Your Spot</p>
                <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "white", marginBottom: 12 }}>Book a Lane</h1>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Fill in the details below. Slots are checked live to prevent double bookings.</p>
            </div>

            <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 80px" }}>
                <form onSubmit={handleSubmit}>

                    {/* ── STEP 0: Booking Type ── */}
                    <div className="glass-card" style={{ padding: "32px", marginBottom: 20 }}>
                        <h2 style={{ fontWeight: 700, color: "white", fontSize: "1.05rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ background: "linear-gradient(135deg,#22d3ee,#818cf8)", borderRadius: 8, width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>★</span>
                            What are you booking for?
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                            {[
                                { id: "lane", label: "Individual Lane", icon: "🏊" },
                                { id: "birthday", label: "Birthday Party", icon: "🎂" },
                                { id: "hangout", label: "Social Hangout", icon: "🤝" },
                                { id: "night_party", label: "Night Party", icon: "🌙" },
                            ].map(t => (
                                <button key={t.id} type="button" 
                                    onClick={() => {
                                        setField("type", t.id);
                                        if (t.id !== "lane") setField("lane", 0);
                                        else setField("lane", 0); // reset lane when switching to individual
                                    }}
                                    className={`glass-card ${form.type === t.id ? "selected" : ""}`}
                                    style={{ 
                                        padding: "16px", cursor: "pointer", transition: "all 0.2s", textAlign: "center",
                                        background: form.type === t.id ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.03)",
                                        borderColor: form.type === t.id ? "#22d3ee" : "rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <div style={{ fontSize: 24, marginBottom: 8 }}>{t.icon}</div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: form.type === t.id ? "#22d3ee" : "white" }}>{t.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── STEP 1: Personal Info ── */}
                    <div className="glass-card" style={{ padding: "32px", marginBottom: 20 }}>
                        <h2 style={{ fontWeight: 700, color: "white", fontSize: "1.05rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)", borderRadius: 8, width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>1</span>
                            Personal Information
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>Full Name</label>
                                <input className="glass-input" placeholder="e.g. Alex Johnson" value={form.name} onChange={e => setField("name", e.target.value)} />
                                {errors.name && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors.name}</p>}
                            </div>
                            <div>
                                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>Email Address</label>
                                <input className="glass-input" type="email" placeholder="alex@example.com" value={form.email} onChange={e => setField("email", e.target.value)} />
                                {errors.email && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    {/* ── STEP 2: Date & Time ── */}
                    <div className="glass-card" style={{ padding: "32px", marginBottom: 20 }}>
                        <h2 style={{ fontWeight: 700, color: "white", fontSize: "1.05rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)", borderRadius: 8, width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>2</span>
                            Date &amp; Time
                        </h2>

                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>Select Date</label>
                            <input className="glass-input" type="date" min={today} value={form.date}
                                onChange={e => { setField("date", e.target.value); setField("timeSlot", ""); }}
                                style={{ maxWidth: 280 }} />
                            {errors.date && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors.date}</p>}
                        </div>

                        {/* Lane quick-pick banner (helps user understand context for slot colouring) */}
                        {form.date && (
                            <div style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.18)", borderRadius: 12, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
                                {form.type !== "lane" 
                                    ? <>Check availability for a <span style={{ color: "#22d3ee", fontWeight: 600 }}>Full Pool Event</span> on <span style={{ color: "#22d3ee", fontWeight: 600 }}>{new Date(form.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>. Greyed slots have existing bookings.</>
                                    : form.lane
                                        ? <>Showing availability for <span style={{ color: "#22d3ee", fontWeight: 600 }}>Lane {form.lane}</span> on <span style={{ color: "#22d3ee", fontWeight: 600 }}>{new Date(form.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>. Greyed slots are already booked.</>
                                        : <>Select a lane in Step 3 first to see live slot availability.</>
                                }
                            </div>
                        )}

                        {(["Morning", "Afternoon", "Evening"] as const).map(period => (
                            <div key={period} style={{ marginBottom: 20 }}>
                                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                                    {period === "Morning" ? "🌅" : period === "Afternoon" ? "☀️" : "🌙"} {period}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {TIME_SLOTS[period].map(slot => {
                                        const taken = form.date && (form.type === "lane" ? (form.lane > 0 && isSlotTaken(slot, form.lane)) : isSlotTaken(slot, 0));
                                        return (
                                            <button key={slot} type="button"
                                                disabled={!!taken}
                                                onClick={() => !taken && setField("timeSlot", slot)}
                                                className={`time-slot ${form.timeSlot === slot ? "selected" : ""}`}
                                                style={{ opacity: taken ? 0.3 : 1, cursor: taken ? "not-allowed" : "pointer", position: "relative" }}
                                            >
                                                {slot}
                                                {taken && <span style={{ display: "block", fontSize: 9, color: "#f87171", fontWeight: 700 }}>TAKEN</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        {errors.timeSlot && <p style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors.timeSlot}</p>}
                    </div>

                    {/* ── STEP 3: Lane & Swimmers ── */}
                    <div className="glass-card" style={{ padding: "32px", marginBottom: 24 }}>
                        <h2 style={{ fontWeight: 700, color: "white", fontSize: "1.05rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)", borderRadius: 8, width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>3</span>
                            Pool Preferences
                        </h2>

                        <div style={{ marginBottom: 28 }}>
                            {form.type === "lane" ? (
                                <>
                                    <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 14, fontWeight: 500 }}>
                                        Select Lane (1–8)
                                        {form.date && form.timeSlot && <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400, marginLeft: 8 }}>— booked lanes for this slot are greyed out</span>}
                                    </label>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => {
                                            const taken = form.date && form.timeSlot && isSlotTaken(form.timeSlot, n);
                                            return (
                                                <button key={n} type="button"
                                                    disabled={!!taken}
                                                    onClick={() => !taken && setField("lane", n)}
                                                    className={`lane-btn ${form.lane === n ? "selected" : ""}`}
                                                    style={{ opacity: taken ? 0.3 : 1, cursor: taken ? "not-allowed" : "pointer" }}
                                                >{n}</button>
                                            );
                                        })}
                                    </div>
                                    {errors.lane && <p style={{ color: "#f87171", fontSize: 12, marginTop: 8 }}>{errors.lane}</p>}
                                </>
                            ) : (
                                <div style={{ background: "rgba(34,211,238,0.1)", border: "1px dashed rgba(34,211,238,0.3)", borderRadius: 16, padding: "20px", textAlign: "center" }}>
                                    <div style={{ fontSize: 24, marginBottom: 6 }}>🏛️</div>
                                    <p style={{ color: "white", fontWeight: 700, fontSize: 14 }}>Private Event Reservation</p>
                                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Parties reserve all 8 lanes exclusively for your group.</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 14, fontWeight: 500 }}>Number of Swimmers</label>
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <button type="button" onClick={() => setField("swimmers", Math.max(1, form.swimmers - 1))}
                                    style={{ width: 40, height: 40, borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", minWidth: 40, textAlign: "center" }}>{form.swimmers}</span>
                                <button type="button" onClick={() => setField("swimmers", Math.min(form.type === "lane" ? 8 : 50, form.swimmers + 1))}
                                    style={{ width: 40, height: 40, borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>{form.type === "lane" ? "Max 8 per lane" : "Max 50 for events"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit error */}
                    {submitError && (
                        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "14px 20px", marginBottom: 20, color: "#fca5a5", fontSize: 14, textAlign: "center" }}>
                            ⚠️ {submitError}
                        </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className="btn-primary"
                        style={{ width: "100%", padding: "16px", fontSize: 16, justifyContent: "center", borderRadius: 16, opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? (
                            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <svg style={{ animation: "spinSlow 1s linear infinite" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /></svg>
                                Processing...
                            </span>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                Confirm Booking
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
