"use client";

import { useState } from "react";
import type { SajupaljaData, Jijanggan } from "@/src/app/types/manseryeok";
import {
  OHAENG_COLOR,
  OHAENG_BG,
} from "@/src/app/(saju)/_constants/manseryeok";
import { CHEONGAN_OHAENG } from "@/src/app/(saju)/_constants/manseryeok";
import { gongmangToHangul } from "@/src/app/(saju)/_lib/manseryeok";
import SipshinTooltipModal from "@/src/app/(saju)/_components/manseryeok/SipshinTooltipModal";
import TermTooltipModal from "@/src/app/(saju)/_components/manseryeok/TermTooltipModal";
import styles from "./SajupaljaTable.module.scss";

interface Props {
  data: SajupaljaData;
}

const COLS = ["시주", "일주", "월주", "년주"] as const;
type ColKey = "hour" | "day" | "month" | "year";
const COL_KEYS: ColKey[] = ["hour", "day", "month", "year"];

function JijangganCell({ items }: { items: Jijanggan[] }) {
  return (
    <div className={styles.jijangganCell}>
      {items.map((j, i) => {
        const ohaeng = CHEONGAN_OHAENG[j.hangul] ?? "토";
        const color = OHAENG_COLOR[ohaeng];
        const bg = OHAENG_BG[ohaeng];
        return (
          <span key={i} className={styles.jijangganItem}>
            <span
              className={styles.jijangganHanja}
              style={{ color, background: bg, borderColor: `${color}33` }}
            >
              {j.hangul}
            </span>
            <span className={styles.jijangganSipshin}>{j.sipshin}</span>
          </span>
        );
      })}
    </div>
  );
}

function GilshinCell({ value }: { value: string }) {
  const items = value
    .split(/[\n,，]/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (items.length === 0) return <span className={styles.gilshinText}>—</span>;

  return (
    <div className={styles.gilshinCell}>
      {items.map((item, i) => (
        <span key={i} className={styles.gilshinText}>
          {item}
        </span>
      ))}
    </div>
  );
}

function TermBtn({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`${styles.termBtn} ${className ?? ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

type SipshinModal = {
  sipshin: string;
  position: string;
};

type TermModal = {
  term: string;
};

export default function SajupaljaTable({ data }: Props) {
  const [sipshinModal, setSipshinModal] = useState<SipshinModal | null>(null);
  const [termModal, setTermModal] = useState<TermModal | null>(null);

  function openTerm(term: string) {
    setTermModal({ term });
  }

  const rows: {
    labelKey: string;
    render: (key: ColKey) => React.ReactNode;
    colSpan?: boolean;
  }[] = [
    {
      labelKey: "십신",
      render: (key) => (
        <button
          type="button"
          className={styles.sipshinBtn}
          onClick={() =>
            setSipshinModal({ sipshin: data[key].sipshin, position: key })
          }
        >
          {data[key].sipshin}
        </button>
      ),
    },
    {
      labelKey: "천간",
      render: (key) => {
        const cg = data[key].cheongan;
        const char = (
          <span
            className={styles.cheonganChar}
            style={{ color: OHAENG_COLOR[cg.ohaeng] }}
          >
            {cg.hangul}
          </span>
        );
        if (key === "day")
          return <span className={styles.ilganCircle}>{char}</span>;
        return char;
      },
    },
    {
      labelKey: "지지",
      render: (key) => {
        const jj = data[key].jiji;
        return (
          <span
            className={styles.jijiChar}
            style={{ color: OHAENG_COLOR[jj.ohaeng] }}
          >
            {jj.hangul}
          </span>
        );
      },
    },
    {
      labelKey: "십신",
      render: (key) => {
        const pos = key === "day" ? "dayJiji" : key;
        const isIlgan = key === "day";
        return (
          <button
            type="button"
            className={`${styles.sipshinBtn} ${isIlgan ? styles.sipshinBtnIlgan : ""}`}
            onClick={() =>
              setSipshinModal({ sipshin: data[key].jijiSipshin, position: pos })
            }
          >
            {data[key].jijiSipshin}
          </button>
        );
      },
    },
    {
      labelKey: "지장간",
      render: (key) => <JijangganCell items={data[key].jijanggan} />,
    },
    {
      labelKey: "길신/홍신",
      render: (key) => <GilshinCell value={data[key].gilshin || "없음"} />,
    },
    {
      labelKey: "12신살",
      render: (key) => (
        <span className={styles.bodyText}>{data[key].sibishinsal || "—"}</span>
      ),
    },
    {
      labelKey: "12운성",
      render: (key) => {
        const u = data[key].sibiUnseong;
        return (
          <div className={styles.unseongCell}>
            <span className={styles.unseongMain}>{u.main}</span>
            {u.sub && <span className={styles.unseongSub}>({u.sub})</span>}
          </div>
        );
      },
    },
    {
      labelKey: "공망",
      render: (key) =>
        key === "year" ? (
          <div className={styles.gongmangCell}>
            <span className={styles.gongmangHangul}>
              {gongmangToHangul(data.gongmang)}
            </span>
            <span className={styles.gongmangHanja}>{data.gongmang}</span>
          </div>
        ) : (
          <span />
        ),
      colSpan: true,
    },
  ];

  return (
    <div className={styles.tableWrap}>
      <div className={styles.hint}>
        <span>💡</span>
        <span>궁금한 용어는 표의 값을 눌러 설명을 볼 수 있어요.</span>
      </div>
      <div className={styles.scrollX}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLS.map((col) => (
                <th key={col} className={styles.th}>
                  <TermBtn label={col} onClick={() => openTerm(col)} />
                </th>
              ))}
              <th className={styles.th}>구분</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={styles.tr}>
                {row.colSpan ? (
                  <>
                    <td
                      colSpan={4}
                      className={`${styles.td} ${styles.gongmangTd}`}
                    >
                      {row.render("year")}
                    </td>
                    <td className={`${styles.td} ${styles.labelTd}`}>
                      <TermBtn
                        label={row.labelKey}
                        onClick={() => openTerm(row.labelKey)}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    {COL_KEYS.map((key) => (
                      <td
                        key={key}
                        className={`${styles.td} ${key === "day" ? styles.ilganTd : ""}`}
                      >
                        {row.render(key)}
                      </td>
                    ))}
                    <td className={`${styles.td} ${styles.labelTd}`}>
                      <TermBtn
                        label={row.labelKey}
                        onClick={() => openTerm(row.labelKey)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sipshinModal && (
        <SipshinTooltipModal
          sipshin={sipshinModal.sipshin}
          position={sipshinModal.position}
          onClose={() => setSipshinModal(null)}
        />
      )}
      {termModal && (
        <TermTooltipModal
          term={termModal.term}
          onClose={() => setTermModal(null)}
        />
      )}
    </div>
  );
}
