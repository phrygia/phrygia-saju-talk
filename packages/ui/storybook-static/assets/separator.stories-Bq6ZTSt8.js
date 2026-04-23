import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./iframe-Yg9qg-gU.js";import{n,r,t as i}from"./jsx-runtime-DLNnHJc0.js";function a({orientation:e=`horizontal`,className:t,...r}){return(0,o.jsx)(`div`,{role:`separator`,className:n(`shrink-0 bg-border`,e===`horizontal`?`h-px w-full`:`h-full w-px`,t),...r})}var o,s=e((()=>{t(),r(),o=i(),a.__docgenInfo={description:``,methods:[],displayName:`Separator`,props:{orientation:{required:!1,tsType:{name:`union`,raw:`"horizontal" | "vertical"`,elements:[{name:`literal`,value:`"horizontal"`},{name:`literal`,value:`"vertical"`}]},description:``,defaultValue:{value:`"horizontal"`,computed:!1}}}}})),c,l,u,d,f,p;e((()=>{s(),c=i(),l={title:`Components/Separator`,component:a,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,c.jsx)(`div`,{style:{width:320,padding:16},children:(0,c.jsx)(e,{})})]},u={},d={render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,height:40,alignItems:`center`,gap:16},children:[(0,c.jsx)(`span`,{className:`text-sm`,children:`항목 1`}),(0,c.jsx)(a,{orientation:`vertical`}),(0,c.jsx)(`span`,{className:`text-sm`,children:`항목 2`}),(0,c.jsx)(a,{orientation:`vertical`}),(0,c.jsx)(`span`,{className:`text-sm`,children:`항목 3`})]})},f={render:()=>(0,c.jsxs)(`div`,{style:{width:320},children:[(0,c.jsx)(`p`,{className:`text-sm font-medium`,children:`위 섹션`}),(0,c.jsx)(a,{className:`my-4`}),(0,c.jsx)(`p`,{className:`text-sm font-medium`,children:`아래 섹션`})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    height: 40,
    alignItems: "center",
    gap: 16
  }}>
      <span className="text-sm">항목 1</span>
      <Separator orientation="vertical" />
      <span className="text-sm">항목 2</span>
      <Separator orientation="vertical" />
      <span className="text-sm">항목 3</span>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 320
  }}>
      <p className="text-sm font-medium">위 섹션</p>
      <Separator className="my-4" />
      <p className="text-sm font-medium">아래 섹션</p>
    </div>
}`,...f.parameters?.docs?.source}}},p=[`Horizontal`,`Vertical`,`WithContent`]}))();export{u as Horizontal,d as Vertical,f as WithContent,p as __namedExportsOrder,l as default};