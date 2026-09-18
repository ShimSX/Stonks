import { useCallback, useEffect, useState } from "react";
import type { PrincipleCheck, ResearchIdea } from "../types";
import { emptyChecks } from "../data/idea-checks";

const KEY = "ss-research-ideas-v1";

function readIdeas(): ResearchIdea[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.text === "string");
  } catch {
    return [];
  }
}

export function useIdeas() {
  const [ideas, setIdeas] = useState<ResearchIdea[]>(readIdeas);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ideas));
  }, [ideas]);

  const addIdea = useCallback((partial: { text: string; ticker: string | null; x?: number; y?: number }) => {
    const text = partial.text.trim();
    if (!text) return null;
    const idea: ResearchIdea = {
      id: crypto.randomUUID(),
      text,
      ticker: partial.ticker,
      checks: emptyChecks(),
      x: partial.x ?? 80,
      y: partial.y ?? 80,
      createdAt: new Date().toISOString(),
    };
    setIdeas((current) => [idea, ...current]);
    return idea;
  }, []);

  const saveIdea = useCallback((idea: ResearchIdea) => {
    const text = idea.text.trim();
    if (!text) return;
    setIdeas((current) => {
      const index = current.findIndex((item) => item.id === idea.id);
      if (index < 0) return [idea, ...current];
      return current.map((item) => (item.id === idea.id ? { ...idea, text } : item));
    });
  }, []);

  const moveIdea = useCallback((id: string, x: number, y: number) => {
    setIdeas((current) => current.map((item) => (item.id === id ? { ...item, x, y } : item)));
  }, []);

  const setCheck = useCallback((id: string, key: string, value: PrincipleCheck) => {
    setIdeas((current) =>
      current.map((item) =>
        item.id === id ? { ...item, checks: { ...item.checks, [key]: value } } : item,
      ),
    );
  }, []);

  const attachIdea = useCallback((id: string, ticker: string | null) => {
    setIdeas((current) => current.map((item) => (item.id === id ? { ...item, ticker } : item)));
  }, []);

  const deleteIdea = useCallback((id: string) => {
    setIdeas((current) => current.filter((item) => item.id !== id));
  }, []);

  return { ideas, addIdea, saveIdea, moveIdea, setCheck, attachIdea, deleteIdea };
}
