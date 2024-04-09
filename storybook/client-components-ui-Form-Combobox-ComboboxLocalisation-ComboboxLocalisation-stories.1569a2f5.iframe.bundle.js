/*! For license information please see client-components-ui-Form-Combobox-ComboboxLocalisation-ComboboxLocalisation-stories.1569a2f5.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[9787],{"./src/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AvecPlaceholderEtDebounce:()=>AvecPlaceholderEtDebounce,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ComboboxLocalisation_stories,exemple:()=>exemple});var objectDestructuringEmpty=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/objectDestructuringEmpty.js"),esm_extends=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/extends.js"),asyncToGenerator=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/asyncToGenerator.js"),classCallCheck=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/classCallCheck.js"),createClass=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/createClass.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),dependenciesContainer_context=__webpack_require__("./src/client/context/dependenciesContainer.context.tsx"),either=__webpack_require__("./src/server/errors/either.ts");var objectWithoutProperties=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/objectWithoutProperties.js"),lodash_debounce=__webpack_require__("./node_modules/lodash.debounce/index.js"),lodash_debounce_default=__webpack_require__.n(lodash_debounce),Champ=__webpack_require__("./src/client/components/ui/Form/Champ/Champ.tsx"),Combobox=__webpack_require__("./src/client/components/ui/Form/Combobox/index.tsx");function formatLibelleLocalisation(nom,code){return code?"".concat(nom," (").concat(code,")"):nom}var localisation=__webpack_require__("./src/server/localisations/domain/localisation.ts");var __jsx=react.createElement,LocalisationOptionsByCategory=function LocalisationOptionsByCategory(_ref){var localisations=_ref.localisations,optionMessage=_ref.optionMessage;return __jsx(react.Fragment,null,localisations.regionList.length>0&&__jsx(Combobox.G.Category,{name:"Régions"},localisations.regionList.map((function(suggestion){return __jsx(Combobox.G.Option,{key:suggestion.code},formatLibelleLocalisation(suggestion.nom,suggestion.code))}))),localisations.departementList.length>0&&__jsx(Combobox.G.Category,{name:"Départements"},localisations.departementList.map((function(suggestion){return __jsx(Combobox.G.Option,{key:suggestion.code},formatLibelleLocalisation(suggestion.nom,suggestion.code))}))),localisations.communeList.length>0&&__jsx(Combobox.G.Category,{name:"Communes"},localisations.communeList.map((function(suggestion){return __jsx(Combobox.G.Option,{key:suggestion.codeInsee},formatLibelleLocalisation(suggestion.nom,suggestion.codePostal))}))),__jsx(Combobox.G.AsyncMessage,null,optionMessage))};LocalisationOptionsByCategory.__docgenInfo={description:"",methods:[],displayName:"LocalisationOptionsByCategory",props:{localisations:{required:!0,tsType:{name:"signature",type:"object",raw:"{\n\tcommuneList: Commune[]\n\tdepartementList: Departement[]\n\tregionList: Region[]\n}",signature:{properties:[{key:"communeList",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tcodeInsee: string\n\tcodePostal: string\n\tnom: string\n}",signature:{properties:[{key:"codeInsee",value:{name:"string",required:!0}},{key:"codePostal",value:{name:"string",required:!0}},{key:"nom",value:{name:"string",required:!0}}]}}],raw:"Commune[]",required:!0}},{key:"departementList",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tcode: string\n\tnom: string\n}",signature:{properties:[{key:"code",value:{name:"string",required:!0}},{key:"nom",value:{name:"string",required:!0}}]}}],raw:"Departement[]",required:!0}},{key:"regionList",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\n\tcode: string\n\tnom: string\n}",signature:{properties:[{key:"code",value:{name:"string",required:!0}},{key:"nom",value:{name:"string",required:!0}}]}}],raw:"Region[]",required:!0}}]}},description:""},optionMessage:{required:!0,tsType:{name:"string"},description:""}}};var _excluded=["label","labelComplement","defaultValue","onChange","debounceTimeout","id"],ComboboxLocalisation_jsx=react.createElement,ComboboxLocalisation=react.forwardRef((function ComboboxLocalisation(props,ref){var _matchingOption$nom,_matchingOption$codeP,_matchingOption$code,_matchingOption$type,_props$label=props.label,label=void 0===_props$label?"Localisation":_props$label,_props$labelComplemen=props.labelComplement,labelComplement=void 0===_props$labelComplemen?"Exemples : Paris, Béziers…":_props$labelComplemen,defaultValue=props.defaultValue,_props$onChange=props.onChange,onChangeProps=void 0===_props$onChange?function(){return null}:_props$onChange,_props$debounceTimeou=props.debounceTimeout,debounceTimeout=void 0===_props$debounceTimeou?300:_props$debounceTimeou,idProps=props.id,rest=(0,objectWithoutProperties.A)(props,_excluded),localisationService=(0,dependenciesContainer_context.fJ)("localisationService"),_useState=(0,react.useState)(function buildUserInput(defaultLocalisation){return defaultLocalisation?defaultLocalisation.type===localisation.B.DEPARTEMENT||defaultLocalisation.type===localisation.B.REGION?formatLibelleLocalisation(defaultLocalisation.nom,defaultLocalisation.code):defaultLocalisation.type===localisation.B.COMMUNE?formatLibelleLocalisation(defaultLocalisation.nom,defaultLocalisation.codePostal):"":""}(defaultValue)),userInput=_useState[0],setUserInput=_useState[1],_useState2=(0,react.useState)({communeList:(null==defaultValue?void 0:defaultValue.type)===localisation.B.COMMUNE?[defaultValue]:[],departementList:(null==defaultValue?void 0:defaultValue.type)===localisation.B.DEPARTEMENT?[defaultValue]:[],regionList:(null==defaultValue?void 0:defaultValue.type)===localisation.B.REGION?[defaultValue]:[]}),localisationOptions=_useState2[0],setLocalisationOptions=_useState2[1],_useState3=(0,react.useState)("init"),status=_useState3[0],setStatus=_useState3[1],matchingOption=function findMatchingLocalisation(localisationList,userInput){var communeFound=localisationList.communeList.find((function(commune){return userInput===formatLibelleLocalisation(commune.nom,commune.codePostal)}));if(communeFound)return{code:communeFound.codeInsee,codePostal:communeFound.codePostal,nom:communeFound.nom,type:localisation.B.COMMUNE};var departementFound=localisationList.departementList.find((function(departement){return userInput===formatLibelleLocalisation(departement.nom,departement.code)}));if(departementFound)return{code:departementFound.code,nom:departementFound.nom,type:localisation.B.DEPARTEMENT};var regionFound=localisationList.regionList.find((function(region){return userInput===formatLibelleLocalisation(region.nom,region.code)}));return regionFound?{code:regionFound.code,nom:regionFound.nom,type:localisation.B.REGION}:null}(localisationOptions,userInput),idState=(0,react.useId)(),inputId=null!=idProps?idProps:idState,isSuggestionListEmpty=(0,react.useCallback)((function(){return!localisationOptions.departementList.length&&!localisationOptions.regionList.length&&!localisationOptions.communeList.length}),[localisationOptions]),optionMessage=(localisationService.isInvalidLocalisationQuery(userInput)?"Commencez à saisir au moins 3 caractères, 2 chiffres d’un département ou les 5 chiffres d’une commune, puis sélectionnez votre localisation":"failure"===status&&"Une erreur est survenue lors de la récupération des lieux. Veuillez réessayer plus tard.")||"pending"===status&&"Chargement ..."||isSuggestionListEmpty()&&"Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, ..."||"",rechercherLocalisation=(0,react.useCallback)(function(){var _ref=(0,asyncToGenerator.A)(regenerator_default().mark((function _callee(userInput){var response;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,localisationService.rechercherLocalisation(userInput);case 2:(response=_context.sent)&&(0,either.oJ)(response)?(setStatus("success"),setLocalisationOptions({communeList:(localisationList=response.result).communeList.map((function(commune){return{codeInsee:commune.code,codePostal:commune.codePostal,nom:commune.nom}})),departementList:localisationList.departementList,regionList:localisationList.regionList})):(setStatus("failure"),setLocalisationOptions({communeList:[],departementList:[],regionList:[]}));case 4:case"end":return _context.stop()}var localisationList}),_callee)})));return function(_x){return _ref.apply(this,arguments)}}(),[localisationService]),handleRechercherWithDebounce=(0,react.useMemo)((function(){return lodash_debounce_default()(rechercherLocalisation,debounceTimeout)}),[rechercherLocalisation,debounceTimeout]),getLocalisationDebounced=(0,react.useCallback)(function(){var _ref2=(0,asyncToGenerator.A)(regenerator_default().mark((function _callee2(userInput){return regenerator_default().wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:if(!localisationService.isInvalidLocalisationQuery(userInput)){_context2.next=3;break}return setLocalisationOptions({communeList:[],departementList:[],regionList:[]}),_context2.abrupt("return");case 3:setStatus("pending"),handleRechercherWithDebounce(userInput);case 5:case"end":return _context2.stop()}}),_callee2)})));return function(_x2){return _ref2.apply(this,arguments)}}(),[handleRechercherWithDebounce,localisationService]);return(0,react.useEffect)((function(){return function(){handleRechercherWithDebounce.cancel()}}),[handleRechercherWithDebounce]),ComboboxLocalisation_jsx(Champ.Y,null,ComboboxLocalisation_jsx(Champ.Y.Label,null,label,ComboboxLocalisation_jsx(Champ.Y.Label.Complement,null,labelComplement)),ComboboxLocalisation_jsx(Champ.Y.Input,(0,esm_extends.A)({render:Combobox.G,ref,autoComplete:"off",optionsAriaLabel:"localisations",id:inputId,value:userInput,onChange:function onChange(event,newUserInput){getLocalisationDebounced(newUserInput),setUserInput(newUserInput),onChangeProps(event,newUserInput)},requireValidOption:!0,filter:Combobox.G.noFilter},rest),ComboboxLocalisation_jsx(LocalisationOptionsByCategory,{localisations:localisationOptions,optionMessage})),ComboboxLocalisation_jsx(Champ.Y.Error,null),ComboboxLocalisation_jsx("input",{type:"hidden",value:null!==(_matchingOption$nom=null==matchingOption?void 0:matchingOption.nom)&&void 0!==_matchingOption$nom?_matchingOption$nom:"",name:"nomLocalisation"}),ComboboxLocalisation_jsx("input",{type:"hidden",value:null!==(_matchingOption$codeP=null==matchingOption?void 0:matchingOption.codePostal)&&void 0!==_matchingOption$codeP?_matchingOption$codeP:"",name:"codePostalLocalisation"}),ComboboxLocalisation_jsx("input",{type:"hidden",value:null!==(_matchingOption$code=null==matchingOption?void 0:matchingOption.code)&&void 0!==_matchingOption$code?_matchingOption$code:"",name:"codeLocalisation"}),ComboboxLocalisation_jsx("input",{type:"hidden",value:null!==(_matchingOption$type=null==matchingOption?void 0:matchingOption.type)&&void 0!==_matchingOption$type?_matchingOption$type:"",name:"typeLocalisation"}))}));ComboboxLocalisation.__docgenInfo={description:"",methods:[],displayName:"ComboboxLocalisation"};var ComboboxLocalisation_stories_jsx=react.createElement,meta={argTypes:{debounceTimeout:{description:"Temps (en ms) attendu après la dernière saisie avant de lancer la récupération des localisations",table:{defaultValue:{summary:300}}},defaultValue:{description:"Valeur par défaut du combobox"},label:{description:"Libellé affiché devant le combobox"}},args:{},component:ComboboxLocalisation,parameters:{docs:{controls:{exclude:["onFocus","onChange","onBlur","onInput","filter","requireValidOption","valueName"]}}},title:"Components/Form/Combobox/ComboboxLocalisation"},LocalisationServiceStub=function(){return(0,createClass.A)((function LocalisationServiceStub(){(0,classCallCheck.A)(this,LocalisationServiceStub)}),[{key:"rechercherLocalisation",value:(_rechercherLocalisation=(0,asyncToGenerator.A)(regenerator_default().mark((function _callee(query){return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.abrupt("return",new Promise((function(resolve){return setTimeout((function(){return resolve((0,either.MB)({communes:[].filter((function(commune){return commune.nom.toLowerCase().includes(query.toLowerCase())})),departements:[{code:"75",nom:"Paris"}].filter((function(departement){return departement.nom.toLowerCase().includes(query.toLowerCase())})),regions:[].filter((function(region){return region.nom.toLowerCase().includes(query.toLowerCase())}))}))}),1e3)})));case 1:case"end":return _context.stop()}}),_callee)}))),function rechercherLocalisation(_x){return _rechercherLocalisation.apply(this,arguments)})}]);var _rechercherLocalisation}();const ComboboxLocalisation_stories=meta;var exemple={args:{debounceTimeout:300},render:function render(_ref){var args=(0,esm_extends.A)({},((0,objectDestructuringEmpty.A)(_ref),_ref));return ComboboxLocalisation_stories_jsx(dependenciesContainer_context.bH,{localisationService:new LocalisationServiceStub},ComboboxLocalisation_stories_jsx(ComboboxLocalisation,args))}},AvecPlaceholderEtDebounce={args:{debounceTimeout:2e3,placeholder:"Exemple de placeholder"},render:function render(_ref2){var args=(0,esm_extends.A)({},((0,objectDestructuringEmpty.A)(_ref2),_ref2));return ComboboxLocalisation_stories_jsx(dependenciesContainer_context.bH,{localisationService:new LocalisationServiceStub},ComboboxLocalisation_stories_jsx(ComboboxLocalisation,args))}};exemple.parameters={...exemple.parameters,docs:{...exemple.parameters?.docs,source:{originalSource:"{\n  args: {\n    debounceTimeout: 300\n  },\n  render: ({\n    ...args\n  }) => {\n    return <DependenciesProvider localisationService={new LocalisationServiceStub()}>\n                <ComboboxLocalisation {...args} />\n            </DependenciesProvider>;\n  }\n}",...exemple.parameters?.docs?.source}}},AvecPlaceholderEtDebounce.parameters={...AvecPlaceholderEtDebounce.parameters,docs:{...AvecPlaceholderEtDebounce.parameters?.docs,source:{originalSource:"{\n  args: {\n    debounceTimeout: 2000,\n    placeholder: 'Exemple de placeholder'\n  },\n  render: ({\n    ...args\n  }) => {\n    return <DependenciesProvider localisationService={new LocalisationServiceStub()}>\n                <ComboboxLocalisation {...args} />\n            </DependenciesProvider>;\n  }\n}",...AvecPlaceholderEtDebounce.parameters?.docs?.source}}};const __namedExportsOrder=["exemple","AvecPlaceholderEtDebounce"]},"./src/client/context/dependenciesContainer.context.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{bH:()=>DependenciesProvider,fJ:()=>useDependency,jH:()=>DependencyException});var _home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/objectWithoutProperties.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/createClass.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/classCallCheck.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/getPrototypeOf.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/inherits.js"),_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/wrapNativeSuper.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_excluded=["children"],__jsx=react__WEBPACK_IMPORTED_MODULE_1__.createElement;function _callSuper(t,o,e){return o=(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_2__.A)(o),(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_0__.A)(t,_isNativeReflectConstruct()?Reflect.construct(o,e||[],(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_2__.A)(t).constructor):o.apply(t,e))}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function _isNativeReflectConstruct(){return!!t})()}var DependencyException=function(_Error){function DependencyException(key){var _this;return(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__.A)(this,DependencyException),(_this=_callSuper(this,DependencyException,["Dependency ".concat(key," not found")])).name="DependencyException",_this}return(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__.A)(DependencyException,_Error),(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__.A)(DependencyException)}((0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_wrapNativeSuper_js__WEBPACK_IMPORTED_MODULE_6__.A)(Error)),DependenciesContainerContext=(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});function DependenciesProvider(_ref){var children=_ref.children,dependencies=(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_next_dist_compiled_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_7__.A)(_ref,_excluded);return __jsx(DependenciesContainerContext.Provider,{value:dependencies},children)}function useDependency(key){var dependency=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(DependenciesContainerContext)[key];if(!dependency)throw new DependencyException(key);return dependency}DependenciesProvider.__docgenInfo={description:"",methods:[],displayName:"DependenciesProvider"}},"./src/server/errors/either.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function isSuccess(e){return"success"===e.instance}function createSuccess(result){return{instance:"success",result}}__webpack_require__.d(__webpack_exports__,{MB:()=>createSuccess,oJ:()=>isSuccess})},"./src/server/localisations/domain/localisation.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B:()=>TypeLocalisation,f:()=>radiusList});var TypeLocalisation=function(TypeLocalisation){return TypeLocalisation.REGION="REGION",TypeLocalisation.DEPARTEMENT="DEPARTEMENT",TypeLocalisation.COMMUNE="COMMUNE",TypeLocalisation}({}),radiusList=[{libellé:"10 km",valeur:"10"},{libellé:"30 km",valeur:"30"},{libellé:"60 km",valeur:"60"},{libellé:"100 km",valeur:"100"}]},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/classCallCheck.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}__webpack_require__.d(__webpack_exports__,{A:()=>_classCallCheck})},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/createClass.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}__webpack_require__.d(__webpack_exports__,{A:()=>_createClass})},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{A:()=>_defineProperty})},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{A:()=>_extends})},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/getPrototypeOf.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}__webpack_require__.d(__webpack_exports__,{A:()=>_getPrototypeOf})},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/inherits.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>_inherits});var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/setPrototypeOf.js");function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&(0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.A)(subClass,superClass)}},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutProperties})},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/possibleConstructorReturn.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>_possibleConstructorReturn});var helpers_typeof=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/typeof.js"),typeof_default=__webpack_require__.n(helpers_typeof);function _possibleConstructorReturn(self,call){if(call&&("object"===typeof_default()(call)||"function"==typeof call))return call;if(void 0!==call)throw new TypeError("Derived constructors may only return object or undefined");return function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self)}},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/setPrototypeOf.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}__webpack_require__.d(__webpack_exports__,{A:()=>_setPrototypeOf})},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/wrapNativeSuper.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>_wrapNativeSuper});var getPrototypeOf=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/getPrototypeOf.js"),setPrototypeOf=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/setPrototypeOf.js");function _construct(Parent,args,Class){return _construct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()?Reflect.construct:function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var instance=new(Function.bind.apply(Parent,a));return Class&&(0,setPrototypeOf.A)(instance,Class.prototype),instance},_construct.apply(null,arguments)}function _wrapNativeSuper(Class){var _cache="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function _wrapNativeSuper(Class){if(null===Class||!function _isNativeFunction(fn){return-1!==Function.toString.call(fn).indexOf("[native code]")}(Class))return Class;if("function"!=typeof Class)throw new TypeError("Super expression must either be null or a function");if(void 0!==_cache){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper)}function Wrapper(){return _construct(Class,arguments,(0,getPrototypeOf.A)(this).constructor)}return Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),(0,setPrototypeOf.A)(Wrapper,Class)},_wrapNativeSuper(Class)}},"./node_modules/next/dist/compiled/@babel/runtime/helpers/typeof.js":module=>{function _typeof(obj){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(module.exports=_typeof=function _typeof(obj){return typeof obj},module.exports.default=module.exports,module.exports.__esModule=!0):(module.exports=_typeof=function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},module.exports.default=module.exports,module.exports.__esModule=!0),_typeof(obj)}module.exports=_typeof,module.exports.default=module.exports,module.exports.__esModule=!0}}]);