import type { Company } from "../types";

interface MarketCapSheetProps {
  companies: Company[];
}

export function MarketCapSheet({ companies }: MarketCapSheetProps) {
  return (
    <section>
      <h2 className="section-label">Market Cap Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Company</th>
            <th>Cap</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.ticker}>
              <td>
                <strong>{company.ticker}</strong>
              </td>
              <td>{company.name}</td>
              <td>{company.marketCap || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
