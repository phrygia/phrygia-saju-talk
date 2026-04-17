import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/src/lib/supabase/server";
import type { BirthInfo } from "@/src/app/types/fortune";

async function fetchProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<BirthInfo | null> {
  const { data } = await supabase
    .from("profiles")
    .select("gender, calendar_type, birth_date, birth_time, name")
    .eq("id", userId)
    .single();

  if (!data) return null;

  return {
    gender: data.gender,
    calendarType: data.calendar_type,
    birthDate: data.birth_date,
    birthTime: data.birth_time,
    name: data?.name,
  };
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const profile = user?.id ? await fetchProfile(supabase, user.id) : null;

  return { user, profile };
}
