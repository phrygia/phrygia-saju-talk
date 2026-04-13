import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./iframe-Bu1cxcE_.js";import{n as r,r as i,t as a}from"./jsx-runtime-DLNnHJc0.js";import{a as o,i as s,o as c,r as l,t as u}from"./lucide-react-BIRrsoVR.js";function d({header:e,className:t,children:n,style:i,...a}){return(0,y.jsxs)(`div`,{className:r(`min-w-55 rounded-2xl border border-background bg-surface p-1.5 text-foreground shadow-xl`,t),style:{minWidth:120,...i},...a,children:[e?(0,y.jsx)(`div`,{className:`px-3 pb-2 pt-1`,children:e}):null,(0,y.jsx)(`div`,{className:`flex flex-col`,children:n})]})}function f({className:e,...t}){return(0,y.jsx)(`div`,{className:r(`text-xs font-semibold text-muted-foreground`,e),...t})}function p({left:e,right:t,className:n,children:i,disabled:a,onClick:o,...s}){let c=v.useContext(b);return(0,y.jsxs)(`button`,{type:`button`,disabled:a,className:r(`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all`,`hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,`disabled:cursor-not-allowed disabled:opacity-50 hover:font-semibold`,n),onClick:e=>{o?.(e),e.defaultPrevented||c?.closeMenu()},...s,children:[e?(0,y.jsx)(`span`,{className:`flex h-5 w-5 items-center justify-center text-muted-foreground`,children:e}):null,(0,y.jsx)(`span`,{className:`flex-1 whitespace-nowrap break-keep`,children:i}),t?(0,y.jsx)(`span`,{className:`flex h-5 w-5 items-center justify-center text-muted-foreground`,children:t}):null]})}function m({checked:e=!1,onCheckedChange:t,showCheckIcon:n=!0,onClick:i,children:a,...o}){return(0,y.jsx)(p,{left:n?(0,y.jsx)(c,{size:14,className:r(e?`opacity-100`:`opacity-0`)}):void 0,onClick:n=>{t?.(!e),i?.(n)},"aria-checked":e,role:`menuitemcheckbox`,...o,children:a})}function h({name:e}){return e?.includes(`setting`)?(0,y.jsx)(l,{size:14}):e?.includes(`more`)?(0,y.jsx)(s,{size:14}):(0,y.jsx)(o,{size:14})}function g({children:e,dropdown:t,open:n,defaultOpen:i=!1,placement:a=`bottom-start`,onOpen:o,onClose:s,className:c}){let l=n!==void 0,[u,d]=v.useState(i),f=v.useRef(null),p=l?n:u,m=v.useCallback(e=>{l||d(e),e?o?.():s?.()},[l,o,s]);return v.useEffect(()=>{let e=e=>{f.current&&(f.current.contains(e.target)||m(!1))};return document.addEventListener(`click`,e),()=>document.removeEventListener(`click`,e)},[m]),v.useEffect(()=>{let e=e=>{e.key===`Escape`&&m(!1)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[m]),(0,y.jsx)(b.Provider,{value:{closeMenu:()=>m(!1)},children:(0,y.jsxs)(`div`,{ref:f,className:r(`relative flex`,c),children:[v.cloneElement(e,{onClick:t=>{e.props.onClick?.(t),m(!p)},"aria-expanded":p,"aria-haspopup":`menu`}),p?(0,y.jsx)(`div`,{className:`absolute z-40`,style:_(a),children:t}):null]})})}function _(e){return{top:{bottom:`calc(100% + 8px)`,left:`50%`,transform:`translateX(-50%)`},"top-start":{bottom:`calc(100% + 8px)`,left:0},"top-end":{bottom:`calc(100% + 8px)`,right:0},bottom:{top:`calc(100% + 8px)`,left:`50%`,transform:`translateX(-50%)`},"bottom-start":{top:`calc(100% + 8px)`,left:0},"bottom-end":{top:`calc(100% + 8px)`,right:0},left:{right:`calc(100% + 8px)`,top:`50%`,transform:`translateY(-50%)`},"left-start":{right:`calc(100% + 8px)`,top:0},"left-end":{right:`calc(100% + 8px)`,bottom:0},right:{left:`calc(100% + 8px)`,top:`50%`,transform:`translateY(-50%)`},"right-start":{left:`calc(100% + 8px)`,top:0},"right-end":{left:`calc(100% + 8px)`,bottom:0}}[e]}var v,y,b,x,S=t((()=>{v=e(n()),u(),i(),y=a(),b=v.createContext(null),x={Dropdown:d,Header:f,DropdownItem:p,DropdownCheckItem:m,DropdownIcon:h,Trigger:g},d.__docgenInfo={description:``,methods:[],displayName:`MenuDropdown`,props:{header:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}},f.__docgenInfo={description:``,methods:[],displayName:`MenuHeader`},p.__docgenInfo={description:``,methods:[],displayName:`MenuDropdownItem`,props:{left:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},right:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}},m.__docgenInfo={description:``,methods:[],displayName:`MenuDropdownCheckItem`,props:{checked:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onCheckedChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:``},showCheckIcon:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}}},composes:[`Omit`]},h.__docgenInfo={description:``,methods:[],displayName:`MenuDropdownIcon`,props:{name:{required:!1,tsType:{name:`string`},description:``}}},g.__docgenInfo={description:``,methods:[],displayName:`MenuTrigger`,props:{children:{required:!0,tsType:{name:`ReactReactElement`,raw:`React.ReactElement<{
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
| "right-end"`,elements:[{name:`literal`,value:`"top"`},{name:`literal`,value:`"top-start"`},{name:`literal`,value:`"top-end"`},{name:`literal`,value:`"bottom"`},{name:`literal`,value:`"bottom-start"`},{name:`literal`,value:`"bottom-end"`},{name:`literal`,value:`"left"`},{name:`literal`,value:`"left-start"`},{name:`literal`,value:`"left-end"`},{name:`literal`,value:`"right"`},{name:`literal`,value:`"right-start"`},{name:`literal`,value:`"right-end"`}]},description:``,defaultValue:{value:`"bottom-start"`,computed:!1}},onOpen:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onClose:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),C,w,T,E,D,O,k;t((()=>{C=e(n()),S(),w=a(),T={title:`Components/Menu`,component:x.Dropdown,parameters:{layout:`centered`},tags:[`autodocs`]},E={render:()=>(0,w.jsxs)(x.Dropdown,{header:(0,w.jsx)(x.Header,{children:`편집`}),children:[(0,w.jsx)(x.DropdownItem,{children:`첫 번째 메뉴`}),(0,w.jsx)(x.DropdownItem,{children:`두 번째 메뉴`}),(0,w.jsx)(x.DropdownItem,{children:`세 번째 메뉴`})]})},D={render:()=>(0,w.jsxs)(x.Dropdown,{header:(0,w.jsx)(x.Header,{children:`편집`}),children:[(0,w.jsx)(x.DropdownItem,{right:(0,w.jsx)(x.DropdownIcon,{name:`icon-setting-mono`}),children:`첫 번째 메뉴`}),(0,w.jsx)(x.DropdownItem,{right:(0,w.jsx)(x.DropdownIcon,{name:`icon-setting-mono`}),children:`두 번째 메뉴`}),(0,w.jsx)(x.DropdownItem,{right:(0,w.jsx)(x.DropdownIcon,{name:`icon-setting-mono`}),children:`세 번째 메뉴`})]})},O={render:()=>(0,w.jsx)(()=>{let[e,t]=(0,C.useState)(!1),[n,r]=(0,C.useState)(1);return(0,w.jsx)(`div`,{style:{minHeight:220,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,w.jsx)(x.Trigger,{open:e,onOpen:()=>t(!0),onClose:()=>t(!1),placement:`bottom`,dropdown:(0,w.jsxs)(x.Dropdown,{header:(0,w.jsx)(x.Header,{children:`항목을 선택하세요`}),children:[(0,w.jsx)(x.DropdownCheckItem,{checked:n===1,onCheckedChange:e=>e&&r(1),children:`첫 번째 메뉴`}),(0,w.jsx)(x.DropdownCheckItem,{checked:n===2,onCheckedChange:e=>e&&r(2),children:`두 번째 메뉴`}),(0,w.jsx)(x.DropdownCheckItem,{checked:n===3,onCheckedChange:e=>e&&r(3),children:`세 번째 메뉴`})]}),children:(0,w.jsx)(`button`,{type:`button`,style:{border:`1px solid #d9d9d9`,borderRadius:10,fontSize:14,padding:`10px 14px`,display:`inline-flex`,alignItems:`center`,gap:8},children:`클릭해보세요`})})})},{})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
      <Menu.DropdownItem>첫 번째 메뉴</Menu.DropdownItem>
      <Menu.DropdownItem>두 번째 메뉴</Menu.DropdownItem>
      <Menu.DropdownItem>세 번째 메뉴</Menu.DropdownItem>
    </Menu.Dropdown>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Menu.Dropdown header={<Menu.Header>편집</Menu.Header>}>
      <Menu.DropdownItem right={<Menu.DropdownIcon name="icon-setting-mono" />}>
        첫 번째 메뉴
      </Menu.DropdownItem>
      <Menu.DropdownItem right={<Menu.DropdownIcon name="icon-setting-mono" />}>
        두 번째 메뉴
      </Menu.DropdownItem>
      <Menu.DropdownItem right={<Menu.DropdownIcon name="icon-setting-mono" />}>
        세 번째 메뉴
      </Menu.DropdownItem>
    </Menu.Dropdown>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const TriggerDemo = () => {
      const [open, setOpen] = useState<boolean>(false);
      const [selected, setSelected] = useState<number>(1);
      return <div style={{
        minHeight: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
          <Menu.Trigger open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} placement="bottom" dropdown={<Menu.Dropdown header={<Menu.Header>항목을 선택하세요</Menu.Header>}>
                <Menu.DropdownCheckItem checked={selected === 1} onCheckedChange={checked => checked && setSelected(1)}>
                  첫 번째 메뉴
                </Menu.DropdownCheckItem>
                <Menu.DropdownCheckItem checked={selected === 2} onCheckedChange={checked => checked && setSelected(2)}>
                  두 번째 메뉴
                </Menu.DropdownCheckItem>
                <Menu.DropdownCheckItem checked={selected === 3} onCheckedChange={checked => checked && setSelected(3)}>
                  세 번째 메뉴
                </Menu.DropdownCheckItem>
              </Menu.Dropdown>}>
            <button type="button" style={{
            border: "1px solid #d9d9d9",
            borderRadius: 10,
            fontSize: 14,
            padding: "10px 14px",
            display: "inline-flex",
            alignItems: "center",
            gap: 8
          }}>
              클릭해보세요
            </button>
          </Menu.Trigger>
        </div>;
    };
    return <TriggerDemo />;
  }
}`,...O.parameters?.docs?.source}}},k=[`BasicDropdown`,`WithRightIcons`,`TriggerWithCheckItems`]}))();export{E as BasicDropdown,O as TriggerWithCheckItems,D as WithRightIcons,k as __namedExportsOrder,T as default};