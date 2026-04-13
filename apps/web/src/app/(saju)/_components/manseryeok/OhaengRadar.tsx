"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { OhaengBunpo, SipshinBunpo } from "@/src/app/types/manseryeok";

interface Props {
  ohaeng: OhaengBunpo;
  sipshin: SipshinBunpo;
}

export default function OhaengRadar({ ohaeng, sipshin }: Props) {
  const data = [
    {
      axis: "토-비겁/자매",
      value: Math.round((ohaeng.to + sipshin.bigyeop) / 2),
    },
    {
      axis: "금-식상/자녀",
      value: Math.round((ohaeng.geum + sipshin.sigwansik) / 2),
    },
    {
      axis: "수-재성/부친",
      value: Math.round((ohaeng.su + sipshin.jaeseong) / 2),
    },
    {
      axis: "목-관성/남편",
      value: Math.round((ohaeng.mok + sipshin.gwanseong) / 2),
    },
    {
      axis: "화-인성/모친",
      value: Math.round((ohaeng.hwa + sipshin.inseong) / 2),
    },
  ];

  const ohaengEmoji: Record<string, string> = {
    목: "🌿",
    화: "🔥",
    토: "🟨",
    금: "⚔",
    수: "💧",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}
        >
          📊 오행 및 십신 분포
        </span>
        <span style={{ fontSize: 13, color: "var(--foreground-muted)" }}>
          {["목", "화", "토", "금", "수"].map((o) => (
            <span key={o} style={{ marginRight: 4 }}>
              {ohaengEmoji[o]}
            </span>
          ))}
        </span>
      </div>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "16px 8px",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              color: "var(--foreground-sub)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 28,
                height: 12,
                background: "rgba(244,114,182,0.3)",
                border: "1.5px solid #f472b6",
                borderRadius: 3,
              }}
            />
            오행, 십신 그래프
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart
            data={data}
            margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
          >
            <PolarGrid stroke="var(--border)" strokeOpacity={0.7} />
            <PolarAngleAxis
              dataKey="axis"
              tick={{
                fontSize: 11,
                fill: "var(--foreground-sub)",
                fontFamily: "Noto Sans KR",
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 60]}
              tick={{ fontSize: 9, fill: "var(--foreground-muted)" }}
              tickCount={4}
              axisLine={false}
            />
            <Radar
              dataKey="value"
              stroke="#f472b6"
              strokeWidth={1.5}
              fill="#f472b6"
              fillOpacity={0.2}
              dot={{ r: 3, fill: "#f472b6", strokeWidth: 0 }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--foreground)",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
