import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Yg9qg-gU.js";import{n as r,r as i,t as a}from"./jsx-runtime-DLNnHJc0.js";import{n as o,t as s}from"./dist-DcruuJki.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S=t((()=>{c=`_button_7qo4r_1`,l=`_secondary_7qo4r_33`,u=`_gold_7qo4r_45`,d=`_ghost_7qo4r_53`,f=`_sm_7qo4r_66`,p=`_lg_7qo4r_73`,m=`_fullWidth_7qo4r_80`,h=`_particle_7qo4r_98`,g=`_starBurstPop_7qo4r_1`,_=`_particleSm_7qo4r_108`,v=`_starBurstPopSm_7qo4r_1`,y=`_particleLg_7qo4r_129`,b=`_starBurstPopLg_7qo4r_1`,x={button:c,secondary:l,gold:u,ghost:d,sm:f,lg:p,fullWidth:m,particle:h,starBurstPop:g,particleSm:_,starBurstPopSm:v,particleLg:y,starBurstPopLg:b}}));function C({className:e,variant:t=`default`,size:n=`default`,fullWidth:i,particleCount:a=O,onClick:o,children:s,disabled:c,...l}){let[u,d]=w.useState([]),f=w.useRef(0),p=r(x.particle,n===`sm`&&x.particleSm,n===`lg`&&x.particleLg),m=D[t??`default`]??D.default,h=w.useCallback(e=>{if(c)return;let t=e.currentTarget.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=Array.from({length:a},(e,t)=>{let i=t/a*Math.PI*2,o=20+Math.random()*18;return{id:++f.current,x:n+Math.cos(i)*o,y:r+Math.sin(i)*o,symbol:E[Math.floor(Math.random()*E.length)]??`✦`,color:m[Math.floor(Math.random()*m.length)]??`#a78bfa`}});d(e=>[...e,...i]);let o=new Set(i.map(e=>e.id));setTimeout(()=>{d(e=>e.filter(e=>!o.has(e.id)))},750)},[c,a,m]);return(0,T.jsxs)(`button`,{disabled:c,className:r(`outline-none`,k({variant:t,size:n,fullWidth:i,className:e})),onMouseEnter:h,onClick:e=>{o&&o?.(e)},...l,children:[s,u.map(e=>(0,T.jsx)(`span`,{"aria-hidden":`true`,className:p,style:{left:e.x,top:e.y,color:e.color},children:e.symbol},e.id))]})}var w,T,E,D,O,k,A=t((()=>{w=e(n()),o(),i(),S(),T=a(),E=[`✦`,`✧`,`★`,`·`,`*`,`✶`],D={default:[`#a78bfa`,`#c4b5fd`,`#f0c060`,`#e0d0ff`],secondary:[`#a78bfa`,`#c4b5fd`,`#f0c060`,`#7c5cfc`],gold:[`#f0c060`,`#fbbf24`,`#fde68a`,`#d97706`],ghost:[`#a78bfa`,`#c4b5fd`,`#e0d0ff`,`#f0c060`]},O=8,k=s(x.button,{variants:{variant:{default:``,secondary:x.secondary,gold:x.gold,ghost:x.ghost},size:{default:``,sm:x.sm,lg:x.lg},fullWidth:{true:x.fullWidth,false:``}},defaultVariants:{variant:`default`,size:`default`,fullWidth:!1}}),C.displayName=`StarBurstButton`,C.__docgenInfo={description:``,methods:[],displayName:`StarBurstButton`,props:{particleCount:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`8`,computed:!1}},variant:{defaultValue:{value:`"default"`,computed:!1},required:!1},size:{defaultValue:{value:`"default"`,computed:!1},required:!1}},composes:[`VariantProps`]}})),j,M,N,P,F,I,L,R,z,B,V,H,U;t((()=>{A(),j=a(),M={title:`Components/StarBurstButton`,component:C,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`default`,`secondary`,`gold`,`ghost`],description:`버튼 스타일 변형`},size:{control:`select`,options:[`sm`,`default`,`lg`],description:`버튼 크기`},fullWidth:{control:`boolean`,description:`전체 너비`},particleCount:{control:{type:`range`,min:4,max:16,step:1},description:`클릭 시 생성되는 별 파티클 수`},disabled:{control:`boolean`,description:`비활성화 (파티클 효과도 비활성화됨)`},children:{control:`text`,description:`버튼 레이블`}}},N={args:{children:`✦ 운세 보기`,variant:`default`,size:`default`,particleCount:8}},P={args:{children:`✦ 새 상담`,variant:`default`,size:`sm`,particleCount:6}},F={args:{children:`✦ 사주 상담 시작하기`,variant:`default`,size:`lg`,particleCount:10}},I={args:{children:`사주 원국 보기`,variant:`secondary`,size:`default`,particleCount:8}},L={args:{children:`✦ 오늘의 운세`,variant:`gold`,size:`default`,particleCount:8}},R={args:{children:`더 보기`,variant:`ghost`,size:`default`,particleCount:8}},z={args:{children:`사주 정보 없음`,variant:`default`,size:`default`,disabled:!0}},B={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,alignItems:`center`},children:[(0,j.jsx)(`p`,{style:{fontSize:11,letterSpacing:`0.18em`,textTransform:`uppercase`,color:`var(--muted, rgba(180,155,255,0.5))`,margin:0},children:`클릭해보세요 ✦`}),(0,j.jsxs)(`div`,{style:{display:`flex`,gap:12,flexWrap:`wrap`,justifyContent:`center`},children:[(0,j.jsx)(C,{variant:`default`,children:`✦ Default`}),(0,j.jsx)(C,{variant:`secondary`,children:`Secondary`}),(0,j.jsx)(C,{variant:`gold`,children:`✦ Gold`}),(0,j.jsx)(C,{variant:`ghost`,children:`Ghost`})]})]})},V={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`,flexWrap:`wrap`,justifyContent:`center`},children:[(0,j.jsx)(C,{size:`sm`,children:`✦ Small`}),(0,j.jsx)(C,{size:`default`,children:`✦ Default`}),(0,j.jsx)(C,{size:`lg`,children:`✦ Large`})]})},H={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:20,alignItems:`center`,minWidth:320},children:[(0,j.jsx)(C,{variant:`default`,size:`lg`,style:{width:240},children:`✦ 오늘의 운세 보기`}),(0,j.jsxs)(`div`,{style:{display:`flex`,gap:10},children:[(0,j.jsx)(C,{variant:`secondary`,size:`default`,children:`사주 원국 보기`}),(0,j.jsx)(C,{variant:`default`,size:`default`,children:`✦ 새 상담`})]}),(0,j.jsx)(C,{variant:`gold`,size:`default`,children:`✦ 운세 카드 저장`}),(0,j.jsx)(C,{variant:`ghost`,size:`sm`,particleCount:6,children:`더 보기`})]})},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    children: "✦ 운세 보기",
    variant: "default",
    size: "default",
    particleCount: 8
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    children: "✦ 새 상담",
    variant: "default",
    size: "sm",
    particleCount: 6
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    children: "✦ 사주 상담 시작하기",
    variant: "default",
    size: "lg",
    particleCount: 10
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    children: "사주 원국 보기",
    variant: "secondary",
    size: "default",
    particleCount: 8
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    children: "✦ 오늘의 운세",
    variant: "gold",
    size: "default",
    particleCount: 8
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    children: "더 보기",
    variant: "ghost",
    size: "default",
    particleCount: 8
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    children: "사주 정보 없음",
    variant: "default",
    size: "default",
    disabled: true
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 24,
    alignItems: "center"
  }}>
      <p style={{
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--muted, rgba(180,155,255,0.5))",
      margin: 0
    }}>
        클릭해보세요 ✦
      </p>
      <div style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
        <StarBurstButton variant="default">✦ Default</StarBurstButton>
        <StarBurstButton variant="secondary">Secondary</StarBurstButton>
        <StarBurstButton variant="gold">✦ Gold</StarBurstButton>
        <StarBurstButton variant="ghost">Ghost</StarBurstButton>
      </div>
    </div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center"
  }}>
      <StarBurstButton size="sm">✦ Small</StarBurstButton>
      <StarBurstButton size="default">✦ Default</StarBurstButton>
      <StarBurstButton size="lg">✦ Large</StarBurstButton>
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    minWidth: 320
  }}>
      <StarBurstButton variant="default" size="lg" style={{
      width: 240
    }}>
        ✦ 오늘의 운세 보기
      </StarBurstButton>
      <div style={{
      display: "flex",
      gap: 10
    }}>
        <StarBurstButton variant="secondary" size="default">
          사주 원국 보기
        </StarBurstButton>
        <StarBurstButton variant="default" size="default">
          ✦ 새 상담
        </StarBurstButton>
      </div>
      <StarBurstButton variant="gold" size="default">
        ✦ 운세 카드 저장
      </StarBurstButton>
      <StarBurstButton variant="ghost" size="sm" particleCount={6}>
        더 보기
      </StarBurstButton>
    </div>
}`,...H.parameters?.docs?.source}}},U=[`Default`,`Small`,`Large`,`Secondary`,`Gold`,`Ghost`,`Disabled`,`AllVariants`,`AllSizes`,`UseCases`]}))();export{V as AllSizes,B as AllVariants,N as Default,z as Disabled,R as Ghost,L as Gold,F as Large,I as Secondary,P as Small,H as UseCases,U as __namedExportsOrder,M as default};