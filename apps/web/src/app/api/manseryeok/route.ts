import { NextResponse } from "next/server";
import { getManseryeok } from "@/src/app/(saju)/_lib/services/manseryeok";
import type { BirthInfo } from "@/src/app/types/fortune";
import type { ManseryeokData } from "@/src/app/types/manseryeok";
import type { ApiResponse } from "@/src/app/types/api";

function isBirthInfo(v: unknown): v is BirthInfo {
  if (!v || typeof v !== "object") return false;

  const b = v as Partial<BirthInfo>;
  return (
    (b.gender === "male" || b.gender === "female") &&
    (b.calendarType === "solar" || b.calendarType === "lunar") &&
    typeof b.birthDate === "string" &&
    typeof b.birthTime === "string"
  );
}

export async function POST(
  request: Request,
): Promise<NextResponse<ApiResponse<ManseryeokData>>> {
  try {
    const body = (await request.json()) as {
      birthInfo?: unknown;
    };

    if (!isBirthInfo(body.birthInfo)) {
      return NextResponse.json(
        { success: false, message: "생년월일 정보가 올바르지 않습니다." },
        { status: 400 },
      );
    }

    const result = await getManseryeok(body.birthInfo);

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "만세력 데이터를 불러오는데 실패했습니다.",
      },
      { status: 500 },
    );
  }
}
