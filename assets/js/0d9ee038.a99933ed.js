"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[91],{422:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"tuto/tracking","title":"Le tracking","description":"28 Avril 2023 (mis \xe0 jour le 24 Juillet 2024)","source":"@site/docs/tuto/tracking.md","sourceDirName":"tuto","slug":"/tuto/tracking","permalink":"/1j1s-front/docs/tuto/tracking","draft":false,"unlisted":false,"editUrl":"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/tuto/tracking.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_label":"Le tracking, comment \xe7a marche ?","sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"La recherche index\xe9e, comment \xe7a marche ?","permalink":"/1j1s-front/docs/tuto/recherche-indexe"},"next":{"title":"Une campagne de com\' Adform, comment on fait ?","permalink":"/1j1s-front/docs/tuto/campagne-adform"}}');var s=i(4848),t=i(8453);const a={sidebar_label:"Le tracking, comment \xe7a marche ?",sidebar_position:4},l="Le tracking",o={},c=[{value:"Comment \xe7a marche ?",id:"comment-\xe7a-marche-",level:2},{value:"Plan de taggage",id:"plan-de-taggage",level:2},{value:"Technologie utilis\xe9e : Eulerian",id:"technologie-utilis\xe9e--eulerian",level:2},{value:"Chargement de la librairie Eulerian",id:"chargement-de-la-librairie-eulerian",level:2},{value:"Int\xe9grer le service dans Tarte au citron",id:"int\xe9grer-le-service-dans-tarte-au-citron",level:2},{value:"M\xe9thode g\xe9n\xe9rale d&#39;envoi de donnn\xe9es vers Eulerian",id:"m\xe9thode-g\xe9n\xe9rale-denvoi-de-donnn\xe9es-vers-eulerian",level:2},{value:"Gestion des domaines",id:"gestion-des-domaines",level:2},{value:"Erreur CSP",id:"erreur-csp",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"le-tracking",children:"Le tracking"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.em,{children:"28 Avril 2023 (mis \xe0 jour le 24 Juillet 2024)"})}),"\n",(0,s.jsx)(n.admonition,{title:"Introduction",type:"info",children:(0,s.jsx)(n.p,{children:"Le tracking est un suivi et une analyse du comportement et des centres d'int\xe9r\xeats des utilisateurs sur notre produit."})}),"\n",(0,s.jsx)(n.h2,{id:"comment-\xe7a-marche-",children:"Comment \xe7a marche ?"}),"\n",(0,s.jsx)(n.p,{children:"Le tracking (ou analytics) est d\xe9compos\xe9 en 2 cat\xe9gories de tags\xa0:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"impression = arriv\xe9e sur une page ou passage d'\xe9tape d'un formulaire."}),"\n",(0,s.jsx)(n.li,{children:"\xe9v\xe9nements = interactions utilisateurs sur des call to actions"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Les fonctions correspondantes se trouvent dans\nl'",(0,s.jsx)(n.a,{href:"https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/services/analytics/analytics.service.ts",children:(0,s.jsx)(n.code,{children:"AnalyticsService"})})," et sont expos\xe9es aux composants depuis le\nhook ",(0,s.jsx)(n.a,{href:"https://github.com/DNUM-SocialGouv/1j1s-front/blob/main/src/client/hooks/useAnalytics.ts",children:(0,s.jsx)(n.code,{children:"useAnalytics"})})," qui s'occupe par d\xe9faut d'envoyer les analytics d'une page selon\nune configuration qui lui est envoy\xe9e. D'ailleurs, la configuration \xe0 envoyer de chaque page se trouve dans le dossier\nde la page en question, dans un fichier de la forme ",(0,s.jsx)(n.code,{children:"*.analytics.ts"}),"."]}),"\n",(0,s.jsx)(n.h1,{id:"la-solution-utilis\xe9e",children:"La solution utilis\xe9e"}),"\n",(0,s.jsx)(n.h2,{id:"plan-de-taggage",children:"Plan de taggage"}),"\n",(0,s.jsx)(n.p,{children:"Le plan de taggage organise les donn\xe9es \xe0 r\xe9cuperer pour chaque cat\xe9gorie et page du site."}),"\n",(0,s.jsx)(n.p,{children:"Dans notre cas, il \xe9tablit la correspondance entre une page et les \xe9venements \xe0 envoyer pour en permettre le tracking."}),"\n",(0,s.jsxs)(n.p,{children:["Les valeurs des \xe9venements envoy\xe9es via le hook useAnalytics (du type ",(0,s.jsx)(n.code,{children:"PageTags"}),") sont issues de plan de taggage\nr\xe9alis\xe9 par Converteo pour la solution Eulerian."]}),"\n",(0,s.jsx)(n.p,{children:"Si la solution de tracking \xe9tait amen\xe9e \xe0 changer, il conviendrait de consid\xe9rer la reprise de ce plan de taggage pour\nfaciliter la bascule / analyse mais \xe9galement les alternatives possibles, qui pourraient mieux convenir \xe0 la technologie\nutilis\xe9e"}),"\n",(0,s.jsx)(n.h2,{id:"technologie-utilis\xe9e--eulerian",children:"Technologie utilis\xe9e : Eulerian"}),"\n",(0,s.jsx)(n.p,{children:"L'ensemble des sites minist\xe9riels basculent sur la technologie Eulerian. La coupure de leur ancienne solution de tracking est pr\xe9vue pour le 16/03/2023."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/EulerianTechnologies/nextjs-eulerian-analytics",children:"https://github.com/EulerianTechnologies/nextjs-eulerian-analytics"})}),"\n",(0,s.jsx)(n.h2,{id:"chargement-de-la-librairie-eulerian",children:"Chargement de la librairie Eulerian"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Script \xe0 positionner id\xe9alement au plus haut dans le ",(0,s.jsx)(n.strong,{children:"head"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Toujours le placer avant les scripts de mesure de page, d'interaction/\xe9v\xe9nement, de conversion"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Remplacer '",(0,s.jsx)(n.strong,{children:"mon.domainedetracking.com"}),"' par le  domaine de mesure correspondant au site qui doit \xeatre mesur\xe9"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"ex :"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"script type=\"text/javascript\"\n    (function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);\n    (function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})\n('mon.domainedetracking.com','EA_push');\n"})}),"\n",(0,s.jsx)(n.h2,{id:"int\xe9grer-le-service-dans-tarte-au-citron",children:"Int\xe9grer le service dans Tarte au citron"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://eulerian.wiki/doku.php?id=fr:modules:collect:gdpr:tarteaucitron&s%5B%5D=tarteaucitron",children:"https://eulerian.wiki/doku.php?id=fr:modules:collect:gdpr:tarteaucitron&s[]=tarteaucitron"})}),"\n",(0,s.jsx)(n.h2,{id:"m\xe9thode-g\xe9n\xe9rale-denvoi-de-donnn\xe9es-vers-eulerian",children:"M\xe9thode g\xe9n\xe9rale d'envoi de donnn\xe9es vers Eulerian"}),"\n",(0,s.jsx)(n.p,{children:"Consignes d'impl\xe9mentation :"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Le script est plac\xe9 dans une fonction anonyme auto-invoqu\xe9e"}),"\n",(0,s.jsx)(n.li,{children:"Une variable EA_datalayer de type Array est cr\xe9\xe9e au scope global window"}),"\n",(0,s.jsxs)(n.li,{children:["Invoquer la m\xe9thode EA_datalayer.push() dans laquelle :","\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Le premier argument sera le nom de la variable"}),"\n",(0,s.jsxs)(n.li,{children:["Le second argument sera la valeur de la variable\nExemple :\n",(0,s.jsx)(n.code,{children:"data.push('key', 'value');"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"Une fois la construction de window.EA_datalayer finalis\xe9e, invoquer la fonction EA_push() dans laquelle nous passerons fnialement EA_data en argument."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"ex :"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"\"script type=\"\"text/javascript\"\n(function(){\n\n        // Cr\xe9ation d'un datalayer au scope global :\n        window.EA_datalayer = [];\n\n        // Donn\xe9es \xe0 envoyer (dimensions/m\xe9triques) \xe0 posser dans le datalayer :\n        window.EA_datalayer.push('dimension_personnalisee_X', '{{valeur X}}'); // etc.\n        window.EA_datalayer.push('metrique_personnalisee_Y', {{valeur Y}}); // etc.\n    \n        // Envoi des donn\xe9es :\n        window.EA_push(window.EA_datalayer);\n\n})();\n"})}),"\n",(0,s.jsx)(n.h2,{id:"gestion-des-domaines",children:"Gestion des domaines"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Obtenir le sous domaine de tracking pour l'environnement de recette qui sera sous la forme ",(0,s.jsx)(n.strong,{children:"xxxx.recette.1jeune1solution.gouv.fr"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Lancer les demandes d'enregistrement CNAME pour les sous domaines de tracking, \xe0 transmettre \xe0 la DNUM.\nCa sera sous la forme :"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"yssn.1jeune1solution.gouv.fr. CNAME minsante.ent.et-gv.fr."}),"\n",(0,s.jsx)(n.li,{children:'yssn.1jeune1solution.gouv.fr. CAA 0 issue "letsencrypt.org"'}),"\n",(0,s.jsx)(n.li,{children:"recette.1jeune1solution.gouv.fr. CNAME recette.1jeune1solution.gouv.fr.cdn.cloudflare.net."}),"\n",(0,s.jsx)(n.li,{children:"xxxx.recette.1jeune1solution.gouv.fr. CNAME minsante.ent.et-gv.fr."}),"\n",(0,s.jsx)(n.li,{children:'xxxx.recette.1jeune1solution.gouv.fr. CAA 0 issue "letsencrypt.org"'}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Ajouter un enregistrement CNAME pour les review apps : *.review.1jeune1solution.gouv.fr CNAME scalingo.review.1jeune1solution.gouv.fr.cdn.cloudflare.net"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Modifier la variable d'environnement NEXT_PUBLIC_ANALYTICS_DOMAIN en recette avec le nouveau sous domaine de tracking sous la forme xxxx.recette.1jeune1solution.gouv.fr"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Une fois les enregistrements CNAME effectu\xe9s et la recette sous sa nouvelle URL ",(0,s.jsx)(n.a,{href:"https://recette.1jeune1solution.gouv.fr",children:"https://recette.1jeune1solution.gouv.fr"}),", le tracking peut \xeatre recett\xe9 en l'activant via la variable d'environnement NEXT_PUBLIC_ANALYTICS_EULERIAN_FEATURE alors valoris\xe9e \xe0 1."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Mettre \xe0 jour les CSP"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"point-de-blocage-\xe9ventuels",children:"Point de blocage \xe9ventuels"}),"\n",(0,s.jsx)(n.h2,{id:"erreur-csp",children:"Erreur CSP"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Erreur rencontr\xe9e :"})," \"refused to execute inline script because it violates the following Content Security Policy directive: \"script-src 'self' yssn.recette.1jeune1solution.gouv.fr\". Either the 'unsafe-inline' keyword, a hash ('sha256-XXXXX...'), or a nonce ('nonce-...') is required to enable inline execution.\""]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Action :"}),"\nLors de l'implementation, nous avons \xe9t\xe9 confront\xe9 \xe0 l'erreur ci-dessus.\nElle est d\xfbe au fait que l'implementation pouss\xe9e dans la documentation repose sur l'ajout d'un script inline dans le\nHTML type :"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:"<script>(function(e,a){var i=e.length,y=5381,k='...<\/script>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Hors notre ",(0,s.jsx)(n.code,{children:"Content-Security Policy"})," implement\xe9es dans le fichier ",(0,s.jsx)(n.code,{children:"headers.js"}),", emp\xeache l'execution de ces scripts\ninline et ne permet d'executer que du javascript pr\xe9sent dans des fichiers JS."]}),"\n",(0,s.jsxs)(n.p,{children:["Pour \xe9viter d'utiliser \xab unsafe-inline \xbb et permettre de charger un code diff\xe9rent en fonction de l'environnement (un\npour l'env de recette, un pour l'env de prod) la d\xe9cision suivante a \xe9t\xe9 prise :\nCharger un fichier JS contenant le script \xe0 executer, depuis un composant ",(0,s.jsx)(n.code,{children:"<Script>"}),", en calculant son nom gr\xe2ce \xe0 une\nvariable d'environnement :"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Script\n    id="eulerianAnalytics"\n    src={`/scripts/eulerian.${process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}.js`}\n    strategy="beforeInteractive"\n/>\n'})}),"\n",(0,s.jsx)(n.p,{children:"Ainsi, on peut charger le JS \xe0 executer qui provient d'un fichier et on peut diff\xe9rencier le code \xe0 executer selon\nl'environnement."}),"\n",(0,s.jsx)(n.p,{children:"Il est fort possible que l'impl\xe9mentation d'une autre solution de trackin nous fasse rencontrer un probl\xe8me similaire."})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>l});var r=i(6540);const s={},t=r.createContext(s);function a(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);