"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[5766],{"./src/client/components/ui/TimeRange/TimeRange.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _Example_parameters,_Example_parameters_docs,_Example_parameters1;__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/TimeRange/TimeRange.tsx").z,title:"Components/TimeRange"},Example={args:{end:"19:00:00",start:"14:14:14"}};Example.parameters={...Example.parameters,docs:{...null===(_Example_parameters=Example.parameters)||void 0===_Example_parameters?void 0:_Example_parameters.docs,source:{originalSource:"{\n  args: {\n    end: '19:00:00',\n    start: '14:14:14'\n  }\n}",...null===(_Example_parameters1=Example.parameters)||void 0===_Example_parameters1||null===(_Example_parameters_docs=_Example_parameters1.docs)||void 0===_Example_parameters_docs?void 0:_Example_parameters_docs.source}}};const __namedExportsOrder=["Example"]},"./src/client/components/ui/TimeRange/TimeRange.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>TimeRange});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function TimeRange(param){let{end,start}=param;const formatTime=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((time=>{const split=time.split(":");return"".concat(split[0],"h").concat("00"!==split[1]?split[1]:"")}),[]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("time",{dateTime:start,children:formatTime(start)})," - ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("time",{dateTime:end,children:formatTime(end)})]})}TimeRange.__docgenInfo={description:"",methods:[],displayName:"TimeRange",props:{end:{required:!0,tsType:{name:"string"},description:""},start:{required:!0,tsType:{name:"string"},description:""}}}},"./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/next/dist/compiled/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js")}}]);