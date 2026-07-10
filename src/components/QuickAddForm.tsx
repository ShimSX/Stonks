import { useState } from "react";
import type { Company } from "../types";
import { emptyCompany } from "../constants";

interface Props {
  onSave: (company: Company) => void;
  onCancel: () => void;
}

export function QuickAddForm({ onSave, onCancel }: Props) {
  const [ticker, setTicker] = useState("");
  const [story, setStory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = ticker.trim().toUpperCase();
    const s = story.trim();
    if (!t || !s) return;

    onSave({
      ...emptyCompany(),
      ticker: t,
      name: t,
      story: s,
      summary: s.slice(0, 160),
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form className="quick-add-form" onSubmit={handleSubmit}>
      <p className="quick-add-intro">
        Two things: ticker and the story. Rename and dig deeper later.
      </p>

      <div className="field">
        <label htmlFor="qa-ticker">Ticker</label>
        <input
          id="qa-ticker"
          required
          maxLength={10}
          placeholder="TSLA"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          autoFocus
        />
      </div>

      <div className="field">
        <label htmlFor="qa-story">Story</label>
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
        <button className="btn" type="submit">
          Add to coverage
        </button>
        <button className="btn secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
