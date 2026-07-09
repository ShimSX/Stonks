import type { AppTab } from "../types";

interface Props {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  dark: boolean;
  onToggleDark: () => void;
  onAdd: () => void;
}

const tabs: { id: AppTab; label: string }[] = [
  { id: "research", label: "Research" },
  { id: "board", label: "Board" },
  { id: "compare", label: "Compare" },
  { id: "principles", label: "Principles" },
];

export function Header({ activeTab, onTabChange, dark, onToggleDark, onAdd }: Props) {
  return (
    <header className="app-header">
      <div className="logo">
        <span className="logo-highlight">SS</span> Research
      </div>

      <nav className="header-nav" aria-label="Primary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="btn sm" type="button" onClick={onAdd}>
          + Add company
        </button>
        <button
          className="icon-btn"
          type="button"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={onToggleDark}
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
