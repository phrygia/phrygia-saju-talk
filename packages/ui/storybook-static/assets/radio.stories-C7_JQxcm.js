import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Bu1cxcE_.js";import{n as r,r as i,t as a}from"./jsx-runtime-DLNnHJc0.js";import{n as o,t as s}from"./input.module-CWWO1p2H.js";var c,l,u,d,f,p,m,h,g,_,v,y,b=t((()=>{c=`_wrapper_t0zb2_1`,l=`_group_t0zb2_8`,u=`_vertical_t0zb2_13`,d=`_horizontal_t0zb2_17`,f=`_option_t0zb2_22`,p=`_input_t0zb2_26`,m=`_optionLabel_t0zb2_32`,h=`_indicator_t0zb2_50`,g=`_content_t0zb2_71`,_=`_text_t0zb2_77`,v=`_description_t0zb2_83`,y={wrapper:c,group:l,vertical:u,horizontal:d,option:f,input:p,optionLabel:m,indicator:h,content:g,text:_,description:v}})),x,S,C,w=t((()=>{x=e(n()),i(),s(),b(),S=a(),C=({className:e,name:t,options:n,label:i,labelRequired:a=!1,value:s,defaultValue:c,direction:l=`vertical`,onValueChange:u,disabled:d=!1,...f})=>{let p=x.useId(),[m,h]=x.useState(c??``),g=s??m,_=e=>{s===void 0&&h(e),u?.(e)};return(0,S.jsxs)(`fieldset`,{className:r(y.wrapper,e),disabled:d,...f,children:[i&&(0,S.jsxs)(`legend`,{className:o.label,children:[a&&(0,S.jsx)(`span`,{className:o.requiredMark,children:`*`}),i]}),(0,S.jsx)(`div`,{className:r(y.group,l===`horizontal`?y.horizontal:y.vertical),children:n.map(e=>{let n=e.value.replace(/\s+/g,`-`).toLowerCase(),r=`${t}-${p.replace(/:/g,``)}-${n}`,i=d||e.disabled;return(0,S.jsxs)(`div`,{className:y.option,children:[(0,S.jsx)(`input`,{id:r,className:y.input,type:`radio`,name:t,value:e.value,checked:g===e.value,onChange:()=>_(e.value),disabled:i}),(0,S.jsxs)(`label`,{htmlFor:r,className:y.optionLabel,children:[(0,S.jsx)(`span`,{className:y.indicator,"aria-hidden":`true`}),(0,S.jsxs)(`span`,{className:y.content,children:[(0,S.jsx)(`span`,{className:y.text,children:e.label}),e.description&&(0,S.jsx)(`span`,{className:y.description,children:e.description})]})]})]},e.value)})})]})},C.displayName=`RadioGroup`,C.__docgenInfo={description:``,methods:[],displayName:`RadioGroup`,props:{name:{required:!0,tsType:{name:`string`},description:``},options:{required:!0,tsType:{name:`Array`,elements:[{name:`RadioOption`}],raw:`RadioOption[]`},description:``},label:{required:!1,tsType:{name:`string`},description:``},labelRequired:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},value:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`string`},description:``},direction:{required:!1,tsType:{name:`union`,raw:`"vertical" | "horizontal"`,elements:[{name:`literal`,value:`"vertical"`},{name:`literal`,value:`"horizontal"`}]},description:``,defaultValue:{value:`"vertical"`,computed:!1}},onValueChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},disabled:{defaultValue:{value:`false`,computed:!1},required:!1}},composes:[`Omit`]}})),T,E,D,O,k,A,j;t((()=>{w(),T=a(),E={title:`Components/Radio`,component:C,parameters:{layout:`centered`},tags:[`autodocs`],args:{name:`job`,label:`직업`,labelRequired:!1,direction:`vertical`,defaultValue:`developer`,options:[{label:`개발자`,value:`developer`,description:`서비스를 구현하고 기능을 개발해요`},{label:`디자이너`,value:`designer`,description:`화면과 사용자 경험을 설계해요`},{label:`기획자`,value:`planner`,description:`기능 흐름과 우선순위를 정리해요`}]},argTypes:{label:{control:`text`},labelRequired:{control:`boolean`},direction:{control:`inline-radio`,options:[`vertical`,`horizontal`]},disabled:{control:`boolean`}},decorators:[e=>(0,T.jsx)(`div`,{style:{width:320},children:(0,T.jsx)(e,{})})]},D={},O={args:{label:`상담 방식`,labelRequired:!0,name:`consulting`,defaultValue:`chat`,options:[{label:`채팅 상담`,value:`chat`,description:`텍스트로 천천히 내용을 확인해요`},{label:`전화 상담`,value:`call`,description:`빠르게 핵심만 상담할 수 있어요`},{label:`대면 상담`,value:`offline`,description:`직접 만나 깊이 있게 이야기해요`}]}},k={args:{direction:`horizontal`}},A={args:{name:`status`,label:`이용 상태`,options:[{label:`사용 가능`,value:`active`,description:`즉시 선택할 수 있어요`},{label:`준비 중`,value:`pending`,description:`곧 제공될 예정이에요`,disabled:!0}],defaultValue:`active`}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    label: "상담 방식",
    labelRequired: true,
    name: "consulting",
    defaultValue: "chat",
    options: [{
      label: "채팅 상담",
      value: "chat",
      description: "텍스트로 천천히 내용을 확인해요"
    }, {
      label: "전화 상담",
      value: "call",
      description: "빠르게 핵심만 상담할 수 있어요"
    }, {
      label: "대면 상담",
      value: "offline",
      description: "직접 만나 깊이 있게 이야기해요"
    }]
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "horizontal"
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    name: "status",
    label: "이용 상태",
    options: [{
      label: "사용 가능",
      value: "active",
      description: "즉시 선택할 수 있어요"
    }, {
      label: "준비 중",
      value: "pending",
      description: "곧 제공될 예정이에요",
      disabled: true
    }],
    defaultValue: "active"
  }
}`,...A.parameters?.docs?.source}}},j=[`Default`,`WithLabel`,`Horizontal`,`DisabledOption`]}))();export{D as Default,A as DisabledOption,k as Horizontal,O as WithLabel,j as __namedExportsOrder,E as default};