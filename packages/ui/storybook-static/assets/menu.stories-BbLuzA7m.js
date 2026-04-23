import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Yg9qg-gU.js";import{n as r,r as i,t as a}from"./jsx-runtime-DLNnHJc0.js";import{a as o,i as s,o as c,r as l,t as u}from"./lucide-react-CJEnNX4S.js";var d,f,p,m,h,g,_,v,y=t((()=>{d=`_dropdown_1pmkf_1`,f=`_menuSlide_1pmkf_1`,p=`_item_1pmkf_25`,m=`_dangerItem_1pmkf_42`,h=`_itemIcon_1pmkf_59`,g=`_separator_1pmkf_70`,_=`_header_1pmkf_79`,v={dropdown:d,menuSlide:f,item:p,dangerItem:m,itemIcon:h,separator:g,header:_}}));function b({header:e,className:t,children:n,style:i,...a}){return(0,k.jsxs)(`div`,{className:r(`min-w-52 rounded-2xl p-1.5 text-foreground`,v.dropdown,t),style:{minWidth:200,...i},...a,children:[e?(0,k.jsx)(`div`,{className:`px-3 pb-1 pt-1.5`,children:e}):null,(0,k.jsx)(`div`,{className:`flex flex-col gap-px`,children:n})]})}function x({className:e,...t}){return(0,k.jsx)(`div`,{className:r(v.header,e),...t})}function S({className:e,...t}){return(0,k.jsx)(`div`,{role:`separator`,className:r(v.separator,e),...t})}function C({left:e,right:t,danger:n=!1,className:i,children:a,disabled:o,onClick:s,...c}){let l=O.useContext(A);return(0,k.jsxs)(`button`,{type:`button`,disabled:o,className:r(`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm`,`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,`disabled:cursor-not-allowed disabled:opacity-40`,n?v.dangerItem:v.item,i),onClick:e=>{s?.(e),e.defaultPrevented||l?.closeMenu()},...c,children:[e?(0,k.jsx)(`span`,{className:v.itemIcon,children:e}):null,(0,k.jsx)(`span`,{className:`flex-1 whitespace-nowrap break-keep`,children:a}),t?(0,k.jsx)(`span`,{className:`flex h-5 w-5 items-center justify-center opacity-50`,children:t}):null]})}function w({checked:e=!1,onCheckedChange:t,showCheckIcon:n=!0,onClick:i,children:a,...o}){return(0,k.jsx)(C,{left:n?(0,k.jsx)(c,{size:13,className:r(e?`opacity-100`:`opacity-0`)}):void 0,onClick:n=>{t?.(!e),i?.(n)},"aria-checked":e,role:`menuitemcheckbox`,...o,children:a})}function T({name:e}){return e?.includes(`setting`)?(0,k.jsx)(l,{size:14}):e?.includes(`more`)?(0,k.jsx)(s,{size:14}):(0,k.jsx)(o,{size:14})}function E({children:e,dropdown:t,open:n,defaultOpen:i=!1,placement:a=`bottom-start`,onOpen:o,onClose:s,className:c}){let l=n!==void 0,[u,d]=O.useState(i),f=O.useRef(null),p=l?n:u,m=O.useCallback(e=>{l||d(e),e?o?.():s?.()},[l,o,s]);return O.useEffect(()=>{let e=e=>{f.current&&!f.current.contains(e.target)&&m(!1)};return document.addEventListener(`click`,e),()=>document.removeEventListener(`click`,e)},[m]),O.useEffect(()=>{let e=e=>{e.key===`Escape`&&m(!1)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[m]),(0,k.jsx)(A.Provider,{value:{closeMenu:()=>m(!1)},children:(0,k.jsxs)(`div`,{ref:f,className:r(`relative flex`,c),children:[O.cloneElement(e,{onClick:t=>{e.props.onClick?.(t),m(!p)},"aria-expanded":p,"aria-haspopup":`menu`}),p?(0,k.jsx)(`div`,{className:`absolute z-40`,style:D(a),children:t}):null]})})}function D(e){return{top:{bottom:`calc(100% + 8px)`,left:`50%`,transform:`translateX(-50%)`},"top-start":{bottom:`calc(100% + 8px)`,left:0},"top-end":{bottom:`calc(100% + 8px)`,right:0},bottom:{top:`calc(100% + 8px)`,left:`50%`,transform:`translateX(-50%)`},"bottom-start":{top:`calc(100% + 8px)`,left:0},"bottom-end":{top:`calc(100% + 8px)`,right:0},left:{right:`calc(100% + 8px)`,top:`50%`,transform:`translateY(-50%)`},"left-start":{right:`calc(100% + 8px)`,top:0},"left-end":{right:`calc(100% + 8px)`,bottom:0},right:{left:`calc(100% + 8px)`,top:`50%`,transform:`translateY(-50%)`},"right-start":{left:`calc(100% + 8px)`,top:0},"right-end":{left:`calc(100% + 8px)`,bottom:0}}[e]}var O,k,A,j,M=t((()=>{O=e(n()),u(),i(),y(),k=a(),A=O.createContext(null),j={Dropdown:b,Header:x,Separator:S,DropdownItem:C,DropdownCheckItem:w,DropdownIcon:T,Trigger:E},b.__docgenInfo={description:``,methods:[],displayName:`MenuDropdown`,props:{header:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}},x.__docgenInfo={description:``,methods:[],displayName:`MenuHeader`},S.__docgenInfo={description:``,methods:[],displayName:`MenuSeparator`},C.__docgenInfo={description:``,methods:[],displayName:`MenuDropdownItem`,props:{left:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},right:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},danger:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}},w.__docgenInfo={description:``,methods:[],displayName:`MenuDropdownCheckItem`,props:{checked:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onCheckedChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:``},showCheckIcon:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}}},composes:[`Omit`]},T.__docgenInfo={description:``,methods:[],displayName:`MenuDropdownIcon`,props:{name:{required:!1,tsType:{name:`string`},description:``}}},E.__docgenInfo={description:``,methods:[],displayName:`MenuTrigger`,props:{children:{required:!0,tsType:{name:`ReactReactElement`,raw:`React.ReactElement<{
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}>`,elements:[{name:`signature`,type:`object`,raw:`{
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}`,signature:{properties:[{key:`onClick`,value:{name:`signature`,type:`function`,raw:`(event: React.MouseEvent) => void`,signature:{arguments:[{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent`},name:`event`}],return:{name:`void`}},required:!1}},{key:{name:`string`},value:{name:`unknown`,required:!0}}]}}]},description:``},dropdown:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},open:{required:!1,tsType:{name:`boolean`},description:``},defaultOpen:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},placement:{required:!1,tsType:{name:`union`,raw:`| "top"
| "top-start"
| "top-end"
| "bottom"
| "bottom-start"
| "bottom-end"
| "left"
| "left-start"
| "left-end"
| "right"
| "right-start"
| "right-end"`,elements:[{name:`literal`,value:`"top"`},{name:`literal`,value:`"top-start"`},{name:`literal`,value:`"top-end"`},{name:`literal`,value:`"bottom"`},{name:`literal`,value:`"bottom-start"`},{name:`literal`,value:`"bottom-end"`},{name:`literal`,value:`"left"`},{name:`literal`,value:`"left-start"`},{name:`literal`,value:`"left-end"`},{name:`literal`,value:`"right"`},{name:`literal`,value:`"right-start"`},{name:`literal`,value:`"right-end"`}]},description:``,defaultValue:{value:`"bottom-start"`,computed:!1}},onOpen:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onClose:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),N,P,F,I,L,R,z;t((()=>{N=e(n()),M(),P=a(),F={title:`Components/Menu`,component:j.Dropdown,parameters:{layout:`centered`},tags:[`autodocs`]},I={render:()=>(0,P.jsxs)(j.Dropdown,{header:(0,P.jsx)(j.Header,{children:`편집`}),children:[(0,P.jsx)(j.DropdownItem,{children:`첫 번째 메뉴`}),(0,P.jsx)(j.DropdownItem,{children:`두 번째 메뉴`}),(0,P.jsx)(j.DropdownItem,{children:`세 번째 메뉴`})]})},L={parameters:{docs:{description:{story:"`<Menu.Separator />`로 구분선, `danger` prop으로 빨간색 위험 액션을 표시합니다."}}},render:()=>(0,P.jsxs)(j.Dropdown,{children:[(0,P.jsx)(j.DropdownItem,{left:`👤`,children:`회원 정보`}),(0,P.jsx)(j.DropdownItem,{left:`☯`,children:`사주 정보 수정`}),(0,P.jsx)(j.DropdownItem,{left:`⚙️`,right:(0,P.jsx)(j.DropdownIcon,{name:`icon-setting-mono`}),children:`설정`}),(0,P.jsx)(j.Separator,{}),(0,P.jsx)(j.DropdownItem,{danger:!0,left:`🗑`,children:`채팅 기록 삭제`}),(0,P.jsx)(j.DropdownItem,{danger:!0,left:`↪`,children:`로그아웃`})]})},R={render:()=>(0,P.jsx)(()=>{let[e,t]=(0,N.useState)(!1),[n,r]=(0,N.useState)(1);return(0,P.jsx)(`div`,{style:{minHeight:220,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,P.jsx)(j.Trigger,{open:e,onOpen:()=>t(!0),onClose:()=>t(!1),placement:`bottom`,dropdown:(0,P.jsx)(j.Dropdown,{header:(0,P.jsx)(j.Header,{children:`항목을 선택하세요`}),children:[1,2,3].map(e=>(0,P.jsxs)(j.DropdownCheckItem,{checked:n===e,onCheckedChange:t=>t&&r(e),children:[e,`번째 메뉴`]},e))}),children:(0,P.jsxs)(`button`,{type:`button`,style:{border:`1px solid rgba(124,92,252,0.25)`,borderRadius:10,fontSize:13,padding:`9px 16px`,display:`inline-flex`,alignItems:`center`,gap:8,background:`rgba(124,92,252,0.08)`,color:`var(--violet, #a78bfa)`,cursor:`pointer`},children:[n,`번 선택됨 ▾`]})})})},{})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
      <Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
      <Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
      <Menu.DropdownItem>세 번째 메뉴</Menu.DropdownItem>
    </Menu.Dropdown>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`<Menu.Separator />\`로 구분선, \`danger\` prop으로 빨간색 위험 액션을 표시합니다."
      }
    }
  },
  render: () => <Menu.Dropdown>
      <Menu.DropdownItem left="👤">회원 정보</Menu.DropdownItem>
      <Menu.DropdownItem left="☯">사주 정보 수정</Menu.DropdownItem>
      <Menu.DropdownItem left="⚙️" right={<Menu.DropdownIcon name="icon-setting-mono" />}>
        설정
      </Menu.DropdownItem>
      <Menu.Separator />
      <Menu.DropdownItem danger left="🗑">
        채팅 기록 삭제
      </Menu.DropdownItem>
      <Menu.DropdownItem danger left="↪">
        로그아웃
      </Menu.DropdownItem>
    </Menu.Dropdown>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const TriggerDemo = () => {
      const [open, setOpen] = useState(false);
      const [selected, setSelected] = useState(1);
      return <div style={{
        minHeight: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
          <Menu.Trigger open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} placement="bottom" dropdown={<Menu.Dropdown header={<Menu.Header>항목을 선택하세요</Menu.Header>}>
                {[1, 2, 3].map(n => <Menu.DropdownCheckItem key={n} checked={selected === n} onCheckedChange={checked => checked && setSelected(n)}>
                    {n}번째 메뉴
                  </Menu.DropdownCheckItem>)}
              </Menu.Dropdown>}>
            <button type="button" style={{
            border: "1px solid rgba(124,92,252,0.25)",
            borderRadius: 10,
            fontSize: 13,
            padding: "9px 16px",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(124,92,252,0.08)",
            color: "var(--violet, #a78bfa)",
            cursor: "pointer"
          }}>
              {selected}번 선택됨 ▾
            </button>
          </Menu.Trigger>
        </div>;
    };
    return <TriggerDemo />;
  }
}`,...R.parameters?.docs?.source}}},z=[`BasicDropdown`,`WithSeparatorAndDanger`,`TriggerWithCheckItems`]}))();export{I as BasicDropdown,R as TriggerWithCheckItems,L as WithSeparatorAndDanger,z as __namedExportsOrder,F as default};