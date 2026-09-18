import { useCallback, useEffect, useState } from "react";
import type { Company, LynchType } from "../types";
import { CompanyForm } from "./CompanyForm";
import { lynchLabel, lynchTypes } from "../constants";
import { CompanyLogo } from "./CompanyLogo";
import { companyToMarkdown, copyMarkdown, downloadMarkdown } from "../data/stonk-framework";
import { formatRelativeDate } from "../utils/dates";
import { STORY_PROMPTS } from "../utils/attention";
import { useEscape } from "../hooks/useEscape";

interface Props {
  company: Company;
  onClose: () => void;
  onSave: (company: Company) => void;
  onDelete: (ticker: string) => void;
  onAddUpdate: (note: string) => void;
  onEditUpdate: (id: string, note: string) => void;
  onDeleteUpdate: (id: string) => void;
  onToast: (message: string) => void;
}

const STORY_PLACEHOLDER =
  "What do they do? Why care? What has to go right? Main risk?";

/** Lynch types only — no buy/sell "calls". You watch the story every day. */
const TYPE_OPTIONS = lynchTypes.filter((t) => t.value !== "unknown");

/**
 * Daily company view:
 * 1) Story feed
 * 2) Core story
 * 3) Lynch company type
 * 4) Product / customers / people (one click)
 */
