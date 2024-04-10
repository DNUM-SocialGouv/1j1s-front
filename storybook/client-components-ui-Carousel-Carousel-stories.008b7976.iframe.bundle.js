/*! For license information please see client-components-ui-Carousel-Carousel-stories.008b7976.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[596],{"./src/client/components/ui/Carousel/Carousel.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Carousel_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),next_image=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Controls_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Controls.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Controls_module.A,options);const Carousel_Controls_module=Controls_module.A&&Controls_module.A.locals?Controls_module.A.locals:void 0;var Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx");const Controls=props=>{const{goToPreviousSlide,goToNextSlide}=props;return(0,jsx_runtime.jsxs)("ul",{"aria-label":"contrôles",children:[(0,jsx_runtime.jsx)("li",{children:(0,jsx_runtime.jsx)("button",{type:"button",title:"image précédente",onClick:()=>goToPreviousSlide(),className:classnames_default()(Carousel_Controls_module.controls,Carousel_Controls_module.controlsPrevious),children:(0,jsx_runtime.jsx)(Icon.I,{name:"angle-left"})})}),(0,jsx_runtime.jsx)("li",{children:(0,jsx_runtime.jsx)("button",{type:"button",title:"image suivante",onClick:()=>goToNextSlide(),className:classnames_default()(Carousel_Controls_module.controls,Carousel_Controls_module.controlsNext),children:(0,jsx_runtime.jsx)(Icon.I,{name:"angle-right"})})})]})};Controls.__docgenInfo={description:"",methods:[],displayName:"Controls",props:{goToPreviousSlide:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},goToNextSlide:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};var Indicators_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Indicators.module.scss"),Indicators_module_options={};Indicators_module_options.styleTagTransform=styleTagTransform_default(),Indicators_module_options.setAttributes=setAttributesWithoutAttributes_default(),Indicators_module_options.insert=insertBySelector_default().bind(null,"head"),Indicators_module_options.domAPI=styleDomAPI_default(),Indicators_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Indicators_module.A,Indicators_module_options);const Carousel_Indicators_module=Indicators_module.A&&Indicators_module.A.locals?Indicators_module.A.locals:void 0;var Slide_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Slide.module.scss"),Slide_module_options={};Slide_module_options.styleTagTransform=styleTagTransform_default(),Slide_module_options.setAttributes=setAttributesWithoutAttributes_default(),Slide_module_options.insert=insertBySelector_default().bind(null,"head"),Slide_module_options.domAPI=styleDomAPI_default(),Slide_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Slide_module.A,Slide_module_options);const Carousel_Slide_module=Slide_module.A&&Slide_module.A.locals?Slide_module.A.locals:void 0;function defaultAlternative(index,numberOfImages){return"".concat(index+1," sur ").concat(numberOfImages)}const Slide=props=>{const{index,currentSlideIndex,isLastSlide,isFirstSlide,numberOfImages,image,isInTransition,setIsInTransition,direction,setDirection,isAnimated,imagesSize}=props,isCurrentSlide=(0,react.useMemo)((()=>index===currentSlideIndex),[index,currentSlideIndex]),isNextSlide=(0,react.useMemo)((()=>isLastSlide&&0===index||index===currentSlideIndex+1),[isLastSlide,index,currentSlideIndex]),isPreviousSlide=(0,react.useMemo)((()=>isFirstSlide&&index+1===numberOfImages||index===currentSlideIndex-1),[isFirstSlide,index,numberOfImages,currentSlideIndex]);return(0,jsx_runtime.jsx)("li",{"aria-current":isCurrentSlide,"aria-hidden":!isCurrentSlide,"aria-roledescription":"slide",role:"group","aria-label":"Image ".concat(defaultAlternative(index,numberOfImages)),onTransitionEnd:()=>{setIsInTransition(!1),setDirection(null)},className:classnames_default()(Carousel_Slide_module.slide,{[Carousel_Slide_module.next]:isNextSlide},{[Carousel_Slide_module.prev]:isPreviousSlide},{[Carousel_Slide_module.current]:isCurrentSlide},{[Carousel_Slide_module.nextInTransition]:isNextSlide&&"next"===direction&&isInTransition},{[Carousel_Slide_module.prevInTransition]:isPreviousSlide&&"previous"===direction&&isInTransition},{[Carousel_Slide_module.transition]:isAnimated}),children:(0,jsx_runtime.jsx)(next_image.A,{src:image.src,alt:image.alt||defaultAlternative(index,numberOfImages),width:imagesSize.width,height:imagesSize.height})},index)};Slide.__docgenInfo={description:"",methods:[],displayName:"Slide",props:{index:{required:!0,tsType:{name:"number"},description:""},currentSlideIndex:{required:!0,tsType:{name:"number"},description:""},isLastSlide:{required:!0,tsType:{name:"boolean"},description:""},isFirstSlide:{required:!0,tsType:{name:"boolean"},description:""},numberOfImages:{required:!0,tsType:{name:"number"},description:""},image:{required:!0,tsType:{name:"ImageProps"},description:""},isInTransition:{required:!0,tsType:{name:"boolean"},description:""},setIsInTransition:{required:!0,tsType:{name:"signature",type:"function",raw:"(isInTransition: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isInTransition"}],return:{name:"void"}}},description:""},direction:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},setDirection:{required:!0,tsType:{name:"signature",type:"function",raw:"(direction: Direction) => void",signature:{arguments:[{type:{name:"union",raw:"'next' | 'previous' | null",elements:[{name:"literal",value:"'next'"},{name:"literal",value:"'previous'"},{name:"null"}]},name:"direction"}],return:{name:"void"}}},description:""},isAnimated:{required:!0,tsType:{name:"boolean"},description:""},imagesSize:{required:!0,tsType:{name:"signature",type:"object",raw:"{ width: number, height: number }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:""}}};const Indicators=props=>{const{goToSelectedSlide,imageList,numberOfImages,currentSlideIndex}=props;return(0,jsx_runtime.jsx)("ul",{"aria-label":"Sélectionner l’image à afficher",role:"group",className:Carousel_Indicators_module.indicators,children:imageList.map(((image,index)=>(0,jsx_runtime.jsx)("li",{children:(0,jsx_runtime.jsx)("button",{type:"button",onClick:()=>goToSelectedSlide(index),"aria-disabled":index===currentSlideIndex||void 0,className:classnames_default()(Carousel_Indicators_module.indicator,{[Carousel_Indicators_module.indicatorActive]:index===currentSlideIndex}),children:(0,jsx_runtime.jsx)("span",{className:"sr-only",children:"Image ".concat(defaultAlternative(index,numberOfImages))})})},index)))})};Indicators.__docgenInfo={description:"",methods:[],displayName:"Indicators",props:{goToSelectedSlide:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},imageList:{required:!0,tsType:{name:"Array",elements:[{name:"Image"}],raw:"Array<Image>"},description:""},numberOfImages:{required:!0,tsType:{name:"number"},description:""},currentSlideIndex:{required:!0,tsType:{name:"number"},description:""}}};var Carousel_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Carousel.module.scss"),Carousel_module_options={};Carousel_module_options.styleTagTransform=styleTagTransform_default(),Carousel_module_options.setAttributes=setAttributesWithoutAttributes_default(),Carousel_module_options.insert=insertBySelector_default().bind(null,"head"),Carousel_module_options.domAPI=styleDomAPI_default(),Carousel_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Carousel_module.A,Carousel_module_options);const Carousel_Carousel_module=Carousel_module.A&&Carousel_module.A.locals?Carousel_module.A.locals:void 0;function Carousel(props){const{imageList,imagesSize,hideIndicators=!1,className,...rest}=props,_classNames=classnames_default()(className,Carousel_Carousel_module.carousel),numberOfImages=imageList.length,[currentSlideIndex,setCurrentSlideIndex]=(0,react.useState)(0),[isInTransition,setIsInTransition]=(0,react.useState)(!1),[direction,setDirection]=(0,react.useState)(null),[isAnimated,setIsAnimated]=(0,react.useState)(!0),isLastSlide=currentSlideIndex+1===numberOfImages,isFirstSlide=0===currentSlideIndex,goToPreviousSlide=(0,react.useCallback)((()=>{setIsAnimated(!0),setCurrentSlideIndex(isFirstSlide?numberOfImages-1:currentSlideIndex-1),setIsInTransition(!0),setDirection("next")}),[currentSlideIndex,isFirstSlide,numberOfImages]),goToNextSlide=(0,react.useCallback)((()=>{setIsAnimated(!0),setCurrentSlideIndex(isLastSlide?0:currentSlideIndex+1),setIsInTransition(!0),setDirection("previous")}),[currentSlideIndex,isLastSlide]),goToSelectedSlide=(0,react.useCallback)((index=>{setIsAnimated(!1),setCurrentSlideIndex(index)}),[]);return 0===numberOfImages?null:1===numberOfImages?(0,jsx_runtime.jsx)(next_image.A,{src:imageList[0].src,alt:imageList[0].alt||"1 sur 1",width:imagesSize.width,height:imagesSize.height}):(0,jsx_runtime.jsxs)("div",{"aria-roledescription":"carousel",role:"group",className:_classNames,...rest,children:[(0,jsx_runtime.jsx)("ul",{"aria-live":"polite","aria-atomic":!1,children:imageList.map(((image,index)=>(0,jsx_runtime.jsx)(Slide,{index,currentSlideIndex,isFirstSlide,isLastSlide,numberOfImages,image,isInTransition,setIsInTransition,direction,setDirection,isAnimated,imagesSize},index)))}),(0,jsx_runtime.jsx)(Controls,{goToPreviousSlide,goToNextSlide}),!hideIndicators&&(0,jsx_runtime.jsx)(Indicators,{goToSelectedSlide,imageList,currentSlideIndex,numberOfImages})]})}var _Example_parameters,_Example_parameters_docs,_Example_parameters1;Carousel.__docgenInfo={description:"",methods:[],displayName:"Carousel",props:{imageList:{required:!0,tsType:{name:"Array",elements:[{name:"ImageProps"}],raw:"Array<ImageProps>"},description:""},hideIndicators:{required:!1,tsType:{name:"boolean"},description:""},imagesSize:{required:!0,tsType:{name:"signature",type:"object",raw:"{ width: number, height: number }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:""}}};const Carousel_stories={component:Carousel,title:"Components/Carousel"},Example={args:{imageList:[{alt:"",src:"https://picsum.photos/384/216?1"},{alt:"",src:"https://picsum.photos/384/216?2"},{alt:"",src:"https://picsum.photos/384/216?3"}],imagesSize:{height:109,width:34},style:{aspectRatio:"16/9"}}};Example.parameters={...Example.parameters,docs:{...null===(_Example_parameters=Example.parameters)||void 0===_Example_parameters?void 0:_Example_parameters.docs,source:{originalSource:"{\n  args: {\n    imageList: [{\n      alt: '',\n      src: 'https://picsum.photos/384/216?1'\n    }, {\n      alt: '',\n      src: 'https://picsum.photos/384/216?2'\n    }, {\n      alt: '',\n      src: 'https://picsum.photos/384/216?3'\n    }],\n    imagesSize: {\n      height: 109,\n      width: 34\n    },\n    style: {\n      aspectRatio: '16/9'\n    }\n  }\n}",...null===(_Example_parameters1=Example.parameters)||void 0===_Example_parameters1||null===(_Example_parameters_docs=_Example_parameters1.docs)||void 0===_Example_parameters_docs?void 0:_Example_parameters_docs.source}}};const __namedExportsOrder=["Example"]},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Carousel.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".kIuKIIXU0JkT_uIGrFUr{position:relative;overflow:hidden;width:100%}.kIuKIIXU0JkT_uIGrFUr img{width:100%;height:100%;object-fit:cover;object-position:center}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Carousel.module.scss"],names:[],mappings:"AAEA,sBACE,iBAAA,CACA,eAAA,CACA,UAAA,CAEA,0BACE,UAAA,CACA,WAAA,CACA,gBAAA,CACA,sBAAA",sourcesContent:['@use "@styles/utilities-deprecated";\n\n.carousel {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n  }\n}\n\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={carousel:"kIuKIIXU0JkT_uIGrFUr"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Controls.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".YI9Zj82RS2_jEOdoiHs4{z-index:10;background-color:#fff;color:#566bb1;width:1.5rem;height:1.5rem;border-radius:50%;position:absolute;padding:0;top:calc(50% - 10px)}.YI9Zj82RS2_jEOdoiHs4>svg{height:1.5rem}.SNfjQFOTBGgMv5ka8S8j{left:.5rem}.epfnZMTD722ufrisWH5D{right:.5rem}.YI9Zj82RS2_jEOdoiHs4:focus{box-shadow:0 0 0 4px #f6f7fb}@supports selector(&:focus-visible){.YI9Zj82RS2_jEOdoiHs4:focus{box-shadow:revert}.YI9Zj82RS2_jEOdoiHs4:focus-visible{box-shadow:0 0 0 4px #f6f7fb}}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Controls.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAGA,sBACE,UAAA,CACA,qBCeM,CDdN,aCDU,CDEV,YAAA,CACA,aAAA,CACA,iBAAA,CACA,iBAAA,CACA,SAAA,CACA,oBAAA,CACA,0BACE,aAAA,CAEF,sBACE,UAAA,CAEF,sBACE,WAAA,CAEF,4BACE,4BAAA,CAEF,oCACE,4BACE,iBAAA,CAEF,oCACE,4BAAA,CAAA",sourcesContent:['@use "@styles/utilities-deprecated";\n@use "@styles/utilities";\n\n.controls {\n  z-index: 10;\n  background-color: utilities-deprecated.$color-surface;\n  color: utilities-deprecated.$color-primary;\n  width: 1.50rem;\n  height: 1.50rem;\n  border-radius: 50%;\n  position: absolute;\n  padding: 0;\n  top: calc(50% - 20px/2);\n  > svg {\n    height: 1.50rem;\n  }\n  &Previous {\n    left: 0.5rem;\n  }\n  &Next {\n    right: 0.5rem;\n  }\n  &:focus {\n    box-shadow:0 0 0 4px utilities.$color-background-primary-alternative;\n  }\n  @supports selector(&:focus-visible) {\n    &:focus {\n      box-shadow: revert;\n    }\n    &:focus-visible {\n      box-shadow:0 0 0 4px utilities.$color-background-primary-alternative;\n    }\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={controls:"YI9Zj82RS2_jEOdoiHs4",controlsPrevious:"SNfjQFOTBGgMv5ka8S8j",controlsNext:"epfnZMTD722ufrisWH5D"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Indicators.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".RlbvoG_bCRLqKlL3Mwf8{z-index:10;display:inline-flex;gap:.5rem;position:absolute;bottom:10px;left:50%;transform:translate(-50%, 0)}.RlbvoG_bCRLqKlL3Mwf8 .ssroO17giw9hQYXwHMcn{background-color:#fff;width:.5rem;height:.5rem;padding:0;border-radius:50%;border:1px solid #fff}.RlbvoG_bCRLqKlL3Mwf8 .t62BToSPm_ErtvZJNDhv{background-color:#566bb1}.RlbvoG_bCRLqKlL3Mwf8 .ssroO17giw9hQYXwHMcn:focus{box-shadow:0 0 0 4px #f6f7fb}@supports selector(&:focus-visible){.RlbvoG_bCRLqKlL3Mwf8 .ssroO17giw9hQYXwHMcn:focus{box-shadow:revert}.RlbvoG_bCRLqKlL3Mwf8 .ssroO17giw9hQYXwHMcn:focus-visible{box-shadow:0 0 0 4px #f6f7fb}}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Indicators.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAGA,sBACE,UAAA,CACA,mBAAA,CACA,SAAA,CACA,iBAAA,CACA,WAAA,CACA,QAAA,CACA,4BAAA,CAEA,4CACE,qBCOI,CDNJ,WAAA,CACA,YAAA,CACA,SAAA,CACA,iBAAA,CACA,qBAAA,CACA,4CACE,wBCfM,CDiBR,kDACE,4BAAA,CAGF,oCACE,kDACE,iBAAA,CAEF,0DACE,4BAAA,CAAA",sourcesContent:['@use "@styles/utilities-deprecated";\n@use "@styles/utilities";\n\n.indicators {\n  z-index: 10;\n  display: inline-flex;\n  gap: 0.5rem;\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  transform: translate(-50%, 0);\n\n  .indicator {\n    background-color: utilities-deprecated.$color-surface;\n    width: 0.50rem;\n    height: 0.50rem;\n    padding: 0;\n    border-radius: 50%;\n    border: 1px solid utilities-deprecated.$color-surface;\n    &Active {\n      background-color: utilities-deprecated.$color-primary;\n    }\n    &:focus {\n      box-shadow:0 0 0 4px utilities.$color-background-primary-alternative;\n    }\n\n    @supports selector(&:focus-visible) {\n      &:focus {\n        box-shadow: revert;\n      }\n      &:focus-visible {\n        box-shadow:0 0 0 4px utilities.$color-background-primary-alternative;\n      }\n    }\n  }\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={indicators:"RlbvoG_bCRLqKlL3Mwf8",indicator:"ssroO17giw9hQYXwHMcn",indicatorActive:"t62BToSPm_ErtvZJNDhv"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[3]!./src/client/components/ui/Carousel/Slide.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".rSfk4rvz32ccSBYZO4wq{position:absolute;width:100%;height:100%;visibility:hidden}.rSfk4rvz32ccSBYZO4wq img{height:auto}.rSfk4rvz32ccSBYZO4wq.UFRGSO7AlqO6MvHhbVPO{visibility:visible;left:0}.rSfk4rvz32ccSBYZO4wq.xTpdg9lNiaTJUND3dn2f{left:100%}.rSfk4rvz32ccSBYZO4wq.sypOje8RdW_oeIb25xrX{left:-100%}.rSfk4rvz32ccSBYZO4wq.h0GT9FmAhcmouqywDD8b,.rSfk4rvz32ccSBYZO4wq.Lu4rsk7aOW_rCdWMEGxn{visibility:visible}.COLGww6QzNcIjJG3pqj0{transition:left .25s linear}@media(prefers-reduced-motion: reduce){.rSfk4rvz32ccSBYZO4wq{transition:none}}","",{version:3,sources:["webpack://./src/client/components/ui/Carousel/Slide.module.scss"],names:[],mappings:"AAEA,sBACE,iBAAA,CACA,UAAA,CACA,WAAA,CACA,iBAAA,CAEA,0BACE,WAAA,CAIJ,2CACE,kBAAA,CACA,MAAA,CAGF,2CACE,SAAA,CAGF,2CACE,UAAA,CAGF,sFAEE,kBAAA,CAGF,sBACE,2BAAA,CAGF,uCACE,sBACE,eAAA,CAAA",sourcesContent:['@use "@styles/utilities-deprecated";\n\n.slide {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n\n  img {\n    height: auto;\n  }\n}\n\n.slide.current {\n  visibility: visible;\n  left: 0;\n}\n\n.slide.next {\n  left: 100%;\n}\n\n.slide.prev {\n  left: -100%;\n}\n\n.slide.prevInTransition,\n.slide.nextInTransition,{\n  visibility: visible;\n}\n\n.transition {\n  transition: left .25s linear;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .slide {\n    transition: none;\n  }\n}\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={slide:"rSfk4rvz32ccSBYZO4wq",current:"UFRGSO7AlqO6MvHhbVPO",next:"xTpdg9lNiaTJUND3dn2f",prev:"sypOje8RdW_oeIb25xrX",prevInTransition:"h0GT9FmAhcmouqywDD8b",nextInTransition:"Lu4rsk7aOW_rCdWMEGxn",transition:"COLGww6QzNcIjJG3pqj0"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/next/dist/compiled/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js")},"./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs":(__unused_webpack_module,exports)=>{"use strict";function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}exports._=exports._interop_require_wildcard=function _interop_require_wildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!=typeof obj&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!==key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}newObj.default=obj,cache&&cache.set(obj,newObj);return newObj}}}]);