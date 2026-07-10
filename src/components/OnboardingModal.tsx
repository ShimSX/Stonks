export type HubStartMode = "empty" | "sample";

interface Props {
  onComplete: (mode: HubStartMode) => void;
}

export function OnboardingModal({ onComplete }: Props) {
  return (
    <div className="proto-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="onboard-title">
      <div className="proto-modal onboard-modal">
        <div className="onboard-kicker">SS Research</div>
        <h2 id="onboard-title">Follow the story, not the noise</h2>
        <p className="onboard-body">
          Pick companies. Write one short story. When something changes — post an update. That&apos;s
          the whole product.
        </p>

        <div className="onboard-choices">
          <button
            type="button"
            className="onboard-choice recommended"
            onClick={() => onComplete("empty")}
          >
            <strong>Start empty</strong>
            <span>Add the first name you actually follow.</span>
          </button>
          <button type="button" className="onboard-choice" onClick={() => onComplete("sample")}>
            <strong>Load sample list</strong>
            <span>TSLA, HOOD, COIN, MU, and friends — delete anytime.</span>
          </button>
        </div>
      </div>
    </div>
  );
}
