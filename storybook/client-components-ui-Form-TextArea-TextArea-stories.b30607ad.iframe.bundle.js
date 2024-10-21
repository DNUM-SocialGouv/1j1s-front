/*! For license information please see client-components-ui-Form-TextArea-TextArea-stories.b30607ad.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[3219],{"./src/client/components/ui/Form/TextArea/TextArea.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled:()=>disabled,exemple:()=>exemple,withValidation:()=>withValidation});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_Champ_Champ__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/client/components/ui/Form/Champ/Champ.tsx"),_Label__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Form/Label/index.tsx"),_TextArea__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/client/components/ui/Form/TextArea/TextArea.tsx");const __WEBPACK_DEFAULT_EXPORT__={component:_TextArea__WEBPACK_IMPORTED_MODULE_3__.f,title:"Components/Form/TextArea"},exemple={args:{},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Label__WEBPACK_IMPORTED_MODULE_2__.J,{htmlFor:"description",children:"Description (entre 10 et 20 caractères)"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TextArea__WEBPACK_IMPORTED_MODULE_3__.f,{id:"description",...args,minLength:10,maxLength:20})]})},disabled={args:{disabled:!0},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Label__WEBPACK_IMPORTED_MODULE_2__.J,{htmlFor:"description",children:"Description"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TextArea__WEBPACK_IMPORTED_MODULE_3__.f,{id:"description",...args})]})},withValidation={args:{validation:value=>"string"==typeof value&&value.includes("France")?"":'Entrer une description qui contient le mot "France"'},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Champ_Champ__WEBPACK_IMPORTED_MODULE_1__.Y,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Champ_Champ__WEBPACK_IMPORTED_MODULE_1__.Y.Label,{children:'Description de la France (doit contenir le mot "France")'}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Champ_Champ__WEBPACK_IMPORTED_MODULE_1__.Y.Input,{render:_TextArea__WEBPACK_IMPORTED_MODULE_3__.f,...args}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Champ_Champ__WEBPACK_IMPORTED_MODULE_1__.Y.Error,{})]})})},__namedExportsOrder=["exemple","disabled","withValidation"];exemple.parameters={...exemple.parameters,docs:{...exemple.parameters?.docs,source:{originalSource:'{\n  args: {},\n  render: args => <>\n            <Label htmlFor="description">Description (entre 10 et 20 caractères)</Label>\n            <TextArea id="description" {...args} minLength={10} maxLength={20} />\n        </>\n}',...exemple.parameters?.docs?.source}}},disabled.parameters={...disabled.parameters,docs:{...disabled.parameters?.docs,source:{originalSource:'{\n  args: {\n    disabled: true\n  },\n  render: args => <>\n            <Label htmlFor="description">Description</Label>\n            <TextArea id="description" {...args} />\n        </>\n}',...disabled.parameters?.docs?.source}}},withValidation.parameters={...withValidation.parameters,docs:{...withValidation.parameters?.docs,source:{originalSource:"{\n  args: {\n    validation: (value: ComponentPropsWithoutRef<typeof TextArea>['value']) => typeof value === 'string' && value.includes('France') ? '' : 'Entrer une description qui contient le mot \"France\"'\n  },\n  render: args => <>\n            <Champ>\n                <Champ.Label>Description de la France (doit contenir le mot &quot;France&quot;)</Champ.Label>\n                <Champ.Input render={TextArea} {...args} />\n                <Champ.Error />\n            </Champ>\n        </>\n}",...withValidation.parameters?.docs?.source}}}},"./src/client/components/ui/Form/TextArea/TextArea.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{f:()=>TextArea});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),useSynchronizedRef=__webpack_require__("./src/client/hooks/useSynchronizedRef.tsx"),useTouchedInput=__webpack_require__("./src/client/hooks/useTouchedInput.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),TextArea_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/TextArea/TextArea.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(TextArea_module.A,options);const TextArea_TextArea_module=TextArea_module.A&&TextArea_module.A.locals?TextArea_module.A.locals:void 0,TextArea=react.forwardRef((function TextArea({className,validation=nullValidation,onChange:onChangeProps=doNothing,onFocus:onFocusProps=doNothing,onBlur:onBlurProps=doNothing,onTouch:onTouchProps=doNothing,...props},refProps){const ref=(0,useSynchronizedRef.T)(refProps),{touched,saveValueOnFocus,setTouchedOnBlur}=(0,useTouchedInput.g)();(0,react.useEffect)((()=>{var _ref_current,_ref_current1;const error=validation(null===(_ref_current=ref.current)||void 0===_ref_current?void 0:_ref_current.value);var _ref_current2;(null===(_ref_current1=ref.current)||void 0===_ref_current1||_ref_current1.setCustomValidity(error),touched)&&(null===(_ref_current2=ref.current)||void 0===_ref_current2||_ref_current2.checkValidity())}),[ref,touched,validation]);const onChange=(0,react.useCallback)((function onChange(event){var _event_currentTarget;const error=validation(event.currentTarget.value);var _ref_current;(null===(_event_currentTarget=event.currentTarget)||void 0===_event_currentTarget||_event_currentTarget.setCustomValidity(error),onChangeProps(event),touched)&&(null===(_ref_current=ref.current)||void 0===_ref_current||_ref_current.checkValidity())}),[ref,onChangeProps,touched,validation]),onFocus=(0,react.useCallback)((function onFocus(event){saveValueOnFocus(event.currentTarget.value),onFocusProps(event)}),[onFocusProps,saveValueOnFocus]),onBlur=(0,react.useCallback)((async function onFocus(event){const touched=setTouchedOnBlur(event.currentTarget.value);touched&&onTouchProps(touched),onBlurProps(event)}),[onBlurProps,onTouchProps,setTouchedOnBlur]);return(0,jsx_runtime.jsx)("textarea",{"data-touched":touched,onChange,onFocus,onBlur,className:classnames_default()(TextArea_TextArea_module.textarea,className),ref,...props})}));function doNothing(){}function nullValidation(){return""}TextArea.__docgenInfo={description:"",methods:[],displayName:"TextArea",props:{validation:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: ComponentPropsWithoutRef<'textarea'>['value']) => ErrorMessage",signature:{arguments:[{type:{name:"ComponentPropsWithoutRef['value']",raw:"ComponentPropsWithoutRef<'textarea'>['value']"},name:"value"}],return:{name:"string"}}},description:"",defaultValue:{value:"function nullValidation() {\n\treturn '';\n}",computed:!1}},onTouch:{required:!1,tsType:{name:"signature",type:"function",raw:"(touched: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"touched"}],return:{name:"void"}}},description:"",defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1}},onChange:{defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1},required:!1},onFocus:{defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1},required:!1},onBlur:{defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1},required:!1}}}},"./src/client/hooks/useSynchronizedRef.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>useSynchronizedRef});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function useSynchronizedRef(ref){const innerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>innerRef.current),[innerRef]),innerRef}},"./src/client/hooks/useTouchedInput.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{g:()=>useTouchedInput});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function useTouchedInput(){const[touched,setTouched]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),valueOnFocus=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return{saveValueOnFocus:(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function saveCurrentValue(value){valueOnFocus.current=value}),[]),setTouchedOnBlur:(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function touch(currentValue){if(valueOnFocus.current!==currentValue){const wasAlreadyTouched=touched;return setTouched(!0),!wasAlreadyTouched}return!1}),[touched]),touched}}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/TextArea/TextArea.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".TextArea_textarea__5Br7T:disabled,.TextArea_textarea__5Br7T:not(button):read-only{color:#666;background-color:#f6f7fb;cursor:not-allowed}.TextArea_textarea__5Br7T{border-radius:1.25rem;border:1px solid #929292;padding:.5rem 1rem}[data-touched=true].TextArea_textarea__5Br7T:invalid{border-color:#ce0500;border-width:2px}.TextArea_textarea__5Br7T:valid,.TextArea_textarea__5Br7T:not([data-touched=true]){margin:1px}.TextArea_textarea__5Br7T{color:#161616;background-color:rgba(0,0,0,0);font-size:.875rem;line-height:1.4}@media(min-width: 62em){.TextArea_textarea__5Br7T{font-size:1rem}}.TextArea_textarea__5Br7T{font-family:inherit;resize:vertical}","",{version:3,sources:["webpack://./src/client/components/ui/Form/TextboxShared.module.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Form/TextArea/TextArea.module.scss"],names:[],mappings:"AAYA,mFACE,UC0BqB,CDzBrB,wBCSqC,CDRrC,kBAAA,CAGF,0BACE,qBAXc,CAYd,wBAAA,CACA,kBAAA,CAGF,qDACE,oBCbY,CDcZ,gBAnBmB,CAqBrB,mFACE,UAnB0B,CAsB5B,0BACE,aCGmB,CDFnB,8BAAA,CEiBA,iBAAA,CACA,eAAA,CC9CE,wBH0BJ,0BEuBI,cAAA,CAAA,CErDJ,0BAEE,mBAAA,CACA,eAAA",sourcesContent:['@use "@styles/utilities";\n\n$color-text: utilities.$color-text-primary;\n$color-border: utilities.$color-background-border;\n$color-text-disabled: utilities.$color-text-secondary;\n$color-background-disabled: utilities.$color-background-primary-alternative;\n$color-error: utilities.$color-error;\n$error-border-width: 2px;\n$border-radius: 1.25rem;\n$border-width: 1px;\n$border-width-compensation: calc($error-border-width - $border-width);\n\n%disabled {\n  color: $color-text-disabled;\n  background-color: $color-background-disabled;\n  cursor: not-allowed;\n}\n\n%bordered {\n  border-radius: $border-radius;\n  border: $border-width solid $color-border;\n  padding: 0.5rem 1rem;\n}\n\n%error {\n  border-color: $color-error;\n  border-width: $error-border-width;\n}\n%border-no-error {\n  margin: $border-width-compensation;\n}\n\n%input {\n  color: $color-text;\n  background-color: transparent;\n  @extend %bordered;\n  @include utilities.text-interactive-medium;\n\n  &:disabled,\n  &:not(button):read-only {\n    @extend %disabled;\n  }\n\n  &[data-touched="true"]:invalid {\n    @extend %error;\n  }\n  &:valid,\n  &:not([data-touched="true"]) {\n    @extend %border-no-error;\n  }\n}\n\n%comboboxes {\n  $color-list-border: $color-border;\n  $color-list-background: utilities.$color-background-primary;\n  $color-option-hover: utilities.$color-background-primary-alternative;\n  @include utilities.text-interactive-medium;\n  & [role="combobox"] {\n    @extend %input;\n  }\n\n  position: relative;\n  & [role="listbox"] {\n    z-index: 1;\n    position: absolute;\n    top: 100%;\n    width: 100%;\n    margin-top: 2px;\n  }\n\n  & [role="listbox"] {\n    border: 1px solid $color-list-border;\n    border-radius: $border-radius;\n    background-color: $color-list-background;\n  }\n\n  & [role="listbox"] {\n    max-height: 10em;\n    overflow-y: scroll;\n  }\n\n  & [role="option"] {\n    padding: .5rem 1ch;\n  }\n  & [role="option"] {\n    cursor: pointer;\n  }\n\n  %hovered-option {\n    background-color: $color-option-hover;\n    font-weight: bold;\n  }\n\n  & li[role="none"]:has([role="group"]) {\n    font-weight: bold;\n    & > * {\n      font-weight: initial;\n    }\n  }\n\n  %chevron {\n    transition: transform 200ms linear;\n  }\n  %chevron-expanded {\n    transform: rotate(-180deg);\n  }\n}\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n/* ***************\n * Complementary colors - Campagne Apprentissage Octobre 2024\n * ***************/\n$color-title-apprentissage-2024: #E8CF31;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium {\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "../TextboxShared.module";\n\n.textarea {\n  @extend %input;\n  font-family: inherit;\n  resize: vertical;\n}\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={textarea:"TextArea_textarea__5Br7T"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);