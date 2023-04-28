"use strict";(self.webpackChunk_1_j_1_s_front_docs=self.webpackChunk_1_j_1_s_front_docs||[]).push([[896],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),l=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(s.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},h=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(t),h=o,m=p["".concat(s,".").concat(h)]||p[h]||d[h]||i;return t?r.createElement(m,a(a({ref:n},u),{},{components:t})):r.createElement(m,a({ref:n},u))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=h;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c[p]="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}h.displayName="MDXCreateElement"},4094:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var r=t(7462),o=(t(7294),t(3905));const i={sidebar_label:"La recherche index\xe9e, comment \xe7a marche ?",sidebar_position:3},a="la recherche index\xe9e",c={unversionedId:"tuto/recherche-indexe",id:"tuto/recherche-indexe",title:"la recherche index\xe9e",description:"20 Avril 2023",source:"@site/docs/tuto/recherche-indexe.md",sourceDirName:"tuto",slug:"/tuto/recherche-indexe",permalink:"/1j1s-front/docs/tuto/recherche-indexe",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/tuto/recherche-indexe.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_label:"La recherche index\xe9e, comment \xe7a marche ?",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"La recherche via API, comment \xe7a marche ?",permalink:"/1j1s-front/docs/tuto/recherche-api"},next:{title:"Aide au d\xe9veloppement",permalink:"/1j1s-front/docs/tuto/depannage"}},s={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Comment \xe7a marche ?",id:"comment-\xe7a-marche-",level:2},{value:"Les pages concern\xe9es",id:"les-pages-concern\xe9es",level:2},{value:"Une recherche de contenu index\xe9 est indisponible",id:"une-recherche-de-contenu-index\xe9-est-indisponible",level:2},{value:"Une recherche de contenu index\xe9 m\xe8ne vers une page non trouv\xe9e",id:"une-recherche-de-contenu-index\xe9-m\xe8ne-vers-une-page-non-trouv\xe9e",level:2}],u={toc:l},p="wrapper";function d(e){let{components:n,...t}=e;return(0,o.kt)(p,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"la-recherche-index\xe9e"},"la recherche index\xe9e"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"20 Avril 2023")),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"Les pages permettant de rechercher des r\xe9sultats index\xe9s pr\xe9sentent un formulaire qui, une fois soumis, met \xe0 jour les param\xe8tres de recherche dans l'url et requ\xeate les donn\xe9es index\xe9es dans Meilisearch."),(0,o.kt)("h2",{id:"comment-\xe7a-marche-"},"Comment \xe7a marche ?"),(0,o.kt)("p",null,"Les pages permettant de rechercher des r\xe9sultats index\xe9s s'appuient sur la librairie ",(0,o.kt)("inlineCode",{parentName:"p"},"@meilisearch/instant-meilisearch"),"\net son composant ",(0,o.kt)("inlineCode",{parentName:"p"},"InstantSearch"),". Les r\xe9sultats r\xe9cup\xe9r\xe9s proviennent de Meilisearch, des objets charg\xe9s par\nl'",(0,o.kt)("a",{parentName:"p",href:"https://github.com/DNUM-SocialGouv/1j1s-etl"},"ETL")," \xe0 partir d'un flux. L'URL est compl\xe8tement manipul\xe9e par la\nlibrairie. Chaque changement dans un filtre lance une requ\xeate HTTP pour mettre \xe0 jour les r\xe9sultats en cons\xe9quence. "),(0,o.kt)("h2",{id:"les-pages-concern\xe9es"},"Les pages concern\xe9es"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.1jeune1solution.gouv.fr/stages"},"stages")," "),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.1jeune1solution.gouv.fr/logements/annonces"},"annonces de logement")," "),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.1jeune1solution.gouv.fr/decouvrir-les-metiers"},"fiches m\xe9tier")," "),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.1jeune1solution.gouv.fr/evenements"},"\xe9v\xe9nements")," ")),(0,o.kt)("h1",{id:"que-faire-si"},"Que faire si..."),(0,o.kt)("h2",{id:"une-recherche-de-contenu-index\xe9-est-indisponible"},"Une recherche de contenu index\xe9 est indisponible"),(0,o.kt)("p",null,"Votre conteneur Docker comprenant Meilisearch est-il bien lanc\xe9 et configur\xe9 ?"),(0,o.kt)("h2",{id:"une-recherche-de-contenu-index\xe9-m\xe8ne-vers-une-page-non-trouv\xe9e"},"Une recherche de contenu index\xe9 m\xe8ne vers une page non trouv\xe9e"),(0,o.kt)("p",null,"Appelez-vous le m\xeame Meilisearch que votre CMS ? Les 2 devraient \xeatre reli\xe9 \xe0 votre conteneur Docker\nAvez-vous saisi du contenu dans Meilisearch ?\nSi oui, cliquez sur ",(0,o.kt)("inlineCode",{parentName:"p"},"refresh")," sur l'index sur votre Strapi."))}d.isMDXComponent=!0}}]);