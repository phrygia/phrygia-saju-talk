"use server";

import { createClient } from "@/src/lib/supabase/server";
import { conversationTableName } from "@/src/app/types/conversation";
import { ApiResponse } from "@/src/app/types/api";
import { BirthInfo } from "@/src/app/types/fortune";

export async function createConversation(
  firstMessage: string,
  initialBirthInfo: BirthInfo | null,
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const { data, error } = await supabase
    .from(conversationTableName)
    .insert({
      user_id: user!.id,
      title: firstMessage.slice(0, 20),
      profile: initialBirthInfo,
    })
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: data?.id };
}

export async function deleteConversationMessages(
  conversationId: string,
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const { error } = await supabase
    .from(conversationTableName)
    .delete()
    .eq("id", conversationId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}

export async function deleteAllConversationMessages(): Promise<
  ApiResponse<null>
> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const { error } = await supabase
    .from(conversationTableName)
    .delete()
    .eq("user_id", user.id);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}
