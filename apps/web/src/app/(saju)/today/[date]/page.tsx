import FortuneDashboard from "@/src/app/(saju)/_components/today/FortuneDashboard";

export default async function TodayFortunePage({
  params,
}: {
  params: Promise<{
    date: string;
  }>;
}) {
  const resolvedParams = await params;

  return <FortuneDashboard date={resolvedParams?.date} />;
}
