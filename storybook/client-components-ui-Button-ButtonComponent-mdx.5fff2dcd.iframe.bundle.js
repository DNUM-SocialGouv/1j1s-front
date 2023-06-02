/*! For license information please see client-components-ui-Button-ButtonComponent-mdx.5fff2dcd.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[359],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./src/client/components/ui/Button/ButtonComponent.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Button/ButtonComponent.stories.tsx"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",strong:"strong",a:"a",h3:"h3",ul:"ul",li:"li"},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.h_,{of:_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"definition",children:"Definition"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Le bouton principal utilisé sur 1jeune1solution :"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.sq,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"props",children:"Props"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Le ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"ButtonComponent"})," peut prendre les props suivantes :"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.ZX,{}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.strong,{children:["Mais également tous ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",target:"_blank",rel:"nofollow noopener noreferrer",children:["les attributs d'un ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"button"})," HTML natif"]})]})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"stories",children:"Stories"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Il existe 4 variantes principales :"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"primary",children:"Primary"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__.Primary}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"secondary",children:"Secondary"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__.Secondary}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"tertiary",children:"Tertiary"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__.Tertiary}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"quaternary",children:"Quaternary"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__.Quaternary}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"disabled",children:"Disabled"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["L'attribut natif ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"disabled"})," rend un style personnalisé lorsqu'il est utilisé :"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__.Disabled}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"icon",children:"Icon"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Il est possible de passer un composant ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"?path=/story/components-icon",children:"Icon-example"}),"\nvia la props ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"icon"})," et la positionner via la props ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"iconPosition"})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_4__.Xz,{of:_ButtonComponent_stories__WEBPACK_IMPORTED_MODULE_2__.WithIcon}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"recommandations-dusage",children:"Recommandations d'usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Ne pas confondre avec le composant ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"LinkStyledAsButton"})," (TODO ajouter lien vers le composant une fois la doc / story faite) qui doit être utilisé pour la navigation (interne ou externe)"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"a11y",children:"a11y"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.accede-web.com/notices/html-et-css/liens-et-boutons/completer-les-liens-et-les-boutons-non-explicites-avec-aria-label-ou-title/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Compléter les boutons non explicites avec aria-label ou title"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.accede-web.com/notices/html-et-css/liens-et-boutons/ne-pas-utiliser-les-attributs-aria-label-et-title-sur-des-liens-ou-boutons-explicites/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Ne pas utiliser les attributs aria-label et title sur des boutons explicites"})}),"\n"]})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_3__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"./src/client/components/ui/Button/ButtonComponent.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,Primary:()=>Primary,Quaternary:()=>Quaternary,Secondary:()=>Secondary,Tertiary:()=>Tertiary,WithIcon:()=>WithIcon,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Primary$parameters,_Primary$parameters2,_Primary$parameters2$,_Secondary$parameters,_Secondary$parameters2,_Secondary$parameters3,_Tertiary$parameters,_Tertiary$parameters2,_Tertiary$parameters3,_Quaternary$parameter,_Quaternary$parameter2,_Quaternary$parameter3,_Disabled$parameters,_Disabled$parameters2,_Disabled$parameters3,_WithIcon$parameters,_WithIcon$parameters2,_WithIcon$parameters3,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),_ButtonComponent__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/client/components/ui/Button/ButtonComponent.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const __WEBPACK_DEFAULT_EXPORT__={argTypes:{icon:{mapping:{"angle-left":__jsx(_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__.J,{name:"angle-left"}),"angle-right":__jsx(_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__.J,{name:"angle-right"}),"magnifying-glass":__jsx(_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__.J,{name:"magnifying-glass"})},options:["magnifying-glass","angle-left","angle-right"]}},args:{disabled:!1,label:"Cliquez ici"},component:_ButtonComponent__WEBPACK_IMPORTED_MODULE_3__.r,title:"Components/ButtonComponent"};var Primary={args:{appearance:"primary"}},Secondary={args:{appearance:"secondary"}},Tertiary={args:{appearance:"tertiary"}},Quaternary={args:{appearance:"quaternary"}},Disabled={args:{disabled:!0}},WithIcon={args:{icon:"magnifying-glass",iconPosition:"left",label:"Rechercher"}};Primary.parameters=_objectSpread(_objectSpread({},Primary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Primary$parameters=Primary.parameters)||void 0===_Primary$parameters?void 0:_Primary$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'primary'\n  }\n}"},null===(_Primary$parameters2=Primary.parameters)||void 0===_Primary$parameters2||null===(_Primary$parameters2$=_Primary$parameters2.docs)||void 0===_Primary$parameters2$?void 0:_Primary$parameters2$.source)})}),Secondary.parameters=_objectSpread(_objectSpread({},Secondary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Secondary$parameters=Secondary.parameters)||void 0===_Secondary$parameters?void 0:_Secondary$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'secondary'\n  }\n}"},null===(_Secondary$parameters2=Secondary.parameters)||void 0===_Secondary$parameters2||null===(_Secondary$parameters3=_Secondary$parameters2.docs)||void 0===_Secondary$parameters3?void 0:_Secondary$parameters3.source)})}),Tertiary.parameters=_objectSpread(_objectSpread({},Tertiary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Tertiary$parameters=Tertiary.parameters)||void 0===_Tertiary$parameters?void 0:_Tertiary$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'tertiary'\n  }\n}"},null===(_Tertiary$parameters2=Tertiary.parameters)||void 0===_Tertiary$parameters2||null===(_Tertiary$parameters3=_Tertiary$parameters2.docs)||void 0===_Tertiary$parameters3?void 0:_Tertiary$parameters3.source)})}),Quaternary.parameters=_objectSpread(_objectSpread({},Quaternary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Quaternary$parameter=Quaternary.parameters)||void 0===_Quaternary$parameter?void 0:_Quaternary$parameter.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'quaternary'\n  }\n}"},null===(_Quaternary$parameter2=Quaternary.parameters)||void 0===_Quaternary$parameter2||null===(_Quaternary$parameter3=_Quaternary$parameter2.docs)||void 0===_Quaternary$parameter3?void 0:_Quaternary$parameter3.source)})}),Disabled.parameters=_objectSpread(_objectSpread({},Disabled.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Disabled$parameters=Disabled.parameters)||void 0===_Disabled$parameters?void 0:_Disabled$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    disabled: true\n  }\n}"},null===(_Disabled$parameters2=Disabled.parameters)||void 0===_Disabled$parameters2||null===(_Disabled$parameters3=_Disabled$parameters2.docs)||void 0===_Disabled$parameters3?void 0:_Disabled$parameters3.source)})}),WithIcon.parameters=_objectSpread(_objectSpread({},WithIcon.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_WithIcon$parameters=WithIcon.parameters)||void 0===_WithIcon$parameters?void 0:_WithIcon$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    icon: 'magnifying-glass',\n    iconPosition: 'left',\n    label: 'Rechercher'\n  }\n}"},null===(_WithIcon$parameters2=WithIcon.parameters)||void 0===_WithIcon$parameters2||null===(_WithIcon$parameters3=_WithIcon$parameters2.docs)||void 0===_WithIcon$parameters3?void 0:_WithIcon$parameters3.source)})})},"./src/client/components/ui/Button/ButtonComponent.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>ButtonComponent});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),button_component_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/@storybook/addon-styling/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Button/button-component.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(button_component_module.Z,options);const Button_button_component_module=button_component_module.Z&&button_component_module.Z.locals?button_component_module.Z.locals:void 0;var _excluded=["appearance","className","icon","iconPosition","label"],__jsx=react.createElement;function ButtonComponent(_ref){var _ref$appearance=_ref.appearance,appearance=void 0===_ref$appearance?"primary":_ref$appearance,className=_ref.className,icon=_ref.icon,iconPosition=_ref.iconPosition,label=_ref.label,rest=(0,objectWithoutProperties.Z)(_ref,_excluded),appearanceClass=(0,react.useMemo)((function(){switch(appearance){case"primary":return Button_button_component_module.buttonPrimary;case"secondary":return Button_button_component_module.buttonSecondary;case"tertiary":return Button_button_component_module.buttonTertiary;case"quaternary":return Button_button_component_module.buttonQuaternary}}),[appearance]),iconPositionClass=(0,react.useMemo)((function(){switch(iconPosition){case"top":return Button_button_component_module.buttonWithTopIcon;case"left":return Button_button_component_module.buttonWithLeftIcon;case"right":return Button_button_component_module.buttonWithRightIcon}}),[iconPosition]),buttonStyles=(0,react.useMemo)((function(){return classnames_default()(className,Button_button_component_module.button,appearanceClass,iconPositionClass)}),[appearanceClass,className,iconPositionClass]),buttonBody=(0,react.useMemo)((function(){switch(iconPosition){case"top":case"left":return __jsx(react.Fragment,null,icon,__jsx("span",{className:Button_button_component_module.buttonLabel},label));case"right":return __jsx(react.Fragment,null,__jsx("span",{className:Button_button_component_module.buttonLabel},label),icon);default:return __jsx("span",{className:Button_button_component_module.buttonLabel},label)}}),[icon,iconPosition,label]);return __jsx("button",(0,esm_extends.Z)({className:buttonStyles},rest),buttonBody)}ButtonComponent.displayName="ButtonComponent",ButtonComponent.__docgenInfo={description:"",methods:[],displayName:"ButtonComponent",props:{appearance:{defaultValue:{value:"'primary'",computed:!1},required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'tertiary' | 'quaternary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'quaternary'"}]},description:""},label:{required:!0,tsType:{name:"string"},description:""}}};try{ButtonComponent.displayName="ButtonComponent",ButtonComponent.__docgenInfo={description:"",displayName:"ButtonComponent",props:{appearance:{defaultValue:{value:"primary"},description:"",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'},{value:'"quaternary"'}]}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},iconPosition:{defaultValue:null,description:"",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Button/ButtonComponent.tsx#ButtonComponent"]={docgenInfo:ButtonComponent.__docgenInfo,name:"ButtonComponent",path:"src/client/components/ui/Button/ButtonComponent.tsx#ButtonComponent"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/@storybook/addon-styling/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Button/button-component.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{padding:.5rem .75rem;font-size:.875rem;line-height:.875rem}._Xw7hKZACX8bvCiQX7LN svg,.Q_8MjFCn98Ew8UReW2fX svg,.HNLVywyUIzYlaf_38MVO svg{height:.875rem;width:.875rem}@media(min-width: 62em){._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{padding:.75rem 1rem;font-size:1rem;line-height:1rem}._Xw7hKZACX8bvCiQX7LN svg,.Q_8MjFCn98Ew8UReW2fX svg,.HNLVywyUIzYlaf_38MVO svg{height:1rem;width:1rem}}.EJVAmfyFel8pBAM3qCY_{border-radius:50px;outline-offset:4px}.EJVAmfyFel8pBAM3qCY_:disabled{border:1px solid #929292;background-color:#929292;color:#fff;cursor:not-allowed}.EJVAmfyFel8pBAM3qCY_>svg{vertical-align:middle}.EJVAmfyFel8pBAM3qCY_.F4Mt79fhEjfprTJnmbvs .mNVq7TCV9pKdiMfiGcaZ{margin-right:.5rem}.EJVAmfyFel8pBAM3qCY_.ywMr3ZN96uthDGciknfN .mNVq7TCV9pKdiMfiGcaZ{margin-left:.5rem}.EJVAmfyFel8pBAM3qCY_.vrU27cdWvlogVC2MugQA .mNVq7TCV9pKdiMfiGcaZ{margin-top:.5rem;display:block}._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}._Xw7hKZACX8bvCiQX7LN{border:1px solid #566bb1;background-color:#566bb1;color:#fff}._Xw7hKZACX8bvCiQX7LN:enabled:hover{background-color:#040085;border-color:#040085}.Q_8MjFCn98Ew8UReW2fX{border:1px solid #566bb1;color:#566bb1;background-color:#fff}.Q_8MjFCn98Ew8UReW2fX:enabled:hover{background-color:#ececff;border-color:#566bb1;color:#566bb1}.HNLVywyUIzYlaf_38MVO{border:1px solid #566bb1;color:#566bb1;background-color:#ececff}.HNLVywyUIzYlaf_38MVO:enabled:hover{background-color:#6e61e9;border-color:#6e61e9;color:#fff}.h2sseaf3b3xRrdXBU95B{color:#566bb1;border-radius:0;font-size:1rem}.h2sseaf3b3xRrdXBU95B:enabled:hover{text-decoration:underline;text-underline-offset:3px}","",{version:3,sources:["webpack://./src/styles/components/button/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Button/button-component.module.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AAEA,kEACE,oBAAA,CACA,iBAAA,CACA,mBAAA,CAEA,8EACE,cAAA,CACA,aAAA,CCHA,wBDJJ,kEAWI,mBAAA,CACA,cAAA,CACA,gBAAA,CAEA,8EACE,WAAA,CACA,UAAA,CAAA,CEjBN,sBACE,kBAAA,CACA,kBAAA,CAEA,+BACE,wBAAA,CACA,wBCgBW,CDfX,UCWI,CDVJ,kBAAA,CAGF,0BACE,qBAAA,CAIA,iEACE,kBAAA,CAKF,iEACE,iBAAA,CAKF,iEACE,gBAAA,CACA,aAAA,CAKN,kEACE,kBAAA,CACA,iBAAA,CACA,sBAAA,CAKF,sBACE,wBAAA,CACA,wBC1CU,CD2CV,UC5BM,CD8BN,oCACE,wBC5CS,CD6CT,oBC7CS,CDiDb,sBACE,wBAAA,CACA,aCrDU,CDsDV,qBCvCM,CDyCN,oCACE,wBCxCU,CDyCV,oBC1DQ,CD2DR,aC3DQ,CD+DZ,sBACE,wBAAA,CACA,aCjEU,CDkEV,wBCjDY,CDmDZ,oCACE,wBCpEa,CDqEb,oBCrEa,CDsEb,UCxDI,CD4DR,sBACE,aC5EU,CD6EV,eAAA,CACA,cAAA,CAEA,oCACE,yBAAA,CACA,yBAAA",sourcesContent:['@use "@styles/media/mixins";\n\n%button {\n  padding: 0.5rem 0.75rem;\n  font-size: 0.875rem;\n  line-height: 0.875rem;\n\n  svg {\n    height: 0.875rem;\n    width: 0.875rem;\n  }\n\n  @include mixins.media(large) {\n    padding: 0.75rem 1rem;\n    font-size: 1rem;\n    line-height: 1rem;\n\n    svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities";\n\n.button {\n  border-radius: 50px;\n  outline-offset: 4px;\n\n  &:disabled {\n    border: 1px solid utilities.$color-on-disabled;\n    background-color: utilities.$color-on-disabled;\n    color: utilities.$color-disabled;\n    cursor: not-allowed;\n  }\n\n  > svg {\n    vertical-align: middle;\n  }\n\n  &.buttonWithRightIcon {\n    & .buttonLabel {\n      margin-right: 0.5rem;\n    }\n  }\n\n  &.buttonWithLeftIcon {\n    & .buttonLabel {\n      margin-left: 0.5rem;\n    }\n  }\n\n  &.buttonWithTopIcon {\n    & .buttonLabel {\n      margin-top: 0.5rem;\n      display: block;\n    }\n  }\n}\n\n.buttonPrimary, .buttonSecondary, .buttonTertiary{\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  @extend %button;\n}\n\n\n.buttonPrimary {\n  border: 1px solid utilities.$color-primary;\n  background-color: utilities.$color-primary;\n  color: utilities.$color-on-primary;\n\n  &:enabled:hover {\n    background-color: utilities.$color-primary-on-hover;\n    border-color: utilities.$color-primary-on-hover;\n  }\n}\n\n.buttonSecondary {\n  border: 1px solid utilities.$color-primary;\n  color: utilities.$color-primary;\n  background-color: utilities.$white;\n\n  &:enabled:hover {\n    background-color: utilities.$color-background-white-titan;\n    border-color: utilities.$color-primary;\n    color: utilities.$color-primary;\n  }\n}\n\n.buttonTertiary {\n  border: 1px solid utilities.$color-primary;\n  color: utilities.$color-primary;\n  background-color: utilities.$color-background-white-titan;\n\n  &:enabled:hover {\n    background-color: utilities.$color-tertiary-on-hover;\n    border-color: utilities.$color-tertiary-on-hover;\n    color: utilities.$white;\n  }\n}\n\n.buttonQuaternary {\n  color: utilities.$color-primary;\n  border-radius: 0;\n  font-size: 1rem;\n\n  &:enabled:hover {\n    text-decoration: underline;\n    text-underline-offset: 3px;\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={buttonPrimary:"_Xw7hKZACX8bvCiQX7LN",buttonSecondary:"Q_8MjFCn98Ew8UReW2fX",buttonTertiary:"HNLVywyUIzYlaf_38MVO",button:"EJVAmfyFel8pBAM3qCY_",buttonWithRightIcon:"F4Mt79fhEjfprTJnmbvs",buttonLabel:"mNVq7TCV9pKdiMfiGcaZ",buttonWithLeftIcon:"ywMr3ZN96uthDGciknfN",buttonWithTopIcon:"vrU27cdWvlogVC2MugQA",buttonQuaternary:"h2sseaf3b3xRrdXBU95B"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);