/*! For license information please see client-components-ui-Form-Error-Error-stories.733f20fc.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[921],{"./src/client/components/ui/Form/Error/Error.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,exemple:()=>exemple});var _exemple_parameters,_exemple_parameters_docs,_exemple_parameters1,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_Input__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/client/components/ui/Form/Input/index.tsx"),_Label__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Form/Label/index.tsx"),_Error__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/client/components/ui/Form/Error/Error.tsx");const __WEBPACK_DEFAULT_EXPORT__={component:_Error__WEBPACK_IMPORTED_MODULE_3__.$,title:"Components/Form/Error"},exemple={args:{},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Label__WEBPACK_IMPORTED_MODULE_2__.J,{htmlFor:"pays",children:"Pays"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Input__WEBPACK_IMPORTED_MODULE_1__.p,{id:"pays","aria-describedby":"error"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Error__WEBPACK_IMPORTED_MODULE_3__.$,{id:"error",...args,children:"Je suis l‘erreur"})]})};exemple.parameters={...exemple.parameters,docs:{...null===(_exemple_parameters=exemple.parameters)||void 0===_exemple_parameters?void 0:_exemple_parameters.docs,source:{originalSource:'{\n  args: {},\n  render: args => <>\n            <Label htmlFor="pays">Pays</Label>\n            <Input id="pays" aria-describedby="error" />\n            <Error id=\'error\' {...args}>Je suis l‘erreur</Error>\n        </>\n}',...null===(_exemple_parameters1=exemple.parameters)||void 0===_exemple_parameters1||null===(_exemple_parameters_docs=_exemple_parameters1.docs)||void 0===_exemple_parameters_docs?void 0:_exemple_parameters_docs.source}}};const __namedExportsOrder=["exemple"]},"./src/client/components/ui/Form/Error/Error.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>Error});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Error_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Form/Error/Error.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Error_module.A,options);const Error_Error_module=Error_module.A&&Error_module.A.locals?Error_module.A.locals:void 0;function Error(param){let{className,...rest}=param;return(0,jsx_runtime.jsx)("p",{className:classnames_default()(Error_Error_module.error,className),...rest})}Error.__docgenInfo={description:"",methods:[],displayName:"Error"}},"./src/client/components/ui/Form/Input/Input.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{p:()=>Input});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),useSynchronizedRef=__webpack_require__("./src/client/hooks/useSynchronizedRef.tsx"),useTouchedInput=__webpack_require__("./src/client/hooks/useTouchedInput.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Input_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Form/Input/Input.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Input_module.A,options);const Input_Input_module=Input_module.A&&Input_module.A.locals?Input_module.A.locals:void 0,Input=react.forwardRef((function Input(param,outerRef){let{className,validation=nullValidation,onChange:onChangeProps=doNothing,onFocus:onFocusProps=doNothing,onBlur:onBlurProps=doNothing,onTouch:onTouchProps=doNothing,...props}=param;const inputRef=(0,useSynchronizedRef.T)(outerRef),{touched,saveValueOnFocus,setTouchedOnBlur}=(0,useTouchedInput.g)();(0,react.useEffect)((()=>{var _inputRef_current,_inputRef_current1;const error=validation(null===(_inputRef_current=inputRef.current)||void 0===_inputRef_current?void 0:_inputRef_current.value);var _inputRef_current2;(null===(_inputRef_current1=inputRef.current)||void 0===_inputRef_current1||_inputRef_current1.setCustomValidity(error),touched)&&(null===(_inputRef_current2=inputRef.current)||void 0===_inputRef_current2||_inputRef_current2.checkValidity())}),[inputRef,touched,validation]);const onChange=(0,react.useCallback)((function onChange(event){var _event_currentTarget;const error=validation(event.currentTarget.value);var _inputRef_current;(null===(_event_currentTarget=event.currentTarget)||void 0===_event_currentTarget||_event_currentTarget.setCustomValidity(error),onChangeProps(event),touched)&&(null===(_inputRef_current=inputRef.current)||void 0===_inputRef_current||_inputRef_current.checkValidity())}),[inputRef,onChangeProps,touched,validation]),onFocus=(0,react.useCallback)((function onFocus(event){saveValueOnFocus(event.currentTarget.value),onFocusProps(event)}),[onFocusProps,saveValueOnFocus]),onBlur=(0,react.useCallback)((async function onFocus(event){const touched=setTouchedOnBlur(event.currentTarget.value);touched&&onTouchProps(touched),onBlurProps(event)}),[onBlurProps,onTouchProps,setTouchedOnBlur]);return(0,jsx_runtime.jsx)("input",{"data-touched":touched,ref:inputRef,onChange,onFocus,onBlur,className:classnames_default()(Input_Input_module.input,className),...props})}));function doNothing(){}function nullValidation(){return""}Input.__docgenInfo={description:"",methods:[],displayName:"Input",props:{validation:{defaultValue:{value:"function nullValidation() {\n\treturn '';\n}",computed:!1},required:!1},onChange:{defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1},required:!1},onFocus:{defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1},required:!1},onBlur:{defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1},required:!1},onTouch:{defaultValue:{value:"function doNothing() {\n\treturn;\n}",computed:!1},required:!1}}}},"./src/client/components/ui/Form/Input/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{p:()=>_Input__WEBPACK_IMPORTED_MODULE_0__.p});var _Input__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/client/components/ui/Form/Input/Input.tsx")},"./src/client/components/ui/Form/Label/Label.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{J:()=>Label});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),injectStylesIntoStyleTag=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Label_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Form/Label/Label.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Label_module.A,options);const Label_Label_module=Label_module.A&&Label_module.A.locals?Label_module.A.locals:void 0;function Label(param){let{className,children,...rest}=param;return(0,jsx_runtime.jsx)("label",{className:classnames_default()(Label_Label_module.label,className),...rest,children})}Label.Complement=function Complement(param){let{className,...props}=param;return(0,jsx_runtime.jsx)("small",{className:classnames_default()(Label_Label_module.complement,className),...props})},Label.Required=function Required(){return(0,jsx_runtime.jsx)("span",{children:"(champ obligatoire)"})},Label.Optional=function Optional(){return(0,jsx_runtime.jsx)("span",{children:"(champ optionnel)"})},Label.__docgenInfo={description:"",methods:[{name:"Complement",docblock:null,modifiers:["static"],params:[{name:"{ className, ...props }: ComplementProps",optional:!1,type:{name:"ComponentPropsWithoutRef",elements:[{name:"literal",value:"'small'"}],raw:"ComponentPropsWithoutRef<'small'>",alias:"ComplementProps"}}],returns:null},{name:"Required",docblock:null,modifiers:["static"],params:[],returns:null},{name:"Optional",docblock:null,modifiers:["static"],params:[],returns:null}],displayName:"Label",props:{label:{required:!1,tsType:{name:"string"},description:""}}}},"./src/client/components/ui/Form/Label/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{J:()=>_Label__WEBPACK_IMPORTED_MODULE_0__.J});var _Label__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/client/components/ui/Form/Label/Label.tsx")},"./src/client/hooks/useSynchronizedRef.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>useSynchronizedRef});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function useSynchronizedRef(ref){const innerRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref,(()=>innerRef.current),[innerRef]),innerRef}},"./src/client/hooks/useTouchedInput.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{g:()=>useTouchedInput});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function useTouchedInput(){const[touched,setTouched]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),valueOnFocus=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return{saveValueOnFocus:(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function saveCurrentValue(value){valueOnFocus.current=value}),[]),setTouchedOnBlur:(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function touch(currentValue){if(valueOnFocus.current!==currentValue){const wasAlreadyTouched=touched;return setTouched(!0),!wasAlreadyTouched}return!1}),[touched]),touched}}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Form/Error/Error.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".T_VjTWu0MR8_jowYInP0{font-size:.875rem;line-height:1.2;color:#ce0500}","",{version:3,sources:["webpack://./src/client/components/ui/Form/Error/Error.module.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AAIA,sBCqCE,iBAAA,CACA,eAAA,CDpCA,aEMY",sourcesContent:['@use "@styles/utilities";\n\n$error-color-text: utilities.$color-error;\n\n.error{\n  @include utilities.text-small;\n  color: $error-color-text;\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={error:"T_VjTWu0MR8_jowYInP0"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Form/Input/Input.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".OxZFWlhUOKYQ3DjMWOzL{color:#161616;background-color:rgba(0,0,0,0);padding:.5rem 1rem;border-radius:1.25rem;border:1px solid #929292;font-size:.875rem;line-height:1.4}@media(min-width: 62em){.OxZFWlhUOKYQ3DjMWOzL{font-size:1rem}}.OxZFWlhUOKYQ3DjMWOzL:disabled,.OxZFWlhUOKYQ3DjMWOzL:read-only{color:#666;background-color:#f6f7fb;cursor:not-allowed}[data-touched=true].OxZFWlhUOKYQ3DjMWOzL:invalid{border-color:#ce0500;border-width:2px}.OxZFWlhUOKYQ3DjMWOzL:valid,.OxZFWlhUOKYQ3DjMWOzL:not([data-touched=true]){margin:1px 0 1px 1px}","",{version:3,sources:["webpack://./src/client/components/ui/Form/Input/Input.module.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss"],names:[],mappings:"AAYA,sBACE,aCuBmB,CDtBnB,8BAAA,CACA,kBAAA,CACA,qBARc,CASd,wBAAA,CEkCA,iBAAA,CACA,eAAA,CC9CE,wBHMJ,sBE2CI,cAAA,CAAA,CFnCF,+DAEE,UCiBmB,CDhBnB,wBAAA,CACA,kBAAA,CAGF,iDACE,oBChBU,CDiBV,gBAtBiB,CAyBnB,2EAGE,oBAAA",sourcesContent:['@use "@styles/utilities";\n\n$color-text: utilities.$color-text-primary;\n$color-border: utilities.$color-background-border;\n$color-text-disabled: utilities.$color-text-secondary;\n$color-background-disabled: utilities.$color-background-primary-alternative;\n$color-error: utilities.$color-error;\n$error-border-width: 2px;\n$border-radius: 1.25rem;\n$border-width: 1px;\n$border-width-compensation: calc($error-border-width - $border-width);\n\n%input {\n  color: $color-text;\n  background-color: transparent;\n  padding: 0.5rem 1rem;\n  border-radius: $border-radius;\n  border: $border-width solid $color-border;\n  @include utilities.text-interactive-medium;\n\n  &:disabled,\n  &:read-only {\n    color: $color-text-disabled;\n    background-color: $color-background-disabled;\n    cursor: not-allowed;\n  }\n\n  &[data-touched="true"]:invalid {\n    border-color: $color-error;\n    border-width: $error-border-width;\n  }\n\n  &:valid,\n  &:not([data-touched="true"]) {\n    // NOTE (GAFI 06-07-2023): Compense la bordure plus épaisse quand en erreur\n    margin: $border-width-compensation 0 $border-width-compensation $border-width-compensation;\n  }\n}\n\n.input {\n  @extend %input;\n}\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={input:"OxZFWlhUOKYQ3DjMWOzL"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Form/Label/Label.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".G68y8XQeGu2bQ6eCr3VN{display:block;overflow-wrap:anywhere;font-size:1rem;line-height:1.2}.G68y8XQeGu2bQ6eCr3VN:has(+input[readonly],+input[disabled]){color:#666}@media(min-width: 36em){.G68y8XQeGu2bQ6eCr3VN{font-size:1.125rem;line-height:1.2}}.G68y8XQeGu2bQ6eCr3VN .loeUNkbHb4urlvtnGS5h{display:block;overflow:hidden;color:#666;font-size:.75rem;line-height:1.2;line-height:1.4}","",{version:3,sources:["webpack://./src/client/components/ui/Form/Label/Label.module.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/styles/media/_mixins.scss"],names:[],mappings:"AAKA,sBACE,aAAA,CACA,sBAAA,CC6BA,cAAA,CACA,eAAA,CD3BA,6DACE,UE4BmB,CC3BpB,wBHPH,sBC0BE,kBAAA,CACA,eAAA,CAAA,CDdA,4CACE,aAAA,CACA,eAAA,CACA,UEkBmB,CDOrB,gBAAA,CACA,eAAA,CDxBE,eAAA",sourcesContent:['@use "@styles/utilities";\n\n$color-text-disabled-or-readonly: utilities.$color-text-secondary;\n$color-text-label-complement: utilities.$color-text-secondary;\n\n.label {\n  display: block;\n  overflow-wrap: anywhere;\n  @include utilities.text-medium;\n\n  &:has(+input[readonly], +input[disabled]) {\n    color: $color-text-disabled-or-readonly;\n  }\n\n  @include utilities.media(small) {\n    @include utilities.text-large;\n  }\n\n  .complement {\n    display: block;\n    overflow: hidden;\n    color: $color-text-label-complement;\n    @include utilities.text-xsmall;\n    line-height: 1.4;\n  }\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={label:"G68y8XQeGu2bQ6eCr3VN",complement:"loeUNkbHb4urlvtnGS5h"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/next/dist/compiled/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js")}}]);