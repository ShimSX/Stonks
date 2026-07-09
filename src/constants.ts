import type { Company, LynchType } from "./types";
import { principleStrings } from "./data/stonk-framework";

export const STORAGE_KEY = "stunk-stonk-research-hub-v6";

export const principles = principleStrings;

export const lynchTypes: { value: LynchType; label: string }[] = [
  { value: "fast-grower", label: "Fast grower" },
  { value: "stalwart", label: "Stalwart" },
  { value: "slow-grower", label: "Slow grower" },
  { value: "cyclical", label: "Cyclical" },
  { value: "turnaround", label: "Turnaround" },
  { value: "asset-play", label: "Asset play" },
  { value: "unknown", label: "Not sure yet" },
];

export const lynchLensLabels = {
  product: "Product / Service",
  feedback: "Customer Feedback",
  market: "Market",
} as const;

export const chartColors = [
  "#059669",
  "#315f86",
  "#9a681c",
  "#a33d35",
  "#5c4d7a",
  "#2a6f6f",
];

function base(
  partial: Omit<Company, "storyUpdates" | "domain" | "series"> &
    Partial<Pick<Company, "storyUpdates" | "domain" | "series">>,
): Company {
  return {
    storyUpdates: [],
    domain: "",
    series: defaultSeries(),
    ...partial,
  };
}

