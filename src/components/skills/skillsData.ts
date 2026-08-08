/**
 * Skills are described by the strongest evidence behind them, not by a subjective
 * percentage or out-of-ten score.
 *
 *   production  — used in a system real people depend on
 *   practical   — built or investigated with it hands-on
 *   working     — can work in it with support
 *   developing  — active study rather than delivered work
 *
 * Group names must match `skills.technical.skills[].title` in src/app/resources/content.js.
 */

export type EvidenceLevel = "production" | "practical" | "working" | "developing";

export const evidenceLevels: {
  id: EvidenceLevel;
  label: string;
  description: string;
  /** Chart fill. Verified against the forced dark theme page background (#0A0A0A). */
  color: string;
}[] = [
  {
    id: "production",
    label: "Production experience",
    description: "In a system real people depend on",
    color: "#56ECAD",
  },
  {
    id: "practical",
    label: "Practical experience",
    description: "Built or investigated with it hands-on",
    color: "#7DD3FC",
  },
  {
    id: "working",
    label: "Working knowledge",
    description: "Can work in it with support",
    color: "#FDBA74",
  },
  {
    id: "developing",
    label: "Currently developing",
    description: "Active study rather than delivered work",
    color: "#C4B5FD",
  },
];

export type SkillGroup = {
  title: string;
  skills: { name: string; level: EvidenceLevel }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Software Development",
    skills: [
      { name: "TypeScript", level: "production" },
      { name: "JavaScript", level: "production" },
      { name: "React", level: "production" },
      { name: "Next.js", level: "production" },
      { name: "Astro", level: "practical" },
      { name: "HTML", level: "production" },
      { name: "CSS", level: "production" },
      { name: "Tailwind CSS", level: "production" },
      { name: "Responsive design", level: "production" },
      { name: "Accessibility (WCAG)", level: "practical" },
      { name: "Progressive Web Apps", level: "production" },
      { name: "REST APIs", level: "production" },
      { name: "SQL", level: "production" },
      { name: "PostgreSQL", level: "production" },
      { name: "Supabase", level: "production" },
      { name: "Python", level: "production" },
      { name: "Git", level: "production" },
      { name: "GitHub", level: "production" },
      { name: "GitHub Actions", level: "production" },
      { name: "TanStack Query", level: "production" },
    ],
  },
  {
    title: "AI-Assisted Engineering",
    skills: [
      { name: "Claude Code", level: "production" },
      { name: "Cursor", level: "production" },
      { name: "Replit", level: "production" },
      { name: "Context engineering", level: "production" },
      { name: "CLAUDE.md project context", level: "production" },
      { name: "Agent-assisted development", level: "production" },
      { name: "AI-assisted debugging", level: "production" },
      { name: "Reviewing generated code", level: "production" },
      { name: "Verification & Definition of Done", level: "production" },
      { name: "Cross-tool context continuity", level: "production" },
      { name: "Reusable AI skills", level: "practical" },
      { name: "GitHub Copilot", level: "working" },
    ],
  },
  {
    title: "Data & Integrations",
    skills: [
      { name: "PostgreSQL", level: "production" },
      { name: "Supabase", level: "production" },
      { name: "Data modelling", level: "production" },
      { name: "Schema investigation", level: "production" },
      { name: "Data reconciliation & repair", level: "production" },
      { name: "Identity resolution", level: "production" },
      { name: "API integrations", level: "production" },
      { name: "Webhooks", level: "production" },
      { name: "Stripe integrations", level: "production" },
      { name: "Supabase Edge Functions (Deno)", level: "production" },
      { name: "Scheduled automation", level: "production" },
      { name: "Reporting & exports", level: "production" },
      { name: "ELT pipelines (Airbyte, dbt, Dagster)", level: "practical" },
    ],
  },
  {
    title: "Cyber Security",
    skills: [
      { name: "Authentication & access control", level: "production" },
      { name: "Row Level Security", level: "production" },
      { name: "Privacy & consent", level: "production" },
      { name: "Secure configuration", level: "production" },
      { name: "Security headers / CSP", level: "practical" },
      { name: "Secrets management", level: "production" },
      { name: "Identity & access management", level: "practical" },
      { name: "MFA", level: "practical" },
      { name: "Application-security review", level: "practical" },
      { name: "Microsoft Defender", level: "practical" },
      { name: "Microsoft Intune", level: "practical" },
      { name: "Microsoft Entra", level: "practical" },
      { name: "Endpoint security & device compliance", level: "practical" },
      { name: "Vulnerability management", level: "working" },
      { name: "Security baselines & patching", level: "working" },
      { name: "Encryption", level: "working" },
      { name: "Incident investigation", level: "working" },
      { name: "Network security fundamentals", level: "developing" },
      { name: "Linux security fundamentals", level: "developing" },
      { name: "Nmap & controlled security labs", level: "developing" },
    ],
  },
  {
    title: "Cloud, Systems & Deployment",
    skills: [
      { name: "Cloudflare", level: "practical" },
      { name: "Cloudflare Workers / Wrangler", level: "practical" },
      { name: "Vercel", level: "production" },
      { name: "Netlify", level: "production" },
      { name: "Automation", level: "production" },
      { name: "Production troubleshooting", level: "production" },
      { name: "Microsoft 365", level: "production" },
      { name: "Google Workspace", level: "production" },
      { name: "SaaS administration", level: "production" },
      { name: "Systems migration", level: "production" },
      { name: "DNS & TLS", level: "practical" },
      { name: "Windows endpoint management", level: "practical" },
      { name: "Docker", level: "practical" },
    ],
  },
  {
    title: "Ways of Working",
    skills: [
      { name: "Iterative delivery", level: "production" },
      { name: "Stakeholder collaboration", level: "production" },
      { name: "Requirements analysis", level: "production" },
      { name: "Technical documentation", level: "production" },
      { name: "Testing & verification", level: "production" },
      { name: "Continuous improvement", level: "production" },
      { name: "Agile", level: "production" },
      { name: "Scrum", level: "production" },
      { name: "Kanban", level: "practical" },
      { name: "SAFe", level: "practical" },
    ],
  },
];

/** Counts of skills per evidence level, per group — the shape the overview chart needs. */
export function skillCountsByLevel() {
  return skillGroups.map((group) => ({
    title: group.title,
    counts: evidenceLevels.map(
      (level) => group.skills.filter((skill) => skill.level === level.id).length,
    ),
  }));
}
