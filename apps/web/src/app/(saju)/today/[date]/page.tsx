import FortuneDashboard from "@/src/app/(saju)/_components/today/FortuneDashboard";

export default function TodayFortunePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  return <FortuneDashboard params={params} />;
}
