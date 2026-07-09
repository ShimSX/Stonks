import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PrinciplesStrip } from "./components/PrinciplesStrip";
import { PrinciplesPanel } from "./components/PrinciplesPanel";
import { CompanyGrid } from "./components/CompanyGrid";
import { StoryWorkspace } from "./components/StoryWorkspace";
import { QuickAddForm } from "./components/QuickAddForm";
import { OnboardingModal, type HubStartMode } from "./components/OnboardingModal";
import { CompareView } from "./components/CompareView";
import { useCompanies } from "./hooks/useCompanies";
import { demoCompanies, parseImportPayload } from "./constants";
import type { AppTab, Company } from "./types";
import { downloadJson } from "./utils/download";
import "./styles/global.css";

const ONBOARDING_KEY = "ss-research-onboarding-v1";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("research");
  const [dark, setDark] = useState(() => localStorage.getItem("dvb-theme") === "dark");
  const [toast, setToast] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const {
    state,
    selectedCompany,
    visibleCompanies,
    compareCompanies,
    saveCompany,
    deleteCompany,
    resetDemo,
    replaceCompanies,
    setSearch,
    setSelected,
    setLynchFilter,
    setRecFilter,
    toggleCompareTicker,
    clearCompare,
    addStoryUpdate,
  } = useCompanies();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("dvb-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  // First-run: existing users with data skip the modal.
  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY);
    if (done) return;
    if (state.companies.length > 0) {
      localStorage.setItem(ONBOARDING_KEY, "1");
      return;
    }
    setShowOnboarding(true);
  }, [state.companies.length]);

  function showToast(message: string) {
    setToast(message);
  }

  function finishOnboarding(mode: HubStartMode) {
    localStorage.setItem(ONBOARDING_KEY, "1");
    setShowOnboarding(false);
    if (mode === "sample") {
      replaceCompanies(structuredClone(demoCompanies));
      showToast("Sample coverage loaded — open any card to read the story");
    } else {
      replaceCompanies([]);
      showToast("Hub ready — add a company you actually follow");
    }
  }

  function handleTabChange(tab: AppTab) {
    setActiveTab(tab);
    if (tab === "compare" || tab === "principles") {
      setSelected(null);
    }
  }

  function handleImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const companies = parseImportPayload(parsed);
        if (!companies?.length) {
          showToast("Import failed — expected a company array");
          return;
        }
        replaceCompanies(companies);
        showToast(`Imported ${companies.length} companies`);
      } catch {
        showToast("Import failed — invalid JSON");
      }
    };
    reader.readAsText(file);
  }

  function mergeSample() {
    const existing = new Set(state.companies.map((c) => c.ticker));
    const toAdd = demoCompanies.filter((c) => !existing.has(c.ticker));
    if (!toAdd.length) {
      showToast("All sample tickers already in your hub");
      return;
    }
    replaceCompanies([...state.companies, ...structuredClone(toAdd)]);
    showToast(`Added ${toAdd.length} sample companies`);
  }

  return (
    <div className="app-shell">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onAdd={() => {
          setAdding(true);
          setSelected(null);
        }}
      />

      <PrinciplesStrip onOpenPrinciples={() => setActiveTab("principles")} />

      <div className="main-scroll">
        {activeTab === "research" && (
          <CompanyGrid
            companies={visibleCompanies}
            totalCount={state.companies.length}
            search={state.search}
            onSearch={setSearch}
            lynchFilter={state.lynchFilter}
            onLynchFilter={setLynchFilter}
            recFilter={state.recFilter}
            onRecFilter={setRecFilter}
            onSelect={setSelected}
            onDelete={(ticker) => {
              deleteCompany(ticker);
              if (state.selected === ticker) setSelected(null);
              showToast(`${ticker} deleted`);
            }}
            onAdd={() => {
              setAdding(true);
              setSelected(null);
            }}
            selected={state.selected}
            onExportAll={() => {
              downloadJson("ss-research-coverage.json", state.companies);
              showToast("Exported coverage JSON");
            }}
            onImport={handleImport}
            onReset={() => {
              if (
                confirm(
                  "Replace your entire hub with sample coverage? Your current list will be overwritten.",
                )
              ) {
                resetDemo();
                showToast("Sample coverage restored");
              }
            }}
            onLoadSample={mergeSample}
          />
        )}

        {activeTab === "compare" && (
          <CompareView
            allCompanies={state.companies}
            selectedTickers={state.compareTickers}
            compareCompanies={compareCompanies}
            onToggle={toggleCompareTicker}
            onClear={clearCompare}
            onOpenSheet={(ticker) => {
              setSelected(ticker);
            }}
          />
        )}

        {activeTab === "principles" && <PrinciplesPanel />}
      </div>

      {selectedCompany && !adding && (
        <StoryWorkspace
          company={selectedCompany}
          onClose={() => setSelected(null)}
          onSave={saveCompany}
          onDelete={deleteCompany}
          onAddUpdate={(note) => {
            addStoryUpdate(selectedCompany.ticker, note);
            showToast("Story log updated");
          }}
          onToast={showToast}
        />
      )}

      {adding && (
        <>
          <div className="drawer-backdrop" onClick={() => setAdding(false)} />
          <aside className="drawer" role="dialog" aria-label="Add company">
            <div className="drawer-header">
              <div>
                <h2>Add company</h2>
                <div className="sub">Ticker, name, two-minute story. Depth later.</div>
              </div>
              <button className="icon-btn" type="button" onClick={() => setAdding(false)}>
                ✕
              </button>
            </div>
            <div className="drawer-body">
              <QuickAddForm
                onSave={(c: Company) => {
                  saveCompany(c);
                  setAdding(false);
                  setSelected(c.ticker);
                  setActiveTab("research");
                  showToast(`${c.ticker} added — keep the story honest`);
                }}
                onCancel={() => setAdding(false)}
              />
            </div>
          </aside>
        </>
      )}

      {showOnboarding && <OnboardingModal onComplete={finishOnboarding} />}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
