"use client";

import React, { useEffect } from "react";
import StarCanvas from "@/src/components/common/StarCanvas";
import Link from "next/link";
import Logo from "@/src/components/common/Logo";
import styles from "./LandingLayout.module.scss";

const SAJU_CHARS: ({ char: string; element: string; delay: number } | null)[] =
  [
    { char: "사", element: "water", delay: 0.5 },
    { char: "주", element: "wood", delay: 0.7 },
    null,
    { char: "팔", element: "fire", delay: 0.9 },
    { char: "자", element: "fire", delay: 1.1 },
    null,
    { char: "운", element: "earth", delay: 1.3 },
    { char: "세", element: "earth", delay: 1.5 },
    null,
    { char: "A", element: "metal", delay: 1.7 },
    { char: "I", element: "metal", delay: 1.9 },
  ];

const STATS = [
  { num: "7", label: "운세 카테고리" },
  { num: "60+", label: "추천 상담 질문" },
  { num: "∞", label: "AI 실시간 스트리밍" },
];

const FEATURES = [
  {
    num: "01",
    icon: "💬",
    name: "AI 사주 상담",
    tag: "Gemini 2.5 Flash",
    desc: "Google Gemini 2.5 Flash가 30년 경력 사주 전문가 페르소나로 실시간 스트리밍 상담. 모든 대화는 자동 저장됩니다.",
  },
  {
    num: "02",
    icon: "⭐",
    name: "오늘의 운세",
    tag: "Daily Fortune",
    desc: "총운·재물·연애·건강·직장·학업·여행 7개 카테고리 점수와 행운의 색·숫자·아이템·시간을 매일 분석합니다.",
  },
  {
    num: "03",
    icon: "💍",
    name: "궁합 운세",
    tag: "Compatibility",
    desc: "두 사람의 사주를 분석해 연애·결혼·성격·재물·대화·갈등 6가지 궁합 점수와 심층 분석을 제공합니다.",
  },
  {
    num: "04",
    icon: "📜",
    name: "만세력·사주 분석",
    tag: "Manseryeok",
    desc: "사주원국, 오행 분포, 십신 분포, 성향 분석, 대운·세운·월운까지 AI가 생성하는 완전한 사주 차트.",
  },
  {
    num: "05",
    icon: "🗂️",
    name: "상담 내역 관리",
    tag: "Chat History",
    desc: "모든 AI 대화가 Supabase에 자동 저장. 키워드 검색·날짜 그룹핑·삭제로 히스토리를 손쉽게 관리하세요.",
  },
  {
    num: "06",
    icon: "🖼️",
    name: "운세 카드 저장",
    tag: "Image Export",
    desc: "오늘의 운세를 감각적인 카드 이미지로 변환해 JPG 파일로 다운로드. SNS 공유에 최적화된 레이아웃.",
  },
];

const STEPS = [
  {
    num: "01",
    name: "사주 정보 등록",
    badge: "🌙 양력 / 음력 지원",
    desc: "생년월일(양력/음력), 성별, 태어난 시간(12지신 기준)을 입력합니다. 태어난 시간을 모르면 '모름'으로도 이용 가능합니다.",
  },
  {
    num: "02",
    name: "사주 원국 계산",
    badge: "✦ 오행 · 십신 분석",
    desc: "AI가 입력 정보를 바탕으로 사주팔자 원국을 계산하고 오행 분포와 십신을 분석해 개인 맞춤 프로파일을 생성합니다.",
  },
  {
    num: "03",
    name: "AI 실시간 상담",
    badge: "🤖 Gemini 2.5 Flash",
    desc: "궁금한 것을 무엇이든 물어보세요. 재물운, 직장운, 연애운… Gemini가 당신의 사주를 기반으로 실시간 스트리밍으로 답합니다.",
  },
];

const FORTUNE_SCORES = [
  { emoji: "⭐", label: "총운", score: 82, color: "var(--gold-sub)" },
  { emoji: "💰", label: "재물", score: 75, color: "var(--fortune-wealth)" },
  { emoji: "💕", label: "연애", score: 90, color: "var(--fortune-love)" },
  { emoji: "🌿", label: "건강", score: 68, color: "var(--fortune-health)" },
  { emoji: "💼", label: "직장", score: 85, color: "var(--fortune-career)" },
  { emoji: "📚", label: "학업", score: 72, color: "var(--fortune-study)" },
  { emoji: "✈️", label: "여행", score: 60, color: "var(--fortune-travel)" },
];

