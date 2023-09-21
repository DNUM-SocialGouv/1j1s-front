/*! For license information please see client-components-ui-Pagination-Pagination-stories.c47826fb.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[8271],{"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}__webpack_require__.d(__webpack_exports__,{Z:()=>_asyncToGenerator})},"./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":(module,__unused_webpack_exports,__webpack_require__)=>{var _typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/typeof.js").default;function _regeneratorRuntime(){"use strict";module.exports=_regeneratorRuntime=function _regeneratorRuntime(){return exports},module.exports.__esModule=!0,module.exports.default=module.exports;var exports={},Op=Object.prototype,hasOwn=Op.hasOwnProperty,defineProperty=Object.defineProperty||function(obj,key,desc){obj[key]=desc.value},$Symbol="function"==typeof Symbol?Symbol:{},iteratorSymbol=$Symbol.iterator||"@@iterator",asyncIteratorSymbol=$Symbol.asyncIterator||"@@asyncIterator",toStringTagSymbol=$Symbol.toStringTag||"@@toStringTag";function define(obj,key,value){return Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}),obj[key]}try{define({},"")}catch(err){define=function define(obj,key,value){return obj[key]=value}}function wrap(innerFn,outerFn,self,tryLocsList){var protoGenerator=outerFn&&outerFn.prototype instanceof Generator?outerFn:Generator,generator=Object.create(protoGenerator.prototype),context=new Context(tryLocsList||[]);return defineProperty(generator,"_invoke",{value:makeInvokeMethod(innerFn,self,context)}),generator}function tryCatch(fn,obj,arg){try{return{type:"normal",arg:fn.call(obj,arg)}}catch(err){return{type:"throw",arg:err}}}exports.wrap=wrap;var ContinueSentinel={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var IteratorPrototype={};define(IteratorPrototype,iteratorSymbol,(function(){return this}));var getProto=Object.getPrototypeOf,NativeIteratorPrototype=getProto&&getProto(getProto(values([])));NativeIteratorPrototype&&NativeIteratorPrototype!==Op&&hasOwn.call(NativeIteratorPrototype,iteratorSymbol)&&(IteratorPrototype=NativeIteratorPrototype);var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(IteratorPrototype);function defineIteratorMethods(prototype){["next","throw","return"].forEach((function(method){define(prototype,method,(function(arg){return this._invoke(method,arg)}))}))}function AsyncIterator(generator,PromiseImpl){function invoke(method,arg,resolve,reject){var record=tryCatch(generator[method],generator,arg);if("throw"!==record.type){var result=record.arg,value=result.value;return value&&"object"==_typeof(value)&&hasOwn.call(value,"__await")?PromiseImpl.resolve(value.__await).then((function(value){invoke("next",value,resolve,reject)}),(function(err){invoke("throw",err,resolve,reject)})):PromiseImpl.resolve(value).then((function(unwrapped){result.value=unwrapped,resolve(result)}),(function(error){return invoke("throw",error,resolve,reject)}))}reject(record.arg)}var previousPromise;defineProperty(this,"_invoke",{value:function value(method,arg){function callInvokeWithMethodAndArg(){return new PromiseImpl((function(resolve,reject){invoke(method,arg,resolve,reject)}))}return previousPromise=previousPromise?previousPromise.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(innerFn,self,context){var state="suspendedStart";return function(method,arg){if("executing"===state)throw new Error("Generator is already running");if("completed"===state){if("throw"===method)throw arg;return doneResult()}for(context.method=method,context.arg=arg;;){var delegate=context.delegate;if(delegate){var delegateResult=maybeInvokeDelegate(delegate,context);if(delegateResult){if(delegateResult===ContinueSentinel)continue;return delegateResult}}if("next"===context.method)context.sent=context._sent=context.arg;else if("throw"===context.method){if("suspendedStart"===state)throw state="completed",context.arg;context.dispatchException(context.arg)}else"return"===context.method&&context.abrupt("return",context.arg);state="executing";var record=tryCatch(innerFn,self,context);if("normal"===record.type){if(state=context.done?"completed":"suspendedYield",record.arg===ContinueSentinel)continue;return{value:record.arg,done:context.done}}"throw"===record.type&&(state="completed",context.method="throw",context.arg=record.arg)}}}function maybeInvokeDelegate(delegate,context){var methodName=context.method,method=delegate.iterator[methodName];if(void 0===method)return context.delegate=null,"throw"===methodName&&delegate.iterator.return&&(context.method="return",context.arg=void 0,maybeInvokeDelegate(delegate,context),"throw"===context.method)||"return"!==methodName&&(context.method="throw",context.arg=new TypeError("The iterator does not provide a '"+methodName+"' method")),ContinueSentinel;var record=tryCatch(method,delegate.iterator,context.arg);if("throw"===record.type)return context.method="throw",context.arg=record.arg,context.delegate=null,ContinueSentinel;var info=record.arg;return info?info.done?(context[delegate.resultName]=info.value,context.next=delegate.nextLoc,"return"!==context.method&&(context.method="next",context.arg=void 0),context.delegate=null,ContinueSentinel):info:(context.method="throw",context.arg=new TypeError("iterator result is not an object"),context.delegate=null,ContinueSentinel)}function pushTryEntry(locs){var entry={tryLoc:locs[0]};1 in locs&&(entry.catchLoc=locs[1]),2 in locs&&(entry.finallyLoc=locs[2],entry.afterLoc=locs[3]),this.tryEntries.push(entry)}function resetTryEntry(entry){var record=entry.completion||{};record.type="normal",delete record.arg,entry.completion=record}function Context(tryLocsList){this.tryEntries=[{tryLoc:"root"}],tryLocsList.forEach(pushTryEntry,this),this.reset(!0)}function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod)return iteratorMethod.call(iterable);if("function"==typeof iterable.next)return iterable;if(!isNaN(iterable.length)){var i=-1,next=function next(){for(;++i<iterable.length;)if(hasOwn.call(iterable,i))return next.value=iterable[i],next.done=!1,next;return next.value=void 0,next.done=!0,next};return next.next=next}}return{next:doneResult}}function doneResult(){return{value:void 0,done:!0}}return GeneratorFunction.prototype=GeneratorFunctionPrototype,defineProperty(Gp,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),defineProperty(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,toStringTagSymbol,"GeneratorFunction"),exports.isGeneratorFunction=function(genFun){var ctor="function"==typeof genFun&&genFun.constructor;return!!ctor&&(ctor===GeneratorFunction||"GeneratorFunction"===(ctor.displayName||ctor.name))},exports.mark=function(genFun){return Object.setPrototypeOf?Object.setPrototypeOf(genFun,GeneratorFunctionPrototype):(genFun.__proto__=GeneratorFunctionPrototype,define(genFun,toStringTagSymbol,"GeneratorFunction")),genFun.prototype=Object.create(Gp),genFun},exports.awrap=function(arg){return{__await:arg}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,asyncIteratorSymbol,(function(){return this})),exports.AsyncIterator=AsyncIterator,exports.async=function(innerFn,outerFn,self,tryLocsList,PromiseImpl){void 0===PromiseImpl&&(PromiseImpl=Promise);var iter=new AsyncIterator(wrap(innerFn,outerFn,self,tryLocsList),PromiseImpl);return exports.isGeneratorFunction(outerFn)?iter:iter.next().then((function(result){return result.done?result.value:iter.next()}))},defineIteratorMethods(Gp),define(Gp,toStringTagSymbol,"Generator"),define(Gp,iteratorSymbol,(function(){return this})),define(Gp,"toString",(function(){return"[object Generator]"})),exports.keys=function(val){var object=Object(val),keys=[];for(var key in object)keys.push(key);return keys.reverse(),function next(){for(;keys.length;){var key=keys.pop();if(key in object)return next.value=key,next.done=!1,next}return next.done=!0,next}},exports.values=values,Context.prototype={constructor:Context,reset:function reset(skipTempReset){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(resetTryEntry),!skipTempReset)for(var name in this)"t"===name.charAt(0)&&hasOwn.call(this,name)&&!isNaN(+name.slice(1))&&(this[name]=void 0)},stop:function stop(){this.done=!0;var rootRecord=this.tryEntries[0].completion;if("throw"===rootRecord.type)throw rootRecord.arg;return this.rval},dispatchException:function dispatchException(exception){if(this.done)throw exception;var context=this;function handle(loc,caught){return record.type="throw",record.arg=exception,context.next=loc,caught&&(context.method="next",context.arg=void 0),!!caught}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i],record=entry.completion;if("root"===entry.tryLoc)return handle("end");if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc"),hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc)return handle(entry.catchLoc,!0);if(this.prev<entry.finallyLoc)return handle(entry.finallyLoc)}else if(hasCatch){if(this.prev<entry.catchLoc)return handle(entry.catchLoc,!0)}else{if(!hasFinally)throw new Error("try statement without catch or finally");if(this.prev<entry.finallyLoc)return handle(entry.finallyLoc)}}}},abrupt:function abrupt(type,arg){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&this.prev<entry.finallyLoc){var finallyEntry=entry;break}}finallyEntry&&("break"===type||"continue"===type)&&finallyEntry.tryLoc<=arg&&arg<=finallyEntry.finallyLoc&&(finallyEntry=null);var record=finallyEntry?finallyEntry.completion:{};return record.type=type,record.arg=arg,finallyEntry?(this.method="next",this.next=finallyEntry.finallyLoc,ContinueSentinel):this.complete(record)},complete:function complete(record,afterLoc){if("throw"===record.type)throw record.arg;return"break"===record.type||"continue"===record.type?this.next=record.arg:"return"===record.type?(this.rval=this.arg=record.arg,this.method="return",this.next="end"):"normal"===record.type&&afterLoc&&(this.next=afterLoc),ContinueSentinel},finish:function finish(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.finallyLoc===finallyLoc)return this.complete(entry.completion,entry.afterLoc),resetTryEntry(entry),ContinueSentinel}},catch:function _catch(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if("throw"===record.type){var thrown=record.arg;resetTryEntry(entry)}return thrown}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(iterable,resultName,nextLoc){return this.delegate={iterator:values(iterable),resultName,nextLoc},"next"===this.method&&(this.arg=void 0),ContinueSentinel}},exports}module.exports=_regeneratorRuntime,module.exports.__esModule=!0,module.exports.default=module.exports},"./node_modules/@babel/runtime/helpers/typeof.js":module=>{function _typeof(obj){return module.exports=_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},module.exports.__esModule=!0,module.exports.default=module.exports,_typeof(obj)}module.exports=_typeof,module.exports.__esModule=!0,module.exports.default=module.exports},"./node_modules/@babel/runtime/regenerator/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var runtime=__webpack_require__("./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();module.exports=runtime;try{regeneratorRuntime=runtime}catch(accidentalStrictMode){"object"==typeof globalThis?globalThis.regeneratorRuntime=runtime:Function("r","regeneratorRuntime = r")(runtime)}},"./src/client/components/ui/Pagination/Pagination.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,default:()=>Pagination_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),router=__webpack_require__("./node_modules/next/router.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),Icon=__webpack_require__("./src/client/components/ui/Icon/Icon.tsx"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Pagination_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Pagination/Pagination.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Pagination_module.Z,options);const Pagination_Pagination_module=Pagination_module.Z&&Pagination_module.Z.locals?Pagination_module.Z.locals:void 0;var useBreakpoint=__webpack_require__("./src/client/hooks/useBreakpoint.ts"),__jsx=react.createElement,NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE=2,NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE=4;function CommonPagination(props){var onPageClick=props.onPageClick,createURL=props.createURL,isFirstPage=props.isFirstPage,isLastPage=props.isLastPage,numberOfPageList=props.numberOfPageList,lastPage=props.lastPage,currentPage=props.currentPage,maxPage=props.maxPage,isSmallScreen=(0,useBreakpoint.Z)().isSmallScreen,numberOfElementToDisplayAfterAndBeforeCurrentPage=isSmallScreen&&NOMBRE_ELEMENT_SUR_MOBILE_AVANT_ET_APRES_LA_CURRENT_PAGE||NOMBRE_ELEMENT_SUR_DESKTOP_AVANT_ET_APRES_LA_CURRENT_PAGE,computedNumberOfPageList=maxPage&&numberOfPageList.length>maxPage?(0,toConsumableArray.Z)(Array(maxPage).keys()):numberOfPageList,computedLastPage=maxPage&&numberOfPageList.length>maxPage?maxPage:lastPage,displayElement=function displayElement(page){return __jsx("li",{key:page},__jsx("a",{href:createURL?createURL(page):"#",className:"underline-none","aria-current":currentPage===page,onClick:function onClick(event){event.preventDefault(),onPageClick(page)}},page+1))};return __jsx(react.Fragment,null,numberOfPageList.length>=1&&__jsx("nav",{role:"navigation","aria-label":"pagination"},__jsx("ul",{key:"Pagination",className:Pagination_Pagination_module.pagination},function displayPrevious(){return __jsx(react.Fragment,null,__jsx("li",{key:"FirstPageLiPagination"},__jsx("a",{href:createURL?createURL(0):"#",className:"underline-none","aria-disabled":isFirstPage,"aria-label":"Revenir à la première page",onClick:function onClick(event){event.preventDefault(),isFirstPage||onPageClick(0)}},__jsx(Icon.J,{name:"angle-left-from-line"}))),__jsx("li",{key:"PreviousPageLiPagination"},__jsx("a",{href:createURL?createURL(currentPage-1):"#",className:"underline-none","aria-disabled":isFirstPage,"aria-label":"Revenir à la page précédente",onClick:function onClick(event){event.preventDefault(),isFirstPage||onPageClick(currentPage-1)}},isSmallScreen?__jsx(Icon.J,{name:"angle-left"}):__jsx(react.Fragment,null,__jsx(Icon.J,{name:"angle-left"})," ",__jsx("span",null,"Page précédente")))))}(),function displayIntermediatePages(){return computedNumberOfPageList.filter((function(element){return element>=currentPage-numberOfElementToDisplayAfterAndBeforeCurrentPage&&element<=currentPage+numberOfElementToDisplayAfterAndBeforeCurrentPage&&element!==computedLastPage})).map(displayElement)}(),function displayEllipsis(){return currentPage<computedLastPage-(numberOfElementToDisplayAfterAndBeforeCurrentPage+1)?__jsx("li",{className:Pagination_Pagination_module.ellipse},"…"):__jsx(react.Fragment,null)}(),function displayNext(){return __jsx(react.Fragment,null,displayElement(computedLastPage),__jsx("li",{key:"NextPageLiPagination"},__jsx("a",{href:createURL?createURL(currentPage+1):"#",className:"underline-none","aria-disabled":isLastPage,"aria-label":"Aller à la page suivante",onClick:function onClick(event){event.preventDefault(),isLastPage||onPageClick(currentPage+1)}},isSmallScreen?__jsx(Icon.J,{name:"angle-right"}):__jsx(react.Fragment,null,__jsx("span",null,"Page suivante")," ",__jsx(Icon.J,{name:"angle-right"})))),__jsx("li",{key:"LastLiPagination"},__jsx("a",{href:createURL?createURL(computedLastPage):"#",className:"underline-none","aria-disabled":isLastPage,"aria-label":"Aller à la dernière page",onClick:function onClick(event){event.preventDefault(),isLastPage||onPageClick(computedLastPage)}},__jsx(Icon.J,{name:"angle-right-from-line"}))))}())))}CommonPagination.__docgenInfo={description:"",methods:[],displayName:"CommonPagination",props:{currentPage:{required:!0,tsType:{name:"number"},description:""},onPageClick:{required:!0,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{name:"page",type:{name:"number"}}],return:{name:"void"}}},description:""},numberOfPageList:{required:!0,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:""},createURL:{required:!1,tsType:{name:"signature",type:"function",raw:"(page: number) => string",signature:{arguments:[{name:"page",type:{name:"number"}}],return:{name:"string"}}},description:""},isFirstPage:{required:!0,tsType:{name:"boolean"},description:""},isLastPage:{required:!0,tsType:{name:"boolean"},description:""},lastPage:{required:!0,tsType:{name:"number"},description:""},maxPage:{required:!1,tsType:{name:"number"},description:""}}};try{CommonPagination.displayName="CommonPagination",CommonPagination.__docgenInfo={description:"",displayName:"CommonPagination",props:{currentPage:{defaultValue:null,description:"",name:"currentPage",required:!0,type:{name:"number"}},onPageClick:{defaultValue:null,description:"",name:"onPageClick",required:!0,type:{name:"(page: number) => void"}},numberOfPageList:{defaultValue:null,description:"",name:"numberOfPageList",required:!0,type:{name:"number[]"}},createURL:{defaultValue:null,description:"",name:"createURL",required:!1,type:{name:"((page: number) => string)"}},isFirstPage:{defaultValue:null,description:"",name:"isFirstPage",required:!0,type:{name:"boolean"}},isLastPage:{defaultValue:null,description:"",name:"isLastPage",required:!0,type:{name:"boolean"}},lastPage:{defaultValue:null,description:"",name:"lastPage",required:!0,type:{name:"number"}},maxPage:{defaultValue:null,description:"",name:"maxPage",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Pagination/CommonPagination.tsx#CommonPagination"]={docgenInfo:CommonPagination.__docgenInfo,name:"CommonPagination",path:"src/client/components/ui/Pagination/CommonPagination.tsx#CommonPagination"})}catch(__react_docgen_typescript_loader_error){}var _Example$parameters,_Example$parameters2,Pagination_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function Pagination(_ref){var numberOfResult=_ref.numberOfResult,numberOfResultPerPage=_ref.numberOfResultPerPage,maxPage=_ref.maxPage,_useRouter=(0,router.useRouter)(),query=_useRouter.query,push=_useRouter.push,_useState=(0,react.useState)(0),currentPage=_useState[0],setCurrentPage=_useState[1];function _setCurrentPageAndQueryUrl(){return(_setCurrentPageAndQueryUrl=(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(page){return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return setCurrentPage(page),_context.next=3,push({query:_objectSpread(_objectSpread({},query),{},{page:page+1})});case 3:case"end":return _context.stop()}}),_callee)})))).apply(this,arguments)}(0,react.useEffect)((function setCurrentPageFromQueryUrl(){var page=query.page;page&&"string"==typeof page&&!isNaN(+page)?setCurrentPage(Number(page)-1):setCurrentPage(0)}),[setCurrentPage,query]);var numberOfPageList=(0,toConsumableArray.Z)(Array(Math.ceil(numberOfResult/numberOfResultPerPage)-1).keys()),isFirstPage=(0,react.useMemo)((function(){return 0===currentPage}),[currentPage]),isLastPage=(0,react.useMemo)((function(){return maxPage&&numberOfPageList.length>maxPage?currentPage===maxPage:currentPage===numberOfPageList.length}),[currentPage,maxPage,numberOfPageList.length]),lastPage=(0,react.useMemo)((function(){return Math.max(Math.ceil(numberOfResult/numberOfResultPerPage)-1,0)}),[numberOfResult,numberOfResultPerPage]);return Pagination_jsx(CommonPagination,{currentPage,onPageClick:function setCurrentPageAndQueryUrl(_x){return _setCurrentPageAndQueryUrl.apply(this,arguments)},isLastPage,numberOfPageList,lastPage,isFirstPage,maxPage})}Pagination.displayName="Pagination",Pagination.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{numberOfResult:{required:!0,tsType:{name:"number"},description:""},numberOfResultPerPage:{required:!0,tsType:{name:"number"},description:""},maxPage:{required:!1,tsType:{name:"number"},description:""}}};try{Pagination.displayName="Pagination",Pagination.__docgenInfo={description:"",displayName:"Pagination",props:{numberOfResult:{defaultValue:null,description:"",name:"numberOfResult",required:!0,type:{name:"number"}},numberOfResultPerPage:{defaultValue:null,description:"",name:"numberOfResultPerPage",required:!0,type:{name:"number"}},maxPage:{defaultValue:null,description:"",name:"maxPage",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/client/components/ui/Pagination/Pagination.tsx#Pagination"]={docgenInfo:Pagination.__docgenInfo,name:"Pagination",path:"src/client/components/ui/Pagination/Pagination.tsx#Pagination"})}catch(__react_docgen_typescript_loader_error){}function Pagination_stories_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function Pagination_stories_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?Pagination_stories_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):Pagination_stories_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Pagination_stories={component:Pagination,title:"Components/Pagination"};var Example={args:{numberOfResult:56,numberOfResultPerPage:10}};Example.parameters=Pagination_stories_objectSpread(Pagination_stories_objectSpread({},Example.parameters),{},{docs:Pagination_stories_objectSpread(Pagination_stories_objectSpread({},null===(_Example$parameters=Example.parameters)||void 0===_Example$parameters?void 0:_Example$parameters.docs),{},{source:Pagination_stories_objectSpread({originalSource:"{\n  args: {\n    numberOfResult: 56,\n    numberOfResultPerPage: 10\n  }\n}"},null===(_Example$parameters2=Example.parameters)||void 0===_Example$parameters2||null===(_Example$parameters2=_Example$parameters2.docs)||void 0===_Example$parameters2?void 0:_Example$parameters2.source)})})},"./src/client/hooks/useBreakpoint.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>useBreakpoint});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),BREAKPOINT=function(BREAKPOINT){return BREAKPOINT.SM="36em",BREAKPOINT.MD="48em",BREAKPOINT.LG="62em",BREAKPOINT}(BREAKPOINT||{});function getScreenSize(){return window.matchMedia("(min-width: ".concat(BREAKPOINT.LG,")")).matches?BREAKPOINT.LG:window.matchMedia("(min-width: ".concat(BREAKPOINT.MD,")")).matches?BREAKPOINT.MD:BREAKPOINT.SM}function useBreakpoint(){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getScreenSize()),screenSize=_useState[0],setScreenSize=_useState[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((function(){function handleDevice(){setScreenSize(getScreenSize())}return window.addEventListener("resize",handleDevice),function(){return window.removeEventListener("resize",handleDevice)}}),[]),{isLargeScreen:screenSize===BREAKPOINT.LG,isMediumScreen:screenSize===BREAKPOINT.MD,isSmallScreen:screenSize===BREAKPOINT.SM}}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[3]!./src/client/components/ui/Pagination/Pagination.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".nR1ZmrJoci_pY8qdlDzV{text-align:center;display:flex;justify-content:center;align-items:center}.nR1ZmrJoci_pY8qdlDzV li{color:#161616}.nR1ZmrJoci_pY8qdlDzV li a{display:inline-flex;justify-content:center;vertical-align:middle}.nR1ZmrJoci_pY8qdlDzV li a[aria-current=true]{outline-offset:4px}.nR1ZmrJoci_pY8qdlDzV li:first-child>a{padding:0;vertical-align:bottom}.nR1ZmrJoci_pY8qdlDzV li:last-child>a{padding:0;vertical-align:bottom}.nR1ZmrJoci_pY8qdlDzV li>a{padding:.5rem 1rem}.nR1ZmrJoci_pY8qdlDzV li>a[aria-disabled=true]{color:#929292;pointer-events:none}.nR1ZmrJoci_pY8qdlDzV li>a[aria-current=true]{background-color:#566bb1;color:#fff}","",{version:3,sources:["webpack://./src/client/components/ui/Pagination/Pagination.module.scss","webpack://./src/styles/theme/_variables-deprecated.scss"],names:[],mappings:"AAEA,sBACE,iBAAA,CACA,YAAA,CACA,sBAAA,CACA,kBAAA,CAEA,yBACE,aCiBI,CDfJ,2BACE,mBAAA,CACA,sBAAA,CACA,qBAAA,CAEA,8CACE,kBAAA,CAKN,uCACE,SAAA,CACA,qBAAA,CAGF,sCACE,SAAA,CACA,qBAAA,CAGF,2BACE,kBAAA,CAEA,+CACE,aCZS,CDaT,mBAAA,CAGF,8CACE,wBCpCM,CDqCN,UCtBE",sourcesContent:['@use "@styles/utilities-deprecated";\n\n.pagination {\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  li {\n    color: utilities-deprecated.$color-on-surface;\n\n    a {\n      display: inline-flex;\n      justify-content: center;\n      vertical-align: middle;\n\n      &[aria-current=true] {\n        outline-offset: 4px;\n      }\n    }\n  }\n\n  li:first-child > a {\n    padding: 0;\n    vertical-align: bottom;\n  }\n\n  li:last-child > a {\n    padding: 0;\n    vertical-align: bottom;\n  }\n\n  li > a {\n    padding: 0.5rem 1rem;\n\n    &[aria-disabled="true"] {\n      color: utilities-deprecated.$color-on-disabled;\n      pointer-events: none;\n    }\n\n    &[aria-current="true"] {\n      background-color: utilities-deprecated.$color-primary;\n      color: utilities-deprecated.$color-on-primary;\n    }\n  }\n\n}\n','@use "sass:color";\n/* ***************\n * Color palette\n * ***************/\n$blue-navy: #000091;\n$diva-blue: #566BB1;\n$majorelle-blue: #6E61E9;\n$night-blue: #040085;\n$smalt-blue: #53918C;\n$cornflower-blue: #735BF2;\n$deepslate-blue: #455A64;\n$auricula-purple: #6E445A;\n$tapestry: #A558A0;\n$dark-vinaceous: #A66465;\n$coral: #E4794A;\n$seashell-peach: #FFF4ED;\n$brazil-red: #B34000;\n$scarlet-red: #CE0500;\n$cerro-green: #61803E;\n$duck-green: #18753C;\n$white: #FFFFFF;\n$white-lilac: #F6F7FB;\n$white-titan: #ECECFF;\n$light-neutral-grey: #EEEEEE;\n$neutral-grey: #929292;\n$deep-neutral-grey: #666666;\n$black: #161616;\n$anti-flash-white: #030f8f0d;\n\n/* ***************\n * Semantic colors\n * ***************/\n$color-primary: $diva-blue;\n$color-primary-on-hover: $night-blue;\n$color-on-primary: $white;\n$color-secondary: $duck-green;\n$color-on-secondary: $white;\n$color-tertiary: $white-titan;\n$color-tertiary-on-hover: $majorelle-blue;\n$color-background-white-lilac: $white-lilac;\n$color-background-white-titan: $white-titan;\n$color-background: $white;\n$color-on-background: $black;\n$color-surface: $white;\n$color-on-surface: $black;\n$color-cej-background : #EA711B;\n$color-header-on-hover: $cornflower-blue;\n$campagne-CEJ-primary: $brazil-red;\n$mentorat-primary: $brazil-red;\n\n$color-error: $scarlet-red;\n$color-mention-grey: $deep-neutral-grey;\n$color-disabled: $white;\n$color-on-disabled: $neutral-grey;\n\n$color-blue-navy: $blue-navy;\n$color-lighten-blue-navy: lighten($color-blue-navy, 67%);\n$color-tapestry: $tapestry;\n$color-lighten-tapestry: lighten($color-tapestry, 45%);\n$color-smalt-blue: $smalt-blue;\n$color-lighten-smalt-blue: lighten($color-smalt-blue, 48%);\n$color-coral: $coral;\n$color-lighten-coral: $seashell-peach;\n\n$color-separator: $light-neutral-grey;\n$color-form-field: $white-lilac;\n$color-mine-shaft: #3A3A3A;\n$color-skeleton: $light-neutral-grey;\n$color-cadre-formulaire: $white-lilac;\n$color-tag: $light-neutral-grey;\n\n$color-focus-outline: $color-primary;\n\n$color-combobox-option-hover: $anti-flash-white;\n$color-combobox-border: $neutral-grey;\n$color-combobox-list-border: $light-neutral-grey;\n$color-combobox-list-background: $color-background;\n$color-combobox-disabled: $color-on-disabled;\n$color-combobox-error: $color-error;\n\n/* ***************\n * Shadows\n * ***************/\n$box-shadow: 10px 10px 20px rgba(22, 22, 22, 0.05);\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={pagination:"nR1ZmrJoci_pY8qdlDzV"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"?c969":()=>{},"?3e83":()=>{},"?19e6":()=>{}}]);