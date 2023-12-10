/*! For license information please see client-components-ui-Tooltip-Tooltip-stories.3ad2a909.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[1959],{"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties})},"./src/client/components/ui/Tooltip/Tooltip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Tooltip_stories});var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),keyboard_enum=__webpack_require__("./src/client/components/keyboard/keyboard.enum.ts"),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Tooltip_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Tooltip/Tooltip.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Tooltip_module.Z,options);const Tooltip_Tooltip_module=Tooltip_module.Z&&Tooltip_module.Z.locals?Tooltip_module.Z.locals:void 0;var __jsx=react.createElement;function Tooltip(props){var children=props.children,icon=props.icon,ariaLabel=props.ariaLabel,tooltipId=props.tooltipId,tooltipRef=(0,react.useRef)(null),_useState=(0,react.useState)(!1),isOpen=_useState[0],setIsOpen=_useState[1],closeTooltipOnClickOutside=(0,react.useCallback)((function(event){var _tooltipRef$current;null!==(_tooltipRef$current=tooltipRef.current)&&void 0!==_tooltipRef$current&&_tooltipRef$current.contains(event.target)||setIsOpen(!1)}),[]),closeTooltipOnEscape=(0,react.useCallback)((function(event){event.key!==keyboard_enum.n.ESCAPE&&event.key!==keyboard_enum.n.IE_ESCAPE||!isOpen||setIsOpen(!1)}),[isOpen]);(0,react.useEffect)((function setEventListenerOnMount(){return document.addEventListener("mousedown",closeTooltipOnClickOutside),document.addEventListener("keyup",closeTooltipOnEscape),function(){document.removeEventListener("mousedown",closeTooltipOnClickOutside),document.removeEventListener("keyup",closeTooltipOnEscape)}}),[closeTooltipOnClickOutside,closeTooltipOnEscape]);var closeTooltipOnBlur=(0,react.useCallback)((function(event){event.currentTarget.contains(event.relatedTarget)||setIsOpen(!1)}),[]);return __jsx("div",{onMouseEnter:function onMouseEnter(){return setIsOpen(!0)},onMouseLeave:function onMouseLeave(){return setIsOpen(!1)},onFocus:function onFocus(){return setIsOpen(!0)},onBlur:closeTooltipOnBlur,className:Tooltip_Tooltip_module.position},__jsx("button",{ref:tooltipRef,className:Tooltip_Tooltip_module.tooltipContainer,"aria-label":ariaLabel,"aria-describedby":tooltipId,"aria-expanded":isOpen,type:"button",onClick:function onClick(){return setIsOpen(!isOpen)}},__jsx(Icon.J,{name:icon,className:Tooltip_Tooltip_module.icon})),__jsx("div",{className:classnames_default()(Tooltip_Tooltip_module.tooltip),role:"tooltip",id:tooltipId,hidden:!isOpen},__jsx("button",{className:Tooltip_Tooltip_module.buttonClose,type:"button","aria-label":"fermer",onClick:function onClick(){return setIsOpen(!isOpen)}},__jsx(Icon.J,{name:"close"})),__jsx("p",{className:Tooltip_Tooltip_module.description},children)))}Tooltip.displayName="Tooltip";try{Tooltip.displayName="Tooltip",Tooltip.__docgenInfo={description:"",displayName:"Tooltip",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"enum",value:[{value:'"menu"'},{value:'"table"'},{value:'"filter"'},{value:'"user"'},{value:'"account"'},{value:'"angle-down"'},{value:'"angle-left"'},{value:'"angle-left-from-line"'},{value:'"angle-right"'},{value:'"angle-right-from-line"'},{value:'"angle-up"'},{value:'"arrow-left"'},{value:'"arrow-right"'},{value:'"arrow-up"'},{value:'"award"'},{value:'"bed"'},{value:'"bike"'},{value:'"book"'},{value:'"brief-case"'},{value:'"burger-menu"'},{value:'"burger-menu-left"'},{value:'"check-line"'},{value:'"car"'},{value:'"clean-hands"'},{value:'"close"'},{value:'"community"'},{value:'"compass"'},{value:'"error"'},{value:'"euro"'},{value:'"exit"'},{value:'"external-redirection"'},{value:'"home"'},{value:'"information"'},{value:'"iron"'},{value:'"lock"'},{value:'"magnifying-glass"'},{value:'"mail"'},{value:'"map-pin"'},{value:'"mark-pen"'},{value:'"microwave"'},{value:'"phone"'},{value:'"plant"'},{value:'"play-circle"'},{value:'"restaurant"'},{value:'"roadmap"'},{value:'"sport"'},{value:'"suitcase"'},{value:'"sun"'},{value:'"swimming"'},{value:'"temperature"'},{value:'"thumb-up"'},{value:'"trophy"'},{value:'"TV"'},{value:'"vacuum"'},{value:'"washing-machine"'},{value:'"wifi"'}]}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}},tooltipId:{defaultValue:null,description:"",name:"tooltipId",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Tooltip/Tooltip.tsx#Tooltip"]={docgenInfo:Tooltip.__docgenInfo,name:"Tooltip",path:"src/client/components/ui/Tooltip/Tooltip.tsx#Tooltip"})}catch(__react_docgen_typescript_loader_error){}const Tooltip_stories={argTypes:{children:{control:"text"}},component:Tooltip,title:"Components/Tooltip"};var Example={args:{ariaLabel:"Afficher des explications complémentaires",children:"Voici des explications complémentaires",icon:"information"}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:"{\n  args: {\n    ariaLabel: 'Afficher des explications complémentaires',\n    children: 'Voici des explications complémentaires',\n    icon: 'information'\n    //TODO documenter l'usage de la prop ariaDescribedBy (ou du nom qui la remplacera) après le passage sur ce composant\n  }\n}",...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]},"./src/client/components/keyboard/keyboard.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>KeyBoard});var KeyBoard=function(KeyBoard){return KeyBoard.TAB="Tab",KeyBoard.SHIFT="Shift",KeyBoard.ARROW_DOWN="ArrowDown",KeyBoard.IE_ARROW_DOWN="Down",KeyBoard.ARROW_LEFT="ArrowLeft",KeyBoard.IE_ARROW_LEFT="LEFT",KeyBoard.ARROW_RIGHT="ArrowRight",KeyBoard.IE_ARROW_RIGHT="Right",KeyBoard.ARROW_UP="ArrowUp",KeyBoard.IE_ARROW_UP="Up",KeyBoard.ENTER="Enter",KeyBoard.ESCAPE="Escape",KeyBoard.IE_ESCAPE="Esc",KeyBoard.BACKSPACE="Backspace",KeyBoard.DELETE="Delete",KeyBoard.SPACE=" ",KeyBoard.HOME="Home",KeyBoard.END="End",KeyBoard.ALT="Alt",KeyBoard}({})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Tooltip/Tooltip.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".FAqxsIzdTWBD2OydSzQ1{display:inline}.MVzG9DiEMNMrGP_SqRlA{display:inline-flex;padding-left:.25rem}.TlzhaWmbfHmHkMwywTYW{color:#566bb1;width:1.25rem}.r8KdkCzh65b7rAFjFMG3{position:absolute;z-index:15;font-size:.75rem;padding:.5rem 1rem;border:1px solid #eee;border-radius:20px;background-color:#fff;overflow-y:auto;max-width:25rem}.r8KdkCzh65b7rAFjFMG3 .zigo09HAt4FF9qjJBexR{clear:both}.dWBMSi_xDkKHfyQ37SPZ{display:block;float:right;padding:0}","",{version:3,sources:["webpack://./src/client/components/ui/Tooltip/Tooltip.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAEA,sBACE,cAAA,CAGF,sBACE,mBAAA,CACA,mBAAA,CAGF,sBACE,aCPU,CDQV,aAAA,CAGF,sBACE,iBAAA,CACA,UAAA,CACA,gBAAA,CACA,kBAAA,CACA,qBAAA,CACA,kBAAA,CACA,qBCHM,CDIN,eAAA,CACA,eAAA,CAEA,4CACE,UAAA,CAIJ,sBACE,aAAA,CACA,WAAA,CACA,SAAA",sourcesContent:['@use "@styles/utilities-deprecated";\n\n.position {\n  display: inline;\n}\n\n.tooltipContainer {\n  display: inline-flex;\n  padding-left: 0.25rem;\n}\n\n.icon {\n  color: utilities-deprecated.$color-primary;\n  width: 1.25rem;\n}\n\n.tooltip {\n  position: absolute;\n  z-index: 15;\n  font-size: 0.75rem;\n  padding: 0.5rem 1rem;\n  border: 1px solid utilities-deprecated.$color-separator;\n  border-radius: 20px;\n  background-color: utilities-deprecated.$color-background;\n  overflow-y: auto;\n  max-width: 25rem;\n\n  .description {\n    clear: both;\n  }\n}\n\n.buttonClose {\n  display: block;\n  float: right;\n  padding: 0;\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={position:"FAqxsIzdTWBD2OydSzQ1",tooltipContainer:"MVzG9DiEMNMrGP_SqRlA",icon:"TlzhaWmbfHmHkMwywTYW",tooltip:"r8KdkCzh65b7rAFjFMG3",description:"zigo09HAt4FF9qjJBexR",buttonClose:"dWBMSi_xDkKHfyQ37SPZ"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);