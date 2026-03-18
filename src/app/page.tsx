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
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Animated bg */}
        <div className="animate-gradient" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg,#060e1a 0%,#0c2a4a 30%,#073344 60%,#060e1a 100%)",
        }} />

        {/* Rotating rings */}
        {[700, 500, 320].map((size, i) => (
          <div key={i} style={{
            position: "absolute", left: "50%", top: "50%",
            width: size, height: size, borderRadius: "50%",
            border: `1px solid rgba(6,182,212,${0.08 - i * 0.02})`,
            transform: "translate(-50%,-50%)",
            animation: `spinSlow ${30 + i * 8}s linear infinite ${i % 2 ? "reverse" : ""}`,
          }} />
        ))}

        {/* Floating bubbles */}
        {[
          { w: 90, l: "8%", t: "18%", d: 0 },
          { w: 130, l: "82%", t: "55%", d: 1.5 },
          { w: 60, l: "65%", t: "15%", d: 3 },
          { w: 100, l: "20%", t: "70%", d: 2 },
          { w: 55, l: "90%", t: "25%", d: 4 },
        ].map((b, i) => (
          <div key={i} className={i % 3 === 0 ? "animate-float" : i % 3 === 1 ? "animate-float-2" : "animate-float-3"} style={{
            position: "absolute", left: b.l, top: b.t,
            width: b.w, height: b.w, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(6,182,212,0.12), transparent)",
            border: "1px solid rgba(6,182,212,0.15)",
            backdropFilter: "blur(8px)",
            animationDelay: `${b.d}s`,
          }} />
        ))}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 860, margin: "0 auto" }}>
          <div className="animate-fade-in-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: 30, padding: "6px 16px", marginBottom: 28,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", display: "inline-block" }} className="animate-pulse" />
            <span style={{ color: "#22d3ee", fontSize: 13, fontWeight: 600 }}>Now accepting reservations</span>
          </div>

          <h1 className="animate-fade-in-up delay-1" style={{
            fontSize: "clamp(3.2rem, 9vw, 6.5rem)", fontWeight: 900, lineHeight: 1.05,
            letterSpacing: "-0.02em", marginBottom: 24, opacity: 0,
          }}>
            <span style={{ color: "white" }}>Dive Into </span>
            <span className="animate-gradient" style={{
              background: "linear-gradient(90deg,#06b6d4,#22d3ee,#818cf8,#06b6d4)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Your Perfect</span>
            <br />
            <span style={{ color: "white" }}>Swim</span>
          </h1>

          <p className="animate-fade-in-up delay-2" style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, opacity: 0 }}>
            Reserve your lane or book the entire pool for exclusive events. From professional training to birthday parties and night hangouts.
          </p>

          <div className="animate-fade-in-up delay-3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: 0 }}>
            <Link href="/booking" className="btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Book a Lane Now
            </Link>
            <Link href="/dashboard" className="btn-secondary" style={{ padding: "14px 32px", fontSize: 15 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              My Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, overflow: "hidden", height: 110 }}>
          <svg viewBox="0 0 1800 110" preserveAspectRatio="none" className="animate-wave"
            style={{ width: "200%", height: "100%", marginLeft: "-50%" }}>
            <path d="M0,55 C450,110 900,0 1350,55 C1575,82 1700,28 1800,55 L1800,110 L0,110 Z" fill="rgba(6,14,26,0.7)" />
            <path d="M0,75 C300,20 600,100 900,55 C1200,10 1500,95 1800,55 L1800,110 L0,110 Z" fill="#060e1a" />
          </svg>
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
