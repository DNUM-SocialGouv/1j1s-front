/*! For license information please see client-components-ui-Button-ButtonComponent-stories.466a0812.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[3961,3813],{"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{A:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutProperties})},"./src/client/components/ui/Button/ButtonComponent.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,Primary:()=>Primary,Quaternary:()=>Quaternary,Secondary:()=>Secondary,Tertiary:()=>Tertiary,WithIcon:()=>WithIcon,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_Icon_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),_ButtonComponent__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Button/ButtonComponent.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const __WEBPACK_DEFAULT_EXPORT__={argTypes:{icon:{mapping:{"angle-left":__jsx(_Icon_Icon__WEBPACK_IMPORTED_MODULE_1__.I,{name:"angle-left"}),"angle-right":__jsx(_Icon_Icon__WEBPACK_IMPORTED_MODULE_1__.I,{name:"angle-right"}),"magnifying-glass":__jsx(_Icon_Icon__WEBPACK_IMPORTED_MODULE_1__.I,{name:"magnifying-glass"})},options:["magnifying-glass","angle-left","angle-right"]}},args:{disabled:!1,label:"Cliquez ici"},component:_ButtonComponent__WEBPACK_IMPORTED_MODULE_2__.Q,title:"Components/Button/ButtonComponent"};var Primary={args:{appearance:"primary"}},Secondary={args:{appearance:"secondary"}},Tertiary={args:{appearance:"tertiary"}},Quaternary={args:{appearance:"quaternary"}},Disabled={args:{disabled:!0}},WithIcon={args:{icon:"magnifying-glass",iconPosition:"left",label:"Rechercher"}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    appearance: 'primary'\n  }\n}",...Primary.parameters?.docs?.source}}},Secondary.parameters={...Secondary.parameters,docs:{...Secondary.parameters?.docs,source:{originalSource:"{\n  args: {\n    appearance: 'secondary'\n  }\n}",...Secondary.parameters?.docs?.source}}},Tertiary.parameters={...Tertiary.parameters,docs:{...Tertiary.parameters?.docs,source:{originalSource:"{\n  args: {\n    appearance: 'tertiary'\n  }\n}",...Tertiary.parameters?.docs?.source}}},Quaternary.parameters={...Quaternary.parameters,docs:{...Quaternary.parameters?.docs,source:{originalSource:"{\n  args: {\n    appearance: 'quaternary'\n  }\n}",...Quaternary.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  args: {\n    disabled: true\n  }\n}",...Disabled.parameters?.docs?.source}}},WithIcon.parameters={...WithIcon.parameters,docs:{...WithIcon.parameters?.docs,source:{originalSource:"{\n  args: {\n    icon: 'magnifying-glass',\n    iconPosition: 'left',\n    label: 'Rechercher'\n  }\n}",...WithIcon.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","Secondary","Tertiary","Quaternary","Disabled","WithIcon"]},"./src/client/components/ui/Button/ButtonComponent.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>ButtonComponent});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),button_component_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Button/button-component.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(button_component_module.A,options);const Button_button_component_module=button_component_module.A&&button_component_module.A.locals?button_component_module.A.locals:void 0;var _excluded=["appearance","className","icon","iconPosition","label"],__jsx=react.createElement,ButtonComponent=react.forwardRef((function ButtonComponent(_ref,ref){var _ref$appearance=_ref.appearance,appearance=void 0===_ref$appearance?"primary":_ref$appearance,className=_ref.className,icon=_ref.icon,iconPosition=_ref.iconPosition,label=_ref.label,rest=(0,objectWithoutProperties.A)(_ref,_excluded),appearanceClass=(0,react.useMemo)((function(){switch(appearance){case"primary":return Button_button_component_module.buttonPrimary;case"secondary":return Button_button_component_module.buttonSecondary;case"tertiary":return Button_button_component_module.buttonTertiary;case"quaternary":return Button_button_component_module.buttonQuaternary}}),[appearance]),iconPositionClass=(0,react.useMemo)((function(){switch(iconPosition){case"top":return Button_button_component_module.buttonWithTopIcon;case"left":return Button_button_component_module.buttonWithLeftIcon;case"right":return Button_button_component_module.buttonWithRightIcon}}),[iconPosition]),buttonStyles=(0,react.useMemo)((function(){return classnames_default()(className,Button_button_component_module.button,appearanceClass,iconPositionClass)}),[appearanceClass,className,iconPositionClass]),buttonBody=(0,react.useMemo)((function(){switch(iconPosition){case"top":case"left":return __jsx(react.Fragment,null,icon,__jsx("span",{className:Button_button_component_module.buttonLabel},label));case"right":return __jsx(react.Fragment,null,__jsx("span",{className:Button_button_component_module.buttonLabel},label),icon);default:return __jsx("span",{className:Button_button_component_module.buttonLabel},label)}}),[icon,iconPosition,label]);return __jsx("button",(0,esm_extends.A)({className:buttonStyles,ref},rest),buttonBody)}));try{ButtonComponent.displayName="ButtonComponent",ButtonComponent.__docgenInfo={description:"",displayName:"ButtonComponent",props:{appearance:{defaultValue:{value:"primary"},description:"",name:"appearance",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'},{value:'"quaternary"'}]}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"ReactNode"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},iconPosition:{defaultValue:null,description:"",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Button/ButtonComponent.tsx#ButtonComponent"]={docgenInfo:ButtonComponent.__docgenInfo,name:"ButtonComponent",path:"src/client/components/ui/Button/ButtonComponent.tsx#ButtonComponent"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[15].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[15].use[3]!./src/client/components/ui/Button/button-component.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{padding:.5rem .75rem;font-size:.875rem;line-height:1.4}@media(min-width: 62em){._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{font-size:1rem}}._Xw7hKZACX8bvCiQX7LN svg,.Q_8MjFCn98Ew8UReW2fX svg,.HNLVywyUIzYlaf_38MVO svg{height:.875rem;width:.875rem}@media(min-width: 62em){._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{padding:.75rem 1rem}._Xw7hKZACX8bvCiQX7LN svg,.Q_8MjFCn98Ew8UReW2fX svg,.HNLVywyUIzYlaf_38MVO svg{height:1rem;width:1rem}}.EJVAmfyFel8pBAM3qCY_{border-radius:50px;outline-offset:4px}.EJVAmfyFel8pBAM3qCY_:disabled{border:1px solid #929292;background-color:#929292;color:#fff;cursor:not-allowed}.EJVAmfyFel8pBAM3qCY_>svg{vertical-align:middle}.EJVAmfyFel8pBAM3qCY_.F4Mt79fhEjfprTJnmbvs .mNVq7TCV9pKdiMfiGcaZ{margin-right:.5rem}.EJVAmfyFel8pBAM3qCY_.ywMr3ZN96uthDGciknfN .mNVq7TCV9pKdiMfiGcaZ{margin-left:.5rem}.EJVAmfyFel8pBAM3qCY_.vrU27cdWvlogVC2MugQA .mNVq7TCV9pKdiMfiGcaZ{margin-top:.5rem;display:block}._Xw7hKZACX8bvCiQX7LN,.Q_8MjFCn98Ew8UReW2fX,.HNLVywyUIzYlaf_38MVO{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}._Xw7hKZACX8bvCiQX7LN{border:1px solid #566bb1;background-color:#566bb1;color:#fff}._Xw7hKZACX8bvCiQX7LN:enabled:hover{background-color:#040085;border-color:#040085}.Q_8MjFCn98Ew8UReW2fX{border:1px solid #566bb1;color:#566bb1;background-color:#fff}.Q_8MjFCn98Ew8UReW2fX:enabled:hover{background-color:#ececff;border-color:#566bb1;color:#566bb1}.HNLVywyUIzYlaf_38MVO{border:1px solid #566bb1;color:#566bb1;background-color:#ececff}.HNLVywyUIzYlaf_38MVO:enabled:hover{background-color:#6e61e9;border-color:#6e61e9;color:#fff}.h2sseaf3b3xRrdXBU95B{color:#566bb1;border-radius:0;font-size:1rem}.h2sseaf3b3xRrdXBU95B:enabled:hover{text-decoration:underline;text-underline-offset:3px}","",{version:3,sources:["webpack://./src/styles/components/button/_placeholders.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Button/button-component.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAGA,kEACE,oBAAA,CC+CA,iBAAA,CACA,eAAA,CC9CE,wBFHJ,kECoDI,cAAA,CAAA,CDjDF,8EACE,cAAA,CACA,aAAA,CEFA,wBFHJ,kEASI,mBAAA,CAEA,8EACE,WAAA,CACA,UAAA,CAAA,CGdN,sBACE,kBAAA,CACA,kBAAA,CAEA,+BACE,wBAAA,CACA,wBCgBW,CDfX,UCWI,CDVJ,kBAAA,CAGF,0BACE,qBAAA,CAIA,iEACE,kBAAA,CAKF,iEACE,iBAAA,CAKF,iEACE,gBAAA,CACA,aAAA,CAKN,kEACE,kBAAA,CACA,iBAAA,CACA,sBAAA,CAKF,sBACE,wBAAA,CACA,wBC1CU,CD2CV,UC5BM,CD8BN,oCACE,wBC5CS,CD6CT,oBC7CS,CDiDb,sBACE,wBAAA,CACA,aCrDU,CDsDV,qBCvCM,CDyCN,oCACE,wBCxCU,CDyCV,oBC1DQ,CD2DR,aC3DQ,CD+DZ,sBACE,wBAAA,CACA,aCjEU,CDkEV,wBCjDY,CDmDZ,oCACE,wBCpEa,CDqEb,oBCrEa,CDsEb,UCxDI,CD4DR,sBACE,aC5EU,CD6EV,eAAA,CACA,cAAA,CAEA,oCACE,yBAAA,CACA,yBAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/typography/placeholders";\n\n%button {\n  padding: 0.5rem 0.75rem;\n  @include placeholders.text-interactive-medium;\n  svg {\n    height: 0.875rem;\n    width: 0.875rem;\n  }\n\n  @include mixins.media(large) {\n    padding: 0.75rem 1rem;\n\n    svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n\n.button {\n  border-radius: 50px;\n  outline-offset: 4px;\n\n  &:disabled {\n    border: 1px solid utilities-deprecated.$color-on-disabled;\n    background-color: utilities-deprecated.$color-on-disabled;\n    color: utilities-deprecated.$color-disabled;\n    cursor: not-allowed;\n  }\n\n  > svg {\n    vertical-align: middle;\n  }\n\n  &.buttonWithRightIcon {\n    & .buttonLabel {\n      margin-right: 0.5rem;\n    }\n  }\n\n  &.buttonWithLeftIcon {\n    & .buttonLabel {\n      margin-left: 0.5rem;\n    }\n  }\n\n  &.buttonWithTopIcon {\n    & .buttonLabel {\n      margin-top: 0.5rem;\n      display: block;\n    }\n  }\n}\n\n.buttonPrimary, .buttonSecondary, .buttonTertiary{\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  @extend %button;\n}\n\n\n.buttonPrimary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-on-primary;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-primary-on-hover;\n    border-color: utilities-deprecated.$color-primary-on-hover;\n  }\n}\n\n.buttonSecondary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$white;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-background-white-titan;\n    border-color: utilities-deprecated.$color-primary;\n    color: utilities-deprecated.$color-primary;\n  }\n}\n\n.buttonTertiary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-background-white-titan;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-tertiary-on-hover;\n    border-color: utilities-deprecated.$color-tertiary-on-hover;\n    color: utilities-deprecated.$white;\n  }\n}\n\n.buttonQuaternary {\n  color: utilities-deprecated.$color-primary;\n  border-radius: 0;\n  font-size: 1rem;\n\n  &:enabled:hover {\n    text-decoration: underline;\n    text-underline-offset: 3px;\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={buttonPrimary:"_Xw7hKZACX8bvCiQX7LN",buttonSecondary:"Q_8MjFCn98Ew8UReW2fX",buttonTertiary:"HNLVywyUIzYlaf_38MVO",button:"EJVAmfyFel8pBAM3qCY_",buttonWithRightIcon:"F4Mt79fhEjfprTJnmbvs",buttonLabel:"mNVq7TCV9pKdiMfiGcaZ",buttonWithLeftIcon:"ywMr3ZN96uthDGciknfN",buttonWithTopIcon:"vrU27cdWvlogVC2MugQA",buttonQuaternary:"h2sseaf3b3xRrdXBU95B"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);