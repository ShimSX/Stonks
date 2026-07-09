import { useState } from "react";
import type { Company } from "../types";
import { emptyCompany } from "../constants";

interface Props {
  onSave: (company: Company) => void;
  onCancel: () => void;
}

const STORY_PLACEHOLDER =
  "What do they do? Why might it 10X? What must happen? Main risk?";

export function QuickAddForm({ onSave, onCancel }: Props) {
  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [story, setStory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = ticker.trim().toUpperCase();
    const n = name.trim();
    const s = story.trim();
    if (!t || !n || !s) return;

    onSave({
      ...emptyCompany(),
      ticker: t,
      name: n,
      story: s,
      summary: s.slice(0, 160),
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form className="quick-add-form" onSubmit={handleSubmit}>
      <p className="quick-add-intro">
        Three fields only. You can deepen the sheet later — product, customers, people, full checklist.
      </p>

      <div className="field">
        <label htmlFor="qa-ticker">Ticker</label>
        <input
          id="qa-ticker"
          required
          maxLength={10}
          placeholder="e.g. SHOP"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          autoFocus
        />
      </div>

      <div className="field">
        <label htmlFor="qa-name">Company name</label>
        <input
          id="qa-name"
          required
          placeholder="e.g. Shopify Inc."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="qa-story">Two-minute story</label>
        <p className="help">The only thing that matters on day one.</p>
        <textarea
          id="qa-story"
          required
          className="story-textarea"
          placeholder={STORY_PLACEHOLDER}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={6}
        />
      </div>

      <div className="button-row">
        <button className="btn" type="submit">
          Save company
        </button>
        <button className="btn secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