export const demoCompanies: Company[] = [
  base({
    ticker: "NBIS",
    name: "Nebius Group N.V.",
    ceo: "Arkady Volozh",
    marketCap: "$8B",
    category: "AI cloud & GPU infrastructure",
    domain: "nebius.com",
    story:
      "Yandex spin-off rebuilding as a pure-play AI cloud. 10X needs hyperscale GPU capacity + sticky AI workloads. Main risk: execution at scale and funding the capex arms race.",
    summary:
      "Nebius is building full-stack AI cloud infrastructure — GPUs, networking, and developer tooling — targeting enterprises and AI labs outside the hyperscaler lock-in.",
    product:
      "AI cloud clusters, GPU rentals, and managed infrastructure for training and inference. Sells compute + platform, not ads.",
    feedback:
      "Early AI builders care about availability and price/performance vs AWS/GCP. Watch real cluster utilization and renewals.",
    market:
      "AI infra spend is enormous; Nebius is a small challenger vs AWS, Azure, GCP, and CoreWeave-class specialists.",
    lynchType: "fast-grower",
    superiorCompany: "partial",
    moat: "weak",
    capSize: "mid",
    tenXPath: "possible",
    peopleVector: "Volozh has deep infra experience from Yandex; culture still proving itself post-spin.",
    volatilityNote: "Would add only if utilization and customer logos improve after a big drawdown.",
    bsChecklist: [
      "Strong technical pedigree, still proving post-Yandex identity",
      "10X needs durable AI demand + capacity fill rates",
      "Product is competitive on price/availability, moat unproven",
      "Scuttlebutt from AI builders on uptime and support",
      "Not best in sector yet — CoreWeave/hyperscalers lead",
      "Founder-operator with relevant track record",
      "Early innings on execution as independent co",
      "Market may under-appreciate European AI cloud optionality",
      "AWS, Azure, GCP, CoreWeave are better-funded competitors",
    ],
    pros: ["Pure-play AI cloud narrative", "Experienced leadership", "Large TAM"],
    cons: ["Capital intensive", "Intense competition", "Story still early"],
    superiorCriteria: [
      "Massive TAM in AI compute",
      "Not clearly better product yet",
      "Execution still proving",
      "Founder-linked leadership",
      "Balance sheet must fund growth",
      "Highly capital intensive",
      "Not hated — speculative growth name",
    ],
    financials:
      "Growth-stage economics. Watch GPU utilization, revenue ramp, cash burn, and equity dilution. Debt/capex heavy by nature.",
    catalysts: "Capacity ramps, marquee AI customers, utilization metrics, path to FCF.",
    recommendation: "watch",
    positionSize: "none",
    verdict: "Interesting story, not yet superior. Track rocks quarterly before sizing.",
    thesis: [
      "AI compute demand remains structurally high",
      "Independent clouds can win niches on price and availability",
      "Experienced team from large-scale consumer tech",
    ],
    risks: ["Capex spiral", "Hyperscaler price wars", "Dilution", "Customer concentration"],
    sourceNotes: "Read 20-F / earnings for cluster utilization language and backlog.",
    updatedAt: "2026-03-17",
    series: [18, 22, 20, 28, 35, 31, 40, 38, 45, 52, 48, 55],
  }),
  base({
    ticker: "OUST",
    name: "Ouster, Inc.",
    ceo: "Angus Pacala",
    marketCap: "$1.2B",
    category: "Lidar sensors",
    domain: "ouster.com",
    story:
      "Digital lidar for robots, autos, and smart infrastructure. 10X needs volume design wins to convert. Main risk: lidar commoditization and long sales cycles.",
    summary:
      "Ouster develops digital lidar sensors for automotive, robotics, industrial, and smart-city applications.",
    product: "Solid-state / digital lidar hardware + perception software for machines that need to see.",
    feedback: "OEMs and robot makers care about reliability, cost/point, and software stack maturity.",
    market: "Autonomy and industrial sensing are large long-term markets with many failed lidar pure-plays.",
    lynchType: "fast-grower",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "small",
    tenXPath: "possible",
    peopleVector: "Technical founders; need to show commercial scale, not just demos.",
    volatilityNote: "Would only add if design-win pipeline is visibly converting after a 40%+ drop.",
    bsChecklist: [
      "Technical team with lidar depth",
      "10X needs multi-vertical volume adoption",
      "Digital approach may be better on cost — prove it in ASPs",
      "Customer scuttlebutt from robot OEMs",
      "Not clearly #1 vs Luminar / Hesai / Velodyne remnants",
      "Founder-led technical culture",
      "Mixed execution history common in lidar",
      "Market may under-appreciate non-auto robotics use cases",
      "Hesai and Luminar are key comps",
    ],
    pros: ["Multi-vertical use cases", "Hardware + software stack", "Small-cap optionality"],
    cons: ["History of lidar disappointments sector-wide", "Long sales cycles", "Competition"],
    superiorCriteria: [
      "Large autonomy/robotics TAM",
      "Potential cost advantage",
      "Still proving world-class commercial execution",
      "Founder technical leadership",
      "Cash runway critical",
      "Hardware capital needs",
      "Often hated lidar sector = possible mispricing",
    ],
    financials: "Watch revenue growth, gross margin, cash runway, and design-win conversion rates.",
    catalysts: "Robotics design wins, auto programs, software attach, path to profitability.",
    recommendation: "watch",
    positionSize: "none",
    verdict: "Story possible but sector graveyard risk. Turn more rocks before capital.",
    thesis: ["Robots need eyes", "Digital lidar cost curve", "Software can differentiate"],
    risks: ["Commoditization", "Dilution", "OEM delays"],
    sourceNotes: "Track unit shipments and non-auto mix in filings.",
    updatedAt: "2026-03-17",
    series: [6, 7, 6.5, 8, 9, 8.2, 10, 11, 10, 12, 13, 12.5],
  }),
  base({
    ticker: "TSLA",
    name: "Tesla, Inc.",
    ceo: "Elon Musk",
    marketCap: "$1.1T",
    category: "EVs, energy, autonomy, robotics",
    domain: "tesla.com",
    story:
      "EV maker trying to become an AI/robotics platform. 10X needs autonomy + Optimus (or energy) to work. Main risk: auto margins + narrative premium.",
    summary:
      "Vertically integrated EV and energy company expanding into autonomy software and humanoid robotics.",
    product: "Cars, batteries, solar/storage, Full Self-Driving software, and early robotics bets.",
    feedback: "Owners love the product experience; FSD quality and service consistency drive the debate.",
    market: "EVs are competitive; autonomy and robotics are winner-take-most if they work.",
    lynchType: "fast-grower",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "large",
    tenXPath: "possible",
    peopleVector: "Musk is exceptional and high-variance; culture is hard-driving and polarizing.",
    volatilityNote: "Would buy more on a 40%+ drop only if robotaxi/energy story still advancing.",
    bsChecklist: [
      "Exceptional founder-CEO with real track record of hard tech",
      "10X needs autonomy and/or Optimus monetization",
      "Product often ahead on software + charging ecosystem",
      "Owner forums and delivery scuttlebutt matter",
      "Best software-defined EV platform for many buyers",
      "Founder with extreme skin in the game (and distraction risk)",
      "Executed manufacturing scale few peers matched",
      "Market may under-appreciate energy storage durability",
      "BYD, legacy OEMs, and Chinese EVs are real competitors",
    ],
    pros: ["Brand", "Vertical integration", "Energy optionality", "Software culture"],
    cons: ["Valuation embeds perfection", "Competition", "Key-person / distraction risk"],
    superiorCriteria: [
      "Massive multi-market TAM",
      "Differentiated vehicle software",
      "Proven hard-tech execution",
      "Founder-led high ownership",
      "Strong balance sheet relative to growth peers",
      "Capital intensive manufacturing",
      "Polarizing — often priced for excellence",
    ],
    financials: "Track auto margins, energy growth, FCF, and capex. PEG depends on autonomy narrative.",
    catalysts: "FSD unsupervised milestones, robotaxi pilots, energy storage deployments, Optimus demos.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Story intact if autonomy path is real. Price discipline required.",
    thesis: [
      "Software-defined vehicles compound data advantage",
      "Energy storage is an under-appreciated cash engine",
      "Manufacturing know-how is hard to copy quickly",
    ],
    risks: ["Margin compression", "Autonomy delays", "Competition", "Key-person risk"],
    sourceNotes: "Read delivery + energy numbers; ignore Twitter noise for the sheet.",
    updatedAt: "2026-03-16",
    series: [180, 195, 210, 200, 230, 250, 240, 270, 280, 265, 290, 310],
  }),
  base({
    ticker: "AVGO",
    name: "Broadcom Inc.",
    ceo: "Hock Tan",
    marketCap: "$1.3T",
    category: "Semiconductors & infrastructure software",
    domain: "broadcom.com",
    story:
      "Custom AI ASICs + networking + sticky software. 10X harder at this size; story is durable compounding. Main risk: customer concentration in AI ASICs.",
    summary:
      "Designs semiconductors and enterprise infrastructure software for data centers, networking, and broadband.",
    product: "Custom AI chips, networking silicon, and mission-critical software (VMware stack etc.).",
    feedback: "Hyperscalers buy custom silicon when TCO beats GPUs; enterprises are sticky on software.",
    market: "AI networking and custom silicon are huge; software adds recurring cash flows.",
    lynchType: "stalwart",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "large",
    tenXPath: "weak",
    peopleVector: "Hock Tan is a ruthless capital allocator and operator.",
    volatilityNote: "Would add on AI ASIC fear if software cash flows still compound.",
    bsChecklist: [
      "Exceptional capital allocation track record",
      "10X hard — needs multi-year AI ASIC + software flywheel",
      "Custom silicon + networking can be best-in-class for certain workloads",
      "Hyperscaler scuttlebutt on custom ASIC roadmaps",
      "Best at this specific stack for many buyers",
      "CEO proven across many M&A cycles",
      "Executed VMware integration under watch",
      "Market may under-appreciate software mix durability",
      "NVDA, Marvell, and internal silicon teams compete",
    ],
    pros: ["AI ASIC exposure", "Software cash flows", "Capital allocation"],
    cons: ["Size limits 10X", "Customer concentration", "M&A integration risk"],
    superiorCriteria: [
      "Large data center TAM",
      "Strong product positions",
      "World-class execution/M&A",
      "Not founder-led but aligned operators",
      "Strong FCF profile",
      "Mixed capital intensity",
      "Well-followed — limited pure hate premium",
    ],
    financials: "Strong FCF, high margins, active capital returns. Watch AI revenue concentration.",
    catalysts: "Custom AI ASIC ramps, networking attach, software margin trajectory.",
    recommendation: "buy",
    positionSize: "core",
    verdict: "Superior compounder. Story intact; size position for quality, not lottery.",
    thesis: [
      "Custom silicon is a durable AI budget line",
      "Software mix stabilizes cash flows",
      "Operator excellence compounds returns",
    ],
    risks: ["AI ASIC concentration", "Integration missteps", "Valuation"],
    sourceNotes: "Segment commentary on AI semiconductor vs software.",
    updatedAt: "2026-03-16",
    series: [120, 130, 140, 150, 165, 180, 175, 190, 200, 210, 220, 230],
  }),
  base({
    ticker: "SNDK",
    name: "Sandisk Corporation",
    ceo: "David Goeckeler",
    marketCap: "$12B",
    category: "NAND flash & storage",
    domain: "sandisk.com",
    story:
      "Memory pure-play riding AI storage demand cycles. 10X needs multi-year NAND upcycle + share gains. Main risk: classic cyclical commodity trap.",
    summary:
      "Develops NAND flash, SSDs, and embedded storage for consumer, enterprise, and data center.",
    product: "Flash memory and solid-state storage solutions.",
    feedback: "Enterprise buyers care about endurance, cost/GB, and supply reliability.",
    market: "Memory is cyclical; AI data growth is a demand tailwind but pricing swings violently.",
    lynchType: "cyclical",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "mid",
    tenXPath: "possible",
    peopleVector: "Experienced storage operators; culture must navigate boom/bust.",
    volatilityNote: "Cyclicals: buy when the story is hated and balance sheet can survive the trough.",
    bsChecklist: [
      "Capable operators for a cyclical business",
      "10X needs prolonged undersupply + AI storage intensity",
      "Product is competitive but not magic",
      "Channel inventory scuttlebutt is the edge",
      "Not always best vs Samsung/Micron/SK Hynix",
      "Professional management, not founder mythos",
      "Track record tied to memory cycles",
      "Market often misprices cycle turns",
      "Samsung and Micron are better-resourced peers",
    ],
    pros: ["AI storage demand", "Cyclical upside", "Pure-play exposure"],
    cons: ["Commodity pricing", "Capex heavy", "Inventory risk"],
    superiorCriteria: [
      "Large storage TAM",
      "Not clearly superior product",
      "Execution is cycle-dependent",
      "Not founder-led",
      "Balance sheet through trough is critical",
      "Capital intensive",
      "Often hated at bottoms — classic Lynch setup",
    ],
    financials: "Focus on ASP trends, inventory days, FCF through cycle, net debt.",
    catalysts: "NAND price recovery, enterprise SSD mix, inventory digestion.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Cyclical story — position only when the trough thesis is clear.",
    thesis: ["AI raises storage intensity", "Cycle troughs create mispricing"],
    risks: ["Price collapse", "Capex mistakes", "Competition"],
    sourceNotes: "Channel checks + ASP commentary > narrative blogs.",
    updatedAt: "2026-03-16",
    series: [40, 42, 38, 45, 50, 48, 55, 60, 58, 65, 70, 68],
  }),
  base({
    ticker: "VRT",
    name: "Vertiv Holdings Co",
    ceo: "Giordano Albertazzi",
    marketCap: "$45B",
    category: "Data center power & cooling",
    domain: "vertiv.com",
    story:
      "Picks-and-shovels for AI data centers — power and thermal. 10X needs multi-year AI buildout. Main risk: capex cycle peaks and competition.",
    summary:
      "Global provider of critical digital infrastructure: power management and thermal systems for data centers.",
    product: "UPS, power distribution, liquid cooling, and thermal management for hyperscale and enterprise DCs.",
    feedback: "Hyperscalers care about lead times, density, and reliability under AI heat loads.",
    market: "AI data center power density is exploding; long project pipelines.",
    lynchType: "fast-grower",
    superiorCompany: "yes",
    moat: "medium",
    capSize: "mid",
    tenXPath: "possible",
    peopleVector: "Operators with industrial execution culture; customer intimacy with hyperscalers matters.",
    volatilityNote: "Would add on AI capex scare if backlog and liquid cooling wins remain strong.",
    bsChecklist: [
      "Solid industrial operators",
      "10X needs sustained multi-year DC power density growth",
      "Thermal/power solutions are mission-critical, not optional",
      "Hyperscaler deployment feedback is the scuttlebutt",
      "Among leaders in critical thermal for AI DCs",
      "Professional management",
      "Executed well through AI buildout cycle so far",
      "Market may under-appreciate liquid cooling attach",
      "Eaton, Schneider, nVent compete",
    ],
    pros: ["AI infra pickaxe", "Backlog visibility", "Mission-critical products"],
    cons: ["Valuation can race ahead of cycle", "Customer concentration", "Competition"],
    superiorCriteria: [
      "Massive AI DC TAM",
      "Strong product fit for power density",
      "Improving execution evidence",
      "Not founder-led",
      "Reasonable balance sheet for industrial",
      "Manufacturing capital needs",
      "Sometimes hated on multiple compression — opportunity",
    ],
    financials: "Watch orders, backlog, margins, and free cash conversion.",
    catalysts: "Liquid cooling ramps, hyperscale awards, margin expansion.",
    recommendation: "buy",
    positionSize: "starter",
    verdict: "Superior story for AI power density. Update when capex cycle turns.",
    thesis: [
      "AI raises watts per rack for years",
      "Thermal is a bottleneck, not a commodity easily ignored",
      "Installed base and relationships compound",
    ],
    risks: ["AI capex pause", "Margin pressure", "Competition"],
    sourceNotes: "Order growth and liquid cooling commentary on earnings.",
    updatedAt: "2026-03-14",
    series: [30, 35, 40, 48, 55, 60, 58, 70, 80, 85, 90, 95],
  }),
  base({
    ticker: "AAOI",
    name: "Applied Optoelectronics",
    ceo: "Chih-Hsiang (Thompson) Lin",
    marketCap: "$1.5B",
    category: "Optical networking components",
    domain: "ao-inc.com",
    story:
      "Optics for data center bandwidth. 10X needs 800G/1.6T wins and share vs giants. Main risk: customer concentration and tech transitions.",
    summary:
      "Fiber-optic networking products for datacenter, cable, and telecom markets.",
    product: "Optical transceivers and components that move bits inside and between data centers.",
    feedback: "Datacenter buyers care about yield, cost, and ability to hit next-gen speeds.",
    market: "AI clusters drive optical interconnect demand; supply chains are specialized.",
    lynchType: "fast-grower",
    superiorCompany: "partial",
    moat: "weak",
    capSize: "small",
    tenXPath: "possible",
    peopleVector: "Technical founder leadership; scale execution vs Coherent/Lumentum is the test.",
    volatilityNote: "Small-cap optical names swing hard — only add with clear design-win evidence.",
    bsChecklist: [
      "Technical founder with industry tenure",
      "10X needs next-gen speed share gains",
      "Product must be cost-competitive at volume",
      "Hyperscaler qualification scuttlebutt is everything",
      "Not the sector leader yet",
      "Founder-led",
      "Historical execution has been lumpy",
      "Market may under-appreciate AI optics timing",
      "Coherent, Lumentum, Innolight compete",
    ],
    pros: ["AI bandwidth tailwind", "Small-cap torque", "Founder technical depth"],
    cons: ["Customer concentration", "Competition", "Volatile earnings"],
    superiorCriteria: [
      "Large optical interconnect TAM",
      "Not clearly superior product yet",
      "Execution still proving at scale",
      "Founder-led",
      "Balance sheet / working capital matter",
      "Manufacturing intensity",
      "Often hated small-cap = possible edge",
    ],
    financials: "Watch gross margin, customer mix, and inventory. PEG meaningless in lumpy periods.",
    catalysts: "800G/1.6T qualifications, hyperscale ramps, margin recovery.",
    recommendation: "watch",
    positionSize: "none",
    verdict: "Story is bandwidth + AI. Prove wins before core capital.",
    thesis: ["AI clusters eat optics", "Next-gen transitions reshuffle share"],
    risks: ["Qualification delays", "Pricing pressure", "Dilution"],
    sourceNotes: "Customer concentration footnotes in 10-K.",
    updatedAt: "2026-03-14",
    series: [8, 10, 9, 12, 15, 14, 18, 22, 20, 25, 28, 26],
  }),
  base({
    ticker: "AAPL",
    name: "Apple Inc.",
    ceo: "Tim Cook",
    marketCap: "$3.2T",
    category: "Consumer devices & services",
    domain: "apple.com",
    story:
      "Habit machine with services on top. 10X needs new category wins or services acceleration. Main risk: regulation and China.",
    summary:
      "Designs and sells devices, software, payments, and services into one of the stickiest consumer ecosystems.",
    product: "iPhone, Mac, wearables, services stack tied by identity and habit.",
    feedback: "Users stay for simplicity. Upgrade cycles hinge on whether new features feel worth it.",
    market: "Premium hardware mature; services and lock-in carry the long-term story.",
    lynchType: "stalwart",
    superiorCompany: "partial",
    moat: "strong",
    capSize: "large",
    tenXPath: "weak",
    peopleVector: "Operations excellence under Cook; capital return discipline over founder chaos.",
    volatilityNote: "Would buy more on a sharp selloff if services growth and retention hold.",
    bsChecklist: [
      "Strong operators, not classic founder growth story",
      "10X hard at this size",
      "Product quality still best-in-class premium consumer",
      "Customer loyalty is the scuttlebutt theme",
      "Best premium ecosystem",
      "Cook proven but not Jobs-like product visionary",
      "Executed consistently for a decade+",
      "Market may under-appreciate services durability",
      "Samsung and Google compete on hardware/AI",
    ],
    pros: ["Ecosystem", "Services mix", "Buybacks"],
    cons: ["Mature hardware", "China/reg risk", "AI narrative lag"],
    superiorCriteria: [
      "Large mature market",
      "Better ecosystem than peers",
      "Flawless ops execution",
      "Not founder-led",
      "Fortress balance sheet",
      "Capital returns focus",
      "Beloved — limited hate premium",
    ],
    financials: "Steady EPS, massive FCF, heavy buybacks. PEG reasonable for quality.",
    catalysts: "Services mix, AI features, India, new categories.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Intact stalwart compounder. Not a 10X without a new act.",
    thesis: ["Installed base loyalty", "Services quality improves", "Buybacks compound"],
    risks: ["App Store regulation", "China", "AI expectations"],
    sourceNotes: "Services mix and installed base commentary.",
    updatedAt: "2026-03-13",
    series: [172, 181, 188, 184, 191, 199, 205, 210, 214, 218, 222, 226],
  }),
  base({
    ticker: "META",
    name: "Meta Platforms",
    ceo: "Mark Zuckerberg",
    marketCap: "$1.6T",
    category: "Social apps & AI infra",
    domain: "meta.com",
    story:
      "Attention + ads machine funding AI and Reality Labs. 10X needs AI ads efficiency + new surfaces. Main risk: regulation and capex.",
    summary:
      "Builds apps that connect people and businesses; invests heavily in AI and immersive computing.",
    product: "Facebook, Instagram, WhatsApp, Threads + ads system + Reality Labs hardware.",
    feedback: "Creators and advertisers care about reach and ROI; users care about feed quality.",
    market: "Digital ads are huge; AI improves targeting and content generation.",
    lynchType: "stalwart",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "large",
    tenXPath: "possible",
    peopleVector: "Zuckerberg is technical founder with long-term bets; culture can move fast.",
    volatilityNote: "Would add on ad scare or capex panic if family of apps engagement holds.",
    bsChecklist: [
      "Founder-CEO with decades of product execution",
      "10X needs AI monetization + new surface adoption",
      "Ads product is world-class",
      "Advertiser ROI is the scuttlebutt",
      "Best in social attention for many demographics",
      "Founder with control and conviction",
      "Executed Reels and efficiency years well",
      "Market may under-appreciate open-source AI strategy",
      "Google, TikTok, Amazon ads compete",
    ],
    pros: ["Scale of attention", "Ads AI", "Founder control", "FCF engine"],
    cons: ["Reality Labs spend", "Regulation", "Competition for attention"],
    superiorCriteria: [
      "Massive attention TAM",
      "Superior ads engine",
      "Proven re-acceleration execution",
      "Founder-led",
      "Strong balance sheet",
      "High AI capex",
      "Was hated in 2022 — classic superior-company entry then",
    ],
    financials: "Strong FCF, elevated AI capex. Watch ad pricing and Reality Labs losses.",
    catalysts: "AI ad tools, Llama strategy, Reels monetization, capex discipline.",
    recommendation: "buy",
    positionSize: "core",
    verdict: "Superior company. Story intact if ads AI keeps compounding ROI.",
    thesis: ["Attention scale is hard to replicate", "AI improves ads flywheel", "Founder long game"],
    risks: ["Capex overshoot", "Regulation", "Youth attention shifts"],
    sourceNotes: "Ad impressions, price, and Reality Labs line items.",
    updatedAt: "2026-03-13",
    series: [280, 300, 320, 340, 360, 380, 400, 420, 440, 450, 470, 490],
  }),
  base({
    ticker: "NVDA",
    name: "Nvidia Corporation",
    ceo: "Jensen Huang",
    marketCap: "$3.1T",
    category: "AI chips & developer platform",
    domain: "nvidia.com",
    story:
      "Picks and shovels of AI. 10X needs durable infra spend + CUDA habit. Main risk: custom silicon and valuation.",
    summary:
      "Designs accelerated computing hardware and software used across cloud, enterprise, research, and AI builders.",
    product: "GPUs, CUDA, networking, full-stack AI platform.",
    feedback: "Developers choose Nvidia when tooling and performance matter most.",
    market: "Data center capex huge; custom silicon competition rising over time.",
    lynchType: "fast-grower",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "large",
    tenXPath: "possible",
    peopleVector: "Jensen built a culture obsessed with full-stack acceleration and long-horizon R&D.",
    volatilityNote: "Would add on 30-40% drawdown if CUDA moat and demand intact.",
    bsChecklist: [
      "Exceptional team with decades of platform execution",
      "10X needs AI workloads to broaden into durable inference + enterprise",
      "Product ahead on performance and ecosystem",
      "Developers are the customer — sentiment strong",
      "Best in accelerated computing",
      "Founder-CEO with skin in game and technical depth",
      "Executed through multiple product cycles",
      "Market may under-appreciate software/networking attach",
      "AMD and hyperscaler custom chips compete",
    ],
    pros: ["Platform moat", "Massive TAM", "Best-in-class execution"],
    cons: ["Valuation", "Hyperscaler concentration", "Custom silicon threat"],
    superiorCriteria: [
      "Massive AI TAM",
      "Significantly better developer platform",
      "World-class roadmap execution",
      "Founder-led",
      "Strong FCF and balance sheet",
      "Capital intensive but returns justify",
      "Loved — entry price matters",
    ],
    financials: "Strong EPS growth, elevated PEG, strong FCF, high institutional ownership.",
    catalysts: "Next-gen GPU ramps, inference mix, enterprise AI, networking attach.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Superior company. Story intact. Time on your side only at the right price.",
    thesis: [
      "AI workloads keep expanding",
      "CUDA creates switching costs",
      "Scale and roadmap speed are hard to match",
    ],
    risks: ["Valuation assumes excellence", "Custom chips", "Margin compression"],
    sourceNotes: "Data center customer concentration and inference language on calls.",
    updatedAt: "2026-07-04",
    series: [94, 101, 108, 104, 118, 122, 116, 127, 128, 135, 142, 138],
    storyUpdates: [
      {
        id: "1",
        date: "2026-07-01",
        note: "Inference mix commentary improved — still watching hyperscaler capex tone.",
      },
    ],
  }),
  base({
    ticker: "MU",
    name: "Micron Technology, Inc.",
    ceo: "Sanjay Mehrotra",
    marketCap: "$140B",
    category: "Memory & storage semiconductors",
    domain: "micron.com",
    story:
      "Memory pure-play riding AI HBM demand on top of classic DRAM/NAND cycles. 10X needs multi-year HBM leadership + disciplined supply through the cycle. Main risk: memory is still a boom-bust commodity when AI gloss fades.",
    summary:
      "Micron designs and manufactures DRAM, NAND, and high-bandwidth memory used in PCs, phones, data centers, autos, and AI accelerators.",
    product:
      "DRAM, NAND flash, and HBM stacks that sit next to GPUs in AI servers. Sells bits and bandwidth — not a software platform.",
    feedback:
      "Hyperscalers and GPU partners care about HBM supply, yield, and delivery timing. PC/phone OEMs still swing with inventory cycles.",
    market:
      "AI is lifting HBM and server DRAM, but the broader memory market remains cyclical and oligopolistic (Samsung, SK Hynix, Micron).",
    lynchType: "cyclical",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "large",
    tenXPath: "possible",
    peopleVector:
      "Mehrotra is a memory-industry operator with long tech depth; culture is manufacturing- and yield-obsessed rather than founder-mythos.",
    volatilityNote:
      "Classic Lynch cyclical: buy when the story is hated and balance sheet can survive the trough; size up only if HBM share and pricing still look real after a big drawdown.",
    bsChecklist: [
      "Strong operators for a capital-intensive cyclical business",
      "10X needs sustained AI HBM demand + share gains vs Samsung/SK Hynix, not just one upcycle",
      "HBM product is competitive; overall DRAM/NAND is not unique",
      "Channel inventory and ASP scuttlebutt are the edge — talk to supply-chain contacts",
      "Not always #1 in HBM (SK Hynix has led); Micron is a top-tier #2/#3 depending on node",
      "Professional management, not a founder story",
      "Executed well through prior cycles with improving technology roadmap",
      "Market often under- or over-prices cycle turns and HBM mix",
      "Samsung and SK Hynix are better-resourced peers; Nvidia/AMD set the HBM attach",
    ],
    pros: [
      "Direct AI HBM leverage",
      "Oligopoly memory structure",
      "Operating leverage in upcycles",
      "Diversified end markets (data center, mobile, auto)",
    ],
    cons: [
      "Still a cyclical commodity at core",
      "Huge capex and technology race",
      "Customer concentration in AI servers",
      "Can look expensive at cycle peaks",
    ],
    superiorCriteria: [
      "Large and expanding memory TAM with AI kicker",
      "HBM can be differentiated; commodity DRAM less so",
      "Solid manufacturing execution, not world-class software moat",
      "Not founder-led",
      "Balance sheet stronger than past memory cycles but still cycle-sensitive",
      "Highly capital intensive",
      "Often hated at bottoms — classic Lynch cyclical setup",
    ],
    financials:
      "Watch HBM revenue mix, DRAM/NAND ASPs, gross margin, free cash flow through the cycle, inventory days, and net debt. PEG is often useless mid-cycle; trough FCF and peak-cycle multiples matter more.",
    catalysts:
      "HBM ramp and next-gen nodes, data-center DRAM pricing, inventory digestion in consumer, capex guidance vs demand, share vs SK Hynix/Samsung.",
    recommendation: "watch",
    positionSize: "starter",
    verdict:
      "Real AI story inside a classic cyclical. Story intact if HBM stays scarce and Micron keeps process competitiveness — update hard when ASPs roll over.",
    thesis: [
      "AI accelerators structurally raise HBM and server DRAM intensity",
      "Memory oligopoly can earn excess returns when supply is disciplined",
      "Micron’s HBM roadmap ties the company to the AI infra buildout without needing CUDA-like software",
    ],
    risks: [
      "Memory price collapse in a classic downcycle",
      "Losing HBM process/share race to SK Hynix or Samsung",
      "Hyperscaler capex pause",
      "Capex overshoot destroying FCF",
      "Geopolitics and manufacturing concentration",
    ],
    sourceNotes:
      "Track HBM commentary on earnings, ASP trends, inventory, and competitor node timelines. Compare to SNDK as pure storage cyclical; MU has broader DRAM + HBM leverage.",
    updatedAt: "2026-07-09",
    series: [55, 60, 58, 72, 80, 95, 88, 105, 120, 115, 130, 145],
    storyUpdates: [
      {
        id: "1",
        date: "2026-07-09",
        note: "Added to coverage as AI HBM + DRAM cyclical story. Monitor HBM mix vs traditional memory cycle risk.",
      },
    ],
  }),
];

