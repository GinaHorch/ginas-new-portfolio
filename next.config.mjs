import mdx from "@next/mdx";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    optimizeCss: false, // Ensures Next.js does not optimize CSS incorrectly
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

