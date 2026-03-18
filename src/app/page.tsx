import Link from "next/link";

const features = [
  { icon: "🏊", title: "8 Professional Lanes", desc: "Competition-standard lanes with anti-wave dividers and precision depth markings for every skill level." },
  { icon: "⚡", title: "Instant Booking", desc: "Reserve your lane in under a minute. Real-time slot availability with instant email confirmation." },
  { icon: "🎯", title: "Flexible Schedules", desc: "16 daily time slots from 6 AM to 10 PM. Reserve for a quick swim or an all-day event." },
  { icon: "🎉", title: "Exclusive Events", desc: "Book the entire pool for birthday parties, social hangouts, or private night sessions." },
];

const stats = [
  { value: "8", label: "Swim Lanes" },
  { value: "16", label: "Daily Slots" },
  { value: "5000+", label: "Happy Swimmers" },
  { value: "7", label: "Days a Week" },
];

const steps = [
  { n: "01", title: "Pick a Date", desc: "Choose any available date and view open slots in real time." },
  { n: "02", title: "Select Your Slot", desc: "Browse morning, afternoon, or evening sessions that fit your schedule." },
  { n: "03", title: "Dive In!", desc: "Receive instant confirmation and head to the pool stress-free." },
];

const schedule = [
  { emoji: "🌅", period: "Morning", time: "6:00 AM – 12:00 PM" },
  { emoji: "☀️", period: "Afternoon", time: "12:00 PM – 6:00 PM", popular: true },
  { emoji: "🌙", period: "Evening", time: "6:00 PM – 10:00 PM" },
];

