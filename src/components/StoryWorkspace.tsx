import { useEffect, useState } from "react";
import type { Company, LynchType } from "../types";
import { CompanyForm } from "./CompanyForm";
import { lynchLabel, lynchTypes } from "../constants";
import { CompanyLogo } from "./CompanyLogo";

interface Props {
  company: Company;
  onClose: () => void;
  onSave: (company: Company) => void;
  onDelete: (ticker: string) => void;
  onAddUpdate: (note: string) => void;
  onToast: (message: string) => void;
}

const STORY_PLACEHOLDER =
  "What do they do? Why care? What has to go right? Main risk?";

/** Lynch types only — no buy/sell "calls". You watch the story every day. */
const TYPE_OPTIONS = lynchTypes.filter((t) => t.value !== "unknown");

/**
 * Ultra-simple company view:
 * 1) Story feed (updates first)
 * 2) Core story
 * 3) Lynch company type (grower / cyclical / etc.)
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
  const [lynchType, setLynchType] = useState(company.lynchType);
  const [note, setNote] = useState("");

  useEffect(() => {
    setStory(company.story);
    setLynchType(company.lynchType);
    setMore(false);
    setNote("");
  }, [company.ticker, company.story, company.lynchType]);

  function persist(partial: Partial<Company>) {
    onSave({
      ...company,
      ...partial,
      story: (partial.story ?? story).trim(),
      summary: company.summary || (partial.story ?? story).trim().slice(0, 160),
      lynchType: partial.lynchType ?? lynchType,
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

  function handleType(value: LynchType) {
    setLynchType(value);
    persist({ lynchType: value, story: story.trim() });
    onToast(`Type: ${lynchLabel(value)}`);
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
              company={{ ...company, story, lynchType }}
              onSave={(c) => {
                onSave(c);
                setMore(false);
                setStory(c.story);
                setLynchType(c.lynchType);
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
          <section className="feed-block">
            <div className="feed-head">
              <span className="level-label">Story feed</span>
              <span className="feed-hint">What changed — keep watching</span>
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
                No updates yet. You watch this name — when the story moves, log it here.
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

          <section className="call-block">
            <div className="level-label">Lynch type</div>
            <p className="type-hint">
              How the business behaves — not a buy/sell call. You follow the story either way.
            </p>
            <div className="type-grid">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`type-chip ${lynchType === opt.value ? "active" : ""}`}
                  onClick={() => handleType(opt.value)}
                  title={typeTooltip(opt.value)}
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

function typeTooltip(type: LynchType): string {
  switch (type) {
    case "fast-grower":
      return "High growth, often smaller — earnings can ramp hard; story must stay intact";
    case "stalwart":
      return "Big, solid, steady compounder — not a 10X lottery ticket";
    case "slow-grower":
      return "Mature, slow growth — often about dividends and capital returns";
    case "cyclical":
      return "Rides economic or industry cycles — buy when hated, sell when loved (Lynch)";
    case "turnaround":
      return "Broken story trying to fix itself — binary outcomes";
    case "asset-play":
      return "Hidden assets, land, cash, IP worth more than the market prices";
    default:
      return "";
  }
}
