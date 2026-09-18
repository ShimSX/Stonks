import { useMemo, useState } from "react";
import { CoverageCard } from "./CoverageCard";
import { BoardView } from "./BoardView";
import { HubChecklist } from "./HubChecklist";
import { lynchTypes } from "../constants";
import type { Company, LynchType } from "../types";
import { lookLabel, lookReasons, needsALook } from "../utils/attention";

type ViewMode = "cards" | "table";
type SortKey = "updated" | "ticker" | "name";

const VIEW_KEY = "ss-research-view";
const SORT_KEY = "ss-research-sort";
const CHECKLIST_KEY = "ss-research-checklist-hidden";

interface Props {
  companies: Company[];
  allCompanies: Company[];
  totalCount: number;
  search: string;
  onSearch: (value: string) => void;
  lynchFilter: LynchType | "all";
  onLynchFilter: (value: LynchType | "all") => void;
  onSelect: (ticker: string) => void;
  onDelete: (ticker: string) => void;
  onAdd: () => void;
  selected: string | null;
  compareTickers: string[];
  onToggleCompare: (ticker: string) => void;
  onExportAll: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
  onLoadSample: () => void;
}

function readView(): ViewMode {
  return localStorage.getItem(VIEW_KEY) === "table" ? "table" : "cards";
}

function readSort(): SortKey {
  const value = localStorage.getItem(SORT_KEY);
  if (value === "ticker" || value === "name" || value === "updated") return value;
  return "updated";
}

