"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[2182],{"./src/client/components/keyboard/keyboard.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>KeyBoard});var KeyBoard=function(KeyBoard){return KeyBoard.TAB="Tab",KeyBoard.SHIFT="Shift",KeyBoard.ARROW_DOWN="ArrowDown",KeyBoard.IE_ARROW_DOWN="Down",KeyBoard.ARROW_LEFT="ArrowLeft",KeyBoard.IE_ARROW_LEFT="LEFT",KeyBoard.ARROW_RIGHT="ArrowRight",KeyBoard.IE_ARROW_RIGHT="Right",KeyBoard.ARROW_UP="ArrowUp",KeyBoard.IE_ARROW_UP="Up",KeyBoard.ENTER="Enter",KeyBoard.ESCAPE="Escape",KeyBoard.IE_ESCAPE="Esc",KeyBoard.BACKSPACE="Backspace",KeyBoard.DELETE="Delete",KeyBoard.SPACE=" ",KeyBoard.HOME="Home",KeyBoard.END="End",KeyBoard.ALT="Alt",KeyBoard}({})},"./src/client/components/ui/Button/ButtonComponent.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>ButtonComponent});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),button_component_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Button/button-component.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(button_component_module.Z,options);const Button_button_component_module=button_component_module.Z&&button_component_module.Z.locals?button_component_module.Z.locals:void 0;var _excluded=["appearance","className","icon","iconPosition","label"],__jsx=react.createElement,ButtonComponent=react.forwardRef((function ButtonComponent(_ref,ref){var _ref$appearance=_ref.appearance,appearance=void 0===_ref$appearance?"primary":_ref$appearance,className=_ref.className,icon=_ref.icon,iconPosition=_ref.iconPosition,label=_ref.label,rest=(0,objectWithoutProperties.Z)(_ref,_excluded),appearanceClass=(0,react.useMemo)((function(){switch(appearance){case"primary":return Button_button_component_module.buttonPrimary;case"secondary":return Button_button_component_module.buttonSecondary;case"tertiary":return Button_button_component_module.buttonTertiary;case"quaternary":return Button_button_component_module.buttonQuaternary}}),[appearance]),iconPositionClass=(0,react.useMemo)((function(){switch(iconPosition){case"top":return Button_button_component_module.buttonWithTopIcon;case"left":return Button_button_component_module.buttonWithLeftIcon;case"right":return Button_button_component_module.buttonWithRightIcon}}),[iconPosition]),buttonStyles=(0,react.useMemo)((function(){return classnames_default()(className,Button_button_component_module.button,appearanceClass,iconPositionClass)}),[appearanceClass,className,iconPositionClass]),buttonBody=(0,react.useMemo)((function(){switch(iconPosition){case"top":case"left":return __jsx(react.Fragment,null,icon,__jsx("span",{className:Button_button_component_module.buttonLabel},label));case"right":return __jsx(react.Fragment,null,__jsx("span",{className:Button_button_component_module.buttonLabel},label),icon);default:return __jsx("span",{className:Button_button_component_module.buttonLabel},label)}}),[icon,iconPosition,label]);return __jsx("button",(0,esm_extends.Z)({className:buttonStyles,ref},rest),buttonBody)}));ButtonComponent.__docgenInfo={description:"",methods:[],displayName:"ButtonComponent",props:{appearance:{defaultValue:{value:"'primary'",computed:!1},required:!1}}};try{ButtonComponent.displayName="ButtonComponent",ButtonComponent.__docgenInfo={description:"",displayName:"ButtonComponent",props:{appearance:{defaultValue:{value:"primary"},description:"",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'},{value:'"quaternary"'}]}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},iconPosition:{defaultValue:null,description:"",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Button/ButtonComponent.tsx#ButtonComponent"]={docgenInfo:ButtonComponent.__docgenInfo,name:"ButtonComponent",path:"src/client/components/ui/Button/ButtonComponent.tsx#ButtonComponent"})}catch(__react_docgen_typescript_loader_error){}},"./src/client/components/ui/Modal/ModalComponent.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>ModalComponent});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_dom=__webpack_require__("./node_modules/next/dist/compiled/react-dom/index.js"),keyboard_enum=__webpack_require__("./src/client/components/keyboard/keyboard.enum.ts"),ButtonComponent=__webpack_require__("./src/client/components/ui/Button/ButtonComponent.tsx"),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),ModalComponent_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Modal/ModalComponent.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(ModalComponent_module.Z,options);const Modal_ModalComponent_module=ModalComponent_module.Z&&ModalComponent_module.Z.locals?ModalComponent_module.Z.locals:void 0;var _excluded=["children","className","close","closeLabel","closeTitle","keepModalMounted","isOpen"],_excluded2=["titleAs","children","className","id"],_excluded3=["children","className"],_excluded4=["children","className"],__jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}var MODAL_ANIMATION_TIME_IN_MS=300;function ModalComponent(props){var children=props.children,className=props.className,close=props.close,_props$closeLabel=props.closeLabel,closeLabel=void 0===_props$closeLabel?"Fermer":_props$closeLabel,_props$closeTitle=props.closeTitle,closeTitle=void 0===_props$closeTitle?"Fermer la modale":_props$closeTitle,_props$keepModalMount=props.keepModalMounted,keepModalMounted=void 0!==_props$keepModalMount&&_props$keepModalMount,isOpen=props.isOpen,rest=(0,objectWithoutProperties.Z)(props,_excluded),modalRef=(0,react.useRef)(null),_useState=(0,react.useState)(null),lastFocusBeforeOpen=_useState[0],setLastFocusBeforeOpen=_useState[1];function disableDocumentBodyScroll(isOpen){document.body.style.overflow=isOpen?"hidden":"visible"}var closeModalOnClickOutside=(0,react.useCallback)((function(e){var _modalRef$current;!modalRef.current||null!==(_modalRef$current=modalRef.current)&&void 0!==_modalRef$current&&_modalRef$current.contains(e.target)||close()}),[modalRef,close]),closeModalOnClickEscape=(0,react.useCallback)((function(e){isOpen&&e.key===keyboard_enum.n.ESCAPE&&close()}),[isOpen,close]);return(0,react.useEffect)((function enableDocumentBodyWhenTheModalIsClosing(){return function(){disableDocumentBodyScroll(!1)}}),[]),(0,react.useEffect)((function(){return document.addEventListener("mousedown",closeModalOnClickOutside),document.addEventListener("keydown",closeModalOnClickEscape),function(){document.removeEventListener("mousedown",closeModalOnClickOutside),document.addEventListener("keydown",closeModalOnClickEscape)}}),[closeModalOnClickOutside,closeModalOnClickEscape]),(0,react.useEffect)((function(){isOpen?setLastFocusBeforeOpen(document.activeElement):setTimeout((function(){return null==lastFocusBeforeOpen?void 0:lastFocusBeforeOpen.focus()}),MODAL_ANIMATION_TIME_IN_MS)}),[isOpen,lastFocusBeforeOpen]),(0,react.useEffect)((function(){disableDocumentBodyScroll(isOpen),function trapModalFocus(){if(null!==modalRef.current){var focusableElements=modalRef.current.querySelectorAll('button, [href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])'),firstFocusableElement=focusableElements[0],firstFocusableElementAtOpen=focusableElements[1],lastFocusableElement=focusableElements[focusableElements.length-1];firstFocusableElementAtOpen&&setTimeout((function(){return firstFocusableElementAtOpen.focus()}),MODAL_ANIMATION_TIME_IN_MS),window.addEventListener("keydown",(function(e){if(e.key===keyboard_enum.n.TAB)return!e.shiftKey&&document.activeElement===lastFocusableElement&&firstFocusableElement?(firstFocusableElement.focus(),e.preventDefault()):e.shiftKey&&document.activeElement===firstFocusableElement?(lastFocusableElement.focus(),e.preventDefault()):void 0}))}}()}),[isOpen]),__jsx(react.Fragment,null,(isOpen||keepModalMounted)&&(0,react_dom.createPortal)(__jsx("dialog",(0,esm_extends.Z)({ref:modalRef,className:classnames_default()(className,Modal_ModalComponent_module.modal),open:isOpen,"aria-modal":"true"},rest),__jsx("div",{className:Modal_ModalComponent_module.modalBody},__jsx("div",{className:classnames_default()(className,Modal_ModalComponent_module.modalClose)},__jsx(ButtonComponent.r,{appearance:"quaternary",icon:__jsx(Icon.J,{name:"close"}),iconPosition:"right",label:closeLabel,title:closeTitle,onClick:function onClick(){return close()}})),children)),document.body))}function ModalContent(_ref){var children=_ref.children,className=_ref.className,rest=(0,objectWithoutProperties.Z)(_ref,_excluded3);return __jsx("div",(0,esm_extends.Z)({className:classnames_default()(className,Modal_ModalComponent_module.modalContent)},rest),children)}function ModalFooter(_ref2){var children=_ref2.children,className=_ref2.className,rest=(0,objectWithoutProperties.Z)(_ref2,_excluded4);return __jsx("footer",(0,esm_extends.Z)({className:classnames_default()(className,Modal_ModalComponent_module.modalFooter)},rest),children)}ModalContent.displayName="ModalContent",ModalFooter.displayName="ModalFooter",ModalComponent.Title=function ModalTitle(props){var _props$titleAs=props.titleAs,titleAs=void 0===_props$titleAs?"h1":_props$titleAs,children=props.children,className=props.className,id=props.id,rest=(0,objectWithoutProperties.Z)(props,_excluded2);return react.createElement(titleAs,function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({className:classnames_default()(className,Modal_ModalComponent_module.modalTitle),id},rest),children)},ModalComponent.Content=ModalContent,ModalComponent.Footer=ModalFooter,ModalComponent.__docgenInfo={description:"",methods:[{name:"Title",docblock:null,modifiers:["static"],params:[{name:"props",optional:!1,type:{name:"intersection",raw:"{ titleAs?: HtmlHeadingTag } & React.ComponentPropsWithoutRef<HtmlHeadingTag>",elements:[{name:"signature",type:"object",raw:"{ titleAs?: HtmlHeadingTag }",signature:{properties:[{key:"titleAs",value:{name:"HtmlHeadingTag",required:!1}}]}},{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<HtmlHeadingTag>",elements:[{name:"HtmlHeadingTag"}]}]}}],returns:null},{name:"Content",docblock:null,modifiers:["static"],params:[{name:"{ children, className, ...rest }: React.ComponentPropsWithoutRef<'div'>",type:{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<'div'>",elements:[{name:"literal",value:"'div'"}]}}],returns:null},{name:"Footer",docblock:null,modifiers:["static"],params:[{name:"{ children, className, ...rest }: React.ComponentPropsWithoutRef<'footer'>",type:{name:"ReactComponentPropsWithoutRef",raw:"React.ComponentPropsWithoutRef<'footer'>",elements:[{name:"literal",value:"'footer'"}]}}],returns:null}],displayName:"ModalComponent",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},close:{required:!0,tsType:{name:"signature",type:"function",raw:"(...args: unknown[]) => unknown",signature:{arguments:[{name:"args",type:{name:"Array",elements:[{name:"unknown"}],raw:"unknown[]"},rest:!0}],return:{name:"unknown"}}},description:""},closeLabel:{required:!1,tsType:{name:"string"},description:""},closeTitle:{required:!1,tsType:{name:"string"},description:""},keepModalMounted:{required:!1,tsType:{name:"boolean"},description:""}}};try{ModalComponent.displayName="ModalComponent",ModalComponent.__docgenInfo={description:"",displayName:"ModalComponent",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},close:{defaultValue:null,description:"",name:"close",required:!0,type:{name:"(...args: unknown[]) => unknown"}},closeLabel:{defaultValue:null,description:"",name:"closeLabel",required:!1,type:{name:"string"}},closeTitle:{defaultValue:null,description:"",name:"closeTitle",required:!1,type:{name:"string"}},keepModalMounted:{defaultValue:null,description:"",name:"keepModalMounted",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent"]={docgenInfo:ModalComponent.__docgenInfo,name:"ModalComponent",path:"src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent"})}catch(__react_docgen_typescript_loader_error){}try{Title.displayName="ModalComponent.Title",Title.__docgenInfo={description:"",displayName:"ModalComponent.Title",props:{titleAs:{defaultValue:null,description:"",name:"titleAs",required:!1,type:{name:"enum",value:[{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent.Title"]={docgenInfo:ModalComponent.Title.__docgenInfo,name:"ModalComponent.Title",path:"src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent.Title"})}catch(__react_docgen_typescript_loader_error){}try{Content.displayName="ModalComponent.Content",Content.__docgenInfo={description:"",displayName:"ModalComponent.Content",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent.Content"]={docgenInfo:ModalComponent.Content.__docgenInfo,name:"ModalComponent.Content",path:"src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent.Content"})}catch(__react_docgen_typescript_loader_error){}try{Footer.displayName="ModalComponent.Footer",Footer.__docgenInfo={description:"",displayName:"ModalComponent.Footer",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent.Footer"]={docgenInfo:ModalComponent.Footer.__docgenInfo,name:"ModalComponent.Footer",path:"src/client/components/ui/Modal/ModalComponent.tsx#ModalComponent.Footer"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Button/button-component.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{padding:.5rem .75rem;font-size:.875rem;line-height:.875rem}._Xw7hKZACX8bvCiQX7LN svg,.Q_8MjFCn98Ew8UReW2fX svg,.HNLVywyUIzYlaf_38MVO svg{height:.875rem;width:.875rem}@media(min-width: 62em){._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{padding:.75rem 1rem;font-size:1rem;line-height:1rem}._Xw7hKZACX8bvCiQX7LN svg,.Q_8MjFCn98Ew8UReW2fX svg,.HNLVywyUIzYlaf_38MVO svg{height:1rem;width:1rem}}.EJVAmfyFel8pBAM3qCY_{border-radius:50px;outline-offset:4px}.EJVAmfyFel8pBAM3qCY_:disabled{border:1px solid #929292;background-color:#929292;color:#fff;cursor:not-allowed}.EJVAmfyFel8pBAM3qCY_>svg{vertical-align:middle}.EJVAmfyFel8pBAM3qCY_.F4Mt79fhEjfprTJnmbvs .mNVq7TCV9pKdiMfiGcaZ{margin-right:.5rem}.EJVAmfyFel8pBAM3qCY_.ywMr3ZN96uthDGciknfN .mNVq7TCV9pKdiMfiGcaZ{margin-left:.5rem}.EJVAmfyFel8pBAM3qCY_.vrU27cdWvlogVC2MugQA .mNVq7TCV9pKdiMfiGcaZ{margin-top:.5rem;display:block}._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}._Xw7hKZACX8bvCiQX7LN{border:1px solid #566bb1;background-color:#566bb1;color:#fff}._Xw7hKZACX8bvCiQX7LN:enabled:hover{background-color:#040085;border-color:#040085}.Q_8MjFCn98Ew8UReW2fX{border:1px solid #566bb1;color:#566bb1;background-color:#fff}.Q_8MjFCn98Ew8UReW2fX:enabled:hover{background-color:#ececff;border-color:#566bb1;color:#566bb1}.HNLVywyUIzYlaf_38MVO{border:1px solid #566bb1;color:#566bb1;background-color:#ececff}.HNLVywyUIzYlaf_38MVO:enabled:hover{background-color:#6e61e9;border-color:#6e61e9;color:#fff}.h2sseaf3b3xRrdXBU95B{color:#566bb1;border-radius:0;font-size:1rem}.h2sseaf3b3xRrdXBU95B:enabled:hover{text-decoration:underline;text-underline-offset:3px}","",{version:3,sources:["webpack://./src/styles/components/button/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Button/button-component.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAEA,kEACE,oBAAA,CACA,iBAAA,CACA,mBAAA,CAEA,8EACE,cAAA,CACA,aAAA,CCHA,wBDJJ,kEAWI,mBAAA,CACA,cAAA,CACA,gBAAA,CAEA,8EACE,WAAA,CACA,UAAA,CAAA,CEjBN,sBACE,kBAAA,CACA,kBAAA,CAEA,+BACE,wBAAA,CACA,wBCgBW,CDfX,UCWI,CDVJ,kBAAA,CAGF,0BACE,qBAAA,CAIA,iEACE,kBAAA,CAKF,iEACE,iBAAA,CAKF,iEACE,gBAAA,CACA,aAAA,CAKN,kEACE,kBAAA,CACA,iBAAA,CACA,sBAAA,CAKF,sBACE,wBAAA,CACA,wBC1CU,CD2CV,UC5BM,CD8BN,oCACE,wBC5CS,CD6CT,oBC7CS,CDiDb,sBACE,wBAAA,CACA,aCrDU,CDsDV,qBCvCM,CDyCN,oCACE,wBCxCU,CDyCV,oBC1DQ,CD2DR,aC3DQ,CD+DZ,sBACE,wBAAA,CACA,aCjEU,CDkEV,wBCjDY,CDmDZ,oCACE,wBCpEa,CDqEb,oBCrEa,CDsEb,UCxDI,CD4DR,sBACE,aC5EU,CD6EV,eAAA,CACA,cAAA,CAEA,oCACE,yBAAA,CACA,yBAAA",sourcesContent:['@use "@styles/media/mixins";\n\n%button {\n  padding: 0.5rem 0.75rem;\n  font-size: 0.875rem;\n  line-height: 0.875rem;\n\n  svg {\n    height: 0.875rem;\n    width: 0.875rem;\n  }\n\n  @include mixins.media(large) {\n    padding: 0.75rem 1rem;\n    font-size: 1rem;\n    line-height: 1rem;\n\n    svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n\n.button {\n  border-radius: 50px;\n  outline-offset: 4px;\n\n  &:disabled {\n    border: 1px solid utilities-deprecated.$color-on-disabled;\n    background-color: utilities-deprecated.$color-on-disabled;\n    color: utilities-deprecated.$color-disabled;\n    cursor: not-allowed;\n  }\n\n  > svg {\n    vertical-align: middle;\n  }\n\n  &.buttonWithRightIcon {\n    & .buttonLabel {\n      margin-right: 0.5rem;\n    }\n  }\n\n  &.buttonWithLeftIcon {\n    & .buttonLabel {\n      margin-left: 0.5rem;\n    }\n  }\n\n  &.buttonWithTopIcon {\n    & .buttonLabel {\n      margin-top: 0.5rem;\n      display: block;\n    }\n  }\n}\n\n.buttonPrimary, .buttonSecondary, .buttonTertiary{\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  @extend %button;\n}\n\n\n.buttonPrimary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-on-primary;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-primary-on-hover;\n    border-color: utilities-deprecated.$color-primary-on-hover;\n  }\n}\n\n.buttonSecondary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$white;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-background-white-titan;\n    border-color: utilities-deprecated.$color-primary;\n    color: utilities-deprecated.$color-primary;\n  }\n}\n\n.buttonTertiary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-background-white-titan;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-tertiary-on-hover;\n    border-color: utilities-deprecated.$color-tertiary-on-hover;\n    color: utilities-deprecated.$white;\n  }\n}\n\n.buttonQuaternary {\n  color: utilities-deprecated.$color-primary;\n  border-radius: 0;\n  font-size: 1rem;\n\n  &:enabled:hover {\n    text-decoration: underline;\n    text-underline-offset: 3px;\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={buttonPrimary:"_Xw7hKZACX8bvCiQX7LN",buttonSecondary:"Q_8MjFCn98Ew8UReW2fX",buttonTertiary:"HNLVywyUIzYlaf_38MVO",button:"EJVAmfyFel8pBAM3qCY_",buttonWithRightIcon:"F4Mt79fhEjfprTJnmbvs",buttonLabel:"mNVq7TCV9pKdiMfiGcaZ",buttonWithLeftIcon:"ywMr3ZN96uthDGciknfN",buttonWithTopIcon:"vrU27cdWvlogVC2MugQA",buttonQuaternary:"h2sseaf3b3xRrdXBU95B"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Modal/ModalComponent.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".eOfURKMYskgtkDJPy9AD{position:fixed;z-index:5500;width:100%;height:100vh;top:0;padding:0;border:none;background-color:rgba(23,23,23,.375);pointer-events:none;display:block;visibility:visible;opacity:1;transition:.2s ease-in-out all}.eOfURKMYskgtkDJPy9AD:not([open]){visibility:hidden;opacity:0;transition:.2s ease-in-out all}.Rqxmz0e0fj67SquiSIYw{height:100vh;overflow-y:scroll;background-color:#fff;pointer-events:all}.MaDzaJcx0KBOtkA4nObg{margin-bottom:.5rem;padding:0 1rem;font-size:.9rem;display:flex;gap:.4rem;align-items:center}.dnCsIyBHEDZy4spbfKUl{margin-bottom:.2rem}.amX3MdEsXkNnnE7NJt8K{background-color:#fff;padding:1rem;bottom:0;position:sticky}.Gqv9fm6jD1ZFls7P7QDO{position:sticky;top:0;background-color:#fff;text-align:right;padding:1rem 1rem .5rem}.TyFhg953i9RW_zOQb1CQ{color:#566bb1;font-size:.875rem;margin-right:.2rem}.pi9k5EqLgwINpGkcrEli{fill:#566bb1;vertical-align:bottom}@media(min-width: 62em){.eOfURKMYskgtkDJPy9AD{padding-left:50px;padding-right:50px;display:flex}.Rqxmz0e0fj67SquiSIYw{width:1200px;height:90vh;margin:auto;border-radius:20px}}","",{version:3,sources:["webpack://./src/client/components/ui/Modal/ModalComponent.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss","webpack://./src/styles/media/_mixins.scss"],names:[],mappings:"AAEA,sBACE,cAAA,CACA,YAAA,CACA,UAAA,CACA,YAAA,CACA,KAAA,CACA,SAAA,CACA,WAAA,CACA,oCAAA,CACA,mBAAA,CACA,aAAA,CACA,kBAAA,CACA,SAAA,CACA,8BAAA,CAEA,kCACE,iBAAA,CACA,SAAA,CACA,8BAAA,CAGF,sBACE,YAAA,CACA,iBAAA,CACA,qBAAA,CACA,kBAAA,CAGF,sBACE,mBAAA,CACA,cAAA,CACA,eAAA,CACA,YAAA,CACA,SAAA,CACA,kBAAA,CAGF,sBACE,mBAAA,CAGF,sBACE,qBAAA,CACA,YAAA,CACA,QAAA,CACA,eAAA,CAGF,sBACE,eAAA,CACA,KAAA,CACA,qBCjCI,CDkCJ,gBAAA,CACA,uBAAA,CAEA,sBACE,aCrDM,CDsDN,iBAAA,CACA,kBAAA,CAEF,sBACE,YC1DM,CD2DN,qBAAA,CE1DF,wBFgEF,sBACE,iBAAA,CACA,kBAAA,CACA,YAAA,CACA,sBACE,YAAA,CACA,WAAA,CACA,WAAA,CACA,kBAAA,CAAA",sourcesContent:['@use "@styles/utilities-deprecated";\n\n.modal {\n  position: fixed;\n  z-index: 5500;\n  width: 100%;\n  height: 100vh;\n  top: 0;\n  padding: 0;\n  border: none;\n  background-color: hsla(0,0%,9%,.375);\n  pointer-events: none;\n  display: block;\n  visibility: visible;\n  opacity: 1;\n  transition: 0.2s ease-in-out all;\n\n  &:not([open]) {\n    visibility: hidden;\n    opacity: 0;\n    transition: 0.2s ease-in-out all;\n  }\n\n  &Body {\n    height: 100vh;\n    overflow-y: scroll;\n    background-color: white;\n    pointer-events: all;\n  }\n\n  &Title {\n    margin-bottom: 0.5rem;\n    padding: 0 1rem;\n    font-size: 0.9rem;\n    display: flex;\n    gap: 0.4rem;\n    align-items: center;\n  }\n\n  &Content {\n    margin-bottom: 0.2rem;\n  }\n\n  &Footer {\n    background-color: white;\n    padding: 1rem;\n    bottom: 0;\n    position: sticky;\n  }\n\n  &Close {\n    position: sticky;\n    top: 0;\n    background-color: utilities-deprecated.$color-background;\n    text-align: right;\n    padding: 1rem 1rem 0.5rem;\n\n    &Label {\n      color: utilities-deprecated.$color-primary;\n      font-size: 0.875rem;\n      margin-right: 0.2rem;\n    }\n    &Icon {\n      fill: utilities-deprecated.$color-primary;\n      vertical-align: bottom;\n    }\n  }\n}\n\n@include utilities-deprecated.media(large) {\n  .modal {\n    padding-left: 50px;\n    padding-right: 50px;\n    display: flex;\n    &Body {\n      width: 1200px;\n      height: 90vh;\n      margin: auto;\n      border-radius: 20px;\n    }\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={modal:"eOfURKMYskgtkDJPy9AD",modalBody:"Rqxmz0e0fj67SquiSIYw",modalTitle:"MaDzaJcx0KBOtkA4nObg",modalContent:"dnCsIyBHEDZy4spbfKUl",modalFooter:"amX3MdEsXkNnnE7NJt8K",modalClose:"Gqv9fm6jD1ZFls7P7QDO",modalCloseLabel:"TyFhg953i9RW_zOQb1CQ",modalCloseIcon:"pi9k5EqLgwINpGkcrEli"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);