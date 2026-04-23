import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Yg9qg-gU.js";import{n as r,r as i,t as a}from"./jsx-runtime-DLNnHJc0.js";import{n as o,t as s}from"./dist-DcruuJki.js";var c,l,u,d,f,p,m,h,g=t((()=>{c=`_small_f8ukw_13`,l=`_label_f8ukw_20`,u=`_input_f8ukw_25`,d=`_stateLabelOn_f8ukw_37`,f=`_stateLabelOff_f8ukw_41`,p=`_disabled_f8ukw_72`,m=`_stateLabel_f8ukw_37`,h={switch:`_switch_f8ukw_1`,small:c,label:l,input:u,stateLabelOn:d,stateLabelOff:f,disabled:p,stateLabel:m}}));function _({id:e,className:t,size:n=`md`,disabled:i=!1,checkedChildren:a,unCheckedChildren:o,...s}){let c=v.useId(),l=e??`switch-${c.replace(/:/g,``)}`;return(0,y.jsxs)(`div`,{className:r(b({size:n,disabled:i}),t),children:[(0,y.jsx)(`input`,{type:`checkbox`,id:l,disabled:i,className:h.input,...s}),(0,y.jsxs)(`label`,{htmlFor:l,className:r(h.label,i&&h.disabled),children:[a&&(0,y.jsx)(`div`,{className:r(h.stateLabel,h.stateLabelOn),children:a}),o&&(0,y.jsx)(`div`,{className:r(h.stateLabel,h.stateLabelOff),children:o})]})]})}var v,y,b,x=t((()=>{o(),v=e(n()),i(),g(),y=a(),b=s(h.switch,{variants:{disabled:{true:``},size:{sm:h.small,md:``}},defaultVariants:{disabled:!1,size:`md`}}),_.__docgenInfo={description:``,methods:[],displayName:`Switch`,props:{checkedChildren:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},unCheckedChildren:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},size:{defaultValue:{value:`"md"`,computed:!1},required:!1}},composes:[`Omit`,`VariantProps`]}})),S,C,w,T,E,D;t((()=>{x(),S={title:`Components/Switch`,component:_,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{disabled:{control:`boolean`},size:{control:`select`,options:[`sm`,`md`]},checkedChildren:{control:`text`},unCheckedChildren:{control:`text`}}},C={parameters:{controls:{include:[`size`]}},args:{size:`md`}},w={parameters:{controls:{include:[`size`]}},args:{size:`sm`}},T={parameters:{controls:{include:[`disabled`]}},args:{disabled:!0}},E={parameters:{controls:{exclude:[`disabled`,`id`]}},args:{size:`md`,checkedChildren:`ON`,unCheckedChildren:`OFF`}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ["size"]
    }
  },
  args: {
    size: "md"
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ["size"]
    }
  },
  args: {
    size: "sm"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ["disabled"]
    }
  },
  args: {
    disabled: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: ["disabled", "id"]
    }
  },
  args: {
    size: "md",
    checkedChildren: "ON",
    unCheckedChildren: "OFF"
  }
}`,...E.parameters?.docs?.source}}},D=[`Default`,`Small`,`Disabled`,`WithText`]}))();export{C as Default,T as Disabled,w as Small,E as WithText,D as __namedExportsOrder,S as default};