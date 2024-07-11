"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[5795],{"./src/client/components/ui/Card/Article/ArticleCard.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ArticleCard_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),ArticleCard_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Card/Article/ArticleCard.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(ArticleCard_module.A,options);const Article_ArticleCard_module=ArticleCard_module.A&&ArticleCard_module.A.locals?ArticleCard_module.A.locals:void 0;var Card=__webpack_require__("./src/client/components/ui/Card/Card.tsx");function ArticleCard({className,children,icon,imageSrc,link,titleLabel,titleHeadingTag,imageFit="cover",linkLabel="Lire l‘article"}){const iconComponent=(0,react.useRef)(icon||(0,jsx_runtime.jsx)(Icon.I,{name:"arrow-right"})),imageClassName=classnames_default()(Article_ArticleCard_module.illustration,"contain"===imageFit&&Article_ArticleCard_module.illustrationContain);return(0,jsx_runtime.jsx)(link_default(),{href:link,className:classnames_default()("underline-none",Article_ArticleCard_module.link),children:(0,jsx_runtime.jsxs)(Card.Z,{className:classnames_default()(className,Article_ArticleCard_module.card),layout:"vertical",children:[(0,jsx_runtime.jsx)(Card.Z.Image,{className:imageClassName,src:imageSrc,"aria-hidden":!0}),(0,jsx_runtime.jsxs)(Card.Z.Content,{className:Article_ArticleCard_module.content,children:[(0,jsx_runtime.jsx)(Card.Z.Title,{className:Article_ArticleCard_module.title,titleAs:titleHeadingTag,children:titleLabel}),children,(0,jsx_runtime.jsx)(Card.Z.FakeLink,{className:Article_ArticleCard_module.cta,appearance:"quaternary",icon:iconComponent.current,label:linkLabel})]})]})})}ArticleCard.__docgenInfo={description:"",methods:[],displayName:"ArticleCard",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},imageSrc:{required:!0,tsType:{name:"string"},description:""},link:{required:!0,tsType:{name:"string"},description:""},titleLabel:{required:!0,tsType:{name:"string"},description:""},titleHeadingTag:{required:!0,tsType:{name:"union",raw:"'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",elements:[{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"},{name:"literal",value:"'h5'"},{name:"literal",value:"'h6'"}]},description:""},imageFit:{required:!1,tsType:{name:"union",raw:"'cover' | 'contain'",elements:[{name:"literal",value:"'cover'"},{name:"literal",value:"'contain'"}]},description:"",defaultValue:{value:"'cover'",computed:!1}},linkLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Lire l‘article'",computed:!1}}}};const ArticleCard_stories={argTypes:{icon:{mapping:{"angle-left":(0,jsx_runtime.jsx)(Icon.I,{name:"angle-left"}),"angle-right":(0,jsx_runtime.jsx)(Icon.I,{name:"angle-right"}),"magnifying-glass":(0,jsx_runtime.jsx)(Icon.I,{name:"magnifying-glass"})},options:["magnifying-glass","angle-left","angle-right"]}},args:{children:"Découvrez un argument supplémentaire à avancer pour vous faire embaucher",imageFit:"cover",imageSrc:"/images/accompagnement.webp",link:"https://www.1jeune1solution.gouv.fr/articles/l-aide-a-l-apprentissage-l-atout-qu-il-faut-pour-vos-candidatures",linkLabel:"Voir plus",titleHeadingTag:"h2",titleLabel:"Une aide exceptionnelle pour l’apprentissage : l’atout qu’il vous faut pour vos candidatures !"},component:ArticleCard,title:"Components/Cards/ArticleCard"},Default={args:{}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}}},"./src/client/Errors/NoProviderError.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>NoProviderError});class NoProviderError extends Error{constructor(context){super("Context provider not found"+((null==context?void 0:context.displayName)?` for ${context.displayName}`:"")),this.name="NoProviderError"}}},"./src/client/components/ui/Button/ButtonComponent.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>ButtonComponent});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),button_component_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Button/button-component.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(button_component_module.A,options);const Button_button_component_module=button_component_module.A&&button_component_module.A.locals?button_component_module.A.locals:void 0,ButtonComponent=react.forwardRef((function ButtonComponent({appearance="primary",className,icon,iconPosition,label,...rest},ref){const appearanceClass=(0,react.useMemo)((()=>{switch(appearance){case"primary":return Button_button_component_module.buttonPrimary;case"secondary":return Button_button_component_module.buttonSecondary;case"tertiary":return Button_button_component_module.buttonTertiary;case"quaternary":return Button_button_component_module.buttonQuaternary}}),[appearance]),iconPositionClass=(0,react.useMemo)((()=>{switch(iconPosition){case"top":return Button_button_component_module.buttonWithTopIcon;case"left":return Button_button_component_module.buttonWithLeftIcon;case"right":return Button_button_component_module.buttonWithRightIcon}}),[iconPosition]),buttonStyles=(0,react.useMemo)((()=>classnames_default()(className,Button_button_component_module.button,appearanceClass,iconPositionClass)),[appearanceClass,className,iconPositionClass]),buttonBody=(0,react.useMemo)((()=>{switch(iconPosition){case"top":case"left":return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[icon,(0,jsx_runtime.jsx)("span",{className:Button_button_component_module.buttonLabel,children:label})]});case"right":return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("span",{className:Button_button_component_module.buttonLabel,children:label}),icon]});default:return(0,jsx_runtime.jsx)("span",{className:Button_button_component_module.buttonLabel,children:label})}}),[icon,iconPosition,label]);return(0,jsx_runtime.jsx)("button",{className:buttonStyles,ref,...rest,children:buttonBody})}));ButtonComponent.__docgenInfo={description:"",methods:[],displayName:"ButtonComponent",props:{appearance:{defaultValue:{value:"'primary'",computed:!1},required:!1}}}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Button/button-component.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".button-component_buttonPrimary__xIYLc,.button-component_buttonSecondary__R7ucL,.button-component_buttonTertiary__BQscI{padding:.5rem .75rem;font-size:.875rem;line-height:1.4}@media(min-width: 62em){.button-component_buttonPrimary__xIYLc,.button-component_buttonSecondary__R7ucL,.button-component_buttonTertiary__BQscI{font-size:1rem}}.button-component_buttonPrimary__xIYLc svg,.button-component_buttonSecondary__R7ucL svg,.button-component_buttonTertiary__BQscI svg{height:.875rem;width:.875rem}@media(min-width: 62em){.button-component_buttonPrimary__xIYLc,.button-component_buttonSecondary__R7ucL,.button-component_buttonTertiary__BQscI{padding:.75rem 1rem}.button-component_buttonPrimary__xIYLc svg,.button-component_buttonSecondary__R7ucL svg,.button-component_buttonTertiary__BQscI svg{height:1rem;width:1rem}}.button-component_button__vBKeN{border-radius:50px;outline-offset:4px}.button-component_button__vBKeN:disabled{border:1px solid #929292;background-color:#929292;color:#fff;cursor:not-allowed}.button-component_button__vBKeN>svg{vertical-align:middle}.button-component_button__vBKeN.button-component_buttonWithRightIcon__491cT .button-component_buttonLabel__RmqSl{margin-right:.5rem}.button-component_button__vBKeN.button-component_buttonWithLeftIcon__DiCLw .button-component_buttonLabel__RmqSl{margin-left:.5rem}.button-component_button__vBKeN.button-component_buttonWithTopIcon__6WRsm .button-component_buttonLabel__RmqSl{margin-top:.5rem;display:block}.button-component_buttonPrimary__xIYLc,.button-component_buttonSecondary__R7ucL,.button-component_buttonTertiary__BQscI{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}.button-component_buttonPrimary__xIYLc{border:1px solid #566bb1;background-color:#566bb1;color:#fff}.button-component_buttonPrimary__xIYLc:enabled:hover{background-color:#040085;border-color:#040085}.button-component_buttonSecondary__R7ucL{border:1px solid #566bb1;color:#566bb1;background-color:#fff}.button-component_buttonSecondary__R7ucL:enabled:hover{background-color:#ececff;border-color:#566bb1;color:#566bb1}.button-component_buttonTertiary__BQscI{border:1px solid #566bb1;color:#566bb1;background-color:#ececff}.button-component_buttonTertiary__BQscI:enabled:hover{background-color:#6e61e9;border-color:#6e61e9;color:#fff}.button-component_buttonQuaternary__oxgcs{color:#566bb1;border-radius:0;font-size:1rem}.button-component_buttonQuaternary__oxgcs:enabled:hover{text-decoration:underline;text-underline-offset:3px}","",{version:3,sources:["webpack://./src/styles/components/button/_placeholders.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Button/button-component.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAGA,wHACE,oBAAA,CC+CA,iBAAA,CACA,eAAA,CC9CE,wBFHJ,wHCoDI,cAAA,CAAA,CDjDF,oIACE,cAAA,CACA,aAAA,CEFA,wBFHJ,wHASI,mBAAA,CAEA,oIACE,WAAA,CACA,UAAA,CAAA,CGdN,gCACE,kBAAA,CACA,kBAAA,CAEA,yCACE,wBAAA,CACA,wBCgBW,CDfX,UCWI,CDVJ,kBAAA,CAGF,oCACE,qBAAA,CAIA,iHACE,kBAAA,CAKF,gHACE,iBAAA,CAKF,+GACE,gBAAA,CACA,aAAA,CAKN,wHACE,kBAAA,CACA,iBAAA,CACA,sBAAA,CAKF,uCACE,wBAAA,CACA,wBC1CU,CD2CV,UC5BM,CD8BN,qDACE,wBC5CS,CD6CT,oBC7CS,CDiDb,yCACE,wBAAA,CACA,aCrDU,CDsDV,qBCvCM,CDyCN,uDACE,wBCxCU,CDyCV,oBC1DQ,CD2DR,aC3DQ,CD+DZ,wCACE,wBAAA,CACA,aCjEU,CDkEV,wBCjDY,CDmDZ,sDACE,wBCpEa,CDqEb,oBCrEa,CDsEb,UCxDI,CD4DR,0CACE,aC5EU,CD6EV,eAAA,CACA,cAAA,CAEA,wDACE,yBAAA,CACA,yBAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/typography/placeholders";\n\n%button {\n  padding: 0.5rem 0.75rem;\n  @include placeholders.text-interactive-medium;\n  svg {\n    height: 0.875rem;\n    width: 0.875rem;\n  }\n\n  @include mixins.media(large) {\n    padding: 0.75rem 1rem;\n\n    svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium {\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n\n.button {\n  border-radius: 50px;\n  outline-offset: 4px;\n\n  &:disabled {\n    border: 1px solid utilities-deprecated.$color-on-disabled;\n    background-color: utilities-deprecated.$color-on-disabled;\n    color: utilities-deprecated.$color-disabled;\n    cursor: not-allowed;\n  }\n\n  > svg {\n    vertical-align: middle;\n  }\n\n  &.buttonWithRightIcon {\n    & .buttonLabel {\n      margin-right: 0.5rem;\n    }\n  }\n\n  &.buttonWithLeftIcon {\n    & .buttonLabel {\n      margin-left: 0.5rem;\n    }\n  }\n\n  &.buttonWithTopIcon {\n    & .buttonLabel {\n      margin-top: 0.5rem;\n      display: block;\n    }\n  }\n}\n\n.buttonPrimary, .buttonSecondary, .buttonTertiary{\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  @extend %button;\n}\n\n\n.buttonPrimary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-on-primary;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-primary-on-hover;\n    border-color: utilities-deprecated.$color-primary-on-hover;\n  }\n}\n\n.buttonSecondary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$white;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-background-white-titan;\n    border-color: utilities-deprecated.$color-primary;\n    color: utilities-deprecated.$color-primary;\n  }\n}\n\n.buttonTertiary {\n  border: 1px solid utilities-deprecated.$color-primary;\n  color: utilities-deprecated.$color-primary;\n  background-color: utilities-deprecated.$color-background-white-titan;\n\n  &:enabled:hover {\n    background-color: utilities-deprecated.$color-tertiary-on-hover;\n    border-color: utilities-deprecated.$color-tertiary-on-hover;\n    color: utilities-deprecated.$white;\n  }\n}\n\n.buttonQuaternary {\n  color: utilities-deprecated.$color-primary;\n  border-radius: 0;\n  font-size: 1rem;\n\n  &:enabled:hover {\n    text-decoration: underline;\n    text-underline-offset: 3px;\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={buttonPrimary:"button-component_buttonPrimary__xIYLc",buttonSecondary:"button-component_buttonSecondary__R7ucL",buttonTertiary:"button-component_buttonTertiary__BQscI",button:"button-component_button__vBKeN",buttonWithRightIcon:"button-component_buttonWithRightIcon__491cT",buttonLabel:"button-component_buttonLabel__RmqSl",buttonWithLeftIcon:"button-component_buttonWithLeftIcon__DiCLw",buttonWithTopIcon:"button-component_buttonWithTopIcon__6WRsm",buttonQuaternary:"button-component_buttonQuaternary__oxgcs"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Card/Article/ArticleCard.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ArticleCard_articleList__hAKxB{max-width:82em;margin:0 auto}.ArticleCard_content__Av_vg{font-size:.875rem;line-height:1.5rem}@media(min-width: 62em){.ArticleCard_content__Av_vg{font-size:1rem}}.ArticleCard_title__qApbj{font-size:1rem;line-height:1.5rem}@media(min-width: 62em){.ArticleCard_title__qApbj{font-size:1.125rem}}.ArticleCard_articleList__hAKxB{padding:1rem;list-style:none}.ArticleCard_articleList__hAKxB>li{padding-block:1rem}.ArticleCard_articleListWrapper__lyn49{background-color:#f6f7fb}@media(min-width: 82em){.ArticleCard_articleList__hAKxB{margin:auto;padding-inline:0}}.ArticleCard_illustration__0sHgP{height:180px}.ArticleCard_illustration__0sHgP img{object-fit:cover}.ArticleCard_illustrationContain__irK4Y img{object-fit:contain}.ArticleCard_content__Av_vg{padding-block:1.25rem;padding-inline:1.5rem;display:flex;flex:1;flex-direction:column}.ArticleCard_title__qApbj{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:calc(2*1.5*1em);overflow:hidden;margin-bottom:.5rem}.ArticleCard_cta__Pvzy_{margin-top:1.25rem;align-self:flex-end}@media(min-width: 62em){.ArticleCard_cta__Pvzy_{margin-top:1rem}}.ArticleCard_link__WTDwO{display:inline-block;width:100%}","",{version:3,sources:["webpack://./src/styles/media/_placeholders.scss","webpack://./src/styles/typography/_placeholders-deprecated.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Card/Article/ArticleCard.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss","webpack://./src/styles/typography/_mixins.scss"],names:[],mappings:"AAEA,gCACE,cAAA,CACA,aAAA,CCDF,4BACE,iBAAA,CACA,kBAAA,CCCE,wBDHJ,4BAKI,cAAA,CAAA,CAIJ,0BACE,cAAA,CACA,kBAAA,CCRE,wBDMJ,0BAKI,kBAAA,CAAA,CEfJ,gCAEE,YAAA,CACA,eAAA,CAEA,mCACE,kBAAA,CAGF,uCACE,wBCSU,CFbV,wBCNJ,gCAcI,WAAA,CACA,gBAAA,CAAA,CAKJ,iCACE,YAAA,CAEA,qCACE,gBAAA,CAIA,4CACE,kBAAA,CAKN,4BAEE,qBAAA,CACA,qBAAA,CACA,YAAA,CACA,MAAA,CACA,qBAAA,CAGF,0BE/BE,mBAAA,CACA,oBFgCyC,CE/BzC,2BAAA,CACA,0BAAA,CACA,eAAA,CF8BA,mBAAA,CAGF,wBACE,kBAAA,CACA,mBAAA,CD/CE,wBC6CJ,wBAKI,eAAA,CAAA,CAIJ,yBACE,oBAAA,CACA,UAAA",sourcesContent:['@use "variables";\n\n%max-container {\n  max-width: variables.$breakpoint-xl;\n  margin: 0 auto;\n}','@use "@styles/media/mixins";\n@use "@styles/theme/variables-deprecated.scss";\n\n%text-regular {\n  font-size: .875rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%text-medium {\n  font-size: 1rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1.125rem;\n  }\n}\n\n%text-xLarge {\n  font-size: 1.5rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n%text-large {\n  font-size: 1.125rem;\n  line-height: 1.8rem;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n    line-height: 2rem;\n  }\n}\n\n%text-small {\n  font-size: .75rem;\n  line-height: 1.25rem;\n\n  @include mixins.media(large) {\n    font-size: .875rem;\n    line-height: 1.5rem;\n  }\n}\n\n%headline {\n  font-size: 1.25rem;\n  line-height: 2rem;\n  color: variables-deprecated.$color-primary;\n\n  @include mixins.media(large) {\n    font-size: 2rem;\n    line-height: 3rem;\n  }\n}\n\n%subheading {\n  font-size: 1.25rem;\n  line-height: 2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities-deprecated";\n\n.articleList {\n  @extend %max-container;\n  padding: 1rem;\n  list-style: none;\n\n  & > li {\n    padding-block: 1rem;\n  }\n\n  &Wrapper {\n    background-color: utilities-deprecated.$color-background-white-lilac;\n  }\n\n  @include utilities-deprecated.media(xlarge) {\n    margin: auto;\n    padding-inline: 0;\n  }\n}\n\n\n.illustration {\n  height: 180px;\n\n  img {\n    object-fit: cover;\n  }\n\n  &Contain {\n    img {\n      object-fit: contain;\n    }\n  }\n}\n\n.content {\n  @extend %text-regular;\n  padding-block: 1.25rem;\n  padding-inline: 1.5rem;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n}\n\n.title {\n  @extend %text-medium;\n  @include utilities-deprecated.line-clamp(2);\n  margin-bottom: 0.5rem;\n}\n\n.cta {\n  margin-top: 1.25rem;\n  align-self: flex-end;\n\n  @include utilities-deprecated.media(large) {\n    margin-top: 1rem;\n  }\n}\n\n.link {\n  display: inline-block;\n  width: 100%;\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n',"@use \"variables\";\n\n@mixin font-face($name, $filename, $font-weight: 400, $font-style: normal, $font-display: swap) {\n  @font-face {\n    font-family: #{$name};\n    src: url('#{variables.$font-directory}/#{$filename}.woff2') format('woff2'),\n    url('#{variables.$font-directory}/#{$filename}.woff') format('woff');\n    font-weight: #{$font-weight};\n    font-style: #{$font-style};\n    font-display: #{$font-display};\n  }\n}\n\n@mixin line-clamp($lines, $lineHeight: 1.5) {\n  display: -webkit-box;\n  -webkit-line-clamp: $lines;\n  -webkit-box-orient: vertical;\n  min-height: calc(#{$lines} * #{$lineHeight} * 1em);\n  overflow: hidden;\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={articleList:"ArticleCard_articleList__hAKxB",content:"ArticleCard_content__Av_vg",title:"ArticleCard_title__qApbj",articleListWrapper:"ArticleCard_articleListWrapper__lyn49",illustration:"ArticleCard_illustration__0sHgP",illustrationContain:"ArticleCard_illustrationContain__irK4Y",cta:"ArticleCard_cta__Pvzy_",link:"ArticleCard_link__WTDwO"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);