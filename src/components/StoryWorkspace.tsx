import { useEffect, useState } from "react";
import type { Company, Recommendation } from "../types";
import { CompanyForm } from "./CompanyForm";
import { recLabel } from "../data/stonk-framework";
import { CompanyLogo } from "./CompanyLogo";

interface Props {
  company: Company;
  onClose: () => void;
  onSave: (company: Company) => void;
  onDelete: (ticker: string) => void;
  onAddUpdate: (note: string) => void;
  onToast: (message: string) => void;
}

const REC_OPTIONS: { value: Recommendation; label: string }[] = [
  { value: "watch", label: "Watch" },
  { value: "buy", label: "Buy" },
  { value: "avoid", label: "Avoid" },
];

const STORY_PLACEHOLDER =
  "What do they do? Why care? What has to go right? Main risk?";

/**
 * Ultra-simple company view:
 * 1) Story feed (updates first — follow the narrative)
 * 2) Core story (one box)
 * 3) One-tap call
 * Everything else lives under "More detail"
 */
export function StoryWorkspace({
  company,
  onClose,
  onSave,
  onDelete,
  onAddUpdate,
  onToast,
}: Props) {
  const [more, setMore] = useState(false);
  const [story, setStory] = useState(company.story);
  const [recommendation, setRecommendation] = useState(company.recommendation);
  const [note, setNote] = useState("");

  useEffect(() => {
    setStory(company.story);
    setRecommendation(company.recommendation);
    setMore(false);
    setNote("");
  }, [company.ticker, company.story, company.recommendation]);

  function persist(partial: Partial<Company>) {
    onSave({
      ...company,
      ...partial,
      story: (partial.story ?? story).trim(),
      summary: company.summary || (partial.story ?? story).trim().slice(0, 160),
      recommendation: partial.recommendation ?? recommendation,
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  }

  function handleStoryBlur() {
    const next = story.trim();
    if (next !== company.story.trim()) {
      persist({ story: next });
      onToast("Story updated");
    }
  }

  function handleRec(value: Recommendation) {
    setRecommendation(value);
    persist({ recommendation: value, story: story.trim() });
    onToast(`Call: ${recLabel(value)}`);
  }

  function handleLog(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = note.trim();
    if (!trimmed) return;
    onAddUpdate(trimmed);
    setNote("");
    onToast("Update logged");
  }

  function handleDelete() {
    if (confirm(`Delete ${company.ticker}?`)) {
      onDelete(company.ticker);
      onClose();
      onToast(`${company.ticker} deleted`);
    }
  }

  const updates = company.storyUpdates ?? [];

  if (more) {
    return (
      <>
        <div className="drawer-backdrop" onClick={onClose} />
        <aside className="drawer" role="dialog" aria-label={`${company.ticker} detail`}>
          <div className="drawer-header">
            <div>
              <h2>More detail</h2>
              <div className="sub">{company.ticker} · full sheet if you need it</div>
            </div>
            <button className="icon-btn" type="button" onClick={() => setMore(false)} aria-label="Back">
              ←
            </button>
          </div>
          <div className="drawer-body">
            <CompanyForm
              company={{ ...company, story, recommendation }}
              onSave={(c) => {
                onSave(c);
                setMore(false);
                setStory(c.story);
                setRecommendation(c.recommendation);
                onToast("Saved");
              }}
              onDelete={(ticker) => {
                onDelete(ticker);
                onClose();
                onToast(`${ticker} deleted`);
              }}
              onCancel={() => setMore(false)}
            />
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer drawer-simple" role="dialog" aria-label={`${company.ticker} story`}>
        <div className="drawer-header simple-head">
          <div className="simple-title-row">
            <div className="drawer-logo-box sm">
              <CompanyLogo company={company} size={28} />
            </div>
            <div className="min0">
              <h2>
                <span className="ticker-lg">{company.ticker}</span>
                <span className="drawer-name"> {company.name}</span>
              </h2>
            </div>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="drawer-body simple-body">
          {/* 1. Story feed — follow changes first */}
          <section className="feed-block">
            <div className="feed-head">
              <span className="level-label">Story feed</span>
              <span className="feed-hint">What changed over time</span>
            </div>

            <form className="feed-compose" onSubmit={handleLog}>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add an update — earnings, product, competition…"
                aria-label="Story update"
              />
              <button className="btn sm" type="submit" disabled={!note.trim()}>
                Post
              </button>
            </form>

            {updates.length === 0 ? (
              <p className="feed-empty">
                No updates yet. When something moves the thesis, post it here so the story stays honest.
              </p>
            ) : (
              <ul className="feed-list">
                {updates.map((u) => (
                  <li key={u.id} className="feed-item">
                    <time dateTime={u.date}>{u.date}</time>
                    <p>{u.note}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* 2. Core thesis — one box */}
          <section className="thesis-block">
            <div className="level-label">The story (edit anytime)</div>
            <textarea
              className="story-textarea story-main"
              placeholder={STORY_PLACEHOLDER}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              onBlur={handleStoryBlur}
              rows={4}
            />
            <p className="autosave-hint">Saves when you click away</p>
          </section>

          {/* 3. Call — three taps */}
          <section className="call-block">
            <div className="level-label">Your call</div>
            <div className="rec-row rec-row-simple">
              {REC_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`rec-chip big ${recommendation === opt.value ? "active" : ""} ${opt.value === "avoid" ? "danger" : ""}`}
                  onClick={() => handleRec(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="drawer-actions simple-actions">
          <button className="btn secondary sm" type="button" onClick={() => setMore(true)}>
            More detail
          </button>
          <button className="btn ghost sm" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </aside>
    </>
  );
}
