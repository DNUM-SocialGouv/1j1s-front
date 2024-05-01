"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[4582],{"./src/client/components/ui/ErrorMessage/ErrorComponent.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ErrorComponent_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),injectStylesIntoStyleTag=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),ErrorMessage_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/ErrorMessage/ErrorMessage.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(ErrorMessage_module.A,options);const ErrorMessage_ErrorMessage_module=ErrorMessage_module.A&&ErrorMessage_module.A.locals?ErrorMessage_module.A.locals:void 0,ErrorMessageComponent=props=>{const{explanationText,solutionText,title}=props;return(0,jsx_runtime.jsxs)("p",{className:ErrorMessage_ErrorMessage_module.errorMessage,children:[(0,jsx_runtime.jsx)("strong",{className:ErrorMessage_ErrorMessage_module.errorMessageTitle,children:title}),(0,jsx_runtime.jsx)("span",{className:"bold",children:explanationText}),solutionText&&(0,jsx_runtime.jsx)("span",{children:solutionText})]})};ErrorMessageComponent.__docgenInfo={description:"",methods:[],displayName:"ErrorMessageComponent",props:{explanationText:{required:!0,tsType:{name:"string"},description:""},solutionText:{required:!1,tsType:{name:"string"},description:""},title:{required:!0,tsType:{name:"string"},description:""}}};const IncorrectRequestErrorMessage=()=>(0,jsx_runtime.jsx)(ErrorMessageComponent,{title:"Erreur - Demande incorrecte",explanationText:"Votre navigateur a envoyé une demande que ce serveur n’a pas pu comprendre."});function NoResultErrorMessage(props){var _props_title,_props_explanationText,_props_solutionText;return(0,jsx_runtime.jsx)(ErrorMessageComponent,{title:null!==(_props_title=props.title)&&void 0!==_props_title?_props_title:"0 résultat",explanationText:null!==(_props_explanationText=props.explanationText)&&void 0!==_props_explanationText?_props_explanationText:"Malheureusement, aucune offre ne correspond à votre recherche !",solutionText:null!==(_props_solutionText=props.solutionText)&&void 0!==_props_solutionText?_props_solutionText:"Vérifiez l‘orthographe, essayez d‘autres mots-clés ou élargissez votre zone géographique de recherche."})}IncorrectRequestErrorMessage.__docgenInfo={description:"",methods:[],displayName:"IncorrectRequestErrorMessage"},NoResultErrorMessage.__docgenInfo={description:"",methods:[],displayName:"NoResultErrorMessage",props:{title:{required:!1,tsType:{name:"string"},description:""},explanationText:{required:!1,tsType:{name:"string"},description:""},solutionText:{required:!1,tsType:{name:"string"},description:""}}};const UnavailableServiceErrorMessage=()=>(0,jsx_runtime.jsx)(ErrorMessageComponent,{title:"Service indisponible",explanationText:"Désolé, le service est temporairement inaccessible, la page demandée ne peut pas être affichée.",solutionText:"Merci de réessayer plus tard, vous serez bientôt en mesure de réutiliser le service. Si vous avez besoin d’une aide immédiate, merci de nous contacter."});var ErreurMetier,ErreurTechnique;UnavailableServiceErrorMessage.__docgenInfo={description:"",methods:[],displayName:"UnavailableServiceErrorMessage"},function(ErreurMetier){ErreurMetier.SERVICE_INDISPONIBLE="SERVICE_INDISPONIBLE",ErreurMetier.DEMANDE_INCORRECTE="DEMANDE_INCORRECTE",ErreurMetier.CONFLIT_D_IDENTIFIANT="CONFLIT_D_IDENTIFIANT",ErreurMetier.CONTENU_INDISPONIBLE="CONTENU_INDISPONIBLE"}(ErreurMetier||(ErreurMetier={})),function(ErreurTechnique){ErreurTechnique.TOO_MANY_REQUESTS="TOO_MANY_REQUESTS"}(ErreurTechnique||(ErreurTechnique={}));const ErrorComponent=props=>{const{errorType}=props;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[!errorType&&(0,jsx_runtime.jsx)(NoResultErrorMessage,{}),errorType===ErreurMetier.SERVICE_INDISPONIBLE&&(0,jsx_runtime.jsx)(UnavailableServiceErrorMessage,{}),errorType===ErreurMetier.DEMANDE_INCORRECTE&&(0,jsx_runtime.jsx)(IncorrectRequestErrorMessage,{}),errorType===ErreurMetier.CONTENU_INDISPONIBLE&&(0,jsx_runtime.jsx)(NoResultErrorMessage,{}),errorType===ErreurTechnique.TOO_MANY_REQUESTS&&(0,jsx_runtime.jsx)(UnavailableServiceErrorMessage,{})]})};var _Example_parameters,_Example_parameters_docs,_Example_parameters1;ErrorComponent.__docgenInfo={description:"",methods:[],displayName:"ErrorComponent",props:{errorType:{required:!1,tsType:{name:"union",raw:"ErreurMetier | ErreurTechnique",elements:[{name:"ErreurMetier"},{name:"ErreurTechnique"}]},description:""}}};const ErrorComponent_stories={component:ErrorComponent,title:"Components/ErrorMessageComponent"},Example={args:{errorType:""}};Example.parameters={...Example.parameters,docs:{...null===(_Example_parameters=Example.parameters)||void 0===_Example_parameters?void 0:_Example_parameters.docs,source:{originalSource:"{\n  args: {\n    errorType: ''\n  }\n}",...null===(_Example_parameters1=Example.parameters)||void 0===_Example_parameters1||null===(_Example_parameters_docs=_Example_parameters1.docs)||void 0===_Example_parameters_docs?void 0:_Example_parameters_docs.source}}};const __namedExportsOrder=["Example"]},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/ErrorMessage/ErrorMessage.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ErrorMessage_errorMessageTitle__uASma{font-weight:700}.ErrorMessage_errorMessage__uU9bp{padding:1rem;font-size:1.125rem;line-height:1.2}.ErrorMessage_errorMessage__uU9bp>*{display:block;margin-bottom:1rem}.ErrorMessage_errorMessageTitle__uASma{font-size:1.25rem;line-height:1.2}@media(min-width: 62em){.ErrorMessage_errorMessageTitle__uASma{font-size:1.5rem}}@media(min-width: 48em){.ErrorMessage_errorMessage__uU9bp{text-align:center;max-width:36em;margin:auto;padding:2em 0}}","",{version:3,sources:["webpack://./src/styles/typography/_placeholders.scss","webpack://./src/client/components/ui/ErrorMessage/ErrorMessage.module.scss","webpack://./src/styles/media/_mixins.scss"],names:[],mappings:"AA2DA,uCACE,eAAA,CC1DF,kCACE,YAAA,CD4BA,kBAAA,CACA,eAAA,CC3BA,oCACE,aAAA,CACA,kBAAA,CAEF,uCDIA,iBAAA,CACA,eAAA,CERE,wBDGF,uCDQE,gBAAA,CAAA,CEbA,wBDYF,kCACE,iBAAA,CACA,cAAA,CACA,WAAA,CACA,aAAA,CAAA",sourcesContent:['@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium{\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "@styles/utilities";\n\n.errorMessage {\n  padding: 1rem;\n  @include utilities.text-large;\n  & > * {\n    display: block;\n    margin-bottom: 1rem;\n  }\n  &Title {\n    @include utilities.title-medium;\n    @extend %bold;\n  }\n}\n\n@include utilities.media(medium){\n  .errorMessage {\n    text-align: center;\n    max-width: 36em;\n    margin: auto;\n    padding: 2em 0;\n  }\n}\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={errorMessageTitle:"ErrorMessage_errorMessageTitle__uASma",errorMessage:"ErrorMessage_errorMessage__uU9bp"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function p(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&"key"!==b&&"ref"!==b&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=p,exports.jsxs=p},"./node_modules/next/dist/compiled/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js")}}]);