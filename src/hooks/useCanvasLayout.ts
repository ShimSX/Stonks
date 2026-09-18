import { useCallback, useEffect, useMemo, useState } from "react";
import type { Company } from "../types";
import { needsALook } from "../utils/attention";

const KEY = "ss-research-canvas-layout-v1";
const CARD_W = 260;
const CARD_H = 168;
const GAP = 20;

type Positions = Record<string, { x: number; y: number }>;

function readPositions(): Positions {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function autoPlace(companies: Company[], existing: Positions): Positions {
  const next = { ...existing };
  const quiet: Company[] = [];
  const rest: Company[] = [];
  for (const company of companies) {
    if (next[company.ticker]) continue;
    if (needsALook(company)) quiet.push(company);
    else rest.push(company);
  }

  quiet.forEach((company, index) => {
    next[company.ticker] = { x: 28, y: 28 + index * (CARD_H + GAP) };
  });
  rest.forEach((company, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    next[company.ticker] = {
      x: (quiet.length ? CARD_W + GAP + 48 : 28) + col * (CARD_W + GAP),
      y: 28 + row * (CARD_H + GAP),
    };
  });
  return next;
}

export function useCanvasLayout(companies: Company[]) {
  const [positions, setPositions] = useState<Positions>(readPositions);

  const placed = useMemo(
    () => autoPlace(companies, positions),
    [companies, positions],
  );

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(placed));
  }, [placed]);

  const move = useCallback((ticker: string, x: number, y: number) => {
    setPositions((current) => ({
      ...current,
      [ticker]: { x: Math.max(8, x), y: Math.max(8, y) },
    }));
  }, []);

  const reset = useCallback(() => {
    setPositions({});
  }, []);

  const world = useMemo(() => {
    let maxX = 900;
    let maxY = 640;
    for (const pos of Object.values(placed)) {
      maxX = Math.max(maxX, pos.x + CARD_W + 80);
      maxY = Math.max(maxY, pos.y + CARD_H + 80);
    }
    return { width: maxX, height: maxY };
  }, [placed]);

  return { positions: placed, move, reset, world, cardSize: { w: CARD_W, h: CARD_H } };
}
