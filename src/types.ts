export type LynchType =
  | "fast-grower"
  | "stalwart"
  | "slow-grower"
  | "cyclical"
  | "turnaround"
  | "asset-play"
  | "unknown";

export type TriState = "yes" | "partial" | "no" | "";
export type Moat = "strong" | "medium" | "weak" | "";
export type CapSize = "small" | "mid" | "large" | "";
export type TenXPath = "clear" | "possible" | "weak" | "none" | "";
export type Recommendation = "strong-buy" | "buy" | "watch" | "avoid" | "";
export type PositionSize = "none" | "starter" | "core" | "";

/** Quarterly / narrative updates when the story changes (Lynch: update the sheet). */
export interface StoryUpdate {
  id: string;
  date: string;
  note: string;
}

export interface Company {
  ticker: string;
  name: string;
  ceo: string;
  marketCap: string;
  category: string;
  /** Two-minute drill — the heart of Lynch research */
  story: string;
  summary: string;
  product: string;
  feedback: string;
  market: string;
  lynchType: LynchType;
  superiorCompany: TriState;
  moat: Moat;
  capSize: CapSize;
  tenXPath: TenXPath;
  peopleVector: string;
  volatilityNote: string;
  bsChecklist: string[];
  pros: string[];
  cons: string[];
  superiorCriteria: string[];
  financials: string;
  catalysts: string;
  recommendation: Recommendation;
  positionSize: PositionSize;
  verdict: string;
  thesis: string[];
  risks: string[];
  sourceNotes: string;
  storyUpdates: StoryUpdate[];
  /** Optional domain for logo (e.g. tesla.com) */
  domain: string;
  updatedAt: string;
  series: number[];
}

export type AppTab = "research" | "compare" | "principles" | "board";

export type ViewMode = "research" | "compare";

export interface AppState {
  companies: Company[];
  selected: string | null;
  search: string;
  view: ViewMode;
  compareTickers: string[];
  openChart: string | null;
  lynchFilter: LynchType | "all";
  recFilter: Recommendation | "all";
}
