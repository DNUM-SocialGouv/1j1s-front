"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[28],{351:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var s=n(4848),i=n(8453);const o={},r="Utiliser un mix d'imports relatifs et absolu",l={id:"adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu",title:"Utiliser un mix d'imports relatifs et absolu",description:"29 septembre 2023",source:"@site/docs/adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu.md",sourceDirName:"adr",slug:"/adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu",permalink:"/1j1s-front/docs/adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu",draft:!1,unlisted:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Sp\xe9cifier l'impl\xe9mentation au lieu de l'interface",permalink:"/1j1s-front/docs/adr/2023-09-27.specifier-l-implementation-au-lieu-de-l-interface"},next:{title:"Utiliser le feature flipping plut\xf4t que NODE_ENV pour activer/d\xe9sactiver des fonctionnalit\xe9s",permalink:"/1j1s-front/docs/adr/2023-10-25.utiliser-feature-flipping-plutot-que-node-env"}},a={},u=[{value:"TL;DR",id:"tldr",level:2},{value:"Contributeurs",id:"contributeurs",level:2},{value:"Statut",id:"statut",level:2},{value:"Contexte",id:"contexte",level:2},{value:"D\xe9cision",id:"d\xe9cision",level:2},{value:"Cons\xe9quences",id:"cons\xe9quences",level:2}];function c(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"utiliser-un-mix-dimports-relatifs-et-absolu",children:"Utiliser un mix d'imports relatifs et absolu"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"29 septembre 2023"})}),"\n",(0,s.jsx)(t.h2,{id:"tldr",children:"TL;DR"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Utilisation d'imports absolu dans la plupart des cas, utilisation d'imports relatifs pour fichiers du m\xeame module"})}),"\n",(0,s.jsx)(t.h2,{id:"contributeurs",children:"Contributeurs"}),"\n",(0,s.jsx)(t.p,{children:"Gauthier Fiorentino, Suxue Li, Dorian De Rosa, Guillaume Moizan"}),"\n",(0,s.jsx)(t.h2,{id:"statut",children:"Statut"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Accept\xe9"})}),"\n",(0,s.jsx)(t.h2,{id:"contexte",children:"Contexte"}),"\n",(0,s.jsx)(t.p,{children:"La question porte sur l'utilisation d'imports relatifs ou absolus, y compris les imports absolus commen\xe7ant par un ~, et comment ces choix affectent les regroupements logiques de composants/modules."}),"\n",(0,s.jsx)(t.h2,{id:"d\xe9cision",children:"D\xe9cision"}),"\n",(0,s.jsx)(t.p,{children:"Le choix entre les imports relatifs et absolus, y compris ceux commen\xe7ant par un ~, d\xe9pend des besoins sp\xe9cifiques du code."}),"\n",(0,s.jsx)(t.p,{children:'Les imports relatifs sont simples et conviennent \xe0 une structure simple ou \xe0 des fichiers locaux facilitant la logique de "grappe" de fichier en relation / module.'}),"\n",(0,s.jsx)(t.p,{children:"Les imports absolus, y compris ceux commen\xe7ant par un ~, permettent d'importer des composants / fichier qui n'ont pas de liens fort avec le composant courant."}),"\n",(0,s.jsx)(t.p,{children:"Pour illustrer, voici un exemple d'un fichier TypeScript (.tsx) et du CSS associ\xe9, montrant l'utilisation d'imports absolus pour regrouper logiquement les composants, les styles, et pour importer un composant UI r\xe9utilisable :"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:"// Dans le fichier MyComponent.tsx\nimport React from 'react';\nimport './MyComponent.css'; // Import relatif pour le style\nimport CustomButton from '~/components/CustomButton'; // Import absolu pour le composant UI r\xe9utilisable\n\nfunction MyComponent() {\n    return (\n        <div className=\"my-component\">\n            {/* Contenu du composant */}\n            <CustomButton label=\"Cliquez-moi\" />\n        </div>\n    );\n}\n\nexport default MyComponent;\n"})}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-css",children:"/* Dans le fichier MyComponent.css */\n.my-component {\n  /* Styles CSS pour MyComponent */\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"Dans cet exemple, l'importation absolue du composant CustomButton facilite l'utilisation de composants UI r\xe9utilisables au sein de MyComponent. Cela contribue \xe0 une organisation logique du code, tout en garantissant la stabilit\xe9 et la maintenabilit\xe9."}),"\n",(0,s.jsx)(t.h2,{id:"cons\xe9quences",children:"Cons\xe9quences"}),"\n",(0,s.jsx)(t.p,{children:"Le code sera mieux structur\xe9 en fonction des besoins, assurant ainsi une meilleure maintenabilit\xe9. L'utilisation d'imports absolus commen\xe7ant par un ~ facilite l'acc\xe8s aux d\xe9pendances tierces ou aux composants partag\xe9s, tout en facilitant les regroupements logiques de composants/modules et l'int\xe9gration de composants UI r\xe9utilisables."})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>l});var s=n(6540);const i={},o=s.createContext(i);function r(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);