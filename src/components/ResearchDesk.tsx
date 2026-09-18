import { useMemo, useRef, useState } from "react";
import type { Company, ResearchIdea, ResearchView } from "../types";
import { CompanyLogo } from "./CompanyLogo";
import { IdeaBench } from "./IdeaBench";
import { StoryWorkspace } from "./StoryWorkspace";
import { useCanvasLayout } from "../hooks/useCanvasLayout";
import { useIdeas } from "../hooks/useIdeas";
import { lookLabel, lookReasons, needsALook } from "../utils/attention";
import { formatRelativeDate, latestActivityDate } from "../utils/dates";
import { lynchLabel } from "../constants";

interface Props {
  companies: Company[];
  allCompanies: Company[];
  selected: string | null;
  onSelect: (ticker: string | null) => void;
  onAdd: () => void;
  onViewChange: (view: ResearchView) => void;
  onSave: (company: Company) => void;
  onDelete: (ticker: string) => void;
  onAddUpdate: (ticker: string, note: string) => void;
  onEditUpdate: (ticker: string, id: string, note: string) => void;
  onDeleteUpdate: (ticker: string, id: string) => void;
  onToast: (message: string) => void;
  search: string;
  onSearch: (value: string) => void;
}

export function ResearchDesk({
  companies,
  allCompanies,
  selected,
  onSelect,
  onAdd,
  onViewChange,
  onSave,
  onDelete,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
  onToast,
  search,
  onSearch,
}: Props) {
  const { positions, move, reset, world, cardSize } = useCanvasLayout(allCompanies);
  const ideasApi = useIdeas();
  const [activeIdeaId, setActiveIdeaId] = useState<string | null>(null);
  const [query, setQuery] = useState(search);
  const stageRef = useRef<HTMLDivElement>(null);

  const selectedCompany = allCompanies.find((company) => company.ticker === selected) ?? null;
  const activeIdea = ideasApi.ideas.find((idea) => idea.id === activeIdeaId) ?? null;
  const attention = useMemo(() => allCompanies.filter(needsALook), [allCompanies]);

  const railList = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? allCompanies.filter(
          (company) =>
            company.ticker.toLowerCase().includes(q) ||
            company.name.toLowerCase().includes(q) ||
            company.story.toLowerCase().includes(q),
        )
      : allCompanies;
    return [...list].sort((a, b) => Number(needsALook(b)) - Number(needsALook(a)) || a.ticker.localeCompare(b.ticker));
  }, [allCompanies, query]);

  const boardCompanies = companies.length ? companies : allCompanies;

  return (
    <div className="desk">
      <nav className="desk-rail" aria-label="Coverage">
        <div className="desk-rail-top">
          <div className="view-toggle" role="group" aria-label="Coverage layout">
            <button type="button" className="view-toggle-btn active">
              Canvas
            </button>
            <button type="button" className="view-toggle-btn" onClick={() => onViewChange("cards")}>
              Cards
            </button>
            <button type="button" className="view-toggle-btn" onClick={() => onViewChange("table")}>
              Table
            </button>
          </div>
          <button className="btn sm" type="button" onClick={onAdd}>
            + Add
          </button>
        </div>

        <input
          id="coverage-search"
          type="search"
          className="search-input desk-search"
          placeholder="Find a name…  /"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          aria-label="Search coverage"
        />

        {attention.length > 0 && (
          <p className="desk-rail-hint">
            {attention.length} need a look — quiet, empty, or untyped.
          </p>
        )}

        <ul className="desk-rail-list">
          {railList.map((company) => {
            const reason = lookReasons(company)[0];
            return (
              <li key={company.ticker}>
                <button
                  type="button"
                  className={`desk-rail-item ${selected === company.ticker ? "active" : ""} ${reason ? "needs" : ""}`}
                  onClick={() => onSelect(selected === company.ticker ? null : company.ticker)}
                >
                  <span className="desk-rail-logo">
                    <CompanyLogo company={company} size={18} />
                  </span>
                  <span className="desk-rail-meta">
                    <strong>{company.ticker}</strong>
                    <em>{reason ? lookLabel(reason) : lynchLabel(company.lynchType)}</em>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="desk-rail-foot">
          <button className="btn ghost sm" type="button" onClick={reset}>
            Reset layout
          </button>
          <span>{allCompanies.length} on the desk</span>
        </div>
      </nav>

      <div className="desk-stage" ref={stageRef}>
        {selectedCompany ? (
          <div className="desk-sheet-wrap">
            <StoryWorkspace
              company={selectedCompany}
              onClose={() => onSelect(null)}
              onSave={onSave}
              onDelete={onDelete}
              onAddUpdate={(note) => onAddUpdate(selectedCompany.ticker, note)}
              onEditUpdate={(id, note) => onEditUpdate(selectedCompany.ticker, id, note)}
              onDeleteUpdate={(id) => onDeleteUpdate(selectedCompany.ticker, id)}
              onToast={onToast}
            />
          </div>
        ) : allCompanies.length === 0 ? (
          <div className="desk-empty">
            <h2>This is the desk</h2>
            <p>
              Add a company, write the two-minute story, and test ideas against the principles before
              they contaminate the sheet.
            </p>
            <button className="btn" type="button" onClick={onAdd}>
              + Add company
            </button>
          </div>
        ) : (
          <div className="desk-world" style={{ width: world.width, height: world.height }}>
            {boardCompanies.map((company) => {
              const pos = positions[company.ticker] ?? { x: 28, y: 28 };
              return (
                <CanvasNode
                  key={company.ticker}
                  company={company}
                  x={pos.x}
                  y={pos.y}
                  width={cardSize.w}
                  height={cardSize.h}
                  ideaCount={ideasApi.ideas.filter((idea) => idea.ticker === company.ticker).length}
                  onMove={(x, y) => move(company.ticker, x, y)}
                  onOpen={() => onSelect(company.ticker)}
                />
              );
            })}
            {ideasApi.ideas.map((idea) => (
              <StickyNode
                key={idea.id}
                idea={idea}
                active={idea.id === activeIdeaId}
                onMove={(x, y) => ideasApi.moveIdea(idea.id, x, y)}
                onOpen={() => setActiveIdeaId(idea.id)}
              />
            ))}
          </div>
        )}
      </div>

      <IdeaBench
        companies={allCompanies}
        selectedTicker={selected}
        active={activeIdea}
        onActiveChange={(idea) => setActiveIdeaId(idea?.id ?? null)}
        onSave={ideasApi.saveIdea}
        onDelete={ideasApi.deleteIdea}
        onPinToFeed={(ticker, note) => {
          onSelect(ticker);
          onAddUpdate(ticker, note);
        }}
        onToast={onToast}
      />
    </div>
  );
}

function CanvasNode({
  company,
  x,
  y,
  width,
  height,
  ideaCount,
  onMove,
  onOpen,
}: {
  company: Company;
  x: number;
  y: number;
  width: number;
  height: number;
  ideaCount: number;
  onMove: (x: number, y: number) => void;
  onOpen: () => void;
}) {
  const reasons = lookReasons(company);
  const latest = company.storyUpdates?.[0];
  const activity = latestActivityDate(company);

  return (
    <article
      className={`canvas-node ${reasons.length ? "needs" : ""}`}
      style={{ left: x, top: y, width, minHeight: height }}
      onPointerDown={(event) => startDrag(event, x, y, onMove, onOpen)}
    >
      <div className="canvas-node-top">
        <span className="canvas-node-id">
          <CompanyLogo company={company} size={18} />
          {company.ticker}
        </span>
        <span className="pill green">{lynchLabel(company.lynchType)}</span>
      </div>
      <h3>{company.name}</h3>
      <p>{company.story || "Write the two-minute story…"}</p>
      <div className="canvas-node-foot">
        <span>{latest ? formatRelativeDate(latest.date) : formatRelativeDate(activity)}</span>
        <span>
          {reasons[0] ? lookLabel(reasons[0]) : ideaCount ? `${ideaCount} idea${ideaCount === 1 ? "" : "s"}` : "Open"}
        </span>
      </div>
    </article>
  );
}

function StickyNode({
  idea,
  active,
  onMove,
  onOpen,
}: {
  idea: ResearchIdea;
  active: boolean;
  onMove: (x: number, y: number) => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`sticky-node ${active ? "active" : ""}`}
      style={{ left: idea.x, top: idea.y }}
      onPointerDown={(event) => startDrag(event, idea.x, idea.y, onMove, onOpen)}
    >
      <span className="sticky-kicker">{idea.ticker || "Loose idea"}</span>
      <p>{idea.text || "Untitled idea"}</p>
    </button>
  );
}

function startDrag(
  event: React.PointerEvent,
  origX: number,
  origY: number,
  onMove: (x: number, y: number) => void,
  onClick: () => void,
) {
  if (event.button !== 0) return;
  const target = event.currentTarget as HTMLElement;
  const startX = event.clientX;
  const startY = event.clientY;
  let dragged = false;

  target.setPointerCapture(event.pointerId);

  function move(ev: PointerEvent) {
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    if (!dragged && Math.hypot(dx, dy) < 5) return;
    dragged = true;
    onMove(origX + dx, origY + dy);
  }

  function up() {
    target.releasePointerCapture(event.pointerId);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    if (!dragged) onClick();
  }

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
}
