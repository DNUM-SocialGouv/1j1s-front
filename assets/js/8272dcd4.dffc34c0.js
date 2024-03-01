"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[741],{4:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=s(4848),t=s(8453);const r={sidebar_label:"Git",sidebar_position:1},l="Standards d'\xe9quipe li\xe9s \xe0 Git",o={id:"convention/git",title:"Standards d'\xe9quipe li\xe9s \xe0 Git",description:"20 Avril 2023",source:"@site/docs/convention/git.md",sourceDirName:"convention",slug:"/convention/git",permalink:"/1j1s-front/docs/convention/git",draft:!1,unlisted:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/convention/git.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_label:"Git",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"\u2696\ufe0f Conventions",permalink:"/1j1s-front/docs/category/\ufe0f-conventions"},next:{title:"Langages",permalink:"/1j1s-front/docs/convention/langages"}},c={},d=[{value:"Commits",id:"commits",level:2},{value:"Convention",id:"convention",level:3},{value:"Langue",id:"langue",level:3},{value:"Contextes d&#39;un commit",id:"contextes-dun-commit",level:3},{value:"Contenu du message",id:"contenu-du-message",level:3},{value:"Exemples de nommage",id:"exemples-de-nommage",level:3},{value:"Strat\xe9gie pour les branches",id:"strat\xe9gie-pour-les-branches",level:2},{value:"Strat\xe9gie de Versioning",id:"strat\xe9gie-de-versioning",level:2}];function a(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"standards-d\xe9quipe-li\xe9s-\xe0-git",children:"Standards d'\xe9quipe li\xe9s \xe0 Git"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"20 Avril 2023"})}),"\n",(0,i.jsx)(n.p,{children:"Ahoy \ud83d\udc4b\nAfin de garder une base de code homog\xe8ne, merci de respecter ces quelques standards."}),"\n",(0,i.jsx)(n.h2,{id:"commits",children:"Commits"}),"\n",(0,i.jsx)(n.h3,{id:"convention",children:"Convention"}),"\n",(0,i.jsxs)(n.p,{children:['Nous allons nous baser sur la convention "',(0,i.jsx)(n.a,{href:"https://www.conventionalcommits.org/en/v1.0.0/",children:"Conventional Commits"}),'".']}),"\n",(0,i.jsx)(n.h3,{id:"langue",children:"Langue"}),"\n",(0,i.jsx)(n.p,{children:"Il a \xe9t\xe9 convenu de r\xe9diger les commits en fran\xe7ais car le projet n'est pas \xe0 destination internationale.\nCelui-ci est destin\xe9 en premier lieu au gouvernement fran\xe7ais. Les messages de chaque commit doivent \xeatre autoportants."}),"\n",(0,i.jsx)(n.h3,{id:"contextes-dun-commit",children:"Contextes d'un commit"}),"\n",(0,i.jsx)(n.p,{children:"Les types de commit sont donc\xa0:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"feat"}),"\xa0: nouvelle fonctionnalit\xe9"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"fix"}),"\xa0: correction d'un bug"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"build"}),"\xa0: changements du syst\xe8me de build ou de d\xe9pendances"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"chore"}),"\xa0: autre changement qui ne modifie ni fichier src, ni fichier test"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"ci"}),"\xa0: changement \xe0 la configuration de la CI"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"docs"}),"\xa0: changement sur la documentation"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"style"}),"\xa0: changement n'affectant pas le sens du code (espace, point-virgule, format, etc.)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"refactor"}),"\xa0: changement qui ne corrige pas de bug ou n'ajoute pas une nouvelle fonctionnalit\xe9"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"perf"}),"\xa0: changement qui am\xe9liore les performances"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"test"}),"\xa0: ajoute ou corrige un test"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"revert"}),"\xa0: annule un pr\xe9c\xe9dent changement"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Chaque commit doit assurer que\xa0:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"l'application fonctionne"}),"\n",(0,i.jsx)(n.li,{children:"le linter passe"}),"\n",(0,i.jsx)(n.li,{children:"les tests passent"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"D\xe8s que cela est possible, pr\xe9ciser le contexte pour chaque commit, en lettres minuscules. Cela peut \xeatre une fonctionnalit\xe9, un composant transverse, de l'interface ou une exigence non fonctionnelle."}),"\n",(0,i.jsxs)(n.p,{children:["Liste des contextes de ",(0,i.jsx)(n.strong,{children:"fonctionnalit\xe9s"})," autoris\xe9es (non exhaustive)\xa0:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"emplois"}),"\n",(0,i.jsx)(n.li,{children:"stages"}),"\n",(0,i.jsx)(n.li,{children:"alternance"}),"\n",(0,i.jsx)(n.li,{children:"jobs \xe9tudiants"}),"\n",(0,i.jsx)(n.li,{children:"jobs d'\xe9t\xe9"}),"\n",(0,i.jsx)(n.li,{children:"emplois europe"}),"\n",(0,i.jsx)(n.li,{children:"formations"}),"\n",(0,i.jsx)(n.li,{children:"formations init (pour formations initiales)"}),"\n",(0,i.jsx)(n.li,{children:"metiers (pour d\xe9couvrir les m\xe9tiers)"}),"\n",(0,i.jsx)(n.li,{children:"\xe9v\xe8nement"}),"\n",(0,i.jsx)(n.li,{children:"cej (pour contrat engagement jeune)"}),"\n",(0,i.jsx)(n.li,{children:"aides"}),"\n",(0,i.jsx)(n.li,{children:"logement"}),"\n",(0,i.jsx)(n.li,{children:"mentorat"}),"\n",(0,i.jsx)(n.li,{children:"entreprendre"}),"\n",(0,i.jsx)(n.li,{children:"accompagnement"}),"\n",(0,i.jsx)(n.li,{children:"services jeunes"}),"\n",(0,i.jsx)(n.li,{children:"b\xe9n\xe9volat"}),"\n",(0,i.jsx)(n.li,{children:"actualit\xe9s"}),"\n",(0,i.jsx)(n.li,{children:"employeur"}),"\n",(0,i.jsx)(n.li,{children:"sitemap"}),"\n",(0,i.jsx)(n.li,{children:"robots"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"contenu-du-message",children:"Contenu du message"}),"\n",(0,i.jsx)(n.p,{children:"Un message de commit doit contenir a minima un titre court format\xe9 contenant un pr\xe9fixe cit\xe9 dans la convention ci-dessus. Si une description suppl\xe9mentaire est n\xe9cessaire, celle-ci sera ajout\xe9e dans un sous-message de commit."}),"\n",(0,i.jsx)(n.h3,{id:"exemples-de-nommage",children:"Exemples de nommage"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["exemple\xa0: ",(0,i.jsx)(n.code,{children:"feat(sitemap): ajout des offres de stages au sitemap"})]})}),"\n",(0,i.jsx)(n.p,{children:"Exemple de composants transverses (non exhaustive)\xa0:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"header"}),"\n",(0,i.jsx)(n.li,{children:"footer"}),"\n",(0,i.jsx)(n.li,{children:"nav"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["exemple\xa0: ",(0,i.jsx)(n.code,{children:"refactor(nav): g\xe9n\xe9ration du menu \xe0 partir d'un fichier de configuration"})]})}),"\n",(0,i.jsx)(n.p,{children:"Dans le cas de changement de style, pr\xe9f\xe9rer\xa0:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"ui"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["exemple\xa0: ",(0,i.jsx)(n.code,{children:"feat(ui): mise \xe0 jour du style des champs texte"})]})}),"\n",(0,i.jsx)(n.p,{children:"Exigences non fonctionnelles (non exhaustive)\xa0:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"meilisearch"}),"\n",(0,i.jsx)(n.li,{children:"deps"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["exemple\xa0: ",(0,i.jsx)(n.code,{children:"chore(deps): mise \xe0 jour des d\xe9pendances"})]})}),"\n",(0,i.jsx)(n.h2,{id:"strat\xe9gie-pour-les-branches",children:"Strat\xe9gie pour les branches"}),"\n",(0,i.jsxs)(n.p,{children:["Pour une parfaite int\xe9gration avec Jira, une branche li\xe9e \xe0 une user story doit comporter le num\xe9ro du ticket. Ex\xa0:\n",(0,i.jsxs)(n.em,{children:["exemple\xa0:",(0,i.jsx)(n.code,{children:"feat/UNJ1S-1307-Afficher-les-statistiques-d-une-formation-avec-InserJeunes"})]})]}),"\n",(0,i.jsx)(n.p,{children:"Les branches peuvent \xeatre merg\xe9es selon 2 m\xe9thodes\xa0:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"squash"}),"\n",(0,i.jsxs)(n.li,{children:["rebase and merge\nDans les 2 cas, les titres et descriptions des commit finaux doivent respecter nos ",(0,i.jsx)(n.a,{href:"#commits",children:"standards"}),". A chaque commit, l'application doit donc fonctionner, les tests et le linter passer."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"strat\xe9gie-de-versioning",children:"Strat\xe9gie de Versioning"}),"\n",(0,i.jsxs)(n.p,{children:["Nous respectons le ",(0,i.jsx)(n.a,{href:"https://semver.org",children:"Semantic Versioning"}),"\nUne fois une branche merg\xe9e dans main, une Pull Request de release est automatiquement ouverte avec un commit de release pour\xa0:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["monter la version dans les ",(0,i.jsx)(n.code,{children:"package.json"})," et ",(0,i.jsx)(n.code,{children:"package-lock.json"})," selon les changements apport\xe9s par les pr\xe9c\xe9dents commits,"]}),"\n",(0,i.jsxs)(n.li,{children:["ajouter un tag de version de la forme ",(0,i.jsx)(n.code,{children:"vX.Y.Z"})]}),"\n",(0,i.jsx)(n.li,{children:"mettre \xe0 jour le changelog en reprenant les messages de commits pr\xe9c\xe9dents"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>o});var i=s(6540);const t={},r=i.createContext(t);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);