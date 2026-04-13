"use server";

import dayjs from "dayjs";
import { createClient } from "@/src/lib/supabase/server";
import type { BirthInfo } from "@/src/app/types/fortune";
import { ApiResponse } from "@/src/app/types/api";
import { birthTableName } from "@/src/app/types/user";

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

  const { error } = await supabase.auth.admin.deleteUser(user.id);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}
