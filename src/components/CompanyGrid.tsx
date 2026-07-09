import { CoverageCard } from "./CoverageCard";
import type { Company, LynchType, Recommendation } from "../types";
import { lynchTypes } from "../constants";
import { recommendationOptions } from "../data/stonk-framework";

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
  selected: string | null;
  onExportAll: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
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
  selected,
  onExportAll,
  onImport,
  onReset,
}: Props) {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h1>Research Coverage</h1>
          <p>
            {companies.length === totalCount
              ? `${totalCount} companies under coverage`
              : `Showing ${companies.length} of ${totalCount}`}
          </p>
        </div>
      </div>

      <div className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Filter companies..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <select
          className="select-input"
          value={lynchFilter}
          onChange={(e) => onLynchFilter(e.target.value as LynchType | "all")}
          aria-label="Filter by Lynch type"
        >
          <option value="all">All Lynch types</option>
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
          <option value="all">All recommendations</option>
          {recommendationOptions
            .filter((o) => o.value)
            .map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
        </select>
        <button className="btn secondary sm" type="button" onClick={onExportAll}>
          Export
        </button>
        <label className="btn secondary sm" style={{ cursor: "pointer" }}>
          Import
          <input
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImport(file);
              e.target.value = "";
            }}
          />
        </label>
        <button className="btn ghost sm" type="button" onClick={onReset}>
          Reset demo
        </button>
      </div>

      {companies.length === 0 ? (
        <div className="empty">No companies match. Clear filters or add a new name to cover.</div>
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
    </div>
  );
}
