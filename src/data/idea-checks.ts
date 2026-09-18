import type { PrincipleCheck, ResearchIdea } from "../types";

export const ideaChecks = [
  {
    id: "people",
    short: "People",
    prompt: "Does this depend on the people running it — not the ticker?",
  },
  {
    id: "product",
    short: "Product",
    prompt: "Is this a product or customer claim, or just a price move?",
  },
  {
    id: "update",
    short: "Story",
    prompt: "If this is true, does today's two-minute story need an update?",
  },
  {
    id: "type",
    short: "Type",
    prompt: "Does this still fit how the business behaves (grower, cyclical, …)?",
  },
  {
    id: "time",
    short: "Time",
    prompt: "If true, does time still help — or is this a one-quarter bounce?",
  },
] as const;

export function emptyChecks(): Record<string, PrincipleCheck> {
  return Object.fromEntries(ideaChecks.map((item) => [item.id, ""]));
}

export function ideaVerdict(idea: Pick<ResearchIdea, "text" | "checks">): {
  tone: "story" | "price" | "tactical" | "open";
  text: string;
} {
  if (!idea.text.trim()) {
    return { tone: "open", text: "Write a claim about the business, not the chart." };
  }

  const answered = Object.values(idea.checks).filter(Boolean).length;
  if (answered === 0) {
    return { tone: "open", text: "Walk it through the principles. Twenty seconds." };
  }

  const people = idea.checks.people;
  const product = idea.checks.product;
  const update = idea.checks.update;
  const time = idea.checks.time;

  if (product === "no" && people === "no") {
    return { tone: "price", text: "Price idea. Don't touch the story." };
  }
  if (update === "yes") {
    return { tone: "story", text: "The story changed. Pin this to the feed." };
  }
  if (time === "no") {
    return { tone: "tactical", text: "Tactical. Fine to watch — don't dress it up as 10X." };
  }
  if (people === "yes" && product === "yes") {
    return { tone: "story", text: "This is the business. Keep it on the sheet." };
  }
  return {
    tone: "open",
    text: "Keep pressure-testing. If it isn't people or product, it's probably noise.",
  };
}

export function ideaLogNote(idea: ResearchIdea): string {
  const bits = ideaChecks
    .map((item) => {
      const value = idea.checks[item.id];
      if (!value) return null;
      return `${item.short}: ${value}`;
    })
    .filter(Boolean);
  return bits.length ? `Idea: ${idea.text.trim()}\n${bits.join(" · ")}` : `Idea: ${idea.text.trim()}`;
}