export function StoryWorkspace({
  company,
  onClose,
  onSave,
  onDelete,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
  onToast,
}: Props) {
  const [more, setMore] = useState(false);
  const [lensesOpen, setLensesOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");
  const [name, setName] = useState(company.name);
  const [story, setStory] = useState(company.story);
  const [product, setProduct] = useState(company.product);
  const [feedback, setFeedback] = useState(company.feedback);
  const [market, setMarket] = useState(company.market);
  const [people, setPeople] = useState(company.peopleVector);
  const [lynchType, setLynchType] = useState(company.lynchType);
  const [note, setNote] = useState("");

  const handleClose = useCallback(() => {
    if (more) {
      setMore(false);
      return;
    }
    onClose();
  }, [more, onClose]);

  useEscape(handleClose);

  useEffect(() => {
    setStory(company.story);
    setName(company.name);
    setLynchType(company.lynchType);
    setProduct(company.product);
    setFeedback(company.feedback);
    setMarket(company.market);
    setPeople(company.peopleVector);
    setMore(false);
    setLensesOpen(false);
    setNote("");
    setEditingId(null);
    setEditNote("");
  }, [
    company.ticker,
    company.story,
    company.name,
    company.lynchType,
    company.product,
    company.feedback,
    company.market,
    company.peopleVector,
  ]);

  function persist(partial: Partial<Company>) {
    onSave({
      ...company,
      ...partial,
      name: (partial.name ?? name).trim() || company.ticker,
      story: (partial.story ?? story).trim(),
      summary: company.summary || (partial.story ?? story).trim().slice(0, 160),
      product: partial.product ?? product,
      feedback: partial.feedback ?? feedback,
      market: partial.market ?? market,
      peopleVector: partial.peopleVector ?? people,
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

  function handleNameBlur() {
    const next = name.trim() || company.ticker;
    if (next !== company.name.trim()) {
      persist({ name: next });
      onToast("Name updated");
    }
  }

  function handleLensBlur<K extends "product" | "feedback" | "market" | "peopleVector">(
    key: K,
    value: string,
  ) {
    if (value.trim() !== (company[key] ?? "").trim()) {
      persist({ [key]: value.trim() } as Partial<Company>);
      onToast("Saved");
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
  }

  function handleDelete() {
    if (confirm(`Delete ${company.ticker}?`)) {
      onDelete(company.ticker);
      onClose();
      onToast(`${company.ticker} deleted`);
    }
  }

  async function handleCopyMd() {
    await copyMarkdown(companyToMarkdown({ ...company, story, name, lynchType, product, feedback, market, peopleVector: people }));
    onToast("Stonk.MD copied");
  }

  function handleDownloadMd() {
    const snapshot = { ...company, story, name, lynchType, product, feedback, market, peopleVector: people };
    downloadMarkdown(`${company.ticker}-stonk.md`, companyToMarkdown(snapshot));
    onToast("Markdown downloaded");
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
              company={{ ...company, story, name, lynchType, product, feedback, market, peopleVector: people }}
              onSave={(c) => {
                onSave(c);
                setMore(false);
                setStory(c.story);
                setName(c.name);
                setLynchType(c.lynchType);
                setProduct(c.product);
                setFeedback(c.feedback);
                setMarket(c.market);
                setPeople(c.peopleVector);
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
      <aside className="drawer drawer-simple" role="dialog" aria-modal="true" aria-label={`${company.ticker} story`}>
        <div className="drawer-header simple-head">
          <div className="simple-title-row">
            <div className="drawer-logo-box sm">
              <CompanyLogo company={company} size={28} />
            </div>
            <div className="min0">
              <h2>
                <span className="ticker-lg">{company.ticker}</span>
              </h2>
              <input
                className="name-inline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleNameBlur}
                aria-label="Company name"
              />
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
                    {editingId === u.id ? (
                      <form
                        className="feed-edit"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!editNote.trim()) return;
                          onEditUpdate(u.id, editNote);
                          setEditingId(null);
                          onToast("Update edited");
                        }}
                      >
                        <textarea
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          rows={3}
                          autoFocus
                          aria-label="Edit update"
                        />
                        <div className="button-row">
                          <button className="btn sm" type="submit" disabled={!editNote.trim()}>
                            Save
                          </button>
                          <button
                            className="btn ghost sm"
                            type="button"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="feed-item-head">
                          <time dateTime={u.date} title={u.date}>
                            {formatRelativeDate(u.date)}
                          </time>
                          <div className="feed-item-actions">
                            <button
                              type="button"
                              className="btn ghost sm"
                              onClick={() => {
                                setEditingId(u.id);
                                setEditNote(u.note);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn ghost sm"
                              onClick={() => {
                                if (confirm("Delete this update?")) {
                                  onDeleteUpdate(u.id);
                                  onToast("Update deleted");
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p>{u.note}</p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="thesis-block">
            <div className="feed-head">
              <span className="level-label">The story (edit anytime)</span>
              {!story.trim() && (
                <button
                  type="button"
                  className="btn ghost sm"
                  onClick={() => setStory(STORY_PROMPTS)}
                >
                  Use prompts
                </button>
              )}
            </div>
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
            <div className="level-label">Company type</div>
            <p className="type-hint">
              How the business behaves — not a buy/sell call. You follow the story either way.
            </p>
            <div className="type-grid">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`type-chip ${lynchType === opt.value ? "active" : ""}`}
                  aria-pressed={lynchType === opt.value}
                  onClick={() => handleType(opt.value)}
                  title={typeTooltip(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            className="level-toggle"
            onClick={() => setLensesOpen((open) => !open)}
            aria-expanded={lensesOpen}
          >
            <span>Product, customers, people</span>
            <span>{lensesOpen ? "−" : "+"}</span>
          </button>
          {lensesOpen && (
            <div className="level-panel lens-edit">
              <div className="field">
                <label htmlFor="lens-product">Product</label>
                <textarea
                  id="lens-product"
                  rows={3}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  onBlur={() => handleLensBlur("product", product)}
                  placeholder="What do they actually sell?"
                />
              </div>
              <div className="field">
                <label htmlFor="lens-feedback">Customer feedback</label>
                <textarea
                  id="lens-feedback"
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  onBlur={() => handleLensBlur("feedback", feedback)}
                  placeholder="What do owners and users say?"
                />
              </div>
              <div className="field">
                <label htmlFor="lens-market">Market</label>
                <textarea
                  id="lens-market"
                  rows={3}
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  onBlur={() => handleLensBlur("market", market)}
                  placeholder="How big is the pond? Who else is in it?"
                />
              </div>
              <div className="field">
                <label htmlFor="lens-people">People</label>
                <textarea
                  id="lens-people"
                  rows={3}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  onBlur={() => handleLensBlur("peopleVector", people)}
                  placeholder="Who is running this, and are they aligned?"
                />
              </div>
            </div>
          )}
        </div>

        <div className="drawer-actions simple-actions">
          <div className="button-row">
            <button className="btn secondary sm" type="button" onClick={() => setMore(true)}>
              Full sheet
            </button>
            <button className="btn ghost sm" type="button" onClick={handleCopyMd}>
              Copy MD
            </button>
            <button className="btn ghost sm" type="button" onClick={handleDownloadMd}>
              Download
            </button>
          </div>
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
