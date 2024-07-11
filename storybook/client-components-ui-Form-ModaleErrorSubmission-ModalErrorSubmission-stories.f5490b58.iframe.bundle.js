"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[8082],{"./src/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,ExampleWithChildren:()=>ExampleWithChildren,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission.tsx").O,title:"Components/Form/ModaleErrorSubmission"},Example={args:{isOpen:!0,onClose:()=>window.alert("action de fermeture de la modale")}},ExampleWithChildren={args:{description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:"Je suis une description"}),isOpen:!0,onClose:()=>window.alert("action de fermeture de la modale")}},__namedExportsOrder=["Example","ExampleWithChildren"];Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:"{\n  args: {\n    isOpen: true,\n    onClose: () => window.alert('action de fermeture de la modale')\n  }\n}",...Example.parameters?.docs?.source}}},ExampleWithChildren.parameters={...ExampleWithChildren.parameters,docs:{...ExampleWithChildren.parameters?.docs,source:{originalSource:"{\n  args: {\n    description: <div>Je suis une description</div>,\n    isOpen: true,\n    onClose: () => window.alert('action de fermeture de la modale')\n  }\n}",...ExampleWithChildren.parameters?.docs?.source}}}},"./src/client/Errors/NoProviderError.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>NoProviderError});class NoProviderError extends Error{constructor(context){super("Context provider not found"+((null==context?void 0:context.displayName)?` for ${context.displayName}`:"")),this.name="NoProviderError"}}},"./src/client/components/keyboard/keyboard.enum.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var KeyBoard;__webpack_require__.d(__webpack_exports__,{A:()=>KeyBoard}),function(KeyBoard){KeyBoard.TAB="Tab",KeyBoard.SHIFT="Shift",KeyBoard.ARROW_DOWN="ArrowDown",KeyBoard.IE_ARROW_DOWN="Down",KeyBoard.ARROW_LEFT="ArrowLeft",KeyBoard.IE_ARROW_LEFT="LEFT",KeyBoard.ARROW_RIGHT="ArrowRight",KeyBoard.IE_ARROW_RIGHT="Right",KeyBoard.ARROW_UP="ArrowUp",KeyBoard.IE_ARROW_UP="Up",KeyBoard.ENTER="Enter",KeyBoard.ESCAPE="Escape",KeyBoard.IE_ESCAPE="Esc",KeyBoard.BACKSPACE="Backspace",KeyBoard.DELETE="Delete",KeyBoard.SPACE=" ",KeyBoard.HOME="Home",KeyBoard.END="End",KeyBoard.ALT="Alt",KeyBoard.PAGE_UP="PageUp",KeyBoard.PAGE_DOWN="PageDown"}(KeyBoard||(KeyBoard={}))},"./src/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>ModalErrorSubmission});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),ButtonComponent=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./src/client/components/ui/Button/ButtonComponent.tsx")),Link=__webpack_require__("./src/client/components/ui/Link/Link.tsx"),ModalComponent=__webpack_require__("./src/client/components/ui/Modal/ModalComponent.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),ModalErrorSubmission_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(ModalErrorSubmission_module.A,options);const ModaleErrorSubmission_ModalErrorSubmission_module=ModalErrorSubmission_module.A&&ModalErrorSubmission_module.A.locals?ModalErrorSubmission_module.A.locals:void 0;function ModalErrorSubmission({isOpen,onClose,description,onBackToForm}){return(0,jsx_runtime.jsx)(ModalComponent.z,{isOpen,close:onClose,"aria-labelledby":"error_title",children:(0,jsx_runtime.jsxs)(ModalComponent.z.Content,{className:ModaleErrorSubmission_ModalErrorSubmission_module.content,children:[(0,jsx_runtime.jsx)(ModalComponent.z.Title,{className:ModaleErrorSubmission_ModalErrorSubmission_module.title,id:"error_title",children:"Une erreur est survenue lors de l‘envoi du formulaire"}),description&&(0,jsx_runtime.jsx)("div",{className:ModaleErrorSubmission_ModalErrorSubmission_module.description,children:description}),(0,jsx_runtime.jsxs)("span",{className:ModaleErrorSubmission_ModalErrorSubmission_module.redirections,children:[(0,jsx_runtime.jsx)(ButtonComponent.Q,{appearance:"primary",onClick:onBackToForm,label:"Retour au formulaire"}),(0,jsx_runtime.jsxs)(Link.N,{appearance:"asSecondaryButton",href:"/",children:["Aller à l‘accueil",(0,jsx_runtime.jsx)(Link.N.Icon,{})]})]})]})})}ModalErrorSubmission.__docgenInfo={description:"",methods:[],displayName:"ModalErrorSubmission",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onBackToForm:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},description:{required:!1,tsType:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]},description:""}}}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ModalErrorSubmission_title__SNnAQ{font-weight:700}.ModalErrorSubmission_content__C_FA5{text-align:center;position:sticky;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center}.ModalErrorSubmission_title__SNnAQ{margin-left:auto;margin-right:auto;font-size:1.125rem;line-height:1.2}@media(min-width: 62em){.ModalErrorSubmission_title__SNnAQ{font-size:1.25rem}}.ModalErrorSubmission_description__aJKin{padding-right:1rem;padding-left:1rem;margin-top:1rem;color:#566bb1}.ModalErrorSubmission_redirections__KD0LX{margin-top:2.5rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem}","",{version:3,sources:["webpack://./src/styles/typography/_placeholders.scss","webpack://./src/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission.module.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AA2DA,mCACE,eAAA,CClDF,qCACE,iBAAA,CANA,eAAA,CACA,OAAA,CACA,0BAAA,CAMA,YAAA,CACA,qBAAA,CACA,kBAAA,CAGF,mCACE,gBAAA,CACA,iBAAA,CDEA,kBAAA,CACA,eAAA,CEjBE,wBDYJ,mCDQI,iBAAA,CAAA,CCDJ,yCACE,kBAAA,CACA,iBAAA,CACA,eAAA,CACA,aExBc,CF2BhB,0CACE,iBAAA,CACA,YAAA,CACA,cAAA,CACA,sBAAA,CACA,QAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium {\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "@styles/utilities";\n\n$description-color: utilities.$color-primary;\n\n@mixin center-verticaly {\n  position: sticky;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.content {\n  text-align: center;\n  @include center-verticaly;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.title {\n  margin-left: auto;\n  margin-right: auto;\n  @extend %bold;\n  @include utilities.title-small;\n}\n\n.description {\n  padding-right: 1rem;\n  padding-left: 1rem;\n  margin-top: 1rem;\n  color: $description-color;\n}\n\n.redirections {\n  margin-top: 2.5rem;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 1rem;\n}\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={title:"ModalErrorSubmission_title__SNnAQ",content:"ModalErrorSubmission_content__C_FA5",description:"ModalErrorSubmission_description__aJKin",redirections:"ModalErrorSubmission_redirections__KD0LX"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);