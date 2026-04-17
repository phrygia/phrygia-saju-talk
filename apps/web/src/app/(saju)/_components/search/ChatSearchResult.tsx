"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  type InfiniteData,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createClient } from "@/src/lib/supabase/client";
import { useUserStore } from "@/src/store/user.store";
import { MessageCursor } from "@/src/app/(saju)/_lib/services/message";
import { messagesTableName, type Messages } from "@/src/app/types/message";
import { DEFAULT_PAGE_SIZE } from "@/src/constants/pagination";
import { cn } from "@repo/ui/lib/utils";
import styles from "./ChatSearchResult.module.scss";
import dayjs from "dayjs";

type SearchSortOrder = "latest" | "oldest";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(text: string, keyword: string) {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword) return text;

  const regex = new RegExp(`(${escapeRegExp(trimmedKeyword)})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;
    if (part.toLowerCase() === trimmedKeyword.toLowerCase()) {
      return <mark key={`${part}-${index}`}>{part}</mark>;
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export default function ChatSearchResult({ keyword }: { keyword: string }) {
  const supabase = useMemo(() => createClient(), []);
  const userId = useUserStore((s) => s.user?.id);
  const [sortOrder, setSortOrder] = useState<SearchSortOrder>("latest");
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<
      {
        items: Messages[];
        nextPageParam?: MessageCursor;
      },
      Error,
      InfiniteData<
        {
          items: Messages[];
          nextPageParam?: MessageCursor;
        },
        MessageCursor | null
      >,
      [string, string, string, SearchSortOrder],
      MessageCursor | null
    >({
      queryKey: ["chat-search", userId ?? "anonymous", keyword, sortOrder],
      queryFn: async ({
        pageParam,
      }): Promise<{
        items: Messages[];
        nextPageParam?: MessageCursor;
      }> => {
        if (!userId) {
          return { items: [], nextPageParam: undefined };
        }

        let query = supabase
          .from(messagesTableName)
          .select("*")
          .eq("user_id", userId)
          .ilike("content", `%${keyword}%`)
          .order("created_at", { ascending: sortOrder === "oldest" })
          .order("id", { ascending: sortOrder === "oldest" })
          .limit(DEFAULT_PAGE_SIZE + 1);

        if (pageParam?.created_at && pageParam?.id) {
          query =
            sortOrder === "latest"
              ? query.or(
                  `created_at.lt.${pageParam.created_at},and(created_at.eq.${pageParam.created_at},id.lt.${pageParam.id})`,
                )
              : query.or(
                  `created_at.gt.${pageParam.created_at},and(created_at.eq.${pageParam.created_at},id.gt.${pageParam.id})`,
                );
        }

        const { data, error } = await query;

        if (error) {
          toast.error(
            error.message ??
              "검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          );
          throw new Error(error.message);
        }

        const rows = (data ?? []) as Messages[];
        const items = rows.slice(0, DEFAULT_PAGE_SIZE);
        const hasMore = rows.length > DEFAULT_PAGE_SIZE;
        const lastItem = items[items.length - 1];

        return {
          items,
          nextPageParam:
            hasMore && lastItem
              ? {
                  created_at: lastItem.created_at,
                  id: lastItem.id,
                }
              : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPageParam,
      initialPageParam: null,
      refetchOnWindowFocus: false,
    });

  const list = data.pages.flatMap((page) => page.items);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || !observerTarget.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (list.length === 0) {
    return (
      <div className={styles.emptyBox}>
        <div className={styles.emptyIcon}>🔭</div>
        <div className={styles.emptyTitle}>검색 결과가 없습니다</div>
        <div className={styles.emptySubTitle}>다른 키워드로 검색해보세요</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-foreground-muted">
          <b className="font-semibold text-violet">{list.length}</b>개의 상담
          내역
        </p>
        <div className="flex items-center gap-2 mb-1">
          <button
            type="button"
            onClick={() => setSortOrder("latest")}
            className={cn(
              styles.sortButton,
              sortOrder === "latest" && styles.active,
            )}
          >
            최신순
          </button>
          <button
            type="button"
            onClick={() => setSortOrder("oldest")}
            className={cn(
              styles.sortButton,
              sortOrder === "oldest" && styles.active,
            )}
          >
            오래된순
          </button>
        </div>
      </div>
      <ul className="space-y-3">
        {list.map((item) => (
          <li key={item.id} className="relative">
            <Link
              prefetch={false}
              href={`/chat/${item.conversation_id}`}
              className={styles.itemLink}
            >
              <div className={styles.itemBody}>
                <p className={styles.itemPreview}>
                  {renderHighlightedText(item.content ?? "", keyword)}
                </p>
                {item.created_at && (
                  <p className={styles.itemMeta}>
                    {dayjs(item.created_at).format("YYYY.MM.DD")}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={observerTarget} className="flex justify-center py-2">
        {isFetchingNextPage && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
        )}
      </div>
    </div>
  );
}