export function CompanyGrid({
  companies,
  allCompanies,
  totalCount,
  search,
  onSearch,
  lynchFilter,
  onLynchFilter,
  onSelect,
  onDelete,
  onAdd,
  selected,
  compareTickers,
  onToggleCompare,
  onExportAll,
  onImport,
  onReset,
  onLoadSample,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(lynchFilter !== "all");
  const [view, setView] = useState<ViewMode>(readView);
  const [sort, setSort] = useState<SortKey>(readSort);
  const [hideChecklist, setHideChecklist] = useState(
    () => localStorage.getItem(CHECKLIST_KEY) === "1",
  );
  const [attentionOnly, setAttentionOnly] = useState(false);

  const trulyEmpty = totalCount === 0;
  const attention = useMemo(() => allCompanies.filter(needsALook), [allCompanies]);
  const filterActive = lynchFilter !== "all" || search.trim().length > 0 || attentionOnly;

  const sorted = useMemo(() => {
    const next = [...companies].filter((company) => !attentionOnly || needsALook(company));
    next.sort((a, b) => {
      if (sort === "ticker") return a.ticker.localeCompare(b.ticker);
      if (sort === "name") return a.name.localeCompare(b.name);
      const aDate = a.storyUpdates?.[0]?.date || a.updatedAt || "";
      const bDate = b.storyUpdates?.[0]?.date || b.updatedAt || "";
      return bDate.localeCompare(aDate) || a.ticker.localeCompare(b.ticker);
    });
    return next;
  }, [companies, sort, attentionOnly]);

  const filterEmpty = !trulyEmpty && sorted.length === 0;

  function changeView(next: ViewMode) {
    setView(next);
    localStorage.setItem(VIEW_KEY, next);
  }

  function changeSort(next: SortKey) {
    setSort(next);
    localStorage.setItem(SORT_KEY, next);
  }

  return (
    <div className="page page-simple">
      <div className="page-header simple-header">
        <div className="page-title">
          <h1>Coverage</h1>
          <p>
            {trulyEmpty
              ? "Track the story. Update when it changes."
              : `${totalCount} ${totalCount === 1 ? "company" : "companies"}`}
          </p>
        </div>
        {!trulyEmpty && (
          <div className="header-tools">
            <div className="view-toggle" role="group" aria-label="Coverage layout">
              <button
                type="button"
                className={`view-toggle-btn ${view === "cards" ? "active" : ""}`}
                onClick={() => changeView("cards")}
              >
                Cards
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${view === "table" ? "active" : ""}`}
                onClick={() => changeView("table")}
              >
                Table
              </button>
            </div>
            <button className="btn sm" type="button" onClick={onAdd}>
              + Add
            </button>
          </div>
        )}
      </div>

      {!trulyEmpty && (
        <div className="toolbar toolbar-simple">
          <input
            id="coverage-search"
            type="search"
            className="search-input"
            placeholder="Search stories…  /"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search coverage"
          />
          <button
            type="button"
            className={`btn secondary sm ${attentionOnly ? "active" : ""}`}
            onClick={() => setAttentionOnly((open) => !open)}
          >
            Needs a look{attention.length ? ` (${attention.length})` : ""}
          </button>
          <button
            type="button"
            className={`btn secondary sm ${filtersOpen || lynchFilter !== "all" ? "active" : ""}`}
            onClick={() => setFiltersOpen((open) => !open)}
          >
            Filter
          </button>
          <select
            className="select-input sort-select"
            aria-label="Sort coverage"
            value={sort}
            onChange={(e) => changeSort(e.target.value as SortKey)}
          >
            <option value="updated">Recently updated</option>
            <option value="ticker">Ticker</option>
            <option value="name">Name</option>
          </select>
          <div className="toolbar-menu-wrap">
            <button
              type="button"
              className="btn secondary sm"
              aria-label="More"
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
                    Add missing samples
                  </button>
                  <button
                    type="button"
                    className="danger-item"
                    onClick={() => {
                      onReset();
                      setMenuOpen(false);
                    }}
                  >
                    Replace hub with samples
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {filtersOpen && !trulyEmpty && (
        <div className="filter-row">
          <label className="filter-field">
            <span>Company type</span>
            <select
              className="select-input"
              value={lynchFilter}
              onChange={(e) => onLynchFilter(e.target.value as LynchType | "all")}
            >
              <option value="all">All types</option>
              {lynchTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          {filterActive && (
            <button
              type="button"
              className="btn ghost sm"
              onClick={() => {
                onSearch("");
                onLynchFilter("all");
                setAttentionOnly(false);
              }}
            >
              Clear
            </button>
          )}
        </div>
      )}

      {!trulyEmpty && attention.length > 0 && !attentionOnly && (
        <aside className="attention-bar" aria-label="Names that need a look">
          <div>
            <strong>{attention.length} need a look</strong>
            <span> — quiet, no story, or no type</span>
          </div>
          <div className="attention-chips">
            {attention.slice(0, 8).map((company) => {
              const reason = lookReasons(company)[0];
              return (
                <button
                  key={company.ticker}
                  type="button"
                  className="attention-chip"
                  onClick={() => onSelect(company.ticker)}
                  title={lookReasons(company).map(lookLabel).join(" · ")}
                >
                  {company.ticker}
                  {reason ? <em>{lookLabel(reason)}</em> : null}
                </button>
              );
            })}
            {attention.length > 8 && (
              <button
                type="button"
                className="attention-chip more"
                onClick={() => setAttentionOnly(true)}
              >
                +{attention.length - 8} more
              </button>
            )}
          </div>
        </aside>
      )}

      {!hideChecklist && !trulyEmpty && (
        <HubChecklist
          companies={allCompanies}
          onDismiss={() => {
            localStorage.setItem(CHECKLIST_KEY, "1");
            setHideChecklist(true);
          }}
        />
      )}

      {trulyEmpty ? (
        <div className="empty empty-rich">
          <h2>Start with one company</h2>
          <p>Write what they do and why you care. Post updates when the story moves.</p>
          <div className="button-row" style={{ justifyContent: "center", marginTop: 16 }}>
            <button className="btn" type="button" onClick={onAdd}>
              + Add company
            </button>
            <button className="btn secondary" type="button" onClick={onLoadSample}>
              Try sample list
            </button>
          </div>
        </div>
      ) : filterEmpty ? (
        <div className="empty">
          Nothing matches that {search.trim() ? "search" : "filter"}.
          <div className="button-row" style={{ justifyContent: "center", marginTop: 12 }}>
            <button
              className="btn secondary sm"
              type="button"
              onClick={() => {
                onSearch("");
                onLynchFilter("all");
                setAttentionOnly(false);
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : view === "table" ? (
        <BoardView companies={sorted} onSelect={onSelect} onDelete={onDelete} />
      ) : (
        <div className="company-grid story-grid">
          {sorted.map((company) => (
            <CoverageCard
              key={company.ticker}
              company={company}
              onClick={() => onSelect(company.ticker)}
              onDelete={onDelete}
              onCompare={onToggleCompare}
              inCompare={compareTickers.includes(company.ticker)}
              isSelected={selected === company.ticker}
            />
          ))}
        </div>
      )}
    </div>
  );
}
