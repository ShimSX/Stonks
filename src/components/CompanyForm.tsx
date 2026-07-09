import { useEffect, useState } from "react";
import type { Company } from "../types";
import {
  bsChecklistPrompts,
  capSizeOptions,
  moatOptions,
  positionSizeOptions,
  recommendationOptions,
  superiorCriteriaPrompts,
  tenXOptions,
  triStateOptions,
} from "../data/stonk-framework";
import { emptyCompany, lines, lynchTypes } from "../constants";

interface CompanyFormProps {
  company: Company | null;
  onSave: (company: Company) => void;
  onDelete?: (ticker: string) => void;
  onCancel?: () => void;
}

function Fieldset({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="fieldset">
      <button className="fieldset-toggle" type="button" onClick={onToggle}>
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="fieldset-body">{children}</div>}
    </fieldset>
  );
}

export function CompanyForm({ company, onSave, onDelete, onCancel }: CompanyFormProps) {
  const [form, setForm] = useState<Company>(company ?? emptyCompany());
  const [openSections, setOpenSections] = useState({
    core: true,
    lenses: true,
    stonk: true,
    verdict: true,
  });

  useEffect(() => {
    setForm(company ?? emptyCompany());
  }, [company]);

  function updateField<K extends keyof Company>(key: K, value: Company[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleSection(key: keyof typeof openSections) {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const ticker = form.ticker.trim().toUpperCase();
    if (!ticker || !form.name.trim()) return;

    onSave({
      ...form,
      ticker,
      name: form.name.trim(),
      thesis: lines(form.thesis.join("\n")),
      risks: lines(form.risks.join("\n")),
      bsChecklist: lines(form.bsChecklist.join("\n")),
      pros: lines(form.pros.join("\n")),
      cons: lines(form.cons.join("\n")),
      superiorCriteria: lines(form.superiorCriteria.join("\n")),
      storyUpdates: form.storyUpdates ?? [],
      domain: form.domain.trim(),
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Fieldset title="Core identity" open={openSections.core} onToggle={() => toggleSection("core")}>
        <div className="split">
          <div className="field">
            <label htmlFor="ticker">Ticker</label>
            <input
              id="ticker"
              required
              maxLength={10}
              placeholder="SHOP"
              value={form.ticker}
              onChange={(e) => updateField("ticker", e.target.value.toUpperCase())}
            />
          </div>
          <div className="field">
            <label htmlFor="marketCap">Market cap</label>
            <input
              id="marketCap"
              placeholder="$110B"
              value={form.marketCap}
              onChange={(e) => updateField("marketCap", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="name">Company</label>
          <input
            id="name"
            required
            placeholder="Shopify Inc."
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        <div className="split">
          <div className="field">
            <label htmlFor="ceo">CEO</label>
            <input
              id="ceo"
              placeholder="Tobi Lütke"
              value={form.ceo}
              onChange={(e) => updateField("ceo", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="domain">Logo domain</label>
            <input
              id="domain"
              placeholder="shopify.com"
              value={form.domain}
              onChange={(e) => updateField("domain", e.target.value)}
            />
          </div>
        </div>

        <div className="split">
          <div className="field">
            <label htmlFor="lynchType">Lynch type</label>
            <select
              id="lynchType"
              value={form.lynchType}
              onChange={(e) => updateField("lynchType", e.target.value as Company["lynchType"])}
            >
              {lynchTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="category">Product / service (short)</label>
            <input
              id="category"
              placeholder="Commerce software"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="story">Two-minute story</label>
          <p className="help">What do they do? Why 10X? What must happen? Main risks?</p>
          <textarea
            id="story"
            placeholder="Sells X to Y. 10X needs Z. Main risk is…"
            value={form.story}
            onChange={(e) => updateField("story", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="summary">One-line summary</label>
          <textarea
            id="summary"
            placeholder="Plain-English description for the coverage card"
            value={form.summary}
            onChange={(e) => updateField("summary", e.target.value)}
          />
        </div>
      </Fieldset>

      <Fieldset
        title="Lynch lenses (product · feedback · market)"
        open={openSections.lenses}
        onToggle={() => toggleSection("lenses")}
      >
        <div className="field">
          <label htmlFor="product">Product lens</label>
          <textarea
            id="product"
            placeholder="What they sell, who needs it, what improves"
            value={form.product}
            onChange={(e) => updateField("product", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="feedback">Customer feedback lens</label>
          <textarea
            id="feedback"
            placeholder="Reviews, scuttlebutt, retention, word of mouth"
            value={form.feedback}
            onChange={(e) => updateField("feedback", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="market">Market lens</label>
          <textarea
            id="market"
            placeholder="Market size, competition, timing, durability"
            value={form.market}
            onChange={(e) => updateField("market", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="peopleVector">People vector</label>
          <textarea
            id="peopleVector"
            placeholder="Quality of team & execution culture"
            value={form.peopleVector}
            onChange={(e) => updateField("peopleVector", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="volatilityNote">Volatility note</label>
          <textarea
            id="volatilityNote"
            placeholder="Would you buy more if the stock drops 30–50%?"
            value={form.volatilityNote}
            onChange={(e) => updateField("volatilityNote", e.target.value)}
          />
        </div>
      </Fieldset>

      <Fieldset title="Stonk sheet" open={openSections.stonk} onToggle={() => toggleSection("stonk")}>
        <div className="split">
          <div className="field">
            <label htmlFor="superiorCompany">Superior company?</label>
            <select
              id="superiorCompany"
              value={form.superiorCompany}
              onChange={(e) =>
                updateField("superiorCompany", e.target.value as Company["superiorCompany"])
              }
            >
              {triStateOptions.map((item) => (
                <option key={item.value || "blank"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="moat">Moat</label>
            <select
              id="moat"
              value={form.moat}
              onChange={(e) => updateField("moat", e.target.value as Company["moat"])}
            >
              {moatOptions.map((item) => (
                <option key={item.value || "blank"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="split">
          <div className="field">
            <label htmlFor="capSize">Cap size</label>
            <select
              id="capSize"
              value={form.capSize}
              onChange={(e) => updateField("capSize", e.target.value as Company["capSize"])}
            >
              {capSizeOptions.map((item) => (
                <option key={item.value || "blank"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="tenXPath">10X path (5–10y)</label>
            <select
              id="tenXPath"
              value={form.tenXPath}
              onChange={(e) => updateField("tenXPath", e.target.value as Company["tenXPath"])}
            >
              {tenXOptions.map((item) => (
                <option key={item.value || "blank"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="bsChecklist">BS checklist (one answer per line)</label>
          <p className="checklist-prompt">{bsChecklistPrompts.join(" · ")}</p>
          <textarea
            id="bsChecklist"
            placeholder={bsChecklistPrompts.map((p, i) => `${i + 1}. ${p}`).join("\n")}
            value={form.bsChecklist.join("\n")}
            onChange={(e) => updateField("bsChecklist", lines(e.target.value))}
          />
        </div>

        <div className="split">
          <div className="field">
            <label htmlFor="pros">Pros (one per line)</label>
            <textarea
              id="pros"
              value={form.pros.join("\n")}
              onChange={(e) => updateField("pros", lines(e.target.value))}
            />
          </div>
          <div className="field">
            <label htmlFor="cons">Cons (one per line)</label>
            <textarea
              id="cons"
              value={form.cons.join("\n")}
              onChange={(e) => updateField("cons", lines(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="superiorCriteria">Superior criteria (one per line)</label>
          <p className="checklist-prompt">{superiorCriteriaPrompts.join(" · ")}</p>
          <textarea
            id="superiorCriteria"
            value={form.superiorCriteria.join("\n")}
            onChange={(e) => updateField("superiorCriteria", lines(e.target.value))}
          />
        </div>

        <div className="field">
          <label htmlFor="financials">Financial snapshot (Lynch style)</label>
          <textarea
            id="financials"
            placeholder="EPS growth, PEG, debt, FCF, ROE, insiders, institutions..."
            value={form.financials}
            onChange={(e) => updateField("financials", e.target.value)}
          />
        </div>
      </Fieldset>

      <Fieldset title="Verdict & action" open={openSections.verdict} onToggle={() => toggleSection("verdict")}>
        <div className="split">
          <div className="field">
            <label htmlFor="recommendation">Recommendation</label>
            <select
              id="recommendation"
              value={form.recommendation}
              onChange={(e) =>
                updateField("recommendation", e.target.value as Company["recommendation"])
              }
            >
              {recommendationOptions.map((item) => (
                <option key={item.value || "blank"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="positionSize">Position size</label>
            <select
              id="positionSize"
              value={form.positionSize}
              onChange={(e) =>
                updateField("positionSize", e.target.value as Company["positionSize"])
              }
            >
              {positionSizeOptions.map((item) => (
                <option key={item.value || "blank"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="catalysts">Catalysts & story monitor</label>
          <textarea
            id="catalysts"
            placeholder="What to track quarterly"
            value={form.catalysts}
            onChange={(e) => updateField("catalysts", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="verdict">Overall verdict</label>
          <textarea
            id="verdict"
            placeholder="Story intact? Superior company? Time on your side?"
            value={form.verdict}
            onChange={(e) => updateField("verdict", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="thesis">Thesis (one per line)</label>
          <textarea
            id="thesis"
            value={form.thesis.join("\n")}
            onChange={(e) => updateField("thesis", lines(e.target.value))}
          />
        </div>

        <div className="field">
          <label htmlFor="risks">Risks (one per line)</label>
          <textarea
            id="risks"
            value={form.risks.join("\n")}
            onChange={(e) => updateField("risks", lines(e.target.value))}
          />
        </div>

        <div className="field">
          <label htmlFor="sourceNotes">Source notes</label>
          <textarea
            id="sourceNotes"
            placeholder="Filings, earnings calls, scuttlebutt, your reading"
            value={form.sourceNotes}
            onChange={(e) => updateField("sourceNotes", e.target.value)}
          />
        </div>
      </Fieldset>

      <div className="button-row">
        <button className="btn" type="submit">
          Save company
        </button>
        {onCancel && (
          <button className="btn secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        {company && onDelete && (
          <button
            className="btn danger"
            type="button"
            onClick={() => {
              if (confirm(`Delete ${company.ticker}?`)) onDelete(company.ticker);
            }}
          >
            Delete
          </button>
        )}
      </div>

      <p className="hint">
        Built on Stonk.MD — export the sheet to Markdown and paste into any LLM for a deeper pass.
      </p>
    </form>
  );
}
