import React, { useState, useEffect } from "react";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const colors = {
        dark: "#533710",
        deep: "#6E4B1F",
        warm: "#98651E",
        light: "#F0D394",
        white: "#FFFFFF"
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setModalOpen(false);
        };
        if (modalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [modalOpen]);

    function validate() {
        if (!email) return "Email is required.";
        // simple email pattern
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) return "Enter a valid email.";
        if (!password) return "Password is required.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        return "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        setLoading(true);
        // Mock auth: accept any valid email/password — replace with real API call.
        await new Promise((r) => setTimeout(r, 700));
        localStorage.setItem("loggedIn", "true");
        setLoading(false);
        setModalOpen(false);
        // redirect to home/dashboard
        window.location.href = "/";
    }

    return (
        <>
            <div className="login-launcher">
                <p className="launcher-text">
                   <h1>Welcome to Next‑Gen Coffee — click below to sign in.</h1> 
                </p>
                <button
                    className="open-login-btn"
                    onClick={() => setModalOpen(true)}
                    aria-haspopup="dialog"
                >
                    Login
                </button>
            </div>

            {modalOpen && (
                <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setModalOpen(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" aria-label="Close login" onClick={() => setModalOpen(false)}>×</button>

                        <div className="login-card" role="main" aria-labelledby="login-title">
                            <h1 id="login-title" className="brand">Next‑Gen Coffee</h1>
                            <form className="login-form" onSubmit={handleSubmit} noValidate>
                                <label className="field">
                                    <span className="label-text">Email</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                    />
                                </label>

                                <label className="field">
                                    <span className="label-text">Password</span>
                                    <div className="password-row">
                                        <input
                                            type={showPass ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••"
                                            autoComplete="current-password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-btn"
                                            aria-pressed={showPass}
                                            onClick={() => setShowPass((s) => !s)}
                                            title={showPass ? "Hide password" : "Show password"}
                                        >
                                            {showPass ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </label>

                                {error && <div className="error">{error}</div>}

                                <button className="submit-btn" type="submit" disabled={loading}>
                                    {loading ? "Signing in…" : "Sign in"}
                                </button>
                            </form>

                            <p className="foot">Use your email and password to access the system.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}