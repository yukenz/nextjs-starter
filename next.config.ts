import type { NextConfig } from "next";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
    turbopack:{

    }
};

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig);