export function lynchLabel(type: LynchType): string {
  return lynchTypes.find((item) => item.value === type)?.label ?? "Not sure yet";
}

export function defaultSeries(): number[] {
  return [20, 22, 21, 25, 27, 26, 30, 29, 33, 35, 34, 38];
}

export function emptyCompany(): Company {
  return {
    ticker: "",
    name: "",
    ceo: "",
    marketCap: "",
    category: "",
    story: "",
    summary: "",
    product: "",
    feedback: "",
    market: "",
    lynchType: "unknown",
    superiorCompany: "",
    moat: "",
    capSize: "",
    tenXPath: "",
    peopleVector: "",
    volatilityNote: "",
    bsChecklist: [],
    pros: [],
    cons: [],
    superiorCriteria: [],
    financials: "",
    catalysts: "",
    recommendation: "",
    positionSize: "",
    verdict: "",
    thesis: [],
    risks: [],
    sourceNotes: "",
    storyUpdates: [],
    domain: "",
    updatedAt: new Date().toISOString().slice(0, 10),
    series: defaultSeries(),
  };
}

export function lines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseImportPayload(raw: unknown): Company[] | null {
  if (!Array.isArray(raw)) return null;
  return raw
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map(normalizeCompany)
    .filter((company) => company.ticker && company.name);
}

