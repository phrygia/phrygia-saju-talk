import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./jsx-runtime-DLNnHJc0.js";import{n,t as r}from"./input-BXI9kqzV.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{n(),i=t(),a={title:`Components/Input`,component:r,parameters:{layout:`centered`},tags:[`autodocs`],args:{variant:`default`},argTypes:{variant:{control:`select`,options:[`default`,`error`,`warning`]},disabled:{control:`boolean`},labelRequired:{control:`boolean`},label:{control:`text`}},decorators:[e=>(0,i.jsx)(`div`,{style:{width:320,padding:`24px`},children:(0,i.jsx)(e,{})})]},o={args:{placeholder:`이메일을 입력하세요`,variant:`default`}},s={args:{id:`email`,type:`email`,label:`이메일`,labelRequired:!0,placeholder:`hello@example.com`,variant:`default`}},c={name:`아이콘 포함`,args:{label:`검색`,placeholder:`상담 내역을 검색하세요`,icon:`🔍`,variant:`default`}},l={name:`오류`,args:{label:`이메일`,labelRequired:!0,id:`email-error`,type:`email`,placeholder:`hello@example.com`,defaultValue:`invalid-email`,variant:`error`,errorMessage:`올바른 이메일 형식을 입력해주세요.`}},u={name:`경고`,args:{label:`닉네임`,id:`nickname-warning`,placeholder:`닉네임을 입력하세요`,defaultValue:`사용자123`,variant:`warning`,warningMessage:`이미 사용 중인 닉네임입니다.`}},d={name:`비활성화`,args:{label:`이메일`,placeholder:`이메일을 입력하세요`,defaultValue:`user@example.com`,disabled:!0}},f={name:`전체 상태`,parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:20,width:320},children:[(0,i.jsx)(r,{label:`기본`,labelRequired:!0,placeholder:`내용을 입력하세요`}),(0,i.jsx)(r,{label:`아이콘`,placeholder:`검색어를 입력하세요`,icon:`🔍`}),(0,i.jsx)(r,{label:`오류`,labelRequired:!0,variant:`error`,defaultValue:`잘못된 값`,errorMessage:`올바른 값을 입력해주세요.`}),(0,i.jsx)(r,{label:`경고`,variant:`warning`,defaultValue:`확인 필요`,warningMessage:`입력값을 다시 확인해주세요.`}),(0,i.jsx)(r,{label:`비활성화`,defaultValue:`수정 불가`,disabled:!0})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "이메일을 입력하세요",
    variant: "default"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    id: "email",
    type: "email",
    label: "이메일",
    labelRequired: true,
    placeholder: "hello@example.com",
    variant: "default"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "아이콘 포함",
  args: {
    label: "검색",
    placeholder: "상담 내역을 검색하세요",
    icon: "🔍",
    variant: "default"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: "오류",
  args: {
    label: "이메일",
    labelRequired: true,
    id: "email-error",
    type: "email",
    placeholder: "hello@example.com",
    defaultValue: "invalid-email",
    variant: "error",
    errorMessage: "올바른 이메일 형식을 입력해주세요."
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "경고",
  args: {
    label: "닉네임",
    id: "nickname-warning",
    placeholder: "닉네임을 입력하세요",
    defaultValue: "사용자123",
    variant: "warning",
    warningMessage: "이미 사용 중인 닉네임입니다."
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "비활성화",
  args: {
    label: "이메일",
    placeholder: "이메일을 입력하세요",
    defaultValue: "user@example.com",
    disabled: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "전체 상태",
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: 320
  }}>
      <Input label="기본" labelRequired placeholder="내용을 입력하세요" />
      <Input label="아이콘" placeholder="검색어를 입력하세요" icon="🔍" />
      <Input label="오류" labelRequired variant="error" defaultValue="잘못된 값" errorMessage="올바른 값을 입력해주세요." />
      <Input label="경고" variant="warning" defaultValue="확인 필요" warningMessage="입력값을 다시 확인해주세요." />
      <Input label="비활성화" defaultValue="수정 불가" disabled />
    </div>
}`,...f.parameters?.docs?.source}}},p=[`Default`,`WithLabel`,`WithIcon`,`Error`,`Warning`,`Disabled`,`AllVariants`]}))();export{f as AllVariants,o as Default,d as Disabled,l as Error,u as Warning,c as WithIcon,s as WithLabel,p as __namedExportsOrder,a as default};