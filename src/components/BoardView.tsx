import type { Company } from "../types";
import { lynchLabel } from "../constants";
import { recLabel } from "../data/stonk-framework";

interface Props {
  companies: Company[];
  onSelect: (ticker: string) => void;
  onDelete: (ticker: string) => void;
}

export function BoardView({ companies, onSelect, onDelete }: Props) {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <h1>Coverage Board</h1>
          <p>Scan every story at once — Lynch type, recommendation, position size, catalysts.</p>
        </div>
      </div>

      <div className="board-table-wrap">
        <table className="board">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Company</th>
              <th>Lynch</th>
              <th>Rec</th>
              <th>Size</th>
              <th>Story</th>
              <th>Updated</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.ticker} onClick={() => onSelect(c.ticker)}>
                <td>
                  <strong>{c.ticker}</strong>
                </td>
                <td>{c.name}</td>
                <td>{lynchLabel(c.lynchType)}</td>
                <td>{c.recommendation ? recLabel(c.recommendation) : "—"}</td>
                <td>{c.positionSize || "—"}</td>
                <td className="story-cell">{c.story || c.summary || "—"}</td>
                <td>{c.updatedAt}</td>
                <td>
                  <button
                    type="button"
                    className="btn danger sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        confirm(
                          `Delete ${c.ticker} (${c.name}) from coverage? This cannot be undone.`,
                        )
                      ) {
                        onDelete(c.ticker);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
