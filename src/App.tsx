import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PrinciplesStrip } from "./components/PrinciplesStrip";
import { PrinciplesPanel } from "./components/PrinciplesPanel";
import { CompanyGrid } from "./components/CompanyGrid";
import { StoryWorkspace } from "./components/StoryWorkspace";
import { QuickAddForm } from "./components/QuickAddForm";
import { OnboardingModal, type HubStartMode } from "./components/OnboardingModal";
import { AuthModal } from "./components/AuthModal";
import { CompareView } from "./components/CompareView";
import { AppFooter } from "./components/AppFooter";
import { useCompanies } from "./hooks/useCompanies";
import { useAuth } from "./hooks/useAuth";
import { demoCompanies, mergeDemoCoverage, parseImportPayload } from "./constants";
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
  const [showAuth, setShowAuth] = useState(false);

  const auth = useAuth();
  const {
    state,
    selectedCompany,
    visibleCompanies,
    compareCompanies,
    cloudMode,
    cloudReady,
    cloudError,
    clearCloudError,
    saveCompany,
    deleteCompany,
    resetDemo,
    replaceCompanies,
    setSearch,
    setSelected,
    setLynchFilter,
    toggleCompareTicker,
    clearCompare,
    addStoryUpdate,
    editStoryUpdate,
    deleteStoryUpdate,
  } = useCompanies({ userId: auth.user?.id ?? null });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("dvb-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (cloudError) showToast(cloudError);
  }, [cloudError]);

  useEffect(() => {
    function isTypingTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (showAuth) {
          setShowAuth(false);
          return;
        }
        if (adding) setAdding(false);
        return;
      }

      const meta = event.metaKey || event.ctrlKey;
      const slash = event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
      if ((meta && event.key.toLowerCase() === "k") || slash) {
        if (slash && isTypingTarget(event.target)) return;
        event.preventDefault();
        setActiveTab("research");
        window.requestAnimationFrame(() => {
          document.getElementById("coverage-search")?.focus();
        });
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adding, showAuth]);

  // First-run: existing users with data skip the modal.
  useEffect(() => {
    if (!cloudReady) return;
    const done = localStorage.getItem(ONBOARDING_KEY);
    if (done) return;
    if (state.companies.length > 0) {
      localStorage.setItem(ONBOARDING_KEY, "1");
      return;
    }
    setShowOnboarding(true);
  }, [state.companies.length, cloudReady]);

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
    const { companies, added, filled } = mergeDemoCoverage(state.companies);
    if (!added.length && !filled.length) {
      showToast("All sample names already filled in your hub");
      return;
    }
    replaceCompanies(companies);
    const parts: string[] = [];
    if (added.length) parts.push(`added ${added.join(", ")}`);
    if (filled.length) parts.push(`filled ${filled.join(", ")}`);
    showToast(parts.join(" · "));
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
        authConfigured={auth.configured}
        userEmail={auth.user?.email ?? null}
        cloudMode={cloudMode}
        cloudReady={cloudReady}
        onSignInClick={() => setShowAuth(true)}
        compareCount={state.compareTickers.length}
        onSignOut={async () => {
          await auth.signOut();
          showToast("Signed out — back to this browser only");
        }}
      />

      <PrinciplesStrip onOpenPrinciples={() => setActiveTab("principles")} />

      {cloudError && (
        <div className="cloud-banner" role="status">
          <span>Cloud: {cloudError}</span>
          <button type="button" className="btn ghost sm" onClick={clearCloudError}>
            Dismiss
          </button>
        </div>
      )}

      <div className="main-scroll">
        {activeTab === "research" && (
          <CompanyGrid
            companies={visibleCompanies}
            allCompanies={state.companies}
            totalCount={state.companies.length}
            search={state.search}
            onSearch={setSearch}
            lynchFilter={state.lynchFilter}
            onLynchFilter={setLynchFilter}
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
            compareTickers={state.compareTickers}
            onToggleCompare={(ticker) => {
              const already = state.compareTickers.includes(ticker);
              if (!already && state.compareTickers.length >= 4) {
                showToast("Compare holds 4 names — remove one first");
                return;
              }
              toggleCompareTicker(ticker);
              showToast(already ? `${ticker} off compare` : `${ticker} added to compare`);
            }}
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
        <AppFooter />
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
          onEditUpdate={(id, note) => editStoryUpdate(selectedCompany.ticker, id, note)}
          onDeleteUpdate={(id) => deleteStoryUpdate(selectedCompany.ticker, id)}
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
                <div className="sub">Ticker, name, and a two-minute story.</div>
              </div>
              <button className="icon-btn" type="button" onClick={() => setAdding(false)}>
                ✕
              </button>
            </div>
            <div className="drawer-body">
              <QuickAddForm
                existingTickers={state.companies.map((company) => company.ticker)}
                onSave={(c: Company) => {
                  saveCompany(c);
                  setAdding(false);
                  setSelected(c.ticker);
                  setActiveTab("research");
                  showToast(`${c.ticker} added — keep the story honest`);
                }}
                onCancel={() => setAdding(false)}
                onOpenExisting={(ticker) => {
                  setAdding(false);
                  setSelected(ticker);
                  setActiveTab("research");
                }}
              />
            </div>
          </aside>
        </>
      )}

      {showOnboarding && cloudReady && <OnboardingModal onComplete={finishOnboarding} />}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          error={auth.authError}
          onSignIn={async (email, password) => {
            await auth.signInWithPassword(email, password);
            showToast("Signed in — hub syncing to the cloud");
          }}
          onSignUp={async (email, password) => {
            await auth.signUpWithPassword(email, password);
          }}
          onMagicLink={async (email) => {
            await auth.signInWithMagicLink(email);
          }}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
