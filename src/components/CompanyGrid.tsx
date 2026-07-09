import { useState } from "react";
import { CoverageCard } from "./CoverageCard";
import { BoardView } from "./BoardView";
import type { Company, LynchType, Recommendation } from "../types";
import { lynchTypes } from "../constants";
import { recommendationOptions } from "../data/stonk-framework";

type ViewMode = "cards" | "table";

interface Props {
  companies: Company[];
  totalCount: number;
  search: string;
  onSearch: (value: string) => void;
  lynchFilter: LynchType | "all";
  onLynchFilter: (value: LynchType | "all") => void;
  recFilter: Recommendation | "all";
  onRecFilter: (value: Recommendation | "all") => void;
  onSelect: (ticker: string) => void;
  onDelete: (ticker: string) => void;
  onAdd: () => void;
  selected: string | null;
  onExportAll: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
  onLoadSample: () => void;
}

export function CompanyGrid({
  companies,
  totalCount,
  search,
  onSearch,
  lynchFilter,
  onLynchFilter,
  recFilter,
  onRecFilter,
  onSelect,
  onDelete,
  onAdd,
  selected,
  onExportAll,
  onImport,
  onReset,
  onLoadSample,
}: Props) {
  const [view, setView] = useState<ViewMode>("cards");
  const [showFilters, setShowFilters] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const trulyEmpty = totalCount === 0;
  const filterEmpty = !trulyEmpty && companies.length === 0;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h1>Your stories</h1>
          <p>
            {trulyEmpty
              ? "Add a company you actually follow. Start with the story, not the price."
              : companies.length === totalCount
                ? `${totalCount} under coverage`
                : `${companies.length} of ${totalCount} shown`}
          </p>
        </div>
        <div className="view-toggle" role="group" aria-label="View mode">
          <button
            type="button"
            className={`view-toggle-btn ${view === "cards" ? "active" : ""}`}
            onClick={() => setView("cards")}
          >
            Cards
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${view === "table" ? "active" : ""}`}
            onClick={() => setView("table")}
          >
            Table
          </button>
        </div>
      </div>

      {!trulyEmpty && (
        <div className="toolbar">
          <input
            type="search"
            className="search-input"
            placeholder="Search stories…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          <button
            type="button"
            className={`btn secondary sm ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters((v) => !v)}
          >
            Filters
          </button>
          <div className="toolbar-menu-wrap">
            <button
              type="button"
              className="btn secondary sm"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              ⋯
            </button>
            {menuOpen && (
              <>
                <div className="menu-scrim" onClick={() => setMenuOpen(false)} />
                <div className="toolbar-menu">
                  <button
                    type="button"
                    onClick={() => {
                      onExportAll();
                      setMenuOpen(false);
                    }}
                  >
                    Export JSON
                  </button>
                  <label>
                    Import JSON
                    <input
                      type="file"
                      accept="application/json,.json"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onImport(file);
                        e.target.value = "";
                        setMenuOpen(false);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      onLoadSample();
                      setMenuOpen(false);
                    }}
                  >
                    Add sample companies
                  </button>
                  <button
                    type="button"
                    className="danger-item"
                    onClick={() => {
                      onReset();
                      setMenuOpen(false);
                    }}
                  >
                    Replace all with sample
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showFilters && !trulyEmpty && (
        <div className="filter-row">
          <select
            className="select-input"
            value={lynchFilter}
            onChange={(e) => onLynchFilter(e.target.value as LynchType | "all")}
            aria-label="Filter by company type"
          >
            <option value="all">All company types</option>
            {lynchTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <select
            className="select-input"
            value={recFilter}
            onChange={(e) => onRecFilter(e.target.value as Recommendation | "all")}
            aria-label="Filter by recommendation"
          >
            <option value="all">All calls</option>
            {recommendationOptions
              .filter((o) => o.value)
              .map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
          </select>
        </div>
      )}

      {trulyEmpty ? (
        <div className="empty empty-rich">
          <h2>Add the first company you follow</h2>
          <p>
            Write a two-minute story: what they do, why it might 10X, what must happen, main risk.
            You can fill the deeper research sheet later.
          </p>
          <div className="button-row" style={{ justifyContent: "center", marginTop: 16 }}>
            <button className="btn" type="button" onClick={onAdd}>
              + Add company
            </button>
            <button className="btn secondary" type="button" onClick={onLoadSample}>
              Browse sample coverage
            </button>
          </div>
        </div>
      ) : filterEmpty ? (
        <div className="empty">No companies match. Clear filters or search.</div>
      ) : view === "table" ? (
        <BoardView companies={companies} onSelect={onSelect} onDelete={onDelete} />
      ) : (
        <div className="company-grid">
          {companies.map((company) => (
            <CoverageCard
              key={company.ticker}
              company={company}
              onClick={() => onSelect(company.ticker)}
              onDelete={onDelete}
              isSelected={selected === company.ticker}
            />
          ))}
        </div>
      )}

      {!trulyEmpty && totalCount > 0 && totalCount <= 3 && (
        <HubChecklist companies={companies} />
      )}
    </div>
  );
}

function HubChecklist({ companies }: { companies: Company[] }) {
  const items = [
    { done: companies.length > 0, label: "Added a company" },
    { done: companies.some((c) => c.story.trim().length > 20), label: "Wrote a two-minute story" },
    { done: companies.some((c) => !!c.recommendation), label: "Set a call (Watch / Buy / Avoid)" },
    {
      done: companies.some((c) => (c.storyUpdates?.length ?? 0) > 0),
      label: "Logged a story update",
    },
  ];
  if (items.every((i) => i.done)) return null;

  return (
    <div className="hub-checklist">
      <div className="hub-checklist-title">Getting started</div>
      <ul>
        {items.map((item) => (
          <li key={item.label} className={item.done ? "done" : ""}>
            <span className="check">{item.done ? "✓" : "○"}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
