import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Yg9qg-gU.js";import{t as r}from"./react-dom-BaBI0Nqu.js";import{n as i,r as a,t as o}from"./jsx-runtime-DLNnHJc0.js";import{n as s,t as c}from"./lucide-react-CJEnNX4S.js";var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=t((()=>{l=`_overlay_ft5k2_19`,u=`_modalOverlayIn_ft5k2_1`,d=`_box_ft5k2_28`,f=`_modalIn_ft5k2_1`,p=`_closeBtn_ft5k2_53`,m=`_iconBadge_ft5k2_82`,h=`_header_ft5k2_101`,g=`_title_ft5k2_106`,_=`_subtitle_ft5k2_114`,v=`_footer_ft5k2_121`,y=`_footerSingle_ft5k2_127`,b=`_btnPrimary_ft5k2_131`,x=`_btnGhost_ft5k2_149`,S=`_btnDanger_ft5k2_165`,C=`_btnFull_ft5k2_181`,w={overlay:l,modalOverlayIn:u,box:d,modalIn:f,closeBtn:p,iconBadge:m,header:h,title:g,subtitle:_,footer:v,footerSingle:y,btnPrimary:b,btnGhost:x,btnDanger:S,btnFull:C}}));function E({isOpen:e,onClose:t,title:n,subtitle:r,icon:a,children:o,footer:c,closeOnOverlayClick:l=!0,closeOnEsc:u=!0,lockScroll:d=!0,hideTopCloseButton:f=!1,className:p,contentClassName:m}){let[h,g]=(0,D.useState)(!1);if((0,D.useEffect)(()=>{g(!0)},[]),(0,D.useEffect)(()=>{if(!e||!u)return;let n=e=>{e.key===`Escape`&&t()};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[e,u,t]),(0,D.useEffect)(()=>{if(!e||!d)return;let t=document.body.style.overflow;return document.body.style.overflow=`hidden`,()=>{document.body.style.overflow=t}},[e,d]),!h||!e)return null;let _=a||n||r;return(0,O.createPortal)((0,k.jsx)(`div`,{className:i(`fixed inset-0 z-50 flex items-center justify-center p-4`,w.overlay,p),role:`presentation`,onClick:()=>{l&&t()},children:(0,k.jsxs)(`div`,{role:`dialog`,"aria-modal":`true`,"aria-label":typeof n==`string`?n:`Modal`,className:i(w.box,`relative`,m),onClick:e=>e.stopPropagation(),children:[!f&&(0,k.jsx)(`button`,{type:`button`,onClick:t,className:w.closeBtn,"aria-label":`닫기`,children:(0,k.jsx)(s,{strokeWidth:1.8,size:16})}),_&&(0,k.jsxs)(`div`,{className:w.header,children:[a&&(0,k.jsx)(`div`,{className:w.iconBadge,children:a}),n&&(0,k.jsx)(`h2`,{className:w.title,children:n}),r&&(0,k.jsx)(`p`,{className:w.subtitle,children:r})]}),o&&(0,k.jsx)(`div`,{children:o}),c&&(0,k.jsx)(`div`,{className:w.footer,children:c})]})}),document.body)}var D,O,k,A=t((()=>{D=e(n()),O=e(r()),c(),a(),T(),k=o()}));function j({label:e,options:t,required:n}){let[r,i]=(0,F.useState)(null);return(0,I.jsxs)(`div`,{style:{marginBottom:20},children:[(0,I.jsxs)(`div`,{style:{fontSize:11,fontWeight:600,color:`var(--foreground-sub)`,letterSpacing:`0.08em`,marginBottom:8,display:`flex`,gap:4},children:[e,n&&(0,I.jsx)(`span`,{style:{color:`#f87171`,fontSize:11},children:`*`})]}),(0,I.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(${t.length}, 1fr)`,gap:8},children:t.map(e=>(0,I.jsx)(`button`,{type:`button`,onClick:()=>i(e),style:{padding:`11px 10px`,borderRadius:12,border:`1px solid ${r===e?`rgba(124,92,252,0.5)`:`rgba(124,92,252,0.18)`}`,background:r===e?`linear-gradient(135deg,rgba(99,102,241,0.25),rgba(124,92,252,0.2))`:`rgba(124,92,252,0.06)`,color:r===e?`var(--violet)`:`var(--foreground-sub)`,fontSize:13,cursor:`pointer`,fontFamily:`'Noto Sans KR', sans-serif`,fontWeight:r===e?600:400,transition:`all 0.18s`,boxShadow:r===e?`0 0 12px rgba(124,92,252,0.15)`:`none`},children:e},e))})]})}function M({label:e,options:t,required:n}){return(0,I.jsxs)(`div`,{style:{marginBottom:20},children:[(0,I.jsxs)(`div`,{style:{fontSize:11,fontWeight:600,color:`var(--foreground-sub)`,letterSpacing:`0.08em`,marginBottom:8,display:`flex`,gap:4},children:[e,n&&(0,I.jsx)(`span`,{style:{color:`#f87171`,fontSize:11},children:`*`})]}),(0,I.jsx)(`select`,{style:{width:`100%`,padding:`11px 14px`,borderRadius:12,border:`1px solid rgba(124,92,252,0.18)`,background:`rgba(124,92,252,0.06)`,color:`var(--foreground-sub)`,fontSize:13,fontFamily:`'Noto Sans KR', sans-serif`,outline:`none`,cursor:`pointer`},children:t.map(e=>(0,I.jsx)(`option`,{style:{background:`#100d38`},children:e},e))})]})}function N(e){let[t,n]=(0,F.useState)(!1);return(0,I.jsxs)(`div`,{style:{minHeight:`100vh`,padding:24,background:`var(--background)`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:[(0,I.jsx)(`button`,{type:`button`,onClick:()=>n(!0),style:{padding:`10px 22px`,borderRadius:12,border:`1px solid rgba(124,92,252,0.3)`,background:`rgba(124,92,252,0.12)`,color:`var(--foreground)`,fontSize:14,cursor:`pointer`,fontFamily:`'Noto Sans KR', sans-serif`},children:`모달 열기`}),(0,I.jsx)(E,{...e,isOpen:t,onClose:()=>n(!1)})]})}function P(){let[e,t]=(0,F.useState)(!1);return(0,I.jsxs)(`div`,{style:{minHeight:`100vh`,padding:24,background:`var(--background)`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:[(0,I.jsx)(`button`,{type:`button`,onClick:()=>t(!0),style:{padding:`10px 22px`,borderRadius:12,border:`1px solid rgba(124,92,252,0.3)`,background:`rgba(124,92,252,0.12)`,color:`var(--foreground)`,fontSize:14,cursor:`pointer`,fontFamily:`'Noto Sans KR', sans-serif`},children:`사주 정보 입력`}),(0,I.jsxs)(E,{isOpen:e,onClose:()=>t(!1),icon:`☯`,title:`사주 정보 입력`,subtitle:`정확한 운세 분석을 위해 생년월일시를 입력해주세요`,footer:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`button`,{type:`button`,className:w.btnPrimary,onClick:()=>t(!1),children:`저장하기`}),(0,I.jsx)(`button`,{type:`button`,className:w.btnDanger,onClick:()=>t(!1),children:`삭제하기`})]}),children:[(0,I.jsx)(j,{label:`성별`,options:[`남성 ♂`,`여성 ♀`],required:!0}),(0,I.jsx)(j,{label:`달력 유형`,options:[`양력`,`음력`],required:!0}),(0,I.jsx)(M,{label:`출생년도`,options:[`1990년`,`1991년`,`1992년`,`1993년`,`1994년`,`1995년`],required:!0}),(0,I.jsx)(M,{label:`출생월`,options:[`1월`,`2월`,`3월`,`4월`,`5월`,`6월`,`7월`,`8월`,`9월`,`10월`,`11월`,`12월`],required:!0}),(0,I.jsx)(M,{label:`출생일`,options:Array.from({length:31},(e,t)=>`${t+1}일`),required:!0}),(0,I.jsx)(j,{label:`태어난 시간을 알고 계신가요?`,options:[`알아요`,`모르겠어요`]})]})]})}var F,I,L,R,z,B,V;t((()=>{F=e(n()),A(),I=o(),L={title:`Components/Modal`,component:E,parameters:{layout:`fullscreen`},tags:[`autodocs`]},R={args:{title:`기본 모달`,subtitle:`서브타이틀을 여기에 입력하세요`,icon:`✦`,closeOnOverlayClick:!0,closeOnEsc:!0,lockScroll:!0,hideTopCloseButton:!1},render:e=>(0,I.jsx)(N,{...e,footer:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`button`,{type:`button`,className:w.btnGhost,children:`취소`}),(0,I.jsx)(`button`,{type:`button`,className:w.btnPrimary,children:`확인`})]}),children:(0,I.jsx)(`p`,{style:{fontSize:14,lineHeight:1.7,color:`var(--foreground-sub)`,fontFamily:`'Noto Sans KR', sans-serif`},children:`전역 포털 방식으로 렌더링되는 기본 모달입니다. Esc, 오버레이 클릭으로 닫을 수 있습니다.`})})},z={args:{title:`필수 확인 모달`,subtitle:`이 작업은 되돌릴 수 없습니다`,icon:`⚠️`,closeOnOverlayClick:!1,closeOnEsc:!1,lockScroll:!0,hideTopCloseButton:!1},render:e=>(0,I.jsx)(N,{...e,footer:(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(`button`,{type:`button`,className:w.btnGhost,children:`취소`}),(0,I.jsx)(`button`,{type:`button`,className:w.btnDanger,children:`확인`})]}),children:(0,I.jsx)(`p`,{style:{fontSize:14,lineHeight:1.7,color:`var(--foreground-sub)`,fontFamily:`'Noto Sans KR', sans-serif`},children:`오버레이 클릭과 Esc 키로 닫히지 않는 모달입니다. 버튼을 통해서만 닫을 수 있습니다.`})})},B={name:`사주정보 입력`,render:()=>(0,I.jsx)(P,{})},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    title: "기본 모달",
    subtitle: "서브타이틀을 여기에 입력하세요",
    icon: "✦",
    closeOnOverlayClick: true,
    closeOnEsc: true,
    lockScroll: true,
    hideTopCloseButton: false
  },
  render: args => <DemoModal {...args} footer={<>
          <button type="button" className={modalStyles.btnGhost}>
            취소
          </button>
          <button type="button" className={modalStyles.btnPrimary}>
            확인
          </button>
        </>}>
      <p style={{
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--foreground-sub)",
      fontFamily: "'Noto Sans KR', sans-serif"
    }}>
        전역 포털 방식으로 렌더링되는 기본 모달입니다. Esc, 오버레이 클릭으로
        닫을 수 있습니다.
      </p>
    </DemoModal>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    title: "필수 확인 모달",
    subtitle: "이 작업은 되돌릴 수 없습니다",
    icon: "⚠️",
    closeOnOverlayClick: false,
    closeOnEsc: false,
    lockScroll: true,
    hideTopCloseButton: false
  },
  render: args => <DemoModal {...args} footer={<>
          <button type="button" className={modalStyles.btnGhost}>
            취소
          </button>
          <button type="button" className={modalStyles.btnDanger}>
            확인
          </button>
        </>}>
      <p style={{
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--foreground-sub)",
      fontFamily: "'Noto Sans KR', sans-serif"
    }}>
        오버레이 클릭과 Esc 키로 닫히지 않는 모달입니다. 버튼을 통해서만 닫을 수
        있습니다.
      </p>
    </DemoModal>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: "사주정보 입력",
  render: () => <SajuInfoModal />
}`,...B.parameters?.docs?.source}}},V=[`Default`,`Persistent`,`SajuInfo`]}))();export{R as Default,z as Persistent,B as SajuInfo,V as __namedExportsOrder,L as default};