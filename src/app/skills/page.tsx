import React from "react";
import dynamic from "next/dynamic";
import { Avatar, Button, Column, Flex, Heading, Icon, Tag, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { skills, social, person, about } from "@/app/resources/content";
import { SkillGroupList } from "@/components/skills/SkillGroupList";
import styles from "@/components/skills/Skills.module.scss";

const OverviewSkillsChart = dynamic(() => import("@/components/skills/OverviewSkillsChart"));
const TableOfContents = React.lazy(() => import("@/components/about/TableOfContents"));

export async function generateMetadata() {
  const title = skills.title;
  const description = skills.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(skills.ogTitle)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/skills`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Skills() {
  const structure = [
    {
      title: skills.intro.title,
      display: skills.intro.display,
      items: [],
    },
    {
      title: skills.certifications.title,
      display: skills.certifications.display,
      items: [],
    },
    {
      title: skills.technical.title,
      display: skills.technical.display,
      items: skills.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: skills.description,
            url: `https://${baseURL}/skills`,
            image: `https://${baseURL}${person.avatar}`,
          }),
        }}
      />
      {skills.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} skills={skills} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={skills.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="m"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap>
                {social.map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="secondary"
                      />
                    ),
                )}
              </Flex>
            )}
          </Column>

          {skills.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
              {skills.intro.description}
            </Column>
          )}

          {skills.certifications.display && (
            <Column fillWidth gap="m" marginBottom="40">
              <Heading as="h2" id={skills.certifications.title} variant="display-strong-s">
                {skills.certifications.title}
              </Heading>
              <Text onBackground="neutral-weak" variant="body-default-m">
                {skills.certifications.description}
              </Text>
              <Column as="ul" fillWidth gap="12" style={{ listStyle: "none", padding: 0 }}>
                {skills.certifications.items.map((item) => (
                  <Flex as="li" key={item.title} direction="column" gap="4">
                    <Text variant="body-strong-m">{item.title}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {item.issuer} · {item.year}
                    </Text>
                  </Flex>
                ))}
              </Column>
            </Column>
          )}

          {skills.technical.display && (
            <Column fillWidth gap="m">
              <Heading as="h2" id={skills.technical.title} variant="display-strong-s">
                {skills.technical.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" marginBottom="s">
                {skills.technical.description}
              </Text>

              <OverviewSkillsChart />

              {skills.technical.skills.map((skill) => (
                <Column key={skill.title} fillWidth gap="8">
                  <Heading as="h3" id={skill.title} variant="heading-strong-l">
                    {skill.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak" marginBottom="s">
                    {skill.description}
                  </Text>
                  <SkillGroupList group={skill.title} />
                </Column>
              ))}
            </Column>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
