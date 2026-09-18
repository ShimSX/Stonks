import { useEffect, useMemo, useState } from "react";
import type { Company, PrincipleCheck, ResearchIdea } from "../types";
import { emptyChecks, ideaChecks, ideaLogNote, ideaVerdict } from "../data/idea-checks";

interface Props {
  companies: Company[];
  selectedTicker: string | null;
  active: ResearchIdea | null;
  onActiveChange: (idea: ResearchIdea | null) => void;
  onSave: (idea: ResearchIdea) => void;
  onDelete: (id: string) => void;
  onPinToFeed: (ticker: string, note: string) => void;
  onToast: (message: string) => void;
}

const CHECK_OPTS: { value: PrincipleCheck; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "unsure", label: "Not sure" },
  { value: "no", label: "No" },
];

export function IdeaBench({
  companies,
  selectedTicker,
  active,
  onActiveChange,
  onSave,
  onDelete,
  onPinToFeed,
  onToast,
}: Props) {
  const [draft, setDraft] = useState<ResearchIdea>(
    () =>
      active ?? {
        id: crypto.randomUUID(),
        text: "",
        ticker: selectedTicker,
        checks: emptyChecks(),
        x: 360,
        y: 48,
        createdAt: new Date().toISOString(),
      },
  );

  useEffect(() => {
    if (active) {
      setDraft(active);
      return;
    }
    setDraft((current) => ({
      ...current,
      id: crypto.randomUUID(),
      text: "",
      ticker: selectedTicker,
      checks: emptyChecks(),
      createdAt: new Date().toISOString(),
    }));
  }, [active, selectedTicker]);

  const verdict = useMemo(() => ideaVerdict(draft), [draft]);
  const ticker = draft.ticker || selectedTicker;
  const company = companies.find((item) => item.ticker === ticker) ?? null;

  function setCheck(id: string, value: PrincipleCheck) {
    setDraft((current) => ({
      ...current,
      checks: {
        ...current.checks,
        [id]: current.checks[id] === value ? "" : value,
      },
    }));
  }

  function handleSave() {
    if (!draft.text.trim()) return;
    const next = { ...draft, text: draft.text.trim(), ticker: ticker ?? null };
    onSave(next);
    onActiveChange(next);
    onToast("Idea parked on the canvas");
  }

  function handlePin() {
    if (!ticker || !draft.text.trim()) return;
    onPinToFeed(ticker, ideaLogNote({ ...draft, ticker }));
    onToast(`Pinned to ${ticker} feed`);
  }

  function handleClear() {
    onActiveChange(null);
    setDraft({
      id: crypto.randomUUID(),
      text: "",
      ticker: selectedTicker,
      checks: emptyChecks(),
      x: 360,
      y: 48,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <aside className="idea-bench" aria-label="Test an idea">
      <div className="idea-bench-head">
        <div>
          <div className="level-label">Test an idea</div>
          <p className="idea-kicker">Pressure-test a claim against the principles before it hits the story.</p>
        </div>
        {active && (
          <button className="btn ghost sm" type="button" onClick={handleClear}>
            New
          </button>
        )}
      </div>

      <label className="idea-attach">
        <span>About</span>
        <select
          className="select-input"
          value={ticker ?? ""}
          onChange={(e) => setDraft((current) => ({ ...current, ticker: e.target.value || null }))}
        >
          <option value="">No company yet</option>
          {companies.map((item) => (
            <option key={item.ticker} value={item.ticker}>
              {item.ticker} · {item.name}
            </option>
          ))}
        </select>
      </label>

      <textarea
        className="idea-input"
        rows={4}
        placeholder="If this is true, the business… (not ‘the stock goes up’)"
        value={draft.text}
        onChange={(e) => setDraft((current) => ({ ...current, text: e.target.value }))}
      />

      {company?.story && (
        <p className="idea-current-story" title={company.story}>
          Current story: {company.story}
        </p>
      )}

      <ol className="idea-checks">
        {ideaChecks.map((item, index) => (
          <li key={item.id}>
            <div className="idea-check-q">
              <span>{index + 1}.</span> {item.prompt}
            </div>
            <div className="idea-check-opts" role="group" aria-label={item.short}>
              {CHECK_OPTS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`idea-opt ${draft.checks[item.id] === opt.value ? `on ${opt.value}` : ""}`}
                  onClick={() => setCheck(item.id, opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className={`idea-verdict ${verdict.tone}`}>{verdict.text}</div>

      <div className="idea-actions">
        <button className="btn sm" type="button" disabled={!draft.text.trim()} onClick={handleSave}>
          Park on canvas
        </button>
        <button
          className="btn secondary sm"
          type="button"
          disabled={!draft.text.trim() || !ticker}
          onClick={handlePin}
        >
          Pin to feed
        </button>
        {active && (
          <button
            className="btn ghost sm"
            type="button"
            onClick={() => {
              if (confirm("Delete this idea?")) {
                onDelete(active.id);
                handleClear();
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </aside>
  );
}
