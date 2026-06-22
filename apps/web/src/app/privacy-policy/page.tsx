import PrivacyPolicy from "@/src/components/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | SAJU TALK",
  description: "SAJU TALK 개인정보처리방침",
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
