import { useCallback, useEffect, useMemo, useState } from "react";
import { demoCompanies, LEGACY_STORAGE_KEYS, STORAGE_KEY } from "../constants";
import type { AppState, Company, LynchType, Recommendation } from "../types";

function normalizeCompany(c: Company): Company {
  return {
    ...c,
    storyUpdates: c.storyUpdates ?? [],
    domain: c.domain ?? "",
  };
}

function readList(key: string): Company[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    const parsed = JSON.parse(raw);
    // Empty array is valid — user may have deleted everything.
    if (!Array.isArray(parsed)) return null;
    return parsed.map((c: Company) => normalizeCompany(c));
  } catch {
    return null;
  }
}

/**
 * Load the user's coverage list.
 * Demo companies only seed when there is truly no saved list yet.
 * Never overwrite an existing list just because demo data was updated.
 */
function loadCompanies(): Company[] {
  const current = readList(STORAGE_KEY);
  if (current) {
    return current;
  }

  // Migrate oldest→newest legacy keys so a version bump doesn't resurrect deleted names.
  for (const key of LEGACY_STORAGE_KEYS) {
    const legacy = readList(key);
    if (legacy) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
      } catch {
        /* ignore quota */
      }
      return legacy;
    }
  }

  // Brand-new visitor: start empty so first-run onboarding can choose sample vs empty.
  // Demo template is applied only when they pick "Start with sample coverage" (or Reset).
  return [];
}

export function useCompanies() {
  const [state, setState] = useState<AppState>(() => ({
    companies: loadCompanies(),
    selected: null,
    search: "",
    compareTickers: [],
    lynchFilter: "all",
    recFilter: "all",
  }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.companies));
  }, [state.companies]);

  const selectedCompany = useMemo(
    () => state.companies.find((company) => company.ticker === state.selected) ?? null,
    [state.companies, state.selected],
  );

  const visibleCompanies = useMemo(() => {
    const query = state.search.toLowerCase().trim();
    return state.companies.filter((company) => {
      if (state.lynchFilter !== "all" && company.lynchType !== state.lynchFilter) return false;
      if (state.recFilter !== "all" && company.recommendation !== state.recFilter) return false;
      if (!query) return true;
      const hay = [
        company.ticker,
        company.name,
        company.story,
        company.summary,
        company.category,
        company.ceo,
        company.verdict,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [state.companies, state.search, state.lynchFilter, state.recFilter]);

  const compareCompanies = useMemo(
    () =>
      state.compareTickers
        .map((ticker) => state.companies.find((company) => company.ticker === ticker))
        .filter((company): company is Company => !!company),
    [state.companies, state.compareTickers],
  );

  const saveCompany = useCallback((payload: Company) => {
    setState((current) => {
      const index = current.companies.findIndex((company) => company.ticker === payload.ticker);
      const companies =
        index >= 0
          ? current.companies.map((company, i) => (i === index ? payload : company))
          : [...current.companies, payload];
      return { ...current, companies, selected: payload.ticker };
    });
  }, []);

  const deleteCompany = useCallback((ticker: string) => {
    setState((current) => {
      const companies = current.companies.filter((company) => company.ticker !== ticker);
      return {
        ...current,
        companies,
        selected: current.selected === ticker ? null : current.selected,
        compareTickers: current.compareTickers.filter((item) => item !== ticker),
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    setState((current) => ({
      ...current,
      companies: structuredClone(demoCompanies),
      selected: null,
      compareTickers: [],
    }));
  }, []);

  const replaceCompanies = useCallback((companies: Company[]) => {
    setState((current) => ({
      ...current,
      companies,
      selected: null,
      compareTickers: [],
    }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setState((current) => ({ ...current, search }));
  }, []);

  const setSelected = useCallback((ticker: string | null) => {
    setState((current) => ({ ...current, selected: ticker }));
  }, []);

  const setLynchFilter = useCallback((lynchFilter: LynchType | "all") => {
    setState((current) => ({ ...current, lynchFilter }));
  }, []);

  const setRecFilter = useCallback((recFilter: Recommendation | "all") => {
    setState((current) => ({ ...current, recFilter }));
  }, []);

  const toggleCompareTicker = useCallback((ticker: string) => {
    setState((current) => {
      const exists = current.compareTickers.includes(ticker);
      const compareTickers = exists
        ? current.compareTickers.filter((item) => item !== ticker)
        : current.compareTickers.length >= 4
          ? current.compareTickers
          : [...current.compareTickers, ticker];
      return { ...current, compareTickers };
    });
  }, []);

  const clearCompare = useCallback(() => {
    setState((current) => ({ ...current, compareTickers: [] }));
  }, []);

  const addStoryUpdate = useCallback((ticker: string, note: string) => {
    const trimmed = note.trim();
    if (!trimmed) return;
    setState((current) => ({
      ...current,
      companies: current.companies.map((company) =>
        company.ticker === ticker
          ? {
              ...company,
              updatedAt: new Date().toISOString().slice(0, 10),
              storyUpdates: [
                {
                  id: crypto.randomUUID(),
                  date: new Date().toISOString().slice(0, 10),
                  note: trimmed,
                },
                ...(company.storyUpdates ?? []),
              ],
            }
          : company,
      ),
    }));
  }, []);

  return {
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
  };
}
