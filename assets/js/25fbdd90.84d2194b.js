"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[515],{7821:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var t=s(5893),i=s(1151);const o={},r="Transition vers l'UI Kit cible",l={id:"adr/2023-06-20.transition-vers-l-ui-kit-cible-adr",title:"Transition vers l'UI Kit cible",description:"20 juin 2023",source:"@site/docs/adr/2023-06-20.transition-vers-l-ui-kit-cible-adr.md",sourceDirName:"adr",slug:"/adr/2023-06-20.transition-vers-l-ui-kit-cible-adr",permalink:"/1j1s-front/docs/adr/2023-06-20.transition-vers-l-ui-kit-cible-adr",draft:!1,unlisted:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/adr/2023-06-20.transition-vers-l-ui-kit-cible-adr.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Storybook : Args dans la story",permalink:"/1j1s-front/docs/adr/2023-06-06.storybook-args-dans-la-story"},next:{title:"Format des ADR",permalink:"/1j1s-front/docs/adr/2023-08-01.appliquer-design-token"}},a={},c=[{value:"TL;DR",id:"tldr",level:2},{value:"Contributeurs",id:"contributeurs",level:2},{value:"Statut",id:"statut",level:2},{value:"Contexte",id:"contexte",level:2},{value:"D\xe9cision",id:"d\xe9cision",level:2},{value:"Cons\xe9quences",id:"cons\xe9quences",level:2},{value:"Autres pistes explor\xe9es",id:"autres-pistes-explor\xe9es",level:2}];function d(e){const n={em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"transition-vers-lui-kit-cible",children:"Transition vers l'UI Kit cible"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"20 juin 2023"})}),"\n",(0,t.jsx)(n.h2,{id:"tldr",children:"TL;DR"}),"\n",(0,t.jsx)(n.p,{children:"Pour la transition entre l'existant et l'UI Kit cible, nous avons d\xe9cid\xe9 de suivre une approche mixte, en fonction de la complexit\xe9 de chaque composant. Pour les composants ayant peu d'impact sur la codebase, nous effectuerons les modifications directement sur le composant pour int\xe9grer l'UI Kit cible. Pour les autres composants, nous d\xe9velopperons une nouvelle version et l'int\xe9grerons page par page."}),"\n",(0,t.jsx)(n.h2,{id:"contributeurs",children:"Contributeurs"}),"\n",(0,t.jsx)(n.p,{children:"Suxue Li, Julie Brunetto, Guillaume Moizan, Gauthier Fiorentino, Dorian De Rosa, Fred Nobre"}),"\n",(0,t.jsx)(n.h2,{id:"statut",children:"Statut"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"Accept\xe9"})}),"\n",(0,t.jsx)(n.h2,{id:"contexte",children:"Contexte"}),"\n",(0,t.jsx)(n.p,{children:"Nous avons actuellement document\xe9 l'ensemble de nos composants existants sur Storybook. Pour certains de ces composants, nous avons d\xe9j\xe0 des tickets pr\xeats pour leur d\xe9veloppement et leur int\xe9gration dans l'UI Kit cible. Nous devons d\xe9finir la strat\xe9gie d'impl\xe9mentation pour la transition entre l'existant et l'UI Kit cible."}),"\n",(0,t.jsx)(n.p,{children:"Nous avons identifi\xe9 deux principales strat\xe9gies :"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"D\xe9velopper la nouvelle version du composant directement. Cette approche permet de r\xe9aliser tous les changements en une seule fois, mais comporte le risque de provoquer des regressions aux endroits o\xf9 le composant est utilis\xe9."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"D\xe9velopper d'abord une nouvelle version correspondant a l'UI kit cible, puis r\xe9percuter les changements dans tous les endroits o\xf9 il est utilis\xe9. Cette approche permet de proc\xe9der page par page, mais peut prendre plus de temps, et il peut y avoir une p\xe9riode o\xf9 deux versions du composant sont affich\xe9es. Nous avons \xe9galement des pr\xe9occupations concernant la gestion des \xe9l\xe9ments d\xe9pr\xe9ci\xe9s."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"d\xe9cision",children:"D\xe9cision"}),"\n",(0,t.jsx)(n.p,{children:"Nous avons d\xe9cid\xe9 d'adopter une approche mixte en fonction de la complexit\xe9 de chaque composant. Voici notre strat\xe9gie :"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Pour les composants moins complexes ou dont l'impact de la transition est estim\xe9 comme \xe9tant faible, nous suivrons la premi\xe8re strat\xe9gie. Nous d\xe9velopperons directement les modifications n\xe9cessaires pour int\xe9grer l'UI Kit cible. Cela nous permettra de r\xe9aliser tous les changements en une seule fois."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Pour les composants plus complexes ou dont l'impact de la transition est estim\xe9 comme \xe9tant \xe9lev\xe9, nous suivrons la deuxi\xe8me strat\xe9gie. Nous d\xe9velopperons directement la nouvelle version du composant dans l'UI Kit cible, en prenant en compte les pages o\xf9 il est utilis\xe9. Nous effectuerons la transition page par page, en rempla\xe7ant progressivement l'ancienne version par la nouvelle. Cela nous permettra de mieux g\xe9rer les \xe9ventuels probl\xe8mes et de limiter les risques. Faire en sorte que les anciens composants ne soient plus utiliser -> renommer en ajoutant la mention \"deprecated\""}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"cons\xe9quences",children:"Cons\xe9quences"}),"\n",(0,t.jsx)(n.p,{children:"/"}),"\n",(0,t.jsx)(n.h2,{id:"autres-pistes-explor\xe9es",children:"Autres pistes explor\xe9es"}),"\n",(0,t.jsx)(n.p,{children:"/"})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>r});var t=s(7294);const i={},o=t.createContext(i);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);