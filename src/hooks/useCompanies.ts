import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { demoCompanies, LEGACY_STORAGE_KEYS, STORAGE_KEY } from "../constants";
import type { AppState, Company, LynchType, Recommendation } from "../types";
import {
  deleteCloudCompany,
  ensureHub,
  loadCloudCompanies,
  replaceCloudCompanies,
  upsertCloudCompany,
} from "../lib/supabase/cloud";

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
    if (!Array.isArray(parsed)) return null;
    return parsed.map((c: Company) => normalizeCompany(c));
  } catch {
    return null;
  }
}

function loadLocalCompanies(): Company[] {
  const current = readList(STORAGE_KEY);
  if (current) return current;

  for (const key of LEGACY_STORAGE_KEYS) {
    const legacy = readList(key);
    if (legacy) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
      } catch {
        /* ignore */
      }
      return legacy;
    }
  }

  return [];
}

interface Options {
  /** When set, coverage is loaded/saved from Supabase for this user. */
  userId: string | null;
}

export function useCompanies({ userId }: Options) {
  const [state, setState] = useState<AppState>(() => ({
    companies: loadLocalCompanies(),
    selected: null,
    search: "",
    compareTickers: [],
    lynchFilter: "all",
    recFilter: "all",
  }));
  const [hubId, setHubId] = useState<string | null>(null);
  const [cloudReady, setCloudReady] = useState(!userId);
  const [cloudError, setCloudError] = useState<string | null>(null);
  const cloudMode = Boolean(userId && hubId);
  const skipNextLocalPersist = useRef(false);

  // Local cache always (offline backup even when cloud)
  useEffect(() => {
    if (skipNextLocalPersist.current) {
      skipNextLocalPersist.current = false;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.companies));
  }, [state.companies]);

  // Load cloud hub when user signs in / out
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setCloudError(null);

      if (!userId) {
        setHubId(null);
        setCloudReady(true);
        // Restore local list when signing out
        setState((current) => ({
          ...current,
          companies: loadLocalCompanies(),
          selected: null,
          compareTickers: [],
        }));
        return;
      }

      setCloudReady(false);
      try {
        const id = await ensureHub(userId);
        if (cancelled) return;
        setHubId(id);
        const remote = await loadCloudCompanies(id);
        if (cancelled) return;

        // First cloud login with empty hub: offer local data as seed if any
        if (remote.length === 0) {
          const local = loadLocalCompanies();
          if (local.length > 0) {
            await replaceCloudCompanies(id, local);
            if (cancelled) return;
            setState((current) => ({
              ...current,
              companies: local,
              selected: null,
              compareTickers: [],
            }));
          } else {
            setState((current) => ({
              ...current,
              companies: [],
              selected: null,
              compareTickers: [],
            }));
          }
        } else {
          setState((current) => ({
            ...current,
            companies: remote,
            selected: null,
            compareTickers: [],
          }));
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setCloudError(err instanceof Error ? err.message : "Cloud sync failed");
          setHubId(null);
        }
      } finally {
        if (!cancelled) setCloudReady(true);
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [userId]);

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

  const saveCompany = useCallback(
    (payload: Company) => {
      const next = {
        ...payload,
        ticker: payload.ticker.trim().toUpperCase(),
        updatedAt: payload.updatedAt || new Date().toISOString().slice(0, 10),
      };

      setState((current) => {
        const index = current.companies.findIndex((company) => company.ticker === next.ticker);
        const companies =
          index >= 0
            ? current.companies.map((company, i) => (i === index ? next : company))
            : [...current.companies, next];
        return { ...current, companies, selected: next.ticker };
      });

      if (cloudMode && hubId) {
        void upsertCloudCompany(hubId, next).catch((err) => {
          console.error(err);
          setCloudError(err instanceof Error ? err.message : "Failed to save to cloud");
        });
      }
    },
    [cloudMode, hubId],
  );

  const deleteCompany = useCallback(
    (ticker: string) => {
      setState((current) => {
        const companies = current.companies.filter((company) => company.ticker !== ticker);
        return {
          ...current,
          companies,
          selected: current.selected === ticker ? null : current.selected,
          compareTickers: current.compareTickers.filter((item) => item !== ticker),
        };
      });

      if (cloudMode && hubId) {
        void deleteCloudCompany(hubId, ticker).catch((err) => {
          console.error(err);
          setCloudError(err instanceof Error ? err.message : "Failed to delete from cloud");
        });
      }
    },
    [cloudMode, hubId],
  );

  const resetDemo = useCallback(() => {
    const companies = structuredClone(demoCompanies);
    setState((current) => ({
      ...current,
      companies,
      selected: null,
      compareTickers: [],
    }));
    if (cloudMode && hubId) {
      void replaceCloudCompanies(hubId, companies).catch((err) => {
        console.error(err);
        setCloudError(err instanceof Error ? err.message : "Failed to sync sample set");
      });
    }
  }, [cloudMode, hubId]);

  const replaceCompanies = useCallback(
    (companies: Company[]) => {
      setState((current) => ({
        ...current,
        companies,
        selected: null,
        compareTickers: [],
      }));
      if (cloudMode && hubId) {
        void replaceCloudCompanies(hubId, companies).catch((err) => {
          console.error(err);
          setCloudError(err instanceof Error ? err.message : "Failed to sync hub");
        });
      }
    },
    [cloudMode, hubId],
  );

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

  const addStoryUpdate = useCallback(
    (ticker: string, note: string) => {
      const trimmed = note.trim();
      if (!trimmed) return;

      setState((current) => {
        const companies = current.companies.map((company) => {
          if (company.ticker !== ticker) return company;
          const updated: Company = {
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
          };
          if (cloudMode && hubId) {
            void upsertCloudCompany(hubId, updated).catch((err) => {
              console.error(err);
              setCloudError(err instanceof Error ? err.message : "Failed to sync story log");
            });
          }
          return updated;
        });
        return { ...current, companies };
      });
    },
    [cloudMode, hubId],
  );

  return {
    state,
    selectedCompany,
    visibleCompanies,
    compareCompanies,
    hubId,
    cloudMode,
    cloudReady,
    cloudError,
    clearCloudError: () => setCloudError(null),
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
