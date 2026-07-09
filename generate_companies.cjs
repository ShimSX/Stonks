const fs = require("fs");

const newCompanies = `export const demoCompanies: Company[] = [
  {
    ticker: "NBIS",
    name: "Nebius Group N.V.",
    ceo: "Arkady Volozh",
    marketCap: "$4.2B",
    category: "AI Infrastructure",
    story: "Pivoted from Yandex to purely building AI datacenters in Europe. 10X needs mass adoption of their GPU cloud by AI startups. Main risk: execution against hyper-scalers.",
    summary: "Nebius Group N.V. (NBIS) is a Netherlands-based technology company with historical operations in e-commerce and classifieds markets. The company filed for Chapt...",
    product: "AI Cloud, GPU clusters, data labeling.",
    feedback: "Early adopters like the cost-to-performance ratio of their European datacenters.",
    market: "Massive AI capex buildout, but hyperscalers are the dominant players.",
    lynchType: "turnaround",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "mid",
    tenXPath: "possible",
    peopleVector: "Experienced team with a chip on their shoulder post-Yandex exit.",
    volatilityNote: "High volatility expected given the AI hardware cycle.",
    bsChecklist: [
      "Is the team credible? Yes.",
      "Do they have access to NVIDIA chips? Yes, secured supply.",
      "Are customers actually migrating? Slowly."
    ],
    pros: ["Strategic European datacenters", "Deep technical talent", "Low valuation relative to peers"],
    cons: ["Hyperscaler competition", "Unproven sales motion", "Capital intensive"],
    superiorCriteria: [
      "Access to latest GPUs",
      "Power contracts secured in Europe",
      "Lean operations"
    ],
    financials: "High capex, burning cash but well capitalized from the Yandex split.",
    catalysts: "New datacenter online, major customer announcements, GPU allocations.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "A high-risk, high-reward AI infrastructure play. Needs to prove they can land big enterprise logos.",
    thesis: [
      "Europe needs sovereign AI cloud",
      "Nebius has the cash and talent to build it",
      "Current valuation doesn't price in success"
    ],
    risks: [
      "Hyperscalers crush them on pricing",
      "NVIDIA allocation shifts",
      "Power constraints"
    ],
    sourceNotes: "Watch the datacenter MW capacity metric next quarter.",
    updatedAt: "2026-03-17",
    series: [10, 12, 11, 15, 18, 22, 21, 26, 30, 32, 29, 35]
  },
  {
    ticker: "OUST",
    name: "Ouster, Inc.",
    ceo: "Angus Pacala",
    marketCap: "$800M",
    category: "Lidar Sensors",
    story: "Digital lidar eating the analog market. 10X needs automotive wins or mass robotics adoption. Main risk: cash burn and delayed auto adoption.",
    summary: "Ouster, Inc. (OUST) is a lidar sensor manufacturer developing solid-state lidar technology for automotive, robotics, and industrial applications. The company de...",
    product: "Digital solid-state lidar sensors and software.",
    feedback: "Customers love the reliability and declining cost curve compared to analog lidar.",
    market: "Robotics and smart infrastructure are growing, but auto is the whale.",
    lynchType: "fast-grower",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "small",
    tenXPath: "possible",
    peopleVector: "Founder-led, heavily engineering focused. Acquired Velodyne intelligently.",
    volatilityNote: "Will buy more under $10 if revenue growth remains >40%.",
    bsChecklist: [
      "Is the technology actually better? Yes, digital architecture scales like semiconductors.",
      "Are margins improving? Yes, rapidly.",
      "Is the runway sufficient? Yes, they have cash for 2+ years."
    ],
    pros: ["Digital architecture cost advantage", "Diverse revenue streams (non-auto)", "High gross margins"],
    cons: ["Auto adoption is slow", "Macro sensitivity in industrial/robotics", "Still unprofitable"],
    superiorCriteria: [
      "Structural cost advantage via digital architecture",
      "Clear path to profitability",
      "Dominant in non-automotive lidar"
    ],
    financials: "Rapid revenue growth (40%+), expanding gross margins (30%+), path to break-even.",
    catalysts: "Automotive series production awards, robotics scale-up, profitability.",
    recommendation: "buy",
    positionSize: "starter",
    verdict: "The winner of the lidar wars. Just waiting for the market to realize digital beat analog.",
    thesis: [
      "Digital lidar costs will trend to zero like CMOS cameras",
      "Ouster is the only true digital player at scale",
      "Software margins will drive profitability"
    ],
    risks: [
      "Vision-only autonomy (Tesla approach) wins",
      "Automakers delay Level 3/4 indefinitely",
      "Recession hits industrial robotics demand"
    ],
    sourceNotes: "Track gross margin progression and software attach rate.",
    updatedAt: "2026-03-17",
    series: [5, 6, 8, 7, 9, 11, 14, 13, 16, 20, 19, 22]
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    ceo: "Elon Musk",
    marketCap: "$750B",
    category: "Autonomy & Energy",
    story: "EV margins funding the autonomy and robotics bets. 10X needs FSD to solve and robotaxi to scale. Main risk: FSD fails and it's just a car company.",
    summary: "Tesla, Inc. (TSLA) is a vertically integrated electric vehicle (EV) and clean energy company that designs, manufactures, and sells electric vehicles (Model S, 3...",
    product: "EVs, FSD software, Energy storage, Optimus.",
    feedback: "FSD v12 is a step change, but still requires supervision. Energy storage is quietly booming.",
    market: "Massive TAM for autonomy and energy, EV market growth slowing slightly.",
    lynchType: "stalwart",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "large",
    tenXPath: "possible",
    peopleVector: "Musk is distracted but the engineering bench is arguably the best in the world.",
    volatilityNote: "Would add heavily below $150.",
    bsChecklist: [
      "Is FSD actually getting better? Yes, end-to-end neural nets work.",
      "Are EV margins stable? Bottoming out.",
      "Is energy storage real? Yes, growing 100% YoY."
    ],
    pros: ["Data advantage for AI/FSD", "Energy storage exploding", "Manufacturing efficiency"],
    cons: ["Key man risk", "EV price wars", "FSD regulatory hurdles"],
    superiorCriteria: [
      "Unmatched data flywheel",
      "Vertical integration",
      "Brand power"
    ],
    financials: "EV margins compressed but stabilizing. Energy storage highly profitable. Massive cash pile.",
    catalysts: "Robotaxi unveil, FSD un-supervised, Optimus updates.",
    recommendation: "watch",
    positionSize: "core",
    verdict: "The best AI company disguised as a car company. Patience required for the autonomy bet.",
    thesis: [
      "Compute + data wins autonomy",
      "Tesla has 100x the data of Waymo",
      "Energy storage alone is worth the current market cap"
    ],
    risks: [
      "Musk leaves or is forced out",
      "FSD plateau",
      "Chinese EV competition"
    ],
    sourceNotes: "Track FSD miles driven and energy deployed (GWh).",
    updatedAt: "2026-03-16",
    series: [180, 175, 190, 210, 205, 230, 250, 240, 260, 275, 265, 290]
  },
  {
    ticker: "AVGO",
    name: "Broadcom Inc.",
    ceo: "Hock Tan",
    marketCap: "$600B",
    category: "Semiconductors & Software",
    story: "M&A machine feeding off custom silicon demand and VMWare integration. 10X needs AI networking to explode. Main risk: VMware integration stumbles.",
    summary: "Broadcom Inc. (AVGO) is a technology company that designs, develops, and supplies semiconductor and infrastructure software solutions for enterprise data center...",
    product: "Custom AI chips (TPUs), networking (Tomahawk), enterprise software (VMware).",
    feedback: "Customers hate the VMware price hikes but have nowhere else to go. Cloud providers love their custom silicon.",
    market: "AI networking and custom silicon are the fastest growing segments in semis.",
    lynchType: "stalwart",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "large",
    tenXPath: "weak",
    peopleVector: "Hock Tan is the best capital allocator in semiconductors.",
    volatilityNote: "Buy the dip on any macro weakness.",
    bsChecklist: [
      "Are they gaining AI share? Yes, custom silicon is booming.",
      "Is VMware accretive? Yes, margins are expanding rapidly.",
      "Is debt manageable? Yes, massive FCF covers it."
    ],
    pros: ["Dominant in AI networking", "VMware cash flow machine", "Incredible management"],
    cons: ["Customer concentration (Apple, Google)", "VMware customer churn risk", "High debt load"],
    superiorCriteria: [
      "Unmatched custom silicon IP",
      "Ruthless operational efficiency",
      "Sticky enterprise software"
    ],
    financials: "Incredible FCF generation, high dividend growth, expanding margins post-VMware.",
    catalysts: "Custom silicon design wins, VMware margin expansion, dividend hikes.",
    recommendation: "buy",
    positionSize: "core",
    verdict: "A compounding machine. Not a 10X from here, but a safe 15% CAGR.",
    thesis: [
      "AI requires massive networking bandwidth (Broadcom wins)",
      "Hyperscalers want custom chips over Nvidia GPUs (Broadcom wins)",
      "VMware pricing power is underappreciated"
    ],
    risks: [
      "Apple builds in-house wireless chips",
      "Nvidia ethernet (Spectrum-X) takes share",
      "Macro slowdown hits enterprise software"
    ],
    sourceNotes: "Track custom silicon revenue and VMware ARR.",
    updatedAt: "2026-03-16",
    series: [1000, 1050, 1100, 1150, 1120, 1200, 1250, 1300, 1280, 1350, 1400, 1450]
  },
  {
    ticker: "SNDK",
    name: "Sandisk Corporation",
    ceo: "Sanjay Mehrotra",
    marketCap: "$30B",
    category: "Memory & Storage",
    story: "Legacy memory player caught in the cyclical crossfire. Main risk: NAND pricing collapses again.",
    summary: "Sandisk Corp (SNDK) is a developer and manufacturer of solid-state storage solutions including NAND flash memory, SSDs, and embedded storage for enterprise data...",
    product: "NAND flash, SSDs, enterprise storage.",
    feedback: "Commodity product, bought on price and availability.",
    market: "Highly cyclical, currently in an upswing due to AI data storage needs.",
    lynchType: "cyclical",
    superiorCompany: "no",
    moat: "weak",
    capSize: "mid",
    tenXPath: "none",
    peopleVector: "Competent operators in a brutal commodity market.",
    volatilityNote: "Trade the cycle, don't hold forever.",
    bsChecklist: [
      "Is memory pricing recovering? Yes.",
      "Are capex cuts holding? Yes, discipline remains.",
      "Is AI driving storage demand? Marginally."
    ],
    pros: ["Cyclical upswing underway", "Consolidated industry (oligopoly)", "High operating leverage"],
    cons: ["Commodity product", "Capital intensive", "China competition"],
    superiorCriteria: [
      "Survivor in a consolidated industry"
    ],
    financials: "Swinging from massive losses to massive profits based on NAND pricing.",
    catalysts: "NAND spot price increases, enterprise SSD demand.",
    recommendation: "avoid",
    positionSize: "none",
    verdict: "A trade, not an investment. Play the cycle.",
    thesis: [
      "Memory cycle is turning positive",
      "AI datasets require massive SSD storage",
      "Industry consolidation prevents oversupply"
    ],
    risks: [
      "Macro recession kills PC/smartphone demand",
      "Competitors break capex discipline",
      "China floods the market with cheap NAND"
    ],
    sourceNotes: "Watch NAND spot prices closely.",
    updatedAt: "2026-03-16",
    series: [45, 42, 48, 55, 52, 60, 65, 70, 68, 75, 80, 78]
  },
  {
    ticker: "VRT",
    name: "Vertiv Holdings Co",
    ceo: "Giordano Albertazzi",
    marketCap: "$40B",
    category: "Data Center Infrastructure",
    story: "Selling the picks and shovels (power and cooling) for the AI gold rush. 10X needs liquid cooling to become standard. Main risk: valuation.",
    summary: "Vertiv Holdings Corp is the leading global provider of critical digital infrastructure—specifically power and thermal management systems—for data centers suppor...",
    product: "Thermal management (liquid cooling), power management for data centers.",
    feedback: "Data center operators desperately need their liquid cooling solutions for Nvidia Blackwell racks.",
    market: "AI datacenter capex is exploding, and power/cooling is the main bottleneck.",
    lynchType: "fast-grower",
    superiorCompany: "partial",
    moat: "medium",
    capSize: "large",
    tenXPath: "weak",
    peopleVector: "Strong execution under Albertazzi, fixing previous operational missteps.",
    volatilityNote: "Valuation is stretched, buy on 20%+ pullbacks.",
    bsChecklist: [
      "Is liquid cooling adoption real? Yes, mandatory for next-gen GPUs.",
      "Are margins improving? Yes, pricing power is strong.",
      "Is backlog growing? Yes, record levels."
    ],
    pros: ["Pure play on AI infrastructure", "Dominant market share in thermal", "Expanding margins"],
    cons: ["Priced for perfection", "Supply chain constraints", "Competition from Schneider/Eaton"],
    superiorCriteria: [
      "Mission-critical product (data centers melt without them)",
      "Oligopoly market structure",
      "Secular tailwind (AI capex)"
    ],
    financials: "Rapid top-line growth, expanding operating margins, strong FCF conversion.",
    catalysts: "Nvidia Blackwell deployments, liquid cooling attach rates.",
    recommendation: "watch",
    positionSize: "starter",
    verdict: "Great company, expensive stock. Wait for a datacenter capex scare to buy.",
    thesis: [
      "AI requires 3x the power density per rack",
      "Air cooling cannot physically cool next-gen GPUs",
      "Vertiv owns the liquid cooling transition"
    ],
    risks: [
      "Hyperscalers pause capex",
      "Valuation multiple compresses",
      "Execution issues scaling liquid cooling manufacturing"
    ],
    sourceNotes: "Track backlog growth and book-to-bill ratio.",
    updatedAt: "2026-03-14",
    series: [30, 35, 40, 55, 50, 65, 70, 85, 80, 95, 100, 110]
  },
  {
    ticker: "AAOI",
    name: "Applied Optoelectronics",
    ceo: "Chih-Hsiang (Thompson) Lin",
    marketCap: "$800M",
    category: "Optical Networking",
    story: "Turnaround play riding the 400G/800G datacenter upgrade cycle. Main risk: Customer concentration and brutal competition.",
    summary: "Applied Optoelectronics, Inc. (AAOI) is a provider of fiber-optic networking products, primarily serving internet datacenter, cable television, and telecommuni...",
    product: "Optical transceivers, lasers, and components.",
    feedback: "Microsoft is buying everything they can make, but cable TV business is dead.",
    market: "AI requires massive optical interconnects, booming market.",
    lynchType: "turnaround",
    superiorCompany: "no",
    moat: "weak",
    capSize: "small",
    tenXPath: "possible",
    peopleVector: "Founder-led, but history of over-promising and under-delivering.",
    volatilityNote: "Massive volatility. Use options or size very small.",
    bsChecklist: [
      "Is the Microsoft deal real? Yes, driving huge growth.",
      "Are margins fixing? Slowly.",
      "Is the balance sheet safe? No, debt is a concern."
    ],
    pros: ["Microsoft contract for 400G/800G", "Secular AI networking tailwind", "High operating leverage"],
    cons: ["History of terrible execution", "Extreme customer concentration", "Competition from Coherent/Innolight"],
    superiorCriteria: [
      "Vertical integration (they make their own lasers)"
    ],
    financials: "Burning cash, heavy debt, but revenue is inflecting upwards rapidly.",
    catalysts: "800G shipments scaling, Microsoft order expansions.",
    recommendation: "avoid",
    positionSize: "none",
    verdict: "Too risky. The optical cycle is brutal and they are a lower-tier player.",
    thesis: [
      "Microsoft needs a second source for transceivers",
      "AAOI vertical integration allows them to compete on price",
      "Operating leverage will drive sudden profitability"
    ],
    risks: [
      "Microsoft cancels orders",
      "Innolight crushes them on price",
      "Liquidity crisis"
    ],
    sourceNotes: "Watch gross margin progression and datacenter revenue.",
    updatedAt: "2026-03-14",
    series: [8, 7, 10, 15, 12, 18, 22, 20, 25, 24, 28, 26]
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    ceo: "Tim Cook",
    marketCap: "$3.2T",
    category: "Consumer Electronics",
    story: "The ultimate consumer monopoly pivoting to services and AI. 10X needs a new paradigm (Vision Pro/AI). Main risk: China and antitrust.",
    summary: "Apple Inc. (AAPL) designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various rel...",
    product: "iPhone, Mac, iPad, Services (App Store, iCloud), Apple Intelligence.",
    feedback: "Ecosystem lock-in is unbreakable. Consumers buy the new iPhone out of habit.",
    market: "Smartphone market is saturated, growth must come from services and emerging markets.",
    lynchType: "stalwart",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "large",
    tenXPath: "weak",
    peopleVector: "Tim Cook is the supply chain master. Innovation pace is slow but deliberate.",
    volatilityNote: "Buy whenever it drops 15% from highs.",
    bsChecklist: [
      "Is the ecosystem holding? Yes, churn is basically zero.",
      "Are services growing? Yes, double digits.",
      "Is AI a threat? No, Apple Intelligence secures the moat."
    ],
    pros: ["Unbreakable ecosystem", "Services gross margins", "Massive share buybacks"],
    cons: ["Hardware growth is zero", "China geopolitical risk", "DOJ antitrust lawsuit"],
    superiorCriteria: [
      "Best brand in the world",
      "Incredible cash generation",
      "Pricing power"
    ],
    financials: "Fortress balance sheet, massive FCF, consistent aggressive buybacks.",
    catalysts: "iPhone supercycle driven by Apple Intelligence, Services margin expansion.",
    recommendation: "buy",
    positionSize: "core",
    verdict: "Don't bet against Apple. It's a savings account that yields 10-15% a year.",
    thesis: [
      "Installed base of 2B+ active devices is a money printer",
      "Services revenue will eventually eclipse hardware profits",
      "AI features will drive a multi-year upgrade cycle"
    ],
    risks: [
      "DOJ forces App Store break up",
      "China bans iPhones for government/SOE employees",
      "Warren Buffett selling causes panic"
    ],
    sourceNotes: "Track active installed base and Services revenue growth.",
    updatedAt: "2026-03-13",
    series: [170, 175, 180, 178, 185, 190, 188, 195, 200, 205, 210, 215]
  },
  {
    ticker: "META",
    name: "Meta Platforms",
    ceo: "Mark Zuckerberg",
    marketCap: "$1.2T",
    category: "Social Media & AI",
    story: "Attention monopoly using AI to supercharge ad targeting and build the metaverse. 10X needs open-source AI to win. Main risk: TikTok and regulatory.",
    summary: "Meta Platforms, Inc. (META) engages in the development of products that enable people to connect and share with friends and family through mobile devices, per...",
    product: "Facebook, Instagram, WhatsApp, Llama, Reality Labs.",
    feedback: "Advertisers have no better ROI platform. Users complain but stay for Reels.",
    market: "Digital advertising is a duopoly (Meta/Google), AI is a new frontier.",
    lynchType: "stalwart",
    superiorCompany: "yes",
    moat: "strong",
    capSize: "large",
    tenXPath: "weak",
    peopleVector: "Zuckerberg is in his prime. Ruthless focus on efficiency and AI.",
    volatilityNote: "Extremely volatile for a mega-cap. Buy the deep dips.",
    bsChecklist: [
      "Is ad targeting fixed post-ATT? Yes, AI solved it.",
      "Are Reels monetizing? Yes, inflecting positively.",
      "Is Reality Labs burn manageable? Yes, core business funds it easily."
    ],
    pros: ["Best ad-tech in the world", "Llama open-source strategy", "Founder-led vision"],
    cons: ["Reality Labs burns $15B/yr", "TikTok competition", "Regulatory scrutiny"],
    superiorCriteria: [
      "Network effects of 3B+ users",
      "AI integration driving immediate ROI",
      "Founder control"
    ],
    financials: "Incredible operating margins post-'Year of Efficiency', massive FCF, newly initiated dividend.",
    catalysts: "Llama 4 release, WhatsApp monetization, Reality Labs loss moderation.",
    recommendation: "buy",
    positionSize: "core",
    verdict: "The most agile mega-cap. Zuckerberg's AI pivot was masterful.",
    thesis: [
      "AI makes their ad targeting significantly better than peers",
      "Open sourcing Llama commoditizes their competitors' models",
      "WhatsApp is an untapped multi-billion dollar revenue stream"
    ],
    risks: [
      "Zuckerberg spends $50B on the metaverse with zero return",
      "TikTok gains massive share in US",
      "FTC forces a breakup"
    ],
    sourceNotes: "Watch ad impressions and price per ad metrics.",
    updatedAt: "2026-03-13",
    series: [300, 320, 350, 400, 380, 420, 450, 480, 470, 500, 520, 510]
  }
];`;

const content = fs.readFileSync("src/constants.ts", "utf8");
const startIndex = content.indexOf("export const demoCompanies: Company[] = [");
const endIndex = content.indexOf("export function lynchLabel");

if (startIndex > -1 && endIndex > -1) {
  const newContent = content.substring(0, startIndex) + newCompanies + "\n\n" + content.substring(endIndex);
  fs.writeFileSync("src/constants.ts", newContent);
  console.log("Updated src/constants.ts");
} else {
  console.log("Could not find boundaries");
}
