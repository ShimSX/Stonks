import { stonkPrinciples, bsChecklistPrompts, superiorCriteriaPrompts } from "../data/stonk-framework";

export function PrinciplesPanel() {
  return (
    <div className="page principles-page">
      <h1>Principles</h1>
      <p className="principles-intro">
        Short rules so you don&apos;t abandon the process when a chart moves. The product is the
        two-minute story — update it when the business changes.
      </p>

      <div className="principles-grid">
        {stonkPrinciples.map((item, index) => (
          <article className="principle-card" key={item.id}>
            <div className="num">{index + 1}</div>
            <h3>{item.short}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="framework-map">
        <h2>How to research a company (Stonk sheet)</h2>
        <ol>
          <li>
            <strong>Two-minute story</strong> — What do they do? Why 10X? What must happen? Main
            risks?
          </li>
          <li>
            <strong>Lynch category</strong> — Fast grower, stalwart, slow grower, cyclical,
            turnaround, or asset play. Size the ambition to the type.
          </li>
          <li>
            <strong>Product · Feedback · Market</strong> — Know what you own, what customers say,
            and how big the opportunity is.
          </li>
          <li>
            <strong>BS checklist</strong> — Exceptional people? Best in sector? Seek alpha others
            ignore?
          </li>
          <li>
            <strong>Superior company criteria</strong> — Moat, founder alignment, bankruptcy risk,
            capital intensity, &quot;hell yes&quot; gut.
          </li>
          <li>
            <strong>Financials (Lynch style)</strong> — PEG, debt, FCF, ROE/ROIC, insiders,
            institutions.
          </li>
          <li>
            <strong>Verdict</strong> — Recommendation, position size, catalysts to monitor. Update
            when the story changes.
          </li>
        </ol>
      </div>

      <div className="framework-map" style={{ marginTop: 16 }}>
        <h2>BS checklist prompts</h2>
        <ol>
          {bsChecklistPrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ol>
      </div>

      <div className="framework-map" style={{ marginTop: 16 }}>
        <h2>Superior company criteria</h2>
        <ol>
          {superiorCriteriaPrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
