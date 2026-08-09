import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import type React from "react";
import type { ReactNode } from "react";

import { SmartLink, Text } from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules";
import { HeadingLink } from "@/components";
import { RunEvidencePanel } from "@/components/work/RunEvidencePanel";

import type { TextProps } from "@/once-ui/interfaces";

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

function Table({ data }: TableProps) {
  // Static MDX tables: position is the only stable identity a cell has.
  // biome-ignore lint/suspicious/noArrayIndexKey: table cells are positional and never reordered
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: table rows are positional and never reordered
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: table cells are positional and never reordered
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src }: { alt?: string; src: string }) {
  if (!src) {
    console.error("An image in MDX is missing a 'src'.");
    return null;
  }

  // Images inside a case study are usually diagrams or captures that are taller than
  // wide, and they have to stay readable. SmartImage would crop them into a fixed 16:9
  // frame, so render at natural height instead: width/height 0 plus `sizes` is the
  // documented next/image pattern for images whose intrinsic size isn't known here.
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={0}
      height={0}
      sizes="(max-width: 960px) 100vw, 960px"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "var(--radius-m)",
        border: "1px solid var(--neutral-alpha-weak)",
        marginTop: "var(--static-space-24)",
        marginBottom: "var(--static-space-24)",
      }}
    />
  );
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const CustomHeading = ({ children, ...props }: TextProps) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink
        style={{ marginTop: "var(--static-space-24)", marginBottom: "var(--static-space-12)" }}
        level={level}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading(1) as any,
  h2: createHeading(2) as any,
  h3: createHeading(3) as any,
  h4: createHeading(4) as any,
  h5: createHeading(5) as any,
  h6: createHeading(6) as any,
  img: createImage as any,
  a: CustomLink as any,
  Table,
  CodeBlock,
  RunEvidencePanel,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    // @ts-ignore: Suppressing type error for MDXRemote usage
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
