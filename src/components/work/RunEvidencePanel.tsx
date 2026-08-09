import { Column, Flex, Text } from "@/once-ui/components";
import styles from "./RunEvidencePanel.module.scss";

/**
 * Verified properties of the autonomous run described in
 * `.claude/context/agentic-run-evidence.md`. Every figure and claim here is
 * traceable to that document — don't add one that isn't.
 *
 * Server component, no client JS: the check glyph is inline SVG rather than the
 * Once UI `Icon` (a client component), so a case study stays zero-JS.
 */

const runFacts = [
  { value: "8 August 2026", label: "run date" },
  { value: "50 minutes", label: "continuous" },
  { value: "358", label: "agent turns" },
  { value: "230", label: "tool calls" },
];

const verified = [
  {
    claim: "Written definition of done",
    evidence:
      "Acceptance criteria and the factual boundaries the work had to stay inside were committed to the repository before implementation began.",
  },
  {
    claim: "No human implementation prompts during execution",
    evidence:
      "Fifty minutes from goal to final report. The input log, which records typed input only, holds no human keystrokes in between.",
  },
  {
    claim: "Parallel research agents",
    evidence:
      "Read-only agents mapped the stack, the routes and the component conventions concurrently, each returning findings rather than raw files.",
  },
  {
    claim: "Independent review agent",
    evidence:
      "A separate agent — read-only, without the implementing agent's context — checked the output against the source documents. The agent that wrote the content was not the agent that approved it.",
  },
  {
    claim: "Automated validation",
    evidence:
      "Lint, production build, route status and computed colour contrast inside the run; Playwright end-to-end and visual-regression suites across desktop and mobile over the same body of work.",
  },
  {
    claim: "Blockers preserved rather than bypassed",
    evidence:
      "Three criteria that needed unavailable access were left unchecked and documented, not ticked and not worked around.",
  },
  {
    claim: "Reviewer findings fed back before completion",
    evidence:
      "Twelve findings, two of them blockers, were applied before the run reported done — including a claim it had written itself that contradicted its own source material.",
  },
];

export function RunEvidencePanel() {
  return (
    <Column
      as="section"
      fillWidth
      background="surface"
      border="neutral-medium"
      radius="l"
      padding="l"
      gap="24"
      marginTop="24"
      marginBottom="32"
      aria-labelledby="run-evidence-heading"
    >
      <Column gap="12">
        <Text
          id="run-evidence-heading"
          as="h3"
          variant="label-default-s"
          onBackground="brand-medium"
          className={styles.eyebrow}
        >
          Real run evidence
        </Text>

        <Flex wrap vertical="center" className={styles.manifest}>
          {runFacts.map((fact) => (
            <Text key={fact.label} variant="body-default-s" onBackground="neutral-weak">
              <span className={styles.figure}>{fact.value}</span> {fact.label}
            </Text>
          ))}
          <Text variant="body-default-s" onBackground="neutral-weak">
            <span className={styles.zero}>0</span> human prompts during execution
          </Text>
        </Flex>
      </Column>

      <Column as="ul" fillWidth gap="16" className={styles.list}>
        {verified.map((item) => (
          <Flex as="li" key={item.claim} gap="12" className={styles.row}>
            <svg
              className={styles.check}
              viewBox="0 0 20 20"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4 10.5 8 14.5 16 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Column gap="4">
              <Text variant="body-strong-s" onBackground="neutral-strong">
                {item.claim}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.evidence}
              </Text>
            </Column>
          </Flex>
        ))}
      </Column>

      <Text variant="body-default-xs" onBackground="neutral-weak" className={styles.footnote}>
        Process and outcomes only. No client identities, no source code, no transcript internals.
      </Text>
    </Column>
  );
}

export default RunEvidencePanel;
