const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

export function normalizeName(name) {
  if (typeof name !== "string") return "";
  return name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/(^|[\s\-'])([a-z\u00c0-\u024f])/g, (_, sep, ch) => sep + ch.toUpperCase());
}

export function normalizePhone(phone) {
  if (typeof phone !== "string") return "";
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "";
  return (hasPlus ? "+" : "") + digits;
}

export function normalizeWebsite(site) {
  if (typeof site !== "string") return "";
  let s = site.trim().toLowerCase();
  if (!s) return "";
  s = s.replace(/^https?:\/\//, "").replace(/^www\./, "");
  s = s.split(/[/?#]/)[0];
  return /^[a-z0-9.-]+\.[a-z]{2,}$/.test(s) ? s : "";
}

export function cleanLeads(leads) {
  const seen = new Set();
  const cleaned = [];
  const stats = { input: leads.length, kept: 0, invalid_email: 0, duplicates: 0 };

  for (const lead of leads) {
    const email = typeof lead.email === "string" ? lead.email.trim().toLowerCase() : "";
    if (!isValidEmail(email)) {
      stats.invalid_email++;
      continue;
    }
    if (seen.has(email)) {
      stats.duplicates++;
      continue;
    }
    seen.add(email);
    cleaned.push({
      name: normalizeName(lead.name),
      email,
      phone: normalizePhone(lead.phone),
      company: typeof lead.company === "string" ? lead.company.trim().replace(/\s+/g, " ") : "",
      website: normalizeWebsite(lead.website),
    });
  }
  stats.kept = cleaned.length;
  return { cleaned, stats };
}
