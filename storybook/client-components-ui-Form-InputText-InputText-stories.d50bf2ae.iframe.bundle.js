/*! For license information please see client-components-ui-Form-InputText-InputText-stories.d50bf2ae.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[5905],{"./src/client/components/ui/Form/InputText/InputText.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _Example_parameters,_Example_parameters_docs,_Example_parameters1;__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/Form/InputText/InputText.tsx").S,title:"Components/Form/InputText"},Example={args:{label:"Prénom"}};Example.parameters={...Example.parameters,docs:{...null===(_Example_parameters=Example.parameters)||void 0===_Example_parameters?void 0:_Example_parameters.docs,source:{originalSource:"{\n  args: {\n    label: 'Prénom'\n  }\n}",...null===(_Example_parameters1=Example.parameters)||void 0===_Example_parameters1||null===(_Example_parameters_docs=_Example_parameters1.docs)||void 0===_Example_parameters_docs?void 0:_Example_parameters_docs.source}}};const __namedExportsOrder=["Example"]},"./src/client/components/ui/Form/InputText/InputText.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{S:()=>InputText});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),InputText_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/InputText/InputText.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(InputText_module.A,options);const InputText_InputText_module=InputText_module.A&&InputText_module.A.locals?InputText_module.A.locals:void 0;var useSynchronizedRef=__webpack_require__("./src/client/hooks/useSynchronizedRef.tsx");const InputText=react.forwardRef(((props,outerRef)=>{const{className,defaultValue,hint,label,necessity,onChange,value:outerValue,validation,tooltip,...rest}=props,ref=(0,useSynchronizedRef.T)(outerRef),[valueState,setValueState]=(0,react.useState)(null!=defaultValue?defaultValue:""),[error,setError]=(0,react.useState)(void 0),[touched,setTouched]=(0,react.useState)(!1);(0,react.useLayoutEffect)((function validateInput(){if(validation){var _ref_current;const error=validation(valueState);null===(_ref_current=ref.current)||void 0===_ref_current||_ref_current.setCustomValidity(null!=error?error:""),setError(null!=error?error:void 0)}}),[validation,valueState,ref]),(0,react.useLayoutEffect)((function checkInputValidity(){if(ref.current&&touched){const isValid=ref.current.checkValidity();setError(isValid?void 0:ref.current.validationMessage)}}),[ref,touched,valueState]),(0,react.useEffect)((function onValueChange(){setValueState(outerValue||"")}),[outerValue]);const inputId=(0,react.useRef)((0,v4.A)()),hintId=(0,react.useRef)((0,v4.A)()),errorId=(0,react.useRef)((0,v4.A)()),onInputChange=(0,react.useCallback)((event=>{onChange&&onChange(event),setValueState(event.target.value)}),[onChange]);return(0,jsx_runtime.jsxs)("div",{className:classnames_default()(InputText_InputText_module.textInput,className),children:[label&&(0,jsx_runtime.jsxs)("div",{className:InputText_InputText_module.textInputLabel,children:[(0,jsx_runtime.jsxs)("label",{htmlFor:inputId.current,children:[label,necessity&&(0,jsx_runtime.jsxs)("span",{children:[" (champ ","required"===necessity?"obligatoire":"optionnel",")"]})]}),tooltip]}),(0,jsx_runtime.jsx)("input",{ref,type:"text",...rest,id:inputId.current,"aria-describedby":hint&&hintId.current,"aria-invalid":!!error,"aria-errormessage":error&&errorId.current,className:classnames_default()(InputText_InputText_module.textInputField,touched&&InputText_InputText_module.textInputFieldTouched),onChange:onInputChange,onBlur:()=>setTouched(!0),value:valueState}),error&&(0,jsx_runtime.jsx)("p",{className:classnames_default()(InputText_InputText_module.textInputHint,InputText_InputText_module.textInputHintError),id:errorId.current,children:error}),!error&&hint&&(0,jsx_runtime.jsx)("p",{className:classnames_default()(InputText_InputText_module.textInputHint),id:hintId.current,children:hint})]})}));InputText.__docgenInfo={description:"",methods:[],displayName:"InputText",props:{hint:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},necessity:{required:!1,tsType:{name:"union",raw:"'optional' | 'required'",elements:[{name:"literal",value:"'optional'"},{name:"literal",value:"'required'"}]},description:""},validation:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: InputValue) => string | null | undefined",signature:{arguments:[{type:{name:"union",raw:"string | ReadonlyArray<string> | number | undefined",elements:[{name:"string"},{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>"},{name:"number"},{name:"undefined"}]},name:"value"}],return:{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]}}},description:""},tooltip:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./src/client/hooks/useSynchronizedRef.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>useSynchronizedRef});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function useSynchronizedRef(ref){const innerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>innerRef.current),[innerRef]),innerRef}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/InputText/InputText.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".InputText_textInputLabel__fbEDk{font-size:1rem;line-height:1.2}@media(min-width: 62em){.InputText_textInputLabel__fbEDk{font-size:1.125rem;line-height:1.2}}.InputText_textInput__a8XV4{position:relative;display:flex;flex-direction:column;align-items:stretch}.InputText_textInputLabel__fbEDk{margin-bottom:.5rem}.InputText_textInputField__eYypj{font-size:.875rem;line-height:1.4;display:flex;align-items:center;padding:.5rem 1rem;border-radius:1.25rem;border:solid 1px #929292;font-family:inherit}@media(min-width: 62em){.InputText_textInputField__eYypj{font-size:1rem}}.InputText_textInputField__eYypj:disabled{background-color:#f6f7fb}.InputText_textInputField__eYypj:active,.InputText_textInputField__eYypj:focus{border-color:#566bb1}.InputText_textInputField__eYypj::placeholder{color:#666;opacity:1}.InputText_textInputFieldTouched__a_CS9[aria-invalid=true],.InputText_textInputFieldTouched__a_CS9:invalid{border:solid 2px #ce0500}.InputText_textInputHint__qqm2e{padding-top:.25rem;color:#566bb1;font-size:.875rem;line-height:1.2;line-height:1rem}.InputText_textInputHintError__PGsEl{color:#ce0500}","",{version:3,sources:["webpack://./src/styles/components/form/_variables.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Form/InputText/InputText.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAWA,iCCyBE,cAAA,CACA,eAAA,CC/BE,wBFKJ,iCCoBE,kBAAA,CACA,eAAA,CAAA,CE5BF,4BACE,iBAAA,CACA,YAAA,CACA,qBAAA,CACA,mBAAA,CAEA,iCAEE,mBAAA,CAGF,iCFoCA,iBAAA,CACA,eAAA,CEnCE,YAAA,CACA,kBAAA,CACA,kBAAA,CACA,qBAAA,CACA,wBAAA,CACA,mBAAA,CDhBA,wBCSF,iCFwCE,cAAA,CAAA,CE/BA,0CACE,wBCJQ,CDOV,+EACE,oBCxBM,CD2BR,8CACE,UCRc,CDSd,SAAA,CAGF,2GAEE,wBAAA,CAIJ,gCACE,kBAAA,CACA,aCxCQ,CHoCV,iBAAA,CACA,eAAA,CEKE,gBAAA,CAEA,qCACE,aCjCQ",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/typography/placeholders";\n\n$form-horizontal-gap: 1.5rem;\n\n$form-vertical-gap-mobile: 1rem;\n$form-vertical-gap-desktop: 1.5rem;\n\n$form-submit-button-vertical-gap-mobile: 3rem;\n\n\n%label-champ{\n  @include placeholders.text-medium;\n\n  @include mixins.media(large) {\n    @include placeholders.text-large\n  }\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n@use "@styles/utilities";\n@use "@styles/components/form/variables";\n\n.textInput {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n\n  &Label {\n    @extend %label-champ;\n    margin-bottom: 0.5rem;\n  }\n\n  &Field {\n    @include utilities.text-interactive-medium;\n    display: flex;\n    align-items: center;\n    padding: 0.5rem 1rem;\n    border-radius: 1.25rem;\n    border: solid 1px utilities-deprecated.$neutral-grey;\n    font-family: inherit;\n\n    &:disabled {\n      background-color: utilities-deprecated.$white-lilac;\n    }\n\n    &:active, &:focus {\n      border-color: utilities-deprecated.$color-primary;\n    }\n\n    &::placeholder {\n      color: utilities-deprecated.$deep-neutral-grey;\n      opacity: 1;\n    }\n\n    &Touched[aria-invalid=true],\n    &Touched:invalid {\n      border: solid 2px utilities-deprecated.$color-error;\n    }\n  }\n\n  &Hint {\n    padding-top: 0.25rem;\n    color: utilities-deprecated.$color-primary;\n    @include utilities.text-small;\n    line-height: 1rem;\n\n    &Error {\n      color: utilities-deprecated.$color-error;\n    }\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={textInputLabel:"InputText_textInputLabel__fbEDk",textInput:"InputText_textInput__a8XV4",textInputField:"InputText_textInputField__eYypj",textInputFieldTouched:"InputText_textInputFieldTouched__a_CS9",textInputHint:"InputText_textInputHint__qqm2e",textInputHintError:"InputText_textInputHintError__PGsEl"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);