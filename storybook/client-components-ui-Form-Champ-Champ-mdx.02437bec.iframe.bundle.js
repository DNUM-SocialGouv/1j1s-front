(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[3911],{"./src/client/components/ui/Form/Champ/Champ.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ComposantInputAvecValidationCustom:()=>ComposantInputAvecValidationCustom,ComposantNonInput:()=>ComposantNonInput,Indication:()=>Indication,IndicationEtErreur:()=>IndicationEtErreur,Required:()=>Required,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,exemple:()=>exemple});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/client/components/ui/Form/Combobox/index.tsx"),_Input__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Form/Input/index.tsx"),_Champ__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/client/components/ui/Form/Champ/Champ.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const __WEBPACK_DEFAULT_EXPORT__={component:_Champ__WEBPACK_IMPORTED_MODULE_3__.Y,title:"Components/Form/Champ"};var exemple={args:{},render:function render(args){return __jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y,args,__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label,null,"Pays"),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Input,{render:_Input__WEBPACK_IMPORTED_MODULE_2__.p}))}},Required={args:{},render:function render(args){return __jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y,args,__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label,null,"Pays ",__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label.Complement,null,"(requis)")),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Input,{render:_Input__WEBPACK_IMPORTED_MODULE_2__.p,defaultValue:"France",required:!0}),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Error,null))}},Indication={args:{},render:function render(args){return __jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y,args,__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label,null,"Pays"),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Input,{render:_Input__WEBPACK_IMPORTED_MODULE_2__.p}),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Hint,null,"e.g. France"))}},IndicationEtErreur={args:{},render:function render(args){return __jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y,args,__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label,null,"Pays ",__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label.Complement,null,"(requis)")),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Input,{render:_Input__WEBPACK_IMPORTED_MODULE_2__.p,defaultValue:"France",required:!0,validation:function validation(){return"toot"}}),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Error,null),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Hint,null,"e.g. France"))}},ComposantNonInput={args:{},render:function render(args){return __jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y,args,__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label,null,"Pays ",__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label.Complement,null,"(requis)")),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Input,{render:_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__.G,"aria-label":"Pays",required:!0},__jsx(_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__.G.Option,null,"France"),__jsx(_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__.G.Option,null,"Allemagne"),__jsx(_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__.G.Option,null,"Suisse"),__jsx(_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__.G.Option,null,"Norvège"),__jsx(_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__.G.Option,null,"Espagne"),__jsx(_client_components_ui_Form_Combobox__WEBPACK_IMPORTED_MODULE_1__.G.Option,null,"Italie")),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Error,null))}},ComposantInputAvecValidationCustom={args:{},render:function render(args){return __jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y,args,__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label,null,"Pays ",__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Label.Complement,null,"(entrer “France”)")),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Input,{render:_Input__WEBPACK_IMPORTED_MODULE_2__.p,required:!0,validation:function validation(value){return"France"===value?"":'Entrer "France"'}}),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Error,null),__jsx(_Champ__WEBPACK_IMPORTED_MODULE_3__.Y.Hint,null,"e.g. France"))}};exemple.parameters={...exemple.parameters,docs:{...exemple.parameters?.docs,source:{originalSource:"{\n  args: {},\n  render: args => <Champ {...args}>\n            <Champ.Label>Pays</Champ.Label>\n            <Champ.Input render={Input} />\n        </Champ>\n}",...exemple.parameters?.docs?.source}}},Required.parameters={...Required.parameters,docs:{...Required.parameters?.docs,source:{originalSource:'{\n  args: {},\n  render: args => {\n    return <Champ {...args}>\n                <Champ.Label>Pays <Champ.Label.Complement>(requis)</Champ.Label.Complement></Champ.Label>\n                <Champ.Input render={Input} defaultValue="France" required={true} />\n                <Champ.Error />\n            </Champ>;\n  }\n}',...Required.parameters?.docs?.source}}},Indication.parameters={...Indication.parameters,docs:{...Indication.parameters?.docs,source:{originalSource:"{\n  args: {},\n  render: args => <Champ {...args}>\n            <Champ.Label>Pays</Champ.Label>\n            <Champ.Input render={Input} />\n            <Champ.Hint>e.g. France</Champ.Hint>\n        </Champ>\n}",...Indication.parameters?.docs?.source}}},IndicationEtErreur.parameters={...IndicationEtErreur.parameters,docs:{...IndicationEtErreur.parameters?.docs,source:{originalSource:"{\n  args: {},\n  render: args => <Champ {...args}>\n            <Champ.Label>Pays <Champ.Label.Complement>(requis)</Champ.Label.Complement></Champ.Label>\n            <Champ.Input render={Input} defaultValue=\"France\" required validation={() => 'toot'} />\n            <Champ.Error />\n            <Champ.Hint>e.g. France</Champ.Hint>\n        </Champ>\n}",...IndicationEtErreur.parameters?.docs?.source}}},ComposantNonInput.parameters={...ComposantNonInput.parameters,docs:{...ComposantNonInput.parameters?.docs,source:{originalSource:'{\n  args: {},\n  render: args => {\n    return <Champ {...args}>\n                <Champ.Label>Pays <Champ.Label.Complement>(requis)</Champ.Label.Complement></Champ.Label>\n                <Champ.Input render={Combobox} aria-label="Pays" required={true}>\n                    <Combobox.Option>France</Combobox.Option>\n                    <Combobox.Option>Allemagne</Combobox.Option>\n                    <Combobox.Option>Suisse</Combobox.Option>\n                    <Combobox.Option>Norvège</Combobox.Option>\n                    <Combobox.Option>Espagne</Combobox.Option>\n                    <Combobox.Option>Italie</Combobox.Option>\n                </Champ.Input>\n                <Champ.Error />\n            </Champ>;\n  }\n}',...ComposantNonInput.parameters?.docs?.source}}},ComposantInputAvecValidationCustom.parameters={...ComposantInputAvecValidationCustom.parameters,docs:{...ComposantInputAvecValidationCustom.parameters?.docs,source:{originalSource:"{\n  args: {},\n  render: args => <Champ {...args}>\n            <Champ.Label>Pays <Champ.Label.Complement>(entrer &ldquo;France&rdquo;)</Champ.Label.Complement></Champ.Label>\n            <Champ.Input render={Input} required validation={value => value === 'France' ? '' : 'Entrer \"France\"'} />\n            <Champ.Error />\n            <Champ.Hint>e.g. France</Champ.Hint>\n        </Champ>\n}",...ComposantInputAvecValidationCustom.parameters?.docs?.source}}};const __namedExportsOrder=["exemple","Required","Indication","IndicationEtErreur","ComposantNonInput","ComposantInputAvecValidationCustom"]},"./src/client/components/ui/Form/Champ/Champ.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/next/dist/compiled/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_Champ_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Form/Champ/Champ.stories.tsx"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre",strong:"strong"},(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.RP)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.W8,{of:_Champ_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"definition",children:"Definition"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Le composant ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Champ"})," permet de lier automatiquement le label, le champ, l'aide à la saisie et le message d'erreur."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Tn,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Il gère également automatiquement l'affichage du message d'erreur custom ainsi que son contenu."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Hl,{of:_Champ_stories__WEBPACK_IMPORTED_MODULE_2__.Required}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"exemple",children:"Exemple"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-tsx",children:'<Champ>\n\t<Champ.Label>Pays <Champ.Label.Complement>(requis)</Champ.Label.Complement></Champ.Label>\n\t<Champ.Input render={Combobox} aria-label="Pays" required={true}>\n\t\t<Combobox.Option>France</Combobox.Option>\n\t\t<Combobox.Option>Allemagne</Combobox.Option>\n\t\t<Combobox.Option>Suisse</Combobox.Option>\n\t\t<Combobox.Option>Norvège</Combobox.Option>\n\t\t<Combobox.Option>Espagne</Combobox.Option>\n\t\t<Combobox.Option>Italie</Combobox.Option>\n\t</Champ.Input>\n\t<Champ.Error/>\n</Champ>\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Le composant ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<Champ.Input>"})," prend en props un composant à utiliser (e.g. ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Input"}),", ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Combobox"}),", ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Textarea"}),", ...) par la props ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"render"}),".\nRemarque : si le composant à utiliser prend des ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"children"}),", ces ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"children"})," peuvent être donnés au ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<Champ.Input>"}),"comme dans l'exemple ci-dessus dans lequel ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<Combobox>"})," prend des ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"<Combobox.Option>"})," en ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"children"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Le composant à afficher doit au moins accepter les props suivantes :"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-ts",children:"type ComponentChildrenPropsNecessary = {\n\tonChange?: (event: React.ChangeEvent<HTMLInputElement>, ...args: any[]) => void;\n\tonTouch?: (touched: boolean, ...args: any[]) => void\n\tref?: React.Ref<HTMLInputElement>\n\t'aria-describedby'?: string\n\tid?: string\n}\n"})})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.RP)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext}}]);