(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[3638,8735],{"./node_modules/@storybook/addon-docs/dist/DocsRenderer-CFRXHY34.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{DocsRenderer:()=>DocsRenderer});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),react_18=__webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"),defaultComponents={code:dist.XA,a:dist.zE,...dist.Sw},ErrorBoundary=class extends react.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:react.createElement(react.Fragment,null,children)}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=dist.kQ;return new Promise(((resolve,reject)=>{__webpack_require__.e(1294).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@mdx-js/react/index.js")).then((({MDXProvider})=>(0,react_18.renderElement)(react.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react.createElement(MDXProvider,{components},react.createElement(TDocs,{context,docsParameter}))),element))).then((()=>resolve()))}))},this.unmount=element=>{(0,react_18.unmountElement)(element)}}};__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-H6MOWX77.mjs")},"./node_modules/@storybook/react-dom-shim/dist/react-18.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{renderElement:()=>renderElement,unmountElement:()=>unmountElement});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_dom_client__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react-dom/client.js"),nodes=new Map;var WithCallback=({callback,children})=>{let once=react__WEBPACK_IMPORTED_MODULE_0__.useRef();return react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect((()=>{once.current!==callback&&(once.current=callback,callback())}),[callback]),children};typeof Promise.withResolvers>"u"&&(Promise.withResolvers=()=>{let resolve=null,reject=null;return{promise:new Promise(((res,rej)=>{resolve=res,reject=rej})),resolve,reject}});var renderElement=async(node,el,rootOptions)=>{let root=await getReactRoot(el,rootOptions);if(function getIsReactActEnvironment(){return globalThis.IS_REACT_ACT_ENVIRONMENT}())return void root.render(node);let{promise,resolve}=Promise.withResolvers();return root.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(WithCallback,{callback:resolve},node)),promise},unmountElement=(el,shouldUseNewRootApi)=>{let root=nodes.get(el);root&&(root.unmount(),nodes.delete(el))},getReactRoot=async(el,rootOptions)=>{let root=nodes.get(el);return root||(root=react_dom_client__WEBPACK_IMPORTED_MODULE_1__.H(el,rootOptions),nodes.set(el,root)),root}},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/next/dist/compiled/react-dom/client.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var m=__webpack_require__("./node_modules/next/dist/compiled/react-dom/index.js");exports.H=m.createRoot,m.hydrateRoot},"./node_modules/storybook/node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/storybook/node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/storybook/node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/storybook/node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext}}]);