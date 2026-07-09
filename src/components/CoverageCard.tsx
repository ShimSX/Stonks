import type { Company } from "../types";
import { lynchLabel } from "../constants";
import { recLabel } from "../data/stonk-framework";
import { CompanyLogo } from "./CompanyLogo";

interface Props {
  company: Company;
  onClick: () => void;
  onDelete?: (ticker: string) => void;
  isSelected?: boolean;
}

function recPillClass(rec: Company["recommendation"]): string {
  if (rec === "strong-buy" || rec === "buy") return "pill green";
  if (rec === "avoid") return "pill red";
  if (rec === "watch") return "pill amber";
  return "pill";
}

export function CoverageCard({ company, onClick, onDelete, isSelected }: Props) {
  const blurb = company.story || company.summary || "No two-minute story yet — open and write one.";

  return (
    <article
      className={`coverage-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {onDelete && (
        <button
          type="button"
          className="card-delete-btn"
          aria-label={`Delete ${company.ticker}`}
          title={`Delete ${company.ticker}`}
          onClick={(e) => {
            e.stopPropagation();
            if (
              confirm(
                `Delete ${company.ticker} (${company.name}) from coverage? This cannot be undone.`,
              )
            ) {
              onDelete(company.ticker);
            }
          }}
        >
          ✕
        </button>
      )}
      <div className="coverage-logo">
        <CompanyLogo company={company} />
      </div>
      <div className="coverage-body">
        <div className="coverage-meta">
          <span className="ticker-tag">{company.ticker}</span>
          <span className="date-muted">{company.updatedAt}</span>
        </div>
        <h3>{company.name}</h3>
        <p className="coverage-desc">{blurb}</p>
        <div className="coverage-pills">
          <span className="pill green" title="Company type (Lynch)">
            {lynchLabel(company.lynchType)}
          </span>
          {company.recommendation && (
            <span className={recPillClass(company.recommendation)}>
              {recLabel(company.recommendation)}
            </span>
          )}
          {company.moat && <span className="pill">Moat: {company.moat}</span>}
        </div>
      </div>
    </article>
  );
}
