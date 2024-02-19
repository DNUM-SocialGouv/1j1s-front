"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[1968],{"./src/client/components/ui/Footnote/Footnote.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Footnote_stories});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),Link=__webpack_require__("./src/client/components/ui/Link/Link.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Footnote_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Footnote/Footnote.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Footnote_module.Z,options);const Footnote_Footnote_module=Footnote_module.Z&&Footnote_module.Z.locals?Footnote_module.Z.locals:void 0;var _excluded=["children","htmlFor","className"],_excluded2=["to","className"],__jsx=react.createElement,FootnoteComponent=(0,react.forwardRef)((function Footnote(_ref,ref){var children=_ref.children,htmlFor=_ref.htmlFor,className=_ref.className,pProps=(0,objectWithoutProperties.Z)(_ref,_excluded);return __jsx("p",(0,esm_extends.Z)({},pProps,{className:classnames_default()(className,Footnote_Footnote_module.footnote),ref}),__jsx("abbr",{title:"note de pied de page"},"*")," ",children," ",__jsx(Link.r,{href:"#".concat(htmlFor),title:"Retour à la référence"},__jsx(Icon.J,{name:"arrow-up",className:Footnote_Footnote_module.icon})))})),Reference=(0,react.forwardRef)((function Reference(_ref2,ref){var to=_ref2.to,className=_ref2.className,aProps=(0,objectWithoutProperties.Z)(_ref2,_excluded2);return __jsx("a",(0,esm_extends.Z)({href:"#".concat(to),className:classnames_default()(className,Footnote_Footnote_module.reference),"aria-label":"note de pied de page"},aProps,{ref}),__jsx("abbr",{title:"note de pied de page"},"*"))})),Footnote=Object.assign(FootnoteComponent,{Reference});try{Footnote.displayName="Footnote",Footnote.__docgenInfo={description:"",displayName:"Footnote",props:{htmlFor:{defaultValue:null,description:"",name:"htmlFor",required:!0,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Footnote/Footnote.tsx#Footnote"]={docgenInfo:Footnote.__docgenInfo,name:"Footnote",path:"src/client/components/ui/Footnote/Footnote.tsx#Footnote"})}catch(__react_docgen_typescript_loader_error){}var Footnote_stories_jsx=react.createElement;const Footnote_stories={component:Footnote,title:"Components/Footnote"};var Example={args:{children:Footnote_stories_jsx("p",null,"Note de pied de page"),htmlFor:"string",id:"string"}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: <p>{'Note de pied de page'}</p>,\n    htmlFor: 'string',\n    id: 'string'\n  }\n}",...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]},"./src/client/Errors/NoProviderError.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>NoProviderError});var _home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/createClass.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/inherits.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function _callSuper(t,o,e){return o=(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.Z)(o),(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_1__.Z)(t,_isNativeReflectConstruct()?Reflect.construct(o,e||[],(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.Z)(t).constructor):o.apply(t,e))}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function _isNativeReflectConstruct(){return!!t})()}var NoProviderError=function(_Error){function NoProviderError(context){var _this;return(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__.Z)(this,NoProviderError),_this=_callSuper(this,NoProviderError,["Context provider not found".concat(null!=context&&context.displayName?" for ".concat(context.displayName):"")]),(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__.Z)((0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__.Z)(_this),"name","NoProviderError"),_this}return(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_2__.Z)(NoProviderError,_Error),(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__.Z)(NoProviderError)}((0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_7__.Z)(Error))},"./src/client/components/ui/Link/Link.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>Link});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),Icon_Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),NoProviderError=__webpack_require__("./src/client/Errors/NoProviderError.ts"),useIsInternalLink=__webpack_require__("./src/client/hooks/useIsInternalLink.ts");function getTextFromChildren(node){return"string"==typeof node||"number"==typeof node?node.toString():Array.isArray(node)?null!==(_React$Children$map$f=null===(_React$Children$map=react.Children.map(node,getTextFromChildren))||void 0===_React$Children$map?void 0:_React$Children$map.filter(Boolean).join(" "))&&void 0!==_React$Children$map$f?_React$Children$map$f:"":react.isValidElement(node)&&null!=node.props.children&&null!==(_React$Children$map$f2=null===(_React$Children$map2=react.Children.map(node.props.children,getTextFromChildren))||void 0===_React$Children$map2?void 0:_React$Children$map2.filter(Boolean).join(" "))&&void 0!==_React$Children$map$f2?_React$Children$map$f2:"";var _React$Children$map$f,_React$Children$map,_React$Children$map$f2,_React$Children$map2}try{getTextFromChildren.displayName="getTextFromChildren",getTextFromChildren.__docgenInfo={description:"",displayName:"getTextFromChildren",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/utils/getTextFromChildren.util.tsx#getTextFromChildren"]={docgenInfo:getTextFromChildren.__docgenInfo,name:"getTextFromChildren",path:"src/client/utils/getTextFromChildren.util.tsx#getTextFromChildren"})}catch(__react_docgen_typescript_loader_error){}var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Link_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Link/Link.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Link_module.Z,options);const Link_Link_module=Link_module.Z&&Link_module.Z.locals?Link_module.Z.locals:void 0;var _excluded=["className","appearance","children","href","prefetch","title"],_excluded2=["name","className"],__jsx=react.createElement,LinkContext=(0,react.createContext)(null),useLinkContext=function useLinkContext(){var linkContext=(0,react.useContext)(LinkContext);if(null===linkContext)throw new NoProviderError.Z(LinkContext);return linkContext};function Link(props){var className=props.className,appearance=props.appearance,children=props.children,href=props.href,_props$prefetch=props.prefetch,prefetch=void 0!==_props$prefetch&&_props$prefetch,title=props.title,rest=(0,objectWithoutProperties.Z)(props,_excluded),_useState=(0,react.useState)(!1),isLinkIcon=_useState[0],setIsLinkIcon=_useState[1],isInternalLink=(0,useIsInternalLink.X)(href),appearanceClass=function appearanceClass(){switch(appearance){case"asPrimaryButton":return Link_Link_module.primary;case"asSecondaryButton":return Link_Link_module.secondary;case"asTertiaryButton":return Link_Link_module.tertiary;case"asQuaternaryButton":return Link_Link_module.quaternary;default:return}};function getTitle(){return isInternalLink||null!=title?title:"".concat(getTextFromChildren(children)," - nouvelle fenêtre")}return __jsx(LinkContext.Provider,{value:{href,setIsLinkIcon}},isInternalLink?__jsx(link_default(),(0,esm_extends.Z)({href,title:getTitle(),prefetch,className:classnames_default()(className,appearanceClass(),isLinkIcon?Link_Link_module.linkWithIcon:"")},rest),children):__jsx("a",(0,esm_extends.Z)({href,title:getTitle(),target:"_blank",rel:"noreferrer",className:classnames_default()(className,appearanceClass(),isLinkIcon?Link_Link_module.linkWithIcon:"")},rest),children))}function LinkIcon(props){var name=props.name,className=props.className,rest=(0,objectWithoutProperties.Z)(props,_excluded2),setIsLinkIcon=useLinkContext().setIsLinkIcon;return(0,react.useEffect)((function(){setIsLinkIcon(!0)}),[setIsLinkIcon]),__jsx("span",{className:Link_Link_module.icon},name?__jsx(Icon_Icon.J,(0,esm_extends.Z)({className,name},rest)):__jsx(DefaultLinkIcon,null))}function DefaultLinkIcon(){var href=useLinkContext().href,isInternalLink=(0,useIsInternalLink.X)(href);return __jsx(react.Fragment,null,__jsx(Icon_Icon.J,isInternalLink?{name:"arrow-right"}:{name:"external-redirection"}))}LinkIcon.displayName="LinkIcon",Link.Icon=LinkIcon;try{Link.displayName="Link",Link.__docgenInfo={description:"",displayName:"Link",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"string"}},appearance:{defaultValue:null,description:"",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"asPrimaryButton"'},{value:'"asSecondaryButton"'},{value:'"asTertiaryButton"'},{value:'"asQuaternaryButton"'}]}},prefetch:{defaultValue:null,description:"",name:"prefetch",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Link/Link.tsx#Link"]={docgenInfo:Link.__docgenInfo,name:"Link",path:"src/client/components/ui/Link/Link.tsx#Link"})}catch(__react_docgen_typescript_loader_error){}try{Icon.displayName="Link.Icon",Icon.__docgenInfo={description:"",displayName:"Link.Icon",props:{name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"enum",value:[{value:'"menu"'},{value:'"table"'},{value:'"filter"'},{value:'"user"'},{value:'"account"'},{value:'"angle-down"'},{value:'"angle-left"'},{value:'"angle-left-from-line"'},{value:'"angle-right"'},{value:'"angle-right-from-line"'},{value:'"angle-up"'},{value:'"arrow-left"'},{value:'"arrow-right"'},{value:'"arrow-up"'},{value:'"award"'},{value:'"bed"'},{value:'"bike"'},{value:'"book"'},{value:'"brief-case"'},{value:'"burger-menu"'},{value:'"burger-menu-left"'},{value:'"check-line"'},{value:'"car"'},{value:'"clean-hands"'},{value:'"close"'},{value:'"community"'},{value:'"compass"'},{value:'"error"'},{value:'"euro"'},{value:'"exit"'},{value:'"external-redirection"'},{value:'"home"'},{value:'"information"'},{value:'"iron"'},{value:'"lock"'},{value:'"magnifying-glass"'},{value:'"mail"'},{value:'"map-pin"'},{value:'"mark-pen"'},{value:'"microwave"'},{value:'"phone"'},{value:'"plant"'},{value:'"play-circle"'},{value:'"restaurant"'},{value:'"roadmap"'},{value:'"sport"'},{value:'"suitcase"'},{value:'"sun"'},{value:'"swimming"'},{value:'"temperature"'},{value:'"thumb-up"'},{value:'"trophy"'},{value:'"TV"'},{value:'"vacuum"'},{value:'"washing-machine"'},{value:'"wifi"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Link/Link.tsx#Link.Icon"]={docgenInfo:Link.Icon.__docgenInfo,name:"Link.Icon",path:"src/client/components/ui/Link/Link.tsx#Link.Icon"})}catch(__react_docgen_typescript_loader_error){}try{LinkIcon.displayName="LinkIcon",LinkIcon.__docgenInfo={description:"",displayName:"LinkIcon",props:{name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"enum",value:[{value:'"menu"'},{value:'"table"'},{value:'"filter"'},{value:'"user"'},{value:'"account"'},{value:'"angle-down"'},{value:'"angle-left"'},{value:'"angle-left-from-line"'},{value:'"angle-right"'},{value:'"angle-right-from-line"'},{value:'"angle-up"'},{value:'"arrow-left"'},{value:'"arrow-right"'},{value:'"arrow-up"'},{value:'"award"'},{value:'"bed"'},{value:'"bike"'},{value:'"book"'},{value:'"brief-case"'},{value:'"burger-menu"'},{value:'"burger-menu-left"'},{value:'"check-line"'},{value:'"car"'},{value:'"clean-hands"'},{value:'"close"'},{value:'"community"'},{value:'"compass"'},{value:'"error"'},{value:'"euro"'},{value:'"exit"'},{value:'"external-redirection"'},{value:'"home"'},{value:'"information"'},{value:'"iron"'},{value:'"lock"'},{value:'"magnifying-glass"'},{value:'"mail"'},{value:'"map-pin"'},{value:'"mark-pen"'},{value:'"microwave"'},{value:'"phone"'},{value:'"plant"'},{value:'"play-circle"'},{value:'"restaurant"'},{value:'"roadmap"'},{value:'"sport"'},{value:'"suitcase"'},{value:'"sun"'},{value:'"swimming"'},{value:'"temperature"'},{value:'"thumb-up"'},{value:'"trophy"'},{value:'"TV"'},{value:'"vacuum"'},{value:'"washing-machine"'},{value:'"wifi"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Link/Link.tsx#LinkIcon"]={docgenInfo:LinkIcon.__docgenInfo,name:"LinkIcon",path:"src/client/components/ui/Link/Link.tsx#LinkIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/client/hooks/useIsInternalLink.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>useIsInternalLink});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),PATHNAME_PREFIX="/",ANCHOR_PREFIX="#";function useIsInternalLink(href){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),origin=_useState[0],setOrigin=_useState[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){setOrigin(window.location.origin)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return(null==href?void 0:href.startsWith(origin))||(null==href?void 0:href.startsWith(PATHNAME_PREFIX))||(null==href?void 0:href.startsWith(ANCHOR_PREFIX))}),[href,origin])}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Footnote/Footnote.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".CZ2VwyAC4gghwqLAAuw2{font-size:.75rem;line-height:1.25rem}@media(min-width: 62em){.CZ2VwyAC4gghwqLAAuw2{font-size:.875rem;line-height:1.5rem}}.CZ2VwyAC4gghwqLAAuw2{text-align:justify}@media(min-width: 48em){.CZ2VwyAC4gghwqLAAuw2{text-align:end}}.CZ2VwyAC4gghwqLAAuw2 .cLiwcV7K97v8SwTh9H3H{color:#566bb1;height:1em;width:1em}.OcryNfXf99NPkQutrO3G{color:#566bb1;text-decoration:none}","",{version:3,sources:["webpack://./src/styles/typography/_placeholders-deprecated.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Footnote/Footnote.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAwCA,sBACE,gBAAA,CACA,mBAAA,CCpCE,wBDkCJ,sBAKI,iBAAA,CACA,kBAAA,CAAA,CE5CJ,sBAEE,kBAAA,CAAA,wBAFF,sBAII,cAAA,CAAA,CAGF,4CACE,aCLQ,CDMR,UAAA,CACA,SAAA,CAIJ,sBACE,aCZU,CDaV,oBAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/theme/variables-deprecated.scss";\n\n%text-regular {\n  font-size: .875rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%text-medium {\n  font-size: 1rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1.125rem;\n  }\n}\n\n%text-xLarge {\n  font-size: 1.5rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n%text-large {\n  font-size: 1.125rem;\n  line-height: 1.8rem;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n    line-height: 2rem;\n  }\n}\n\n%text-small {\n  font-size: .75rem;\n  line-height: 1.25rem;\n\n  @include mixins.media(large) {\n    font-size: .875rem;\n    line-height: 1.5rem;\n  }\n}\n\n%headline {\n  font-size: 1.25rem;\n  line-height: 2rem;\n  color: variables-deprecated.$color-primary;\n\n  @include mixins.media(large) {\n    font-size: 2rem;\n    line-height: 3rem;\n  }\n}\n\n%subheading {\n  font-size: 1.25rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n\n.footnote {\n  @extend %text-small;\n  text-align: justify;\n  @include utilities-deprecated.media(medium) {\n    text-align: end;\n  }\n\n  & .icon {\n    color: utilities-deprecated.$color-primary;\n    height: 1em;\n    width: 1em;\n  }\n}\n\n.reference {\n  color: utilities-deprecated.$color-primary;\n  text-decoration: none;\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={footnote:"CZ2VwyAC4gghwqLAAuw2",icon:"cLiwcV7K97v8SwTh9H3H",reference:"OcryNfXf99NPkQutrO3G"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Link/Link.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".jWTrkiW12DOLjpNBMT_K,.DoxQtfGcwc5Wy3Cf61xp,.MaTSoUKPeKT_zcWDFxRg{padding:.5rem .75rem;font-size:.875rem;line-height:1.4}@media(min-width: 62em){.jWTrkiW12DOLjpNBMT_K,.DoxQtfGcwc5Wy3Cf61xp,.MaTSoUKPeKT_zcWDFxRg{font-size:1rem}}.jWTrkiW12DOLjpNBMT_K svg,.DoxQtfGcwc5Wy3Cf61xp svg,.MaTSoUKPeKT_zcWDFxRg svg{height:.875rem;width:.875rem}@media(min-width: 62em){.jWTrkiW12DOLjpNBMT_K,.DoxQtfGcwc5Wy3Cf61xp,.MaTSoUKPeKT_zcWDFxRg{padding:.75rem 1rem}.jWTrkiW12DOLjpNBMT_K svg,.DoxQtfGcwc5Wy3Cf61xp svg,.MaTSoUKPeKT_zcWDFxRg svg{height:1rem;width:1rem}}.jWTrkiW12DOLjpNBMT_K,.DoxQtfGcwc5Wy3Cf61xp,.MaTSoUKPeKT_zcWDFxRg{border-radius:50px;text-decoration:none;outline-offset:4px;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.jWTrkiW12DOLjpNBMT_K{border:1px solid #566bb1;background-color:#566bb1;color:#fff}.jWTrkiW12DOLjpNBMT_K:hover{background-color:#040085;border-color:#040085}.DoxQtfGcwc5Wy3Cf61xp{border:1px solid #566bb1;color:#566bb1;background-color:#fff}.DoxQtfGcwc5Wy3Cf61xp:hover{background-color:#ececff;color:#566bb1}.MaTSoUKPeKT_zcWDFxRg{border:1px solid #566bb1;color:#566bb1;background-color:#ececff}.MaTSoUKPeKT_zcWDFxRg:hover{background-color:#6e61e9;border-color:#6e61e9;color:#fff}.FgTUDvaMUjnpZSiiDxX1{color:#566bb1;text-decoration:none;border-radius:0;padding:0}.FgTUDvaMUjnpZSiiDxX1:hover{text-decoration:underline;text-underline-offset:3px}.gU6lKfd02hucwQoN5N6w{display:grid;grid-template-columns:auto auto;gap:.5rem;width:fit-content}.gU6lKfd02hucwQoN5N6w .W_rFCLb31qgkqMB7NhSj{display:inline-flex;align-items:center}","",{version:3,sources:["webpack://./src/styles/components/button/_placeholders.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Link/Link.module.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AAGA,kEACE,oBAAA,CC+CA,iBAAA,CACA,eAAA,CC9CE,wBFHJ,kECoDI,cAAA,CAAA,CDjDF,8EACE,cAAA,CACA,aAAA,CEFA,wBFHJ,kEASI,mBAAA,CAEA,8EACE,WAAA,CACA,UAAA,CAAA,CGdN,kEAEE,kBAAA,CACA,oBAAA,CACA,kBAAA,CACA,kBAAA,CACA,sBAAA,CACA,iBAAA,CAGF,sBACE,wBAAA,CACA,wBCgC6B,CD/B7B,UCsB2B,CDpB3B,4BACE,wBC6BiC,CD5BjC,oBC4BiC,CDxBrC,sBACE,wBAAA,CACA,aC+B0B,CD9B1B,qBCsB+B,CDpB/B,4BACE,wBCoBmC,CDnBnC,aC2B8B,CDvBlC,sBACE,wBAAA,CACA,aCE+B,CDD/B,wBCa8B,CDX9B,4BACE,wBCWkC,CDVlC,oBCUkC,CDTlC,UCiB6B,CDbjC,sBACE,aC1Cc,CD2Cd,oBAAA,CACA,eAAA,CACA,SAAA,CAEA,4BACE,yBAAA,CACA,yBAAA,CAIJ,sBACE,YAAA,CACA,+BAAA,CACA,SAAA,CACA,iBAAA,CAEA,4CACE,mBAAA,CACA,kBAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/typography/placeholders";\n\n%button {\n  padding: 0.5rem 0.75rem;\n  @include placeholders.text-interactive-medium;\n  svg {\n    height: 0.875rem;\n    width: 0.875rem;\n  }\n\n  @include mixins.media(large) {\n    padding: 0.75rem 1rem;\n\n    svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities";\n\n.primary, .secondary, .tertiary {\n  @extend %button;\n  border-radius: 50px;\n  text-decoration: none;\n  outline-offset: 4px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow-x: hidden;\n}\n\n.primary {\n  border: 1px solid utilities.$color-cta-background-primary;\n  background-color: utilities.$color-cta-background-primary;\n  color: utilities.$color-text-primary-inverse;\n\n  &:hover {\n    background-color: utilities.$color-cta-background-primary-hover;\n    border-color: utilities.$color-cta-background-primary-hover;\n  }\n}\n\n.secondary {\n  border: 1px solid utilities.$color-primary;\n  color: utilities.$color-cta-texte-secondary;\n  background-color: utilities.$color-cta-background-secondary;\n\n  &:hover {\n    background-color: utilities.$color-cta-background-secondary-hover;\n    color: utilities.$color-cta-texte-secondary-hover;\n  }\n}\n\n.tertiary {\n  border: 1px solid utilities.$color-primary;\n  color: utilities.$color-text-primary-alternative;\n  background-color: utilities.$color-cta-background-tertiary;\n\n  &:hover {\n    background-color: utilities.$color-cta-background-tertiary-hover;\n    border-color: utilities.$color-cta-background-tertiary-hover;\n    color: utilities.$color-cta-texte-tertiary-hover;\n  }\n}\n\n.quaternary {\n  color: utilities.$color-primary;\n  text-decoration: none;\n  border-radius: 0;\n  padding: 0;\n\n  &:hover {\n    text-decoration: underline;\n    text-underline-offset: 3px;\n  }\n}\n\n.linkWithIcon {\n  display: grid;\n  grid-template-columns: auto auto;\n  gap: 0.5rem;\n  width: fit-content;\n\n  & .icon {\n    display: inline-flex;\n    align-items: center;\n  }\n}\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n$color-text-placeholder: #666666;\n\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={primary:"jWTrkiW12DOLjpNBMT_K",secondary:"DoxQtfGcwc5Wy3Cf61xp",tertiary:"MaTSoUKPeKT_zcWDFxRg",quaternary:"FgTUDvaMUjnpZSiiDxX1",linkWithIcon:"gU6lKfd02hucwQoN5N6w",icon:"W_rFCLb31qgkqMB7NhSj"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);