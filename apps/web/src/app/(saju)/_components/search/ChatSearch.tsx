"use client";

import { Suspense, useState } from "react";
import { useSearchHistory } from "@/src/app/(saju)/_hooks/useSearchHistory";
import ChatHeader from "@/src/app/(saju)/_components/layout/ChatHeader";
import ChatSearchResult from "@/src/app/(saju)/_components/search/ChatSearchResult";
import { Skeleton } from "@repo/ui/components/skeleton";
import styles from "./ChatSearch.module.scss";

function SearchResultsFallback() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-xs text-foreground-muted flex items-center">
          <Skeleton className="h-[16px] w-[8px]" />
          개의 상담 내역
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="h-[21px] w-[46px] rounded-[7px]" />
          <Skeleton className="h-[21px] w-[56px] rounded-[7px]" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="w-full">
            <Skeleton className="h-[88px] rounded-[12px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChatSearch() {
  const { history, addHistory, removeHistory, clearHistory } =
    useSearchHistory();
  const [input, setInput] = useState<string>("");
  const [submittedKeyword, setSubmittedKeyword] = useState<string>("");

  const handleSearch = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    addHistory(trimmed);
    setSubmittedKeyword(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSearch(input);
  };

  return (
    <>
      <ChatHeader title="상담 검색" />
      <div className={styles.wrapper}>
        <div>
          <p className="text-violet text-[11px]">S E A R C H · 상담 검색</p>
          <h2 className="font-serif-kr font-medium text-[24px] mt-2.5 mb-2">
            상담 내역 검색
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchBox}>
            <div className={styles.icon}>🔍</div>
            <input
              value={input}
              placeholder="키워드로 상담 내역을 검색하세요... (최소 2자)"
              className={styles.input}
              minLength={2}
              onChange={(e) => setInput(e.target.value)}
            />
            {input.length > 0 && (
              <>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => {
                    setInput("");
                    setSubmittedKeyword("");
                  }}
                >
                  ✕
                </button>
              </>
            )}
            <button
              type="submit"
              className={styles.searchButton}
              disabled={!input.trim()}
            >
              검색
            </button>
          </div>
        </form>
        {submittedKeyword ? (
          <Suspense fallback={<SearchResultsFallback />}>
            <ChatSearchResult keyword={submittedKeyword} />
          </Suspense>
        ) : (
          <>
            {history.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5 text-[10.5px] text-foreground-muted">
                  <span>최근 검색어</span>
                  <button type="button" onClick={clearHistory}>
                    전체 삭제
                  </button>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {history.map((keyword) => (
                    <li key={keyword} className={styles.chip}>
                      <button
                        type="button"
                        className={styles.chipButton}
                        onClick={() => {
                          setInput(keyword);
                          handleSearch(keyword);
                        }}
                      >
                        {keyword}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeHistory(keyword)}
                        className={styles.chipClearButton}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.emptyBox}>
              <div className={styles.emptyIcon}>🔍</div>
              <div className={styles.emptyTitle}>어떤 상담을 찾고 계세요?</div>
              <div className={styles.emptySubTitle}>
                메시지 내용으로 상담 내역을 검색해요
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
