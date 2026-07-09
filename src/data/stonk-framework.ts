import type {
  CapSize,
  Company,
  Moat,
  PositionSize,
  Recommendation,
  TenXPath,
  TriState,
} from "../types";

/** Key reminders from Stonk.MD — always surface these in the UI */
export const stonkPrinciples = [
  {
    id: "people",
    short: "People make the company",
    text: "A company is just a group of people gathered to make & provide a product or service.",
  },
  {
    id: "vector",
    short: "Outcome = people vector",
    text: "Company's Outcome = vector sum of all the people within it.",
  },
  {
    id: "product",
    short: "Product & customers first",
    text: "Focus relentlessly on products & customer experience / feedback — that's the entire purpose of a company.",
  },
  {
    id: "update",
    short: "Update when story changes",
    text: "Update this sheet when the story changes.",
  },
  {
    id: "time",
    short: "Time is on your side",
    text: "Time is on your side when you own superior companies.",
  },
] as const;

export const principleStrings = stonkPrinciples.map((p) => p.text);

export const bsChecklistPrompts = [
  "Are exceptional people running the company? What are the track records?",
  "What needs to happen for 10X?",
  "Product/Service vs Competitors — is it significantly better? Moat strength?",
  "Customer Sentiment — reviews, scuttlebutt, word-of-mouth",
  "Best company in sector (not 2nd best)?",
  "CEO/Founder exceptional + real track record?",
  "Executed well historically?",
  "Seek Alpha — what others aren't paying attention to?",
  "Who is the best / better competitor?",
];

export const superiorCriteriaPrompts = [
  "Disrupting large market + Massive TAM?",
  "Significantly better product/service + moat?",
  "World-class execution (proven history)?",
  "Founder-led (high ownership, hungry, aligned incentives)?",
  "Low bankruptcy risk (cash runway / profitable / low debt)?",
  "Non-capital intensive?",
  'Hated/undervalued + "hell yes" gut feeling?',
];

export const triStateOptions: { value: TriState; label: string }[] = [
  { value: "", label: "—" },
  { value: "yes", label: "Yes" },
  { value: "partial", label: "Partial" },
  { value: "no", label: "No" },
];

export const moatOptions: { value: Moat; label: string }[] = [
  { value: "", label: "—" },
  { value: "strong", label: "Strong" },
  { value: "medium", label: "Medium" },
  { value: "weak", label: "Weak" },
];

export const capSizeOptions: { value: CapSize; label: string }[] = [
  { value: "", label: "—" },
  { value: "small", label: "Small" },
  { value: "mid", label: "Mid" },
  { value: "large", label: "Large" },
];

export const tenXOptions: { value: TenXPath; label: string }[] = [
  { value: "", label: "—" },
  { value: "clear", label: "Clear" },
  { value: "possible", label: "Possible" },
  { value: "weak", label: "Weak" },
  { value: "none", label: "None" },
];

export const recommendationOptions: { value: Recommendation; label: string }[] = [
  { value: "", label: "—" },
  { value: "strong-buy", label: "Strong Buy" },
  { value: "buy", label: "Buy" },
  { value: "watch", label: "Watch" },
  { value: "avoid", label: "Avoid" },
];

export const positionSizeOptions: { value: PositionSize; label: string }[] = [
  { value: "", label: "—" },
  { value: "none", label: "None" },
  { value: "starter", label: "Starter" },
  { value: "core", label: "Core" },
];

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: T,
): string {
  return options.find((item) => item.value === value)?.label ?? "—";
}

function bulletList(items: string[], fallback = "-"): string {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : `- ${fallback}`;
}

function numberedChecklist(items: string[], prompts: string[]): string {
  if (!items.length) {
    return prompts.map((prompt) => `- **${prompt}**`).join("\n");
  }
  return items.map((item, index) => `- ${item || prompts[index] || ""}`).join("\n");
}

export function companyToMarkdown(company: Company): string {
  const date = company.updatedAt || new Date().toISOString().slice(0, 10);
  const lynchLabel = company.lynchType
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const updates =
    company.storyUpdates?.length > 0
      ? company.storyUpdates
          .map((u) => `- **${u.date}**: ${u.note}`)
          .join("\n")
      : "- (none yet)";

  return `# Stock Analysis: ${company.ticker} ${company.name} - ${date}

### 1. Story (Two-Minute Drill)
${company.story || company.summary || "[One clear sentence: What does the company actually do? Why would it 10X? What must happen? Main risks.]"}

### Story Log
${updates}

### 2. Category
- **Lynch Type**: ${lynchLabel || "—"}
- **Superior Company?**: ${labelFor(triStateOptions, company.superiorCompany)}
- **Moat vs competitors**: ${labelFor(moatOptions, company.moat)}
- **Market Cap**: ${labelFor(capSizeOptions, company.capSize)}${company.marketCap ? ` (${company.marketCap})` : ""}
- **10X Path in 5-10 years?**: ${labelFor(tenXOptions, company.tenXPath)}

### 2.5. Qualitative Edges & Red Flags
- Know what you own: ${company.product || company.category || "—"}
- People vector: ${company.peopleVector || company.ceo || "—"}
- Major risks: ${company.risks.length ? company.risks.join("; ") : "—"}
- Volatility note: ${company.volatilityNote || "—"}

### 3. BS Checklist (Core Questions)
${numberedChecklist(company.bsChecklist, bsChecklistPrompts)}

### 4. Pros & Cons
**Pros:**
${bulletList(company.pros)}

**Cons:**
${bulletList(company.cons)}

### 5. Superior Company Criteria
${numberedChecklist(company.superiorCriteria, superiorCriteriaPrompts)}

### 6. Financial Snapshot (Lynch Style)
${company.financials || "- EPS Growth (past 5y / expected):\n- PEG Ratio:\n- Debt/Equity + Cash position:\n- Free Cash Flow:\n- ROE/ROIC trend:\n- Institutional ownership:\n- Insider buying / selling / buybacks:\n- Balance sheet strength / net cash floor:"}

### 8. Valuation Verdict & Action
- Key catalysts & story monitor: ${company.catalysts || company.sourceNotes || "—"}
- **Recommendation**: ${labelFor(recommendationOptions, company.recommendation)} at current price
- Why (earnings power vs price paid): ${company.thesis.length ? company.thesis.join("; ") : "—"}
- Suggested position size: ${labelFor(positionSizeOptions, company.positionSize)}

**Overall Verdict**: ${company.verdict || "—"}

---

**Key Reminders (Peter Lynch + Stonks)**
${principleStrings.map((item) => `- ${item}`).join("\n")}
`;
}

export function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function copyMarkdown(content: string) {
  await navigator.clipboard.writeText(content);
}

export function recLabel(value: Recommendation): string {
  return labelFor(recommendationOptions, value);
}

export function moatLabel(value: Moat): string {
  return labelFor(moatOptions, value);
}
