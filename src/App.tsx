import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PrinciplesStrip } from "./components/PrinciplesStrip";
import { PrinciplesPanel } from "./components/PrinciplesPanel";
import { CompanyGrid } from "./components/CompanyGrid";
import { CompanyDetail } from "./components/CompanyDetail";
import { CompanyForm } from "./components/CompanyForm";
import { BoardView } from "./components/BoardView";
import { CompareView } from "./components/CompareView";
import { useCompanies } from "./hooks/useCompanies";
import { emptyCompany, parseImportPayload } from "./constants";
import type { AppTab, Company } from "./types";
import { downloadJson } from "./utils/download";
import "./styles/global.css";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("research");
  const [dark, setDark] = useState(() => localStorage.getItem("dvb-theme") === "dark");
  const [toast, setToast] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

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

  function showToast(message: string) {
    setToast(message);
  }

  function handleTabChange(tab: AppTab) {
    setActiveTab(tab);
    // Keep detail drawer off when leaving research/board (compare has its own flow)
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
            selected={state.selected}
            onExportAll={() => {
              downloadJson("ss-research-coverage.json", state.companies);
              showToast("Exported coverage JSON");
            }}
            onImport={handleImport}
            onReset={() => {
              if (confirm("Reset to demo coverage? Local edits will be replaced.")) {
                resetDemo();
                showToast("Demo coverage restored");
              }
            }}
          />
        )}

        {activeTab === "board" && (
          <BoardView
            companies={visibleCompanies}
            onSelect={(ticker) => {
              setSelected(ticker);
            }}
            onDelete={(ticker) => {
              deleteCompany(ticker);
              if (state.selected === ticker) setSelected(null);
              showToast(`${ticker} deleted`);
            }}
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
        <CompanyDetail
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
                <div className="sub">Start with the two-minute story.</div>
              </div>
              <button className="icon-btn" type="button" onClick={() => setAdding(false)}>
                ✕
              </button>
            </div>
            <div className="drawer-body">
              <CompanyForm
                company={emptyCompany()}
                onSave={(c: Company) => {
                  saveCompany(c);
                  setAdding(false);
                  setSelected(c.ticker);
                  setActiveTab("research");
                  showToast(`${c.ticker} added to coverage`);
                }}
                onCancel={() => setAdding(false)}
              />
            </div>
          </aside>
        </>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
