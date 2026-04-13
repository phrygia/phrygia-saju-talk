import { Suspense } from "react";
import { redirect } from "next/navigation";
import { DEFAULT_PAGE_SIZE } from "@/src/constants/pagination";
import ChatDetail from "@/src/app/(saju)/_components/detail/ChatDetail";
import ChatDetailSkeleton from "@/src/app/(saju)/_components/detail/ChatDetailSkeleton";
import { getChatMessage } from "@/src/app/(saju)/_lib/services/message";
import { getRandomSajuQuestions } from "@/src/app/(saju)/_lib/saju";

async function ChatDetailContent({ id }: { id: string }) {
  const result = await getChatMessage(id);
  if (!result.success) redirect("/");

  return (
    <ChatDetail
      initialMessages={result.data}
      initialProfile={result.data?.[0]?.profile ?? null}
      conversationId={id}
      pageSize={DEFAULT_PAGE_SIZE}
      questions={result.data.length === 0 ? getRandomSajuQuestions() : []}
    />
  );
}

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  if (!id) redirect("/");

  return (
    <Suspense fallback={<ChatDetailSkeleton />}>
      <ChatDetailContent id={id} />
    </Suspense>
  );
}
