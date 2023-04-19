"use strict";(self.webpackChunk_1_j_1_s_front_docs=self.webpackChunk_1_j_1_s_front_docs||[]).push([[217],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,k=m["".concat(s,".").concat(d)]||m[d]||c[d]||l;return n?r.createElement(k,o(o({ref:t},u),{},{components:n})):r.createElement(k,o({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[m]="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9803:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const l={},o="Installation pour le d\xe9veloppement sur 1j1s-front",i={unversionedId:"installation",id:"installation",title:"Installation pour le d\xe9veloppement sur 1j1s-front",description:"Pr\xe9-requis",source:"@site/docs/installation.md",sourceDirName:".",slug:"/installation",permalink:"/1j1s-front/docs/installation",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/installation.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Fonctionnalit\xe9s du site 1jeune1solution",permalink:"/1j1s-front/docs/fonctionnalites"},next:{title:"Standards d'\xe9quipe",permalink:"/1j1s-front/docs/standards"}},s={},p=[{value:"Pr\xe9-requis",id:"pr\xe9-requis",level:2},{value:"Pour aller plus loin dans l&#39;\xe9cosyst\xe8me 1j1s (optionnel)",id:"pour-aller-plus-loin-dans-l\xe9cosyst\xe8me-1j1s-optionnel",level:2},{value:"Pr\xe9-requis pour avoir un environnement local pleinement fonctionnel",id:"pr\xe9-requis-pour-avoir-un-environnement-local-pleinement-fonctionnel",level:2},{value:"Lancer le projet",id:"lancer-le-projet",level:2},{value:"Commandes utiles",id:"commandes-utiles",level:3}],u={toc:p},m="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"installation-pour-le-d\xe9veloppement-sur-1j1s-front"},"Installation pour le d\xe9veloppement sur 1j1s-front"),(0,a.kt)("h2",{id:"pr\xe9-requis"},"Pr\xe9-requis"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.npmjs.com/"},"npm")," version 9, ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/nvm-sh/nvm"},"nvm")," recommand\xe9"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://nodejs.org/fr/"},"NodeJS"),", version 18"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.docker.com/desktop/"},"Docker")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.docker.com/compose/"},"docker-compose")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/DNUM-SocialGouv/1j1s-main-cms"},"CMS principal"))),(0,a.kt)("h2",{id:"pour-aller-plus-loin-dans-l\xe9cosyst\xe8me-1j1s-optionnel"},"Pour aller plus loin dans l'\xe9cosyst\xe8me 1j1s (optionnel)"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/DNUM-SocialGouv/1j1s-test-charge"},"Projet test de performances")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/DNUM-SocialGouv/1j1s-front-lighthouse-report"},"Projet test lighthouse automatis\xe9")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/DNUM-SocialGouv/1j1s-stage-orchestrateur-transform-load"},"Projet chargement de donn\xe9es"))),(0,a.kt)("h2",{id:"pr\xe9-requis-pour-avoir-un-environnement-local-pleinement-fonctionnel"},"Pr\xe9-requis pour avoir un environnement local pleinement fonctionnel"),(0,a.kt)("p",null,"Il faut avoir :"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"lanc\xe9 le projet 1j1s-main-cms et peupl\xe9 les donn\xe9es via les scripts ",(0,a.kt)("inlineCode",{parentName:"li"},"npm run docker:populate")," et ",(0,a.kt)("inlineCode",{parentName:"li"},"npm run docker:start"),"  (voir documentation sur le repo concern\xe9)"),(0,a.kt)("li",{parentName:"ol"},"synchronis\xe9 la configuration sur l'interface d'administration du CMS / Strapi (",(0,a.kt)("inlineCode",{parentName:"li"},"Settings -> Config sync -> Interface"),'-> Cliquer sur "Import")'),(0,a.kt)("li",{parentName:"ol"},"dans Strapi (",(0,a.kt)("inlineCode",{parentName:"li"},"Content-Manager -> Collection Types -> User"),"), r\xe9cup\xe9r\xe9 les credentials de l'utilisateur 1j1s avec role formulaire pour renseigner la variable d'environnement ",(0,a.kt)("inlineCode",{parentName:"li"},"STRAPI_AUTH")," du projet 1j1s-front"),(0,a.kt)("li",{parentName:"ol"},"lanc\xe9 meilisearch et renseign\xe9 la master key avec la m\xeame valeur que la variable d'env ",(0,a.kt)("inlineCode",{parentName:"li"},"NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY"),"\nExemple : pour - MEILI_MASTER_KEY=${MEILI_MASTER_KEY:-masterKey}  dans docker-compose.yml du projet 1j1s-main-cms -> il faut avoir NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY=masterKey dans .env du projet 1j1s-front"),(0,a.kt)("li",{parentName:"ol"},"index\xe9 les collections du CMS via le plugin Meilisearch = cocher les collections \xe0 indexer (logements, offre de stages, fiches metiers...) sur interface Strapi")),(0,a.kt)("h2",{id:"lancer-le-projet"},"Lancer le projet"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Lancez redis dans votre terminal via ",(0,a.kt)("inlineCode",{parentName:"li"},"docker-compose up -d redis")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"nvm use")," pour sp\xe9cifier la version de node utilis\xe9e (si n\xe9cessaire)"),(0,a.kt)("li",{parentName:"ol"},"Installez les d\xe9pendances avec ",(0,a.kt)("inlineCode",{parentName:"li"},"npm ci")),(0,a.kt)("li",{parentName:"ol"},"Copiez le ",(0,a.kt)("inlineCode",{parentName:"li"},".env.test")," vers ",(0,a.kt)("inlineCode",{parentName:"li"},".env")," puis \xe9ditez les valeurs \xe0 votre convenance"),(0,a.kt)("li",{parentName:"ol"},"Lancez le projet en mode d\xe9veloppement avec ",(0,a.kt)("inlineCode",{parentName:"li"},"npm run dev")),(0,a.kt)("li",{parentName:"ol"},"Ouvrez votre navigateur sur ",(0,a.kt)("a",{parentName:"li",href:"http://localhost:3000"},"http://localhost:3000"))),(0,a.kt)("h3",{id:"commandes-utiles"},"Commandes utiles"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Commande"),(0,a.kt)("th",{parentName:"tr",align:null},"Fonction"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run lint"),(0,a.kt)("td",{parentName:"tr",align:null},"V\xe9rifie le formatage du code")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run lint:fix"),(0,a.kt)("td",{parentName:"tr",align:null},"Formater le code")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run test"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run tw"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests avec un watcher")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run test:coverage"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests en indiquant le test coverage")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run dev"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance le site en mode d\xe9veloppeur (avec hot reload)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run start"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance le site en mode fixe (sans hot reload)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run build"),(0,a.kt)("td",{parentName:"tr",align:null},"build le site comme en production")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run analyze"),(0,a.kt)("td",{parentName:"tr",align:null},"Analyze la taille du site et des packages")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run analyze:server"),(0,a.kt)("td",{parentName:"tr",align:null},"Analyze la taille du site et des packages c\xf4t\xe9 serveur")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run e2e"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests cypress (n\xe9cessite que le site tourne)")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"npm run e2e:open"),(0,a.kt)("td",{parentName:"tr",align:null},"Lance les tests cypress (n\xe9cessite que le site tourne)")))))}c.isMDXComponent=!0}}]);