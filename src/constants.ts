import type { Company, LynchType } from "./types";

export const STORAGE_KEY = "stunk-stonk-research-hub-v8";

export const lynchTypes: { value: LynchType; label: string }[] = [
  { value: "fast-grower", label: "Fast grower" },
  { value: "stalwart", label: "Stalwart" },
  { value: "slow-grower", label: "Slow grower" },
  { value: "cyclical", label: "Cyclical" },
  { value: "turnaround", label: "Turnaround" },
  { value: "asset-play", label: "Asset play" },
  { value: "unknown", label: "Not sure yet" },
];

function base(
  partial: Omit<Company, "storyUpdates" | "domain"> &
    Partial<Pick<Company, "storyUpdates" | "domain">>,
): Company {
  return {
    storyUpdates: [],
    domain: "",
    ...partial,
  };
}

export const demoCompanies: Company[] = [
  base({
    ticker: "NBIS",
    name: "Nebius Group N.V.",
    ceo: "Arkady Volozh",
    marketCap: "$55B",
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
    catalysts: "Meta/neocloud demand narrative, GPU cluster utilization, capacity ramps, path to FCF, next earnings print on AI cloud bookings.",
    recommendation: "watch",
    positionSize: "none",
    verdict: "Interesting story, not yet superior. Track rocks quarterly before sizing.",
    thesis: [
      "AI compute demand remains structurally high",
      "Independent clouds can win niches on price and availability",
      "Experienced team from large-scale consumer tech",
    ],
    risks: ["Capex spiral", "Hyperscaler price wars", "Dilution", "Customer concentration"],
    sourceNotes: "Yahoo Finance mkt cap ~$55B (Jul 8-9 2026). Track utilization, backlog, and customer concentration on earnings.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "As of Jul 2026, market cap ~$55B after a strong AI-cloud run. Story shifts from prove the spin-off to whether utilization and marquee demand justify a premium multiple on capital-intensive infra. Watch Meta/neo-cloud deal flow and cash burn vs bookings.",
      },
    ],
  }),
  base({
    ticker: "OUST",
    name: "Ouster, Inc.",
    ceo: "Angus Pacala",
    marketCap: "$3.2B",
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
    catalysts: "Robotics/physical-AI design wins, dilution after the ~$200M equity raise, next product cycle execution, path to profitability.",
    recommendation: "watch",
    positionSize: "none",
    verdict: "Story possible but sector graveyard risk. Turn more rocks before capital.",
    thesis: ["Robots need eyes", "Digital lidar cost curve", "Software can differentiate"],
    risks: ["Commoditization", "Dilution", "OEM delays"],
    sourceNotes: "Yahoo Finance mkt cap ~$3.2B (Jul 9 2026). Monitor unit shipments, gross margin, and post-offering cash runway.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$3.2B after a volatile lidar/robotics re-rating. Fresh story risk: recent discounted stock offering (~$200M) funds growth but dilutes holders. Near-term story hinges on robotics/smart-infra volume converting.",
      },
    ],
  }),
  base({
    ticker: "TSLA",
    name: "Tesla, Inc.",
    ceo: "Elon Musk",
    marketCap: "$1.5T",
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
    catalysts: "FSD unsupervised milestones, robotaxi pilots, energy storage growth, Optimus demos, auto margin trajectory, next earnings.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Story intact if autonomy path is real. Price discipline required.",
    thesis: [
      "Software-defined vehicles compound data advantage",
      "Energy storage is an under-appreciated cash engine",
      "Manufacturing know-how is hard to copy quickly",
    ],
    risks: ["Margin compression", "Autonomy delays", "Competition", "Key-person risk"],
    sourceNotes: "Yahoo Finance mkt cap ~$1.5T (Jul 8 2026). Track deliveries, energy segment, FSD language, and margins.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$1.5T. Auto competition remains intense while the market still prices meaningful autonomy/robotics optionality. Monitor whether energy + software progress offsets auto margin compression.",
      },
    ],
  }),
  base({
    ticker: "AVGO",
    name: "Broadcom Inc.",
    ceo: "Hock Tan",
    marketCap: "$1.9T",
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
    catalysts: "Custom AI ASIC ramps, networking attach, software (VMware) margins, hyperscaler capex tone, next earnings — AVGO remains a top S&P earnings-growth driver alongside NVDA/MU.",
    recommendation: "buy",
    positionSize: "core",
    verdict: "Superior compounder. Story intact; size position for quality, not lottery.",
    thesis: [
      "Custom silicon is a durable AI budget line",
      "Software mix stabilizes cash flows",
      "Operator excellence compounds returns",
    ],
    risks: ["AI ASIC concentration", "Integration missteps", "Valuation"],
    sourceNotes: "Yahoo Finance mkt cap ~$1.9T (Jul 8-9 2026). Segment AI semiconductor vs software on every call.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$1.9T. AI custom silicon + networking still the growth engine; Street treats AVGO as one of the stocks that can make or break index earnings. Concentration risk vs how long custom ASIC demand stays explosive.",
      },
    ],
  }),
  base({
    ticker: "SNDK",
    name: "Sandisk Corporation",
    ceo: "David Goeckeler",
    marketCap: "$287B",
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
    capSize: "large",
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
    catalysts: "Multi-year Meta NAND supply deal, memory pricing trajectory, FY results (~Aug 5 2026) and Investor Day (~Aug 13 2026), AI storage intensity.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Cyclical story — position only when the trough thesis is clear.",
    thesis: ["AI raises storage intensity", "Cycle troughs create mispricing"],
    risks: ["Price collapse", "Capex mistakes", "Competition"],
    sourceNotes: "Yahoo Finance mkt cap ~$287B (Jul 9 2026). Watch ASPs, inventory, Meta deal contribution, and Aug 2026 print.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap exploded to ~$287B on the AI memory supercycle. Fresh catalyst: multi-year NAND supply deal with Meta. Market is pricing multi-year AI storage scarcity. Classic Lynch risk: cycles peak when everyone agrees memory is permanently tight. Update hard after Aug earnings/Investor Day.",
      },
    ],
  }),
  base({
    ticker: "VRT",
    name: "Vertiv Holdings Co",
    ceo: "Giordano Albertazzi",
    marketCap: "$122B",
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
    capSize: "large",
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
    catalysts: "Malaysia capacity expansion for AI infra, liquid cooling attach, backlog/orders, Jul 29 2026 earnings, hyperscale power density wins.",
    recommendation: "buy",
    positionSize: "starter",
    verdict: "Superior story for AI power density. Update when capex cycle turns.",
    thesis: [
      "AI raises watts per rack for years",
      "Thermal is a bottleneck, not a commodity easily ignored",
      "Installed base and relationships compound",
    ],
    risks: ["AI capex pause", "Margin pressure", "Competition"],
    sourceNotes: "Yahoo Finance mkt cap ~$122B (Jul 8 2026). Orders, liquid cooling mix, and margin on Jul 29 earnings.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$122B after a huge AI power/thermal re-rating. Expanding Malaysia capacity to serve AI demand. Story intact as picks-and-shovels for rack power density, but valuation embeds multi-year excellence — next earnings must keep backlog growing.",
      },
    ],
  }),
  base({
    ticker: "AAOI",
    name: "Applied Optoelectronics",
    ceo: "Chih-Hsiang (Thompson) Lin",
    marketCap: "$10B",
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
    capSize: "mid",
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
    catalysts: "800G/1.6T qualifications, datacenter vs CATV mix, Mediacom DOCSIS work, Aug 6 2026 earnings est., optics sector volatility after recent pullbacks.",
    recommendation: "watch",
    positionSize: "none",
    verdict: "Story is bandwidth + AI. Prove wins before core capital.",
    thesis: ["AI clusters eat optics", "Next-gen transitions reshuffle share"],
    risks: ["Qualification delays", "Pricing pressure", "Dilution"],
    sourceNotes: "Yahoo Finance mkt cap ~$10B (Jul 9 2026). Track datacenter mix, gross margin, and customer concentration.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$10B after a massive YTD optics run and sharp pullbacks. Story is still AI bandwidth + cable upgrades, but at this size execution and customer concentration matter more than narrative. Next earnings must show orders converting.",
      },
    ],
  }),
  base({
    ticker: "AAPL",
    name: "Apple Inc.",
    ceo: "Tim Cook",
    marketCap: "$4.6T",
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
    catalysts: "Services mix, AI feature-driven upgrade cycle, India, next product cycle, regulatory App Store outcomes.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Intact stalwart compounder. Not a 10X without a new act.",
    thesis: ["Installed base loyalty", "Services quality improves", "Buybacks compound"],
    risks: ["App Store regulation", "China", "AI expectations"],
    sourceNotes: "Yahoo Finance mkt cap ~$4.6T (Jul 8 2026). Services %, installed base, China commentary.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$4.6T — still a mega-cap stalwart while NVDA/Alphabet fight for the top. Story unchanged: services + ecosystem durability; 10X remains hard. Watch whether on-device AI reaccelerates upgrades.",
      },
    ],
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
    catalysts: "AI capex intensity, custom AI chip production ramp commentary, ads efficiency, Reality Labs losses, Jul 29 2026 earnings est., enterprise AI push.",
    recommendation: "buy",
    positionSize: "core",
    verdict: "Superior company. Story intact if ads AI keeps compounding ROI.",
    thesis: ["Attention scale is hard to replicate", "AI improves ads flywheel", "Founder long game"],
    risks: ["Capex overshoot", "Regulation", "Youth attention shifts"],
    sourceNotes: "Yahoo Finance mkt cap ~$1.55T (Jul 9 2026). Capex guide, ad pricing, Reality Labs line on Jul 29 earnings.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$1.55T. Market wrestling with huge AI infra spend vs ads FCF — shares swing on capex headlines even as core apps print strong results. Fresh threads: custom AI silicon timelines and enterprise AI monetization. Story intact if ads ROI stays elite.",
      },
    ],
  }),
  base({
    ticker: "NVDA",
    name: "Nvidia Corporation",
    ceo: "Jensen Huang",
    marketCap: "$4.9T",
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
    catalysts: "Next GPU cycle ramps, inference mix, networking attach, hyperscaler capex, competition from AMD/custom silicon, earnings durability as one of the world's largest companies.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Superior company. Story intact. Time on your side only at the right price.",
    thesis: [
      "AI workloads keep expanding",
      "CUDA creates switching costs",
      "Scale and roadmap speed are hard to match",
    ],
    risks: ["Valuation assumes excellence", "Custom chips", "Margin compression"],
    sourceNotes: "Yahoo Finance mkt cap ~$4.9T (Jul 9 2026). Data center mix, customer concentration, supply commentary.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$4.9T — still the global #1 by value, but YTD performance has lagged hotter memory/AMD names after easy multiple expansion. Can earnings keep compounding from this base, or does custom silicon + size make the next trillion harder?",
      },
      
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
    marketCap: "$1.1T",
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
      "HBM scarcity, server DRAM pricing, next earnings (Street treats MU as a top S&P earnings-growth driver with NVDA/AVGO), supply discipline vs Samsung/SK Hynix.",
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
      "Market data ~$1.1T class mkt cap (early Jul 2026). HBM mix, ASP trends, inventory days.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap in ~$1T+ territory on the AI HBM boom. Story shifted from classic trough cyclical to AI memory oligopoly with HBM leadership race. Update ruthlessly when ASPs roll over — memory narratives overshoot both ways.",
      },
      
      {
        id: "1",
        date: "2026-07-09",
        note: "Added to coverage as AI HBM + DRAM cyclical story. Monitor HBM mix vs traditional memory cycle risk.",
      },
    ],
  }),
  base({
    ticker: "COIN",
    name: "Coinbase Global, Inc.",
    ceo: "Brian Armstrong",
    marketCap: "$42B",
    category: "Crypto exchange & on-chain infrastructure",
    domain: "coinbase.com",
    story:
      "Trusted U.S. crypto on-ramp and exchange that wants to become the financial system for crypto. 10X needs durable transaction + subscription mix through multiple crypto cycles and regulatory clarity. Main risk: volume is still cyclical and regulation can rewrite the rules overnight.",
    summary:
      "Coinbase operates a leading crypto exchange and broader platform — retail and institutional trading, custody, staking, stablecoin-related economics, and developer/on-chain products.",
    product:
      "Buy/sell/custody crypto for retail and institutions; Coinbase Prime, staking, USDC economics, Base L2, and wallet/developer tools. The core product is trusted access to crypto markets in a regulated wrapper.",
    feedback:
      "Users pick Coinbase for brand safety and ease of use vs offshore venues; power traders often complain about fees vs Binance-class competitors. Institutions care about custody, compliance, and uptime more than meme coins.",
    market:
      "Crypto trading volume is highly cyclical. Long-term TAM expands if tokenized assets, stablecoins, and on-chain finance go mainstream — but competitors include other exchanges, fintech apps, and banks.",
    lynchType: "cyclical",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "large",
    tenXPath: "possible",
    peopleVector:
      "Armstrong is a technical founder with long crypto conviction and high ownership mentality; culture is product/engineering heavy and policy-aware after years of regulatory fights.",
    volatilityNote:
      "Would only add on a deep drawdown if subscription/stablecoin/custody mix is still growing and the regulatory path looks intact — not on pure trading-volume hype.",
    bsChecklist: [
      "Founder-CEO with real track record building the category leader in the U.S.",
      "10X needs crypto to keep institutionalizing (stablecoins, custody, on-chain apps) — not just one bull market",
      "Product is best-in-class for compliant U.S. access; not always cheapest",
      "Customer sentiment: trust and simplicity win; fee sensitivity is real among active traders",
      "Best regulated U.S. pure-play exchange brand for many users; global volume leadership is elsewhere",
      "Founder-led with skin in the game and long time horizon",
      "Executed through multiple boom/bust cycles; survived 2022 better than many peers",
      "Seek alpha: stablecoin/subscription/Base economics may matter more than headline trading volume",
      "Binance, other CEXs, Robinhood, and banks/fintechs are the real competitors",
    ],
    pros: [
      "U.S. brand and regulatory positioning",
      "Diversifying beyond pure trading (custody, subscriptions, USDC, Base)",
      "Founder-led with crypto-native product culture",
      "Operating leverage in crypto upcycles",
    ],
    cons: [
      "Revenue still highly sensitive to crypto volumes and prices",
      "Regulatory risk remains existential in bad scenarios",
      "Competition on fees and product from global exchanges and apps",
      "Retail crypto behavior can turn off for years",
    ],
    superiorCriteria: [
      "Massive if crypto financialization continues; cyclical if it does not",
      "Stronger compliance/trust product than most crypto peers",
      "Proven survival and product execution through cycles",
      "Founder-led with aligned incentives",
      "Balance sheet improved vs 2022 stress, but business is still cycle-tied",
      "Software-ish platform, not heavy manufacturing",
      "Often loved in bull markets and hated in bears — classic mispricing windows",
    ],
    financials:
      "Watch transaction revenue vs subscription and services mix, USDC-related income, trading volumes, take rate, operating expenses, and net cash. PEG is nearly useless cycle-to-cycle; focus on trough cash generation and mix shift quality.",
    catalysts:
      "Jul 30 2026 earnings est., crypto volume/BTC path (~$63k area), subscription/USDC mix, UK authorization progress, prediction-markets product stability.",
    recommendation: "watch",
    positionSize: "starter",
    verdict:
      "Best-in-class U.S. crypto platform story, still a cycle business. Superior in positioning, not yet a set-and-forget compounder. Update hard when volume collapses or mix quality improves.",
    thesis: [
      "Trusted on-ramps win as crypto institutionalizes",
      "Non-trading revenue can make the model less fragile over time",
      "Regulatory clarity is a feature for Coinbase relative to offshore peers",
    ],
    risks: [
      "Prolonged crypto winter crushing volumes",
      "Adverse regulation or enforcement",
      "Share loss to lower-fee venues or fintechs",
      "Stablecoin economics changing with rates or rules",
      "Key-person / industry reputation shocks",
    ],
    sourceNotes:
      "Yahoo Finance mkt cap ~$42B (Jul 9 2026). Transaction vs subscription mix; BTC beta; Jul 30 earnings.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$42B after a rough stretch for crypto equities. Recent noise included weak revenue YoY and analyst PT cuts even as some still see long-term upside. Story is back to cycle reality: prove non-trading revenue while volumes are quiet.",
      },
      
      {
        id: "1",
        date: "2026-07-09",
        note: "Added to coverage as cyclical crypto platform with institutionalization optionality.",
      },
    ],
  }),
  base({
    ticker: "HOOD",
    name: "Robinhood Markets, Inc.",
    ceo: "Vladimir Tenev",
    marketCap: "$106B",
    category: "Retail brokerage & financial super-app",
    domain: "robinhood.com",
    story:
      "Mobile-first brokerage that made trading feel simple for a generation. 10X needs to become a full financial home (brokerage + retirement + credit + crypto) with sticky deposits, not just meme-trade bursts. Main risk: retail engagement is cyclical and product trust can break fast.",
    summary:
      "Robinhood provides commission-free brokerage, retirement accounts, crypto, cards/credit products, and related financial services aimed primarily at self-directed retail customers.",
    product:
      "Simple trading app for stocks, options, crypto; cash management, retirement, and expanding banking-like products. Core product is low-friction market access with a consumer UX.",
    feedback:
      "Younger users love the clean interface and low barriers; critics cite gamification concerns and past outages (e.g. meme-stock era). Retention depends on whether customers graduate into broader money products or churn after the trade urge fades.",
    market:
      "U.S. retail brokerage is competitive (Schwab, Fidelity, E*TRADE, Webull, Coinbase for crypto). Long-term prize is share of wallet for a digitally native cohort.",
    lynchType: "fast-grower",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "large",
    tenXPath: "possible",
    peopleVector:
      "Tenev is co-founder/CEO with technical background; culture is growth and product velocity, still rebuilding credibility after past operational and regulatory scars.",
    volatilityNote:
      "Would buy more on a sharp selloff only if net deposits, funded accounts, and non-transaction revenue are still compounding — not if the story is only options/meme volumes.",
    bsChecklist: [
      "Founder-led team that created category-defining retail UX",
      "10X needs wallet share expansion beyond episodic trading into deposits, retirement, credit, and recurring engagement",
      "Product UX is often best-in-class for beginners; trust and reliability must stay strong",
      "Customer sentiment is polarized: love the app, remember past failures",
      "Not the richest brokerage franchise vs Schwab/Fidelity; can be best digital front door for a segment",
      "Founder-CEO with skin in the game; needs consistent operational excellence",
      "Executed strong product expansion post-IPO; still proving durable unit economics through full cycles",
      "Seek alpha: net interest and subscription-like products may matter more than trade count headlines",
      "Schwab, Fidelity, Webull, and crypto apps are the main competitors for attention and assets",
    ],
    pros: [
      "Excellent consumer product distribution among younger investors",
      "Expanding beyond pure trading into multi-product finance",
      "High operating leverage when retail activity returns",
      "Brand recognition in its demographic",
    ],
    cons: [
      "Activity-driven revenue can swing hard with markets",
      "Regulatory and reputational overhang from past events",
      "Harder to win affluent/complex relationships vs incumbents",
      "Competition can compress payment for order flow / take rates over time",
    ],
    superiorCriteria: [
      "Large retail finance TAM if they become a money home",
      "UX advantage is real; moat vs mega-brokers is still forming",
      "Improving execution evidence, not yet multi-decade proof",
      "Founder-led",
      "Balance sheet healthier than early post-IPO stress periods, still equity-market sensitive",
      "Capital-light software platform",
      "Often hated after retail booms — possible mispricing in quiet markets",
    ],
    financials:
      "Watch net deposits, AUC, revenue per user, transaction vs net interest vs other revenue, options volumes, crypto mix, opex, and profitability durability in a quiet tape.",
    catalysts:
      "Jul 29 2026 earnings, prediction markets / event contracts traction, crypto + AI trading features, net deposits, accounts distribution narrative, S&P 500 membership flow.",
    recommendation: "watch",
    positionSize: "starter",
    verdict:
      "Story is 'retail super-app' not 'meme broker.' Partial superior company until deposits and multi-product engagement prove durable through a boring market.",
    thesis: [
      "Digital natives want one simple place for money and markets",
      "Product breadth can convert episodic traders into multi-year customers",
      "Share of young investor wallet is strategically valuable",
    ],
    risks: [
      "Retail trading winter",
      "Regulatory limits on business model economics",
      "Outages or trust events",
      "Failure to grow assets beyond active traders",
      "Competitive fee and feature pressure",
    ],
    sourceNotes:
      "Yahoo Finance mkt cap ~$106B (Jul 2026). Net deposits, AUC, revenue mix; Jul 29 earnings.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$106B — far larger than the post-IPO meme-broker era. Product story expanding (prediction markets, crypto, AI trading, retirement/accounts). Jul 29 earnings must show deposits and engagement quality. Super-app thesis more credible — and more is priced in.",
      },
      
      {
        id: "1",
        date: "2026-07-09",
        note: "Added to coverage as retail brokerage/super-app story — focus on deposits and product breadth vs trading cycles.",
      },
    ],
  }),
  base({
    ticker: "HIMS",
    name: "Hims & Hers Health, Inc.",
    ceo: "Andrew Dudum",
    marketCap: "$8.3B",
    category: "Telehealth & personalized consumer health",
    domain: "forhims.com",
    story:
      "Direct-to-consumer telehealth brand turning awkward health needs into simple subscriptions (and now weight-loss/GLP-1 adjacency). 10X needs category expansion with high retention and defensible clinical/ops quality. Main risk: medical regulation, drug access/pricing, and brand fatigue if growth was mostly one category.",
    summary:
      "Hims & Hers provides telehealth-enabled personalized health and wellness products across sexual health, hair, skincare, mental health, weight loss, and related offerings under consumer brands.",
    product:
      "Online intake + provider network + compounded/branded treatments delivered to the door. Product is convenience, privacy, and a modern brand layered on regulated healthcare workflows.",
    feedback:
      "Customers like privacy, speed, and packaging; complaints often center on subscription friction, clinical suitability, and whether outcomes justify price vs traditional care or competitors.",
    market:
      "Huge consumer health spend, but telehealth and specialty meds are competitive and regulation-sensitive. GLP-1 era raised both opportunity and scrutiny.",
    lynchType: "fast-grower",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "mid",
    tenXPath: "possible",
    peopleVector:
      "Dudum is founder-CEO with consumer-brand instincts; culture mixes DTC marketing aggression with healthcare compliance obligations — that tension is the story.",
    volatilityNote:
      "Would add on a big drop only if multi-specialty retention and contribution margins stay healthy after any single-category (e.g. weight-loss) slowdown.",
    bsChecklist: [
      "Founder-led consumer health operator with real scale in DTC telehealth",
      "10X needs multi-condition platform economics, not one viral treatment category forever",
      "Product experience is meaningfully better than traditional care for many simple use cases; clinical moat is thinner",
      "Customer sentiment: strong brand for privacy/convenience; watch cancellation and trust issues closely",
      "Among leaders in U.S. DTC telehealth brands; not the only player (Ro, LifeMD, traditional providers, pharmacies)",
      "Founder-CEO with growth DNA; need ongoing proof of responsible clinical governance",
      "Executed rapid category expansion and brand building; must keep proving unit economics as mix shifts",
      "Seek alpha: specialty mix, retention cohorts, and compounding/fulfillment economics beyond headline subscriber growth",
      "Other telehealth DTCs, big pharmacy/retail health, and primary care digital players compete",
    ],
    pros: [
      "Strong consumer brand in stigmatized/high-intent categories",
      "Subscription-like revenue potential with repeat treatments",
      "Platform can add conditions over time",
      "Capital-light relative to hospitals/clinics",
    ],
    cons: [
      "Regulatory and compounding pharmacy risk",
      "Category concentration risk (growth narratives can revolve around one therapy)",
      "Customer acquisition costs can spike",
      "Healthcare trust is brittle if quality issues appear",
    ],
    superiorCriteria: [
      "Large consumer health TAM with online shift",
      "Brand + UX better than many peers; clinical moat still building",
      "Strong growth execution; long-term clinical ops excellence still on trial",
      "Founder-led",
      "Improving profitability narrative possible, but watch cash conversion and promo intensity",
      "Mostly non-capital intensive model",
      "Can be hated on regulatory headlines — possible entry points if story intact",
    ],
    financials:
      "Watch revenue growth by specialty, gross margin, marketing efficiency (CAC/LTV), subscriber/active customer trends, churn/retention, and any concentration in weight-loss or other hot categories. Balance sheet and free cash flow matter if CAC rises.",
    catalysts:
      "Aug 10 2026 earnings est., FDA peptide/compounding scrutiny, weight-loss category economics as employer coverage shifts, multi-specialty retention, working-capital facility utilization.",
    recommendation: "watch",
    positionSize: "starter",
    verdict:
      "Real consumer healthcare story with platform optionality. Superior only if multi-category retention holds when the loudest category cools. Update the sheet on regulation and mix shifts immediately.",
    thesis: [
      "Consumers will keep buying convenient, private care for select conditions online",
      "Brand can become a multi-specialty health relationship, not a single SKU",
      "Subscription dynamics can compound if clinical outcomes and trust stay solid",
    ],
    risks: [
      "Regulatory action on compounding, marketing, or prescribing practices",
      "GLP-1 / weight-loss access or pricing shocks",
      "Rising CAC and weaker retention",
      "Medical liability or brand scandals",
      "Competition from better-funded health platforms",
    ],
    sourceNotes:
      "Yahoo Finance mkt cap ~$8.3B (Jul 9 2026). Specialty mix, retention, regulatory notes; Aug 10 earnings.",
    updatedAt: "2026-07-09",
    storyUpdates: [
      {
        id: "mkt-2026-07-09",
        date: "2026-07-09",
        note: "Jul 2026: mkt cap ~$8.3B after a volatile year off highs on regulatory/peptide headlines. Story pivot: multi-category healthcare platform quality under FDA spotlight, or growth too tied to hot weight-loss/peptides? Aug earnings and FDA clarity are the rocks to turn.",
      },
      
      {
        id: "1",
        date: "2026-07-09",
        note: "Added to coverage as DTC telehealth platform story — monitor multi-category durability vs single-product hype.",
      },
    ],
  }),
];

export function lynchLabel(type: LynchType): string {
  return lynchTypes.find((item) => item.value === type)?.label ?? "Not sure yet";
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
