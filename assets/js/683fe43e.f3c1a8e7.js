"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[655],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var o=n.createContext({}),a=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=a(e.components);return n.createElement(o.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},v=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,u=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=a(r),v=i,f=p["".concat(o,".").concat(v)]||p[v]||d[v]||u;return r?n.createElement(f,s(s({ref:t},c),{},{components:r})):n.createElement(f,s({ref:t},c))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var u=r.length,s=new Array(u);s[0]=v;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[p]="string"==typeof e?e:i,s[1]=l;for(var a=2;a<u;a++)s[a]=r[a];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}v.displayName="MDXCreateElement"},504:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>d,frontMatter:()=>u,metadata:()=>l,toc:()=>a});var n=r(7462),i=(r(7294),r(3905));const u={},s="Utiliser UserEvent au lieu de FireEvent",l={unversionedId:"adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent",id:"adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent",title:"Utiliser UserEvent au lieu de FireEvent",description:"12 septembre 2023",source:"@site/docs/adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent.md",sourceDirName:"adr",slug:"/adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent",permalink:"/1j1s-front/docs/adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Fragmenter le style des media queries dans le selecteur",permalink:"/1j1s-front/docs/adr/2023-09-12.fragmenter-style-media-queries-dans-le-selecteur"},next:{title:"Utiliser un mix d'imports relatifs et absolu",permalink:"/1j1s-front/docs/adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu"}},o={},a=[{value:"TL;DR",id:"tldr",level:2},{value:"Contributeurs",id:"contributeurs",level:2},{value:"Statut",id:"statut",level:2},{value:"Contexte",id:"contexte",level:2},{value:"D\xe9cision",id:"d\xe9cision",level:2},{value:"Cons\xe9quences",id:"cons\xe9quences",level:2}],c={toc:a},p="wrapper";function d(e){let{components:t,...r}=e;return(0,i.kt)(p,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"utiliser-userevent-au-lieu-de-fireevent"},"Utiliser UserEvent au lieu de FireEvent"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"12 septembre 2023")),(0,i.kt)("h2",{id:"tldr"},"TL;DR"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Utiliser userEvent et ne plus utiliser fireEvent")),(0,i.kt)("h2",{id:"contributeurs"},"Contributeurs"),(0,i.kt)("p",null,"Gauthier Fiorentino, Suxue Li, Dorian De Rosa, Julie Brunetto"),(0,i.kt)("h2",{id:"statut"},"Statut"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Accept\xe9")),(0,i.kt)("h2",{id:"contexte"},"Contexte"),(0,i.kt)("p",null,"Actuellement, notre code utilise \xe0 la fois fireEvent et userEvent. fireEvent est utilis\xe9 pour simuler des \xe9v\xe9nements\ndu DOM, tandis que le userEvent est utilis\xe9 pour simuler des interactions utilisateur plut\xf4t que des \xe9v\xe9nements\nconcrets. C'est pourquoi nous devons d\xe9sormais privil\xe9gier l'utilisation de userEvent pour tester les interactions avec\nnos composants."),(0,i.kt)("h2",{id:"d\xe9cision"},"D\xe9cision"),(0,i.kt)("p",null,"Utiliser userEvent et ne plus utiliser fireEvent pour simuler l'action d'un utilisateur\nUtiliser userEvent.setup() \xe0 la place de UserEvent pour simuler un unique utilisateur"),(0,i.kt)("h2",{id:"cons\xe9quences"},"Cons\xe9quences"),(0,i.kt)("p",null,"Repasser en BSR sur les fireEvent pour les transformer en userEvent.\nSur les nouveaux d\xe9veloppements utiliser userEvent"))}d.isMDXComponent=!0}}]);