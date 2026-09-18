import { useState } from "react";
import type { Company } from "../types";
import { lynchLabel } from "../constants";
import { CompanyLogo } from "./CompanyLogo";
import { formatRelativeDate, latestActivityDate } from "../utils/dates";
import { lookLabel, lookReasons } from "../utils/attention";

interface Props {
  company: Company;
  onClick: () => void;
  onDelete?: (ticker: string) => void;
  onCompare?: (ticker: string) => void;
  inCompare?: boolean;
  isSelected?: boolean;
}

export function CoverageCard({
  company,
  onClick,
  onDelete,
  onCompare,
  inCompare,
  isSelected,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const latest = company.storyUpdates?.[0];
  const story = company.story || "Tap to write the story…";
  const typeLabel =
    company.lynchType && company.lynchType !== "unknown"
      ? lynchLabel(company.lynchType)
      : "Type?";
  const reasons = lookReasons(company);
  const activity = latestActivityDate(company);

  return (
    <article
      className={`coverage-card story-card ${isSelected ? "selected" : ""} ${menuOpen ? "menu-open" : ""}`}
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
      {(onDelete || onCompare) && (
        <div className="card-menu-wrap">
          <button
            type="button"
            className="card-menu-btn"
            aria-label={`${company.ticker} actions`}
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((open) => !open);
            }}
          >
            ⋯
          </button>
          {menuOpen && (
            <>
              <div
                className="menu-scrim"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
              />
              <div className="toolbar-menu card-overflow-menu" onClick={(e) => e.stopPropagation()}>
                {onCompare && (
                  <button
                    type="button"
                    onClick={() => {
                      onCompare(company.ticker);
                      setMenuOpen(false);
                    }}
                  >
                    {inCompare ? "Remove from compare" : "Add to compare"}
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    className="danger-item"
                    onClick={() => {
                      setMenuOpen(false);
                      if (confirm(`Delete ${company.ticker}?`)) onDelete(company.ticker);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div className="story-card-top">
        <div className="story-card-id">
          <span className="story-card-logo">
            <CompanyLogo company={company} size={22} />
          </span>
          <span className="ticker-tag">{company.ticker}</span>
        </div>
        <div className="story-card-pills">
          <span
            className={`pill ${company.lynchType !== "unknown" ? "green" : ""}`}
            title="Peter Lynch company type"
          >
            {typeLabel}
          </span>
          {reasons.map((reason) => (
            <span
              key={reason}
              className="pill amber"
              title={
                reason === "quiet"
                  ? "No story update in 45+ days"
                  : reason === "empty-story"
                    ? "Write the two-minute story"
                    : "Pick a Lynch type"
              }
            >
              {lookLabel(reason)}
            </span>
          ))}
        </div>
      </div>

      <h3 className="story-card-name">{company.name}</h3>

      {latest && (
        <div className="story-card-latest">
          <span className="latest-dot" aria-hidden />
          <div>
            <time dateTime={latest.date}>{formatRelativeDate(latest.date)}</time>
            <p>{latest.note}</p>
          </div>
        </div>
      )}

      <p className="story-card-body">{story}</p>

      <div className="story-card-foot">
        <span>Open story →</span>
        <span className="date-muted" title={activity}>
          {formatRelativeDate(activity)}
        </span>
      </div>
    </article>
  );
}
