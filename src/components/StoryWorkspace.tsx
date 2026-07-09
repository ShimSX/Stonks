import { useEffect, useState } from "react";
import type { Company, Recommendation } from "../types";
import { StonkSheet } from "./StonkSheet";
import { CompanyForm } from "./CompanyForm";
import {
  companyToMarkdown,
  copyMarkdown,
  downloadMarkdown,
  recLabel,
} from "../data/stonk-framework";
import { lynchLabel } from "../constants";
import { CompanyLogo } from "./CompanyLogo";

interface Props {
  company: Company;
  onClose: () => void;
  onSave: (company: Company) => void;
  onDelete: (ticker: string) => void;
  onAddUpdate: (note: string) => void;
  onToast: (message: string) => void;
}

type Mode = "focus" | "full-edit";

const REC_OPTIONS: { value: Recommendation; label: string }[] = [
  { value: "watch", label: "Watch" },
  { value: "buy", label: "Buy" },
  { value: "strong-buy", label: "Strong buy" },
  { value: "avoid", label: "Avoid" },
];

const STORY_PLACEHOLDER =
  "What do they do? Why might it 10X? What must happen? Main risk?";

/** Progressive company workspace: story first, depth on demand. */
export function StoryWorkspace({
  company,
  onClose,
  onSave,
  onDelete,
  onAddUpdate,
  onToast,
}: Props) {
  const [mode, setMode] = useState<Mode>("focus");
  const [story, setStory] = useState(company.story);
  const [volatilityNote, setVolatilityNote] = useState(company.volatilityNote);
  const [recommendation, setRecommendation] = useState(company.recommendation);
  const [showLenses, setShowLenses] = useState(false);
  const [showDeep, setShowDeep] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setStory(company.story);
    setVolatilityNote(company.volatilityNote);
    setRecommendation(company.recommendation);
    setMode("focus");
    setShowLenses(false);
    setShowDeep(false);
    setDirty(false);
  }, [company.ticker]);

  function markDirty() {
    setDirty(true);
  }

  function handleSaveFocus() {
    onSave({
      ...company,
      story: story.trim(),
      summary: company.summary || story.trim().slice(0, 160),
      volatilityNote: volatilityNote.trim(),
      recommendation,
      updatedAt: new Date().toISOString().slice(0, 10),
    });
    setDirty(false);
    onToast(`${company.ticker} story saved`);
  }

  function handleDelete() {
    if (confirm(`Delete ${company.ticker} (${company.name})? This cannot be undone.`)) {
      onDelete(company.ticker);
      onClose();
      onToast(`${company.ticker} deleted`);
    }
  }

  async function handleCopyMd() {
    await copyMarkdown(companyToMarkdown({ ...company, story, volatilityNote, recommendation }));
    onToast("Story sheet copied as Markdown");
  }

  function handleDownloadMd() {
    downloadMarkdown(
      `${company.ticker}-story.md`,
      companyToMarkdown({ ...company, story, volatilityNote, recommendation }),
    );
    onToast("Markdown downloaded");
  }

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={`${company.ticker} story`}>
        <div className="drawer-header">
          <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
            <div className="drawer-logo-box">
              <CompanyLogo company={company} size={36} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2>
                {company.ticker}{" "}
                <span className="drawer-name">{company.name}</span>
              </h2>
              <div className="sub">
                <span title="Peter Lynch company type">{lynchLabel(company.lynchType)}</span>
                {recommendation ? ` · ${recLabel(recommendation)}` : ""}
                {dirty ? " · Unsaved" : ""}
              </div>
            </div>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="drawer-tabs">
          <button
            type="button"
            className={`drawer-tab ${mode === "focus" ? "active" : ""}`}
            onClick={() => setMode("focus")}
          >
            Company story
          </button>
          <button
            type="button"
            className={`drawer-tab ${mode === "full-edit" ? "active" : ""}`}
            onClick={() => setMode("full-edit")}
          >
            Full edit
          </button>
        </div>

        <div className="drawer-body">
          {mode === "full-edit" ? (
            <CompanyForm
              company={company}
              onSave={(c) => {
                onSave(c);
                setMode("focus");
                onToast(`${c.ticker} saved`);
              }}
              onDelete={(ticker) => {
                onDelete(ticker);
                onClose();
                onToast(`${ticker} deleted`);
              }}
              onCancel={() => setMode("focus")}
            />
          ) : (
            <div className="story-focus">
              {/* Level 1 */}
              <section className="level-block level-1">
                <div className="level-label">The story</div>
                <textarea
                  className="story-textarea"
                  placeholder={STORY_PLACEHOLDER}
                  value={story}
                  onChange={(e) => {
                    setStory(e.target.value);
                    markDirty();
                  }}
                  rows={5}
                />
              </section>

              <section className="level-block">
                <div className="level-label">Would you buy more down 30–50%?</div>
                <input
                  className="vol-input"
                  placeholder="Only if the story still holds…"
                  value={volatilityNote}
                  onChange={(e) => {
                    setVolatilityNote(e.target.value);
                    markDirty();
                  }}
                />
              </section>

              <section className="level-block">
                <div className="level-label">Your call</div>
                <div className="rec-row">
                  {REC_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`rec-chip ${recommendation === opt.value ? "active" : ""} ${opt.value === "avoid" ? "danger" : ""}`}
                      onClick={() => {
                        setRecommendation(opt.value);
                        markDirty();
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="level-block">
                <div className="level-label">Log when the story changes</div>
                <form
                  className="story-add"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.elements.namedItem("note") as HTMLInputElement;
                    onAddUpdate(input.value);
                    input.value = "";
                  }}
                >
                  <input name="note" placeholder="What changed? Earnings, product, competition…" />
                  <button className="btn sm" type="submit">
                    Log
                  </button>
                </form>
                {(company.storyUpdates ?? []).length > 0 && (
                  <div className="story-log" style={{ marginTop: 10 }}>
                    {company.storyUpdates.slice(0, 5).map((u) => (
                      <div className="story-log-item" key={u.id}>
                        <time dateTime={u.date}>{u.date}</time>
                        <p>{u.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Level 2 */}
              <button
                type="button"
                className="level-toggle"
                onClick={() => setShowLenses((v) => !v)}
              >
                <span>Product · customers · market · people</span>
                <span>{showLenses ? "−" : "+"}</span>
              </button>
              {showLenses && (
                <div className="lens-grid level-panel">
                  <div className="lens-box">
                    <span>Product / service</span>
                    <p>{company.product || company.category || "Not filled yet — open Full edit."}</p>
                  </div>
                  <div className="lens-box">
                    <span>Customer feedback</span>
                    <p>{company.feedback || "Not filled yet."}</p>
                  </div>
                  <div className="lens-box">
                    <span>Market</span>
                    <p>{company.market || "Not filled yet."}</p>
                  </div>
                  <div className="lens-box">
                    <span>People vector</span>
                    <p>{company.peopleVector || company.ceo || "Not filled yet."}</p>
                  </div>
                </div>
              )}

              {/* Level 3 */}
              <button
                type="button"
                className="level-toggle"
                onClick={() => setShowDeep((v) => !v)}
              >
                <span>Full research sheet (advanced)</span>
                <span>{showDeep ? "−" : "+"}</span>
              </button>
              {showDeep && (
                <div className="level-panel">
                  <p className="hint" style={{ marginBottom: 12 }}>
                    Hard questions, quality checklist, financials, thesis & risks. Edit everything in{" "}
                    <button type="button" className="linkish" onClick={() => setMode("full-edit")}>
                      Full edit
                    </button>
                    .
                  </p>
                  <StonkSheet company={{ ...company, story, volatilityNote, recommendation }} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="drawer-actions">
          {mode === "focus" && (
            <button className="btn sm" type="button" onClick={handleSaveFocus} disabled={!dirty}>
              {dirty ? "Save story" : "Saved"}
            </button>
          )}
          <button className="btn secondary sm" type="button" onClick={handleCopyMd}>
            Copy Markdown
          </button>
          <button className="btn secondary sm" type="button" onClick={handleDownloadMd}>
            Download
          </button>
          <button className="btn danger sm" type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </aside>
    </>
  );
}
