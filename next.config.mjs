import mdx from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // `getPosts()` resolves MDX through `process.cwd()`, which makes Next trace the whole
  // project into every serverless function. Pinning the root keeps the trace scoped to
  // this repo (and silences the "inferred workspace root" warning from the parent
  // directory's lockfile).
  outputFileTracingRoot: import.meta.dirname,

  // Static assets under `public/` are served directly by Vercel; they do not need to be
  // copied into each function bundle. Without this, ~19 MB of project screenshots ships
  // inside every function. Only `public/fonts/Inter.ttf` and `public/images/GinaHeadShot-og.jpg`
  // are read at runtime (by `/og`), so those stay traced.
  outputFileTracingExcludes: {
    "*": [
      "public/pdf/**",
      "public/images/projects/**",
      "public/images/about/**",
      "public/images/skills/**",
      "public/images/GinaHeadShot.webp",
    ],
  },
};

// Add MDX support
const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

// Add Bundle Analyzer
const withBundleAnalyzerConfigured = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Combine configurations
const finalConfig = withMDX(withBundleAnalyzerConfigured(nextConfig));

export default finalConfig;
