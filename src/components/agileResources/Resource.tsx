"use client";

import { Column, Flex, Heading, SmartImage, SmartLink, Tag, Text } from "@/once-ui/components";
import styles from "./Resources.module.scss";
import { formatDate } from "@/app/utils/formatDate";

interface ResourceProps {
  resource: any;
  thumbnail: boolean;
}

export default function Resource({ resource, thumbnail }: ResourceProps) {
  const isScrumMasterPoster = resource.metadata.title === "What is a Scrum Master?";

  return (
    <SmartLink
      fillWidth
      className={styles.hover}
      unstyled
      key={resource.slug}
      href={`/agile/${resource.slug}`}
    >
      <Flex
        position="relative"
        mobileDirection="column"
        fillWidth
        paddingY="12"
        paddingX="16"
        gap="32"
      >
        {isScrumMasterPoster ? (
          <SmartImage
          enlarge
          height={0.2}
          priority={false}
          aspectRatio="2 / 3"
          objectFit="contain"
          radius="m"
          alt="ScrumMasterPoster"
          src="/images/skills/ScrumMasterPoster.webp"
        />
        ) : (
        resource.metadata.image && thumbnail && (
          <SmartImage
            priority={false}
            maxWidth={20}
            className={styles.image}
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={resource.metadata.image}
            alt={"Thumbnail of " + resource.metadata.title}
            aspectRatio="16 / 9"
          />
        )
        )}
        <Column position="relative" fillWidth gap="8" vertical="center">
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {resource.metadata.title}
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            {formatDate(resource.metadata.publishedAt, false)}
          </Text>
          {resource.metadata.tag && (
            <Tag className="mt-8" label={resource.metadata.tag} variant="neutral" />
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}
