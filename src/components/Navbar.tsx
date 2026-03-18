"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { href: "/", label: "Home" },
        { href: "/booking", label: "Book Now" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                padding: scrolled ? "12px 0" : "20px 0",
                background: scrolled ? "rgba(6,14,26,0.85)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 15px rgba(6,182,212,0.4)",
                    }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M2 12C2 12 5.5 7 9.5 7C13.5 7 11 16 15 16C19 16 22 12 22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M2 17C2 17 5.5 13 9.5 13C13.5 13 11 20 15 20C19 20 22 17 22 17" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                        </svg>
                    </div>
                    <span style={{
                        fontSize: 20, fontWeight: 800,
                        background: "linear-gradient(90deg, #06b6d4, #818cf8)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>AquaBook</span>
                </Link>

                {/* Desktop Links */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
                    {links.map(link => (
                        <Link key={link.href} href={link.href} style={{
                            padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: 500,
                            textDecoration: "none", transition: "all 0.2s",
                            color: pathname === link.href ? "#22d3ee" : "rgba(255,255,255,0.7)",
                            background: pathname === link.href ? "rgba(6,182,212,0.12)" : "transparent",
                            border: pathname === link.href ? "1px solid rgba(6,182,212,0.25)" : "1px solid transparent",
                        }}>{link.label}</Link>
                    ))}
                    <Link href="/booking" className="btn-primary" style={{ marginLeft: 12, padding: "10px 22px", fontSize: 14 }}>
                        Book a Lane
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{
                    background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
                    padding: 8, color: "white", cursor: "pointer",
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {menuOpen
                            ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                            : <><line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" /><line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" /><line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" /></>
                        }
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden glass" style={{ margin: "8px 16px", borderRadius: 16, padding: 16 }}>
                    {links.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                            display: "block", padding: "12px 16px", borderRadius: 10, fontSize: 14,
                            fontWeight: 500, textDecoration: "none", color: pathname === link.href ? "#22d3ee" : "rgba(255,255,255,0.75)",
                            marginBottom: 4,
                        }}>{link.label}</Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
