import { Skeleton } from "@repo/ui/components/skeleton";

export default function ChatDetailSkeleton() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-b-border border-solid px-5 md:px-6 h-[52px]">
        <Skeleton className="w-[70px] h-[20px] rounded-sm" />
        <div className="flex items-center space-x-1.5">
          <Skeleton className="w-[36px] h-[36px] rounded-sm" />
          <Skeleton className="w-[87px] h-[30px] rounded-sm hidden md:block" />
          <Skeleton className="w-[70px] h-[30px] rounded-sm" />
        </div>
      </header>
      <div className="grid grid-rows-[1fr_auto] flex-1 min-h-0">
        <div className="min-h-0 overflow-y-auto relative">
          <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 pb-20">
            <div className="flex justify-end">
              <Skeleton className="h-[42px] w-[144px] rounded-[18px_18px_4px_18px]" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-[42px] w-[60%] rounded-2xl" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-[84px] w-full rounded-2xl" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-[42px] w-[80%] rounded-2xl" />
            </div>
          </div>
        </div>
        <div className="px-5 md:px-6 pt-3 pb-5">
          <div className="mx-auto max-w-2xl">
            <Skeleton className="h-[50px] rounded-2xl" />
            <p className="mt-2 text-center text-[10px] text-foreground-sub">
              AI가 제공하는 운세는 재미로 참고해주세요. 중요한 결정은 신중하게!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
