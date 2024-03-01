"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[881],{8852:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var t=s(4848),i=s(8453);const r={},o="Format des ADR",l={id:"adr/2023-08-01.appliquer-design-token",title:"Format des ADR",description:"01 ao\xfbt 2023",source:"@site/docs/adr/2023-08-01.appliquer-design-token.md",sourceDirName:"adr",slug:"/adr/2023-08-01.appliquer-design-token",permalink:"/1j1s-front/docs/adr/2023-08-01.appliquer-design-token",draft:!1,unlisted:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/adr/2023-08-01.appliquer-design-token.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Transition vers l'UI Kit cible",permalink:"/1j1s-front/docs/adr/2023-06-20.transition-vers-l-ui-kit-cible-adr"},next:{title:"Fragmenter le style des media queries dans le selecteur",permalink:"/1j1s-front/docs/adr/2023-09-12.fragmenter-style-media-queries-dans-le-selecteur"}},a={},d=[{value:"TL;DR",id:"tldr",level:2},{value:"Contributeurs",id:"contributeurs",level:2},{value:"Statut",id:"statut",level:2},{value:"Contexte",id:"contexte",level:2},{value:"D\xe9cision",id:"d\xe9cision",level:2},{value:"Cons\xe9quences",id:"cons\xe9quences",level:2},{value:"Autres pistes explor\xe9es",id:"autres-pistes-explor\xe9es",level:2}];function u(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"format-des-adr",children:"Format des ADR"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"01 ao\xfbt 2023"})}),"\n",(0,t.jsx)(n.h2,{id:"tldr",children:"TL;DR"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Utiliser les design tokens sp\xe9cifiques aux composants"})}),"\n",(0,t.jsx)(n.h2,{id:"contributeurs",children:"Contributeurs"}),"\n",(0,t.jsx)(n.p,{children:"Suxue Li, Julie Brunetto, Guillaume Moizan, Gauthier Fiorentino, Dorian De Rosa"}),"\n",(0,t.jsx)(n.h2,{id:"statut",children:"Statut"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"Pending"})}),"\n",(0,t.jsx)(n.h2,{id:"contexte",children:"Contexte"}),"\n",(0,t.jsx)(n.p,{children:"Dans les fichiers CSS, les variables sont utilis\xe9es directement.\nLorsque nous avons plusieurs occurrences de la m\xeame variable, lors de la r\xe9facto de cette variable, nous devons repasser sur chacune de ces occurrences dans le fichier.\nCela est douloureux (Cf GAFI), et nous fait perdre du temps au moment de l'\xe9volution de l'UI."}),"\n",(0,t.jsxs)(n.p,{children:["Il existe une m\xe9thodologie pour r\xe9pondre \xe0 cette douleur : ",(0,t.jsx)(n.a,{href:"https://spectrum.adobe.com/page/design-tokens/",children:"https://spectrum.adobe.com/page/design-tokens/"})]}),"\n",(0,t.jsx)(n.h2,{id:"d\xe9cision",children:"D\xe9cision"}),"\n",(0,t.jsx)(n.p,{children:"Application du design token par ajout du niveau 'Component-specific token', sachant que nous avions d\xe9j\xe0 en place le niveau 'Alias token'."}),"\n",(0,t.jsx)(n.h2,{id:"cons\xe9quences",children:"Cons\xe9quences"}),"\n",(0,t.jsxs)(n.p,{children:["Tous les nouveaux fichiers et fichiers sur lesquels on repasse \xe0 l'occasion d'une feature/fix/tech etc. doivent utiliser le design token.\nToutes les variables sont d\xe9clar\xe9es au d\xe9but du fichier, il ne devrait plus y avoir d'utilisation de ",(0,t.jsx)(n.code,{children:"utilities.$color-primary"})," par exemple.\nMais plut\xf4t :"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sass",children:'@use "@styles/utilities";\n\n$icon-color: utilities.$color-primary\n\n...\n  \n & .icon {\n    color: $icon-color;\n}\n\n'})}),"\n",(0,t.jsx)(n.p,{children:"Et bien-s\xfbr, deux couleurs qui ne sont pas pr\xe9vues pour \xe9voluer ensemble doivent avoir deux variables diff\xe9rentes m\xeame si la couleur est la m\xeame."}),"\n",(0,t.jsx)(n.p,{children:"Faire attention \xe0 bien nommer les variables, pas h\xe9siter \xe0 \xeatre pr\xe9cis par rapport au contexte d'utilisation."}),"\n",(0,t.jsx)(n.h2,{id:"autres-pistes-explor\xe9es",children:"Autres pistes explor\xe9es"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Application partielle du principe (en fonction de la complexit\xe9 du cas: CSS long et beaucoup de redondances VS petit CSS) mais cela rend le CSS moins homog\xe8ne."}),"\n",(0,t.jsx)(n.li,{children:"Ne pas ajouter de niveau, car le processus de l'ajout semble \xe9galement fastidieux / douloureux."}),"\n"]})]})}function c(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>l});var t=s(6540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);