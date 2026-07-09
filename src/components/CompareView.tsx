import { useMemo, useState } from "react";
import type { Company } from "../types";
import { lynchLabel } from "../constants";
import { moatLabel, recLabel } from "../data/stonk-framework";

const MAX_COMPARE = 4;

interface CompareViewProps {
  allCompanies: Company[];
  selectedTickers: string[];
  compareCompanies: Company[];
  onToggle: (ticker: string) => void;
  onClear: () => void;
  onOpenSheet: (ticker: string) => void;
}

export function CompareView({
  allCompanies,
  selectedTickers,
  compareCompanies,
  onToggle,
  onClear,
  onOpenSheet,
}: CompareViewProps) {
  const [pickerQuery, setPickerQuery] = useState("");

  const pickerList = useMemo(() => {
    const q = pickerQuery.toLowerCase().trim();
    if (!q) return allCompanies;
    return allCompanies.filter(
      (c) =>
        c.ticker.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q),
    );
  }, [allCompanies, pickerQuery]);

  const atLimit = selectedTickers.length >= MAX_COMPARE;

  return (
    <div className="page compare-shell">
      <div className="page-header">
        <div className="page-title">
          <h1>Compare</h1>
          <p>
            Pick up to {MAX_COMPARE} companies here and read their stories side by side.
            {selectedTickers.length > 0
              ? ` · ${selectedTickers.length} selected`
              : ""}
          </p>
        </div>
        {selectedTickers.length > 0 && (
          <button className="btn secondary sm" type="button" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      <section className="compare-picker" aria-label="Select companies to compare">
        <div className="compare-picker-head">
          <h2>Select companies</h2>
          <input
            type="search"
            className="search-input"
            placeholder="Search coverage..."
            value={pickerQuery}
            onChange={(e) => setPickerQuery(e.target.value)}
          />
        </div>
        <div className="compare-picker-grid">
          {pickerList.map((company) => {
            const active = selectedTickers.includes(company.ticker);
            const disabled = !active && atLimit;
            return (
              <button
                key={company.ticker}
                type="button"
                className={`compare-pick-chip ${active ? "active" : ""}`}
                disabled={disabled}
                onClick={() => onToggle(company.ticker)}
                title={
                  disabled
                    ? `Max ${MAX_COMPARE} companies`
                    : active
                      ? `Remove ${company.ticker}`
                      : `Add ${company.ticker}`
                }
              >
                <span className="compare-pick-ticker">{company.ticker}</span>
                <span className="compare-pick-name">{company.name}</span>
                <span className="compare-pick-mark" aria-hidden>
                  {active ? "✓" : "+"}
                </span>
              </button>
            );
          })}
          {pickerList.length === 0 && (
            <p className="hint">No companies match that search.</p>
          )}
        </div>
        {atLimit && (
          <p className="hint" style={{ marginTop: 10 }}>
            Maximum of {MAX_COMPARE}. Deselect one to swap in another.
          </p>
        )}
      </section>

      {compareCompanies.length === 0 ? (
        <div className="empty" style={{ marginTop: 20 }}>
          Select companies above to compare stories, thesis, and risks.
        </div>
      ) : (
        <div className="compare-grid" style={{ marginTop: 20 }}>
          {compareCompanies.map((company) => (
            <article className="compare-card" key={company.ticker}>
              <div className="compare-card-head">
                <h3>
                  {company.ticker}{" "}
                  <span style={{ fontWeight: 500, color: "var(--text-muted)", fontSize: 13 }}>
                    {company.name}
                  </span>
                </h3>
                <button
                  className="btn ghost sm"
                  type="button"
                  onClick={() => onToggle(company.ticker)}
                  aria-label={`Remove ${company.ticker}`}
                >
                  Remove
                </button>
              </div>
              <div className="meta" style={{ marginBottom: 10 }}>
                <span className="pill green">{lynchLabel(company.lynchType)}</span>
                {company.recommendation && (
                  <span className="pill amber">{recLabel(company.recommendation)}</span>
                )}
                {company.moat && <span className="pill">Moat: {moatLabel(company.moat)}</span>}
                <span className="pill">{company.marketCap || "Cap?"}</span>
              </div>
              <div className="note-box" style={{ marginBottom: 10 }}>
                <h3>Two-minute story</h3>
                <p>{company.story || "No story yet."}</p>
              </div>
              <div className="note-box" style={{ marginBottom: 10 }}>
                <h3>Product</h3>
                <p>{company.product || company.category || "—"}</p>
              </div>
              <div className="note-box" style={{ marginBottom: 10 }}>
                <h3>Thesis</h3>
                <ul>
                  {company.thesis.length ? (
                    company.thesis.map((item) => <li key={item}>{item}</li>)
                  ) : (
                    <li>No thesis yet</li>
                  )}
                </ul>
              </div>
              <div className="note-box" style={{ marginBottom: 10 }}>
                <h3>Risks</h3>
                <ul>
                  {company.risks.length ? (
                    company.risks.map((item) => <li key={item}>{item}</li>)
                  ) : (
                    <li>No risks yet</li>
                  )}
                </ul>
              </div>
              {company.verdict && (
                <div className="note-box" style={{ marginBottom: 10 }}>
                  <h3>Verdict</h3>
                  <p>{company.verdict}</p>
                </div>
              )}
              <button
                className="btn secondary sm"
                type="button"
                onClick={() => onOpenSheet(company.ticker)}
              >
                Open sheet
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
