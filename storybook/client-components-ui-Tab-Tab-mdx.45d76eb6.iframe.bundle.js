/*! For license information please see client-components-ui-Tab-Tab-mdx.45d76eb6.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[8332],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./src/client/components/ui/Tab/Tab.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Tab_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Tab/Tab.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Tab_module.A,options);const Tab_Tab_module=Tab_module.A&&Tab_module.A.locals?Tab_module.A.locals:void 0;var useSynchronizedRef=__webpack_require__("./src/client/hooks/useSynchronizedRef.tsx"),keyboard_enum=__webpack_require__("./src/client/components/keyboard/keyboard.enum.ts");const TabContext=(0,react.createContext)(null),useTabContext=()=>{const tabContext=(0,react.useContext)(TabContext);if(!tabContext)throw new Error("tabContext has to be used within <CurrentUserContext.Provider>");return tabContext},Tabs=react.forwardRef((function Tabs(props,ref){const{className,children,currentIndex:currentIndexProps,onTabChange:onTabChangeProps=()=>null,...rest}=props,[currentIndexState,setCurrentIndexState]=(0,react.useState)(0),currentIndex=null!=currentIndexProps?currentIndexProps:currentIndexState,childrenArray=react.Children.toArray(children),[tabLabel,...tabPanels]=childrenArray;return(0,jsx_runtime.jsx)("div",{className:classnames_default()(Tab_Tab_module.tabList,className),"aria-labelledby":"liste d'onglets",ref,...rest,children:(0,jsx_runtime.jsxs)(TabContext.Provider,{value:{indexTabActive:currentIndex,onTabChange:value=>{setCurrentIndexState(value),onTabChangeProps(value)}},children:[tabLabel,(0,jsx_runtime.jsx)("div",{className:Tab_Tab_module.tabPanelContainer,children:tabPanels[currentIndex]})]})})})),Tab=react.forwardRef((function Tab(props,ref){const{children,...rest}=props;return(0,jsx_runtime.jsx)("button",{ref,className:Tab_Tab_module.tabLabel,role:"tab",...rest,children})})),TabPanel=react.forwardRef((function TabPanel(props,ref){const{children,className,...rest}=props,{indexTabActive}=useTabContext();return(0,jsx_runtime.jsx)("div",{className:classnames_default()(className,Tab_Tab_module.tabPanel),ref,role:"tabpanel","aria-labelledby":`tab-${indexTabActive}`,id:`panel-${indexTabActive}`,...rest,children})}));function getHtmlElement(element){return element instanceof HTMLElement?element:null}const TabsLabel=react.forwardRef((function TabsLabel(props,outerRef){const{children,...rest}=props,tabsLabelRef=(0,useSynchronizedRef.T)(outerRef),{indexTabActive,onTabChange}=useTabContext();function handleKeyDown(event){const currentLabel=getHtmlElement(event.currentTarget),previousElement=getHtmlElement(null==currentLabel?void 0:currentLabel.previousElementSibling),nextElement=getHtmlElement(null==currentLabel?void 0:currentLabel.nextElementSibling),parentLabel=tabsLabelRef.current;if(!parentLabel)return;const allTabsLabel=parentLabel.querySelectorAll('[role="tab"]');switch(event.key){case keyboard_enum.A.ARROW_LEFT:if(previousElement)previousElement.focus();else{const lastElement=getHtmlElement(allTabsLabel[allTabsLabel.length-1]);null==lastElement||lastElement.focus()}break;case keyboard_enum.A.ARROW_RIGHT:if(nextElement)nextElement.focus();else{const firstElement=getHtmlElement(allTabsLabel[0]);null==firstElement||firstElement.focus()}break;case keyboard_enum.A.HOME:var _getHtmlElement;null===(_getHtmlElement=getHtmlElement(allTabsLabel[0]))||void 0===_getHtmlElement||_getHtmlElement.focus();break;case keyboard_enum.A.END:var _getHtmlElement1;null===(_getHtmlElement1=getHtmlElement(allTabsLabel[allTabsLabel.length-1]))||void 0===_getHtmlElement1||_getHtmlElement1.focus()}}return(0,jsx_runtime.jsx)("div",{className:Tab_Tab_module.tabLabelContainer,role:"tablist",ref:tabsLabelRef,...rest,children:react.Children.map(children,((child,indexTab)=>{if(react.isValidElement(child)){let ariaControls=`panel-${indexTab}`;return child.props["aria-controls"]&&(ariaControls+=` ${child.props["aria-controls"]}`),react.cloneElement(child,{"aria-controls":ariaControls,"aria-selected":indexTabActive===indexTab,onClick:event=>{child.props.onClick&&child.props.onClick(event),onTabChange(indexTab)},onKeyDown:handleKeyDown,tabIndex:indexTabActive===indexTab?0:-1})}return child}))})}));function _createMdxContent(props){const _components={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,lib.R)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.W8,{title:"Components/Tabs"}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"definition",children:"Definition"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Les ensembles d'onglets / tabs sont construits de plusieurs composants :"}),"\n",(0,jsx_runtime.jsxs)("ul",{children:[(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)(_components.code,{children:"Tabs"})," qui est l'élément parent et qui peut prendre les ",(0,jsx_runtime.jsxs)(_components.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",rel:"nofollow",children:["attributs d'une ",(0,jsx_runtime.jsx)(_components.code,{children:"div"})," HTML"]})," (un composant par ensemble d'onglets) "]}),(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)(_components.code,{children:"TabsLabel"})," qui est l'élément parent des ",(0,jsx_runtime.jsx)(_components.code,{children:"Tab"})," et englobe donc les entêtes, et qui peut prendre les ",(0,jsx_runtime.jsxs)(_components.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",rel:"nofollow",children:["attributs d'une ",(0,jsx_runtime.jsx)(_components.code,{children:"div"})," HTML"]})," (un composant par ensemble d'onglets) "]}),(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)(_components.code,{children:"Tab"})," qui représente l'entête de l'onglet et et qui peut prendre les ",(0,jsx_runtime.jsxs)(_components.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",rel:"nofollow",children:["attributs d'un ",(0,jsx_runtime.jsx)(_components.code,{children:"button"})," HTML"]})," (un composant ",(0,jsx_runtime.jsx)(_components.code,{children:"Tab"})," par onglet)"]}),(0,jsx_runtime.jsxs)("li",{children:[(0,jsx_runtime.jsx)(_components.code,{children:"TabPanel"})," qui représente le contenu d'un onglet et qui peut prendre les ",(0,jsx_runtime.jsxs)(_components.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",rel:"nofollow",children:["attributs d'une ",(0,jsx_runtime.jsx)(_components.code,{children:"div"})," HTML"]})," (un composant par ensemble d'onglets) "]})]}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"example",children:"Example"}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"Ainsi le code suivant :"}),"\n",(0,jsx_runtime.jsx)(_components.pre,{children:(0,jsx_runtime.jsx)(_components.code,{className:"language-typescript",children:"<Tabs>\n    <TabsLabel>\n        <Tab> Onglet 1 </Tab>\n        <Tab> Onglet 2 </Tab>\n        <Tab> Onglet 3 </Tab>\n    </TabsLabel>\n    <TabPanel> Contenu de l'onglet 1 </TabPanel>\n    <TabPanel> Contenu de l'onglet 2 </TabPanel>\n    <TabPanel> Contenu de l'onglet 3 </TabPanel>\n</Tabs>\n"})}),"\n",(0,jsx_runtime.jsx)(_components.p,{children:"donne :"}),"\n",(0,jsx_runtime.jsx)(dist.Hl,{children:(0,jsx_runtime.jsxs)(Tabs,{children:[(0,jsx_runtime.jsxs)(TabsLabel,{children:[(0,jsx_runtime.jsx)(Tab,{children:" Onglet 1 "}),(0,jsx_runtime.jsx)(Tab,{children:" Onglet 2 "}),(0,jsx_runtime.jsx)(Tab,{children:" Onglet 3 "})]}),(0,jsx_runtime.jsx)(TabPanel,{children:" Contenu de l'onglet 1 "}),(0,jsx_runtime.jsx)(TabPanel,{children:" Contenu de l'onglet 2 "}),(0,jsx_runtime.jsx)(TabPanel,{children:" Contenu de l'onglet 3 "})]})})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.R)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}Tabs.__docgenInfo={description:"",methods:[],displayName:"Tabs"},Tab.__docgenInfo={description:"",methods:[],displayName:"Tab"},TabPanel.__docgenInfo={description:"",methods:[],displayName:"TabPanel"},TabsLabel.__docgenInfo={description:"",methods:[],displayName:"TabsLabel"}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./src/client/components/keyboard/keyboard.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var KeyBoard;__webpack_require__.d(__webpack_exports__,{A:()=>KeyBoard}),function(KeyBoard){KeyBoard.TAB="Tab",KeyBoard.SHIFT="Shift",KeyBoard.ARROW_DOWN="ArrowDown",KeyBoard.IE_ARROW_DOWN="Down",KeyBoard.ARROW_LEFT="ArrowLeft",KeyBoard.IE_ARROW_LEFT="LEFT",KeyBoard.ARROW_RIGHT="ArrowRight",KeyBoard.IE_ARROW_RIGHT="Right",KeyBoard.ARROW_UP="ArrowUp",KeyBoard.IE_ARROW_UP="Up",KeyBoard.ENTER="Enter",KeyBoard.ESCAPE="Escape",KeyBoard.IE_ESCAPE="Esc",KeyBoard.BACKSPACE="Backspace",KeyBoard.DELETE="Delete",KeyBoard.SPACE=" ",KeyBoard.HOME="Home",KeyBoard.END="End",KeyBoard.ALT="Alt",KeyBoard.PAGE_UP="PageUp",KeyBoard.PAGE_DOWN="PageDown"}(KeyBoard||(KeyBoard={}))},"./src/client/hooks/useSynchronizedRef.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>useSynchronizedRef});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function useSynchronizedRef(ref){const innerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>innerRef.current),[innerRef]),innerRef}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Tab/Tab.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".Tab_tabLabelContainer__iqxc8,.Tab_tabPanel__xvDfq{max-width:82em;margin:0 auto}.Tab_tabLabel__WhOki[aria-selected=true]{font-weight:700}.Tab_tabLabel__WhOki{padding:.5rem 1rem;font-size:1.125rem;line-height:1.2;border:1px solid #566bb1;border-bottom:none;color:#566bb1}.Tab_tabLabelContainer__iqxc8{display:flex;gap:.5rem}.Tab_tabLabel__WhOki:last-child{margin-right:1rem}.Tab_tabLabel__WhOki:first-child{margin-left:1rem}.Tab_tabLabel__WhOki[aria-selected=true]{padding:5px 11px 8px 11px;background-color:#f6f7fb;border-top:3px solid #566bb1}.Tab_tabPanel__xvDfq{padding:40px 1rem}.Tab_tabPanelContainer__X2eFu{background-color:#f6f7fb}","",{version:3,sources:["webpack://./src/styles/media/_placeholders.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/client/components/ui/Tab/Tab.module.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AAEA,mDACE,cAAA,CACA,aAAA,CCuDF,yCACE,eAAA,CCtDA,qBAeE,kBAAA,CDUF,kBAAA,CACA,eAAA,CCTE,wBAAA,CACA,kBAAA,CACA,aCpBY,CDEZ,8BACE,YAAA,CAEA,SAAA,CAGF,gCACE,iBAZa,CAef,iCACE,gBAhBa,CAyBf,yCAEE,yBAAA,CACA,wBCPiC,CDQjC,4BAAA,CAIJ,qBAKE,iBAAA,CAJA,8BACE,wBCdiC",sourcesContent:['@use "variables";\n\n%max-container {\n  max-width: variables.$breakpoint-xl;\n  margin: 0 auto;\n}','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium {\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "@styles/utilities";\n\n$margin-tab-label: 1rem;\n$backgroung-color-pannel: utilities.$color-background-primary-alternative;\n\n.tab {\n  &Label {\n    &Container{\n      display: flex;\n      @extend %max-container;\n      gap: calc($margin-tab-label/2)\n    }\n\n    &:last-child{\n      margin-right: $margin-tab-label;\n    }\n\n    &:first-child{\n      margin-left: $margin-tab-label;\n    }\n\n    padding: 0.5rem 1rem;\n    @include utilities.text-large;\n    border: 1px solid utilities.$color-primary;\n    border-bottom: none;\n    color: utilities.$color-primary;\n\n    &[aria-selected="true"] {\n      @extend %bold;\n      padding: 5px 11px 8px 11px;\n      background-color: $backgroung-color-pannel;\n      border-top: 3px solid utilities.$color-primary;\n    }\n  }\n\n  &Panel {\n    &Container {\n      background-color: $backgroung-color-pannel;\n    }\n    @extend %max-container;\n    padding: 40px 1rem;\n  }\n}\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={tabLabelContainer:"Tab_tabLabelContainer__iqxc8",tabPanel:"Tab_tabPanel__xvDfq",tabLabel:"Tab_tabLabel__WhOki",tabPanelContainer:"Tab_tabPanelContainer__X2eFu"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext}}]);