"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[2615],{"./src/client/components/ui/LinkStyledAsButton/LinkStylesAsButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,asPrimaryButton:()=>asPrimaryButton,asQuaternaryButton:()=>asQuaternaryButton,asSecondaryButton:()=>asSecondaryButton,asTertiaryButton:()=>asTertiaryButton,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _asPrimaryButton$para,_asPrimaryButton$para2,_asSecondaryButton$pa,_asSecondaryButton$pa2,_asTertiaryButton$par,_asTertiaryButton$par2,_asQuaternaryButton$p,_asQuaternaryButton$p2,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const __WEBPACK_DEFAULT_EXPORT__={args:{children:"Cliquez ici",href:"https://www.1jeune1solution.gouv.fr/",prefetch:!0},component:__webpack_require__("./src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.tsx").g,title:"Components/LinkStyledAsButton/LinkStyledAsButton"};var asPrimaryButton={args:{appearance:"asPrimaryButton"}},asSecondaryButton={args:{appearance:"asSecondaryButton"}},asTertiaryButton={args:{appearance:"asTertiaryButton"}},asQuaternaryButton={args:{appearance:"asQuaternaryButton"}};asPrimaryButton.parameters=_objectSpread(_objectSpread({},asPrimaryButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_asPrimaryButton$para=asPrimaryButton.parameters)||void 0===_asPrimaryButton$para?void 0:_asPrimaryButton$para.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'asPrimaryButton'\n  }\n}"},null===(_asPrimaryButton$para2=asPrimaryButton.parameters)||void 0===_asPrimaryButton$para2||null===(_asPrimaryButton$para2=_asPrimaryButton$para2.docs)||void 0===_asPrimaryButton$para2?void 0:_asPrimaryButton$para2.source)})}),asSecondaryButton.parameters=_objectSpread(_objectSpread({},asSecondaryButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_asSecondaryButton$pa=asSecondaryButton.parameters)||void 0===_asSecondaryButton$pa?void 0:_asSecondaryButton$pa.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'asSecondaryButton'\n  }\n}"},null===(_asSecondaryButton$pa2=asSecondaryButton.parameters)||void 0===_asSecondaryButton$pa2||null===(_asSecondaryButton$pa2=_asSecondaryButton$pa2.docs)||void 0===_asSecondaryButton$pa2?void 0:_asSecondaryButton$pa2.source)})}),asTertiaryButton.parameters=_objectSpread(_objectSpread({},asTertiaryButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_asTertiaryButton$par=asTertiaryButton.parameters)||void 0===_asTertiaryButton$par?void 0:_asTertiaryButton$par.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'asTertiaryButton'\n  }\n}"},null===(_asTertiaryButton$par2=asTertiaryButton.parameters)||void 0===_asTertiaryButton$par2||null===(_asTertiaryButton$par2=_asTertiaryButton$par2.docs)||void 0===_asTertiaryButton$par2?void 0:_asTertiaryButton$par2.source)})}),asQuaternaryButton.parameters=_objectSpread(_objectSpread({},asQuaternaryButton.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_asQuaternaryButton$p=asQuaternaryButton.parameters)||void 0===_asQuaternaryButton$p?void 0:_asQuaternaryButton$p.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    appearance: 'asQuaternaryButton'\n  }\n}"},null===(_asQuaternaryButton$p2=asQuaternaryButton.parameters)||void 0===_asQuaternaryButton$p2||null===(_asQuaternaryButton$p2=_asQuaternaryButton$p2.docs)||void 0===_asQuaternaryButton$p2?void 0:_asQuaternaryButton$p2.source)})});const __namedExportsOrder=["asPrimaryButton","asSecondaryButton","asTertiaryButton","asQuaternaryButton"]},"./src/client/components/ui/Link/Link.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>Link});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),useIsInternalLink=__webpack_require__("./src/client/hooks/useIsInternalLink.ts");function getTextFromChildren(node){return"string"==typeof node||"number"==typeof node?node.toString():Array.isArray(node)?null!==(_React$Children$map$f=null===(_React$Children$map=react.Children.map(node,getTextFromChildren))||void 0===_React$Children$map?void 0:_React$Children$map.filter(Boolean).join(" "))&&void 0!==_React$Children$map$f?_React$Children$map$f:"":react.isValidElement(node)&&null!=node.props.children&&null!==(_React$Children$map$f2=null===(_React$Children$map2=react.Children.map(node.props.children,getTextFromChildren))||void 0===_React$Children$map2?void 0:_React$Children$map2.filter(Boolean).join(" "))&&void 0!==_React$Children$map$f2?_React$Children$map$f2:"";var _React$Children$map$f,_React$Children$map,_React$Children$map$f2,_React$Children$map2}try{getTextFromChildren.displayName="getTextFromChildren",getTextFromChildren.__docgenInfo={description:"",displayName:"getTextFromChildren",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/utils/getTextFromChildren.util.tsx#getTextFromChildren"]={docgenInfo:getTextFromChildren.__docgenInfo,name:"getTextFromChildren",path:"src/client/utils/getTextFromChildren.util.tsx#getTextFromChildren"})}catch(__react_docgen_typescript_loader_error){}var _excluded=["className","children","href","prefetch","title"],__jsx=react.createElement;function Link(props){var className=props.className,children=props.children,href=props.href,_props$prefetch=props.prefetch,prefetch=void 0!==_props$prefetch&&_props$prefetch,title=props.title,rest=(0,objectWithoutProperties.Z)(props,_excluded),isInternalLink=(0,useIsInternalLink.X)(href);function getTitle(){return isInternalLink||null!=title?title:"".concat(getTextFromChildren(children)," - nouvelle fenêtre")}return isInternalLink?__jsx(link_default(),(0,esm_extends.Z)({href,title:getTitle(),prefetch,className:classnames_default()(className)},rest),children):__jsx("a",(0,esm_extends.Z)({href,title:getTitle(),target:"_blank",rel:"noreferrer",className:classnames_default()(className)},rest),children)}try{Link.displayName="Link",Link.__docgenInfo={description:"",displayName:"Link",props:{prefetch:{defaultValue:null,description:"",name:"prefetch",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Link/Link.tsx#Link"]={docgenInfo:Link.__docgenInfo,name:"Link",path:"src/client/components/ui/Link/Link.tsx#Link"})}catch(__react_docgen_typescript_loader_error){}},"./src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{g:()=>LinkStyledAsButton,D:()=>LinkStyledAsButtonWithIcon});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),Link=__webpack_require__("./src/client/components/ui/Link/Link.tsx"),useIsInternalLink=__webpack_require__("./src/client/hooks/useIsInternalLink.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),LinkStyledAsButton_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(LinkStyledAsButton_module.Z,options);const LinkStyledAsButton_LinkStyledAsButton_module=LinkStyledAsButton_module.Z&&LinkStyledAsButton_module.Z.locals?LinkStyledAsButton_module.Z.locals:void 0;var _excluded=["appearance","children","className","href","prefetch"],_excluded2=["children","className","iconPosition","icon","href"],__jsx=react.createElement;function LinkStyledAsButton(props){var appearance=props.appearance,children=props.children,className=props.className,href=props.href,_props$prefetch=props.prefetch,prefetch=void 0!==_props$prefetch&&_props$prefetch,rest=(0,objectWithoutProperties.Z)(props,_excluded),appearanceClass=(0,react.useMemo)((function(){switch(appearance){case"asPrimaryButton":return LinkStyledAsButton_LinkStyledAsButton_module.primaryButton;case"asSecondaryButton":return LinkStyledAsButton_LinkStyledAsButton_module.secondaryButton;case"asTertiaryButton":return LinkStyledAsButton_LinkStyledAsButton_module.tertiaryButton;case"asQuaternaryButton":return LinkStyledAsButton_LinkStyledAsButton_module.quaternaryButton}}),[appearance]);return __jsx(Link.r,(0,esm_extends.Z)({href,prefetch,className:classnames_default()(className,appearanceClass)},rest),children)}function LinkStyledAsButtonWithIcon(props){var children=props.children,className=props.className,iconPosition=props.iconPosition,icon=props.icon,href=props.href,rest=(0,objectWithoutProperties.Z)(props,_excluded2),isInternalLink=(0,useIsInternalLink.X)(href),iconClass=(0,react.useMemo)((function(){switch(iconPosition){case"top":return LinkStyledAsButton_LinkStyledAsButton_module.linkWithTopIcon;case"left":return LinkStyledAsButton_LinkStyledAsButton_module.linkWithLeftIcon;case"right":return LinkStyledAsButton_LinkStyledAsButton_module.linkWithRightIcon}}),[iconPosition]),linkStyledAsButtonWithIconBody=(0,react.useMemo)((function(){switch(iconPosition){case"top":case"left":return __jsx(react.Fragment,null,icon,__jsx("span",{className:LinkStyledAsButton_LinkStyledAsButton_module.linkLabel},children));case"right":return __jsx(react.Fragment,null,__jsx("span",{className:LinkStyledAsButton_LinkStyledAsButton_module.linkLabel},children),icon);default:return __jsx(react.Fragment,null,__jsx("span",{className:LinkStyledAsButton_LinkStyledAsButton_module.linkLabel},children),__jsx(Icon.J,isInternalLink?{name:"arrow-right"}:{name:"external-redirection"}))}}),[icon,iconPosition,children,isInternalLink]);return __jsx(LinkStyledAsButton,(0,esm_extends.Z)({href,className:classnames_default()(className,iconClass)},rest),linkStyledAsButtonWithIconBody)}LinkStyledAsButton.displayName="LinkStyledAsButton",LinkStyledAsButtonWithIcon.displayName="LinkStyledAsButtonWithIcon";try{LinkStyledAsButton.displayName="LinkStyledAsButton",LinkStyledAsButton.__docgenInfo={description:"",displayName:"LinkStyledAsButton",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"string"}},appearance:{defaultValue:null,description:"",name:"appearance",required:!0,type:{name:"enum",value:[{value:'"asPrimaryButton"'},{value:'"asSecondaryButton"'},{value:'"asTertiaryButton"'},{value:'"asQuaternaryButton"'}]}},prefetch:{defaultValue:null,description:"",name:"prefetch",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.tsx#LinkStyledAsButton"]={docgenInfo:LinkStyledAsButton.__docgenInfo,name:"LinkStyledAsButton",path:"src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.tsx#LinkStyledAsButton"})}catch(__react_docgen_typescript_loader_error){}try{LinkStyledAsButtonWithIcon.displayName="LinkStyledAsButtonWithIcon",LinkStyledAsButtonWithIcon.__docgenInfo={description:"",displayName:"LinkStyledAsButtonWithIcon",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"string"}},appearance:{defaultValue:null,description:"",name:"appearance",required:!0,type:{name:"enum",value:[{value:'"asPrimaryButton"'},{value:'"asSecondaryButton"'},{value:'"asTertiaryButton"'},{value:'"asQuaternaryButton"'}]}},prefetch:{defaultValue:null,description:"",name:"prefetch",required:!1,type:{name:"boolean"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},iconPosition:{defaultValue:null,description:"",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.tsx#LinkStyledAsButtonWithIcon"]={docgenInfo:LinkStyledAsButtonWithIcon.__docgenInfo,name:"LinkStyledAsButtonWithIcon",path:"src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.tsx#LinkStyledAsButtonWithIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/client/hooks/useIsInternalLink.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useIsInternalLink});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),PATHNAME_PREFIX="/",ANCHOR_PREFIX="#";function useIsInternalLink(href){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),origin=_useState[0],setOrigin=_useState[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){setOrigin(window.location.origin)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return(null==href?void 0:href.startsWith(origin))||(null==href?void 0:href.startsWith(PATHNAME_PREFIX))||(null==href?void 0:href.startsWith(ANCHOR_PREFIX))}),[href,origin])}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ANyfpaTzW3JUvraA2u9j,.a3nCEviGlzcBgHKggJyQ,.WvT3RfEZyaExPNiYYmcb{padding:.5rem .75rem;font-size:.875rem;line-height:1.4}@media(min-width: 62em){.ANyfpaTzW3JUvraA2u9j,.a3nCEviGlzcBgHKggJyQ,.WvT3RfEZyaExPNiYYmcb{font-size:1rem}}.ANyfpaTzW3JUvraA2u9j svg,.a3nCEviGlzcBgHKggJyQ svg,.WvT3RfEZyaExPNiYYmcb svg{height:.875rem;width:.875rem}@media(min-width: 62em){.ANyfpaTzW3JUvraA2u9j,.a3nCEviGlzcBgHKggJyQ,.WvT3RfEZyaExPNiYYmcb{padding:.75rem 1rem}.ANyfpaTzW3JUvraA2u9j svg,.a3nCEviGlzcBgHKggJyQ svg,.WvT3RfEZyaExPNiYYmcb svg{height:1rem;width:1rem}}.ANyfpaTzW3JUvraA2u9j,.a3nCEviGlzcBgHKggJyQ,.WvT3RfEZyaExPNiYYmcb{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:50px;text-decoration:none;outline-offset:4px}.ANyfpaTzW3JUvraA2u9j>svg,.a3nCEviGlzcBgHKggJyQ>svg,.WvT3RfEZyaExPNiYYmcb>svg{vertical-align:middle}.ANyfpaTzW3JUvraA2u9j,.a3nCEviGlzcBgHKggJyQ,.WvT3RfEZyaExPNiYYmcb{white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.ANyfpaTzW3JUvraA2u9j{border:1px solid #566bb1;background-color:#566bb1;color:#fff}.ANyfpaTzW3JUvraA2u9j:hover{background-color:#040085;border-color:#040085}.a3nCEviGlzcBgHKggJyQ{border:1px solid #566bb1;color:#566bb1;background-color:#fff}.a3nCEviGlzcBgHKggJyQ:hover{background-color:#ececff;border-color:#566bb1;color:#566bb1}.WvT3RfEZyaExPNiYYmcb{border:1px solid #566bb1;color:#566bb1;background-color:#ececff}.WvT3RfEZyaExPNiYYmcb:hover{background-color:#6e61e9;border-color:#6e61e9;color:#fff}.zfrt1TjQoKwaBcRHOWcN{display:flex;color:#566bb1;text-decoration:none;border-radius:0;padding:0;gap:.5rem}.zfrt1TjQoKwaBcRHOWcN:hover{text-decoration:underline;text-underline-offset:3px}.oWUoI0TMV2HFIA6e3ugX,.RrlQT2qNJIulk7beGvyw,.DPMMl26XZP6XiSRrTCTC{display:inline-flex;align-items:center;justify-content:center}.RrlQT2qNJIulk7beGvyw .xBf5HDxQNbMqsDAKxqAM{margin-left:.5rem}.DPMMl26XZP6XiSRrTCTC .xBf5HDxQNbMqsDAKxqAM{margin-top:.5rem;display:block}","",{version:3,sources:["webpack://./src/styles/components/button/_placeholders.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/LinkStyledAsButton/LinkStyledAsButton.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAGA,kEACE,oBAAA,CC+CA,iBAAA,CACA,eAAA,CC9CE,wBFHJ,kECoDI,cAAA,CAAA,CDjDF,8EACE,cAAA,CACA,aAAA,CEFA,wBFHJ,kEASI,mBAAA,CAEA,8EACE,WAAA,CACA,UAAA,CAAA,CGdN,kEACE,mBAAA,CACA,kBAAA,CACA,sBAAA,CACA,SAAA,CACA,kBAAA,CACA,oBAAA,CACA,kBAAA,CAEA,8EACE,qBAAA,CAIJ,kEACE,kBAAA,CACA,sBAAA,CACA,iBAAA,CAGF,sBAEE,wBAAA,CACA,wBCpBU,CDqBV,UCNM,CDQN,4BACE,wBCtBS,CDuBT,oBCvBS,CD2Bb,sBAEE,wBAAA,CACA,aChCU,CDiCV,qBClBM,CDoBN,4BACE,wBCnBU,CDoBV,oBCrCQ,CDsCR,aCtCQ,CD0CZ,sBAEE,wBAAA,CACA,aC7CU,CD8CV,wBC7BY,CD+BZ,4BACE,wBChDa,CDiDb,oBCjDa,CDkDb,UCpCI,CDwCR,sBACE,YAAA,CACA,aCzDU,CD0DV,oBAAA,CACA,eAAA,CACA,SAAA,CACA,SAAA,CAEA,4BACE,yBAAA,CACA,yBAAA,CAIJ,kEACE,mBAAA,CACA,kBAAA,CACA,sBAAA,CAIA,4CACE,iBAAA,CAKF,4CACE,gBAAA,CACA,aAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/typography/placeholders";\n\n%button {\n  padding: 0.5rem 0.75rem;\n  @include placeholders.text-interactive-medium;\n  svg {\n    height: 0.875rem;\n    width: 0.875rem;\n  }\n\n  @include mixins.media(large) {\n    padding: 0.75rem 1rem;\n\n    svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n\n.primaryButton, .secondaryButton, .tertiaryButton{\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: .5rem;\n  border-radius: 50px;\n  text-decoration: none;\n  outline-offset: 4px;\n\n  & > svg {\n    vertical-align: middle;\n  }\n}\n\n.primaryButton, .secondaryButton, .tertiaryButton {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow-x: hidden;\n}\n\n.primaryButton {\n  @extend %button;\n  border: 1px solid utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-on-primary;\n\n  &:hover {\n    background-color: utilities-deprecated.$color-primary-on-hover;\n    border-color: utilities-deprecated.$color-primary-on-hover;\n  }\n}\n\n.secondaryButton {\n  @extend %button;\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$white;\n\n  &:hover {\n    background-color: utilities-deprecated.$color-background-white-titan;\n    border-color: utilities-deprecated.$color-primary;\n    color: utilities-deprecated.$color-primary;\n  }\n}\n\n.tertiaryButton {\n  @extend %button;\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-background-white-titan;\n\n  &:hover {\n    background-color: utilities-deprecated.$color-tertiary-on-hover;\n    border-color: utilities-deprecated.$color-tertiary-on-hover;\n    color: utilities-deprecated.$white;\n  }\n}\n\n.quaternaryButton {\n  display: flex;\n  color: utilities-deprecated.$color-primary;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 0;\n  gap: .5rem;\n\n  &:hover {\n    text-decoration: underline;\n    text-underline-offset: 3px;\n  }\n}\n\n.linkWithRightIcon, .linkWithLeftIcon, .linkWithTopIcon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.linkWithLeftIcon {\n  & .linkLabel {\n    margin-left: 0.5rem;\n  }\n}\n\n.linkWithTopIcon {\n  & .linkLabel {\n    margin-top: 0.5rem;\n    display: block;\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={primaryButton:"ANyfpaTzW3JUvraA2u9j",secondaryButton:"a3nCEviGlzcBgHKggJyQ",tertiaryButton:"WvT3RfEZyaExPNiYYmcb",quaternaryButton:"zfrt1TjQoKwaBcRHOWcN",linkWithRightIcon:"oWUoI0TMV2HFIA6e3ugX",linkWithLeftIcon:"RrlQT2qNJIulk7beGvyw",linkWithTopIcon:"DPMMl26XZP6XiSRrTCTC",linkLabel:"xBf5HDxQNbMqsDAKxqAM"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);