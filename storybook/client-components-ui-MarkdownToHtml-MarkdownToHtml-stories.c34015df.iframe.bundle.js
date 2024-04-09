/*! For license information please see client-components-ui-MarkdownToHtml-MarkdownToHtml-stories.c34015df.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[9806],{"./src/client/components/ui/MarkdownToHtml/MarkdownToHtml.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _Example_parameters,_Example_parameters_docs,_Example_parameters1;__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/MarkdownToHtml/MarkdownToHtml.tsx").A,title:"Components/Marked"},Example={args:{markdown:"# Composant Markdown\nCeci est un exemple de markdown transformé en HTML via le composant Markdown"}};Example.parameters={...Example.parameters,docs:{...null===(_Example_parameters=Example.parameters)||void 0===_Example_parameters?void 0:_Example_parameters.docs,source:{originalSource:"{\n  args: {\n    markdown: `# Composant Markdown\nCeci est un exemple de markdown transformé en HTML via le composant Markdown`\n  }\n}",...null===(_Example_parameters1=Example.parameters)||void 0===_Example_parameters1||null===(_Example_parameters_docs=_Example_parameters1.docs)||void 0===_Example_parameters_docs?void 0:_Example_parameters_docs.source}}};const __namedExportsOrder=["Example"]},"./src/client/components/ui/MarkdownToHtml/MarkdownToHtml.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>MarkdownToHtml});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),markdown_it=__webpack_require__("./node_modules/markdown-it/index.mjs"),markdownItAnchor=__webpack_require__("./node_modules/markdown-it-anchor/dist/markdownItAnchor.mjs");function getHtmlFromMd(markdown){const md=(0,markdown_it.A)({html:!0,linkify:!0});md.use(markdownItAnchor.A,{tabIndex:!1});const defaultRender=md.renderer.rules.link_open||function(tokens,idx,options,env,self){return self.renderToken(tokens,idx,options)};return md.renderer.rules.link_open=function(tokens,idx,options,env,self){return function isAnchor(url){return!!url&&url.startsWith("#")}(tokens[idx].attrGet("href"))||tokens[idx].attrSet("target","_blank"),defaultRender(tokens,idx,options,env,self)},md.render(markdown)}var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),MarkdownToHtml_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/MarkdownToHtml/MarkdownToHtml.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(MarkdownToHtml_module.A,options);const MarkdownToHtml_MarkdownToHtml_module=MarkdownToHtml_module.A&&MarkdownToHtml_module.A.locals?MarkdownToHtml_module.A.locals:void 0;function MarkdownToHtml(param){let{markdown,className,...rest}=param;const html=(0,react.useMemo)((()=>({__html:getHtmlFromMd(markdown)})),[markdown]);return(0,jsx_runtime.jsx)("div",{dangerouslySetInnerHTML:html,className:classnames_default()(MarkdownToHtml_MarkdownToHtml_module.markdown,className),...rest})}MarkdownToHtml.__docgenInfo={description:"",methods:[],displayName:"MarkdownToHtml",props:{markdown:{required:!0,tsType:{name:"string"},description:""}}}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/MarkdownToHtml/MarkdownToHtml.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".dkYT6E8KeRVgMXCYA4tq h4,.dkYT6E8KeRVgMXCYA4tq h5,.dkYT6E8KeRVgMXCYA4tq h6{font-size:1rem;line-height:1.5rem}@media(min-width: 62em){.dkYT6E8KeRVgMXCYA4tq h4,.dkYT6E8KeRVgMXCYA4tq h5,.dkYT6E8KeRVgMXCYA4tq h6{font-size:1.125rem}}.dkYT6E8KeRVgMXCYA4tq h3{font-size:1.125rem;line-height:1.8rem}@media(min-width: 62em){.dkYT6E8KeRVgMXCYA4tq h3{font-size:1.25rem;line-height:2rem}}.dkYT6E8KeRVgMXCYA4tq h1{font-size:1.25rem;line-height:2rem;color:#566bb1}@media(min-width: 62em){.dkYT6E8KeRVgMXCYA4tq h1{font-size:2rem;line-height:3rem}}.dkYT6E8KeRVgMXCYA4tq h2{font-size:1.25rem;line-height:2rem}@media(min-width: 62em){.dkYT6E8KeRVgMXCYA4tq h2{font-size:1.5rem}}.dkYT6E8KeRVgMXCYA4tq h1,.dkYT6E8KeRVgMXCYA4tq h2,.dkYT6E8KeRVgMXCYA4tq h3,.dkYT6E8KeRVgMXCYA4tq h4,.dkYT6E8KeRVgMXCYA4tq h5,.dkYT6E8KeRVgMXCYA4tq h6{font-weight:700}.dkYT6E8KeRVgMXCYA4tq h1,.dkYT6E8KeRVgMXCYA4tq h2,.dkYT6E8KeRVgMXCYA4tq h3,.dkYT6E8KeRVgMXCYA4tq h4,.dkYT6E8KeRVgMXCYA4tq h5,.dkYT6E8KeRVgMXCYA4tq h6{font-weight:700}.dkYT6E8KeRVgMXCYA4tq h1{color:#566bb1;font-size:1.5rem;line-height:1.4}@media(min-width: 62em){.dkYT6E8KeRVgMXCYA4tq h1{font-size:1.75rem}}.dkYT6E8KeRVgMXCYA4tq h2{font-size:1.5rem;line-height:1.4}@media(min-width: 62em){.dkYT6E8KeRVgMXCYA4tq h2{font-size:1.75rem}}.eS_KhIiBXgLUtF5j1oMO ul{list-style-type:disc}.eS_KhIiBXgLUtF5j1oMO ol{list-style-type:decimal}.eS_KhIiBXgLUtF5j1oMO ul,.eS_KhIiBXgLUtF5j1oMO ol{padding-left:1em}.eS_KhIiBXgLUtF5j1oMO p{margin:0;margin-bottom:.5em}.eS_KhIiBXgLUtF5j1oMO h3,.eS_KhIiBXgLUtF5j1oMO h4,.eS_KhIiBXgLUtF5j1oMO h5,.eS_KhIiBXgLUtF5j1oMO h6{font-weight:bold;margin-bottom:.5em;margin-top:1em}.eS_KhIiBXgLUtF5j1oMO p:last-child,.eS_KhIiBXgLUtF5j1oMO h3:last-child,.eS_KhIiBXgLUtF5j1oMO h4:last-child,.eS_KhIiBXgLUtF5j1oMO h5:last-child,.eS_KhIiBXgLUtF5j1oMO h6:last-child{margin-bottom:0}.dkYT6E8KeRVgMXCYA4tq p{margin-block:1.5rem}.dkYT6E8KeRVgMXCYA4tq ul li,.dkYT6E8KeRVgMXCYA4tq ol li{margin-block:.2rem}.dkYT6E8KeRVgMXCYA4tq ul,.dkYT6E8KeRVgMXCYA4tq ol{list-style:initial;margin-left:1.3rem}.dkYT6E8KeRVgMXCYA4tq ol{list-style:decimal;margin-left:1.5rem}.dkYT6E8KeRVgMXCYA4tq a:hover{color:#18753c}","",{version:3,sources:["webpack://./src/styles/typography/_placeholders-deprecated.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/styles/theme/_variables-deprecated.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/client/components/ui/MarkdownToHtml/MarkdownToHtml.module.scss"],names:[],mappings:"AAYA,2EACE,cAAA,CACA,kBAAA,CCRE,wBDMJ,2EAKI,kBAAA,CAAA,CAaJ,yBACE,kBAAA,CACA,kBAAA,CC1BE,wBDwBJ,yBAKI,iBAAA,CACA,gBAAA,CAAA,CAcJ,yBACE,iBAAA,CACA,gBAAA,CACA,aEhDU,CDCR,wBD4CJ,yBAMI,cAAA,CACA,gBAAA,CAAA,CAIJ,yBACE,iBAAA,CACA,gBAAA,CCzDE,wBDuDJ,yBAKI,gBAAA,CAAA,CAIJ,sJACE,eAAA,CGZF,sJACE,eAAA,CAYF,yBACE,aCpEc,CDDd,gBAAA,CACA,eAAA,CFCE,wBEkEJ,yBAhEI,iBAAA,CAAA,CAqEJ,yBAzEE,gBAAA,CACA,eAAA,CFCE,wBEuEJ,yBArEI,iBAAA,CAAA,CELF,yBAAA,oBAAA,CACA,yBAAA,uBAAA,CACA,kDACE,gBAAA,CAEF,wBACE,QAAA,CACA,kBAAA,CAGF,oGACE,gBAAA,CACA,kBAAA,CACA,cAAA,CAIA,mLACE,eAAA,CA0BJ,wBACE,mBAAA,CAGF,wDACE,kBAAA,CAGF,kDACE,kBAAA,CACA,kBAAA,CAGF,yBACE,kBAAA,CACA,kBAAA,CAGF,8BACE,aH/CS",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/theme/variables-deprecated.scss";\n\n%text-regular {\n  font-size: .875rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%text-medium {\n  font-size: 1rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1.125rem;\n  }\n}\n\n%text-xLarge {\n  font-size: 1.5rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n%text-large {\n  font-size: 1.125rem;\n  line-height: 1.8rem;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n    line-height: 2rem;\n  }\n}\n\n%text-small {\n  font-size: .75rem;\n  line-height: 1.25rem;\n\n  @include mixins.media(large) {\n    font-size: .875rem;\n    line-height: 1.5rem;\n  }\n}\n\n%headline {\n  font-size: 1.25rem;\n  line-height: 2rem;\n  color: variables-deprecated.$color-primary;\n\n  @include mixins.media(large) {\n    font-size: 2rem;\n    line-height: 3rem;\n  }\n}\n\n%subheading {\n  font-size: 1.25rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n','@use "@styles/utilities-deprecated";\n\n.markdown {\n  ul { list-style-type: disc }\n  ol { list-style-type: decimal }\n  ul, ol {\n    padding-left: 1em;\n  }\n  p {\n    margin: 0;\n    margin-bottom: .5em;\n  }\n\n  h3, h4, h5, h6 {\n    font-weight: bold;\n    margin-bottom: .5em;\n    margin-top: 1em;\n  }\n\n  p, h3, h4, h5, h6 {\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n}\n\n.normalize {\n  h1, h2, h3, h4, h5, h6 {\n    @extend %bold;\n  }\n\n  h1 {\n    @extend %headline;\n  }\n\n  h2 {\n    @extend %subheading;\n  }\n\n  h3 {\n    @extend %text-large;\n  }\n\n  h4, h5, h6 {\n    @extend %text-medium;\n  }\n\n  p {\n    margin-block: 1.5rem;\n  }\n\n  ul li, ol li {\n    margin-block: 0.2rem;\n  }\n\n  ul, ol {\n    list-style: initial;\n    margin-left: 1.3rem;\n  }\n\n  ol {\n    list-style: decimal;\n    margin-left: 1.5rem;\n  }\n\n  a:hover {\n    color: utilities-deprecated.$color-secondary;\n  }\n}\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={normalize:"dkYT6E8KeRVgMXCYA4tq",markdown:"eS_KhIiBXgLUtF5j1oMO"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/next/dist/compiled/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js")}}]);