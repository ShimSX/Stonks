import { useEffect, useMemo, useState } from "react";
import type { Company } from "../types";
import { lookupTicker } from "../utils/tickers";

interface Props {
  company: Company;
  size?: number;
}

function logoSources(domain: string): string[] {
  const host = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!host) return [];
  return [
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${encodeURIComponent(host)}.ico`,
  ];
}

/** Google/DuckDuckGo icons — Clearbit's public logo API is gone. */
export function CompanyLogo({ company, size = 56 }: Props) {
  const domain = company.domain?.trim() || lookupTicker(company.ticker)?.domain || "";
  const sources = useMemo(() => logoSources(domain), [domain]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [company.ticker, domain]);

  const src = sources[index];
  if (!src) {
    return (
      <div className="logo-fallback" style={{ fontSize: Math.max(9, size * 0.36) }}>
        {company.ticker.slice(0, 4)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      style={{ maxHeight: size, maxWidth: size * 2.4, objectFit: "contain" }}
      onError={() => setIndex((current) => current + 1)}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}
