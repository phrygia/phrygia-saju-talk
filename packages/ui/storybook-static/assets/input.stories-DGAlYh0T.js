import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./input-BdTkFzb9.js";var r,i,a,o;e((()=>{t(),r={title:`Components/Input`,component:n,parameters:{layout:`centered`,controls:{disableSaveFromUI:!0}},tags:[`autodocs`],args:{variant:`default`},argTypes:{variant:{control:`select`,options:[`default`,`error`,`warning`]},disabled:{control:`boolean`},value:{control:`text`},labelRequired:{control:`boolean`},label:{control:`text`}}},i={parameters:{controls:{exclude:[`label`,`labelRequired`,`errorMessage`,`warningMessage`]}},args:{variant:`default`,value:``,placeholder:`이메일을 입력하세요`,disabled:!1,errorMessage:`올바른 값을 입력해주세요.`,warningMessage:`입력값을 다시 확인해주세요.`}},a={parameters:{controls:{include:[`variant`,`value`,`label`,`labelRequired`]}},args:{id:`email`,type:`email`,label:`이메일`,labelRequired:!0,placeholder:`hello@example.com`,value:``,variant:`default`}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      exclude: ["label", "labelRequired", "errorMessage", "warningMessage"]
    }
  },
  args: {
    variant: "default",
    value: "",
    placeholder: "이메일을 입력하세요",
    disabled: false,
    errorMessage: "올바른 값을 입력해주세요.",
    warningMessage: "입력값을 다시 확인해주세요."
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ["variant", "value", "label", "labelRequired"]
    }
  },
  args: {
    id: "email",
    type: "email",
    label: "이메일",
    labelRequired: true,
    placeholder: "hello@example.com",
    value: "",
    variant: "default"
  }
}`,...a.parameters?.docs?.source}}},o=[`Default`,`WithLabel`]}))();export{i as Default,a as WithLabel,o as __namedExportsOrder,r as default};