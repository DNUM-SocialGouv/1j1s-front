/*! For license information please see client-components-ui-TextIcon-TextIcon-stories.3c650c25.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[2960,3414],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty});var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");function _defineProperty(obj,key,value){return(key=(0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__.Z)(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties})},"./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_toPropertyKey});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}},"./node_modules/@babel/runtime/helpers/esm/typeof.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}__webpack_require__.d(__webpack_exports__,{Z:()=>_typeof})},"./src/client/components/ui/TextIcon/TextIcon.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Example$parameters,_Example$parameters2,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_1j1s_front_1j1s_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/TextIcon/TextIcon.tsx").V,title:"Components/TextIcon"};var Example={args:{children:"Contacter l'agence",icon:"mail"}};Example.parameters=_objectSpread(_objectSpread({},Example.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Example$parameters=Example.parameters)||void 0===_Example$parameters?void 0:_Example$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    children: \"Contacter l'agence\",\n    icon: 'mail'\n  }\n}"},null===(_Example$parameters2=Example.parameters)||void 0===_Example$parameters2||null===(_Example$parameters2=_Example$parameters2.docs)||void 0===_Example$parameters2?void 0:_Example$parameters2.source)})})},"./src/client/components/ui/TextIcon/TextIcon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{V:()=>TextIcon});var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),react=__webpack_require__("./node_modules/react/index.js"),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),TextIcon_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/TextIcon/TextIcon.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(TextIcon_module.Z,options);const TextIcon_TextIcon_module=TextIcon_module.Z&&TextIcon_module.Z.locals?TextIcon_module.Z.locals:void 0;var __jsx=react.createElement;function TextIcon(_ref){var children=_ref.children,icon=_ref.icon,className=_ref.className,_ref$iconPosition=_ref.iconPosition,iconPosition=void 0===_ref$iconPosition?"right":_ref$iconPosition,_classNames=classnames_default()(TextIcon_TextIcon_module.textIcon,"right"===iconPosition?TextIcon_TextIcon_module.spaceForRightIcon:TextIcon_TextIcon_module.spaceForLeftIcon,className);return __jsx("span",{className:_classNames},"left"===iconPosition?__jsx(react.Fragment,null,__jsx(Icon.J,{name:icon})," ",children):__jsx(react.Fragment,null,children," ",__jsx(Icon.J,{name:icon})))}TextIcon.displayName="TextIcon",TextIcon.__docgenInfo={description:"",methods:[],displayName:"TextIcon",props:{iconPosition:{defaultValue:{value:"'right'",computed:!1},required:!1,tsType:{name:"union",raw:"'right' | 'left'",elements:[{name:"literal",value:"'right'"},{name:"literal",value:"'left'"}]},description:""},icon:{required:!0,tsType:{name:"IconName"},description:""}},composes:["Pick"]};try{TextIcon.displayName="TextIcon",TextIcon.__docgenInfo={description:"",displayName:"TextIcon",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"enum",value:[{value:'"menu"'},{value:'"table"'},{value:'"filter"'},{value:'"close"'},{value:'"account"'},{value:'"angle-down"'},{value:'"angle-left"'},{value:'"angle-left-from-line"'},{value:'"angle-right"'},{value:'"angle-right-from-line"'},{value:'"angle-up"'},{value:'"arrow-left"'},{value:'"arrow-right"'},{value:'"arrow-up"'},{value:'"award"'},{value:'"bed"'},{value:'"bike"'},{value:'"book"'},{value:'"brief-case"'},{value:'"burger-menu"'},{value:'"burger-menu-left"'},{value:'"check-line"'},{value:'"car"'},{value:'"clean-hands"'},{value:'"community"'},{value:'"compass"'},{value:'"error"'},{value:'"euro"'},{value:'"exit"'},{value:'"external-redirection"'},{value:'"home"'},{value:'"information"'},{value:'"iron"'},{value:'"lock"'},{value:'"magnifying-glass"'},{value:'"mail"'},{value:'"map-pin"'},{value:'"mark-pen"'},{value:'"microwave"'},{value:'"phone"'},{value:'"plant"'},{value:'"play-circle"'},{value:'"restaurant"'},{value:'"roadmap"'},{value:'"sport"'},{value:'"suitcase"'},{value:'"sun"'},{value:'"swimming"'},{value:'"temperature"'},{value:'"thumb-up"'},{value:'"trophy"'},{value:'"TV"'},{value:'"user"'},{value:'"vacuum"'},{value:'"washing-machine"'},{value:'"wifi"'}]}},iconPosition:{defaultValue:{value:"right"},description:"",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/TextIcon/TextIcon.tsx#TextIcon"]={docgenInfo:TextIcon.__docgenInfo,name:"TextIcon",path:"src/client/components/ui/TextIcon/TextIcon.tsx#TextIcon"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/TextIcon/TextIcon.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ltiWnP2kNJlye8mHoZxc{display:inline-flex;align-items:center;align-self:flex-end;white-space:nowrap}.ltiWnP2kNJlye8mHoZxc svg{vertical-align:text-bottom}.rgXboJY5ITqgFpyvFNjv svg{margin-left:.5ch}.vuUU56H5nj2x1RdsRpPL svg{margin-right:.5ch}","",{version:3,sources:["webpack://./src/client/components/ui/TextIcon/TextIcon.module.scss"],names:[],mappings:"AAAA,sBACE,mBAAA,CACA,kBAAA,CACA,mBAAA,CACA,kBAAA,CAEA,0BACE,0BAAA,CAKF,0BACE,gBAAA,CAKF,0BACE,iBAAA",sourcesContent:[".textIcon {\n  display: inline-flex;\n  align-items: center;\n  align-self: flex-end;\n  white-space: nowrap;\n\n  svg {\n    vertical-align: text-bottom;\n  }\n}\n\n.spaceForRightIcon {\n  svg {\n    margin-left: 0.5ch;\n  }\n}\n\n.spaceForLeftIcon {\n  svg {\n    margin-right: 0.5ch;\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={textIcon:"ltiWnP2kNJlye8mHoZxc",spaceForRightIcon:"rgXboJY5ITqgFpyvFNjv",spaceForLeftIcon:"vuUU56H5nj2x1RdsRpPL"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);