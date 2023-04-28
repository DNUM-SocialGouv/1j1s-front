"use strict";(self.webpackChunk_1_j_1_s_front_docs=self.webpackChunk_1_j_1_s_front_docs||[]).push([[738],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,k=u["".concat(p,".").concat(m)]||u[m]||c[m]||l;return n?r.createElement(k,o(o({ref:t},d),{},{components:n})):r.createElement(k,o({ref:t},d))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5334:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const l={sidebar_label:"Lancer le front",sidebar_position:2},o="Lancer le projet 1j1s-front",i={unversionedId:"onboarding/installation",id:"onboarding/installation",title:"Lancer le projet 1j1s-front",description:"20 Avril 2023",source:"@site/docs/onboarding/installation.md",sourceDirName:"onboarding",slug:"/onboarding/installation",permalink:"/1j1s-front/docs/onboarding/installation",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/onboarding/installation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Lancer le front",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Pr\xe9requis d'installation",permalink:"/1j1s-front/docs/onboarding/prerequis"},next:{title:"Liste des fonctionnalit\xe9s",permalink:"/1j1s-front/docs/onboarding/fonctionnalites"}},p={},s=[{value:"\xc9tapes",id:"\xe9tapes",level:2},{value:"Commandes utiles",id:"commandes-utiles",level:3}],d={toc:s},u="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"lancer-le-projet-1j1s-front"},"Lancer le projet 1j1s-front"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"20 Avril 2023")),(0,a.kt)("h2",{id:"\xe9tapes"},"\xc9tapes"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Lancez redis dans votre terminal via ",(0,a.kt)("inlineCode",{parentName:"li"},"docker-compose up -d redis")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"nvm use")," pour sp\xe9cifier la version de node utilis\xe9e (si n\xe9cessaire)"),(0,a.kt)("li",{parentName:"ol"},"Installez les d\xe9pendances avec ",(0,a.kt)("inlineCode",{parentName:"li"},"npm ci")),(0,a.kt)("li",{parentName:"ol"},"Copiez le ",(0,a.kt)("inlineCode",{parentName:"li"},".env.test")," vers ",(0,a.kt)("inlineCode",{parentName:"li"},".env")," puis \xe9ditez les valeurs \xe0 votre convenance"),(0,a.kt)("li",{parentName:"ol"},"Lancez le projet en mode d\xe9veloppement avec ",(0,a.kt)("inlineCode",{parentName:"li"},"npm run dev")),(0,a.kt)("li",{parentName:"ol"},"Ouvrez votre navigateur sur ",(0,a.kt)("a",{parentName:"li",href:"http://localhost:3000"},"http://localhost:3000"))),(0,a.kt)("h3",{id:"commandes-utiles"},"Commandes utiles"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Commande"),(0,a.kt)("th",{parentName:"tr",align:null},"Fonction"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run lint"),(0,a.kt)("td",{parentName:"tr",align:null},"V\xe9rifie le formatage du code")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run lint:fix"),(0,a.kt)("td",{parentName:"tr",align:null},"Formater le code")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run test"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run tw"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests avec un watcher")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run test:coverage"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests en indiquant le test coverage")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run dev"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance le site en mode d\xe9veloppeur (avec hot reload)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run start"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance le site en mode fixe (sans hot reload)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run build"),(0,a.kt)("td",{parentName:"tr",align:null},"build le site comme en production")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run analyze"),(0,a.kt)("td",{parentName:"tr",align:null},"Analyze la taille du site et des packages")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run analyze:server"),(0,a.kt)("td",{parentName:"tr",align:null},"Analyze la taille du site et des packages c\xf4t\xe9 serveur")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run e2e"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests cypress (n\xe9cessite que le site tourne)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run e2e:open"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests cypress (n\xe9cessite que le site tourne)")))))}c.isMDXComponent=!0}}]);