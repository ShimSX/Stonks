import type { Company } from "../types";
import { isStale } from "./dates";

export type LookReason = "empty-story" | "no-type" | "quiet";

export function lookReasons(company: Company): LookReason[] {
  const reasons: LookReason[] = [];
  if (!String(company.story ?? "").trim()) reasons.push("empty-story");
  if (!company.lynchType || company.lynchType === "unknown") reasons.push("no-type");
  if (isStale(company)) reasons.push("quiet");
  return reasons;
}

export function needsALook(company: Company): boolean {
  return lookReasons(company).length > 0;
}

export function lookLabel(reason: LookReason): string {
  switch (reason) {
    case "empty-story":
      return "No story";
    case "no-type":
      return "No type";
    case "quiet":
      return "Quiet";
  }
}

export const STORY_PROMPTS =
  "They do: \n10X needs: \nWhat must happen: \nMain risk: ";