const LUCKY_ITEMS = [
  { label: "Lucky Color", val: "🔵 파란색" },
  { label: "Lucky Number", val: "3, 8" },
  { label: "Lucky Item", val: "🌊 물" },
  { label: "Lucky Time", val: "오전 9–11시" },
];

const CHEONJI = [
  {
    pillar: "시(時)",
    hanja: "庚",
    hangul: "경",
    jiJi: "申",
    jiHangul: "신",
    color: "#c0cfe8",
  },
  {
    pillar: "일(日)",
    hanja: "戊",
    hangul: "무",
    jiJi: "戌",
    jiHangul: "술",
    color: "var(--gold)",
  },
  {
    pillar: "월(月)",
    hanja: "丙",
    hangul: "병",
    jiJi: "午",
    jiHangul: "오",
    color: "var(--rose)",
  },
  {
    pillar: "년(年)",
    hanja: "壬",
    hangul: "임",
    jiJi: "寅",
    jiHangul: "인",
    color: "var(--blue)",
  },
];

const OHANG = [
  { name: "목", color: "var(--ohaeng-wood)", width: 15, count: 1 },
  { name: "화", color: "var(--ohaeng-fire)", width: 30, count: 2 },
  { name: "토", color: "var(--ohaeng-earth)", width: 30, count: 2 },
  { name: "금", color: "var(--ohaeng-metal)", width: 30, count: 2 },
  { name: "수", color: "var(--ohaeng-water)", width: 15, count: 1 },
];

const TECH_PILLS = [
  { label: "Google Gemini 2.5 Flash", hl: true },
  { label: "Next.js", hl: true },
  { label: "React", hl: true },
  { label: "TypeScript" },
  { label: "Supabase" },
  { label: "Vercel AI SDK" },
  { label: "Turborepo" },
  { label: "Zustand" },
  { label: "TanStack Quer" },
  { label: "Tailwind CSS" },
  { label: "Zod + RHF" },
];

const ORBIT_LABELS: { label: string; style: React.CSSProperties }[] = [
  { label: "Gemini AI", style: { top: "8%", left: "54%" } },
  { label: "Supabase", style: { bottom: "12%", left: "52%" } },
  { label: "Next.js", style: { top: "42%", left: "-2%" } },
  { label: "Vercel", style: { top: "18%", right: "0%" } },
  { label: "Zustand", style: { bottom: "28%", left: "0%" } },
];

const QUESTIONS = [
  {
    title: "💰 재물 · 직장운",
    items: [
      "올해 재물운과 최적 투자 시기는?",
      "창업하기 좋은 시기인가요?",
      "이직이나 승진 가능성은?",
      "나에게 맞는 직업 분야는?",
      "사업 파트너와의 궁합은?",
    ],
  },
  {
    title: "💕 연애 · 결혼운",
    items: [
      "올해 인연을 만날 수 있을까요?",
      "현재 연인과 결혼해도 될까요?",
      "궁합이 잘 맞는 띠는?",
      "결혼 적령기는 언제인가요?",
      "이별 후 재회 가능성은?",
    ],
  },
  {
    title: "📚 학업 · 건강 · 종합",
    items: [
      "시험 합격 가능성은?",
      "자격증 취득에 좋은 시기는?",
      "건강 관리에 주의할 점은?",
      "내 사주의 용신(用神)은?",
      "앞으로 10년의 대운 흐름은?",
    ],
  },
];

