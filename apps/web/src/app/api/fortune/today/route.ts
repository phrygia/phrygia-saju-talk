import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { getTodayFortune } from "@/src/app/(saju)/_lib/services/today";
import type { ApiResponse } from "@/src/app/types/api";
import type { BirthInfo, DailyFortune } from "@/src/app/types/fortune";
import { createClient } from "@/src/lib/supabase/server";

function isBirthInfo(value: unknown): value is BirthInfo {
  if (!value || typeof value !== "object") {
    return false;
  }

  const info = value as Partial<BirthInfo>;
  return (
    (info.gender === "male" || info.gender === "female") &&
    (info.calendarType === "solar" || info.calendarType === "lunar") &&
    typeof info.birthDate === "string" &&
    typeof info.birthTime === "string"
  );
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<DailyFortune>>> {
  try {
    const body = (await request.json()) as {
      date?: string;
      birthInfo?: BirthInfo;
    };

    if (!body.date || !dayjs(body.date).isValid()) {
      return NextResponse.json(
        { success: false, message: "잘못된 날짜입니다." },
        { status: 400 },
      );
    }

    if (!isBirthInfo(body.birthInfo)) {
      return NextResponse.json(
        { success: false, message: "잘못된 생년월일 정보입니다." },
        { status: 400 },
      );
    }
    const requestedDate = dayjs(body.date);
    const currentDate = dayjs();

    if (requestedDate.isAfter(currentDate, "day")) {
      return NextResponse.json(
        {
          success: false,
          message: "미래 날짜의 운세는 확인할 수 없습니다.",
        },
        { status: 400 },
      );
    }

    if (requestedDate.isBefore(currentDate, "day")) {
      const supabase = await createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json(
          { success: false, message: "로그인이 필요합니다." },
          { status: 401 },
        );
      }

      const { data: storedFortune, error } = await supabase
        .from("daily_fortunes")
        .select("fortune_data")
        .eq("user_id", user.id)
        .eq("fortune_date", requestedDate.format("YYYY-MM-DD"))
        .maybeSingle();

      if (error || !storedFortune?.fortune_data) {
        return NextResponse.json(
          {
            success: false,
            message: "해당 날짜의 저장된 운세 데이터가 없습니다.",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: storedFortune.fortune_data as DailyFortune,
        },
        { status: 200 },
      );
    }

    const result = await getTodayFortune(
      requestedDate.format("YYYY-MM-DD"),
      body.birthInfo,
    );

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "운세 데이터를 불러오는데 실패했습니다.",
      },
      { status: 500 },
    );
  }
}
