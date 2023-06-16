/*! For license information please see client-components-ui-Carousel-Carousel-stories.24c6a434.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[1426,3414],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty});var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");function _defineProperty(obj,key,value){return(key=(0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__.Z)(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties})},"./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_toPropertyKey});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}},"./node_modules/@babel/runtime/helpers/esm/typeof.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}__webpack_require__.d(__webpack_exports__,{Z:()=>_typeof})},"./src/client/components/ui/Carousel/Carousel.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,default:()=>Carousel_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_image=__webpack_require__("./node_modules/next/image.js"),image_default=__webpack_require__.n(next_image),react=__webpack_require__("./node_modules/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Controls_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Controls.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Controls_module.Z,options);const Carousel_Controls_module=Controls_module.Z&&Controls_module.Z.locals?Controls_module.Z.locals:void 0;var Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),__jsx=react.createElement,Controls=function Controls(props){var goToPreviousSlide=props.goToPreviousSlide,goToNextSlide=props.goToNextSlide;return __jsx("ul",{"aria-label":"contrôles"},__jsx("li",null,__jsx("button",{type:"button",title:"image précédente",onClick:function onClick(){return goToPreviousSlide()},className:classnames_default()(Carousel_Controls_module.controls,Carousel_Controls_module.controlsPrevious)},__jsx(Icon.J,{name:"angle-left"}))),__jsx("li",null,__jsx("button",{type:"button",title:"image suivante",onClick:function onClick(){return goToNextSlide()},className:classnames_default()(Carousel_Controls_module.controls,Carousel_Controls_module.controlsNext)},__jsx(Icon.J,{name:"angle-right"}))))};Controls.displayName="Controls",Controls.__docgenInfo={description:"",methods:[],displayName:"Controls",props:{goToPreviousSlide:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToNextSlide:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};try{Controls.displayName="Controls",Controls.__docgenInfo={description:"",displayName:"Controls",props:{goToPreviousSlide:{defaultValue:null,description:"",name:"goToPreviousSlide",required:!0,type:{name:"() => void"}},goToNextSlide:{defaultValue:null,description:"",name:"goToNextSlide",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Carousel/Controls.tsx#Controls"]={docgenInfo:Controls.__docgenInfo,name:"Controls",path:"src/client/components/ui/Carousel/Controls.tsx#Controls"})}catch(__react_docgen_typescript_loader_error){}var Indicators_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Indicators.module.scss"),Indicators_module_options={};Indicators_module_options.styleTagTransform=styleTagTransform_default(),Indicators_module_options.setAttributes=setAttributesWithoutAttributes_default(),Indicators_module_options.insert=insertBySelector_default().bind(null,"head"),Indicators_module_options.domAPI=styleDomAPI_default(),Indicators_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Indicators_module.Z,Indicators_module_options);const Carousel_Indicators_module=Indicators_module.Z&&Indicators_module.Z.locals?Indicators_module.Z.locals:void 0;var Indicators_jsx=react.createElement,Indicators=function Indicators(props){var goToSelectedSlide=props.goToSelectedSlide,imageList=props.imageList,numberOfImages=props.numberOfImages,currentSlideIndex=props.currentSlideIndex;return Indicators_jsx("ul",{"aria-label":"indicateurs",className:Carousel_Indicators_module.indicators},imageList.map((function(image,index){return Indicators_jsx("li",{key:index,"aria-current":index===currentSlideIndex},Indicators_jsx("button",{type:"button",title:"Afficher l‘image ".concat(index+1," sur ").concat(numberOfImages),onClick:function onClick(){return goToSelectedSlide(index)},className:classnames_default()(Carousel_Indicators_module.indicator,(0,defineProperty.Z)({},Carousel_Indicators_module.indicatorActive,index===currentSlideIndex))},index===currentSlideIndex&&Indicators_jsx("span",{className:"sr-only"},"(current slide)"),Indicators_jsx("span",{className:"sr-only"},image.alt)))})))};Indicators.displayName="Indicators",Indicators.__docgenInfo={description:"",methods:[],displayName:"Indicators",props:{goToSelectedSlide:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{name:"index",type:{name:"number"}}],return:{name:"void"}}},description:""},imageList:{required:!0,tsType:{name:"Array",elements:[{name:"Image"}],raw:"Array<Image>"},description:""},numberOfImages:{required:!0,tsType:{name:"number"},description:""},currentSlideIndex:{required:!0,tsType:{name:"number"},description:""}}};try{Indicators.displayName="Indicators",Indicators.__docgenInfo={description:"",displayName:"Indicators",props:{goToSelectedSlide:{defaultValue:null,description:"",name:"goToSelectedSlide",required:!0,type:{name:"(index: number) => void"}},imageList:{defaultValue:null,description:"",name:"imageList",required:!0,type:{name:"Image[]"}},numberOfImages:{defaultValue:null,description:"",name:"numberOfImages",required:!0,type:{name:"number"}},currentSlideIndex:{defaultValue:null,description:"",name:"currentSlideIndex",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Carousel/Indicators.tsx#Indicators"]={docgenInfo:Indicators.__docgenInfo,name:"Indicators",path:"src/client/components/ui/Carousel/Indicators.tsx#Indicators"})}catch(__react_docgen_typescript_loader_error){}var LiveRegion_jsx=react.createElement,LiveRegion=function LiveRegion(props){var currentSlideIndex=props.currentSlideIndex,numberOfImages=props.numberOfImages;return LiveRegion_jsx("div",{"aria-live":"polite","aria-atomic":!0,className:"sr-only"},"Image ",currentSlideIndex+1," sur ",numberOfImages)};LiveRegion.displayName="LiveRegion",LiveRegion.__docgenInfo={description:"",methods:[],displayName:"LiveRegion",props:{currentSlideIndex:{required:!0,tsType:{name:"number"},description:""},numberOfImages:{required:!0,tsType:{name:"number"},description:""}}};try{LiveRegion.displayName="LiveRegion",LiveRegion.__docgenInfo={description:"",displayName:"LiveRegion",props:{currentSlideIndex:{defaultValue:null,description:"",name:"currentSlideIndex",required:!0,type:{name:"number"}},numberOfImages:{defaultValue:null,description:"",name:"numberOfImages",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Carousel/LiveRegion.tsx#LiveRegion"]={docgenInfo:LiveRegion.__docgenInfo,name:"LiveRegion",path:"src/client/components/ui/Carousel/LiveRegion.tsx#LiveRegion"})}catch(__react_docgen_typescript_loader_error){}var Slide_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Slide.module.scss"),Slide_module_options={};Slide_module_options.styleTagTransform=styleTagTransform_default(),Slide_module_options.setAttributes=setAttributesWithoutAttributes_default(),Slide_module_options.insert=insertBySelector_default().bind(null,"head"),Slide_module_options.domAPI=styleDomAPI_default(),Slide_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Slide_module.Z,Slide_module_options);const Carousel_Slide_module=Slide_module.Z&&Slide_module.Z.locals?Slide_module.Z.locals:void 0;var Slide_jsx=react.createElement,Slide=function Slide(props){var index=props.index,currentSlideIndex=props.currentSlideIndex,isLastSlide=props.isLastSlide,isFirstSlide=props.isFirstSlide,numberOfImages=props.numberOfImages,image=props.image,isInTransition=props.isInTransition,setIsInTransition=props.setIsInTransition,direction=props.direction,setDirection=props.setDirection,isAnimated=props.isAnimated,imagesSize=props.imagesSize,isCurrentSlide=(0,react.useMemo)((function(){return index===currentSlideIndex}),[index,currentSlideIndex]),isNextSlide=(0,react.useMemo)((function(){return isLastSlide&&0===index||index===currentSlideIndex+1}),[isLastSlide,index,currentSlideIndex]),isPreviousSlide=(0,react.useMemo)((function(){return isFirstSlide&&index+1===numberOfImages||index===currentSlideIndex-1}),[isFirstSlide,index,numberOfImages,currentSlideIndex]);return Slide_jsx("li",{key:index,"aria-current":isCurrentSlide,"aria-hidden":!isCurrentSlide,"aria-roledescription":"slide",onTransitionEnd:function onTransitionEnd(){setIsInTransition(!1),setDirection(null)},className:classnames_default()(Carousel_Slide_module.slide,(0,defineProperty.Z)({},Carousel_Slide_module.next,isNextSlide),(0,defineProperty.Z)({},Carousel_Slide_module.prev,isPreviousSlide),(0,defineProperty.Z)({},Carousel_Slide_module.current,isCurrentSlide),(0,defineProperty.Z)({},Carousel_Slide_module.nextInTransition,isNextSlide&&"next"===direction&&isInTransition),(0,defineProperty.Z)({},Carousel_Slide_module.prevInTransition,isPreviousSlide&&"previous"===direction&&isInTransition),(0,defineProperty.Z)({},Carousel_Slide_module.transition,isAnimated))},Slide_jsx(image_default(),{src:image.src,alt:image.alt,width:imagesSize.width,height:imagesSize.height}))};Slide.displayName="Slide",Slide.__docgenInfo={description:"",methods:[],displayName:"Slide",props:{index:{required:!0,tsType:{name:"number"},description:""},currentSlideIndex:{required:!0,tsType:{name:"number"},description:""},isLastSlide:{required:!0,tsType:{name:"boolean"},description:""},isFirstSlide:{required:!0,tsType:{name:"boolean"},description:""},numberOfImages:{required:!0,tsType:{name:"number"},description:""},image:{required:!0,tsType:{name:"ImageProps"},description:""},isInTransition:{required:!0,tsType:{name:"boolean"},description:""},setIsInTransition:{required:!0,tsType:{name:"signature",type:"function",raw:"(isInTransition: boolean) => void",signature:{arguments:[{name:"isInTransition",type:{name:"boolean"}}],return:{name:"void"}}},description:""},direction:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},setDirection:{required:!0,tsType:{name:"signature",type:"function",raw:"(direction: Direction) => void",signature:{arguments:[{name:"direction",type:{name:"Direction"}}],return:{name:"void"}}},description:""},isAnimated:{required:!0,tsType:{name:"boolean"},description:""},imagesSize:{required:!0,tsType:{name:"signature",type:"object",raw:"{ width: number, height: number }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:""}}};try{Slide.displayName="Slide",Slide.__docgenInfo={description:"",displayName:"Slide",props:{index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},currentSlideIndex:{defaultValue:null,description:"",name:"currentSlideIndex",required:!0,type:{name:"number"}},isLastSlide:{defaultValue:null,description:"",name:"isLastSlide",required:!0,type:{name:"boolean"}},isFirstSlide:{defaultValue:null,description:"",name:"isFirstSlide",required:!0,type:{name:"boolean"}},numberOfImages:{defaultValue:null,description:"",name:"numberOfImages",required:!0,type:{name:"number"}},image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"Image"}},isInTransition:{defaultValue:null,description:"",name:"isInTransition",required:!0,type:{name:"boolean"}},setIsInTransition:{defaultValue:null,description:"",name:"setIsInTransition",required:!0,type:{name:"(isInTransition: boolean) => void"}},direction:{defaultValue:null,description:"",name:"direction",required:!0,type:{name:"string | null"}},setDirection:{defaultValue:null,description:"",name:"setDirection",required:!0,type:{name:"(direction: Direction) => void"}},isAnimated:{defaultValue:null,description:"",name:"isAnimated",required:!0,type:{name:"boolean"}},imagesSize:{defaultValue:null,description:"",name:"imagesSize",required:!0,type:{name:"{ width: number; height: number; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Carousel/Slide.tsx#Slide"]={docgenInfo:Slide.__docgenInfo,name:"Slide",path:"src/client/components/ui/Carousel/Slide.tsx#Slide"})}catch(__react_docgen_typescript_loader_error){}var Carousel_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Carousel.module.scss"),Carousel_module_options={};Carousel_module_options.styleTagTransform=styleTagTransform_default(),Carousel_module_options.setAttributes=setAttributesWithoutAttributes_default(),Carousel_module_options.insert=insertBySelector_default().bind(null,"head"),Carousel_module_options.domAPI=styleDomAPI_default(),Carousel_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Carousel_module.Z,Carousel_module_options);const Carousel_Carousel_module=Carousel_module.Z&&Carousel_module.Z.locals?Carousel_module.Z.locals:void 0;var _Example$parameters,_Example$parameters2,_Example$parameters2$,_excluded=["imageList","imageListLabel","imagesSize","hideIndicators","className"],Carousel_jsx=react.createElement;function Carousel(props){var imageList=props.imageList,imageListLabel=props.imageListLabel,imagesSize=props.imagesSize,_props$hideIndicators=props.hideIndicators,hideIndicators=void 0!==_props$hideIndicators&&_props$hideIndicators,className=props.className,rest=(0,objectWithoutProperties.Z)(props,_excluded),_classNames=classnames_default()(className,Carousel_Carousel_module.carousel),numberOfImages=imageList.length,_useState=(0,react.useState)(0),currentSlideIndex=_useState[0],setCurrentSlideIndex=_useState[1],_useState2=(0,react.useState)(!1),isInTransition=_useState2[0],setIsInTransition=_useState2[1],_useState3=(0,react.useState)(null),direction=_useState3[0],setDirection=_useState3[1],_useState4=(0,react.useState)(!0),isAnimated=_useState4[0],setIsAnimated=_useState4[1],isLastSlide=currentSlideIndex+1===numberOfImages,isFirstSlide=0===currentSlideIndex,goToPreviousSlide=(0,react.useCallback)((function(){setIsAnimated(!0),setCurrentSlideIndex(isFirstSlide?numberOfImages-1:currentSlideIndex-1),setIsInTransition(!0),setDirection("next")}),[currentSlideIndex,isFirstSlide,numberOfImages]),goToNextSlide=(0,react.useCallback)((function(){setIsAnimated(!0),setCurrentSlideIndex(isLastSlide?0:currentSlideIndex+1),setIsInTransition(!0),setDirection("previous")}),[currentSlideIndex,isLastSlide]),goToSelectedSlide=(0,react.useCallback)((function(index){setIsAnimated(!1),setCurrentSlideIndex(index)}),[]);return 0===numberOfImages?null:1===numberOfImages?Carousel_jsx(image_default(),{src:imageList[0].src,alt:imageList[0].alt,width:imagesSize.width,height:imagesSize.height}):Carousel_jsx("div",(0,esm_extends.Z)({"aria-roledescription":"carousel",role:"group",className:_classNames},rest),Carousel_jsx("ul",{"aria-label":imageListLabel},imageList.map((function(image,index){return Carousel_jsx(Slide,{key:index,index,currentSlideIndex,isFirstSlide,isLastSlide,numberOfImages,image,isInTransition,setIsInTransition,direction,setDirection,isAnimated,imagesSize})}))),Carousel_jsx(Controls,{goToPreviousSlide,goToNextSlide}),!hideIndicators&&Carousel_jsx(Indicators,{goToSelectedSlide,imageList,currentSlideIndex,numberOfImages}),Carousel_jsx(LiveRegion,{currentSlideIndex,numberOfImages}))}Carousel.displayName="Carousel",Carousel.__docgenInfo={description:"",methods:[],displayName:"Carousel",props:{imageList:{required:!0,tsType:{name:"Array",elements:[{name:"ImageProps"}],raw:"Array<ImageProps>"},description:""},imageListLabel:{required:!0,tsType:{name:"string"},description:""},hideIndicators:{required:!1,tsType:{name:"boolean"},description:""},imagesSize:{required:!0,tsType:{name:"signature",type:"object",raw:"{ width: number, height: number }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:""}}};try{Carousel.displayName="Carousel",Carousel.__docgenInfo={description:"",displayName:"Carousel",props:{imageList:{defaultValue:null,description:"",name:"imageList",required:!0,type:{name:"Image[]"}},imageListLabel:{defaultValue:null,description:"",name:"imageListLabel",required:!0,type:{name:"string"}},hideIndicators:{defaultValue:null,description:"",name:"hideIndicators",required:!1,type:{name:"boolean"}},imagesSize:{defaultValue:null,description:"",name:"imagesSize",required:!0,type:{name:"{ width: number; height: number; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Carousel/Carousel.tsx#Carousel"]={docgenInfo:Carousel.__docgenInfo,name:"Carousel",path:"src/client/components/ui/Carousel/Carousel.tsx#Carousel"})}catch(__react_docgen_typescript_loader_error){}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Carousel_stories={component:Carousel,title:"Components/Carousel"};var Example={args:{imageList:[{alt:"",src:"/images/accompagnement.webp"},{alt:"",src:"/images/accompagnement.webp"},{alt:"",src:"/images/accompagnement.webp"}],imageListLabel:"liste de photo d´illustration",imagesSize:{height:109,width:34}}};Example.parameters=_objectSpread(_objectSpread({},Example.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Example$parameters=Example.parameters)||void 0===_Example$parameters?void 0:_Example$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    imageList: [{\n      alt: '',\n      src: '/images/accompagnement.webp'\n    }, {\n      alt: '',\n      src: '/images/accompagnement.webp'\n    }, {\n      alt: '',\n      src: '/images/accompagnement.webp'\n    }],\n    imageListLabel: 'liste de photo d´illustration',\n    imagesSize: {\n      height: 109,\n      width: 34\n    }\n  }\n}"},null===(_Example$parameters2=Example.parameters)||void 0===_Example$parameters2||null===(_Example$parameters2$=_Example$parameters2.docs)||void 0===_Example$parameters2$?void 0:_Example$parameters2$.source)})})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Carousel.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".kIuKIIXU0JkT_uIGrFUr{position:relative;overflow:hidden;width:100%;height:25rem}.kIuKIIXU0JkT_uIGrFUr img{width:100%;height:100%;object-fit:cover;object-position:center}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Carousel.module.scss"],names:[],mappings:"AAEA,sBACE,iBAAA,CACA,eAAA,CACA,UAAA,CACA,YAAA,CAEA,0BACE,UAAA,CACA,WAAA,CACA,gBAAA,CACA,sBAAA",sourcesContent:['@use "@styles/utilities";\n\n.carousel {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  height: 25rem;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n  }\n}\n\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={carousel:"kIuKIIXU0JkT_uIGrFUr"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Controls.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".YI9Zj82RS2_jEOdoiHs4{z-index:10;background-color:#fff;color:#566bb1;width:1.5rem;height:1.5rem;border-radius:50%;position:absolute;padding:0;top:calc(50% - 10px)}.YI9Zj82RS2_jEOdoiHs4>svg{height:1.5rem}.SNfjQFOTBGgMv5ka8S8j{left:.5rem}.epfnZMTD722ufrisWH5D{right:.5rem}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Controls.module.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AAEA,sBACE,UAAA,CACA,qBCgBM,CDfN,aAAA,CACA,YAAA,CACA,aAAA,CACA,iBAAA,CACA,iBAAA,CACA,SAAA,CACA,oBAAA,CACA,0BACE,aAAA,CAEF,sBACE,UAAA,CAEF,sBACE,WAAA",sourcesContent:['@use "@styles/utilities";\n\n.controls {\n  z-index: 10;\n  background-color: utilities.$color-surface;\n  color: utilities.$color-primary;\n  width: 1.50rem;\n  height: 1.50rem;\n  border-radius: 50%;\n  position: absolute;\n  padding: 0;\n  top: calc(50% - 20px/2);\n  > svg {\n    height: 1.50rem;\n  }\n  &Previous {\n    left: 0.5rem;\n  }\n  &Next {\n    right: 0.5rem;\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={controls:"YI9Zj82RS2_jEOdoiHs4",controlsPrevious:"SNfjQFOTBGgMv5ka8S8j",controlsNext:"epfnZMTD722ufrisWH5D"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Indicators.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".RlbvoG_bCRLqKlL3Mwf8{z-index:10;display:inline-flex;gap:.5rem;position:absolute;bottom:10px;left:50%;transform:translate(-50%, 0)}.RlbvoG_bCRLqKlL3Mwf8 .ssroO17giw9hQYXwHMcn{background-color:#fff;width:.5rem;height:.5rem;padding:0;border-radius:50%;border:1px solid #fff}.RlbvoG_bCRLqKlL3Mwf8 .t62BToSPm_ErtvZJNDhv{background-color:#566bb1}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Indicators.module.scss","webpack://./src/styles/theme/_variables.scss"],names:[],mappings:"AAEA,sBACE,UAAA,CACA,mBAAA,CACA,SAAA,CACA,iBAAA,CACA,WAAA,CACA,QAAA,CACA,4BAAA,CAEA,4CACE,qBCQI,CDPJ,WAAA,CACA,YAAA,CACA,SAAA,CACA,iBAAA,CACA,qBAAA,CACA,4CACE,wBCdM",sourcesContent:['@use "@styles/utilities";\n\n.indicators {\n  z-index: 10;\n  display: inline-flex;\n  gap: 0.5rem;\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  transform: translate(-50%, 0);\n\n  .indicator {\n    background-color: utilities.$color-surface;\n    width: 0.50rem;\n    height: 0.50rem;\n    padding: 0;\n    border-radius: 50%;\n    border: 1px solid utilities.$color-surface;\n    &Active {\n      background-color: utilities.$color-primary;\n    }\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={indicators:"RlbvoG_bCRLqKlL3Mwf8",indicator:"ssroO17giw9hQYXwHMcn",indicatorActive:"t62BToSPm_ErtvZJNDhv"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Carousel/Slide.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".rSfk4rvz32ccSBYZO4wq{position:absolute;width:100%;height:100%;visibility:hidden}.rSfk4rvz32ccSBYZO4wq img{height:auto}.rSfk4rvz32ccSBYZO4wq.UFRGSO7AlqO6MvHhbVPO{visibility:visible;z-index:4;left:0}.rSfk4rvz32ccSBYZO4wq.xTpdg9lNiaTJUND3dn2f{left:100%}.rSfk4rvz32ccSBYZO4wq.sypOje8RdW_oeIb25xrX{left:-100%}.rSfk4rvz32ccSBYZO4wq.h0GT9FmAhcmouqywDD8b,.rSfk4rvz32ccSBYZO4wq.Lu4rsk7aOW_rCdWMEGxn{visibility:visible}.COLGww6QzNcIjJG3pqj0{transition:left .25s linear}@media(prefers-reduced-motion: reduce){.rSfk4rvz32ccSBYZO4wq{transition:none}}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Slide.module.scss"],names:[],mappings:"AAEA,sBACE,iBAAA,CACA,UAAA,CACA,WAAA,CACA,iBAAA,CAEA,0BACE,WAAA,CAIJ,2CACE,kBAAA,CACA,SAAA,CACA,MAAA,CAGF,2CACE,SAAA,CAGF,2CACE,UAAA,CAGF,sFAEE,kBAAA,CAGF,sBACE,2BAAA,CAGF,uCACE,sBACE,eAAA,CAAA",sourcesContent:['@use "@styles/utilities";\n\n.slide {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n\n  img {\n    height: auto;\n  }\n}\n\n.slide.current {\n  visibility: visible;\n  z-index: 4;\n  left: 0;\n}\n\n.slide.next {\n  left: 100%;\n}\n\n.slide.prev {\n  left: -100%;\n}\n\n.slide.prevInTransition,\n.slide.nextInTransition,{\n  visibility: visible;\n}\n\n.transition {\n  transition: left .25s linear;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .slide {\n    transition: none;\n  }\n}\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={slide:"rSfk4rvz32ccSBYZO4wq",current:"UFRGSO7AlqO6MvHhbVPO",next:"xTpdg9lNiaTJUND3dn2f",prev:"sypOje8RdW_oeIb25xrX",prevInTransition:"h0GT9FmAhcmouqywDD8b",nextInTransition:"Lu4rsk7aOW_rCdWMEGxn",transition:"COLGww6QzNcIjJG3pqj0"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);