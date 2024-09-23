"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[574],{7858:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var i=n(4848),t=n(8453);const r={sidebar_label:"Architecture",sidebar_position:1},c="Architecture de 1j1s-front",l={id:"architecture/architecture",title:"Architecture de 1j1s-front",description:"20 Avril 2023",source:"@site/docs/architecture/architecture.md",sourceDirName:"architecture",slug:"/architecture/",permalink:"/1j1s-front/docs/architecture/",draft:!1,unlisted:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/architecture/architecture.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_label:"Architecture",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"\ud83d\uddfa\ufe0f Architecture",permalink:"/1j1s-front/docs/category/\ufe0f-architecture"},next:{title:"Flux",permalink:"/1j1s-front/docs/architecture/ecosysteme"}},d={},o=[{value:"Introduction",id:"introduction",level:2},{value:"Technologies",id:"technologies",level:2},{value:"ADR (Architectural Decision Record)",id:"adr-architectural-decision-record",level:2},{value:"G\xe9n\xe9ration des pages web",id:"g\xe9n\xe9ration-des-pages-web",level:2},{value:"Structure",id:"structure",level:2},{value:"Client",id:"client",level:3},{value:"Pages",id:"pages",level:3},{value:"Server",id:"server",level:3},{value:"Styles",id:"styles",level:3},{value:"Nomenclature des fichiers",id:"nomenclature-des-fichiers",level:2}];function a(e){const s={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"architecture-de-1j1s-front",children:"Architecture de 1j1s-front"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.em,{children:"20 Avril 2023"})}),"\n",(0,i.jsx)(s.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsx)(s.p,{children:"Propuls\xe9 par NextJS, l'application est d\xe9coup\xe9e de la sorte\xa0:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Une partie ",(0,i.jsx)(s.code,{children:"client"})," qui pr\xe9sente ce qui est affich\xe9 \xe0 nos utilisateurs"]}),"\n",(0,i.jsxs)(s.li,{children:["Une partie ",(0,i.jsx)(s.code,{children:"server"})," qui nous sert d'interfaces avec ",(0,i.jsx)(s.a,{href:"./ecosysteme#services-externes",children:"les services externes consomm\xe9s"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{alt:"Architecture 1j1s-front",src:n(2154).A+"",width:"5901",height:"8058"})}),"\n",(0,i.jsx)(s.h2,{id:"technologies",children:"Technologies"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Langage\xa0: TypeScript"}),"\n",(0,i.jsx)(s.li,{children:"Framework\xa0: NextJS"}),"\n",(0,i.jsx)(s.li,{children:"Environnement serveur\xa0: NodeJS"}),"\n",(0,i.jsx)(s.li,{children:"Tests\xa0: Jest + React Testing library + Cypress"}),"\n",(0,i.jsx)(s.li,{children:"Style\xa0: CSS Modules + Sass"}),"\n",(0,i.jsx)(s.li,{children:"Package Manager\xa0: npm"}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"adr-architectural-decision-record",children:"ADR (Architectural Decision Record)"}),"\n",(0,i.jsxs)(s.p,{children:["Certains choix techniques sont expliqu\xe9s ",(0,i.jsx)(s.a,{href:"/1j1s-front/docs/adr/",children:"l'ADR"}),"."]}),"\n",(0,i.jsx)(s.h2,{id:"g\xe9n\xe9ration-des-pages-web",children:"G\xe9n\xe9ration des pages web"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{alt:"G\xe9n\xe9ration des pages web",src:n(3277).A+"",width:"1306",height:"1589"})}),"\n",(0,i.jsx)(s.p,{children:"L'application exploite les possibilit\xe9s de NextJS pour optimiser les performances lors de la g\xe9n\xe9ration des pages web\xa0:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Des pages statiques (SSG), g\xe9n\xe9r\xe9es lors de l'\xe9tape de ",(0,i.jsx)(s.code,{children:"build"}),' de l\'application pour quelques "pages de base" (accueil, pages de recherche, etc.)']}),"\n",(0,i.jsx)(s.li,{children:"Des pages statiques cr\xe9\xe9es \xe0 la demande et mises \xe0 jour p\xe9riodiquement (ISR) pour les pages se basant sur un service externe pr\xe9sentant des donn\xe9es froides (description d'offre, lien avec le CMS, etc.)"}),"\n",(0,i.jsx)(s.li,{children:"Des pages g\xe9n\xe9r\xe9es dynamiquement (SSR) quand celles-ci pr\xe9sentent des donn\xe9es chaudes (pas de page r\xe9pondant \xe0 ce crit\xe8re)"}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Les pages de recherche sont mise \xe0 jour c\xf4t\xe9 client (CSR) gr\xe2ce \xe0 des requ\xeates HTTP entre le client et le BFF (back-for-front)."}),"\n",(0,i.jsx)(s.h2,{id:"structure",children:"Structure"}),"\n",(0,i.jsx)(s.p,{children:"Le code source est d\xe9coup\xe9 en 4 parties\xa0:"}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"src\n\u251c\u2500\u2500\u2500 client\n\u251c\u2500\u2500\u2500 pages\n\u251c\u2500\u2500\u2500 server\n\u2514\u2500\u2500\u2500 styles\n"})}),"\n",(0,i.jsx)(s.h3,{id:"client",children:"Client"}),"\n",(0,i.jsx)(s.p,{children:"Comprend tout fichier utile \xe0 l'affichage et la logique c\xf4t\xe9 client."}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"client/\n\u2514\u2500\u2500\u2500 components/\n     \u251c\u2500\u2500 features/\xa0: composants avec logique m\xe9tier\n     \u251c\u2500\u2500 head/\xa0: composants pour mettre \xe0 jour les donn\xe9es dans la balise `head`\n     \u251c\u2500\u2500 layouts/\xa0: composants mutualis\xe9 pour la mise en page\n     \u2514\u2500\u2500 ui/\xa0: composants g\xe9n\xe9riques en lien avec la charte graphique\n"})}),"\n",(0,i.jsx)(s.h3,{id:"pages",children:"Pages"}),"\n",(0,i.jsx)(s.p,{children:"Point d'entr\xe9e des pages et chemins d'acc\xe8s du site."}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"\u2514\u2500\u2500\u2500 pages/\n     \u251c\u2500\u2500 {ma-page}/\n     \u2502    \u251c\u2500\u2500 index.analytics.ts\xa0: donn\xe9es d'analytics \xe0 transmettre lors de l'interaction avec la page\n     \u2502    \u251c\u2500\u2500 index.page.tsx\xa0: point d'entr\xe9e de la page\n     \u2502    \u2514\u2500\u2500 index.page.test.tsx\xa0: fichier de test de la page, avec React Testing Library\n     \u251c\u2500\u2500 ...\n     \u2514\u2500\u2500 api/\xa0: ensemble des resources expos\xe9s\n          \u251c\u2500\u2500 middlewares\xa0: middlewares partag\xe9s dans les ressources expos\xe9es\n          \u2514\u2500\u2500 {resource}/\xa0: resource expos\xe9e\n                \u251c\u2500\u2500 index.controller.ts\xa0: point d'entr\xe9e de l'endpoint\n                \u2514\u2500\u2500 index.controller.test.ts\xa0: fichier de test de la resource\n"})}),"\n",(0,i.jsx)(s.h3,{id:"server",children:"Server"}),"\n",(0,i.jsx)(s.p,{children:"Logique m\xe9tier et interaction avec les services externes. Structure tendant vers la clean architecture.\nLe nom des dossiers est au pluriel alors que le nom des fichiers est au singulier."}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"\u2514\u2500\u2500\u2500 server/\n     \u251c\u2500\u2500 {modules}/\n     \u2502    \u251c\u2500\u2500 configuration/\xa0: centralisation des d\xe9pendances pour le module et configuration \xe9ventuelle pour les clients http \n     \u2502    \u251c\u2500\u2500 domain/\xa0: types li\xe9s au module et interface du repository\n     \u2502    \u251c\u2500\u2500 infra/\n     \u2502    \u2502     \u2514\u2500\u2500 repositories/\xa0: impl\xe9mentation de l'interface du domain et typage des objets li\xe9s aux repositories\n     \u2502    \u2514\u2500\u2500 useCases/\xa0: cas d'usage m\xe9tier\n     \u2514\u2500\u2500 ...\n"})}),"\n",(0,i.jsxs)(s.p,{children:["Le dossier ",(0,i.jsx)(s.code,{children:"configuration/"})," \xe0 la racine de ",(0,i.jsx)(s.code,{children:"server/"})," et de chaque module s'occupe d'initialiser, \xe0 l'aide d'une seule fonction, toutes les d\xe9pendances dans son scope respectif."]}),"\n",(0,i.jsx)(s.h3,{id:"styles",children:"Styles"}),"\n",(0,i.jsx)(s.p,{children:"Fichiers de styles partag\xe9s, ni li\xe9 \xe0 un seul composant ni \xe0 un layout ou page. Afin d'exploiter certaines facult\xe9s de Sass, les fichiers sont d\xe9coup\xe9s comme suit dans les diff\xe9rents dossiers, le cas \xe9ch\xe9ant\xa0:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"_mixins.scss"}),"\xa0: mixin Sass"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"_placeholders"}),"\xa0: placeholders Sass"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"_styles"}),"\xa0: style"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"_variables"}),"\xa0: variables Sass\nTous les fichiers utiles pour composer le style c\xf4t\xe9 client, r\xe9partis dans les diff\xe9rents sous-dossiers de ",(0,i.jsx)(s.code,{children:"styles/"}),", sont import\xe9s depuis le fichier ",(0,i.jsx)(s.code,{children:"_utilities/"})," \xe0 la racine de ",(0,i.jsx)(s.code,{children:"styles/"}),", pour que seul ce fichier soit ensuite import\xe9.",(0,i.jsx)(s.br,{}),"\n","On retrouve \xe9galement ",(0,i.jsx)(s.code,{children:"_utilities-deprecated"})," qui correspond a l'\xe9tat de nos styles partag\xe9s avant la migration vers l'UI kit. Ce fichier n'est plus a utilis\xe9."]}),"\n"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"\u2514\u2500\u2500\u2500 styles\n     \u251c\u2500\u2500 components/\xa0: styles partag\xe9s li\xe9s \xe0 des composants\n     \u251c\u2500\u2500 media/\xa0: tout ce qui est en rapport aux r\xe8gles @media\n     \u251c\u2500\u2500 reset/\xa0: style pour reset le CSS des agents utilisateurs\n     \u251c\u2500\u2500 theme/\xa0: transposition du theme\n     \u251c\u2500\u2500 typographie/\xa0: tout ce qui concerne le texte\n     \u251c\u2500\u2500 _utilities.scss\xa0: fichier important tout ce qui est utile pour la composition du style de l'application\n     \u251c\u2500\u2500 _utilities-deprecated.scss\xa0: ancien fichier composant le style de l'application avant la migration vers l'UI kit. Ne plus l'utiliser.\n     \u2514\u2500\u2500 main.css\xa0: r\xe8gles de base communes \xe0 tout le site\n"})}),"\n",(0,i.jsx)(s.h2,{id:"nomenclature-des-fichiers",children:"Nomenclature des fichiers"}),"\n",(0,i.jsx)(s.p,{children:"Les fichiers sont d\xe9coup\xe9s selon leur destination et suffix\xe9s en cons\xe9quence\xa0:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.test.tsx"}),"\xa0: test d'un composant reprenant le m\xeame nom. Ex\xa0: ",(0,i.jsx)(s.code,{children:"Modal.tsx"})," et ",(0,i.jsx)(s.code,{children:"Modal.test.tsx"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.test.ts"}),"\xa0: test d'un fichier TypeScript reprenant le m\xeame nom. Ex\xa0: ",(0,i.jsx)(s.code,{children:"apiAdresse.repository.ts"})," et ",(0,i.jsx)(s.code,{children:"apiAdresse.repository.test.ts"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.mock.ts"}),"\xa0: fonctions utilitaires pour stub / mock des services, fonctions, etc."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.fixture.ts"}),"\xa0: donn\xe9es de test."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.module.scss"}),"\xa0: style Sass, li\xe9 \xe0 un composant. Ex\xa0: ",(0,i.jsx)(s.code,{children:"Modal.tsx"})," et ",(0,i.jsx)(s.code,{children:"Modal.module.scss"}),"."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.page.tsx"}),"\xa0: point d'entr\xe9e et composant d'une page g\xe9n\xe9r\xe9e par NextJS. Le suffixe est important selon la configuration de l'application NextJS."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.analytics.ts"}),"\xa0: configuration des donn\xe9es d'analytics li\xe9es \xe0 la page."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.controller.ts"}),"\xa0: point d'entr\xe9e d'une ressource expos\xe9e par le BFF. Le suffixe est important selon la configuration de l'application NextJS."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.middleware.ts"}),"\xa0: middleware utilis\xe9 dans un ou plusieurs contr\xf4leurs."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.util.ts"}),"\xa0: fonctions utilitaires n\xe9cessaires dans le module courant."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.repository.ts"}),"\xa0: dans un domaine, interface d'un repository. C\xf4t\xe9 infra, impl\xe9mentation de l'interface."]}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"*.mapper"})}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.code,{children:"*.<interface>.service.ts"}),"\xa0: Impl\xe9mentation de l'interface ",(0,i.jsx)(s.code,{children:"<interface>"}),". Ex\xa0: ",(0,i.jsx)(s.code,{children:"tarteAuCitron.cookies.service.ts"})," est une impl\xe9mentation de l'interface dans ",(0,i.jsx)(s.code,{children:"cookies.service.ts"}),"."]}),"\n"]})]})}function u(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},2154:(e,s,n)=>{n.d(s,{A:()=>i});const i=n.p+"assets/images/1j1s-front-architecture-61410e6d76e9312ec3a02031fc72b343.svg"},3277:(e,s,n)=>{n.d(s,{A:()=>i});const i=n.p+"assets/images/1j1s-front-generation-pages-fef09b985d8e74e2ac9860d7b5624342.png"},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>l});var i=n(6540);const t={},r=i.createContext(t);function c(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);