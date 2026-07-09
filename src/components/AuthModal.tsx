import { useState } from "react";

interface Props {
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string) => Promise<void>;
  onMagicLink: (email: string) => Promise<void>;
  error: string | null;
}

type Mode = "signin" | "signup" | "magic";

export function AuthModal({ onClose, onSignIn, onSignUp, onMagicLink, error }: Props) {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setInfo(null);
    try {
      if (mode === "magic") {
        await onMagicLink(email.trim());
        setInfo("Check your email for the magic link.");
      } else if (mode === "signup") {
        await onSignUp(email.trim(), password);
        setInfo("Account created. If email confirm is on, check your inbox — then sign in.");
      } else {
        await onSignIn(email.trim(), password);
        onClose();
      }
    } catch {
      /* error surfaced via prop */
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="proto-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="proto-modal auth-modal">
        <div className="drawer-header" style={{ padding: 0, border: "none", marginBottom: 12 }}>
          <div>
            <h2 id="auth-title" style={{ fontSize: 20 }}>
              {mode === "signup" ? "Create account" : mode === "magic" ? "Magic link" : "Sign in"}
            </h2>
            <p className="sub" style={{ marginTop: 4 }}>
              Your research hub is private and synced when you sign in.
            </p>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "signin" ? "active" : ""}
            onClick={() => setMode("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
          <button
            type="button"
            className={mode === "magic" ? "active" : ""}
            onClick={() => setMode("magic")}
          >
            Magic link
          </button>
        </div>

        <form className="quick-add-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          {mode !== "magic" && (
            <div className="field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
          )}

          {error && <p className="auth-error">{error}</p>}
          {info && <p className="auth-info">{info}</p>}

          <div className="button-row">
            <button className="btn" type="submit" disabled={busy}>
              {busy
                ? "Working…"
                : mode === "signup"
                  ? "Create account"
                  : mode === "magic"
                    ? "Send link"
                    : "Sign in"}
            </button>
            <button className="btn secondary" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
