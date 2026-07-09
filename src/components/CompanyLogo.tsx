import { useState } from "react";
import type { Company } from "../types";

interface Props {
  company: Company;
  size?: number;
}

/** Prefer Clearbit-style logo URL from domain; fall back to monogram. */
export function CompanyLogo({ company, size = 56 }: Props) {
  const [failed, setFailed] = useState(false);
  const domain = company.domain?.trim();

  if (domain && !failed) {
    return (
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt=""
        width={size}
        height={size}
        style={{ maxHeight: size, maxWidth: size * 2.4, objectFit: "contain" }}
        onError={() => setFailed(true)}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  }

  return <div className="logo-fallback">{company.ticker.slice(0, 4)}</div>;
}
