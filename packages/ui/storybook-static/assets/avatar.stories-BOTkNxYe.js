import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Bu1cxcE_.js";import{n as r,r as i,t as a}from"./jsx-runtime-DLNnHJc0.js";function o({src:e,alt:t,fallback:n,size:i=`md`,className:a,...o}){let[u,d]=s.useState(!1);return(0,c.jsx)(`div`,{className:r(`relative flex shrink-0 overflow-hidden rounded-full bg-secondary`,l[i],a),...o,children:e&&!u?(0,c.jsx)(`img`,{src:e,alt:t??``,className:`h-full w-full object-cover`,onError:()=>d(!0)}):(0,c.jsx)(`span`,{className:`flex h-full w-full items-center justify-center font-medium text-secondary-foreground uppercase`,children:n?.slice(0,2)??`?`})})}var s,c,l,u=t((()=>{s=e(n()),i(),c=a(),l={sm:`h-8 w-8 text-xs`,md:`h-10 w-10 text-sm`,lg:`h-14 w-14 text-base`},o.__docgenInfo={description:``,methods:[],displayName:`Avatar`,props:{src:{required:!1,tsType:{name:`string`},description:``},alt:{required:!1,tsType:{name:`string`},description:``},fallback:{required:!1,tsType:{name:`string`},description:``},size:{required:!1,tsType:{name:`union`,raw:`"sm" | "md" | "lg"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`}]},description:``,defaultValue:{value:`"md"`,computed:!1}}}}})),d,f,p,m,h,g,_,v;t((()=>{u(),d=a(),f={title:`Components/Avatar`,component:o,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]}}},p={args:{fallback:`이채연`,size:`md`}},m={args:{fallback:`LC`,size:`sm`}},h={args:{fallback:`SajuTalk`,size:`lg`}},g={args:{src:`https://avatars.githubusercontent.com/u/1?v=4`,alt:`GitHub User`,size:`md`}},_={render:()=>(0,d.jsxs)(`div`,{style:{display:`flex`,gap:12,alignItems:`center`},children:[(0,d.jsx)(o,{fallback:`SM`,size:`sm`}),(0,d.jsx)(o,{fallback:`MD`,size:`md`}),(0,d.jsx)(o,{fallback:`LG`,size:`lg`})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    fallback: "이채연",
    size: "md"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    fallback: "LC",
    size: "sm"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    fallback: "SajuTalk",
    size: "lg"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://avatars.githubusercontent.com/u/1?v=4",
    alt: "GitHub User",
    size: "md"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 12,
    alignItems: "center"
  }}>
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
    </div>
}`,..._.parameters?.docs?.source}}},v=[`WithFallback`,`Small`,`Large`,`WithImage`,`AllSizes`]}))();export{_ as AllSizes,h as Large,m as Small,p as WithFallback,g as WithImage,v as __namedExportsOrder,f as default};