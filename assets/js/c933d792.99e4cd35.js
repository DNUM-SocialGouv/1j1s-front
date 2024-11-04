"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[819],{4875:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>u});const i=JSON.parse('{"id":"adr/2023-10-25.utiliser-feature-flipping-plutot-que-node-env","title":"Utiliser le feature flipping plut\xf4t que NODE_ENV pour activer/d\xe9sactiver des fonctionnalit\xe9s","description":"27 septembre 2023","source":"@site/docs/adr/2023-10-25.utiliser-feature-flipping-plutot-que-node-env.md","sourceDirName":"adr","slug":"/adr/2023-10-25.utiliser-feature-flipping-plutot-que-node-env","permalink":"/1j1s-front/docs/adr/2023-10-25.utiliser-feature-flipping-plutot-que-node-env","draft":false,"unlisted":false,"editUrl":"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/adr/2023-10-25.utiliser-feature-flipping-plutot-que-node-env.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Utiliser un mix d\'imports relatifs et absolu","permalink":"/1j1s-front/docs/adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu"},"next":{"title":"\u2696\ufe0f Conventions","permalink":"/1j1s-front/docs/category/\ufe0f-conventions"}}');var s=n(4848),r=n(8453);const o={},a="Utiliser le feature flipping plut\xf4t que NODE_ENV pour activer/d\xe9sactiver des fonctionnalit\xe9s",l={},u=[{value:"TL;DR",id:"tldr",level:2},{value:"Contributeurs",id:"contributeurs",level:2},{value:"Statut",id:"statut",level:2},{value:"Contexte",id:"contexte",level:2},{value:"D\xe9cision",id:"d\xe9cision",level:2},{value:"Cons\xe9quences",id:"cons\xe9quences",level:2},{value:"Prochaines \xe9tapes",id:"prochaines-\xe9tapes",level:2}];function c(e){const t={h1:"h1",h2:"h2",header:"header",p:"p",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"utiliser-le-feature-flipping-plut\xf4t-que-node_env-pour-activerd\xe9sactiver-des-fonctionnalit\xe9s",children:"Utiliser le feature flipping plut\xf4t que NODE_ENV pour activer/d\xe9sactiver des fonctionnalit\xe9s"})}),"\n",(0,s.jsx)(t.p,{children:"27 septembre 2023"}),"\n",(0,s.jsx)(t.h2,{id:"tldr",children:"TL;DR"}),"\n",(0,s.jsx)(t.p,{children:"Pour activer ou d\xe9sactiver certaines fonctionnalit\xe9s, nous utilisons une approche ind\xe9pendante de la variable d'environnement NODE_ENV, ce qui nous permet de contr\xf4ler ces fonctionnalit\xe9s, y compris lors de l'ex\xe9cution de tests automatis\xe9s. Les prochaines \xe9tapes incluent la cr\xe9ation d'un ticket du board tech pour r\xe9pertorier les utilisations de NODE_ENV dans un fichier ou un tableur, suivi d'un traitement en BSR (Board de Suivi de R\xe9alisation)."}),"\n",(0,s.jsx)(t.h2,{id:"contributeurs",children:"Contributeurs"}),"\n",(0,s.jsx)(t.p,{children:"Gauthier Fiorentino, Dorian De Rosa, Guillaume Moizan"}),"\n",(0,s.jsx)(t.h2,{id:"statut",children:"Statut"}),"\n",(0,s.jsx)(t.p,{children:"Accept\xe9"}),"\n",(0,s.jsx)(t.h2,{id:"contexte",children:"Contexte"}),"\n",(0,s.jsx)(t.p,{children:"Dans le d\xe9veloppement d'applications, il est courant d'avoir besoin d'activer ou de d\xe9sactiver certaines fonctionnalit\xe9s, telles que la journalisation avec Sentry, en fonction de l'environnement de d\xe9ploiement ou des tests automatis\xe9s."}),"\n",(0,s.jsx)(t.p,{children:"Certaines de ces activations/d\xe9sactivation se font directement en testant la valeur de NODE_ENV, ce qui ne permet pas autant de souplesse qu'un feature flipping."}),"\n",(0,s.jsx)(t.h2,{id:"d\xe9cision",children:"D\xe9cision"}),"\n",(0,s.jsx)(t.p,{children:"Nous utilisons une approche ind\xe9pendante de la variable d'environnement NODE_ENV pour activer ou d\xe9sactiver certaines fonctionnalit\xe9s en faveur du feature flipping."}),"\n",(0,s.jsx)(t.h2,{id:"cons\xe9quences",children:"Cons\xe9quences"}),"\n",(0,s.jsx)(t.p,{children:"L'utilisation de cette approche nous donne la capacit\xe9 de g\xe9rer les fonctionnalit\xe9s activ\xe9es/d\xe9sactiv\xe9es de mani\xe8re flexible, ind\xe9pendamment de NODE_ENV. Cela simplifie la gestion des configurations et permet de contr\xf4ler les fonctionnalit\xe9s lors de l'ex\xe9cution de tests automatis\xe9s."}),"\n",(0,s.jsx)(t.h2,{id:"prochaines-\xe9tapes",children:"Prochaines \xe9tapes"}),"\n",(0,s.jsx)(t.p,{children:"Nous allons cr\xe9er un ticket sur le board tech pour r\xe9pertorier toutes les utilisations de NODE_ENV dans nos fichiers. Une fois la liste compl\xe8te, nous effectuerons un traitement en mode BSR pour effectuer les modifications n\xe9cessaires."})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var i=n(6540);const s={},r=i.createContext(s);function o(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);