import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Flex, Heading, SmartImage, Text, SmartLink } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

type Params = Promise<{ slug: string }>

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = getPosts(["src", "app", "work", "projects"]);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getPosts(["src", "app", "work", "projects"]).find(
    (project) => project.slug === slug
  );

  if (!project) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
    linkGithubFrontend,
    linkGithubBackend,
    linkLive,
  } = project.metadata;
  
  const ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    images,
    team,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/work/${project.slug}`,
      images: [
        {
          url: ogImage,
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

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getPosts(["src", "app", "work", "projects"]).find(
    (project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const { linkGithubFrontend, linkGithubBackend, linkLive, team } = project.metadata;

  const avatars =
  project.metadata.team?.map((person) => ({
    src: person.avatar,
  })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: project.metadata.title,
            datePublished: project.metadata.publishedAt,
            dateModified: project.metadata.publishedAt,
            description: project.metadata.summary,
            image: project.metadata.image
              ? `https://${baseURL}${project.metadata.image}`
              : `https://${baseURL}/og?title=${project.metadata.title}`,
            url: `https://${baseURL}/work/${project.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
    <Column maxWidth="xs" gap="16">
        <Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>
        <Heading variant="display-strong-s">{project.metadata.title}</Heading>
      </Column>
      {project.metadata.images.length > 0 && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={project.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {project.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formatDate(project.metadata.publishedAt)}
          </Text>
        </Flex>
      <CustomMDX source={project.content} />
      <Flex gap="16" wrap>
        {linkGithubFrontend && (
          <SmartLink
            href={linkGithubFrontend}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px" }}
          >
            View Frontend Code
          </SmartLink>
        )}
        {linkGithubBackend && (
          <SmartLink
            href={linkGithubBackend}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px" }}
          >
            View Backend Code
          </SmartLink>
        )}
        {linkLive && (
          <SmartLink
            href={linkLive}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", borderRadius: "5px" }}
          >
            View Project
          </SmartLink>
        )}
      </Flex>
      <ScrollToHash />
    </Column>
    </Column>
  );
}