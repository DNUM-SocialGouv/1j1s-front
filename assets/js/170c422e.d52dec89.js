"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[605],{8041:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var t=s(4848),r=s(8453);const i={},l="Fragmenter le style des media queries dans le selecteur",d={id:"adr/2023-09-12.fragmenter-style-media-queries-dans-le-selecteur",title:"Fragmenter le style des media queries dans le selecteur",description:"12 septembre 2023",source:"@site/docs/adr/2023-09-12.fragmenter-style-media-queries-dans-le-selecteur.md",sourceDirName:"adr",slug:"/adr/2023-09-12.fragmenter-style-media-queries-dans-le-selecteur",permalink:"/1j1s-front/docs/adr/2023-09-12.fragmenter-style-media-queries-dans-le-selecteur",draft:!1,unlisted:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/adr/2023-09-12.fragmenter-style-media-queries-dans-le-selecteur.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Format des ADR",permalink:"/1j1s-front/docs/adr/2023-08-01.appliquer-design-token"},next:{title:"Utiliser UserEvent au lieu de FireEvent",permalink:"/1j1s-front/docs/adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent"}},a={},c=[{value:"TL;DR",id:"tldr",level:2},{value:"Contributeurs",id:"contributeurs",level:2},{value:"Statut",id:"statut",level:2},{value:"Contexte",id:"contexte",level:2},{value:"D\xe9cision",id:"d\xe9cision",level:2},{value:"Cons\xe9quences",id:"cons\xe9quences",level:2}];function o(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"fragmenter-le-style-des-media-queries-dans-le-selecteur",children:"Fragmenter le style des media queries dans le selecteur"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"12 septembre 2023"})}),"\n",(0,t.jsx)(n.h2,{id:"tldr",children:"TL;DR"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Fragmenter dans le selecteur le style pr\xe9sent dans les media queries"})}),"\n",(0,t.jsx)(n.h2,{id:"contributeurs",children:"Contributeurs"}),"\n",(0,t.jsx)(n.p,{children:"Suxue Li, Julie Brunetto, Guillaume Moizan, Dorian De Rosa"}),"\n",(0,t.jsx)(n.h2,{id:"statut",children:"Statut"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"Accept\xe9"})}),"\n",(0,t.jsx)(n.h2,{id:"contexte",children:"Contexte"}),"\n",(0,t.jsx)(n.p,{children:"Nous cherchons \xe0 standardiser notre code et \xe0 \xe9tablir un processus de d\xe9cision concernant l'emplacement du style pour\nles diff\xe9rentes queries."}),"\n",(0,t.jsx)(n.h2,{id:"d\xe9cision",children:"D\xe9cision"}),"\n",(0,t.jsx)(n.p,{children:"Le style des diff\xe9rents media queries sera fragment\xe9 et positionn\xe9 le plus pr\xe8s possible du s\xe9lecteur, sauf dans le cas\nexceptionnel o\xf9 les versions mobile et desktop sont fondamentalement diff\xe9rentes. Dans ce dernier cas, les d\xe9veloppeurs\nauront la libert\xe9 de diviser le style en deux blocs distincts.\nL'objectif de cette d\xe9cision est d'accro\xeetre la clart\xe9 du code en consolidant autant que possible le code li\xe9 \xe0 un bloc,\n\xe9liminant ainsi la n\xe9cessit\xe9 de faire d\xe9filer la page pour y acc\xe9der."}),"\n",(0,t.jsx)(n.h2,{id:"cons\xe9quences",children:"Cons\xe9quences"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Dans la situation normale, nous \xe9crirons notre code de la mani\xe8re suivante :"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scss",children:".maClasse {\n  padding: 1rem;\n\n  @include utilities.media(large) {\n    padding: 2rem;\n  }\n}\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Dans le cas o\xf9 les versions mobile et desktop diff\xe8rent consid\xe9rablement, nous opterons pour la structure suivante :"}),"\n",(0,t.jsx)(n.li,{}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scss",children:".maClasse {\n  padding: 1rem;\n}\n\n//...\n\n@include utilities.media(large) {\n  .maClasse {\n    padding: 2rem;\n  }\n}\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>d});var t=s(6540);const r={},i=t.createContext(r);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);