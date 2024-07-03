/*! For license information please see client-components-ui-Accordion-Accordion-stories.c4104647.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[1122],{"./src/client/components/ui/Accordion/Accordion.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Example_parameters,_Example_parameters_docs,_Example_parameters1,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/Accordion/Accordion.tsx").n,title:"Components/Accordion"},Example={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{children:"Je suis un enfant"}),open:!0,summary:"titre",summaryAs:"h2"}};Example.parameters={...Example.parameters,docs:{...null===(_Example_parameters=Example.parameters)||void 0===_Example_parameters?void 0:_Example_parameters.docs,source:{originalSource:"{\n  args: {\n    children: <p>Je suis un enfant</p>,\n    open: true,\n    summary: 'titre',\n    summaryAs: 'h2'\n  }\n}",...null===(_Example_parameters1=Example.parameters)||void 0===_Example_parameters1||null===(_Example_parameters_docs=_Example_parameters1.docs)||void 0===_Example_parameters_docs?void 0:_Example_parameters_docs.source}}};const __namedExportsOrder=["Example"]},"./src/client/components/ui/Accordion/Accordion.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>Accordion});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Accordion_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Accordion/Accordion.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Accordion_module.A,options);const Accordion_Accordion_module=Accordion_module.A&&Accordion_module.A.locals?Accordion_module.A.locals:void 0;function Accordion(props){const{children,className,open,summary,summaryAs,...rest}=props,Summary=react.useCallback((param=>{let{...rest}=param;const content=react.createElement(summaryAs||react.Fragment,{},summary);return react.createElement("summary",{...rest},content)}),[summary,summaryAs]);return(0,jsx_runtime.jsxs)("details",{className:classnames_default()(Accordion_Accordion_module.details,className),open:null!=open&&open,...rest,children:[(0,jsx_runtime.jsx)(Summary,{className:Accordion_Accordion_module.summary}),children]})}Accordion.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{open:{required:!1,tsType:{name:"boolean"},description:""},summary:{required:!0,tsType:{name:"string"},description:""},summaryAs:{required:!1,tsType:{name:"union",raw:"'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",elements:[{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"},{name:"literal",value:"'h5'"},{name:"literal",value:"'h6'"}]},description:""}}}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Accordion/Accordion.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".Accordion_details__etGZ5 .Accordion_summary__QrguI,.Accordion_details__etGZ5 .Accordion_summary__QrguI>*,.Accordion_sectionContent__zyNB_ h3,.Accordion_sectionContent__zyNB_ h4,.Accordion_sectionContent__zyNB_ h5{font-weight:700}.Accordion_details__etGZ5 .Accordion_summary__QrguI,.Accordion_details__etGZ5 .Accordion_summary__QrguI>*,.Accordion_sectionContent__zyNB_ h3,.Accordion_sectionContent__zyNB_ h4,.Accordion_sectionContent__zyNB_ h5{font-weight:700}.Accordion_details__etGZ5{cursor:default}.Accordion_details__etGZ5 .Accordion_summary__QrguI{font-size:1rem;line-height:1.2;padding:1.5rem 3rem 1.5rem 1rem;color:#566bb1;background-color:#f6f7fb;background-repeat:no-repeat;background-position:calc(100% - 1rem);background-image:url(\"data:image/svg+xml;charset=utf8,<svg width='24' height='25' viewBox='0 0 24 25' fill='%23000' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M12 13.5797L16.95 8.62971L18.364 10.0437L12 16.4077L5.63599 10.0437L7.04999 8.62971L12 13.5797Z' /></svg>\");border:1px solid #929292;border-radius:20px;box-shadow:10px 10px 20px rgba(0,0,0,.05);list-style:none;cursor:pointer}.Accordion_details__etGZ5 .Accordion_summary__QrguI::-webkit-details-marker{display:none}@media(min-width: 62em){.Accordion_details__etGZ5 .Accordion_summary__QrguI{padding:1.5rem 3.5rem 1.5rem 1.5rem;background-position:calc(100% - 2.5rem)}}.Accordion_details__etGZ5[open] .Accordion_summary__QrguI{background-image:url(\"data:image/svg+xml;charset=utf8,<svg width='24' height='24' viewBox='0 0 24 24' fill='%23000' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M12 10.8281L7.04999 15.7781L5.63599 14.3641L12 8.00008L18.364 14.3641L16.95 15.7781L12 10.8281Z' /></svg>\")}.Accordion_sectionContent__zyNB_{padding:2rem}.Accordion_sectionContent__zyNB_ h3,.Accordion_sectionContent__zyNB_ h4,.Accordion_sectionContent__zyNB_ h5{margin-bottom:1rem}.Accordion_sectionContent__zyNB_ p:not(:last-child){margin-bottom:1rem}","",{version:3,sources:["webpack://./src/styles/typography/_placeholders-deprecated.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/client/components/ui/Accordion/Accordion.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/styles/media/_mixins.scss"],names:[],mappings:"AAsEA,sNACE,eAAA,CCZF,sNACE,eAAA,CCtDF,0BACE,cAAA,CAEA,oDD2BA,cAAA,CACA,eAAA,CC1BE,+BAAA,CACA,aCPQ,CDQR,wBEUmC,CFTnC,2BAAA,CACA,qCAAA,CACA,mTAAA,CACA,wBAAA,CACA,kBAAA,CACA,yCAAA,CACA,eAAA,CACA,cAAA,CAEA,4EACE,YAAA,CGlBF,wBHGF,oDAuBI,mCAAA,CACA,uCAAA,CAAA,CAIJ,0DACE,mTAAA,CAIJ,iCACE,YAAA,CAEA,4GACE,kBAAA,CAIF,oDACE,kBAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/theme/variables-deprecated.scss";\n\n%text-regular {\n  font-size: .875rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%text-medium {\n  font-size: 1rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1.125rem;\n  }\n}\n\n%text-xLarge {\n  font-size: 1.5rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n%text-large {\n  font-size: 1.125rem;\n  line-height: 1.8rem;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n    line-height: 2rem;\n  }\n}\n\n%text-small {\n  font-size: .75rem;\n  line-height: 1.25rem;\n\n  @include mixins.media(large) {\n    font-size: .875rem;\n    line-height: 1.5rem;\n  }\n}\n\n%headline {\n  font-size: 1.25rem;\n  line-height: 2rem;\n  color: variables-deprecated.$color-primary;\n\n  @include mixins.media(large) {\n    font-size: 2rem;\n    line-height: 3rem;\n  }\n}\n\n%subheading {\n  font-size: 1.25rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium {\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n',"@use \"@styles/utilities-deprecated\";\n@use \"@styles/utilities\";\n\n$color-background-accordion: utilities.$color-background-primary-alternative;\n$color-border-accordion: utilities.$color-background-border;\n\n.details {\n  cursor: default;\n\n  .summary {\n    @include utilities.text-medium;\n    padding: 1.5rem 3rem 1.5rem 1rem;\n    color: utilities-deprecated.$color-primary;\n    background-color: $color-background-accordion;\n    background-repeat: no-repeat;\n    background-position: calc(100% - 1rem);\n    background-image: url(\"data:image/svg+xml;charset=utf8,<svg width='24' height='25' viewBox='0 0 24 25' fill='%23000' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M12 13.5797L16.95 8.62971L18.364 10.0437L12 16.4077L5.63599 10.0437L7.04999 8.62971L12 13.5797Z' /></svg>\");\n    border: 1px solid $color-border-accordion;\n    border-radius: 20px;\n    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);\n    list-style: none;\n    cursor: pointer;\n\n    &::-webkit-details-marker { // Enlève le marqueur par défaut présent sur Safari\n      display: none;\n    }\n\n    &, & > * {\n      @extend %bold;\n    }\n\n    @include utilities-deprecated.media(large) {\n      padding: 1.5rem 3.5rem 1.5rem 1.5rem;\n      background-position: calc(100% - 2.5rem);\n    }\n  }\n\n  &[open] .summary {\n    background-image: url(\"data:image/svg+xml;charset=utf8,<svg width='24' height='24' viewBox='0 0 24 24' fill='%23000' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M12 10.8281L7.04999 15.7781L5.63599 14.3641L12 8.00008L18.364 14.3641L16.95 15.7781L12 10.8281Z' /></svg>\");\n  }\n}\n\n.sectionContent {\n  padding: 2rem;\n\n  h3, h4, h5 {\n    margin-bottom: 1rem;\n    @extend %bold;\n  }\n\n  p:not(:last-child) {\n    margin-bottom: 1rem;\n  }\n}\n",'@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={details:"Accordion_details__etGZ5",summary:"Accordion_summary__QrguI",sectionContent:"Accordion_sectionContent__zyNB_"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);