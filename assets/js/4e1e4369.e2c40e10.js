"use strict";(self.webpackChunk_1j1s_front_docs=self.webpackChunk_1j1s_front_docs||[]).push([[737],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>N});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=p(a),m=r,N=u["".concat(s,".").concat(m)]||u[m]||c[m]||o;return a?n.createElement(N,l(l({ref:t},d),{},{components:a})):n.createElement(N,l({ref:t},d))}));function N(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:r,l[1]=i;for(var p=2;p<o;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},2096:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const o={sidebar_label:"Import des ressources TF",sidebar_position:1},l="Comment nous avons import\xe9 les ressource Terraform",i={unversionedId:"infrastructure/terraform-import",id:"infrastructure/terraform-import",title:"Comment nous avons import\xe9 les ressource Terraform",description:"Ces \xe9tapes ont \xe9t\xe9 r\xe9alis\xe9es une fois pour toutes lors de l'initialisation du code Terraform du projet.",source:"@site/docs/infrastructure/terraform-import.md",sourceDirName:"infrastructure",slug:"/infrastructure/terraform-import",permalink:"/1j1s-front/docs/infrastructure/terraform-import",draft:!1,editUrl:"https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/docs/infrastructure/terraform-import.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_label:"Import des ressources TF",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"\ud83d\ude9a Infrastructure",permalink:"/1j1s-front/docs/category/-infrastructure"},next:{title:"\ud83e\uddd1\u200d\ud83c\udf93 Tutoriels",permalink:"/1j1s-front/docs/category/-tutoriels"}},s={},p=[{value:"1. Scalingo",id:"1-scalingo",level:2},{value:"Correspondances entre Ressources Terraform et routes d&#39;API",id:"correspondances-entre-ressources-terraform-et-routes-dapi",level:3},{value:"Initialiser les variables d&#39;environnements",id:"initialiser-les-variables-denvironnements",level:3},{value:"Lister les applications qui vous sont accessibles",id:"lister-les-applications-qui-vous-sont-accessibles",level:3},{value:"Choisir l&#39;application qu&#39;on veut importer",id:"choisir-lapplication-quon-veut-importer",level:3},{value:"Module Terraform",id:"module-terraform",level:3},{value:"Importer l&#39;application",id:"importer-lapplication",level:3},{value:"Types de conteneurs",id:"types-de-conteneurs",level:3},{value:"Autoscalers",id:"autoscalers",level:3},{value:"Addons (et notamment les bases de donn\xe9es)",id:"addons-et-notamment-les-bases-de-donn\xe9es",level:3},{value:"Collaborateurs",id:"collaborateurs",level:3},{value:"Log drains",id:"log-drains",level:3},{value:"Github Repo Link",id:"github-repo-link",level:3},{value:"Noms de domaine",id:"noms-de-domaine",level:3},{value:"2. Cloudflare",id:"2-cloudflare",level:2},{value:"Domaine du site",id:"domaine-du-site",level:3},{value:"Domaine pour l&#39;analytics",id:"domaine-pour-lanalytics",level:3},{value:"3. StatusCake",id:"3-statuscake",level:2}],d={toc:p},u="wrapper";function c(e){let{components:t,...a}=e;return(0,r.kt)(u,(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"comment-nous-avons-import\xe9-les-ressource-terraform"},"Comment nous avons import\xe9 les ressource Terraform"),(0,r.kt)("admonition",{type:"danger"},(0,r.kt)("p",{parentName:"admonition"},"Ces \xe9tapes ont \xe9t\xe9 r\xe9alis\xe9es une fois pour toutes lors de l'initialisation du code Terraform du projet.\nElles ont \xe9t\xe9 document\xe9es ici seulement pour garder m\xe9moire du processus et pour aider \xe0 d\xe9bugger plus tard si n\xe9cessaire. "),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("strong",{parentName:"p"},"Tenter de reproduire ces \xe9tapes sur les ",(0,r.kt)("inlineCode",{parentName:"strong"},"states")," d\xe9j\xe0 initialis\xe9s pourraient avoir des effets inattendus et provoquer des probl\xe8mes graves."))),(0,r.kt)("admonition",{title:"Pr\xe9-requis",type:"info"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"curl")," (d\xe9j\xe0 pr\xe9-install\xe9s sur votre environnement normalement)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"jq")," (Instructions d'installation ici : ",(0,r.kt)("a",{parentName:"li",href:"https://stedolan.github.io/jq/download/"},"https://stedolan.github.io/jq/download/"),")"))),(0,r.kt)("h2",{id:"1-scalingo"},"1. Scalingo"),(0,r.kt)("h3",{id:"correspondances-entre-ressources-terraform-et-routes-dapi"},"Correspondances entre Ressources Terraform et routes d'API"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Resource Terraform"),(0,r.kt)("th",{parentName:"tr",align:null},"Route(s) d'API *"),(0,r.kt)("th",{parentName:"tr",align:null},"Identifiant unique pour l'import"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_app"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_id"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_container_type"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps/[:app]/containers")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_id:container_name"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_autoscaler"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps/[:app]/autoscalers")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_name:autoscaler_id"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_addon"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps/[:app]/addons")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_id:addon_id"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_scm_repo_link"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps/[:app]/scm_repo_link")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_id"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_domain"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps/[:app]/domains")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_id:domain_id"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_collaborator"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps/[:app]/collaborators")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_id:email"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_log_drain"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/v1/apps/[:app]/log_drains")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"app_id#drain_url"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_notification_platform"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"TODO: \xe0 compl\xe9ter quand on les importera")),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_notifier"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"TODO: \xe0 compl\xe9ter quand on les importera")),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"scalingo_alert"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},"TODO: \xe0 compl\xe9ter quand on les importera")),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("p",null,"*"," toujours pr\xe9fix\xe9e(s) par ",(0,r.kt)("inlineCode",{parentName:"p"},"https://$SCALINGO_API_URL")," sauf mention contraire"),(0,r.kt)("h3",{id:"initialiser-les-variables-denvironnements"},"Initialiser les variables d'environnements"),(0,r.kt)("admonition",{title:"Obtenir un Token d'API Scalingo",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Si vous n'avez pas encore cr\xe9\xe9 un token d'API Scalingo vous pouvez le faire ici sur la ",(0,r.kt)("a",{parentName:"p",href:"https://dashboard.scalingo.com/account/tokens"},"page d\xe9di\xe9e du dashboard"),'. Les tokens que vous cr\xe9ez avec votre compte individuel n\'ont \xe9videmment acc\xe8s qu\'aux applications pour lesquelles des droits vous ont d\xe9j\xe0 \xe9t\xe9 accord\xe9s. Pour jouer avec un token qui ait acc\xe8s \xe0 toutes les applications Scalingo du compte "1j1s", il vous faut demander ce token "ma\xeetre" \xe0 vos coll\xe8gues qui l\'ont d\xe9j\xe0.')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'export SCALINGO_API_TOKEN="<Mettre votre cl\xe9 d\'API Scalingo ici>"\nexport SCALINGO_REGION=osc-fr1\nexport SCALINGO_API_URL="api.$SCALINGO_REGION.scalingo.com"\n\n# Obtenir un token valable 1h,\n# Lorsque celui sera expir\xe9, il suffit de r\xe9ex\xe9cuter cette commande seulement\nexport SCALINGO_BEARER=`curl -s \\\n   -H "Accept: application/json" \\\n   -u ":$SCALINGO_API_TOKEN" \\\n   -X POST https://auth.scalingo.com/v1/tokens/exchange \\\n   | jq -r \'.token\'`\n')),(0,r.kt)("h3",{id:"lister-les-applications-qui-vous-sont-accessibles"},"Lister les applications qui vous sont accessibles"),(0,r.kt)("p",null,"Normalement cette liste devrait \xeatre identique \xe0 ce que vous voyez ",(0,r.kt)("a",{parentName:"p",href:"https://dashboard.scalingo.com/apps"},"depuis le dashboard"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps \\\n   | jq \'.apps[].name\'\n')),(0,r.kt)("h3",{id:"choisir-lapplication-quon-veut-importer"},"Choisir l'application qu'on veut importer"),(0,r.kt)("p",null,"Pour \xe9viter de r\xe9p\xe9ter le nom de l'application dans les prochaines commandes, vous pouvez le stocker dans une variable d'env : "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'export SCALINGO_APP_NAME="<nom de l\'application>"\n')),(0,r.kt)("p",null,"Une fois le nom de l'application configur\xe9e, il faut r\xe9cup\xe9rer son ID avec la commande suivante :"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"export SCALINGO_APP_ID=`curl -s -H \"Accept: application/json\" -H \"Authorization: Bearer ${SCALINGO_BEARER}\" \\\n   https://${SCALINGO_API_URL}/v1/apps/${SCALINGO_APP_NAME} \\\n   | jq -r '.app.id' || echo 'error getting app id'`\n")),(0,r.kt)("h3",{id:"module-terraform"},"Module Terraform"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"export TF_MODULE=front_app\n")),(0,r.kt)("h3",{id:"importer-lapplication"},"Importer l'application"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"terraform import module.$TF_MODULE.scalingo_app.app $SCALINGO_APP_ID\n")),(0,r.kt)("h3",{id:"types-de-conteneurs"},"Types de conteneurs"),(0,r.kt)("p",null,"R\xe9cup\xe8rons d'abord la liste des types de conteneurs qui sont pr\xe9sents sur notre application."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/containers \\\n   | jq \'.containers[].name\'\n')),(0,r.kt)("p",null,"En g\xe9n\xe9ral il y a au moins le process ",(0,r.kt)("inlineCode",{parentName:"p"},"web"),", alors on peut d'abord importer celui-ci, puis importer les autres sur le m\xeame mod\xe8le."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "module.$TF_MODULE.scalingo_container_type.containers[\\"web\\"]" ${SCALINGO_APP_ID}:web\n')),(0,r.kt)("p",null,"S'il y a d'autres types de conteneurs, voici la commande :"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "module.$TF_MODULE.scalingo_container_type.containers[\\"<container_name>\\"]" ${SCALINGO_APP_ID}:<container_name>\n')),(0,r.kt)("h3",{id:"autoscalers"},"Autoscalers"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/autoscalers \\\n   | jq \'.autoscalers[] | .container_type + " => " + .id\'\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "module.$TF_MODULE.scalingo_autoscaler.autoscalers[\\"web\\"]" ${SCALINGO_APP_ID}:<autoscalerId>\n')),(0,r.kt)("h3",{id:"addons-et-notamment-les-bases-de-donn\xe9es"},"Addons (et notamment les bases de donn\xe9es)"),(0,r.kt)("p",null,"R\xe9cup\xe8rons d'abord la liste des addons qui sont pr\xe9sents sur notre application."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/addons \\\n   | jq \'.addons[]|.addon_provider.id+" ("+.plan.name+") => "+.id\'\n\n# => "redis (redis-business-256) => ad-********-****-****-****-************"\n')),(0,r.kt)("p",null,"Pour chaque ligne : le ",(0,r.kt)("em",{parentName:"p"},"premier \xe9l\xe9ment"),' (ici "',(0,r.kt)("inlineCode",{parentName:"p"},"redis"),"\") est \xe0 mettre dans l'emplacement ",(0,r.kt)("inlineCode",{parentName:"p"},"addonProvider"),", le ",(0,r.kt)("em",{parentName:"p"},"dernier \xe9lement")," (qui ressemble \xe0 un uuid) est \xe0 mettre dans l'emplacement ",(0,r.kt)("inlineCode",{parentName:"p"},"addonId"),".\nLe plan est donn\xe9 \xe0 titre informatif mais n'est pas utilis\xe9 pour l'import."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "module.$TF_MODULE.scalingo_addon.addons[\\"<addonProvider>\\"]" ${SCALINGO_APP_ID}:<addonId>\n')),(0,r.kt)("h3",{id:"collaborateurs"},"Collaborateurs"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Il a \xe9t\xe9 d\xe9cid\xe9 de ne pas g\xe9rer les collaborateurs avec Terraform pour l'instant. Ces commandes d'imports n'ont pas \xe9t\xe9 utilis\xe9es.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/collaborators \\\n   | jq \'.collaborators[].email\'\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/collaborators \\\n   | jq -r \'.collaborators[].email\' \\\n   | while IFS= read -r email ; do \\\n      terraform import "module.$TF_MODULE.scalingo_collaborator.collaborators[\\"$email\\"]" $SCALINGO_APP_ID:$email; \\\n     done\n')),(0,r.kt)("h3",{id:"log-drains"},"Log drains"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/log_drains \\\n   | jq \'.drains[].url\'\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "module.$TF_MODULE.scalingo_log_drain.log_drain[\\"elk\\"]" ${SCALINGO_APP_ID}#<drain_url>\n')),(0,r.kt)("h3",{id:"github-repo-link"},"Github Repo Link"),(0,r.kt)("p",null,"Ce n'est m\xeame pas la peine de les lister car il ne peut y en avoir qu'un seul par application, mais si vous souhaitez v\xe9rifier sa pr\xe9sence avant d'importer vous pouvez utiliser la commande suivante :"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/scm_repo_link \\\n   | jq \'"scm_type = " + .scm_repo_link.scm_type\'\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "module.$TF_MODULE.scalingo_scm_repo_link.scm_repo_link[\\"github\\"]" ${SCALINGO_APP_ID}\n')),(0,r.kt)("h3",{id:"noms-de-domaine"},"Noms de domaine"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -s -H "Accept: application/json" -H "Authorization: Bearer $SCALINGO_BEARER" \\\n   https://$SCALINGO_API_URL/v1/apps/$SCALINGO_APP_NAME/domains \\\n   | jq \'.domains[] | .name + " => " + .id + (if .canonical then " [!!CANONICAL!!]" else " [alias]" end)\'\n\n# Pour le domaine principal (\'canonical\')\nterraform import "module.$TF_MODULE.scalingo_domain.canonical_domain[\\"<domainName>\\"]" ${SCALINGO_APP_ID}:<domainId>\n\n# S\'il y a d\'autres domaine (\'alias\')\nterraform import "module.$TF_MODULE.scalingo_domain.domain_aliases[\\"<domainName>\\"]" ${SCALINGO_APP_ID}:<domainId>\n')),(0,r.kt)("h2",{id:"2-cloudflare"},"2. Cloudflare"),(0,r.kt)("h3",{id:"domaine-du-site"},"Domaine du site"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'export CLOUDFLARE_API_TOKEN="<Mettre votre Token API Cloudflare ici>"\nexport CLOUDFLARE_ZONE_ID="<Mettre votre Zone ID ici>"\n\ncurl -s -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \\\n  https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records \\\n  | jq \'.result[] | "[" + .type +"] " + .name + " => " + .id\'\n\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "cloudflare_record.domaine[\\"<domainName>\\"]" $CLOUDFLARE_ZONE_ID/<recordId>\n')),(0,r.kt)("h3",{id:"domaine-pour-lanalytics"},"Domaine pour l'analytics"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import "cloudflare_record.domaine_analytics_eulerian[\\"<domainName>\\"]" $CLOUDFLARE_ZONE_ID/<recordId>\n')),(0,r.kt)("h2",{id:"3-statuscake"},"3. StatusCake"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Les cl\xe9s d'API StatusCake se g\xe9n\xe8rent facilement sur ",(0,r.kt)("a",{parentName:"p",href:"https://app.statuscake.com/User.php"},'la page "My Account"'))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'export STATUSCAKE_API_TOKEN="<Mettre votre cl\xe9 d\'API StatusCake ici>"\n\ncurl -s -H "Authorization: Bearer ${STATUSCAKE_API_TOKEN}" \\\n   https://api.statuscake.com/v1/uptime \\\n   | jq \'.data[] | "[" + .test_type + "] " + .name + " => " + .id\'\n\n# => "[HTTP] 1j1s-******* => 12456789"\n#    "[HEAD] https://********.gouv.fr => 987654321"\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'terraform import statuscake_uptime_check.http_check "<uptime_check_id>"\n')))}c.isMDXComponent=!0}}]);