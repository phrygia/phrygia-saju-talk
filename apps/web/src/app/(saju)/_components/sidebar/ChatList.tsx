"use client";

import React, { memo, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  type InfiniteData,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { cn } from "@repo/ui/lib/utils";
import { useUserStore } from "@/src/store/user.store";
import { createClient } from "@/src/lib/supabase/client";
import { DEFAULT_PAGE_SIZE } from "@/src/constants/pagination";
import {
  conversationTableName,
  type Conversation,
} from "@/src/app/types/conversation";

type ConversationCursor = {
  created_at: string;
  id: string;
};

const ChatListItem = memo(function ChatListItem({
  id,
  title,
  isActive,
}: {
  id: string;
  title: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={`/chat/${id}`}
      prefetch={false}
      className={cn(
        "h-[32px] flex gap-2 items-center px-2.5 py-2 text-xs rounded-[10px] text-foreground-sub transition-all mb-1 whitespace-nowrap overflow-hidden text-ellipsis hover:bg-[rgba(124,92,252,0.08)] hover:text-violet",
        isActive &&
          "bg-[rgba(124,92,252,0.12)] text-foreground border border-[rgba(124,92,252,0.15)]",
      )}
    >
      <div
        className={cn(
          "w-[5px] h-[5px] rounded-full bg-foreground-muted",
          isActive && "bg-violet",
        )}
      />
      {(title ?? "").slice(0, 28)}...
    </Link>
  );
});

export default function ChatList() {
  const params = useParams();
  const supabase = useMemo(() => createClient(), []);
  const userId = useUserStore((s) => s.user?.id);
  const selectedId = typeof params?.id === "string" ? params.id : "";
  const observerTarget = useRef<HTMLDivElement>(null);
  const hasNextPageRef = useRef(false);
  const isFetchingNextPageRef = useRef(false);
  const fetchNextPageRef = useRef<() => void>(() => undefined);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<
      {
        items: Conversation[];
        nextPageParam?: ConversationCursor;
      },
      Error,
      InfiniteData<
        {
          items: Conversation[];
          nextPageParam?: ConversationCursor;
        },
        ConversationCursor | null
      >,
      [string, string],
      ConversationCursor | null
    >({
      queryKey: ["conversations", userId ?? "anonymous"],
      queryFn: async ({
        pageParam,
      }): Promise<{
        items: Conversation[];
        nextPageParam?: ConversationCursor;
      }> => {
        if (!userId) {
          return {
            items: [],
            nextPageParam: undefined,
          };
        }
        const cursor = pageParam;

        let query = supabase
          .from(conversationTableName)
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .order("id", { ascending: false })
          .limit(DEFAULT_PAGE_SIZE + 1);

        if (cursor?.created_at && cursor?.id) {
          query = query.or(
            `created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`,
          );
        }

        const { data, error } = await query;

        if (error) {
          throw new Error(error.message);
        }

        const rows = (data ?? []) as Conversation[];
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
    hasNextPageRef.current = Boolean(hasNextPage);
    isFetchingNextPageRef.current = isFetchingNextPage;
    fetchNextPageRef.current = () => {
      void fetchNextPage();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          hasNextPageRef.current &&
          !isFetchingNextPageRef.current
        ) {
          fetchNextPageRef.current();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {list.map((item) => (
        <ChatListItem
          key={item.id}
          id={item.id}
          title={item.title}
          isActive={selectedId === item.id}
        />
      ))}
      <div ref={observerTarget} className="flex justify-center py-2">
        {isFetchingNextPage && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
        )}
      </div>
    </div>
  );
}
