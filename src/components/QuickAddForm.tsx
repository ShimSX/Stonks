import { useState } from "react";
import type { Company } from "../types";
import { emptyCompany } from "../constants";
import { lookupTicker } from "../utils/tickers";
import { STORY_PROMPTS } from "../utils/attention";

interface Props {
  existingTickers: string[];
  onSave: (company: Company) => void;
  onCancel: () => void;
  onOpenExisting?: (ticker: string) => void;
}

export function QuickAddForm({ existingTickers, onSave, onCancel, onOpenExisting }: Props) {
  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [story, setStory] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  const t = ticker.trim().toUpperCase();
  const duplicate = t.length > 0 && existingTickers.includes(t);
  const lookedUp = lookupTicker(t);

  function applyTicker(value: string) {
    const next = value.toUpperCase().replace(/[^A-Z0-9.-]/g, "").slice(0, 10);
    setTicker(next);
    const hit = lookupTicker(next);
    if (!nameTouched) {
      setName(hit?.name ?? "");
    }
    setDomain(hit?.domain ?? "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const s = story.trim();
    if (!t || !s || duplicate) return;

    onSave({
      ...emptyCompany(),
      ticker: t,
      name: name.trim() || lookedUp?.name || t,
      domain: domain || lookedUp?.domain || "",
      story: s,
      summary: s.slice(0, 160),
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form className="quick-add-form" onSubmit={handleSubmit}>
      <p className="quick-add-intro">
        Ticker, name, and the two-minute story. Everything else can wait.
      </p>

      <div className="split">
        <div className="field">
          <label htmlFor="qa-ticker">Ticker</label>
          <input
            id="qa-ticker"
            required
            maxLength={10}
            placeholder="TSLA"
            value={ticker}
            onChange={(e) => applyTicker(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="field">
          <label htmlFor="qa-name">Company</label>
          <input
            id="qa-name"
            placeholder={lookedUp?.name || "Tesla, Inc."}
            value={name}
            onChange={(e) => {
              setNameTouched(true);
              setName(e.target.value);
            }}
          />
        </div>
      </div>

      {lookedUp && !nameTouched && (
        <p className="hint">Filled {lookedUp.name} from the ticker — edit if you want.</p>
      )}

      {duplicate && (
        <p className="auth-error">
          {t} is already in coverage.{" "}
          {onOpenExisting && (
            <button
              type="button"
              className="linkish"
              onClick={() => onOpenExisting(t)}
            >
              Open it instead
            </button>
          )}
        </p>
      )}

      <div className="field">
        <label htmlFor="qa-story">Story</label>
        {!story.trim() && (
          <button
            type="button"
            className="linkish"
            onClick={() => setStory(STORY_PROMPTS)}
          >
            Use the four Lynch prompts
          </button>
        )}
        <textarea
          id="qa-story"
          required
          className="story-textarea"
          placeholder="What do they do? Why care? What has to go right? Main risk?"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
        />
      </div>

      <div className="button-row">
        <button className="btn" type="submit" disabled={duplicate || !t || !story.trim()}>
          Add to coverage
        </button>
        <button className="btn secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
