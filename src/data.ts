export interface CompanyData {
  id: string;
  ticker: string;
  name: string;
  date: string;
  documentCount: number;
  description: string;
}

export const companies: CompanyData[] = [
  {
    id: "nebius",
    ticker: "NBIS",
    name: "Nebius Group N.V.",
    date: "2026-03-17",
    documentCount: 3,
    description: "Nebius Group N.V. (NBIS) is a Netherlands-based technology company with historical operations in e-commerce and classifieds markets. The company filed for Chapt...",
  },
  {
    id: "ouster",
    ticker: "OUST",
    name: "Ouster, Inc.",
    date: "2026-03-17",
    documentCount: 3,
    description: "Ouster, Inc. (OUST) is a lidar sensor manufacturer developing solid-state lidar technology for automotive, robotics, and industrial applications. The company de...",
  },
  {
    id: "tesla",
    ticker: "TSLA",
    name: "Tesla, Inc.",
    date: "2026-03-16",
    documentCount: 3,
    description: "Tesla, Inc. (TSLA) is a vertically integrated electric vehicle (EV) and clean energy company that designs, manufactures, and sells electric vehicles (Model S, 3...",
  },
  {
    id: "broadcom",
    ticker: "AVGO",
    name: "Broadcom Inc.",
    date: "2026-03-16",
    documentCount: 3,
    description: "Broadcom Inc. (AVGO) is a technology company that designs, develops, and supplies semiconductor and infrastructure software solutions for enterprise data center...",
  },
  {
    id: "sandisk",
    ticker: "SNDK",
    name: "Sandisk Corporation",
    date: "2026-03-16",
    documentCount: 3,
    description: "Sandisk Corp (SNDK) is a developer and manufacturer of solid-state storage solutions including NAND flash memory, SSDs, and embedded storage for enterprise data...",
  },
  {
    id: "vertiv",
    ticker: "VRT",
    name: "Vertiv Holdings Co",
    date: "2026-03-14",
    documentCount: 3,
    description: "Vertiv Holdings Corp is the leading global provider of critical digital infrastructure—specifically power and thermal management systems—for data centers suppor...",
  },
  {
    id: "aoi",
    ticker: "AAOI",
    name: "Applied Optoelectronics",
    date: "2026-03-14",
    documentCount: 3,
    description: "Applied Optoelectronics, Inc. (AAOI) is a provider of fiber-optic networking products, primarily serving internet datacenter, cable television, and telecommuni...",
  },
  {
    id: "apple",
    ticker: "AAPL",
    name: "Apple Inc.",
    date: "2026-03-13",
    documentCount: 3,
    description: "Apple Inc. (AAPL) designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various rel...",
  },
  {
    id: "meta",
    ticker: "META",
    name: "Meta Platforms",
    date: "2026-03-13",
    documentCount: 3,
    description: "Meta Platforms, Inc. (META) engages in the development of products that enable people to connect and share with friends and family through mobile devices, per...",
  }
];
