import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./iframe-Bu1cxcE_.js";import{n,r,t as i}from"./jsx-runtime-DLNnHJc0.js";var a,o,s=e((()=>{a=`_select_kgd95_1`,o={select:a}})),c,l,u=e((()=>{t(),r(),s(),c=i(),l=({className:e,children:t,label:r,labelRequired:i=!1,ref:a,...s})=>(0,c.jsxs)(c.Fragment,{children:[r&&(0,c.jsxs)(`label`,{htmlFor:s?.id,className:`flex mb-1.5 flex-wrap items-center text-xs leading-4`,style:{fontWeight:500},children:[i&&(0,c.jsx)(`span`,{className:`text-xs mr-0.5 text-[#ef4444]`,children:`*`}),r]}),(0,c.jsx)(`select`,{ref:a,className:n(`flex h-10 w-full appearance-none rounded-md border border-[var(--default-border-color)] bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 outline-none dark:bg-[#000]`,o.select,e),...s,children:t})]}),l.displayName=`Select`,l.__docgenInfo={description:``,methods:[],displayName:`Select`,props:{label:{required:!1,tsType:{name:`string`},description:``},labelRequired:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLSelectElement>`,elements:[{name:`HTMLSelectElement`}]},description:``}}}})),d,f,p,m,h,g,_;e((()=>{u(),d=i(),f={title:`Components/Select`,component:l,parameters:{layout:`centered`},tags:[`autodocs`],args:{disabled:!1,labelRequired:!1},argTypes:{disabled:{control:`boolean`},label:{control:`text`},labelRequired:{control:`boolean`}},decorators:[e=>(0,d.jsx)(`div`,{style:{width:240},children:(0,d.jsx)(e,{})})]},p={render:()=>(0,d.jsxs)(l,{children:[(0,d.jsx)(`option`,{value:``,children:`선택하세요`}),(0,d.jsx)(`option`,{value:`1`,children:`옵션 1`}),(0,d.jsx)(`option`,{value:`2`,children:`옵션 2`}),(0,d.jsx)(`option`,{value:`3`,children:`옵션 3`})]})},m={render:()=>(0,d.jsx)(l,{disabled:!0,children:(0,d.jsx)(`option`,{children:`비활성화됨`})})},h={render:()=>(0,d.jsxs)(l,{children:[(0,d.jsx)(`option`,{value:``,children:`카테고리 선택`}),(0,d.jsxs)(`optgroup`,{label:`프론트엔드`,children:[(0,d.jsx)(`option`,{value:`react`,children:`React`}),(0,d.jsx)(`option`,{value:`vue`,children:`Vue`})]}),(0,d.jsxs)(`optgroup`,{label:`백엔드`,children:[(0,d.jsx)(`option`,{value:`node`,children:`Node.js`}),(0,d.jsx)(`option`,{value:`python`,children:`Python`})]})]})},g={args:{id:`job`,label:`직업`,labelRequired:!0},render:e=>(0,d.jsxs)(l,{...e,children:[(0,d.jsx)(`option`,{value:``,children:`직업을 선택하세요`}),(0,d.jsx)(`option`,{value:`developer`,children:`개발자`}),(0,d.jsx)(`option`,{value:`designer`,children:`디자이너`}),(0,d.jsx)(`option`,{value:`planner`,children:`기획자`})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Select>
      <option value="">선택하세요</option>
      <option value="1">옵션 1</option>
      <option value="2">옵션 2</option>
      <option value="3">옵션 3</option>
    </Select>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Select disabled>
      <option>비활성화됨</option>
    </Select>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Select>
      <option value="">카테고리 선택</option>
      <optgroup label="프론트엔드">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </optgroup>
      <optgroup label="백엔드">
        <option value="node">Node.js</option>
        <option value="python">Python</option>
      </optgroup>
    </Select>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    id: "job",
    label: "직업",
    labelRequired: true
  },
  render: args => <Select {...args}>
      <option value="">직업을 선택하세요</option>
      <option value="developer">개발자</option>
      <option value="designer">디자이너</option>
      <option value="planner">기획자</option>
    </Select>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Disabled`,`WithGroups`,`WithLabel`]}))();export{p as Default,m as Disabled,h as WithGroups,g as WithLabel,_ as __namedExportsOrder,f as default};