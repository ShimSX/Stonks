import type { Company } from "../types";

interface Props {
  companies: Company[];
  onDismiss: () => void;
}

export function HubChecklist({ companies, onDismiss }: Props) {
  const items = [
    { id: "added", label: "Added a company", done: companies.length > 0 },
    { id: "story", label: "Wrote a two-minute story", done: companies.some((c) => c.story.trim()) },
    {
      id: "type",
      label: "Set a company type",
      done: companies.some((c) => c.lynchType && c.lynchType !== "unknown"),
    },
    {
      id: "log",
      label: "Logged a story update",
      done: companies.some((c) => (c.storyUpdates?.length ?? 0) > 0),
    },
  ];

  const doneCount = items.filter((item) => item.done).length;
  if (doneCount === items.length) return null;

  return (
    <aside className="hub-checklist" aria-label="Getting started">
      <div className="hub-checklist-head">
        <div className="hub-checklist-title">Getting started · {doneCount}/4</div>
        <button className="btn ghost sm" type="button" onClick={onDismiss}>
          Hide
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.done ? "done" : ""}>
            <span className="check" aria-hidden>
              {item.done ? "✓" : "○"}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
