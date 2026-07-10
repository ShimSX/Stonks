import type { Company } from "../types";
import { recLabel } from "../data/stonk-framework";

interface Props {
  company: Company;
  onClick: () => void;
  onDelete?: (ticker: string) => void;
  isSelected?: boolean;
}

function recClass(rec: Company["recommendation"]): string {
  if (rec === "strong-buy" || rec === "buy") return "pill green";
  if (rec === "avoid") return "pill red";
  if (rec === "watch") return "pill amber";
  return "pill";
}

export function CoverageCard({ company, onClick, onDelete, isSelected }: Props) {
  const latest = company.storyUpdates?.[0];
  const story = company.story || "Tap to write the story…";

  return (
    <article
      className={`coverage-card story-card ${isSelected ? "selected" : ""}`}
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
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Delete ${company.ticker}?`)) onDelete(company.ticker);
          }}
        >
          ✕
        </button>
      )}

      <div className="story-card-top">
        <span className="ticker-tag">{company.ticker}</span>
        {company.recommendation ? (
          <span className={recClass(company.recommendation)}>
            {recLabel(company.recommendation)}
          </span>
        ) : (
          <span className="pill">No call</span>
        )}
      </div>

      <h3 className="story-card-name">{company.name}</h3>

      {latest && (
        <div className="story-card-latest">
          <span className="latest-dot" aria-hidden />
          <div>
            <time dateTime={latest.date}>{latest.date}</time>
            <p>{latest.note}</p>
          </div>
        </div>
      )}

      <p className="story-card-body">{story}</p>

      <div className="story-card-foot">
        <span>Open story →</span>
        <span className="date-muted">{company.updatedAt}</span>
      </div>
    </article>
  );
}
