"use strict";(self.webpackChunk_1_j_1_s_front_docs=self.webpackChunk_1_j_1_s_front_docs||[]).push([[70],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=l(n),d=a,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||s;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var l=2;l<s;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9425:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const s={},o="Comment \xe7a marche...",i={unversionedId:"aide",id:"aide",title:"Comment \xe7a marche...",description:"... le tracking ?",source:"@site/docs/aide.md",sourceDirName:".",slug:"/aide",permalink:"/1j1s-front/docs/aide",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/aide.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ADR",permalink:"/1j1s-front/docs/adr/"},next:{title:"Aide au d\xe9veloppement",permalink:"/1j1s-front/docs/depannage"}},c={},l=[{value:"... le tracking ?",id:"-le-tracking-",level:2},{value:"... la recherche via API (offres d&#39;emploi, jobs \xe9tudiants, jobs d&#39;\xe9t\xe9, alternances, formations en apprentissage, accompagnement)",id:"-la-recherche-via-api-offres-demploi-jobs-\xe9tudiants-jobs-d\xe9t\xe9-alternances-formations-en-apprentissage-accompagnement",level:2},{value:"... la recherche index\xe9e (stages, annonces de logement, fiches m\xe9tier, \xe9v\xe9nements)",id:"-la-recherche-index\xe9e-stages-annonces-de-logement-fiches-m\xe9tier-\xe9v\xe9nements",level:2}],p={toc:l},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"comment-\xe7a-marche"},"Comment \xe7a marche..."),(0,a.kt)("h2",{id:"-le-tracking-"},"... le tracking ?"),(0,a.kt)("p",null,"Le tracking (ou analytics) est d\xe9compos\xe9 en 2 cat\xe9gories de tags\xa0:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"impression = arriv\xe9e sur une page ou passage d'\xe9tape d'un formulaire."),(0,a.kt)("li",{parentName:"ul"},"\xe9v\xe9nements = interactions utilisateurs sur des call to actions")),(0,a.kt)("p",null,"Les fonctions correspondantes se trouvent dans\nl'",(0,a.kt)("a",{parentName:"p",href:"https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/services/analytics/analytics.service.ts"},(0,a.kt)("inlineCode",{parentName:"a"},"AnalyticsService"))," et sont expos\xe9es aux composants depuis le\nhook ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/hooks/useAnalytics.ts"},(0,a.kt)("inlineCode",{parentName:"a"},"useAnalytics"))," qui s'occupe par d\xe9faut d'envoyer les analytics d'une page selon\nune configuration qui lui est envoy\xe9e. D'ailleurs, la configuration \xe0 envoyer de chaque page se trouve dans le dossier\nde la page en question, dans un fichier de la forme ",(0,a.kt)("inlineCode",{parentName:"p"},"*.analytics.ts"),"."),(0,a.kt)("h2",{id:"-la-recherche-via-api-offres-demploi-jobs-\xe9tudiants-jobs-d\xe9t\xe9-alternances-formations-en-apprentissage-accompagnement"},"... la recherche via API (offres d'emploi, jobs \xe9tudiants, jobs d'\xe9t\xe9, alternances, formations en apprentissage, accompagnement)"),(0,a.kt)("p",null,"Les pages permettant de rechercher des r\xe9sultats non index\xe9s pr\xe9sentent un formulaire qui, une fois soumis, met\nseulement \xe0 jour les param\xe8tres de recherche dans l'url. Un composant d\xe9di\xe9 \xe0 chaque recherche \xe9coute ces changements de\nparam\xe8tres pour, le cas \xe9ch\xe9ant, lancer une nouvelle requ\xeate HTTP. Une fois la r\xe9ponse obtenue, la page des r\xe9sultats\nest mise \xe0 jour \xe0 l'aide de la r\xe9ponse, en mode CSR (client side rendering)."),(0,a.kt)("h2",{id:"-la-recherche-index\xe9e-stages-annonces-de-logement-fiches-m\xe9tier-\xe9v\xe9nements"},"... la recherche index\xe9e (stages, annonces de logement, fiches m\xe9tier, \xe9v\xe9nements)"),(0,a.kt)("p",null,"Les pages permettant de rechercher des r\xe9sultats index\xe9s s'appuient sur la librairie ",(0,a.kt)("inlineCode",{parentName:"p"},"@meilisearch/instant-meilisearch"),"\net son composant ",(0,a.kt)("inlineCode",{parentName:"p"},"InstantSearch"),". Les r\xe9sultats r\xe9cup\xe9r\xe9s proviennent de Meilisearch, des objets charg\xe9s par\nl'",(0,a.kt)("a",{parentName:"p",href:"https://github.com/DNUM-SocialGouv/1j1s-etl"},"ETL")," \xe0 partir d'un flux. L'URL est compl\xe8tement manipul\xe9e par la\nlibrairie. Chaque changement dans un filtre lance une requ\xeate HTTP pour mettre \xe0 jour les r\xe9sultats en cons\xe9quence."))}m.isMDXComponent=!0}}]);