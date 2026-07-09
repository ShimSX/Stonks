import type { Company } from "../types";
import {
  moatOptions,
  positionSizeOptions,
  recommendationOptions,
  stonkProgress,
  tenXOptions,
  triStateOptions,
} from "../data/stonk-framework";
import { lynchLabel, lynchLensLabels } from "../constants";
import { StonkSheet } from "./StonkSheet";

interface CompanyCardProps {
  company: Company;
  selected: boolean;
  expanded: boolean;
  compareSelected: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  onOpenChart: () => void;
  onToggleCompare: () => void;
  onExportMarkdown: () => void;
}

function optionLabel<T extends string>(
  options: { value: T; label: string }[],
  value: T,
): string {
  return options.find((item) => item.value === value)?.label ?? "";
}

export function CompanyCard({
  company,
  selected,
  expanded,
  compareSelected,
  onSelect,
  onToggleExpand,
  onOpenChart,
  onToggleCompare,
  onExportMarkdown,
}: CompanyCardProps) {
  const progress = stonkProgress(company);

  return (
    <article className={`company-card${selected ? " selected" : ""}`} onClick={onSelect}>
      <div className="story-bar">
        <strong>{company.ticker}</strong>
        <span>{company.story || "No two-minute story yet."}</span>
        {company.recommendation && (
          <span className="pill green story-rec">
            {optionLabel(recommendationOptions, company.recommendation)}
          </span>
        )}
      </div>

      <div className="card-body">
        <div>
          <div className="name-line">
            <span className="ticker">{company.ticker}</span>
            <span className="name">{company.name}</span>
          </div>
          <p className="summary">{company.summary || "No summary yet."}</p>
          <div className="meta">
            <span className="pill green">{company.category || "product unknown"}</span>
            <span className="pill blue">CEO: {company.ceo || "unknown"}</span>
            <span className="pill amber">Cap: {company.marketCap || "unknown"}</span>
            <span className="pill ghost">{lynchLabel(company.lynchType)}</span>
            {company.superiorCompany && (
              <span className="pill ghost">
                Superior: {optionLabel(triStateOptions, company.superiorCompany)}
              </span>
            )}
          </div>

          <div className="lens-grid">
            <div className="lens-box">
              <span>{lynchLensLabels.product}</span>
              <p>{company.product || company.category || "What do they sell?"}</p>
            </div>
            <div className="lens-box">
              <span>{lynchLensLabels.feedback}</span>
              <p>{company.feedback || "What are customers saying?"}</p>
            </div>
            <div className="lens-box">
              <span>{lynchLensLabels.market}</span>
              <p>{company.market || "How big is the opportunity?"}</p>
            </div>
          </div>

          <div className="stonk-meta">
            {company.moat && <span>Moat: {optionLabel(moatOptions, company.moat)}</span>}
            {company.tenXPath && <span>10X: {optionLabel(tenXOptions, company.tenXPath)}</span>}
            {company.positionSize && (
              <span>Size: {optionLabel(positionSizeOptions, company.positionSize)}</span>
            )}
            <span className="stonk-progress">
              Sheet {progress.filled}/{progress.total}
            </span>
          </div>
        </div>

        <div className="side-facts">
          <div className="fact">
            <span>Type</span>
            <strong>{lynchLabel(company.lynchType)}</strong>
          </div>
          <div className="fact">
            <span>Verdict</span>
            <strong>{company.verdict || "Not set"}</strong>
          </div>
          <div className="button-row">
            <button
              className="btn secondary"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleExpand();
              }}
            >
              {expanded ? "Close" : "Stonk Sheet"}
            </button>
            <button
              className="btn secondary"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOpenChart();
              }}
            >
              Chart
            </button>
            <button
              className={`btn secondary${compareSelected ? " active" : ""}`}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleCompare();
              }}
            >
              {compareSelected ? "In compare" : "Compare"}
            </button>
            <button
              className="btn secondary"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onExportMarkdown();
              }}
            >
              Export MD
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="detail">
          <StonkSheet company={company} />
        </div>
      )}
    </article>
  );
}
