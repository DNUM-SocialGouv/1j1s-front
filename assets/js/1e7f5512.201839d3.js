"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[325],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(f,i(i({ref:t},l),{},{components:n})):r.createElement(f,i({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[m]="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2427:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_label:"Une campagne de com' Adform, comment on fait ?",sidebar_position:4},i="Le marketing avec Adform",c={unversionedId:"tuto/campagne-adform",id:"tuto/campagne-adform",title:"Le marketing avec Adform",description:"05 septembre 2023",source:"@site/docs/tuto/campagne-adform.md",sourceDirName:"tuto",slug:"/tuto/campagne-adform",permalink:"/1j1s-front/docs/tuto/campagne-adform",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/tuto/campagne-adform.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_label:"Une campagne de com' Adform, comment on fait ?",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"La recherche index\xe9e, comment \xe7a marche ?",permalink:"/1j1s-front/docs/tuto/recherche-indexe"},next:{title:"Aide au d\xe9veloppement",permalink:"/1j1s-front/docs/tuto/depannage"}},s={},p=[{value:"Introduction",id:"introduction",level:2},{value:"Comment \xe7a marche ?",id:"comment-\xe7a-marche-",level:2}],l={toc:p},m="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"le-marketing-avec-adform"},"Le marketing avec Adform"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"05 septembre 2023")),(0,a.kt)("h2",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"Quand on fait une campagne de com, on veut tracker o\xf9 les utilisateurs arrivent, d'o\xf9 ils viennent, etc."),(0,a.kt)("h2",{id:"comment-\xe7a-marche-"},"Comment \xe7a marche ?"),(0,a.kt)("p",null,"Le ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/services/marketing/marketing.service.ts"},(0,a.kt)("inlineCode",{parentName:"a"},"MarketingService")),"\ninitialise le service, le configure et l'ajoute au gestionnaire de cookies \xe0 l'instanciation dans le conteneur d'injection.\nCe service est commun \xe0 toutes les campagnes de com'.\n\xc0 ce service s'ajoute le hook ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/hooks/useMarketing.ts"},(0,a.kt)("inlineCode",{parentName:"a"},"useMarketing")),".\nCe hook doit \xeatre appel\xe9 sur chaque page track\xe9e dans la campagne et prend en param\xe8tre le ",(0,a.kt)("em",{parentName:"p"},"page name")," fournit par Adform."),(0,a.kt)("p",null,"E.g. ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/DNUM-SocialGouv/1j1s-front/blob/b27b2a8249540c4b710d857de9e66c08bcaeee2f/src/pages/choisir-apprentissage/index.page.tsx#L25C2-L25C2"},"pour la campagne apprentissage")," : "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"// src/pages/choisir-apprentissage/index.page.tsx\n\nconst PAGE_NAME = '2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage';\n\nexport default function ApprentissageJeunes(props) {\n  useMarketing(PAGE_NAME);\n  // ...\n}\n")),(0,a.kt)("p",null,"Il est ensuite possible d'activer le tracking au d\xe9but de la campagne en activant simplement le feature flip associ\xe9 : "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"NEXT_PUBLIC_CAMPAGNE_ADFORM_FEATURE=1\n")))}u.isMDXComponent=!0}}]);