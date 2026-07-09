import { useEffect, useRef } from "react";
import type { Company } from "../types";
import { chartColors } from "../constants";
import { drawLineChart, exportCanvas } from "../utils/charts";

interface ChartModalProps {
  companies: Company[];
  onClose: () => void;
}

export function ChartModal({ companies, onClose }: ChartModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const title =
    companies.length === 1
      ? `${companies[0].ticker} price context`
      : `${companies.map((company) => company.ticker).join(" vs ")} comparison`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawLineChart(
      canvas,
      companies.map((company, index) => ({
        label: company.ticker,
        color: chartColors[index % chartColors.length],
        values: company.series,
      })),
      title,
    );
  }, [companies, title]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <div className="button-row">
            <button
              className="btn secondary"
              type="button"
              onClick={() => {
                if (canvasRef.current) {
                  exportCanvas(
                    canvasRef.current,
                    companies.length === 1
                      ? `${companies[0].ticker}-chart.png`
                      : "comparison-chart.png",
                  );
                }
              }}
            >
              Export PNG
            </button>
            <button className="btn secondary" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <canvas ref={canvasRef} />
        {companies.length > 1 && (
          <div className="legend">
            {companies.map((company, index) => (
              <span className="legend-item" key={company.ticker}>
                <span
                  className="legend-dot"
                  style={{ background: chartColors[index % chartColors.length] }}
                />
                {company.ticker}
              </span>
            ))}
          </div>
        )}
        <p className="hint" style={{ marginTop: 12 }}>
          Charts are optional context. Your thesis lives in the business, not the line.
        </p>
      </div>
    </div>
  );
}
