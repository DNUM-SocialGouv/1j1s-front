/*! For license information please see client-components-ui-Tag-Tag-mdx.90a1a321.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[5470],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty});var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");function _defineProperty(obj,key,value){return(key=(0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__.Z)(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties})},"./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_toPropertyKey});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}},"./node_modules/@babel/runtime/helpers/esm/typeof.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}__webpack_require__.d(__webpack_exports__,{Z:()=>_typeof})},"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./src/client/components/ui/Tag/Tag.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_Tag_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/client/components/ui/Tag/Tag.stories.tsx"),_client_components_ui_Icon_Icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),_client_components_ui_Tag_Tag__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/client/components/ui/Tag/Tag.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",pre:"pre",code:"code"},(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.h_,{of:_Tag_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"definition",children:"Definition"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Le tag utilisé sur 1jeune1solution :"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.Xz,{layout:"centered",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_client_components_ui_Tag_Tag__WEBPACK_IMPORTED_MODULE_4__.V,{children:"Je suis un tag"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"variante-cliquable",children:"Variante cliquable"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Le tag a été conçu pour pouvoir être transformé en bouton avec icon, le svg est alors automatiquement centré / aligné avec le texte"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.Xz,{layout:"centered",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_client_components_ui_Tag_Tag__WEBPACK_IMPORTED_MODULE_4__.V,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("button",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:"Je suis un tag cliquable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_client_components_ui_Icon_Icon__WEBPACK_IMPORTED_MODULE_3__.J,{name:"close"})]})})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Pour cela on peut utiliser le code :"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-jsx",children:'<Tag>\n    <button>\n        je suis un tag cliquable\n        <Icon name="close" />\n    </button>\n</Tag>\n'})})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"./src/client/components/ui/Tag/Tag.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Example$parameters,_Example$parameters2,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/Tag/Tag.tsx").V,title:"Components/Tags/Tag"};var Example={args:{children:"Ceci est un tag"}};Example.parameters=_objectSpread(_objectSpread({},Example.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Example$parameters=Example.parameters)||void 0===_Example$parameters?void 0:_Example$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    children: 'Ceci est un tag'\n  }\n}"},null===(_Example$parameters2=Example.parameters)||void 0===_Example$parameters2||null===(_Example$parameters2=_Example$parameters2.docs)||void 0===_Example$parameters2?void 0:_Example$parameters2.source)})})},"./src/client/components/ui/Tag/Tag.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{V:()=>Tag});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Tag_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Tag/Tag.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Tag_module.Z,options);const Tag_Tag_module=Tag_module.Z&&Tag_module.Z.locals?Tag_module.Z.locals:void 0;var _excluded=["children","className"],__jsx=react.createElement;function Tag(_ref){var children=_ref.children,className=_ref.className,rest=(0,objectWithoutProperties.Z)(_ref,_excluded),_classNames=classnames_default()(Tag_Tag_module.tag,className);return __jsx("span",(0,esm_extends.Z)({className:_classNames},rest),children)}Tag.displayName="Tag",Tag.__docgenInfo={description:"",methods:[],displayName:"Tag"};try{Tag.displayName="Tag",Tag.__docgenInfo={description:"",displayName:"Tag",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Tag/Tag.tsx#Tag"]={docgenInfo:Tag.__docgenInfo,name:"Tag",path:"src/client/components/ui/Tag/Tag.tsx#Tag"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Tag/Tag.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".noVOly_0vnMLBcsU8qLG{font-size:.875rem;line-height:1.05rem}.noVOly_0vnMLBcsU8qLG{display:block;padding:.25rem .5rem;border-radius:2rem;border:.5px solid #929292;background-color:#eee}.noVOly_0vnMLBcsU8qLG::first-letter{text-transform:capitalize}.noVOly_0vnMLBcsU8qLG button{line-height:0;padding:0}.noVOly_0vnMLBcsU8qLG button svg{height:.75rem;width:.75rem;vertical-align:middle}@media(min-width: 62em){.noVOly_0vnMLBcsU8qLG{padding:.5rem .75rem}.noVOly_0vnMLBcsU8qLG button svg{height:1rem;width:1rem}}","",{version:3,sources:["webpack://./src/styles/typography/_placeholders.scss","webpack://./src/client/components/ui/Tag/Tag.module.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/styles/media/_mixins.scss"],names:[],mappings:"AAsDA,sBACE,iBAAA,CACA,mBAAA,CCpDF,sBACE,aAAA,CAEA,oBAAA,CACA,kBAAA,CACA,yBAAA,CACA,qBCiBqB,CDfrB,oCACE,yBAAA,CAGF,6BACE,aAAA,CACA,SAAA,CACA,iCACE,aAAA,CACA,YAAA,CACA,qBAAA,CEhBF,wBFuBF,sBACE,oBAAA,CAEA,iCACE,WAAA,CACA,UAAA,CAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n%title-xLarge {\n  font-size: 2rem;\n  line-height: 2.4rem;\n\n  @include mixins.media(large) {\n    font-size: 2.5rem;\n    line-height: 3rem;\n  }\n}\n\n%title-large {\n  font-size: 1.5rem;\n  line-height: 1.8rem;\n\n  @include mixins.media(large) {\n    font-size: 2rem;\n    line-height: 2.4rem;\n  }\n}\n\n%title-medium {\n  font-size: 1.25rem;\n  line-height: 1.5rem;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n    line-height: 1.8rem;\n  }\n}\n\n%title-small {\n  font-size: 1rem;\n  line-height: 1.2rem;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n    line-height: 1.5rem;\n  }\n}\n\n\n%text-large {\n  font-size: 1.125rem;\n  line-height: 1.35rem;\n}\n\n%text-medium {\n  font-size: 1rem;\n  line-height: 1.2rem;\n}\n\n%text-small {\n  font-size: 0.875rem;\n  line-height: 1.05rem;\n}\n\n%text-xsmall {\n  font-size: 0.75rem;\n  line-height: 0.9rem;\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @extend %title-xLarge;\n}\n\n%subheading {\n  @extend %title-large;\n}\n\n','@use "@styles/utilities";\n\n$color-tag: #EEEEEE;\n\n.tag {\n  display: block;\n  @extend %text-small;\n  padding: 0.25rem 0.5rem;\n  border-radius: 2rem;\n  border: 0.5px solid utilities.$color-background-border;\n  background-color: utilities.$color-background-tag;\n\n  &::first-letter {\n    text-transform: capitalize;\n  }\n\n  & button {\n    line-height: 0;\n    padding: 0;\n    & svg {\n      height: 0.75rem;\n      width: 0.75rem;\n      vertical-align: middle;\n    }\n  }\n}\n\n\n@include utilities.media(large) {\n  .tag {\n    padding: 0.5rem 0.75rem;\n\n    & button svg {\n      height: 1rem;\n      width: 1rem;\n    }\n  }\n}\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n$white: #FFFFFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #FFFFFF;\n$color-text-placeholder: #666666;\n\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={tag:"noVOly_0vnMLBcsU8qLG"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);