export default function Home() {
  return (
    <main style={{ background: "#060e1a" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: "95vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Background Image with Layered Overlays */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/hero-main.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(6,14,26,0.8) 0%, rgba(6,14,26,0.4) 50%, rgba(6,14,26,0.9) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 20% 30%, rgba(6,182,212,0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(129,140,248,0.15), transparent 50%)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 1000, margin: "0 auto" }}>
          <div className="animate-fade-in-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: 30, padding: "8px 20px", marginBottom: 32, backdropFilter: "blur(10px)"
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", display: "inline-block" }} className="animate-pulse" />
            <span style={{ color: "#22d3ee", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>PREMIUM AQUATIC EXPERIENCE</span>
          </div>

          <h1 className="animate-fade-in-up delay-1" style={{
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)", fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.03em", marginBottom: 32, opacity: 0, color: "white"
          }}>
            Where <span className="animate-gradient" style={{
              background: "linear-gradient(90deg,#06b6d4,#22d3ee,#818cf8,#06b6d4)",
              backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Performance</span><br />Meets <span style={{ color: "#818cf8" }}>Celebration</span>
          </h1>

          <p className="animate-fade-in-up delay-2" style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.7)", maxWidth: 620, margin: "0 auto 48px", lineHeight: 1.6, opacity: 0 }}>
            The ultimate destination for elite swim training and unforgettable private events. Professional lanes by day, exclusive parties by night.
          </p>

          <div className="animate-fade-in-up delay-3" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", opacity: 0 }}>
            <Link href="/booking" className="btn-primary" style={{ padding: "18px 40px", fontSize: 16, borderRadius: 16 }}>
              Start Your Booking
            </Link>
          </div>
        </div>

        {/* Bottom fade wave */}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 150, background: "linear-gradient(to top, #060e1a, transparent)", zIndex: 5 }} />
      </section>

      {/* ── CHOICE SECTION ── */}
      <section style={{ padding: "40px 24px 100px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            
            {/* Swim Card */}
            <div className="glass-card animate-fade-in-up" style={{ padding: "48px 40px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.05 }}>🏊</div>
              <p style={{ color: "#22d3ee", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", marginBottom: 16 }}>TRAINING & RECREATION</p>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "white", marginBottom: 20 }}>Individual Lanes</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32, lineHeight: 1.7 }}>
                Book a professional 25m lane for your daily workout. Precision depth, anti-wave dividers, and live slot tracking.
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 40, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                {["Single lane focus", "Professional equipment", "6 AM - 10 PM slots"].map(li => (
                  <li key={li} style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#22d3ee" }}>✓</span> {li}
                  </li>
                ))}
              </ul>
              <Link href="/booking?type=lane" className="btn-secondary" style={{ width: "100%", textAlign: "center", display: "block" }}>Book a Lane</Link>
            </div>

            {/* Event Card */}
            <div className="glass-card animate-fade-in-up" style={{ padding: "48px 40px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(129,140,248,0.1), rgba(6,14,26,0.1))", borderColor: "rgba(129,140,248,0.3)" }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.05 }}>🎉</div>
              <p style={{ color: "#818cf8", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", marginBottom: 16 }}>EXCLUSIVE BOOKINGS</p>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "white", marginBottom: 20 }}>Private Events</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32, lineHeight: 1.7 }}>
                Take over the entire facility for your next big celebration. Birthdays, evening hangouts, or private swimming galas.
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 40, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                {["Entire pool access", "Custom lighting options", "Up to 50 guests"].map(li => (
                  <li key={li} style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#818cf8" }}>★</span> {li}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="btn-primary" style={{ width: "100%", textAlign: "center", display: "block", background: "linear-gradient(135deg, #818cf8, #6366f1)" }}>Plan Your Event</Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="glass-card" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderRadius: 20, overflow: "hidden" }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "36px 16px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <div style={{
                  fontSize: "2.6rem", fontWeight: 900, marginBottom: 4,
                  background: "linear-gradient(135deg,#06b6d4,#818cf8)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#22d3ee", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Why AquaBook?</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, color: "white", marginBottom: 16 }}>
              Everything for the<br /><span style={{ color: "#06b6d4" }}>perfect session</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              State-of-the-art facilities for individual swimmers and private event hosts.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: "40px 32px", textAlign: "center" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 64, height: 64, borderRadius: 18, fontSize: 30, marginBottom: 20,
                  background: "linear-gradient(135deg,rgba(6,182,212,0.15),rgba(129,140,248,0.15))",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}>{f.icon}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: 14 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(180deg,#060e1a,#081a30,#060e1a)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#22d3ee", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Simple Process</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, color: "white" }}>How it works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 32 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="animate-pulse-glow" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 64, height: 64, borderRadius: "50%", marginBottom: 20,
                  background: "linear-gradient(135deg,#06b6d4,#6366f1)",
                  color: "white", fontWeight: 900, fontSize: 18,
                }}>{s.n}</div>
                <h3 style={{ fontWeight: 700, color: "white", fontSize: "1.1rem", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p style={{ color: "#22d3ee", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Hours & Availability</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, color: "white" }}>Pool Schedule</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {schedule.map((s, i) => (
              <div key={i} className="glass-card" style={{
                padding: "40px 24px", textAlign: "center",
                background: s.popular ? "linear-gradient(135deg,rgba(6,182,212,0.1),rgba(99,102,241,0.1))" : undefined,
                borderColor: s.popular ? "rgba(6,182,212,0.35)" : undefined,
              }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.emoji}</div>
                <h3 style={{ fontWeight: 700, color: "white", fontSize: "1.1rem", marginBottom: 8 }}>{s.period}</h3>
                <p style={{ color: "#22d3ee", fontWeight: 600, fontSize: 14 }}>{s.time}</p>
                {s.popular && <span style={{
                  display: "inline-block", marginTop: 12, fontSize: 11, fontWeight: 700,
                  background: "rgba(6,182,212,0.2)", color: "#22d3ee",
                  padding: "3px 12px", borderRadius: 20,
                }}>MOST POPULAR</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div className="glass-card animate-pulse-glow" style={{
            padding: "64px 40px",
            background: "linear-gradient(135deg,rgba(6,182,212,0.08),rgba(99,102,241,0.08))",
            borderColor: "rgba(6,182,212,0.25)",
          }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🏊‍♂️</div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "white", marginBottom: 16 }}>Ready to Dive In?</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
              Book your lane today and experience premium aquatic facilities.
            </p>
            <Link href="/booking" className="btn-primary" style={{ padding: "14px 36px", fontSize: 15 }}>
              Book Your Lane →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>© 2025 AquaBook. All rights reserved.</p>
      </footer>
    </main>
  );
}