export default function LandingLayout() {
  useEffect(() => {
    const els = document.querySelectorAll(`.${styles.reveal}`);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(`${styles.visible}`);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const bars = document.querySelectorAll(
      `.${styles.fBar}, .${styles.ohangFill}`,
    );
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setTimeout(() => {
              el.style.width = `${el.dataset.w}%`;
            }, 120);
            obs.unobserve(el);
          }
        }),
      { threshold: 0.4 },
    );
    bars.forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, []);

  return (
    <div className={styles.root}>
      <StarCanvas zIndex={0} />
      <nav className={styles.nav}>
        <div className="flex items-center justify-between pt-5 pb-4 border-b border-b-border">
          <Link href="/" className="flex items-center">
            <div className="w-[30px] h-[30px] bg-gradient-to-br from-[#6366f1] to-[#a78bfa] rounded-[9px] flex items-center justify-center text-[14px] shadow-[0_0_14px_rgba(99,102,241,0.45)] shrink-0">
              ✦
            </div>
            <div className="ml-2.5">
              <Logo className="-ml-0.5" />
              <p className="text-[10px] text-foreground-sub -mt-0.5">
                AI 사주 상담
              </p>
            </div>
          </Link>
        </div>
        <ul className={styles.navList}>
          {["기능", "사용방법", "미리보기", "기술"].map((label, i) => (
            <li key={label}>
              <a href={["#features", "#how", "#demo", "#tech"][i]}>{label}</a>
            </li>
          ))}
        </ul>
        <Link href="/" className={styles.navCta}>
          무료로 시작하기
        </Link>
      </nav>

      <section id="hero" className={styles.hero}>
        <p className={styles.heroEyebrow}>
          Four Pillars of Destiny · AI Oracle
        </p>
        <div className={styles.sajuChars} aria-hidden="true">
          {SAJU_CHARS.map((item, i) =>
            item === null ? (
              <div key={`divider-${i}`} className={styles.scDivider} />
            ) : (
              <div
                key={item.char}
                className={`${styles.sc} ${styles[item.element as keyof typeof styles]}`}
                style={{ animationDelay: `${item.delay}s` }}
              >
                {item.char}
              </div>
            ),
          )}
        </div>

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleGrad}>SAJU TALK</span>
        </h1>

        <p className={styles.heroDesc}>
          사주팔자(四柱八字)와 AI를 결합한 개인 맞춤형 운세 상담 플랫폼.
          <br />
          Google Gemini가 30년 경력 사주 전문가 페르소나로 당신의 운명을
          읽습니다.
        </p>

        <div className={styles.heroActions}>
          <a
            href="https://phrygia-saju-talk-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            AI 상담 시작하기 →
          </a>
          <a href="#features" className={styles.btnGhost}>
            기능 살펴보기
          </a>
        </div>

        <div className={styles.heroScroll}>
          <div className={styles.scrollLine} />
          <span className={styles.heroScrollText}>Scroll</span>
        </div>
      </section>

      <div className={styles.statsSection}>
        {STATS.map((s) => (
          <div key={s.label} className={`${styles.statItem} ${styles.reveal}`}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <section id="features" className={styles.featuresSection}>
        <div className={`${styles.featuresHead} ${styles.reveal}`}>
          <div>
            <div className={styles.sectionEyebrow}>Core Features</div>
            <h2 className={styles.sectionTitle}>
              하나의 앱으로
              <br />
              모든 운세를
            </h2>
          </div>
          <p className={styles.sectionBody} style={{ maxWidth: 380 }}>
            AI 사주 상담부터 오늘의 운세, 궁합, 만세력까지.
            <br />
            전통 사주 이론을 현대 AI로 재해석한 통합 운세 플랫폼입니다.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.num} className={`${styles.featCard} ${styles.reveal}`}>
              <div className={styles.featNum}>{f.num}</div>
              <div className={styles.featIcon}>{f.icon}</div>
              <div className={styles.featName}>{f.name}</div>
              <p className={styles.featDesc}>{f.desc}</p>
              <span className={styles.featTag}>{f.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className={styles.howSection}>
        <div className={styles.howInner}>
          <div className={`${styles.howHead} ${styles.reveal}`}>
            <div className={styles.sectionEyebrow}>How It Works</div>
            <h2 className={styles.sectionTitle}>
              세 단계로
              <br />
              시작하세요
            </h2>
          </div>

          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className={`${styles.step} ${styles.reveal}`}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <div className={styles.stepName}>{step.name}</div>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <span className={styles.stepBadge}>{step.badge}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={styles.stepArrow}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className={styles.demoSection}>
        <div className={`${styles.demoHead} ${styles.reveal}`}>
          <div className={styles.sectionEyebrow}>Preview</div>
          <h2 className={styles.sectionTitle}>이런 화면을 만나게 됩니다</h2>
          <p
            className={styles.sectionBody}
            style={{ maxWidth: 480, margin: "0.8rem auto 0" }}
          >
            실제 서비스의 핵심 화면을 미리 경험해보세요.
          </p>
        </div>

        <div className={styles.demoGrid}>
          <div className={`${styles.demoCard} ${styles.reveal}`}>
            <div className={styles.demoCardLabel}>오늘의 운세</div>

            {FORTUNE_SCORES.map((f) => (
              <div key={f.label} className={styles.fScoreRow}>
                <span className={styles.fScoreEmoji}>{f.emoji}</span>
                <span className={styles.fScoreLabel}>{f.label}</span>
                <div className={styles.fBarWrap}>
                  <div
                    className={styles.fBar}
                    data-w={f.score}
                    style={{
                      background: f.color,
                      boxShadow: `0 0 6px ${f.color}`,
                    }}
                  />
                </div>
                <span className={styles.fScoreNum} style={{ color: f.color }}>
                  {f.score}
                </span>
              </div>
            ))}

            <div className={styles.luckyGrid}>
              {LUCKY_ITEMS.map((item) => (
                <div key={item.label} className={styles.luckyCard}>
                  <div className={styles.luckyCardLabel}>{item.label}</div>
                  <div className={styles.luckyCardVal}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.demoCard} ${styles.reveal}`}>
            <div className={styles.demoCardLabel}>만세력 · 사주 원국</div>

            <table className={styles.sajuTbl}>
              <thead>
                <tr>
                  {CHEONJI.map((c) => (
                    <th key={c.pillar}>{c.pillar}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {CHEONJI.map((c) => (
                    <td
                      key={`h-${c.hanja}`}
                      className={styles.hanja}
                      style={{ color: c.color }}
                    >
                      {c.hanja}
                    </td>
                  ))}
                </tr>
                <tr>
                  {CHEONJI.map((c) => (
                    <td key={`hk-${c.hangul}`} className={styles.hangul}>
                      {c.hangul}
                    </td>
                  ))}
                </tr>
                <tr>
                  {CHEONJI.map((c) => (
                    <td
                      key={`j-${c.jiJi}`}
                      className={styles.hanja}
                      style={{ color: c.color }}
                    >
                      {c.jiJi}
                    </td>
                  ))}
                </tr>
                <tr>
                  {CHEONJI.map((c) => (
                    <td key={`jk-${c.jiHangul}`} className={styles.hangul}>
                      {c.jiHangul}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            <div className={styles.ohangLabel}>오행 분포 · Five Elements</div>
            {OHANG.map((o) => (
              <div key={o.name} className={styles.ohangRow}>
                <span className={styles.ohangName} style={{ color: o.color }}>
                  {o.name}
                </span>
                <div className={styles.ohangBarWrap}>
                  <div
                    className={styles.ohangFill}
                    data-w={o.width}
                    style={{
                      background: o.color,
                      boxShadow: `0 0 6px ${o.color}`,
                    }}
                  />
                </div>
                <span className={styles.ohangCount}>{o.count}</span>
              </div>
            ))}

            <div className={styles.aiBox}>
              <span className={styles.aiLabel}>✦ AI 성향 분석</span>
              <p className={styles.aiText}>
                금화교전(金火交戰)의 사주로, 강한 추진력과 카리스마를 지니나
                내면의 갈등을 조율하는 과정이 성장의 핵심입니다.
              </p>
            </div>
          </div>

          <div className={`${styles.demoCard} ${styles.reveal}`}>
            <div className={styles.demoCardLabel}>AI 사주 상담</div>

            <div className={styles.chatMsgs}>
              <div className={`${styles.msgBubble} ${styles.user}`}>
                올해 직장운은 어떤가요? 이직을 고민 중인데요.
              </div>
              <div className={`${styles.msgBubble} ${styles.ai}`}>
                사주를 보니 병오년(丙午) 대운이 일주와 좋은 합을 이루고
                있습니다. 특히 3~5월은 목화통명(木火通明)의 기운으로 능력이 빛을
                발하는 시기입니다…
              </div>
              <div className={`${styles.msgBubble} ${styles.user}`}>
                이직은 언제가 좋을까요?
              </div>
              <div
                className={`${styles.msgBubble} ${styles.ai}`}
                style={{ fontSize: "0.7rem" }}
              >
                하반기 9~10월 경금(庚金)의 기운이 강해지는 시기가 유리합니다.
                다만 충동적 결정보다 신중한 준비가 필요합니다.
              </div>
            </div>

            <div className={styles.chatInput}>
              <span className={styles.chatInputPlaceholder}>
                사주에 대해 무엇이든 물어보세요...
              </span>
              <div className={styles.sendMock}>→</div>
            </div>
          </div>
        </div>
      </section>

      <section id="tech" className={styles.techSection}>
        <div className={styles.techInner}>
          <div className={styles.reveal}>
            <div className={styles.sectionEyebrow}>Technology Stack</div>
            <h2 className={styles.sectionTitle}>
              최신 기술로
              <br />
              구축된 플랫폼
            </h2>
            <p className={styles.sectionBody} style={{ marginTop: "1rem" }}>
              Next.js 16 App Router + React 19 위에 Gemini AI 스트리밍, Supabase
              실시간 DB, Turborepo 모노레포로 확장 가능한 운세 서비스를
              제공합니다.
            </p>
            <div className={styles.techPills}>
              {TECH_PILLS.map((p) => (
                <span
                  key={p.label}
                  className={`${styles.pill} ${p.hl ? styles.hl : ""}`}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          <div className={`${styles.orbitWrap} ${styles.reveal}`}>
            <div className={styles.ring1} />
            <div className={styles.ring2}>
              <div className={styles.ringDot} />
            </div>
            <div className={styles.ring3}>
              <div className={`${styles.ringDot} ${styles.ringDotGold}`} />
            </div>
            <div className={styles.ringCenter}>
              <div className={styles.ringHanja}>
                사주
                <br />
                팔자
              </div>
              <div className={styles.ringSub}>AI · Oracle</div>
            </div>
            {ORBIT_LABELS.map((o) => (
              <div key={o.label} className={styles.orbitLabel} style={o.style}>
                {o.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="questions" className={styles.questionsSection}>
        <div className={`${styles.qHead} ${styles.reveal}`}>
          <div className={styles.sectionEyebrow}>Consultation Topics</div>
          <h2 className={styles.sectionTitle}>이런 것들을 물어볼 수 있어요</h2>
        </div>

        <div className={styles.qCols}>
          {QUESTIONS.map((group) => (
            <div
              key={group.title}
              className={`${styles.qGroup} ${styles.reveal}`}
            >
              <div className={styles.qGroupTitle}>{group.title}</div>
              <ul className={styles.qList}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className={styles.ctaSection}>
        <div className={styles.ctaBgHanja} aria-hidden="true">
          命
        </div>
        <div className={`${styles.ctaEyebrow} ${styles.reveal}`}>
          무료로 이용 가능합니다
        </div>
        <h2 className={`${styles.ctaTitle} ${styles.reveal}`}>
          당신의 사주를 AI에게
          <br />
          물어보세요
        </h2>
        <p className={`${styles.ctaDesc} ${styles.reveal}`}>
          회원가입 후 바로 무료로 이용할 수 있습니다.
        </p>
        <div className={`${styles.ctaActions} ${styles.reveal}`}>
          <a
            href="https://phrygia-saju-talk-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            SAJU TALK 시작하기 →
          </a>
          <Link
            href="https://phrygia-saju-talk-web-z888.vercel.app/"
            className={styles.btnGhost}
          >
            Storybook 보기
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.footerGem}>✦</div>
          <Logo className={styles.footerName} />
        </div>
        <div className={styles.footerMeta}>
          © 2025 SAJU TALK · AI 사주 대화 서비스 · Powered by Google Gemini
        </div>
        <div className={styles.footerLinks}>
          <a
            href="https://phrygia-saju-talk-web.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
          <a
            href="https://phrygia-saju-talk-web-z888.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storybook
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
