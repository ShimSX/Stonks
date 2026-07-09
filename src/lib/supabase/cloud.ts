import type { Company } from "../../types";
import { getSupabase } from "./client";

function normalizeCompany(c: Company): Company {
  return {
    ...c,
    storyUpdates: c.storyUpdates ?? [],
    domain: c.domain ?? "",
  };
}

/** Ensure the signed-in user has exactly one hub; return its id. */
export async function ensureHub(userId: string): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const { data: existing, error: readError } = await supabase
    .from("hubs")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (readError) throw readError;
  if (existing?.id) return existing.id as string;

  const { data: created, error: createError } = await supabase
    .from("hubs")
    .insert({ user_id: userId, name: "My Research Hub" })
    .select("id")
    .single();

  if (createError) throw createError;
  return created.id as string;
}

export async function loadCloudCompanies(hubId: string): Promise<Company[]> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const { data, error } = await supabase
    .from("companies")
    .select("ticker, payload, updated_at")
    .eq("hub_id", hubId)
    .order("ticker");

  if (error) throw error;

  return (data ?? []).map((row) => {
    const payload = (row.payload ?? {}) as Company;
    return normalizeCompany({
      ...payload,
      ticker: row.ticker || payload.ticker,
      updatedAt: row.updated_at || payload.updatedAt || new Date().toISOString().slice(0, 10),
    });
  });
}

export async function upsertCloudCompany(hubId: string, company: Company): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const ticker = company.ticker.trim().toUpperCase();
  const { error } = await supabase.from("companies").upsert(
    {
      hub_id: hubId,
      ticker,
      payload: { ...company, ticker },
      updated_at: company.updatedAt || new Date().toISOString().slice(0, 10),
    },
    { onConflict: "hub_id,ticker" },
  );

  if (error) throw error;
}

export async function deleteCloudCompany(hubId: string, ticker: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("hub_id", hubId)
    .eq("ticker", ticker.trim().toUpperCase());

  if (error) throw error;
}

export async function replaceCloudCompanies(hubId: string, companies: Company[]): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const { error: delError } = await supabase.from("companies").delete().eq("hub_id", hubId);
  if (delError) throw delError;

  if (!companies.length) return;

  const rows = companies.map((company) => {
    const ticker = company.ticker.trim().toUpperCase();
    return {
      hub_id: hubId,
      ticker,
      payload: { ...company, ticker },
      updated_at: company.updatedAt || new Date().toISOString().slice(0, 10),
    };
  });

  const { error: insError } = await supabase.from("companies").insert(rows);
  if (insError) throw insError;
}
