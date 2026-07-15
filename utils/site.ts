// Central site configuration — links, contact, navigation.
export const siteConfig = {
  name: 'LoSec',
  legalName: 'LoSec',
  tagline: 'AI Security Research Lab',
  domain: 'losec.io',
  url: 'https://losec.io',
  email: 'hi@losec.io',
  businessEmail: 'business@losec.io',
  socials: {
    x: 'https://x.com/Losec_io',
    xHandle: '@Losec_io',
    github: 'https://github.com/Losec-io',
    githubHandle: 'Losec-io',
  },
}

export const navLinks = [
  { label: 'Disclosures', to: '/#disclosures' },
  { label: 'Research', to: '/#research' },
  { label: 'Blog', to: '/blog' },
  { label: 'Members', to: '/member' },
  { label: 'Contact', to: '/contact' },
]

// Live "targets" ticker under the hero.
export const targets = [
  'Chrome', 'Linux kernel', 'V8', 'CPython', 'OpenSSL', 'nginx', 'containerd',
  'PostgreSQL', 'Kubernetes', 'gRPC', 'Envoy', 'WebKit', 'systemd', 'Redis',
]

// Severity ramp → literal Tailwind classes (kept as full strings so the
// content scanner picks them up).
export const severityMeta: Record<
  string,
  { label: string; text: string; dot: string; border: string; soft: string }
> = {
  Critical: { label: 'CRITICAL', text: 'text-critical', dot: 'bg-critical', border: 'border-critical/40', soft: 'bg-critical/10' },
  High: { label: 'HIGH', text: 'text-high', dot: 'bg-high', border: 'border-high/40', soft: 'bg-high/10' },
  Medium: { label: 'MEDIUM', text: 'text-medium', dot: 'bg-medium', border: 'border-medium/40', soft: 'bg-medium/10' },
  Low: { label: 'LOW', text: 'text-acid', dot: 'bg-acid', border: 'border-acid/40', soft: 'bg-acid/10' },
}

export function severity(sev: string) {
  return severityMeta[sev] ?? severityMeta.Low
}

// Disclosure status → color treatment.
export const statusMeta: Record<string, { text: string; dot: string }> = {
  Patched: { text: 'text-success', dot: 'bg-success' },
  Disclosed: { text: 'text-info', dot: 'bg-info' },
  Coordinated: { text: 'text-ember', dot: 'bg-ember' },
  'Under Embargo': { text: 'text-muted', dot: 'bg-muted' },
}

export function status(s: string) {
  return statusMeta[s] ?? statusMeta.Disclosed
}

export function formatDate(iso: string) {
  // tolerate embargo strings like "2026-09-15 (embargoed)"
  const clean = iso.split(' ')[0]
  const d = new Date(clean)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
}
