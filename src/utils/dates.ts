/** Activity older than this is treated as a quiet/stale story. */
export const STALE_DAYS = 45;

function parseDate(value: string): Date | null {
  if (!value) return null;
  const iso = value.length === 10 ? `${value}T12:00:00` : value;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function daysSince(value: string, now = new Date()): number | null {
  const date = parseDate(value);
  if (!date) return null;
  return Math.floor((now.getTime() - date.getTime()) / 86_400_000);
}

export function formatRelativeDate(value: string, now = new Date()): string {
  const days = daysSince(value, now);
  if (days == null) return value || "";
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 14) return `${days}d ago`;
  if (days < 60) return `${Math.round(days / 7)}w ago`;
  return value;
}

export function latestActivityDate(company: {
  updatedAt: string;
  storyUpdates?: { date: string }[];
}): string {
  const dates = [company.updatedAt, ...(company.storyUpdates ?? []).map((item) => item.date)].filter(
    Boolean,
  );
  return dates.sort().at(-1) ?? company.updatedAt;
}

export function isStale(
  company: { updatedAt: string; storyUpdates?: { date: string }[] },
  threshold = STALE_DAYS,
): boolean {
  const days = daysSince(latestActivityDate(company));
  return days != null && days >= threshold;
}