function normalizeCompany(raw: Record<string, unknown>): Company {
  const baseCompany = emptyCompany();
  const ticker = String(raw.ticker ?? "").trim().toUpperCase();
  const existingSeries = Array.isArray(raw.series)
    ? raw.series.map(Number).filter(Number.isFinite)
    : defaultSeries();

  const storyUpdates = Array.isArray(raw.storyUpdates)
    ? raw.storyUpdates
        .filter((u): u is Record<string, unknown> => !!u && typeof u === "object")
        .map((u) => ({
          id: String(u.id ?? crypto.randomUUID()),
          date: String(u.date ?? ""),
          note: String(u.note ?? ""),
        }))
        .filter((u) => u.note)
    : [];

  return {
    ...baseCompany,
    ticker,
    name: String(raw.name ?? "").trim(),
    ceo: String(raw.ceo ?? "").trim(),
    marketCap: String(raw.marketCap ?? "").trim(),
    category: String(raw.category ?? "").trim(),
    story: String(raw.story ?? "").trim(),
    summary: String(raw.summary ?? "").trim(),
    product: String(raw.product ?? raw.category ?? "").trim(),
    feedback: String(raw.feedback ?? "").trim(),
    market: String(raw.market ?? "").trim(),
    lynchType: isLynchType(raw.lynchType) ? raw.lynchType : "unknown",
    superiorCompany: isTriState(raw.superiorCompany) ? raw.superiorCompany : "",
    moat: isMoat(raw.moat) ? raw.moat : "",
    capSize: isCapSize(raw.capSize) ? raw.capSize : "",
    tenXPath: isTenXPath(raw.tenXPath) ? raw.tenXPath : "",
    peopleVector: String(raw.peopleVector ?? "").trim(),
    volatilityNote: String(raw.volatilityNote ?? "").trim(),
    bsChecklist: toLines(raw.bsChecklist),
    pros: toLines(raw.pros),
    cons: toLines(raw.cons),
    superiorCriteria: toLines(raw.superiorCriteria),
    financials: String(raw.financials ?? "").trim(),
    catalysts: String(raw.catalysts ?? "").trim(),
    recommendation: isRecommendation(raw.recommendation) ? raw.recommendation : "",
    positionSize: isPositionSize(raw.positionSize) ? raw.positionSize : "",
    verdict: String(raw.verdict ?? "").trim(),
    thesis: toLines(raw.thesis),
    risks: toLines(raw.risks),
    sourceNotes: String(raw.sourceNotes ?? "").trim(),
    storyUpdates,
    domain: String(raw.domain ?? "").trim(),
    updatedAt: String(raw.updatedAt ?? new Date().toISOString().slice(0, 10)),
    series: existingSeries.length ? existingSeries : defaultSeries(),
  };
}

function toLines(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") return lines(value);
  return [];
}

function isLynchType(value: unknown): value is LynchType {
  return typeof value === "string" && lynchTypes.some((item) => item.value === value);
}

function isTriState(value: unknown): value is Company["superiorCompany"] {
  return value === "yes" || value === "partial" || value === "no" || value === "";
}

function isMoat(value: unknown): value is Company["moat"] {
  return value === "strong" || value === "medium" || value === "weak" || value === "";
}

function isCapSize(value: unknown): value is Company["capSize"] {
  return value === "small" || value === "mid" || value === "large" || value === "";
}

function isTenXPath(value: unknown): value is Company["tenXPath"] {
  return (
    value === "clear" ||
    value === "possible" ||
    value === "weak" ||
    value === "none" ||
    value === ""
  );
}

function isRecommendation(value: unknown): value is Company["recommendation"] {
  return (
    value === "strong-buy" ||
    value === "buy" ||
    value === "watch" ||
    value === "avoid" ||
    value === ""
  );
}

function isPositionSize(value: unknown): value is Company["positionSize"] {
  return value === "none" || value === "starter" || value === "core" || value === "";
}
