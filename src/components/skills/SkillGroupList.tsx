import { Column, Flex, Tag, Text } from "@/once-ui/components";
import { evidenceLevels, skillGroups } from "./skillsData";

interface SkillGroupListProps {
  /** Must match a group title in skillsData.ts */
  group: string;
}

/**
 * Skills in one group, ordered by evidence level, with the level named rather
 * than expressed as a score. Server component — no client JS.
 */
export function SkillGroupList({ group }: SkillGroupListProps) {
  const skills = skillGroups.find((entry) => entry.title === group)?.skills ?? [];

  if (skills.length === 0) {
    return null;
  }

  return (
    <Column fillWidth gap="16" marginBottom="24">
      {evidenceLevels.map((level) => {
        const matching = skills.filter((skill) => skill.level === level.id);

        if (matching.length === 0) {
          return null;
        }

        return (
          <Column key={level.id} fillWidth gap="8">
            <Text variant="label-default-s" onBackground="neutral-weak">
              {level.label} — {level.description}
            </Text>
            <Flex as="ul" wrap gap="8" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {matching.map((skill) => (
                <Tag
                  as="li"
                  key={skill.name}
                  size="m"
                  variant={level.id === "production" ? "brand" : "neutral"}
                >
                  {skill.name}
                </Tag>
              ))}
            </Flex>
          </Column>
        );
      })}
    </Column>
  );
}

export default SkillGroupList;
