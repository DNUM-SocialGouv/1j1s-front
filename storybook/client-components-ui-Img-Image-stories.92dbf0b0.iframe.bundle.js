"use strict";(self.webpackChunk_1j1s_front=self.webpackChunk_1j1s_front||[]).push([[3648],{"./src/client/components/ui/Img/Image.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,exemple:()=>exemple,sourceInvalide:()=>sourceInvalide});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/client/components/ui/Img/Image.tsx")._,title:"Components/Image"},exemple={args:{alt:"",height:216,src:"https://picsum.photos/384/216",width:384}},sourceInvalide={args:{alt:"",height:216,src:"/invalid/image",width:384}},__namedExportsOrder=["exemple","sourceInvalide"];exemple.parameters={...exemple.parameters,docs:{...exemple.parameters?.docs,source:{originalSource:"{\n  args: {\n    alt: '',\n    height: 216,\n    src: 'https://picsum.photos/384/216',\n    width: 384\n  }\n}",...exemple.parameters?.docs?.source}}},sourceInvalide.parameters={...sourceInvalide.parameters,docs:{...sourceInvalide.parameters?.docs,source:{originalSource:"{\n  args: {\n    alt: '',\n    height: 216,\n    src: '/invalid/image',\n    width: 384\n  }\n}",...sourceInvalide.parameters?.docs?.source}}}},"./src/client/components/ui/Img/Image.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>Image});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),next_image__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const Image=react__WEBPACK_IMPORTED_MODULE_2__.forwardRef((function Image({src,onError:onErrorProps=doNothing,...props},ref){const[error,setError]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_1__.A,{...props,src:error?"/images/placeholder.webp":src,onError:(...args)=>{setError(!0),onErrorProps(...args)},ref})}));function doNothing(){}Image.__docgenInfo={description:"",methods:[],displayName:"Image",props:{onError:{defaultValue:{value:"function doNothing() {}",computed:!1},required:!1}}}}}]);