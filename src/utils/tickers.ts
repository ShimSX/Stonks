import { demoCompanies } from "../constants";

const extras: Record<string, { name: string; domain: string }> = {
  AAPL: { name: "Apple Inc.", domain: "apple.com" },
  MSFT: { name: "Microsoft Corporation", domain: "microsoft.com" },
  NVDA: { name: "NVIDIA Corporation", domain: "nvidia.com" },
  AMZN: { name: "Amazon.com, Inc.", domain: "amazon.com" },
  GOOGL: { name: "Alphabet Inc.", domain: "abc.xyz" },
  GOOG: { name: "Alphabet Inc.", domain: "abc.xyz" },
  META: { name: "Meta Platforms, Inc.", domain: "meta.com" },
  "BRK.B": { name: "Berkshire Hathaway Inc.", domain: "berkshirehathaway.com" },
  "BRK.A": { name: "Berkshire Hathaway Inc.", domain: "berkshirehathaway.com" },
  JPM: { name: "JPMorgan Chase & Co.", domain: "jpmorganchase.com" },
  V: { name: "Visa Inc.", domain: "visa.com" },
  MA: { name: "Mastercard Incorporated", domain: "mastercard.com" },
  UNH: { name: "UnitedHealth Group Incorporated", domain: "unitedhealthgroup.com" },
  XOM: { name: "Exxon Mobil Corporation", domain: "exxonmobil.com" },
  JNJ: { name: "Johnson & Johnson", domain: "jnj.com" },
  WMT: { name: "Walmart Inc.", domain: "walmart.com" },
  PG: { name: "The Procter & Gamble Company", domain: "pg.com" },
  AVGO: { name: "Broadcom Inc.", domain: "broadcom.com" },
  ORCL: { name: "Oracle Corporation", domain: "oracle.com" },
  COST: { name: "Costco Wholesale Corporation", domain: "costco.com" },
  HD: { name: "The Home Depot, Inc.", domain: "homedepot.com" },
  NFLX: { name: "Netflix, Inc.", domain: "netflix.com" },
  AMD: { name: "Advanced Micro Devices, Inc.", domain: "amd.com" },
  INTC: { name: "Intel Corporation", domain: "intel.com" },
  TSM: { name: "Taiwan Semiconductor Manufacturing", domain: "tsmc.com" },
  ASML: { name: "ASML Holding N.V.", domain: "asml.com" },
  CRM: { name: "Salesforce, Inc.", domain: "salesforce.com" },
  ADBE: { name: "Adobe Inc.", domain: "adobe.com" },
  NOW: { name: "ServiceNow, Inc.", domain: "servicenow.com" },
  SHOP: { name: "Shopify Inc.", domain: "shopify.com" },
  SNOW: { name: "Snowflake Inc.", domain: "snowflake.com" },
  PLTR: { name: "Palantir Technologies Inc.", domain: "palantir.com" },
  DIS: { name: "The Walt Disney Company", domain: "thewaltdisneycompany.com" },
  BA: { name: "The Boeing Company", domain: "boeing.com" },
  CAT: { name: "Caterpillar Inc.", domain: "caterpillar.com" },
  GS: { name: "The Goldman Sachs Group, Inc.", domain: "goldmansachs.com" },
  QCOM: { name: "QUALCOMM Incorporated", domain: "qualcomm.com" },
  AMAT: { name: "Applied Materials, Inc.", domain: "appliedmaterials.com" },
  LRCX: { name: "Lam Research Corporation", domain: "lamresearch.com" },
  KLAC: { name: "KLA Corporation", domain: "kla.com" },
};

export function lookupTicker(ticker: string): { name: string; domain: string } | null {
  const key = ticker.trim().toUpperCase();
  if (!key) return null;
  const demo = demoCompanies.find((company) => company.ticker === key);
  if (demo) return { name: demo.name, domain: demo.domain };
  return extras[key] ?? null;
}
