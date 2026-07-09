import { useState } from "react";

export type HubStartMode = "empty" | "sample";

interface Props {
  onComplete: (mode: HubStartMode) => void;
}

const steps = [
  {
    title: "Follow companies you actually care about",
    body: "This is a notebook for stories — not a stock tip feed. Add names you follow, or start from a sample list to learn the flow.",
  },
  {
    title: "Write the two-minute story",
    body: "What do they do? Why might it 10X? What must happen? Main risk? One clear paragraph is enough to start. Skip the full checklist until you need it.",
  },
  {
    title: "Update when the story changes",
    body: "After earnings or big news, log a short note. Time is on your side with superior companies — but only if you keep the sheet honest.",
  },
];

export function OnboardingModal({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;
  const current = steps[step];

  return (
    <div className="proto-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="onboard-title">
      <div className="proto-modal onboard-modal">
        <div className="onboard-kicker">Welcome to SS Research</div>
        <h2 id="onboard-title">{current.title}</h2>
        <p className="onboard-body">{current.body}</p>

        <div className="onboard-dots" aria-hidden>
          {steps.map((_, i) => (
            <span key={i} className={`onboard-dot ${i === step ? "active" : ""}`} />
          ))}
        </div>

        {!isLast ? (
          <div className="button-row" style={{ justifyContent: "space-between" }}>
            <button className="btn ghost sm" type="button" onClick={() => onComplete("empty")}>
              Skip
            </button>
            <button className="btn" type="button" onClick={() => setStep((s) => s + 1)}>
              Next
            </button>
          </div>
        ) : (
          <div className="onboard-choices">
            <p className="onboard-choice-label">How do you want to start?</p>
            <button
              type="button"
              className="onboard-choice recommended"
              onClick={() => onComplete("empty")}
            >
              <strong>Start empty</strong>
              <span>Recommended. Add the first company you actually follow. Story first, not price.</span>
            </button>
            <button type="button" className="onboard-choice" onClick={() => onComplete("sample")}>
              <strong>Start with sample coverage</strong>
              <span>Load example companies to explore the UI. You can delete any of them anytime.</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
