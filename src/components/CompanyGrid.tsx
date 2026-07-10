import { useState } from "react";
import { CoverageCard } from "./CoverageCard";
import type { Company, LynchType, Recommendation } from "../types";

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
  onSelect,
  onDelete,
  onAdd,
  selected,
  onExportAll,
  onImport,
  onReset,
  onLoadSample,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const trulyEmpty = totalCount === 0;
  const filterEmpty = !trulyEmpty && companies.length === 0;

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
          <button className="btn sm" type="button" onClick={onAdd}>
            + Add
          </button>
        )}
      </div>

      {!trulyEmpty && (
        <div className="toolbar toolbar-simple">
          <input
            type="search"
            className="search-input"
            placeholder="Search…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
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
                    Export
                  </button>
                  <label>
                    Import
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
                    Load sample names
                  </button>
                  <button
                    type="button"
                    className="danger-item"
                    onClick={() => {
                      onReset();
                      setMenuOpen(false);
                    }}
                  >
                    Replace with sample
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
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
        <div className="empty">Nothing matches that search.</div>
      ) : (
        <div className="company-grid story-grid">
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
    </div>
  );
}
