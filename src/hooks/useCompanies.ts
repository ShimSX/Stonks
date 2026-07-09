import { useCallback, useEffect, useMemo, useState } from "react";
import { demoCompanies, STORAGE_KEY } from "../constants";
import type { AppState, Company, LynchType, Recommendation, ViewMode } from "../types";

function loadCompanies(): Company[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved) && saved.length) {
      // Migrate older records missing new fields
      return saved.map((c: Company) => ({
        ...c,
        storyUpdates: c.storyUpdates ?? [],
        domain: c.domain ?? "",
      }));
    }
    return structuredClone(demoCompanies);
  } catch {
    return structuredClone(demoCompanies);
  }
}

export function useCompanies() {
  const [state, setState] = useState<AppState>(() => ({
    companies: loadCompanies(),
    selected: null,
    search: "",
    view: "research",
    compareTickers: [],
    openChart: null,
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
        openChart: current.openChart === ticker ? null : current.openChart,
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    const companies = structuredClone(demoCompanies);
    setState((current) => ({
      ...current,
      companies,
      selected: null,
      compareTickers: [],
      openChart: null,
    }));
  }, []);

  const replaceCompanies = useCallback((companies: Company[]) => {
    setState((current) => ({
      ...current,
      companies,
      selected: null,
      compareTickers: [],
      openChart: null,
    }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setState((current) => ({ ...current, search }));
  }, []);

  const setSelected = useCallback((ticker: string | null) => {
    setState((current) => ({ ...current, selected: ticker }));
  }, []);

  const setView = useCallback((view: ViewMode) => {
    setState((current) => ({ ...current, view }));
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
    setState((current) => ({ ...current, compareTickers: [], view: "research" }));
  }, []);

  const setOpenChart = useCallback((ticker: string | null) => {
    setState((current) => ({ ...current, openChart: ticker }));
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
    setView,
    setLynchFilter,
    setRecFilter,
    toggleCompareTicker,
    clearCompare,
    setOpenChart,
    addStoryUpdate,
  };
}
