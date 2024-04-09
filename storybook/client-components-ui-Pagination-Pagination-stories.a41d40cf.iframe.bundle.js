/*! For license information please see client-components-ui-Pagination-Pagination-stories.a41d40cf.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[4228],{"./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":(module,__unused_webpack_exports,__webpack_require__)=>{var _typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/typeof.js").default;function _regeneratorRuntime(){"use strict";module.exports=_regeneratorRuntime=function _regeneratorRuntime(){return e},module.exports.__esModule=!0,module.exports.default=module.exports;var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function define(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{define({},"")}catch(t){define=function define(t,e,r){return t[e]=r}}function wrap(t,e,r,n){var i=e&&e.prototype instanceof Generator?e:Generator,a=Object.create(i.prototype),c=new Context(n||[]);return o(a,"_invoke",{value:makeInvokeMethod(t,r,c)}),a}function tryCatch(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=wrap;var h="suspendedStart",l="suspendedYield",f="executing",s="completed",y={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var p={};define(p,a,(function(){return this}));var d=Object.getPrototypeOf,v=d&&d(d(values([])));v&&v!==r&&n.call(v,a)&&(p=v);var g=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(p);function defineIteratorMethods(t){["next","throw","return"].forEach((function(e){define(t,e,(function(t){return this._invoke(e,t)}))}))}function AsyncIterator(t,e){function invoke(r,o,i,a){var c=tryCatch(t[r],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==_typeof(h)&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){invoke("next",t,i,a)}),(function(t){invoke("throw",t,i,a)})):e.resolve(h).then((function(t){u.value=t,i(u)}),(function(t){return invoke("throw",t,i,a)}))}a(c.arg)}var r;o(this,"_invoke",{value:function value(t,n){function callInvokeWithMethodAndArg(){return new e((function(e,r){invoke(t,n,e,r)}))}return r=r?r.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(e,r,n){var o=h;return function(i,a){if(o===f)throw Error("Generator is already running");if(o===s){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=maybeInvokeDelegate(c,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=s,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=f;var p=tryCatch(e,r,n);if("normal"===p.type){if(o=n.done?s:l,p.arg===y)continue;return{value:p.arg,done:n.done}}"throw"===p.type&&(o=s,n.method="throw",n.arg=p.arg)}}}function maybeInvokeDelegate(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,maybeInvokeDelegate(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var i=tryCatch(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,y;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function pushTryEntry(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function resetTryEntry(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function Context(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(pushTryEntry,this),this.reset(!0)}function values(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function next(){for(;++o<e.length;)if(n.call(e,o))return next.value=e[o],next.done=!1,next;return next.value=t,next.done=!0,next};return i.next=i}}throw new TypeError(_typeof(e)+" is not iterable")}return GeneratorFunction.prototype=GeneratorFunctionPrototype,o(g,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),o(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===GeneratorFunction||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,GeneratorFunctionPrototype):(t.__proto__=GeneratorFunctionPrototype,define(t,u,"GeneratorFunction")),t.prototype=Object.create(g),t},e.awrap=function(t){return{__await:t}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,c,(function(){return this})),e.AsyncIterator=AsyncIterator,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new AsyncIterator(wrap(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},defineIteratorMethods(g),define(g,u,"Generator"),define(g,a,(function(){return this})),define(g,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function next(){for(;r.length;){var t=r.pop();if(t in e)return next.value=t,next.done=!1,next}return next.done=!0,next}},e.values=values,Context.prototype={constructor:Context,reset:function reset(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(resetTryEntry),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function stop(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function dispatchException(e){if(this.done)throw e;var r=this;function handle(n,o){return a.type="throw",a.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return handle("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0);if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}}}},abrupt:function abrupt(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function complete(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function finish(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),y}},catch:function _catch(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;resetTryEntry(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function delegateYield(e,r,n){return this.delegate={iterator:values(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),y}},e}module.exports=_regeneratorRuntime,module.exports.__esModule=!0,module.exports.default=module.exports},"./node_modules/@babel/runtime/helpers/typeof.js":module=>{function _typeof(o){return module.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},module.exports.__esModule=!0,module.exports.default=module.exports,_typeof(o)}module.exports=_typeof,module.exports.__esModule=!0,module.exports.default=module.exports},"./node_modules/@babel/runtime/regenerator/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var runtime=__webpack_require__("./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();module.exports=runtime;try{regeneratorRuntime=runtime}catch(accidentalStrictMode){"object"==typeof globalThis?globalThis.regeneratorRuntime=runtime:Function("r","regeneratorRuntime = r")(runtime)}},"./src/client/components/ui/Pagination/Pagination.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Pagination_stories});var defineProperty=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/defineProperty.js"),toConsumableArray=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/toConsumableArray.js"),asyncToGenerator=__webpack_require__("./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/asyncToGenerator.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),router=__webpack_require__("./node_modules/next/router.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Pagination_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Pagination/Pagination.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Pagination_module.A,options);const Pagination_Pagination_module=Pagination_module.A&&Pagination_module.A.locals?Pagination_module.A.locals:void 0;var useBreakpoint=__webpack_require__("./src/client/hooks/useBreakpoint.ts"),__jsx=react.createElement,NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE=2,NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE=4;function CommonPagination(props){var onPageClick=props.onPageClick,createURL=props.createURL,isFirstPage=props.isFirstPage,isLastPage=props.isLastPage,numberOfPageList=props.numberOfPageList,lastPage=props.lastPage,currentPage=props.currentPage,maxPage=props.maxPage,isSmallScreen=(0,useBreakpoint.A)().isSmallScreen,numberOfElementToDisplayAfterAndBeforeCurrentPage=isSmallScreen&&NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE||NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE,computedNumberOfPageList=maxPage&&numberOfPageList.length>maxPage?(0,toConsumableArray.A)(Array(maxPage).keys()):numberOfPageList,computedLastPage=maxPage&&numberOfPageList.length>maxPage?maxPage:lastPage,displayElement=function displayElement(page){return __jsx("li",{key:page},__jsx("a",{href:createURL?createURL(page):"#",className:"underline-none","aria-current":currentPage===page,onClick:function onClick(event){event.preventDefault(),onPageClick(page)}},page+1))};return __jsx(react.Fragment,null,numberOfPageList.length>=1&&__jsx("nav",{role:"navigation","aria-label":"pagination"},__jsx("ul",{key:"Pagination",className:Pagination_Pagination_module.pagination},function displayPrevious(){return __jsx(react.Fragment,null,__jsx("li",{key:"FirstPageLiPagination"},__jsx("a",{href:createURL?createURL(0):"#",className:"underline-none","aria-disabled":isFirstPage,"aria-label":"Revenir à la première page",onClick:function onClick(event){event.preventDefault(),isFirstPage||onPageClick(0)}},__jsx(Icon.I,{name:"angle-left-from-line"}))),__jsx("li",{key:"PreviousPageLiPagination"},__jsx("a",{href:createURL?createURL(currentPage-1):"#",className:"underline-none","aria-disabled":isFirstPage,"aria-label":"Revenir à la page précédente",onClick:function onClick(event){event.preventDefault(),isFirstPage||onPageClick(currentPage-1)}},isSmallScreen?__jsx(Icon.I,{name:"angle-left"}):__jsx(react.Fragment,null,__jsx(Icon.I,{name:"angle-left"})," ",__jsx("span",null,"Page précédente")))))}(),function displayIntermediatePages(){return computedNumberOfPageList.filter((function(element){return element>=currentPage-numberOfElementToDisplayAfterAndBeforeCurrentPage&&element<=currentPage+numberOfElementToDisplayAfterAndBeforeCurrentPage&&element!==computedLastPage})).map(displayElement)}(),function displayEllipsis(){return currentPage<computedLastPage-(numberOfElementToDisplayAfterAndBeforeCurrentPage+1)?__jsx("li",{className:Pagination_Pagination_module.ellipse},"…"):__jsx(react.Fragment,null)}(),function displayNext(){return __jsx(react.Fragment,null,displayElement(computedLastPage),__jsx("li",{key:"NextPageLiPagination"},__jsx("a",{href:createURL?createURL(currentPage+1):"#",className:"underline-none","aria-disabled":isLastPage,"aria-label":"Aller à la page suivante",onClick:function onClick(event){event.preventDefault(),isLastPage||onPageClick(currentPage+1)}},isSmallScreen?__jsx(Icon.I,{name:"angle-right"}):__jsx(react.Fragment,null,__jsx("span",null,"Page suivante")," ",__jsx(Icon.I,{name:"angle-right"})))),__jsx("li",{key:"LastLiPagination"},__jsx("a",{href:createURL?createURL(computedLastPage):"#",className:"underline-none","aria-disabled":isLastPage,"aria-label":"Aller à la dernière page",onClick:function onClick(event){event.preventDefault(),isLastPage||onPageClick(computedLastPage)}},__jsx(Icon.I,{name:"angle-right-from-line"}))))}())))}CommonPagination.__docgenInfo={description:"",methods:[],displayName:"CommonPagination",props:{currentPage:{required:!0,tsType:{name:"number"},description:""},onPageClick:{required:!0,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},numberOfPageList:{required:!0,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:""},createURL:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => string",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"string"}}},description:""},isFirstPage:{required:!0,tsType:{name:"boolean"},description:""},isLastPage:{required:!0,tsType:{name:"boolean"},description:""},lastPage:{required:!0,tsType:{name:"number"},description:""},maxPage:{required:!1,tsType:{name:"number"},description:""}}};var Pagination_jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.A)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function Pagination(_ref){var numberOfResult=_ref.numberOfResult,numberOfResultPerPage=_ref.numberOfResultPerPage,maxPage=_ref.maxPage,_useRouter=(0,router.useRouter)(),query=_useRouter.query,push=_useRouter.push,_useState=(0,react.useState)(0),currentPage=_useState[0],setCurrentPage=_useState[1];function _setCurrentPageAndQueryUrl(){return(_setCurrentPageAndQueryUrl=(0,asyncToGenerator.A)(regenerator_default().mark((function _callee(page){return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return setCurrentPage(page),_context.next=3,push({query:_objectSpread(_objectSpread({},query),{},{page:page+1})});case 3:case"end":return _context.stop()}}),_callee)})))).apply(this,arguments)}(0,react.useEffect)((function setCurrentPageFromQueryUrl(){var page=query.page;page&&"string"==typeof page&&!isNaN(+page)?setCurrentPage(Number(page)-1):setCurrentPage(0)}),[setCurrentPage,query]);var numberOfPageList=(0,toConsumableArray.A)(Array(Math.ceil(numberOfResult/numberOfResultPerPage)-1).keys()),isFirstPage=(0,react.useMemo)((function(){return 0===currentPage}),[currentPage]),isLastPage=(0,react.useMemo)((function(){return maxPage&&numberOfPageList.length>maxPage?currentPage===maxPage:currentPage===numberOfPageList.length}),[currentPage,maxPage,numberOfPageList.length]),lastPage=(0,react.useMemo)((function(){return Math.max(Math.ceil(numberOfResult/numberOfResultPerPage)-1,0)}),[numberOfResult,numberOfResultPerPage]);return Pagination_jsx(CommonPagination,{currentPage,onPageClick:function setCurrentPageAndQueryUrl(_x){return _setCurrentPageAndQueryUrl.apply(this,arguments)},isLastPage,numberOfPageList,lastPage,isFirstPage,maxPage})}Pagination.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{numberOfResult:{required:!0,tsType:{name:"number"},description:""},numberOfResultPerPage:{required:!0,tsType:{name:"number"},description:""},maxPage:{required:!1,tsType:{name:"number"},description:""}}};const Pagination_stories={component:Pagination,title:"Components/Pagination"};var Example={args:{numberOfResult:56,numberOfResultPerPage:10}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:"{\n  args: {\n    numberOfResult: 56,\n    numberOfResultPerPage: 10\n  }\n}",...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]},"./src/client/hooks/useBreakpoint.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>useBreakpoint});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),BREAKPOINT=function(BREAKPOINT){return BREAKPOINT.SM="36em",BREAKPOINT.MD="48em",BREAKPOINT.LG="62em",BREAKPOINT}(BREAKPOINT||{});function getScreenSize(){return"undefined"==typeof window?BREAKPOINT.SM:window&&window.matchMedia("(min-width: ".concat(BREAKPOINT.LG,")")).matches?BREAKPOINT.LG:window&&window.matchMedia("(min-width: ".concat(BREAKPOINT.MD,")")).matches?BREAKPOINT.MD:BREAKPOINT.SM}function useBreakpoint(){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getScreenSize()),screenSize=_useState[0],setScreenSize=_useState[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){function handleDevice(){setScreenSize(getScreenSize())}return setScreenSize(getScreenSize()),window.addEventListener("resize",handleDevice),function(){return window.removeEventListener("resize",handleDevice)}}),[]),{isLargeScreen:screenSize===BREAKPOINT.LG,isMediumScreen:screenSize===BREAKPOINT.MD,isSmallScreen:screenSize===BREAKPOINT.SM}}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Pagination/Pagination.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".nR1ZmrJoci_pY8qdlDzV{text-align:center;display:flex;justify-content:center;align-items:center}.nR1ZmrJoci_pY8qdlDzV li{color:#161616}.nR1ZmrJoci_pY8qdlDzV li a{display:inline-flex;justify-content:center;vertical-align:middle}.nR1ZmrJoci_pY8qdlDzV li a[aria-current=true]{outline-offset:4px}.nR1ZmrJoci_pY8qdlDzV li:first-child>a{padding:0;vertical-align:bottom}.nR1ZmrJoci_pY8qdlDzV li:last-child>a{padding:0;vertical-align:bottom}.nR1ZmrJoci_pY8qdlDzV li>a{padding:.5rem .75rem}@media(min-width: 36em){.nR1ZmrJoci_pY8qdlDzV li>a{padding:.5rem 1rem}}.nR1ZmrJoci_pY8qdlDzV li>a[aria-disabled=true]{color:#666;pointer-events:none}.nR1ZmrJoci_pY8qdlDzV li>a[aria-current=true]{background-color:#566bb1;color:#fff}","",{version:3,sources:["webpack://./src/client/components/ui/Pagination/Pagination.module.scss","webpack://./src/styles/theme/_variables.scss","webpack://./src/styles/media/_mixins.scss"],names:[],mappings:"AAOA,sBACE,iBAAA,CACA,YAAA,CACA,sBAAA,CACA,kBAAA,CAEA,yBACE,aCsBiB,CDpBjB,2BACE,mBAAA,CACA,sBAAA,CACA,qBAAA,CAEA,8CACE,kBAAA,CAKN,uCACE,SAAA,CACA,qBAAA,CAGF,sCACE,SAAA,CACA,qBAAA,CAGF,2BACE,oBAAA,CE1BD,wBFyBD,2BAGM,kBAAA,CAAA,CAIJ,+CACE,UCNiB,CDOjB,mBAAA,CAGF,8CACE,wBC1BuB,CD2BvB,UCduB",sourcesContent:['@use "@styles/utilities";\n\n$pagination-current-page-color: utilities.$color-text-primary-inverse;\n$pagination-current-page-background-color: utilities.$color-background-secondary;\n$pagination-disabled-page-color: utilities.$color-text-secondary;\n$pagination-available-page-color: utilities.$color-text-primary;\n\n.pagination {\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  li {\n    color: $pagination-available-page-color;\n\n    a {\n      display: inline-flex;\n      justify-content: center;\n      vertical-align: middle;\n\n      &[aria-current=true] {\n        outline-offset: 4px;\n      }\n    }\n  }\n\n  li:first-child > a {\n    padding: 0;\n    vertical-align: bottom;\n  }\n\n  li:last-child > a {\n    padding: 0;\n    vertical-align: bottom;\n  }\n\n  li > a {\n    padding: .5rem .75rem;\n    @include utilities.media(small) {\n        padding: .5rem 1rem;\n    }\n\n\n    &[aria-disabled="true"] {\n      color: $pagination-disabled-page-color;\n      pointer-events: none;\n    }\n\n    &[aria-current="true"] {\n      background-color: $pagination-current-page-background-color;\n      color: $pagination-current-page-color;\n    }\n  }\n}\n','@use "sass:color";\n\n/* ***************\n * Main colors\n * ***************/\n$color-primary: #566BB1;\n$color-secondary: #18753C;\n$color-tertiary: #ECECFF;\n\n/* ***************\n * System Colors\n * ***************/\n$color-error: #CE0500;\n$color-warning: #E4794A;\n$color-success: #18753C;\n$color-text-disabled: #929292;\n$color-background-disabled: #EEEEEE;\n\n\n/* ***************\n * Background colors\n * ***************/\n$color-background-primary: #FFFFFF;\n$color-background-primary-alternative: #F6F7FB;\n$color-background-secondary: #566BB1;\n$color-background-border: #929292;\n$color-background-tag: #EEEEEE;\n\n\n/* ***************\n * Textual elements colors\n * ***************/\n$color-title-primary: #566BB1;\n$color-title-primary-contrast: #18753C;\n$color-title-primary-alternative: #161616;\n$color-title-secondary: #FFFFFF;\n$color-text-primary: #161616;\n$color-text-primary-inverse: #FFFFFF;\n$color-text-primary-alternative: #566BB1;\n$color-text-secondary: #666666;\n\n/* ***************\n * CTA colors\n * ***************/\n$color-cta-background-primary: #566BB1;\n$color-cta-background-primary-hover: #040085;\n$color-cta-background-secondary: #FFFFFF;\n$color-cta-background-secondary-hover: #ECECFF;\n$color-cta-background-tertiary: #ECECFF;\n$color-cta-background-tertiary-hover: #6E61E9;\n$color-cta-background-inactive: $color-text-disabled;\n\n$color-cta-texte-primary: #FFFFFF;\n$color-cta-texte-primary-hover: #FFFFFF;\n$color-cta-texte-secondary: #566BB1;\n$color-cta-texte-secondary-hover: #566BB1;\n$color-cta-texte-tertiary: #566BB1;\n$color-cta-texte-tertiary-hover: #FFFFFF;\n$color-cta-texte-inactive: $color-text-disabled;\n\n$color-cta-link-background-light: #566BB1;\n$color-cta-link-background-dark: #FFFFFF;\n$color-cta-link-inactive: $color-text-disabled;\n\n/* ***************\n * Complementary colors - groupe 1\n * ***************/\n$color-groupe-1-purple: #ECECFF;\n$color-groupe-1-pink: #F5EDF5;\n$color-groupe-1-green: #E7F1F1;\n$color-groupe-1-orange: #FFF4ED;\n\n\n/* ***************\n * Complementary colors - groupe 2\n * ***************/\n$color-groupe-2-rust: #A66465;\n$color-groupe-2-dark-green: #455A64;\n$color-groupe-2-light-green: #61803E;\n$color-groupe-2-burgundy: #6E445A;\n\n\n/* ***************\n * Complementary colors - groupe 3\n * ***************/\n$color-groupe-3-purple: #566BB1;\n$color-groupe-3-green: #18753C;\n$color-groupe-3-brown: #7F3E3B;\n$color-groupe-3-yellow: #EDED89;\n$color-groupe-3-pink: #BA40B0;\n$color-groupe-3-blue: #407BFF;\n\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n\n','@use "variables";\n\n@mixin media($size) {\n  @if $size == medium {\n    @media (min-width: variables.$breakpoint-md) { @content; }\n  } @else if $size == large {\n    @media (min-width: variables.$breakpoint-lg) { @content; }\n  } @else if $size == xlarge {\n    @media (min-width: variables.$breakpoint-xl) { @content; }\n  } @else if $size == xxlarge {\n    @media (min-width: variables.$breakpoint-xxl) { @content; }\n  } @else if $size == small {\n   @media (min-width: variables.$breakpoint-sm) { @content; }\n  }\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={pagination:"nR1ZmrJoci_pY8qdlDzV"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/next/dist/compiled/@babel/runtime/helpers/esm/asyncToGenerator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}__webpack_require__.d(__webpack_exports__,{A:()=>_asyncToGenerator})},"?c969":()=>{},"?3e83":()=>{},"?19e6":()=>{}}]);