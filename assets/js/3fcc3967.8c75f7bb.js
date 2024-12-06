"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[167],{6233:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"adr/2023-09-27.specifier-l-implementation-au-lieu-de-l-interface","title":"Sp\xe9cifier l\'impl\xe9mentation au lieu de l\'interface","description":"27 septembre 2023","source":"@site/docs/adr/2023-09-27.specifier-l-implementation-au-lieu-de-l-interface.md","sourceDirName":"adr","slug":"/adr/2023-09-27.specifier-l-implementation-au-lieu-de-l-interface","permalink":"/1j1s-front/docs/adr/2023-09-27.specifier-l-implementation-au-lieu-de-l-interface","draft":false,"unlisted":false,"editUrl":"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/adr/2023-09-27.specifier-l-implementation-au-lieu-de-l-interface.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Utiliser UserEvent au lieu de FireEvent","permalink":"/1j1s-front/docs/adr/2023-09-12.utiliser-user-event-au-lieu-de-fireevent"},"next":{"title":"Utiliser un mix d\'imports relatifs et absolu","permalink":"/1j1s-front/docs/adr/2023-09-27.utiliser-mix-imports-relatifs-et-absolu"}}');var r=i(4848),s=i(8453);const a={},l="Sp\xe9cifier l'impl\xe9mentation au lieu de l'interface",o={},c=[{value:"TL;DR",id:"tldr",level:2},{value:"Contributeurs",id:"contributeurs",level:2},{value:"Statut",id:"statut",level:2},{value:"Contexte",id:"contexte",level:2},{value:"D\xe9cision",id:"d\xe9cision",level:2},{value:"Cons\xe9quences",id:"cons\xe9quences",level:2},{value:"Autres pistes explor\xe9es",id:"autres-pistes-explor\xe9es",level:2}];function d(e){const t={blockquote:"blockquote",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"sp\xe9cifier-limpl\xe9mentation-au-lieu-de-linterface",children:"Sp\xe9cifier l'impl\xe9mentation au lieu de l'interface"})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:"27 septembre 2023"})}),"\n",(0,r.jsx)(t.h2,{id:"tldr",children:"TL;DR"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Expliciter l'impl\xe9mentation par ce qui la diff\xe9rencie d'une autre implem ex: BffMetierService qui est l'implem et son interface est MetierService"})}),"\n",(0,r.jsx)(t.h2,{id:"contributeurs",children:"Contributeurs"}),"\n",(0,r.jsx)(t.p,{children:"Suxue Li, Julie Brunetto, Guillaume Moizan, Gauthier Fiorentino, Dorian De Rosa"}),"\n",(0,r.jsx)(t.h2,{id:"statut",children:"Statut"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:"Accept\xe9"})}),"\n",(0,r.jsx)(t.h2,{id:"contexte",children:"Contexte"}),"\n",(0,r.jsx)(t.p,{children:"C\xf4t\xe9 front, on a des services qui sont abstraites par des interfaces.\nLe nommage des impl\xe9mentations et des interfaces ont \xe9t\xe9 challeng\xe9 en revue."}),"\n",(0,r.jsx)(t.p,{children:"Une proposition \xe9tait d'expliciter l'interface en le pr\xe9fixant d'un I (ex : IMetierService)."}),"\n",(0,r.jsx)(t.p,{children:"Une autre est d'expliciter les implems et non pas les interfaces, citation de Clean Code :"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:"These are sometimes a special case for encodings. For example, say you are building an\nABSTRACT FACTORY for the creation of shapes. This factory will be an interface and will\nbe implemented by a concrete class. What should you name them? IShapeFactory and\nShapeFactory? I prefer to leave interfaces unadorned. The preceding I, so common in\ntoday\u2019s legacy wads, is a distraction at best and too much information at worst. I don\u2019t\nwant my users knowing that I\u2019m handing them an interface. I just want them to know that\nit\u2019s a ShapeFactory. So if I must encode either the interface or the implementation, I choose\nthe implementation. Calling it ShapeFactoryImp, or even the hideous CShapeFactory, is preferable to encoding the interface."}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"d\xe9cision",children:"D\xe9cision"}),"\n",(0,r.jsx)(t.p,{children:"Suite aux discussions et votes, nous nous avons d\xe9cid\xe9 d'appliquer la proposition 2.\nC'est-\xe0-dire expliciter l'impl\xe9mentation par ce qui la diff\xe9rencie d'une autre implem ex: BffMetierService, et son interface se nommera MetierService."}),"\n",(0,r.jsx)(t.h2,{id:"cons\xe9quences",children:"Cons\xe9quences"}),"\n",(0,r.jsx)(t.p,{children:"Un nommage uniforme sur le projet."}),"\n",(0,r.jsx)(t.h2,{id:"autres-pistes-explor\xe9es",children:"Autres pistes explor\xe9es"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Nommer la classe MetierServiceImpl et l'interface MetierService"}),"\n",(0,r.jsx)(t.li,{children:"Nommer la classe MetierService et l'interface IMetierService"}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>l});var n=i(6540);const r={},s=n.createContext(r);function a(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);