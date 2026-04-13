import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Bu1cxcE_.js";import{t as r}from"./react-dom-tPnTyYcb.js";import{n as i,r as a,t as o}from"./jsx-runtime-DLNnHJc0.js";import{n as s,t as c}from"./input-BdTkFzb9.js";function l(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function u(...e){return t=>{let n=!1,r=e.map(e=>{let r=l(e,t);return!n&&typeof r==`function`&&(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];typeof n==`function`?n():l(e[t],null)}}}}var d=t((()=>{n()}));function f(e){return typeof e==`object`&&!!e&&`then`in e}function p(e){return typeof e==`object`&&!!e&&`$$typeof`in e&&e.$$typeof===x&&`_payload`in e&&f(e._payload)}function m(e){let t=h(e),n=y.forwardRef((e,n)=>{let{children:r,...i}=e;p(r)&&typeof S==`function`&&(r=S(r._payload));let a=y.Children.toArray(r),o=a.find(g);if(o){let e=o.props.children,r=a.map(t=>t===o?y.Children.count(e)>1?y.Children.only(null):y.isValidElement(e)?e.props.children:null:t);return(0,b.jsx)(t,{...i,ref:n,children:y.isValidElement(e)?y.cloneElement(e,void 0,r):null})}return(0,b.jsx)(t,{...i,ref:n,children:r})});return n.displayName=`${e}.Slot`,n}function h(e){let t=y.forwardRef((e,t)=>{let{children:n,...r}=e;if(p(n)&&typeof S==`function`&&(n=S(n._payload)),y.isValidElement(n)){let e=v(n),i=_(r,n.props);return n.type!==y.Fragment&&(i.ref=t?u(t,e):e),y.cloneElement(n,i)}return y.Children.count(n)>1?y.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}function g(e){return y.isValidElement(e)&&typeof e.type==`function`&&`__radixId`in e.type&&e.type.__radixId===C}function _(e,t){let n={...t};for(let r in t){let i=e[r],a=t[r];/^on[A-Z]/.test(r)?i&&a?n[r]=(...e)=>{let t=a(...e);return i(...e),t}:i&&(n[r]=i):r===`style`?n[r]={...i,...a}:r===`className`&&(n[r]=[i,a].filter(Boolean).join(` `))}return{...e,...n}}function v(e){let t=Object.getOwnPropertyDescriptor(e.props,`ref`)?.get,n=t&&`isReactWarning`in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,`ref`)?.get,n=t&&`isReactWarning`in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var y,b,x,S,C,w=t((()=>{y=e(n(),1),d(),b=o(),x=Symbol.for(`react.lazy`),S=y.use,C=Symbol(`radix.slottable`)})),T,E,D,O=t((()=>{T=e(n(),1),r(),w(),E=o(),D=[`a`,`button`,`div`,`form`,`h2`,`h3`,`img`,`input`,`label`,`li`,`nav`,`ol`,`p`,`select`,`span`,`svg`,`ul`].reduce((e,t)=>{let n=m(`Primitive.${t}`),r=T.forwardRef((e,r)=>{let{asChild:i,...a}=e,o=i?n:t;return typeof window<`u`&&(window[Symbol.for(`radix-ui`)]=!0),(0,E.jsx)(o,{...a,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{})})),k,A,j,M,N,P=t((()=>{k=e(n(),1),O(),A=o(),j=`Label`,M=k.forwardRef((e,t)=>(0,A.jsx)(D.label,{...e,ref:t,onMouseDown:t=>{t.target.closest(`button, input, select, textarea`)||(e.onMouseDown?.(t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}})),M.displayName=j,N=M})),F,I,L=t((()=>{P(),n(),a(),F=o(),I=({className:e,...t})=>(0,F.jsx)(N,{className:i(`text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,e),...t}),I.displayName=N.displayName,I.__docgenInfo={description:``,methods:[]}})),R,z,B,V,H,U;t((()=>{L(),s(),R=o(),z={title:`Components/Label`,component:I,parameters:{layout:`centered`},tags:[`autodocs`]},B={args:{children:`이메일 주소`}},V={render:()=>(0,R.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6,width:280},children:[(0,R.jsx)(I,{htmlFor:`email`,children:`이메일`}),(0,R.jsx)(c,{id:`email`,type:`email`,placeholder:`hello@example.com`})]})},H={render:()=>(0,R.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6,width:280},children:[(0,R.jsxs)(I,{htmlFor:`name`,children:[`이름 `,(0,R.jsx)(`span`,{style:{color:`red`},children:`*`})]}),(0,R.jsx)(c,{id:`name`,placeholder:`홍길동`,required:!0})]})},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    children: "이메일 주소"
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: 280
  }}>
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="hello@example.com" />
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: 280
  }}>
      <Label htmlFor="name">
        이름 <span style={{
        color: "red"
      }}>*</span>
      </Label>
      <Input id="name" placeholder="홍길동" required />
    </div>
}`,...H.parameters?.docs?.source}}},U=[`Default`,`WithInput`,`Required`]}))();export{B as Default,H as Required,V as WithInput,U as __namedExportsOrder,z as default};