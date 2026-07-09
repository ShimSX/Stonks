import type { Company } from "../types";
import {
  capSizeOptions,
  moatOptions,
  positionSizeOptions,
  recommendationOptions,
  tenXOptions,
  triStateOptions,
} from "../data/stonk-framework";
import { lynchLabel } from "../constants";

interface StonkSheetProps {
  company: Company;
  onAddUpdate?: (note: string) => void;
}

function listBlock(items: string[], empty: string) {
  if (!items.length) return <p className="hint">{empty}</p>;
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function optionLabel<T extends string>(
  options: { value: T; label: string }[],
  value: T,
): string {
  return options.find((item) => item.value === value)?.label ?? "—";
}

export function StonkSheet({ company, onAddUpdate }: StonkSheetProps) {
  return (
    <div className="stonk-sheet">
      <div className="story-hero">
        <div className="story-hero-label">1 · Two-minute story</div>
        <p>{company.story || "No story yet. Write what they do, why 10X, what must happen, main risks."}</p>
      </div>

      <div className="section-block">
        <h3>Story log (update when the story changes)</h3>
        <div className="story-log">
          {(company.storyUpdates ?? []).length === 0 && (
            <p className="hint">No updates yet. Add a note after earnings, product launches, or thesis changes.</p>
          )}
          {(company.storyUpdates ?? []).map((u) => (
            <div className="story-log-item" key={u.id}>
              <time dateTime={u.date}>{u.date}</time>
              <p>{u.note}</p>
            </div>
          ))}
        </div>
        {onAddUpdate && (
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
            <input name="note" placeholder="What changed in the story?" />
            <button className="btn sm" type="submit">
              Log
            </button>
          </form>
        )}
      </div>

      <div className="section-block">
        <h3>2 · Category</h3>
        <div className="kv-grid">
          <div className="kv-item">
            <span>Lynch type</span>
            <strong>{lynchLabel(company.lynchType)}</strong>
          </div>
          <div className="kv-item">
            <span>Superior company</span>
            <strong>{optionLabel(triStateOptions, company.superiorCompany)}</strong>
          </div>
          <div className="kv-item">
            <span>Moat</span>
            <strong>{optionLabel(moatOptions, company.moat)}</strong>
          </div>
          <div className="kv-item">
            <span>Cap size</span>
            <strong>
              {optionLabel(capSizeOptions, company.capSize)}
              {company.marketCap ? ` · ${company.marketCap}` : ""}
            </strong>
          </div>
          <div className="kv-item">
            <span>10X path</span>
            <strong>{optionLabel(tenXOptions, company.tenXPath)}</strong>
          </div>
          <div className="kv-item">
            <span>CEO</span>
            <strong>{company.ceo || "—"}</strong>
          </div>
        </div>
      </div>

      <div className="section-block">
        <h3>2.5 · Product · Feedback · Market · People</h3>
        <div className="lens-grid">
          <div className="lens-box">
            <span>Product / Service</span>
            <p>{company.product || company.category || "—"}</p>
          </div>
          <div className="lens-box">
            <span>Customer feedback</span>
            <p>{company.feedback || "—"}</p>
          </div>
          <div className="lens-box">
            <span>Market</span>
            <p>{company.market || "—"}</p>
          </div>
          <div className="lens-box">
            <span>People vector</span>
            <p>{company.peopleVector || "—"}</p>
          </div>
          <div className="lens-box">
            <span>Volatility note</span>
            <p>{company.volatilityNote || "Would you buy more down 30–50%?"}</p>
          </div>
        </div>
      </div>

      <div className="note-box">
        <h3>3 · BS checklist</h3>
        {listBlock(company.bsChecklist, "Not filled yet.")}
      </div>

      <div className="split" style={{ marginBottom: 10 }}>
        <div className="note-box" style={{ flex: 1 }}>
          <h3>4 · Pros</h3>
          {listBlock(company.pros, "—")}
        </div>
        <div className="note-box" style={{ flex: 1 }}>
          <h3>Cons</h3>
          {listBlock(company.cons, "—")}
        </div>
      </div>

      <div className="note-box">
        <h3>5 · Superior company criteria</h3>
        {listBlock(company.superiorCriteria, "Not filled yet.")}
      </div>

      <div className="note-box">
        <h3>6 · Financial snapshot</h3>
        <p>{company.financials || "No financial notes yet."}</p>
      </div>

      <div className="note-box">
        <h3>8 · Verdict & action</h3>
        <p>
          <strong>Recommendation:</strong>{" "}
          {optionLabel(recommendationOptions, company.recommendation)}
        </p>
        <p>
          <strong>Position:</strong> {optionLabel(positionSizeOptions, company.positionSize)}
        </p>
        <p>
          <strong>Catalysts:</strong> {company.catalysts || "—"}
        </p>
        <p>
          <strong>Overall:</strong> {company.verdict || "—"}
        </p>
      </div>

      <div className="split">
        <div className="note-box" style={{ flex: 1 }}>
          <h3>Thesis</h3>
          {listBlock(company.thesis, "No thesis yet.")}
        </div>
        <div className="note-box" style={{ flex: 1 }}>
          <h3>Risks</h3>
          {listBlock(company.risks, "No risks yet.")}
        </div>
      </div>

      {company.sourceNotes && (
        <div className="note-box">
          <h3>Source notes</h3>
          <p>{company.sourceNotes}</p>
        </div>
      )}
    </div>
  );
}
