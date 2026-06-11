"use server";

import dayjs from "dayjs";
import { createClient } from "@/src/lib/supabase/server";
import type { BirthInfo } from "@/src/app/types/fortune";
import { ApiResponse } from "@/src/app/types/api";
import { birthTableName } from "@/src/app/types/user";
import { conversationTableName } from "@/src/app/types/conversation";
import { messagesTableName } from "@/src/app/types/message";
import { manseryeokTableName } from "@/src/app/types/manseryeok";
import { gunghapTableName } from "@/src/app/types/gunghap";
import { fortunesTableName } from "@/src/app/types/fortune";

export async function updataProfile(
  info: BirthInfo,
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const { error } = await supabase.from(birthTableName).upsert({
    id: user.id,
    gender: info.gender,
    calendar_type: info.calendarType,
    birth_date: info.birthDate,
    birth_time: info.birthTime,
    name: info?.name,
    updated_at: dayjs().toISOString(),
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}

export async function deleteProfile(): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const { error } = await supabase
    .from(birthTableName)
    .delete()
    .eq("id", user.id);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}

export async function changeUserPassword(
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || !user.email) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return { success: false, message: "현재 비밀번호가 틀렸습니다." };
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      message: "새 비밀번호는 현재 비밀번호와 달라야 합니다.",
    };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { success: false, message: updateError.message };
  }

  return { success: true, data: null };
}

export async function deleteUser(): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "회원정보가 없습니다." };
  }

  const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY;
  if (!serviceRoleKey) {
    return { success: false, message: "서버 설정 오류가 발생했습니다." };
  }

  const { createClient: createSupabaseClient } = await import(
    "@supabase/supabase-js"
  );
  const adminClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const userId = user.id;

  // 메시지 → 대화 → 나머지 유저 데이터 순서로 삭제
  await adminClient.from(messagesTableName).delete().eq("user_id", userId);

  const { data: conversations } = await adminClient
    .from(conversationTableName)
    .select("id")
    .eq("user_id", userId);

  if (conversations && conversations.length > 0) {
    const convIds = conversations.map((c) => c.id);
    await adminClient
      .from(messagesTableName)
      .delete()
      .in("conversation_id", convIds);
    await adminClient
      .from(conversationTableName)
      .delete()
      .in("id", convIds);
  }

  await Promise.all([
    adminClient.from(birthTableName).delete().eq("id", userId),
    adminClient.from(manseryeokTableName).delete().eq("user_id", userId),
    adminClient.from(gunghapTableName).delete().eq("user_id", userId),
    adminClient.from(fortunesTableName).delete().eq("user_id", userId),
  ]);

  const { error } = await adminClient.auth.admin.deleteUser(userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}
