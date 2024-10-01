/*! For license information please see client-components-ui-Form-Combobox-ComboboxPays-ComboboxPays-stories.77b6b3ed.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[6125],{"./src/client/components/ui/Form/Combobox/ComboboxPays/ComboboxPays.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AvecPlaceholder:()=>AvecPlaceholder,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ComboboxPays_stories,exemple:()=>exemple});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),Champ=__webpack_require__("./src/client/components/ui/Form/Champ/Champ.tsx"),Combobox=__webpack_require__("./src/client/components/ui/Form/Combobox/index.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),ComboboxPays_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/Combobox/ComboboxPays/ComboboxPays.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(ComboboxPays_module.A,options);const ComboboxPays_ComboboxPays_module=ComboboxPays_module.A&&ComboboxPays_module.A.locals?ComboboxPays_module.A.locals:void 0,DEFAULT_LABEL="Localisation (pays)",DEFAULT_LABEL_COMPLEMENT="Exemple : France, Belgique";function PaysTrouves({quantity}){return(0,jsx_runtime.jsx)("span",{className:ComboboxPays_ComboboxPays_module.nombreResultats,children:quantity>1?`${quantity} pays trouvés`:`${quantity} pays trouvé`})}const ComboboxPays=react.forwardRef((function ComboboxPays(props,ref){const{paysList,label=DEFAULT_LABEL,labelComplement=DEFAULT_LABEL_COMPLEMENT,defaultValue,onChange:onChangeProps=()=>null,id:idProps,onInvalid:onInvalidProps=()=>{},"aria-describedby":ariaDescribedby="",className,...comboboxProps}=props,[pays,setPays]=(0,react.useState)(defaultValue?[defaultValue]:[]),[status,setStatus]=(0,react.useState)("init");var _defaultValue_label;const[value,setValue]=(0,react.useState)(null!==(_defaultValue_label=null==defaultValue?void 0:defaultValue.label)&&void 0!==_defaultValue_label?_defaultValue_label:""),idState=(0,react.useId)(),inputId=null!=idProps?idProps:idState,errorId=(0,react.useId)();const isEmpty=""===value;return(0,jsx_runtime.jsx)("div",{className,children:(0,jsx_runtime.jsxs)(Champ.Y,{children:[(0,jsx_runtime.jsxs)(Champ.Y.Label,{children:[label,(0,jsx_runtime.jsx)(Champ.Y.Label.Complement,{children:labelComplement})]}),(0,jsx_runtime.jsxs)(Champ.Y.Input,{render:Combobox.G,ref,optionsAriaLabel:"pays",autoComplete:"off",id:inputId,valueName:"codePays",name:"libellePays",onChange:(event,newValue)=>{!function getPays(motCle){if(!motCle)return void setPays([]);const response=paysList.filter((pays=>pays.libellé.toLowerCase().includes(motCle.toLowerCase())));if(response){const pays=response.map((pays=>({code:pays.code,label:pays.libellé})));setStatus("success"),setPays(pays)}else setStatus("failure")}(newValue),setValue(newValue),onChangeProps(event,newValue)},onInvalid:onInvalidProps,value,requireValidOption:!0,filter:Combobox.G.noFilter,"aria-describedby":`${ariaDescribedby} ${errorId}`,...comboboxProps,children:[pays.map((suggestion=>(0,jsx_runtime.jsx)(Combobox.G.Option,{value:suggestion.code,children:suggestion.label},suggestion.label))),(0,jsx_runtime.jsx)("li",{role:"status",children:(isEmpty?"Commencez à taper pour rechercher un pays":"failure"===status&&"Une erreur est survenue lors de la récupération des pays. Veuillez réessayer plus tard.")||0===pays.length&&"Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un pays. Exemple : Belgique, …"||(0,jsx_runtime.jsx)(PaysTrouves,{quantity:pays.length})})]}),(0,jsx_runtime.jsx)(Champ.Y.Error,{})]})})}));ComboboxPays.__docgenInfo={description:"",methods:[],displayName:"ComboboxPays"};const ComboboxPays_stories={argTypes:{defaultValue:{description:"Valeur par défaut du combobox"},label:{description:"Libellé affiché devant le combobox"},paysList:{description:"Liste des pays de recherche dans le combobox"}},args:{},component:ComboboxPays,parameters:{docs:{controls:{exclude:["onFocus","onChange","onBlur","onInput","filter","requireValidOption","valueName"]}}},title:"Components/Form/Combobox/ComboboxPays"},exemple={args:{paysList:[{code:"ES",libellé:"Espagne"},{code:"FR",libellé:"France"}]},render:({...args})=>(0,jsx_runtime.jsx)(ComboboxPays,{...args})},AvecPlaceholder={args:{placeholder:"Exemples: France, Belgique ... "},render:({...args})=>(0,jsx_runtime.jsx)(ComboboxPays,{...args})},__namedExportsOrder=["exemple","AvecPlaceholder"];exemple.parameters={...exemple.parameters,docs:{...exemple.parameters?.docs,source:{originalSource:"{\n  args: {\n    paysList: [{\n      code: 'ES',\n      libellé: 'Espagne'\n    }, {\n      code: 'FR',\n      libellé: 'France'\n    }]\n  },\n  render: ({\n    ...args\n  }) => {\n    return <ComboboxPays {...args} />;\n  }\n}",...exemple.parameters?.docs?.source}}},AvecPlaceholder.parameters={...AvecPlaceholder.parameters,docs:{...AvecPlaceholder.parameters?.docs,source:{originalSource:"{\n  args: {\n    placeholder: 'Exemples: France, Belgique ... '\n  },\n  render: ({\n    ...args\n  }) => {\n    return <ComboboxPays {...args} />;\n  }\n}",...AvecPlaceholder.parameters?.docs?.source}}}},"./src/client/Errors/NoProviderError.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>NoProviderError});class NoProviderError extends Error{constructor(context){super("Context provider not found"+((null==context?void 0:context.displayName)?` for ${context.displayName}`:"")),this.name="NoProviderError"}}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!./src/client/components/ui/Form/Combobox/ComboboxPays/ComboboxPays.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ComboboxPays_nombreResultats__cNVnD{font-size:.875rem;line-height:1.2;color:#666}","",{version:3,sources:["webpack://./src/client/components/ui/Form/Combobox/ComboboxPays/ComboboxPays.module.scss","webpack://./src/styles/typography/_placeholders.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AAIA,qCCqCE,iBAAA,CACA,eAAA,CDpCA,UEiCqB",sourcesContent:['@use "@styles/utilities" as utilities;\n\n$color-nombre-resultats: utilities.$color-text-secondary;\n\n.nombreResultats {\n  @include utilities.text-small;\n  color: $color-nombre-resultats;\n}\n','@use "@styles/media/mixins";\n@use "@styles/theme/variables.scss";\n\n@mixin title-large {\n  font-size: 1.5rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1.75rem;\n  }\n}\n\n@mixin title-medium {\n  font-size: 1.25rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.5rem;\n  }\n}\n\n@mixin title-small {\n  font-size: 1.125rem;\n  line-height: 1.2;\n\n  @include mixins.media(large) {\n    font-size: 1.25rem;\n  }\n}\n\n@mixin text-large {\n  font-size: 1.125rem;\n  line-height: 1.2;\n}\n\n@mixin text-medium {\n  font-size: 1rem;\n  line-height: 1.2;\n}\n\n@mixin text-small {\n  font-size: 0.875rem;\n  line-height: 1.2;\n}\n\n@mixin text-xsmall {\n  font-size: 0.75rem;\n  line-height: 1.2;\n}\n\n@mixin text-interactive-medium {\n  font-size: 0.875rem;\n  line-height: 1.4;\n\n  @include mixins.media(large) {\n    font-size: 1rem;\n  }\n}\n\n%bold {\n  font-weight: 700;\n}\n\n@mixin bold {\n  font-weight: 700\n}\n\n%italic {\n  font-style: italic;\n}\n\n\n%headline {\n  color: variables.$color-primary;\n  @include title-large;\n}\n\n%subheading {\n  @include title-large;\n}\n\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={nombreResultats:"ComboboxPays_nombreResultats__cNVnD"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);