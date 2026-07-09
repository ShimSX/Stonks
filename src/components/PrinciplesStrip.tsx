import { useEffect, useState } from "react";
import { stonkPrinciples } from "../data/stonk-framework";

interface Props {
  onOpenPrinciples: () => void;
}

export function PrinciplesStrip({ onOpenPrinciples }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % stonkPrinciples.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  const principle = stonkPrinciples[index];

  return (
    <div className="principles-strip" role="note" aria-live="polite">
      <div className="principles-strip-inner">
        <span className="principles-strip-label">Always</span>
        <p className="principles-strip-text">
          <strong>{principle.short}:</strong> {principle.text}
        </p>
        <div className="principles-strip-actions">
          {stonkPrinciples.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`strip-dot ${i === index ? "active" : ""}`}
              aria-label={`Show principle ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
          <button className="btn ghost sm" type="button" onClick={onOpenPrinciples}>
            All principles
          </button>
        </div>
      </div>
    </div>
  );
}
