import React, { JSX } from "react";
import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  SmartLink,
  Tag,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import styles from '@/components/about/About.module.scss';
import { person, about, social } from "@/app/resources/content";

const TableOfContents = React.lazy(() => import("@/components/about/TableOfContents"));


export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
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

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.services.map((services) => services.title),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
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
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
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
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="m"
          >
            {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
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

          {about.intro.display && (
            <Column className="space-y-4" textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="s">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="s">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: JSX.Element, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <SmartImage
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Column maxWidth="m" gap="m" horizontal="center">
                <Heading
                  as="h2"
                  id={about.technical.title}
                  variant="display-strong-s"
                  marginBottom="s"
                >
                {about.technical.title}
                </Heading>
                <Column className="space-y-4" onBackground="neutral-weak" textVariant="body-default-m" fillWidth gap="s">                
                  {about.technical.description}
                </Column>
                  {about.technical.services.map((service, index) => (
                    <Column key={`${service.title}-${index}`} fillWidth gap="m" marginBottom="s">
                      <Text id={service.title} variant="heading-strong-l">
                        {service.title}
                      </Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {service.description}
                      </Text>
                      {Array.isArray(service.images) && service.images.length > 0 && (                       
                        <Flex gap="m" vertical="center">
                          {service.images.map((image, imgIndex) => {
                            if (!image.src) return null;  
                            return (                                  
                              <SmartImage
                                  key={`${image.title || 'image'}-${imgIndex}`}
                                  enlarge
                                  radius="m"
                                  src={image.src} // Access src from image
                                  alt={image.alt || 'Image'} // Access alt from image
                                  title={image.title || 'Image'} // Optional: Add title for hover effect
                                  priority={false}
                                  width={image.width}
                                  height={image.height}
                                />
                              );
                            })}
                          {/* Button Link */}
                          <SmartLink
                              href="https://www.evolves.com.au/ask-aunty/"
                              target="_blank"
                              rel="noopener noreferrer"
                              title={service.images[0]?.title} // Show title on hover
                          >
                          <Button
                              variant="primary"
                              size="m"
                          >
                            Ask Aunty
                        </Button>
                      </SmartLink>
                      </Flex>
                      )}
                      {/* Display Video - Only if videos[] exists */}
                      {Array.isArray(service.videos) && service.videos.length > 0 && (
                        <>
                          {/* Warning for Aboriginal and Torres Strait Islander viewers */}
                          <Text variant="heading-default-s" onBackground="danger-strong" marginBottom="s" align="center">
                            ⚠️ Aboriginal and Torres Strait Islander viewers are advised that this video may
                            contain images, voices, and names of deceased persons.
                          </Text>

                          {service.videos.map((video, vidIndex) => (
                            <iframe
                              key={`${video.title || 'video'}-${vidIndex}`}
                              width="100%"
                              height="315"
                              src={video.embedUrl}
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                              allowFullScreen
                              style={{
                                border: "none",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                              }}
                              title={video.title || "Embedded Video"}
                            ></iframe>
                          ))}
                        </>
                      )}
                    </Column>
                  ))}
                
              </Column>
            </>
          )}                           

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m" marginTop="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}

              </Column>
            </>
          )}

        </Column>
      </Flex>
    </Column>
  );
}
