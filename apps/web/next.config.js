import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 불필요한 응답 헤더 제거
  poweredByHeader: false,

  // gzip 압축 (Vercel은 자동, 셀프 호스팅 시 필요)
  compress: true,

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default withBundleAnalyzer(nextConfig);
