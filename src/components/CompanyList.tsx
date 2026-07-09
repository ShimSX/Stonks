import { useState } from "react";
import type { Company } from "../types";
import { CompanyCard } from "./CompanyCard";

interface CompanyListProps {
  companies: Company[];
  selected: string | null;
  compareTickers: string[];
  onSelect: (ticker: string) => void;
  onOpenChart: (ticker: string) => void;
  onToggleCompare: (ticker: string) => void;
  onExportMarkdown: (company: Company) => void;
}

export function CompanyList({
  companies,
  selected,
  compareTickers,
  onSelect,
  onOpenChart,
  onToggleCompare,
  onExportMarkdown,
}: CompanyListProps) {
  const [expanded, setExpanded] = useState<string | null>(selected);

  if (!companies.length) {
    return <div className="empty">No companies match that search.</div>;
  }

  return (
    <div className="companies">
      {companies.map((company) => (
        <CompanyCard
          key={company.ticker}
          company={company}
          selected={company.ticker === selected}
          expanded={expanded === company.ticker}
          compareSelected={compareTickers.includes(company.ticker)}
          onSelect={() => {
            onSelect(company.ticker);
            setExpanded(company.ticker);
          }}
          onToggleExpand={() =>
            setExpanded((current) => (current === company.ticker ? null : company.ticker))
          }
          onOpenChart={() => onOpenChart(company.ticker)}
          onToggleCompare={() => onToggleCompare(company.ticker)}
          onExportMarkdown={() => onExportMarkdown(company)}
        />
      ))}
    </div>
  );
}
