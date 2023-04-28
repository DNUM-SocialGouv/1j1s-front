"use strict";(self.webpackChunk_1_j_1_s_front_docs=self.webpackChunk_1_j_1_s_front_docs||[]).push([[966],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=r.createContext({}),c=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(o.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,s=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,f=p["".concat(o,".").concat(m)]||p[m]||d[m]||s;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=n.length,a=new Array(s);a[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[p]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<s;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9001:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const s={sidebar_label:"Architecture",sidebar_position:1},a="Architecture de 1j1s-front",l={unversionedId:"architecture/architecture",id:"architecture/architecture",title:"Architecture de 1j1s-front",description:"20 Avril 2023",source:"@site/docs/architecture/architecture.md",sourceDirName:"architecture",slug:"/architecture/",permalink:"/1j1s-front/docs/architecture/",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/architecture/architecture.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_label:"Architecture",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"\ud83d\uddfa\ufe0f Architecture",permalink:"/1j1s-front/docs/category/\ufe0f-architecture"},next:{title:"Flux",permalink:"/1j1s-front/docs/architecture/ecosysteme"}},o={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Technologies",id:"technologies",level:2},{value:"ADR (Architectural Decision Record)",id:"adr-architectural-decision-record",level:2},{value:"G\xe9n\xe9ration des pages web",id:"g\xe9n\xe9ration-des-pages-web",level:2},{value:"Structure",id:"structure",level:2},{value:"Client",id:"client",level:3},{value:"Pages",id:"pages",level:3},{value:"Server",id:"server",level:3},{value:"Styles",id:"styles",level:3},{value:"Nomenclature des fichiers",id:"nomenclature-des-fichiers",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...s}=e;return(0,i.kt)(p,(0,r.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"architecture-de-1j1s-front"},"Architecture de 1j1s-front"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"20 Avril 2023")),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"Propuls\xe9 par NextJS, l'application est d\xe9coup\xe9e de la sorte\xa0:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Une partie ",(0,i.kt)("inlineCode",{parentName:"li"},"client")," qui pr\xe9sente ce qui est affich\xe9 \xe0 nos utilisateurs"),(0,i.kt)("li",{parentName:"ul"},"Une partie ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," qui nous sert d'interfaces avec ",(0,i.kt)("a",{parentName:"li",href:"./ecosysteme#services-externes"},"les services externes consomm\xe9s"))),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Architecture 1j1s-front",src:n(9055).Z,width:"5901",height:"8058"})),(0,i.kt)("h2",{id:"technologies"},"Technologies"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Langage\xa0: TypeScript"),(0,i.kt)("li",{parentName:"ul"},"Framework\xa0: NextJS"),(0,i.kt)("li",{parentName:"ul"},"Environnement serveur\xa0: NodeJS"),(0,i.kt)("li",{parentName:"ul"},"Tests\xa0: Jest + React Testing library + Cypress"),(0,i.kt)("li",{parentName:"ul"},"Style\xa0: CSS Modules + Sass"),(0,i.kt)("li",{parentName:"ul"},"Package Manager\xa0: npm")),(0,i.kt)("h2",{id:"adr-architectural-decision-record"},"ADR (Architectural Decision Record)"),(0,i.kt)("p",null,"Certains choix techniques sont expliqu\xe9s ",(0,i.kt)("a",{parentName:"p",href:"../ADR"},"l'ADR"),"."),(0,i.kt)("h2",{id:"g\xe9n\xe9ration-des-pages-web"},"G\xe9n\xe9ration des pages web"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"G\xe9n\xe9ration des pages web",src:n(1984).Z,width:"1306",height:"1589"})),(0,i.kt)("p",null,"L'application exploite les possibilit\xe9s de NextJS pour optimiser les performances lors de la g\xe9n\xe9ration des pages web\xa0:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Des pages statiques (SSG), g\xe9n\xe9r\xe9es lors de l'\xe9tape de ",(0,i.kt)("inlineCode",{parentName:"li"},"build"),' de l\'application pour quelques "pages de base" (accueil, pages de recherche, etc.)'),(0,i.kt)("li",{parentName:"ul"},"Des pages statiques cr\xe9\xe9es \xe0 la demande et mises \xe0 jour p\xe9riodiquement (ISR) pour les pages se basant sur un service externe pr\xe9sentant des donn\xe9es froides (description d'offre, lien avec le CMS, etc.)"),(0,i.kt)("li",{parentName:"ul"},"Des pages g\xe9n\xe9r\xe9es dynamiquement (SSR) quand celles-ci pr\xe9sentent des donn\xe9es chaudes (pas de page r\xe9pondant \xe0 ce crit\xe8re)")),(0,i.kt)("p",null,"Les pages de recherche sont mise \xe0 jour c\xf4t\xe9 client (CSR) gr\xe2ce \xe0 des requ\xeates HTTP entre le client et le BFF (back-for-front)."),(0,i.kt)("h2",{id:"structure"},"Structure"),(0,i.kt)("p",null,"Le code source est d\xe9coup\xe9 en 4 parties\xa0:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"src\n\u251c\u2500\u2500\u2500 client\n\u251c\u2500\u2500\u2500 pages\n\u251c\u2500\u2500\u2500 server\n\u2514\u2500\u2500\u2500 styles\n")),(0,i.kt)("h3",{id:"client"},"Client"),(0,i.kt)("p",null,"Comprend tout fichier utile \xe0 l'affichage et la logique c\xf4t\xe9 client."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"client/\n\u2514\u2500\u2500\u2500 components/\n     \u251c\u2500\u2500 features/\xa0: composants avec logique m\xe9tier\n     \u251c\u2500\u2500 head/\xa0: composants pour mettre \xe0 jour les donn\xe9es dans la balise `head`\n     \u251c\u2500\u2500 layouts/\xa0: composants mutualis\xe9 pour la mise en page\n     \u2514\u2500\u2500 ui/\xa0: composants g\xe9n\xe9riques en lien avec la charte graphique\n")),(0,i.kt)("h3",{id:"pages"},"Pages"),(0,i.kt)("p",null,"Point d'entr\xe9e des pages et chemins d'acc\xe8s du site."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"\u2514\u2500\u2500\u2500 pages/\n     \u251c\u2500\u2500 {ma-page}/\n     \u2502    \u251c\u2500\u2500 index.analytics.ts\xa0: donn\xe9es d'analytics \xe0 transmettre lors de l'interaction avec la page\n     \u2502    \u251c\u2500\u2500 index.page.tsx\xa0: point d'entr\xe9e de la page\n     \u2502    \u2514\u2500\u2500 index.page.test.tsx\xa0: fichier de test de la page, avec React Testing Library\n     \u251c\u2500\u2500 ...\n     \u2514\u2500\u2500 api/\xa0: ensemble des resources expos\xe9s\n          \u251c\u2500\u2500 middlewares\xa0: middlewares partag\xe9s dans les ressources expos\xe9es\n          \u2514\u2500\u2500 {resource}/\xa0: resource expos\xe9e\n                \u251c\u2500\u2500 index.controller.ts\xa0: point d'entr\xe9e de l'endpoint\n                \u2514\u2500\u2500 index.controller.test.ts\xa0: fichier de test de la resource\n")),(0,i.kt)("h3",{id:"server"},"Server"),(0,i.kt)("p",null,"Logique m\xe9tier et interaction avec les services externes. Structure tendant vers la clean architecture.\nLe nom des dossiers est au pluriel alors que le nom des fichiers est au singulier."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"\u2514\u2500\u2500\u2500 server/\n     \u251c\u2500\u2500 {modules}/\n     \u2502    \u251c\u2500\u2500 configuration/\xa0: centralisation des d\xe9pendances pour le module et configuration \xe9ventuelle pour les clients http \n     \u2502    \u251c\u2500\u2500 domain/\xa0: types li\xe9s au module et interface du repository\n     \u2502    \u251c\u2500\u2500 infra/\n     \u2502    \u2502     \u2514\u2500\u2500 repositories/\xa0: impl\xe9mentation de l'interface du domain et typage des objets li\xe9s aux repositories\n     \u2502    \u2514\u2500\u2500 useCases/\xa0: cas d'usage m\xe9tier\n     \u2514\u2500\u2500 ...\n")),(0,i.kt)("p",null,"Le dossier ",(0,i.kt)("inlineCode",{parentName:"p"},"configuration/")," \xe0 la racine de ",(0,i.kt)("inlineCode",{parentName:"p"},"server/")," et de chaque module s'occupe d'initialiser, \xe0 l'aide d'une seule fonction, toutes les d\xe9pendances dans son scope respectif."),(0,i.kt)("h3",{id:"styles"},"Styles"),(0,i.kt)("p",null,"Fichiers de styles partag\xe9s, ni li\xe9 \xe0 un seul composant ni \xe0 un layout ou page. Afin d'exploiter certaines facult\xe9s de Sass, les fichiers sont d\xe9coup\xe9s comme suit dans les diff\xe9rents dossiers, le cas \xe9ch\xe9ant\xa0:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"_mixins.scss"),"\xa0: mixin Sass"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"_placeholders"),"\xa0: placeholders Sass"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"_styles"),"\xa0: style"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"_variables"),"\xa0: variables Sass\nTous les fichiers utiles pour composer le style c\xf4t\xe9 client, r\xe9partis dans les diff\xe9rents sous-dossiers de ",(0,i.kt)("inlineCode",{parentName:"li"},"styles/"),", sont import\xe9s depuis le fichier ",(0,i.kt)("inlineCode",{parentName:"li"},"_utilities/")," \xe0 la racine de ",(0,i.kt)("inlineCode",{parentName:"li"},"styles/"),", pour que seul ce fichier soit ensuite import\xe9.   ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"\u2514\u2500\u2500\u2500 styles\n     \u251c\u2500\u2500 components/\xa0: styles partag\xe9s li\xe9s \xe0 des composants\n     \u251c\u2500\u2500 media/\xa0: tout ce qui est en rapport aux r\xe8gles @media\n     \u251c\u2500\u2500 reset/\xa0: style pour reset le CSS des agents utilisateurs\n     \u251c\u2500\u2500 theme/\xa0: transposition du theme\n     \u251c\u2500\u2500 typographie/\xa0: tout ce qui concerne le texte\n     \u251c\u2500\u2500 _utilities.scss\xa0: fichier important tout ce qui est utile pour la coposition du style de l'application\n     \u2514\u2500\u2500 main.css\xa0: r\xe8gles de base communes \xe0 tout le site\n")),(0,i.kt)("h2",{id:"nomenclature-des-fichiers"},"Nomenclature des fichiers"),(0,i.kt)("p",null,"Les fichiers sont d\xe9coup\xe9s selon leur destination et suffix\xe9s en cons\xe9quence\xa0:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.test.tsx"),"\xa0: test d'un composant reprenant le m\xeame nom. Ex\xa0: ",(0,i.kt)("inlineCode",{parentName:"li"},"Modal.tsx")," et ",(0,i.kt)("inlineCode",{parentName:"li"},"Modal.test.tsx"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.test.ts"),"\xa0: test d'un fichier TypeScript reprenant le m\xeame nom. Ex\xa0: ",(0,i.kt)("inlineCode",{parentName:"li"},"analytics.service.ts")," et ",(0,i.kt)("inlineCode",{parentName:"li"},"analytics.service.test.ts"),". "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.mock.ts"),"\xa0: fonctions utilitaires pour stub / mock des services, fonctions, etc."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.fixture.ts"),"\xa0: donn\xe9es de test."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.module.scss"),"\xa0: style Sass, li\xe9 \xe0 un composant. Ex\xa0: ",(0,i.kt)("inlineCode",{parentName:"li"},"Modal.tsx")," et ",(0,i.kt)("inlineCode",{parentName:"li"},"Modal.module.scss"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.page.tsx"),"\xa0: point d'entr\xe9e et composant d'une page g\xe9n\xe9r\xe9e par NextJS. Le suffixe est important selon la configuration de l'application NextJS."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.analytics.ts"),"\xa0: configuration des donn\xe9es d'analytics li\xe9es \xe0 la page."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.controller.ts"),"\xa0: point d'entr\xe9e d'une ressource expos\xe9e par le BFF. Le suffixe est important selon la configuration de l'application NextJS."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.middleware.ts"),"\xa0: middleware utilis\xe9 dans un ou plusieurs contr\xf4leurs."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.util.ts"),"\xa0: fonctions utilitaires n\xe9cessaires dans le module courant."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.repository.ts"),"\xa0: dans un domaine, interface d'un repository. C\xf4t\xe9 infra, impl\xe9mentation de l'interface."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"*.mapper")),(0,i.kt)("li",{parentName:"ul"})))}d.isMDXComponent=!0},9055:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/1j1s-front-architecture-61410e6d76e9312ec3a02031fc72b343.svg"},1984:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/1j1s-front-generation-pages-fef09b985d8e74e2ac9860d7b5624342.png"}}]);