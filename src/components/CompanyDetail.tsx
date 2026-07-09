import { useState } from "react";
import type { Company } from "../types";
import { StonkSheet } from "./StonkSheet";
import { CompanyForm } from "./CompanyForm";
import {
  companyToMarkdown,
  copyMarkdown,
  downloadMarkdown,
  recLabel,
} from "../data/stonk-framework";
import { lynchLabel } from "../constants";
import { CompanyLogo } from "./CompanyLogo";

interface Props {
  company: Company;
  onClose: () => void;
  onSave: (company: Company) => void;
  onDelete: (ticker: string) => void;
  onAddUpdate: (note: string) => void;
  onToast: (message: string) => void;
}

type DetailTab = "story" | "edit";

export function CompanyDetail({
  company,
  onClose,
  onSave,
  onDelete,
  onAddUpdate,
  onToast,
}: Props) {
  const [tab, setTab] = useState<DetailTab>("story");

  async function handleCopyMd() {
    const md = companyToMarkdown(company);
    await copyMarkdown(md);
    onToast("Stonk.MD copied to clipboard");
  }

  function handleDownloadMd() {
    downloadMarkdown(`${company.ticker}-stonk.md`, companyToMarkdown(company));
    onToast("Markdown downloaded");
  }

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label={`${company.ticker} research`}>
        <div className="drawer-header">
          <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                border: "1px solid var(--border)",
                display: "grid",
                placeItems: "center",
                background: "var(--bg)",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <CompanyLogo company={company} size={36} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2>
                {company.ticker}{" "}
                <span style={{ fontWeight: 500, color: "var(--text-muted)", fontSize: 14 }}>
                  {company.name}
                </span>
              </h2>
              <div className="sub">
                {lynchLabel(company.lynchType)}
                {company.recommendation ? ` · ${recLabel(company.recommendation)}` : ""}
              </div>
            </div>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="drawer-tabs">
          <button
            type="button"
            className={`drawer-tab ${tab === "story" ? "active" : ""}`}
            onClick={() => setTab("story")}
          >
            Story sheet
          </button>
          <button
            type="button"
            className={`drawer-tab ${tab === "edit" ? "active" : ""}`}
            onClick={() => setTab("edit")}
          >
            Edit
          </button>
        </div>

        <div className="drawer-body">
          {tab === "story" ? (
            <StonkSheet company={company} onAddUpdate={onAddUpdate} />
          ) : (
            <CompanyForm
              company={company}
              onSave={(c) => {
                onSave(c);
                setTab("story");
                onToast(`${c.ticker} saved`);
              }}
              onDelete={(ticker) => {
                onDelete(ticker);
                onClose();
              }}
              onCancel={() => setTab("story")}
            />
          )}
        </div>

        <div className="drawer-actions">
          <button className="btn secondary sm" type="button" onClick={handleCopyMd}>
            Copy Stonk.MD
          </button>
          <button className="btn secondary sm" type="button" onClick={handleDownloadMd}>
            Download MD
          </button>
          <button className="btn secondary sm" type="button" onClick={() => setTab("edit")}>
            Edit sheet
          </button>
        </div>
      </aside>
    </>
  );
}
