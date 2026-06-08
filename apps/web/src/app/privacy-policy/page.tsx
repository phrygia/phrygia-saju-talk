import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | SAJU TALK",
  description: "SAJU TALK 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold text-foreground">
            개인정보처리방침
          </h1>
          <p className="text-sm text-foreground-sub">
            시행일자: 2026년 6월 8일 &nbsp;|&nbsp; 버전: 1.0
          </p>
        </div>

        <div className="space-y-12 text-foreground-sub">
          {/* 1. 개인정보의 처리 목적 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              1. 개인정보의 처리 목적
            </h2>
            <p className="mb-3">
              SAJU TALK(이하 &quot;회사&quot;)는 다음의 목적을 위해 개인정보를
              처리합니다. 처리한 개인정보는 다음 목적 이외의 용도로는 사용되지
              않으며, 이용 목적이 변경될 경우 별도 동의를 받겠습니다.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>서비스 제공:</strong> 사주 정보 등록, AI 사주 대화
                서비스 제공
              </li>
              <li>
                <strong>회원 관리:</strong> 회원 인증, 계정 관리, 서비스 이용
                기록 관리
              </li>
              <li>
                <strong>서비스 개선:</strong> 이용자 행동 분석을 통한 서비스
                품질 향상
              </li>
              <li>
                <strong>광고 서비스:</strong> Google AdMob을 통한 맞춤형 광고
                제공
              </li>
            </ul>
          </section>

          {/* 2. 처리하는 개인정보의 종류 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              2. 처리하는 개인정보의 항목
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-foreground">
                  회원가입 및 인증 시 (필수):
                </h3>
                <ul className="list-disc space-y-1 pl-6">
                  <li>이메일 주소</li>
                  <li>비밀번호 (암호화 저장)</li>
                  <li>이름 (선택)</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">
                  서비스 이용 시:
                </h3>
                <ul className="list-disc space-y-1 pl-6">
                  <li>사주 정보 (생년월일, 생시 등)</li>
                  <li>사주 분석 결과 및 대화 내용</li>
                  <li>서비스 이용 기록 및 로그</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">
                  자동 수집 정보:
                </h3>
                <ul className="list-disc space-y-1 pl-6">
                  <li>IP 주소</li>
                  <li>기기 정보 (OS, 브라우저 종류 및 버전, 기기 모델)</li>
                  <li>쿠키 및 유사 추적 기술</li>
                  <li>광고 식별자 (IDFA/AAID, 광고 맞춤화 동의 시)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 개인정보 처리 및 보유 기간 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              3. 개인정보의 처리 및 보유 기간
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>회원정보:</strong> 회원 탈퇴 시까지 (탈퇴 후 30일 이내
                파기)
              </li>
              <li>
                <strong>사주 이용 기록:</strong> 서비스 종료 또는 탈퇴 시까지
              </li>
              <li>
                <strong>서비스 접속 로그:</strong> 3개월
              </li>
              <li>
                <strong>전자상거래 관련 기록:</strong> 전자상거래 등에서의
                소비자보호에 관한 법률에 따라 5년 보관
              </li>
            </ul>
          </section>

          {/* 4. 개인정보의 파기 절차 및 방법 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              4. 개인정보의 파기 절차 및 방법
            </h2>
            <p className="mb-3">
              회사는 개인정보 보유 기간의 경과 또는 처리 목적 달성 후에는 지체
              없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>파기 절차:</strong> 파기 사유가 발생한 개인정보를
                선정하고, 개인정보 보호책임자의 승인을 받아 파기합니다.
              </li>
              <li>
                <strong>전자파일 형태:</strong> 복구 및 재생이 불가능한 방법으로
                영구 삭제
              </li>
              <li>
                <strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각하여 파기
              </li>
            </ul>
          </section>

          {/* 5. 개인정보의 제3자 제공 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              5. 개인정보의 제3자 제공
            </h2>
            <p className="mb-3">
              회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
              다만, 다음의 경우는 예외입니다:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>이용자가 사전에 동의한 경우</li>
              <li>
                법령에서 명시하거나 수사 목적으로 법령이 정한 절차와 방법에 따라
                수사기관의 요구가 있는 경우
              </li>
            </ul>
          </section>

          {/* 6. 개인정보 처리 위탁 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              6. 개인정보 처리 위탁
            </h2>
            <p className="mb-4">
              회사는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 외부에
              위탁하고 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="border border-border px-4 py-2 text-left font-medium text-primary">
                      수탁업체
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-medium text-primary">
                      위탁 업무
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-medium text-primary">
                      보유 및 이용 기간
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      Supabase Inc.
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      데이터베이스 저장, 회원 인증
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      회원 탈퇴 시 또는 위탁 계약 종료 시
                    </td>
                  </tr>
                  <tr className="bg-background-sub">
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      Google LLC
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      AI 분석 (Gemini API)
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      위탁 계약 종료 시
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      Google LLC (AdMob)
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      광고 서비스 제공, 광고 식별자 수집
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      Google AdMob 정책에 따름
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-foreground-muted">
              ※ 위 수탁업체의 서버는 미국 및 해외에 소재하며, 개인정보의 국외
              이전이 발생합니다. 각 업체의 개인정보처리방침에 따라 보호됩니다.
            </p>
          </section>

          {/* 7. 개인정보의 국외 이전 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              7. 개인정보의 국외 이전
            </h2>
            <p className="mb-3">
              회사는 서비스 제공을 위해 이용자의 개인정보를 국외로 이전합니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="border border-border px-4 py-2 text-left font-medium text-primary">
                      이전받는 자
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-medium text-primary">
                      국가
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-medium text-primary">
                      이전 항목
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-medium text-primary">
                      목적
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      Supabase Inc.
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      미국
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      이메일, 사주 정보
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      데이터 저장 및 인증
                    </td>
                  </tr>
                  <tr className="bg-background-sub">
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      Google LLC
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      미국
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      사주 대화 내용, 기기 정보
                    </td>
                    <td className="border border-border px-4 py-2 text-foreground-sub">
                      AI 분석, 광고 서비스
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 8. 쿠키 정책 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              8. 쿠키(Cookie) 운영 및 거부
            </h2>
            <div className="space-y-3">
              <p>
                회사는 이용자에게 맞춤형 서비스를 제공하기 위해 쿠키(cookie)를
                사용합니다.
              </p>
              <div>
                <h3 className="mb-2 font-medium text-foreground">쿠키란?</h3>
                <p>
                  웹사이트가 이용자의 컴퓨터 브라우저에 저장하는 소량의 정보
                  파일로, 이용자의 브라우저 유형, 접속 패턴 등을 저장합니다.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">
                  쿠키 사용 목적:
                </h3>
                <ul className="list-disc space-y-1 pl-6">
                  <li>로그인 상태 유지</li>
                  <li>이용자 이용 패턴 분석 및 서비스 개선</li>
                  <li>맞춤형 광고 제공</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">
                  쿠키 거부 방법:
                </h3>
                <p className="mb-2">
                  이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
                  단, 쿠키 거부 시 일부 서비스 이용에 불편함이 있을 수 있습니다.
                </p>
                <ul className="list-disc space-y-1 pl-6 text-sm text-foreground-muted">
                  <li>
                    Chrome: 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터
                  </li>
                  <li>
                    Safari: 설정 → Safari → 개인정보 보호 → 크로스 사이트 추적
                    방지
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 9. 앱 추적 투명성 (iOS ATT) */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              9. 앱 추적 투명성 (iOS)
            </h2>
            <p className="mb-3">
              iOS 앱 이용 시, 애플의 앱 추적 투명성(ATT) 정책에 따라 맞춤형 광고
              제공을 위한 기기 추적 동의를 별도로 요청합니다.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>추적 허용 시:</strong> 광고 식별자(IDFA)를 활용한 맞춤형
                광고가 제공됩니다.
              </li>
              <li>
                <strong>추적 거부 시:</strong> 맞춤형 광고 대신 일반 광고가
                제공되며, 서비스 이용에는 지장이 없습니다.
              </li>
              <li>
                이후 iOS 기기의 설정 → 개인 정보 보호 및 보안 → 추적에서
                언제든지 변경할 수 있습니다.
              </li>
            </ul>
          </section>

          {/* 10. 정보주체의 권리 및 행사 방법 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              10. 정보주체의 권리 및 행사 방법
            </h2>
            <p className="mb-3">
              이용자는 다음의 권리를 언제든지 행사할 수 있습니다:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>열람 요구:</strong> 본인의 개인정보 처리 현황 열람
              </li>
              <li>
                <strong>정정·삭제 요구:</strong> 오류가 있는 개인정보의 정정
                또는 삭제
              </li>
              <li>
                <strong>처리 정지 요구:</strong> 개인정보의 처리 정지
              </li>
              <li>
                <strong>동의 철회:</strong> 서비스 탈퇴를 통한 개인정보 처리
                동의 철회
              </li>
            </ul>
            <p className="mt-3">
              권리 행사는{" "}
              <a
                href="mailto:support@sajutalk.com"
                className="text-primary underline hover:text-primary-hover transition-colors"
              >
                support@sajutalk.com
              </a>
              으로 요청하시면 지체 없이 처리하겠습니다.
            </p>
          </section>

          {/* 11. 만 14세 미만 아동 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              11. 만 14세 미만 아동의 개인정보
            </h2>
            <p>
              당 서비스는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 만
              14세 미만의 경우 서비스 이용이 제한됩니다. 만 14세 미만 아동의
              개인정보가 수집된 사실을 발견한 경우, 즉시{" "}
              <a
                href="mailto:support@sajutalk.com"
                className="text-primary underline hover:text-primary-hover transition-colors"
              >
                support@sajutalk.com
              </a>
              으로 알려주시기 바랍니다.
            </p>
          </section>

          {/* 12. 안전성 확보 조치 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              12. 개인정보의 안전성 확보 조치
            </h2>
            <p className="mb-3">
              회사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를
              취하고 있습니다:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>관리적 조치:</strong> 개인정보 처리 직원 최소화 및 정기
                교육
              </li>
              <li>
                <strong>기술적 조치:</strong> 개인정보 처리 시스템 접근 권한
                관리, HTTPS 암호화 통신, 비밀번호 단방향 암호화 저장
              </li>
              <li>
                <strong>물리적 조치:</strong> 전산실 및 자료 보관실 접근 통제
              </li>
            </ul>
          </section>

          {/* 13. 개인정보 보호책임자 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              13. 개인정보 보호책임자
            </h2>
            <p className="mb-3">
              회사는 개인정보 처리에 관한 업무를 총괄하고, 개인정보 처리와
              관련한 이용자의 불만 처리 및 피해 구제를 위해 아래와 같이 개인정보
              보호책임자를 지정하고 있습니다.
            </p>
            <div className="rounded-lg bg-surface border border-border p-4 text-sm space-y-1">
              <p className="text-foreground">
                <strong>성명:</strong> 이채연
              </p>
              <p className="text-foreground">
                <strong>직책:</strong> 개인정보 보호책임자
              </p>
              <p className="text-foreground">
                <strong>이메일:</strong>{" "}
                <a
                  href="mailto:dmsgp62@gmail.com"
                  className="text-primary underline hover:text-primary-hover transition-colors"
                >
                  dmsgp62@gmail.com
                </a>
              </p>
            </div>
            <p className="mt-3 text-sm text-foreground-sub">
              개인정보 보호 관련 문의, 불만 처리, 피해 구제 등에 관한 사항은
              개인정보 보호책임자에게 문의하시기 바랍니다.
            </p>
          </section>

          {/* 14. 권익 침해 구제 방법 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              14. 개인정보 침해 신고 및 구제
            </h2>
            <p className="mb-3">
              이용자는 개인정보 침해로 인한 구제를 받기 위해 아래 기관에 신고
              또는 상담을 신청할 수 있습니다.
            </p>
            <ul className="space-y-3">
              <li className="rounded-lg border border-border bg-surface/50 p-3 hover:bg-surface transition-colors">
                <p className="font-medium text-foreground">
                  개인정보 침해신고센터 (한국인터넷진흥원)
                </p>
                <p className="text-sm text-gray-600">
                  privacy.kisa.or.kr &nbsp;|&nbsp; 국번없이 118
                </p>
              </li>
              <li className="rounded-lg border border-border bg-surface/50 p-3 hover:bg-surface transition-colors">
                <p className="font-medium text-foreground">
                  개인정보 분쟁조정위원회
                </p>
                <p className="text-sm text-gray-600">
                  www.kopico.go.kr &nbsp;|&nbsp; 1833-6972
                </p>
              </li>
              <li className="rounded-lg border border-border bg-surface/50 p-3 hover:bg-surface transition-colors">
                <p className="font-medium text-foreground">
                  대검찰청 사이버수사과
                </p>
                <p className="text-sm text-gray-600">
                  www.spo.go.kr &nbsp;|&nbsp; 국번없이 1301
                </p>
              </li>
              <li className="rounded-lg border border-border bg-surface/50 p-3 hover:bg-surface transition-colors">
                <p className="font-medium text-foreground">
                  경찰청 사이버수사국
                </p>
                <p className="text-sm text-gray-600">
                  ecrm.cyber.go.kr &nbsp;|&nbsp; 182
                </p>
              </li>
            </ul>
          </section>

          {/* 15. 개인정보처리방침 변경 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              15. 개인정보처리방침의 변경
            </h2>
            <p>
              본 개인정보처리방침은 법령의 변경이나 서비스 개선에 따라 변경될 수
              있습니다. 변경 시 시행 7일 전부터 앱 내 공지사항 또는 웹사이트를
              통해 사전 공지하겠습니다. 다만, 이용자 권리에 중대한 변경이 발생할
              경우 30일 전에 공지합니다.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-foreground-muted">
          <p>공고일: 2026년 6월 1일 &nbsp;|&nbsp; 시행일: 2026년 6월 8일</p>
          <p className="mt-1">© 2026 SAJU TALK. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
