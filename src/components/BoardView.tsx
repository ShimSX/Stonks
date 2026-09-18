import type { Company } from "../types";
import { lynchLabel } from "../constants";
import { formatRelativeDate, isStale, latestActivityDate } from "../utils/dates";

interface Props {
  companies: Company[];
  onSelect: (ticker: string) => void;
  onDelete: (ticker: string) => void;
}

export function BoardView({ companies, onSelect, onDelete }: Props) {
  return (
    <div className="board-table-wrap">
      <table className="board">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Company</th>
            <th>Type</th>
            <th>Story</th>
            <th>Updated</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => {
            const activity = latestActivityDate(c);
            return (
              <tr key={c.ticker} onClick={() => onSelect(c.ticker)}>
                <td>
                  <strong>{c.ticker}</strong>
                </td>
                <td>{c.name}</td>
                <td title="Peter Lynch company type">{lynchLabel(c.lynchType)}</td>
                <td className="story-cell">
                  {isStale(c) && <span className="pill amber board-quiet">Quiet</span>}
                  {c.story || c.summary || "—"}
                </td>
                <td title={activity}>{formatRelativeDate(activity)}</td>
                <td>
                  <button
                    type="button"
                    className="btn ghost sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete ${c.ticker}?`)) onDelete(c.ticker);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
