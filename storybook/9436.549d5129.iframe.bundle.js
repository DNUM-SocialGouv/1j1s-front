(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[9436],{"./node_modules/@storybook/nextjs/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/nextjs/dist sync recursive",module.exports=webpackEmptyContext},"./src/client/components/ui/Card/Card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>Card});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_image=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),react=__webpack_require__("./node_modules/react/index.js"),ButtonComponent=__webpack_require__("./src/client/components/ui/Button/ButtonComponent.tsx"),Link_Link=__webpack_require__("./src/client/components/ui/Link/Link.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Card_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Card/Card.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Card_module.Z,options);const Card_Card_module=Card_module.Z&&Card_module.Z.locals?Card_module.Z.locals:void 0;var _excluded=["children","className","layout"],_excluded2=["children","className"],_excluded3=["appearance","className","icon","label"],_excluded4=["appearance","className","icon","label"],_excluded5=["className","href","label"],_excluded6=["className","src","alt","sizes"],_excluded7=["children","className","titleAs"],__jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function Card(_ref){var children=_ref.children,className=_ref.className,layout=_ref.layout,rest=(0,objectWithoutProperties.Z)(_ref,_excluded),layoutClass=(0,react.useMemo)((function(){switch(layout){case"horizontal":return Card_Card_module.cardComponentHorizontal;case"vertical":return Card_Card_module.cardComponentVertical}}),[layout]);return __jsx("div",(0,esm_extends.Z)({className:classnames_default()(Card_Card_module.cardComponent,layoutClass,className)},rest),children)}function CardContent(_ref2){var children=_ref2.children,className=_ref2.className,rest=(0,objectWithoutProperties.Z)(_ref2,_excluded2);return __jsx("div",(0,esm_extends.Z)({className},rest),children)}function CardButton(props){var _props$appearance=props.appearance,appearance=void 0===_props$appearance?"tertiary":_props$appearance,className=props.className,icon=props.icon,label=props.label,rest=(0,objectWithoutProperties.Z)(props,_excluded3);return __jsx(ButtonComponent.r,(0,esm_extends.Z)({className,appearance,label:label||"",icon,iconPosition:"right"},rest))}function CardFakeLink(props){var _props$appearance2=props.appearance,appearance=void 0===_props$appearance2?"quaternary":_props$appearance2,className=props.className,icon=props.icon,label=props.label,rest=(0,objectWithoutProperties.Z)(props,_excluded4),appearanceClass=(0,react.useMemo)((function(){switch(appearance){case"primary":return Card_Card_module.cardButtonPrimary;case"secondary":return Card_Card_module.cardButtonSecondary;case"tertiary":return Card_Card_module.cardButtonTertiary;case"quaternary":return Card_Card_module.cardButtonQuaternary}}),[appearance]);return __jsx("span",(0,esm_extends.Z)({className:classnames_default()(className,appearanceClass,Card_Card_module.cardButton)},rest),__jsx("span",null,label),icon)}function CardLink(props){var className=props.className,href=props.href,label=props.label,rest=(0,objectWithoutProperties.Z)(props,_excluded5);return __jsx(Link_Link.r,(0,esm_extends.Z)({className:classnames_default()(className,Card_Card_module.cardLink),href},rest),label)}function CardImage(props){var className=props.className,src=props.src,_props$alt=props.alt,alt=void 0===_props$alt?"":_props$alt,_props$sizes=props.sizes,sizes=void 0===_props$sizes?"100vw":_props$sizes,rest=(0,objectWithoutProperties.Z)(props,_excluded6);return __jsx("div",(0,esm_extends.Z)({className:classnames_default()(Card_Card_module.cardImageWrapper,className)},rest),__jsx(next_image.Z,{src,alt,fill:!0,sizes}))}Card.displayName="Card",CardContent.displayName="CardContent",CardButton.displayName="CardButton",CardFakeLink.displayName="CardFakeLink",CardLink.displayName="CardLink",CardImage.displayName="CardImage",Card.Button=CardButton,Card.Content=CardContent,Card.FakeLink=CardFakeLink,Card.Image=CardImage,Card.Link=CardLink,Card.Title=function CardTitle(props){var children=props.children,className=props.className,titleAs=props.titleAs,rest=(0,objectWithoutProperties.Z)(props,_excluded7);return react.createElement(titleAs,function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({className:classnames_default()(Card_Card_module.cardTitle,className)},rest),children)},Card.__docgenInfo={description:"",methods:[{name:"Button",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<typeof ButtonComponent>",elements:[{name:"ButtonComponent"}]}}],returns:null},{name:"Content",docblock:null,modifiers:["static"],params:[{name:"{ children, className, ...rest }: React.ComponentPropsWithoutRef<'div'>",type:{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<'div'>",elements:[{name:"literal",value:"'div'"}]}}],returns:null},{name:"FakeLink",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:"CardCallToActionProps & React.ComponentPropsWithoutRef<'span'>",elements:[{name:"intersection",raw:"Required<Pick<ButtonComponentProps, 'appearance' | 'label'>>\n& { icon: React.ReactNode }",elements:[{name:"Required",elements:[{name:"Pick",elements:[{name:"ButtonComponentProps"},{name:"union",raw:"'appearance' | 'label'",elements:[{name:"literal",value:"'appearance'"},{name:"literal",value:"'label'"}]}],raw:"Pick<ButtonComponentProps, 'appearance' | 'label'>"}],raw:"Required<Pick<ButtonComponentProps, 'appearance' | 'label'>>"},{name:"signature",type:"object",raw:"{ icon: React.ReactNode }",signature:{properties:[{key:"icon",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}}]}}]},{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<'span'>",elements:[{name:"literal",value:"'span'"}]}]}}],returns:null},{name:"Image",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:"CardImageProps & React.ComponentPropsWithoutRef<'div'>",elements:[{name:"CardImageProps"},{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<'div'>",elements:[{name:"literal",value:"'div'"}]}]}}],returns:null},{name:"Link",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:"CardLinkProps & React.ComponentPropsWithoutRef<typeof Link>",elements:[{name:"CardLinkProps"},{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<typeof Link>",elements:[{name:"Link"}]}]}}],returns:null},{name:"Title",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:"{ titleAs: HtmlHeadingTag } & React.ComponentPropsWithoutRef<HtmlHeadingTag>",elements:[{name:"signature",type:"object",raw:"{ titleAs: HtmlHeadingTag }",signature:{properties:[{key:"titleAs",value:{name:"HtmlHeadingTag",required:!0}}]}},{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<HtmlHeadingTag>",elements:[{name:"HtmlHeadingTag"}]}]}}],returns:null}],displayName:"Card",props:{layout:{required:!0,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:""}}};try{Card.displayName="Card",Card.__docgenInfo={description:"",displayName:"Card",props:{layout:{defaultValue:null,description:"",name:"layout",required:!0,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Card/Card.tsx#Card"]={docgenInfo:Card.__docgenInfo,name:"Card",path:"src/client/components/ui/Card/Card.tsx#Card"})}catch(__react_docgen_typescript_loader_error){}try{Button.displayName="Card.Button",Button.__docgenInfo={description:"",displayName:"Card.Button",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},appearance:{defaultValue:null,description:"",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'},{value:'"quaternary"'}]}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},iconPosition:{defaultValue:null,description:"",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Card/Card.tsx#Card.Button"]={docgenInfo:Card.Button.__docgenInfo,name:"Card.Button",path:"src/client/components/ui/Card/Card.tsx#Card.Button"})}catch(__react_docgen_typescript_loader_error){}try{Content.displayName="Card.Content",Content.__docgenInfo={description:"",displayName:"Card.Content",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Card/Card.tsx#Card.Content"]={docgenInfo:Card.Content.__docgenInfo,name:"Card.Content",path:"src/client/components/ui/Card/Card.tsx#Card.Content"})}catch(__react_docgen_typescript_loader_error){}try{FakeLink.displayName="Card.FakeLink",FakeLink.__docgenInfo={description:"",displayName:"Card.FakeLink",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},appearance:{defaultValue:null,description:"",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'},{value:'"quaternary"'}]}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Card/Card.tsx#Card.FakeLink"]={docgenInfo:Card.FakeLink.__docgenInfo,name:"Card.FakeLink",path:"src/client/components/ui/Card/Card.tsx#Card.FakeLink"})}catch(__react_docgen_typescript_loader_error){}try{Image.displayName="Card.Image",Image.__docgenInfo={description:"",displayName:"Card.Image",props:{src:{defaultValue:null,description:"",name:"src",required:!0,type:{name:"string"}},alt:{defaultValue:null,description:"",name:"alt",required:!1,type:{name:"string"}},sizes:{defaultValue:null,description:"",name:"sizes",required:!1,type:{name:"string"}},ariaHidden:{defaultValue:null,description:"",name:"ariaHidden",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Card/Card.tsx#Card.Image"]={docgenInfo:Card.Image.__docgenInfo,name:"Card.Image",path:"src/client/components/ui/Card/Card.tsx#Card.Image"})}catch(__react_docgen_typescript_loader_error){}try{Link.displayName="Card.Link",Link.__docgenInfo={description:"",displayName:"Card.Link",props:{icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},prefetch:{defaultValue:null,description:"",name:"prefetch",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Card/Card.tsx#Card.Link"]={docgenInfo:Card.Link.__docgenInfo,name:"Card.Link",path:"src/client/components/ui/Card/Card.tsx#Card.Link"})}catch(__react_docgen_typescript_loader_error){}try{Title.displayName="Card.Title",Title.__docgenInfo={description:"",displayName:"Card.Title",props:{titleAs:{defaultValue:null,description:"",name:"titleAs",required:!0,type:{name:"enum",value:[{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Card/Card.tsx#Card.Title"]={docgenInfo:Card.Title.__docgenInfo,name:"Card.Title",path:"src/client/components/ui/Card/Card.tsx#Card.Title"})}catch(__react_docgen_typescript_loader_error){}},"./src/client/components/ui/Link/Link.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>Link});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),react=__webpack_require__("./node_modules/react/index.js"),useIsInternalLink=__webpack_require__("./src/client/hooks/useIsInternalLink.ts");function getTextFromChildren(node){return"string"==typeof node||"number"==typeof node?node.toString():Array.isArray(node)?null!==(_React$Children$map$f=null===(_React$Children$map=react.Children.map(node,getTextFromChildren))||void 0===_React$Children$map?void 0:_React$Children$map.filter(Boolean).join(" "))&&void 0!==_React$Children$map$f?_React$Children$map$f:"":react.isValidElement(node)&&null!=node.props.children&&null!==(_React$Children$map$f2=null===(_React$Children$map2=react.Children.map(node.props.children,getTextFromChildren))||void 0===_React$Children$map2?void 0:_React$Children$map2.filter(Boolean).join(" "))&&void 0!==_React$Children$map$f2?_React$Children$map$f2:"";var _React$Children$map$f,_React$Children$map,_React$Children$map$f2,_React$Children$map2}try{getTextFromChildren.displayName="getTextFromChildren",getTextFromChildren.__docgenInfo={description:"",displayName:"getTextFromChildren",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/utils/getTextFromChildren.util.tsx#getTextFromChildren"]={docgenInfo:getTextFromChildren.__docgenInfo,name:"getTextFromChildren",path:"src/client/utils/getTextFromChildren.util.tsx#getTextFromChildren"})}catch(__react_docgen_typescript_loader_error){}var _excluded=["className","children","href","prefetch","title"],__jsx=react.createElement;function Link(props){var className=props.className,children=props.children,href=props.href,_props$prefetch=props.prefetch,prefetch=void 0!==_props$prefetch&&_props$prefetch,title=props.title,rest=(0,objectWithoutProperties.Z)(props,_excluded),isInternalLink=(0,useIsInternalLink.X)(href);function getTitle(){return isInternalLink||null!=title?title:"".concat(getTextFromChildren(children)," - nouvelle fenêtre")}return isInternalLink?__jsx(link_default(),(0,esm_extends.Z)({href,title:getTitle(),prefetch,className:classnames_default()(className)},rest),children):__jsx("a",(0,esm_extends.Z)({href,title:getTitle(),target:"_blank",rel:"noreferrer",className:classnames_default()(className)},rest),children)}Link.__docgenInfo={description:"",methods:[],displayName:"Link",props:{href:{required:!0,tsType:{name:"string"},description:""},prefetch:{required:!1,tsType:{name:"boolean"},description:""}}};try{Link.displayName="Link",Link.__docgenInfo={description:"",displayName:"Link",props:{prefetch:{defaultValue:null,description:"",name:"prefetch",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Link/Link.tsx#Link"]={docgenInfo:Link.__docgenInfo,name:"Link",path:"src/client/components/ui/Link/Link.tsx#Link"})}catch(__react_docgen_typescript_loader_error){}},"./src/client/hooks/useBreakpoint.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>useBreakpoint});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),BREAKPOINT=function(BREAKPOINT){return BREAKPOINT.SM="36em",BREAKPOINT.MD="48em",BREAKPOINT.LG="62em",BREAKPOINT}(BREAKPOINT||{});function getScreenSize(){return window.matchMedia("(min-width: ".concat(BREAKPOINT.LG,")")).matches?BREAKPOINT.LG:window.matchMedia("(min-width: ".concat(BREAKPOINT.MD,")")).matches?BREAKPOINT.MD:BREAKPOINT.SM}function useBreakpoint(){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getScreenSize()),screenSize=_useState[0],setScreenSize=_useState[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((function(){function handleDevice(){setScreenSize(getScreenSize())}return window.addEventListener("resize",handleDevice),function(){return window.removeEventListener("resize",handleDevice)}}),[]),{isLargeScreen:screenSize===BREAKPOINT.LG,isMediumScreen:screenSize===BREAKPOINT.MD,isSmallScreen:screenSize===BREAKPOINT.SM}}},"./src/client/hooks/useIsInternalLink.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{X:()=>useIsInternalLink});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),PATHNAME_PREFIX="/",ANCHOR_PREFIX="#";function useIsInternalLink(href){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),origin=_useState[0],setOrigin=_useState[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){setOrigin(window.location.origin)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return(null==href?void 0:href.startsWith(origin))||(null==href?void 0:href.startsWith(PATHNAME_PREFIX))||(null==href?void 0:href.startsWith(ANCHOR_PREFIX))}),[href,origin])}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Card/Card.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".LfB09M6RpXL1duDPPkEs{font-weight:700}.EG2wOj2DIav6_rDBTXiN{padding:.5rem .75rem;font-size:.875rem;line-height:.875rem}.EG2wOj2DIav6_rDBTXiN svg{height:.875rem;width:.875rem}@media(min-width: 62em){.EG2wOj2DIav6_rDBTXiN{padding:.75rem 1rem;font-size:1rem;line-height:1rem}.EG2wOj2DIav6_rDBTXiN svg{height:1rem;width:1rem}}.XLtS5UREjskdQSNRipIs{display:flex;background-color:#fff;box-shadow:10px 10px 20px rgba(22,22,22,.05);border-radius:20px;overflow:hidden}.XLtS5UREjskdQSNRipIs:hover .v67khMbglCvK_Ft785Yw>span{text-decoration:underline;text-underline-offset:3px}.vQXHNlyxqjXpWowUIZOk{flex-direction:row}.hxaRZAGHJWbuEyzxxkji{flex-direction:column}.emr1tQh5F9JR14qJPhAL{position:relative;min-height:50px;min-width:50px}@media(min-width: 62em){.emr1tQh5F9JR14qJPhAL{min-width:140px}}.EG2wOj2DIav6_rDBTXiN{display:flex;border-radius:50px;outline-offset:4px;white-space:nowrap;text-overflow:ellipsis}.EG2wOj2DIav6_rDBTXiN>svg{margin-left:.3rem;vertical-align:bottom}.Z5O2jPqOo6DMZ94EK3hS{border:1px solid #566bb1;background-color:#566bb1;color:#fff}.Z5O2jPqOo6DMZ94EK3hS:hover{background-color:#040085;border-color:#040085}._M5o_fbbYuMb8Mbp98VO{border:1px solid #566bb1;color:#566bb1;background-color:#fff}._M5o_fbbYuMb8Mbp98VO:hover{background-color:#ececff;border-color:#566bb1;color:#566bb1}.v67khMbglCvK_Ft785Yw{color:#566bb1;border-radius:0;padding:0}.cNRwTlp7RJSNh8BIxZeo{border:1px solid #566bb1;color:#566bb1;background-color:#ececff}.cNRwTlp7RJSNh8BIxZeo:hover{background-color:#6e61e9;border-color:#6e61e9;color:#fff}","",{version:3,sources:["webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/components/button/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Card/Card.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAsEA,sBACE,eAAA,CCrEF,sBACE,oBAAA,CACA,iBAAA,CACA,mBAAA,CAEA,0BACE,cAAA,CACA,aAAA,CCHA,wBDJJ,sBAWI,mBAAA,CACA,cAAA,CACA,gBAAA,CAEA,0BACE,WAAA,CACA,UAAA,CAAA,CEjBN,sBACE,YAAA,CACA,qBCgBM,CDfN,4CC6EW,CD5EX,kBAAA,CACA,eAAA,CAEA,uDACE,yBAAA,CACA,yBAAA,CAGF,sBACE,kBAAA,CAGF,sBACE,qBAAA,CAIJ,sBACE,iBAAA,CACA,eAAA,CACA,cAAA,CDpBE,wBCiBJ,sBAMI,eAAA,CAAA,CAQJ,sBACE,YAAA,CACA,kBAAA,CACA,kBAAA,CACA,kBAAA,CACA,sBAAA,CAIA,0BACE,iBAAA,CACA,qBAAA,CAIJ,sBACE,wBAAA,CACA,wBCjDU,CDkDV,UCnCM,CDqCN,4BACE,wBCnDS,CDoDT,oBCpDS,CDyDb,sBACE,wBAAA,CACA,aC7DU,CD8DV,qBC/CM,CDiDN,4BACE,wBChDU,CDiDV,oBClEQ,CDmER,aCnEQ,CDuEZ,sBACE,aCxEU,CDyEV,eAAA,CACA,SAAA,CAGF,sBACE,wBAAA,CACA,aC/EU,CDgFV,wBC/DY,CDiEZ,4BACE,wBClFa,CDmFb,oBCnFa,CDoFb,UCtEI",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/theme/variables-deprecated.scss";\n\n%text-regular {\n  font-size: .875rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%text-medium {\n  font-size: 1rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1.125rem;\n  }\n}\n\n%text-xLarge {\n  font-size: 1.5rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n%text-large {\n  font-size: 1.125rem;\n  line-height: 1.8rem;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n    line-height: 2rem;\n  }\n}\n\n%text-small {\n  font-size: .75rem;\n  line-height: 1.25rem;\n\n  @include mixins.media(large) {\n    font-size: .875rem;\n    line-height: 1.5rem;\n  }\n}\n\n%headline {\n  font-size: 1.25rem;\n  line-height: 2rem;\n  color: variables-deprecated.$color-primary;\n\n  @include mixins.media(large) {\n    font-size: 2rem;\n    line-height: 3rem;\n  }\n}\n\n%subheading {\n  font-size: 1.25rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n','@use "@styles/media/mixins";\n\n%button {\n  padding: 0.5rem 0.75rem;\n  font-size: 0.875rem;\n  line-height: 0.875rem;\n\n  svg {\n    height: 0.875rem;\n    width: 0.875rem;\n  }\n\n  @include mixins.media(large) {\n    padding: 0.75rem 1rem;\n    font-size: 1rem;\n    line-height: 1rem;\n\n    svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n\n.cardComponent {\n  display: flex;\n  background-color: utilities-deprecated.$color-surface;\n  box-shadow: utilities-deprecated.$box-shadow;\n  border-radius: 20px;\n  overflow: hidden;\n\n  &:hover .cardButtonQuaternary > span {\n    text-decoration: underline;\n    text-underline-offset: 3px;\n  }\n\n  &Horizontal {\n    flex-direction: row;\n  }\n\n  &Vertical {\n    flex-direction: column;\n  }\n}\n\n.cardImageWrapper {\n  position: relative;\n  min-height: 50px;\n  min-width: 50px;\n\n  @include utilities-deprecated.media(large) {\n    min-width: 140px;\n  }\n}\n\n.cardTitle {\n  @extend %bold;\n}\n\n.cardButton {\n  display: flex;\n  border-radius: 50px;\n  outline-offset: 4px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n\n  @extend %button;\n\n  > svg {\n    margin-left: 0.3rem;\n    vertical-align: bottom;\n  }\n}\n\n.cardButtonPrimary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-on-primary;\n\n  &:hover {\n    background-color: utilities-deprecated.$color-primary-on-hover;\n    border-color: utilities-deprecated.$color-primary-on-hover;\n  }\n}\n\n\n.cardButtonSecondary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$white;\n\n  &:hover {\n    background-color: utilities-deprecated.$color-background-white-titan;\n    border-color: utilities-deprecated.$color-primary;\n    color: utilities-deprecated.$color-primary;\n  }\n}\n\n.cardButtonQuaternary {\n  color: utilities-deprecated.$color-primary;\n  border-radius: 0;\n  padding: 0;\n}\n\n.cardButtonTertiary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-background-white-titan;\n\n  &:hover {\n    background-color: utilities-deprecated.$color-tertiary-on-hover;\n    border-color: utilities-deprecated.$color-tertiary-on-hover;\n    color: utilities-deprecated.$white;\n  }\n}\n\n\n\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={cardTitle:"LfB09M6RpXL1duDPPkEs",cardButton:"EG2wOj2DIav6_rDBTXiN",cardComponent:"XLtS5UREjskdQSNRipIs",cardButtonQuaternary:"v67khMbglCvK_Ft785Yw",cardComponentHorizontal:"vQXHNlyxqjXpWowUIZOk",cardComponentVertical:"hxaRZAGHJWbuEyzxxkji",cardImageWrapper:"emr1tQh5F9JR14qJPhAL",cardButtonPrimary:"Z5O2jPqOo6DMZ94EK3hS",cardButtonSecondary:"_M5o_fbbYuMb8Mbp98VO",cardButtonTertiary:"cNRwTlp7RJSNh8BIxZeo"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);