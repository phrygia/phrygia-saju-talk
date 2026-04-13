import { calcSajuWonGuk, type SajuWonGuk } from "@/src/lib/sajuCalc";
import { OHAENG } from "@/src/constants/saju";
import type { BirthInfo } from "@/src/app/types/fortune";
const LABELS = ["시주", "일주", "월주", "년주"] as const;

export default function SajuWonGukView({
  birthInfo,
}: {
  birthInfo: BirthInfo;
}) {
  const wonGuk = calcSajuWonGuk(birthInfo.birthDate, birthInfo.birthTime);
  const pillars = [wonGuk.hour, wonGuk.day, wonGuk.month, wonGuk.year];

  return (
    <div className="mx-auto rounded-2xl border border-[var(--default-border-color)] bg-surface p-5 w-full md:w-[70%]">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground dark:text-white">
        사주 원국
      </h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        {LABELS.map((label) => (
          <div key={label} className="text-xs text-muted-foreground">
            {label}
          </div>
        ))}
        {pillars.map((ju, i) => (
          <div
            key={`cg-${i}`}
            className="flex flex-col items-center rounded-xl py-3"
            style={{ background: `${OHAENG[ju.cheongan]?.color}18` }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: OHAENG[ju.cheongan]?.color }}
            >
              {ju.cheonganHanja}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              {ju.cheongan}
            </span>
          </div>
        ))}
        {pillars.map((ju, i) => (
          <div
            key={`jj-${i}`}
            className="flex flex-col items-center rounded-xl py-3"
            style={{ background: `${OHAENG[ju.jiji]?.color ?? "#888"}12` }}
          >
            <span className="text-2xl font-bold text-foreground">
              {ju.jijiHanja}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              {ju.jiji}
            </span>
          </div>
        ))}
      </div>
      <OhaengBar wonGuk={wonGuk} />
    </div>
  );
}

function OhaengBar({ wonGuk }: { wonGuk: SajuWonGuk }) {
  const allChars = [
    wonGuk.year.cheongan,
    wonGuk.year.jiji,
    wonGuk.month.cheongan,
    wonGuk.month.jiji,
    wonGuk.day.cheongan,
    wonGuk.day.jiji,
    wonGuk.hour.cheongan,
    wonGuk.hour.jiji,
  ];

  const counts: Record<string, number> = {
    "목(木)": 0,
    "화(火)": 0,
    "토(土)": 0,
    "금(金)": 0,
    "수(水)": 0,
  };

  allChars.forEach((c) => {
    const name = OHAENG[c]?.name;
    if (name) counts[name]!++;
  });

  const ohaengColors: Record<string, string> = {
    "목(木)": "#22c55e",
    "화(火)": "#ef4444",
    "토(土)": "#eab308",
    "금(金)": "#94a3b8",
    "수(水)": "#3b82f6",
  };

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs text-muted-foreground">오행 분포</p>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#f5f5f5] dark:bg-black">
        {Object.entries(counts).map(([name, count]) =>
          count > 0 ? (
            <div
              key={name}
              title={`${name}: ${count}개`}
              style={{
                width: `${(count / 8) * 100}%`,
                background: ohaengColors[name],
              }}
            />
          ) : null,
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {Object.entries(counts).map(([name, count]) => (
          <span
            key={name}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: ohaengColors[name] }}
            />
            {name.slice(0, 1)} {count}
          </span>
        ))}
      </div>
    </div>
  );
}
