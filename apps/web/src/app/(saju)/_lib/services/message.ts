"use server";

import { createClient } from "@/src/lib/supabase/server";
import { Messages, messagesTableName } from "@/src/app/types/message";
import { DEFAULT_PAGE_SIZE } from "@/src/constants/pagination";
import { ApiResponse } from "@/src/app/types/api";

export type MessageCursor = {
  created_at: string;
  id: string;
};

export type PastMessagesPage = {
  items: Messages[];
  nextPageParam: MessageCursor | null;
};

function applyMessageCursor<T extends { or: (filters: string) => T }>(
  query: T,
  cursor?: MessageCursor | null,
) {
  if (!cursor?.created_at || !cursor?.id) return query;

  return query.or(
    `created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`,
  );
}

export async function getChatMessage(
  id: string,
  cursor?: MessageCursor | null,
): Promise<ApiResponse<Messages[]>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  let query = supabase
    .from(messagesTableName)
    .select(
      `
      *,
      conversations!messages_conversation_id_fkey (
        profile
      )
    `,
    )
    .eq("conversation_id", id)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(DEFAULT_PAGE_SIZE);

  query = applyMessageCursor(query, cursor);

  const { data, error } = await query;

  if (error) {
    return { success: false, message: error.message };
  }

  const messages = (data ?? []).reverse().map(({ conversations, ...msg }) => ({
    ...msg,
    profile: conversations?.profile ?? null,
  }));

  return { success: true, data: messages };
}

export async function searchMessages(
  query: string,
  pageParam: MessageCursor | null = null,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }
  const cursor = pageParam;

  let messageQuery = supabase
    .from(messagesTableName)
    .select("*")
    .eq("user_id", user.id)
    .ilike("content", `%${query.trim()}%`)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(DEFAULT_PAGE_SIZE);

  messageQuery = applyMessageCursor(messageQuery, cursor);

  const { data, error } = await messageQuery;

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function saveChatMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
): Promise<ApiResponse<null>> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const { error } = await supabase.from(messagesTableName).insert({
    user_id: user.id,
    conversation_id: conversationId,
    role,
    content,
  });

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, data: null };
}

export async function getPastMessages(
  pageParam: MessageCursor | null,
  conversationId: string,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<ApiResponse<PastMessagesPage>> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  let query = supabase
    .from(messagesTableName)
    .select()
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(pageSize);

  query = applyMessageCursor(query, pageParam);

  const { data, error } = await query;

  if (error) {
    return { success: false, message: error.message };
  }

  const items = (data ?? []) as Messages[];
  const lastItem = items[items.length - 1];

  return {
    success: true,
    data: {
      items,
      nextPageParam:
        items.length === pageSize && lastItem
          ? {
              created_at: lastItem.created_at,
              id: lastItem.id,
            }
          : null,
    },
  };
}
