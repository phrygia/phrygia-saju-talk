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

  // 모던 브라우저만 타겟 → 레거시 폴리필 제거
  experimental: {
    browsersListForSwc: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
