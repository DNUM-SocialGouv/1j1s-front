/*! For license information please see client-components-ui-Form-Combobox-ComboboxLocalisation-ComboboxLocalisation-stories.775af6a8.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[9787],{"./src/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AvecPlaceholderEtDebounce:()=>AvecPlaceholderEtDebounce,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ComboboxLocalisation_stories,exemple:()=>exemple});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),dependenciesContainer_context=__webpack_require__("./src/client/context/dependenciesContainer.context.tsx"),either=__webpack_require__("./src/server/errors/either.ts");var lodash_debounce=__webpack_require__("./node_modules/lodash.debounce/index.js"),lodash_debounce_default=__webpack_require__.n(lodash_debounce),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),Champ=__webpack_require__("./src/client/components/ui/Form/Champ/Champ.tsx"),Combobox=__webpack_require__("./src/client/components/ui/Form/Combobox/index.tsx");function formatLibelleLocalisation(nom,code){return code?`${nom} (${code})`:nom}var localisation=__webpack_require__("./src/server/localisations/domain/localisation.ts");const LocalisationOptionsByCategory=({localisations,optionMessage})=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[localisations.regionList.length>0&&(0,jsx_runtime.jsx)(Combobox.G.Category,{name:"Régions",children:localisations.regionList.map((suggestion=>(0,jsx_runtime.jsx)(Combobox.G.Option,{children:formatLibelleLocalisation(suggestion.nom,suggestion.code)},suggestion.code)))}),localisations.departementList.length>0&&(0,jsx_runtime.jsx)(Combobox.G.Category,{name:"Départements",children:localisations.departementList.map((suggestion=>(0,jsx_runtime.jsx)(Combobox.G.Option,{children:formatLibelleLocalisation(suggestion.nom,suggestion.code)},suggestion.code)))}),localisations.communeList.length>0&&(0,jsx_runtime.jsx)(Combobox.G.Category,{name:"Communes",children:localisations.communeList.map((suggestion=>(0,jsx_runtime.jsx)(Combobox.G.Option,{children:formatLibelleLocalisation(suggestion.nom,suggestion.codePostal)},suggestion.codeInsee)))}),(0,jsx_runtime.jsx)(Combobox.G.AsyncMessage,{children:optionMessage})]});LocalisationOptionsByCategory.__docgenInfo={description:"",methods:[],displayName:"LocalisationOptionsByCategory",props:{localisations:{required:!0,tsType:{name:"signature",type:"object",raw:"{\n\tcommuneList: Commune[]\n\tdepartementList: Departement[]\n\tregionList: Region[]\n}",signature:{properties:[{key:"communeList",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tcodeInsee: string\n\tcodePostal: string\n\tnom: string\n}",signature:{properties:[{key:"codeInsee",value:{name:"string",required:!0}},{key:"codePostal",value:{name:"string",required:!0}},{key:"nom",value:{name:"string",required:!0}}]}}],raw:"Commune[]",required:!0}},{key:"departementList",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tcode: string\n\tnom: string\n}",signature:{properties:[{key:"code",value:{name:"string",required:!0}},{key:"nom",value:{name:"string",required:!0}}]}}],raw:"Departement[]",required:!0}},{key:"regionList",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tcode: string\n\tnom: string\n}",signature:{properties:[{key:"code",value:{name:"string",required:!0}},{key:"nom",value:{name:"string",required:!0}}]}}],raw:"Region[]",required:!0}}]}},description:""},optionMessage:{required:!0,tsType:{name:"string"},description:""}}};const DEFAULT_LABEL="Localisation",DEFAULT_LABEL_COMPLEMENT="Exemples : Paris, Béziers…",ComboboxLocalisation=react.forwardRef((function ComboboxLocalisation(props,ref){const{label=DEFAULT_LABEL,labelComplement=DEFAULT_LABEL_COMPLEMENT,defaultValue,onChange:onChangeProps=(()=>null),debounceTimeout=300,id:idProps,...rest}=props,localisationService=(0,dependenciesContainer_context.fJ)("localisationService"),[userInput,setUserInput]=(0,react.useState)(function buildUserInput(defaultLocalisation){return defaultLocalisation?defaultLocalisation.type===localisation.B.DEPARTEMENT||defaultLocalisation.type===localisation.B.REGION?formatLibelleLocalisation(defaultLocalisation.nom,defaultLocalisation.code):defaultLocalisation.type===localisation.B.COMMUNE?formatLibelleLocalisation(defaultLocalisation.nom,defaultLocalisation.codePostal):"":""}(defaultValue)),[localisationOptions,setLocalisationOptions]=(0,react.useState)({communeList:(null==defaultValue?void 0:defaultValue.type)===localisation.B.COMMUNE?[defaultValue]:[],departementList:(null==defaultValue?void 0:defaultValue.type)===localisation.B.DEPARTEMENT?[defaultValue]:[],regionList:(null==defaultValue?void 0:defaultValue.type)===localisation.B.REGION?[defaultValue]:[]}),[status,setStatus]=(0,react.useState)("init"),matchingOption=function findMatchingLocalisation(localisationList,userInput){const communeFound=localisationList.communeList.find((commune=>userInput===formatLibelleLocalisation(commune.nom,commune.codePostal)));if(communeFound)return{code:communeFound.codeInsee,codePostal:communeFound.codePostal,nom:communeFound.nom,type:localisation.B.COMMUNE};const departementFound=localisationList.departementList.find((departement=>userInput===formatLibelleLocalisation(departement.nom,departement.code)));if(departementFound)return{code:departementFound.code,nom:departementFound.nom,type:localisation.B.DEPARTEMENT};const regionFound=localisationList.regionList.find((region=>userInput===formatLibelleLocalisation(region.nom,region.code)));return regionFound?{code:regionFound.code,nom:regionFound.nom,type:localisation.B.REGION}:null}(localisationOptions,userInput),idState=(0,react.useId)(),inputId=null!=idProps?idProps:idState,isSuggestionListEmpty=(0,react.useCallback)((()=>!localisationOptions.departementList.length&&!localisationOptions.regionList.length&&!localisationOptions.communeList.length),[localisationOptions]),optionMessage=(localisationService.isInvalidLocalisationQuery(userInput)?"Commencez à saisir au moins 3 caractères, 2 chiffres d’un département ou les 5 chiffres d’une commune, puis sélectionnez votre localisation":"failure"===status&&"Une erreur est survenue lors de la récupération des lieux. Veuillez réessayer plus tard.")||"pending"===status&&"Chargement ..."||isSuggestionListEmpty()&&"Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, ..."||"",rechercherLocalisation=(0,react.useCallback)((async userInput=>{const response=await localisationService.rechercherLocalisation(userInput);response&&(0,either.oJ)(response)?(setStatus("success"),setLocalisationOptions(function mapToLocalisations(localisationList){return{communeList:localisationList.communeList.map((commune=>({codeInsee:commune.code,codePostal:commune.codePostal,nom:commune.nom}))),departementList:localisationList.departementList,regionList:localisationList.regionList}}(response.result))):(setStatus("failure"),setLocalisationOptions({communeList:[],departementList:[],regionList:[]}))}),[localisationService]),handleRechercherWithDebounce=(0,react.useMemo)((()=>lodash_debounce_default()(rechercherLocalisation,debounceTimeout)),[rechercherLocalisation,debounceTimeout]),getLocalisationDebounced=(0,react.useCallback)((async function(userInput){localisationService.isInvalidLocalisationQuery(userInput)?setLocalisationOptions({communeList:[],departementList:[],regionList:[]}):(setStatus("pending"),handleRechercherWithDebounce(userInput))}),[handleRechercherWithDebounce,localisationService]);var _matchingOption_nom,_matchingOption_codePostal,_matchingOption_code,_matchingOption_type;return(0,react.useEffect)((()=>()=>{handleRechercherWithDebounce.cancel()}),[handleRechercherWithDebounce]),(0,jsx_runtime.jsxs)(Champ.Y,{children:[(0,jsx_runtime.jsxs)(Champ.Y.Label,{children:[label,(0,jsx_runtime.jsx)(Champ.Y.Label.Complement,{children:labelComplement})]}),(0,jsx_runtime.jsx)(Champ.Y.Input,{render:Combobox.G,ref,autoComplete:"off",optionsAriaLabel:"localisations",id:inputId,value:userInput,onChange:(event,newUserInput)=>{getLocalisationDebounced(newUserInput),setUserInput(newUserInput),onChangeProps(event,newUserInput)},requireValidOption:!0,filter:Combobox.G.noFilter,...rest,children:(0,jsx_runtime.jsx)(LocalisationOptionsByCategory,{localisations:localisationOptions,optionMessage})}),(0,jsx_runtime.jsx)(Champ.Y.Error,{}),(0,jsx_runtime.jsx)("input",{type:"hidden",value:null!==(_matchingOption_nom=null==matchingOption?void 0:matchingOption.nom)&&void 0!==_matchingOption_nom?_matchingOption_nom:"",name:"nomLocalisation"}),(0,jsx_runtime.jsx)("input",{type:"hidden",value:null!==(_matchingOption_codePostal=null==matchingOption?void 0:matchingOption.codePostal)&&void 0!==_matchingOption_codePostal?_matchingOption_codePostal:"",name:"codePostalLocalisation"}),(0,jsx_runtime.jsx)("input",{type:"hidden",value:null!==(_matchingOption_code=null==matchingOption?void 0:matchingOption.code)&&void 0!==_matchingOption_code?_matchingOption_code:"",name:"codeLocalisation"}),(0,jsx_runtime.jsx)("input",{type:"hidden",value:null!==(_matchingOption_type=null==matchingOption?void 0:matchingOption.type)&&void 0!==_matchingOption_type?_matchingOption_type:"",name:"typeLocalisation"})]})}));ComboboxLocalisation.__docgenInfo={description:"",methods:[],displayName:"ComboboxLocalisation"};const meta={argTypes:{debounceTimeout:{description:"Temps (en ms) attendu après la dernière saisie avant de lancer la récupération des localisations",table:{defaultValue:{summary:300}}},defaultValue:{description:"Valeur par défaut du combobox"},label:{description:"Libellé affiché devant le combobox"}},args:{},component:ComboboxLocalisation,parameters:{docs:{controls:{exclude:["onFocus","onChange","onBlur","onInput","filter","requireValidOption","valueName"]}}},title:"Components/Form/Combobox/ComboboxLocalisation"};class LocalisationServiceStub{isInvalidLocalisationQuery(){return!1}rechercherCommune(){throw new Error("Method not implemented.")}async rechercherLocalisation(query){return new Promise((resolve=>setTimeout((()=>resolve((0,either.MB)({communeList:[].filter((commune=>commune.nom.toLowerCase().includes(query.toLowerCase()))),departementList:[{code:"75",nom:"Paris"}].filter((departement=>departement.nom.toLowerCase().includes(query.toLowerCase()))),regionList:[].filter((region=>region.nom.toLowerCase().includes(query.toLowerCase())))}))),1e3)))}}const ComboboxLocalisation_stories=meta,exemple={args:{debounceTimeout:300},render:({...args})=>(0,jsx_runtime.jsx)(dependenciesContainer_context.bH,{localisationService:new LocalisationServiceStub,children:(0,jsx_runtime.jsx)(ComboboxLocalisation,{...args})})},AvecPlaceholderEtDebounce={args:{debounceTimeout:2e3,placeholder:"Exemple de placeholder"},render:({...args})=>(0,jsx_runtime.jsx)(dependenciesContainer_context.bH,{localisationService:new LocalisationServiceStub,children:(0,jsx_runtime.jsx)(ComboboxLocalisation,{...args})})},__namedExportsOrder=["exemple","AvecPlaceholderEtDebounce"];exemple.parameters={...exemple.parameters,docs:{...exemple.parameters?.docs,source:{originalSource:"{\n  args: {\n    debounceTimeout: 300\n  },\n  render: ({\n    ...args\n  }) => {\n    return <DependenciesProvider localisationService={new LocalisationServiceStub()}>\n                <ComboboxLocalisation {...args} />\n            </DependenciesProvider>;\n  }\n}",...exemple.parameters?.docs?.source}}},AvecPlaceholderEtDebounce.parameters={...AvecPlaceholderEtDebounce.parameters,docs:{...AvecPlaceholderEtDebounce.parameters?.docs,source:{originalSource:"{\n  args: {\n    debounceTimeout: 2000,\n    placeholder: 'Exemple de placeholder'\n  },\n  render: ({\n    ...args\n  }) => {\n    return <DependenciesProvider localisationService={new LocalisationServiceStub()}>\n                <ComboboxLocalisation {...args} />\n            </DependenciesProvider>;\n  }\n}",...AvecPlaceholderEtDebounce.parameters?.docs?.source}}}},"./src/client/context/dependenciesContainer.context.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{bH:()=>DependenciesProvider,fJ:()=>useDependency,jH:()=>DependencyException});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");class DependencyException extends Error{constructor(key){super(`Dependency ${key} not found`),this.name="DependencyException"}}const DependenciesContainerContext=(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});function DependenciesProvider({children,...dependencies}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DependenciesContainerContext.Provider,{value:dependencies,children})}function useDependency(key){const dependency=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(DependenciesContainerContext)[key];if(!dependency)throw new DependencyException(key);return dependency}DependenciesProvider.__docgenInfo={description:"",methods:[],displayName:"DependenciesProvider"}},"./src/server/errors/either.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function isSuccess(e){return"success"===e.instance}function createSuccess(result){return{instance:"success",result}}__webpack_require__.d(__webpack_exports__,{MB:()=>createSuccess,oJ:()=>isSuccess})},"./src/server/localisations/domain/localisation.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var TypeLocalisation;__webpack_require__.d(__webpack_exports__,{B:()=>TypeLocalisation,f:()=>radiusList}),function(TypeLocalisation){TypeLocalisation.REGION="REGION",TypeLocalisation.DEPARTEMENT="DEPARTEMENT",TypeLocalisation.COMMUNE="COMMUNE"}(TypeLocalisation||(TypeLocalisation={}));const radiusList=[{libellé:"10 km",valeur:"10"},{libellé:"30 km",valeur:"30"},{libellé:"60 km",valeur:"60"},{libellé:"100 km",valeur:"100"}]},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/lodash.debounce/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var NAN=NaN,symbolTag="[object Symbol]",reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt,freeGlobal="object"==typeof __webpack_require__.g&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")(),objectToString=Object.prototype.toString,nativeMax=Math.max,nativeMin=Math.min,now=function(){return root.Date.now()};function isObject(value){var type=typeof value;return!!value&&("object"==type||"function"==type)}function toNumber(value){if("number"==typeof value)return value;if(function isSymbol(value){return"symbol"==typeof value||function isObjectLike(value){return!!value&&"object"==typeof value}(value)&&objectToString.call(value)==symbolTag}(value))return NAN;if(isObject(value)){var other="function"==typeof value.valueOf?value.valueOf():value;value=isObject(other)?other+"":other}if("string"!=typeof value)return 0===value?value:+value;value=value.replace(reTrim,"");var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value}module.exports=function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=!1,maxing=!1,trailing=!0;if("function"!=typeof func)throw new TypeError("Expected a function");function invokeFunc(time){var args=lastArgs,thisArg=lastThis;return lastArgs=lastThis=void 0,lastInvokeTime=time,result=func.apply(thisArg,args)}function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime;return void 0===lastCallTime||timeSinceLastCall>=wait||timeSinceLastCall<0||maxing&&time-lastInvokeTime>=maxWait}function timerExpired(){var time=now();if(shouldInvoke(time))return trailingEdge(time);timerId=setTimeout(timerExpired,function remainingWait(time){var result=wait-(time-lastCallTime);return maxing?nativeMin(result,maxWait-(time-lastInvokeTime)):result}(time))}function trailingEdge(time){return timerId=void 0,trailing&&lastArgs?invokeFunc(time):(lastArgs=lastThis=void 0,result)}function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(void 0===timerId)return function leadingEdge(time){return lastInvokeTime=time,timerId=setTimeout(timerExpired,wait),leading?invokeFunc(time):result}(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return void 0===timerId&&(timerId=setTimeout(timerExpired,wait)),result}return wait=toNumber(wait)||0,isObject(options)&&(leading=!!options.leading,maxWait=(maxing="maxWait"in options)?nativeMax(toNumber(options.maxWait)||0,wait):maxWait,trailing="trailing"in options?!!options.trailing:trailing),debounced.cancel=function cancel(){void 0!==timerId&&clearTimeout(timerId),lastInvokeTime=0,lastArgs=lastCallTime=lastThis=timerId=void 0},debounced.flush=function flush(){return void 0===timerId?result:trailingEdge(now())},debounced}}}]);