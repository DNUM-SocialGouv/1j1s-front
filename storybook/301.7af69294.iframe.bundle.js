(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[301],{"./src/client/components/ui/Form/Select/SelectContext.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{C:()=>SelectContext,h:()=>useSelectContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_client_Errors_NoProviderError__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/client/Errors/NoProviderError.ts");const SelectContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function useSelectContext(){const selectContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SelectContext);if(null==selectContext)throw new _client_Errors_NoProviderError__WEBPACK_IMPORTED_MODULE_1__.A(SelectContext);return selectContext}},"./src/client/components/ui/Form/Select/SelectOption/SelectOption.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{O:()=>SelectOption});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_Select_module_scss__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/client/components/ui/Form/Select/Select.module.scss"),_SelectContext__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/client/components/ui/Form/Select/SelectContext.tsx");function SelectOption({className,value:valueProps,id:idProps,...rest}){const value=valueProps.toString(),defaultId=(0,react__WEBPACK_IMPORTED_MODULE_2__.useId)(),id=null!=idProps?idProps:defaultId,{onOptionSelection,activeDescendant,isCurrentItemSelected}=(0,_SelectContext__WEBPACK_IMPORTED_MODULE_4__.h)(),onMouseDown=(0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((function preventBlurOnOptionSelection(event){event.preventDefault()}),[]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li",{className:classnames__WEBPACK_IMPORTED_MODULE_1___default()(className,{[_Select_module_scss__WEBPACK_IMPORTED_MODULE_3__.A.optionVisuallyFocus]:activeDescendant===id}),id,role:"option",onMouseDown,"data-value":value.toString(),onClick:()=>onOptionSelection(id),"aria-selected":isCurrentItemSelected(value),...rest})}SelectOption.__docgenInfo={description:"",methods:[],displayName:"SelectOption",props:{value:{required:!0,tsType:{name:"signature",type:"object",raw:"{ toString: () => string }",signature:{properties:[{key:"toString",value:{name:"signature",type:"function",raw:"() => string",signature:{arguments:[],return:{name:"string"}},required:!0}}]}},description:""}}}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/Select/Select.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".Select_container__t1jqF [role=combobox]{outline-color:#566bb1;outline-offset:0;outline-width:2px}.Select_container__t1jqF [role=combobox]:focus{outline-style:solid}@supports selector(&:focus-visible){.Select_container__t1jqF [role=combobox]:focus{outline-style:revert}.Select_container__t1jqF [role=combobox]:focus-visible{outline-style:solid}}.Select_container__t1jqF [role=combobox]:focus-within:not(:focus){outline-style:solid}.Select_radioButton__wvo8R .Select_label__E0FK9,.Select_checkbox__CqXdi label{font-size:1rem;line-height:1.2}@media(min-width: 62em){.Select_radioButton__wvo8R .Select_label__E0FK9,.Select_checkbox__CqXdi label{font-size:1.125rem;line-height:1.2}}.Select_container__t1jqF [role=combobox]:disabled,.Select_container__t1jqF [role=combobox]:not(button):read-only{color:#666;background-color:#f6f7fb;cursor:not-allowed}.Select_container__t1jqF [role=combobox]{border-radius:1.25rem;border:1px solid #929292;padding:.5rem 1rem}.Select_container__t1jqF input:invalid+[role=combobox][data-touched=true],.Select_container__t1jqF [data-touched=true][role=combobox]:invalid{border-color:#ce0500;border-width:2px}.Select_container__t1jqF input:valid+[role=combobox],.Select_container__t1jqF [role=combobox]:not([data-touched=true]),.Select_container__t1jqF [role=combobox]:valid{margin:1px}.Select_container__t1jqF [role=combobox]{color:#161616;background-color:rgba(0,0,0,0);font-size:.875rem;line-height:1.4}@media(min-width: 62em){.Select_container__t1jqF [role=combobox]{font-size:1rem}}.Select_container__t1jqF{font-size:.875rem;line-height:1.4;position:relative}@media(min-width: 62em){.Select_container__t1jqF{font-size:1rem}}.Select_container__t1jqF [role=listbox]{z-index:1;position:absolute;top:100%;width:100%;margin-top:2px}.Select_container__t1jqF [role=listbox]{border:1px solid #929292;border-radius:1.25rem;background-color:#fff}.Select_container__t1jqF [role=listbox]{max-height:10em;overflow-y:scroll}.Select_container__t1jqF [role=option]{padding:.5rem 1ch}.Select_container__t1jqF [role=option]{cursor:pointer}.Select_container__t1jqF [role=option]:hover,.Select_container__t1jqF [role=option].Select_optionVisuallyFocus__uW2zT{background-color:#f6f7fb;font-weight:bold}.Select_container__t1jqF li[role=none]:has([role=group]){font-weight:bold}.Select_container__t1jqF li[role=none]:has([role=group])>*{font-weight:initial}.Select_container__t1jqF [role=combobox]>svg{transition:transform 200ms linear}.Select_container__t1jqF [role=combobox][aria-expanded=true]>svg{transform:rotate(-180deg)}.Select_container__t1jqF ul[role=listbox][aria-multiselectable=true] [role=option]::before,.Select_checkbox__CqXdi input[type=checkbox]+label::before{content:\"\";width:1rem;aspect-ratio:1;background-size:1rem;background-position:center;background-repeat:no-repeat;border-radius:.25rem;box-shadow:inset 0 0 0 1px #161616}.Select_container__t1jqF ul[role=listbox][aria-multiselectable=true] [role=option][aria-selected=true]::before,.Select_checkbox__CqXdi input[type=checkbox]:checked+label::before{background-color:#566bb1;background-image:url(\"data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23fff' d='M10 15.17l9.2-9.2 1.4 1.42L10 18l-6.36-6.36 1.4-1.42z'/></svg>\")}.Select_checkbox__CqXdi{position:relative}.Select_checkbox__CqXdi label{display:block;color:#161616}.Select_checkbox__CqXdi input[type=checkbox]{position:absolute;margin:0;opacity:0;top:50%;transform:translateY(-50%)}.Select_checkbox__CqXdi input[type=checkbox]:focus+label:before{outline:2px solid #566bb1;outline-offset:2px}.Select_checkbox__CqXdi input[type=checkbox]+label{position:relative;padding:.75rem 0 .75rem 2rem;-webkit-tap-highlight-color:rgba(0,0,0,0);display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap}.Select_checkbox__CqXdi input[type=checkbox]+label::before{display:block;position:absolute;top:50%;transform:translateY(-50%);left:.5rem}.Select_container__t1jqF ul[role=listbox]:not([aria-multiselectable=true]) [role=option]::before,.Select_radioButton__wvo8R input[type=radio]+label::before{content:\"\";width:1rem;aspect-ratio:1;border-radius:50%;box-shadow:inset 0 0 0 1px #161616}.Select_container__t1jqF ul[role=listbox]:not([aria-multiselectable=true]) [role=option][aria-selected=true]::before,.Select_radioButton__wvo8R input[type=radio]:checked+label::before{background-color:#566bb1;box-shadow:inset 0 0 0 1px #161616,inset 0 0 0 4px #fff,inset 0 0 0 10px #566bb1}.Select_radioButton__wvo8R{position:relative}.Select_radioButton__wvo8R .Select_label__E0FK9{display:block;color:#161616}.Select_radioButton__wvo8R input[type=radio]{position:absolute;opacity:0;top:50%;transform:translateY(-50%)}.Select_radioButton__wvo8R input[type=radio]:focus+label::before{outline:2px solid #566bb1;outline-offset:2px}.Select_radioButton__wvo8R input[type=radio]+label{position:relative;padding:.75rem 0 .75rem 2rem;-webkit-tap-highlight-color:rgba(0,0,0,0);display:flex;flex-direction:row;align-items:center;justify-content:flex-start;flex-wrap:wrap}.Select_radioButton__wvo8R input[type=radio]+label::before{display:block;position:absolute;top:50%;transform:translateY(-50%);left:.5rem}.Select_container__t1jqF [role=combobox]{width:100%;text-align:left;cursor:pointer;font-size:inherit;line-height:inherit;display:grid;grid-template-columns:1fr auto}.Select_container__t1jqF ul[role=listbox] [role=option]{display:grid;grid-template-columns:auto 1fr;gap:.5rem;align-items:center}.Select_container__t1jqF input[aria-hidden=true]{position:absolute;pointer-events:none;opacity:0;inset:0}","",{version:3,sources:["webpack://./src/styles/theme/_placeholders.scss","webpack://./src/styles/theme/_variables-deprecated.scss","webpack://./src/styles/components/form/_variables.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/media/_mixins.scss","webpack://./src/client/components/ui/Form/TextboxShared.module.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/client/components/ui/Checkbox/Checkbox.module.scss","webpack://./src/client/components/ui/Radio/Radio.module.scss","webpack://./src/client/components/ui/Form/Select/Select.module.scss"],names:[],mappings:"AA0BA,yCACE,qBCtBU,CDuBV,gBAAA,CACA,iBAAA,CAEA,+CACE,mBAAA,CAGF,oCACE,+CACE,oBAAA,CAEF,uDACE,mBAAA,CAAA,CAIJ,kEACE,mBAAA,CEhCJ,8ECuBE,cAAA,CACA,eAAA,CC/BE,wBFOJ,8ECkBE,kBAAA,CACA,eAAA,CAAA,CEpBF,iHACE,UC0BqB,CDzBrB,wBCSqC,CDRrC,kBAAA,CAGF,yCACE,qBAXc,CAYd,wBAAA,CACA,kBAAA,CAGF,8IACE,oBCbY,CDcZ,gBAnBmB,CAqBrB,sKACE,UAnB0B,CAsB5B,yCACE,aCGmB,CDFnB,8BAAA,CFiBA,iBAAA,CACA,eAAA,CC9CE,wBC0BJ,yCFuBI,cAAA,CAAA,CEHJ,yBFDE,iBAAA,CACA,eAAA,CESA,iBAAA,CDvDE,wBC8CJ,yBFGI,cAAA,CAAA,CEOF,wCACE,SAAA,CACA,iBAAA,CACA,QAAA,CACA,UAAA,CACA,cAAA,CAGF,wCACE,wBAAA,CACA,qBAhEY,CAiEZ,qBCnDuB,CDsDzB,wCACE,eAAA,CACA,iBAAA,CAGF,uCACE,iBAAA,CAEF,uCACE,cAAA,CAGF,sHACE,wBClEmC,CDmEnC,gBAAA,CAGF,yDACE,gBAAA,CACA,2DACE,mBAAA,CAIJ,6CACE,iCAAA,CAEF,iEACE,yBAAA,CEjGJ,sJACE,UAAA,CACA,UALe,CAMf,cAAA,CACA,oBAAA,CACA,0BAAA,CACA,2BAAA,CACA,oBAAA,CACA,kCAAA,CAGF,kLACE,wBNdU,CMeV,yMAAA,CAGF,wBACE,iBAAA,CAEA,8BACE,aAAA,CACA,aNFI,CMMN,6CACE,iBAAA,CACA,QAAA,CACA,SAAA,CACA,OAAA,CACA,0BAAA,CAEA,gEACE,yBAAA,CACA,kBAAA,CAIJ,mDACE,iBAAA,CACA,4BAAA,CACA,yCAAA,CACA,YAAA,CACA,kBAAA,CACA,kBAAA,CACA,0BAAA,CACA,cAAA,CAGF,2DAEE,aAAA,CACA,iBAAA,CACA,OAAA,CACA,0BAAA,CACA,UAzDe,CCEnB,4JACE,UAAA,CACA,UALY,CAMZ,cAAA,CACA,iBAAA,CACA,kCAAA,CAGF,wLACE,wBPXU,COYV,gFAAA,CAGF,2BACE,iBAAA,CAEA,gDACE,aAAA,CACA,aPCI,COGN,6CACE,iBAAA,CACA,SAAA,CACA,OAAA,CACA,0BAAA,CAEA,iEACE,yBAAA,CACA,kBAAA,CAIJ,mDACE,iBAAA,CAEA,4BAAA,CACA,yCAAA,CACA,YAAA,CACA,kBAAA,CACA,kBAAA,CACA,0BAAA,CACA,cAAA,CAGF,2DACE,aAAA,CACA,iBAAA,CACA,OAAA,CACA,0BAAA,CACA,UArDY,CCKd,yCACE,UAAA,CACA,eAAA,CACA,cAAA,CAEA,iBAAA,CACA,mBAAA,CACA,YAAA,CAEA,8BAAA,CAuBA,wDACE,YAAA,CACA,8BAAA,CACA,SAAA,CACA,kBAAA,CAqBJ,iDACE,iBAAA,CACA,mBAAA,CACA,SAAA,CACA,OAAA",sourcesContent:['@use "variables-deprecated";\n\n%background-surface {\n  background: variables-deprecated.$color-surface;\n  color: variables-deprecated.$color-on-surface;\n}\n\n%background-primary {\n  background: variables-deprecated.$color-primary;\n  color: variables-deprecated.$color-on-primary;\n}\n\n%background-secondary {\n  background: variables-deprecated.$color-secondary;\n  color: variables-deprecated.$color-on-secondary;\n}\n\n%background-tertiary {\n  background: variables-deprecated.$color-background;\n  color: variables-deprecated.$color-on-background;\n}\n\n%box-shadow {\n  box-shadow: variables-deprecated.$box-shadow;\n}\n\n%outlined {\n  outline-color: variables-deprecated.$color-focus-outline;\n  outline-offset: 0;\n  outline-width: 2px;\n\n  &:focus {\n    outline-style: solid;\n  }\n\n  @supports selector(&:focus-visible) {\n    &:focus {\n      outline-style: revert;\n    }\n    &:focus-visible {\n      outline-style: solid;\n    }\n  }\n\n  &:focus-within:not(:focus) {\n    outline-style: solid;\n  }\n}\n%no-outline {\n  &:focus-visible,\n  &:focus-within {\n    outline-style: none;\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n','@use "@styles/media/mixins";\n@use "@styles/typography/placeholders";\n@use "@styles/utilities";\n\n$form-horizontal-gap: 1.5rem;\n\n$form-vertical-gap-mobile: 1rem;\n$form-vertical-gap-desktop: 1.5rem;\n\n$form-submit-button-vertical-gap-mobile: 3rem;\n\n\n\n%label-champ{\n  @include placeholders.text-medium;\n\n  @include mixins.media(large) {\n    @include placeholders.text-large\n  }\n}\n\n%buttonRechercher {\n  margin-top: $form-submit-button-vertical-gap-mobile;\n\n  @include utilities.media(medium) {\n    display: grid;\n    align-items: center;\n    grid-template-columns: 1fr auto 1fr;\n    grid-gap: 2rem;\n    margin-top: utilities.pixel-to-rem(28);\n\n    &::before,\n    &::after {\n      content: \'\';\n      border-top: 1px solid utilities.$color-background-border;\n    }\n  }\n\n  > button {\n    width: 100%;\n  }\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium {\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}','@use "@styles/utilities";\n\n$color-text: utilities.$color-text-primary;\n$color-border: utilities.$color-background-border;\n$color-text-disabled: utilities.$color-text-secondary;\n$color-background-disabled: utilities.$color-background-primary-alternative;\n$color-error: utilities.$color-error;\n$error-border-width: 2px;\n$border-radius: 1.25rem;\n$border-width: 1px;\n$border-width-compensation: calc($error-border-width - $border-width);\n\n%disabled {\n  color: $color-text-disabled;\n  background-color: $color-background-disabled;\n  cursor: not-allowed;\n}\n\n%bordered {\n  border-radius: $border-radius;\n  border: $border-width solid $color-border;\n  padding: 0.5rem 1rem;\n}\n\n%error {\n  border-color: $color-error;\n  border-width: $error-border-width;\n}\n%border-no-error {\n  margin: $border-width-compensation;\n}\n\n%input {\n  color: $color-text;\n  background-color: transparent;\n  @extend %bordered;\n  @include utilities.text-interactive-medium;\n\n  &:disabled,\n  &:not(button):read-only {\n    @extend %disabled;\n  }\n\n  &[data-touched="true"]:invalid {\n    @extend %error;\n  }\n  &:valid,\n  &:not([data-touched="true"]) {\n    @extend %border-no-error;\n  }\n}\n\n%comboboxes {\n  $color-list-border: $color-border;\n  $color-list-background: utilities.$color-background-primary;\n  $color-option-hover: utilities.$color-background-primary-alternative;\n  @include utilities.text-interactive-medium;\n  & [role="combobox"] {\n    @extend %input;\n  }\n\n  position: relative;\n  & [role="listbox"] {\n    z-index: 1;\n    position: absolute;\n    top: 100%;\n    width: 100%;\n    margin-top: 2px;\n  }\n\n  & [role="listbox"] {\n    border: 1px solid $color-list-border;\n    border-radius: $border-radius;\n    background-color: $color-list-background;\n  }\n\n  & [role="listbox"] {\n    max-height: 10em;\n    overflow-y: scroll;\n  }\n\n  & [role="option"] {\n    padding: .5rem 1ch;\n  }\n  & [role="option"] {\n    cursor: pointer;\n  }\n\n  %hovered-option {\n    background-color: $color-option-hover;\n    font-weight: bold;\n  }\n\n  & li[role="none"]:has([role="group"]) {\n    font-weight: bold;\n    & > * {\n      font-weight: initial;\n    }\n  }\n\n  %chevron {\n    transition: transform 200ms linear;\n  }\n  %chevron-expanded {\n    transform: rotate(-180deg);\n  }\n}\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n','@use "@styles/utilities-deprecated";\n@use "@styles/utilities";\n@use "@styles/components/form/variables";\n\n$checkbox-width: 1rem;\n$checkbox-padding: .5rem;\n\n%checkbox {\n  content: "";\n  width: $checkbox-width;\n  aspect-ratio: 1;\n  background-size: 1rem;\n  background-position: center;\n  background-repeat: no-repeat;\n  border-radius: 0.25rem;\n  box-shadow: inset 0 0 0 1px utilities-deprecated.$color-on-surface;\n}\n\n%checkbox-checked {\n  background-color: utilities-deprecated.$color-primary;\n  background-image: url("data:image/svg+xml;charset=utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path fill=\'%23fff\' d=\'M10 15.17l9.2-9.2 1.4 1.42L10 18l-6.36-6.36 1.4-1.42z\'/></svg>");\n}\n\n.checkbox {\n  position: relative;\n\n  label {\n    display: block;\n    color: utilities-deprecated.$color-on-surface;\n    @extend %label-champ;\n  }\n\n  input[type=checkbox] {\n    position: absolute;\n    margin: 0;\n    opacity: 0;\n    top: 50%;\n    transform: translateY(-50%);\n\n    &:focus + label:before {\n      outline: 2px solid utilities-deprecated.$color-primary;\n      outline-offset: 2px;\n    }\n  }\n\n  input[type=checkbox] + label {\n    position: relative;\n    padding: 0.75rem 0 0.75rem calc($checkbox-width + 2 * $checkbox-padding);\n    -webkit-tap-highlight-color: transparent;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  input[type=checkbox] + label::before {\n    @extend %checkbox;\n    display: block;\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    left: $checkbox-padding;\n  }\n\n  input[type=checkbox]:checked + label::before {\n    @extend %checkbox-checked;\n  }\n}\n','@use "@styles/utilities-deprecated";\n@use "@styles/utilities";\n@use "@styles/components/form/variables";\n\n$radio-width: 1rem;\n$radio-padding: .5rem;\n\n%radio {\n  content: "";\n  width: $radio-width;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 1px utilities-deprecated.$color-on-surface;\n}\n\n%radio-checked {\n  background-color: utilities-deprecated.$color-primary;\n  box-shadow: inset 0 0 0 1px utilities-deprecated.$color-on-surface, inset 0 0 0 4px #fff, inset 0 0 0 10px utilities-deprecated.$color-primary;\n}\n\n.radioButton {\n  position: relative;\n\n  .label {\n    display: block;\n    color: utilities-deprecated.$color-on-surface;\n    @extend %label-champ;\n  }\n\n  input[type=radio] {\n    position: absolute;\n    opacity: 0;\n    top: 50%;\n    transform: translateY(-50%);\n\n    &:focus + label::before {\n      outline: 2px solid utilities.$color-primary;\n      outline-offset: 2px;\n    }\n  }\n\n  input[type=radio] + label {\n    position: relative;\n    // FIXME (GAFI 06-09-2024): Probablement moyen de faire beaucoup mieux avec du grid\n    padding: 0.75rem 0 0.75rem calc($radio-width + 2 * $radio-padding);\n    -webkit-tap-highlight-color: transparent;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  input[type=radio] + label::before {\n    display: block;\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    left: $radio-padding;\n    @extend %radio\n  }\n\n  input[type=radio]:checked + label::before {\n    @extend %radio-checked;\n  }\n}\n','@use "@styles/utilities";\n@use "@styles/utilities-deprecated";\n@use "@styles/components/form/variables";\n@use "../TextboxShared.module" as inputStyles;\n@use "src/client/components/ui/Checkbox/Checkbox.module";\n@use "src/client/components/ui/Radio/Radio.module";\n\n.container {\n  @extend %comboboxes;\n\n  & [role="combobox"] {\n    width: 100%;\n    text-align: left;\n    cursor: pointer;\n    @extend %outlined;\n    font-size: inherit;\n    line-height: inherit;\n    display: grid;\n\n    grid-template-columns: 1fr auto;\n    & > svg {\n      @extend %chevron;\n    }\n    &[aria-expanded="true"] > svg {\n      @extend %chevron-expanded;\n    }\n  }\n\n  input:valid + [role="combobox"],\n  [role="combobox"]:not([data-touched="true"]) {\n    @extend %border-no-error;\n  }\n  input:invalid + [role="combobox"][data-touched="true"] {\n    @extend %error;\n  }\n\n  [role="option"]:hover,\n  [role="option"].optionVisuallyFocus {\n    @extend %hovered-option;\n  }\n\n  ul[role="listbox"] {\n    [role="option"] {\n      display: grid;\n      grid-template-columns: auto 1fr;\n      gap: .5rem;\n      align-items: center;\n    }\n\n    &:not([aria-multiselectable="true"]) {\n      [role="option"]::before {\n        @extend %radio;\n      }\n      [role="option"][aria-selected="true"]::before {\n        @extend %radio-checked;\n      }\n    }\n    &[aria-multiselectable="true"] {\n      [role="option"]::before {\n        @extend %checkbox;\n      }\n      [role="option"][aria-selected="true"]::before {\n        @extend %checkbox-checked;\n      }\n    }\n  }\n\n  & input[aria-hidden="true"] {\n    position: absolute;\n    pointer-events: none;\n    opacity: 0;\n    inset: 0;\n  }\n}\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={container:"Select_container__t1jqF",radioButton:"Select_radioButton__wvo8R",label:"Select_label__E0FK9",checkbox:"Select_checkbox__CqXdi",optionVisuallyFocus:"Select_optionVisuallyFocus__uW2zT"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/lodash.debounce/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var NAN=NaN,symbolTag="[object Symbol]",reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt,freeGlobal="object"==typeof __webpack_require__.g&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")(),objectToString=Object.prototype.toString,nativeMax=Math.max,nativeMin=Math.min,now=function(){return root.Date.now()};function isObject(value){var type=typeof value;return!!value&&("object"==type||"function"==type)}function toNumber(value){if("number"==typeof value)return value;if(function isSymbol(value){return"symbol"==typeof value||function isObjectLike(value){return!!value&&"object"==typeof value}(value)&&objectToString.call(value)==symbolTag}(value))return NAN;if(isObject(value)){var other="function"==typeof value.valueOf?value.valueOf():value;value=isObject(other)?other+"":other}if("string"!=typeof value)return 0===value?value:+value;value=value.replace(reTrim,"");var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value}module.exports=function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=!1,maxing=!1,trailing=!0;if("function"!=typeof func)throw new TypeError("Expected a function");function invokeFunc(time){var args=lastArgs,thisArg=lastThis;return lastArgs=lastThis=void 0,lastInvokeTime=time,result=func.apply(thisArg,args)}function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime;return void 0===lastCallTime||timeSinceLastCall>=wait||timeSinceLastCall<0||maxing&&time-lastInvokeTime>=maxWait}function timerExpired(){var time=now();if(shouldInvoke(time))return trailingEdge(time);timerId=setTimeout(timerExpired,function remainingWait(time){var result=wait-(time-lastCallTime);return maxing?nativeMin(result,maxWait-(time-lastInvokeTime)):result}(time))}function trailingEdge(time){return timerId=void 0,trailing&&lastArgs?invokeFunc(time):(lastArgs=lastThis=void 0,result)}function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(void 0===timerId)return function leadingEdge(time){return lastInvokeTime=time,timerId=setTimeout(timerExpired,wait),leading?invokeFunc(time):result}(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return void 0===timerId&&(timerId=setTimeout(timerExpired,wait)),result}return wait=toNumber(wait)||0,isObject(options)&&(leading=!!options.leading,maxWait=(maxing="maxWait"in options)?nativeMax(toNumber(options.maxWait)||0,wait):maxWait,trailing="trailing"in options?!!options.trailing:trailing),debounced.cancel=function cancel(){void 0!==timerId&&clearTimeout(timerId),lastInvokeTime=0,lastArgs=lastCallTime=lastThis=timerId=void 0},debounced.flush=function flush(){return void 0===timerId?result:trailingEdge(now())},debounced}},"./src/client/components/ui/Form/Select/Select.module.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__),_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__),_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__),_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__),_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__),_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_14_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_4_Select_module_scss__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/Select/Select.module.scss"),options={};options.styleTagTransform=_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(),options.setAttributes=_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(),options.insert=_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null,"head"),options.domAPI=_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(),options.insertStyleElement=_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_14_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_4_Select_module_scss__WEBPACK_IMPORTED_MODULE_6__.A,options);const __WEBPACK_DEFAULT_EXPORT__=_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_14_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_4_Select_module_scss__WEBPACK_IMPORTED_MODULE_6__.A&&_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_14_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_4_Select_module_scss__WEBPACK_IMPORTED_MODULE_6__.A.locals?_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_14_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_4_Select_module_scss__WEBPACK_IMPORTED_MODULE_6__.A.locals:void 0}}]);