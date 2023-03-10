export const SITE_TAGS: Record<string, string> = {
	site_entity: 'Min. Santé',
	site_environment: process.env.NEXT_PUBLIC_ANALYTICS_ENVIRONMENT || 'dev',
	site_target: 'information',
	site_type: 'multiple',
};

type SegmentSite =
	'accueil'
	| 'autres'
	| 'contenu_detail'
	| 'contenu_liens'
	| 'contenu_liste'
	| 'funnel_etape_1'
	| 'funnel_etape_confirmation'
	| 'funnel_etape_intermediaire'
	| 'offres_d_emploi'
	| 'page_404'
	| 'page_de_base'
	| 'resultats_de_recherche';

type PageGroup =
	'accueil'
	| 'accompagnement'
	| 'accompagnement_detail'
	| 'accompagnement_liste'
	| 'aides_logement_detail'
	| 'apprentissage'
	| 'autres'
	| 'benevolat'
	| 'benevolat_detail'
	| 'benevolat_liste'
	| 'contenu_statique'
	| 'contrat_engagement_jeune_detail'
	| 'cv'
	| 'decouvrir_les_metiers_detail'
	| 'decouvrir_les_metiers_liste'
	| 'deposer_offre_emploi'
	| 'emplois'
	| 'engagement_entreprise'
	| 'entreprendre_detail'
	| 'formation'
	| 'formation_liste'
	| 'formations_detail'
	| 'je_recrute'
	| 'job_etudiants'
	| 'job_europe'
	| 'logement'
	| 'mes_aides_financières'
	| 'mesures_employeurs_detail'
	| 'mesures_employeurs_liste'
	| 'metiers'
	| 'mon_espace'
	| 'métier'
	| 'page_404'
	| 'participer_a_un_evenement'
	| 'reference_entreprise'
	| 'service_civique'
	| 'service_civique_detail'
	| 'service_civique_liste'
	| 'stages';

type PageLabel =
	'accueil'
	| 'accompagnement'
	| 'autres'
	| 'benevolat'
	| 'contenu_detail_niv_1'
	| 'contenu_detail_niv_2'
	| 'contenu_liste_niv_2'
	| 'contenu_statique'
	| 'cv'
	| 'deposer_offre_emploi_confirmation'
	| 'deposer_offre_emploi_etape_1'
	| 'deposer_offre_emploi_etape_intermediaire'
	| 'emplois'
	| 'emplois_detail'
	| 'emplois_liste'
	| 'engagement_entreprise_confirmation'
	| 'engagement_entreprise_etape_1'
	| 'engagement_entreprise_etape_intermediaire'
	| 'formation'
	| 'je_recrute_confirmation'
	| 'je_recrute_etape_1'
	| 'je_recrute_etape_intermediaire'
	| 'logement'
	| 'mes_aides_financières'
	| 'metiers'
	| 'mon_espace'
	| 'métier'
	| 'page_404'
	| 'participer_a_un_evenement'
	| 'reference_entreprise_confirmation'
	| 'reference_entreprise_etape_1'
	| 'reference_entreprise_etape_intermediaire'
	| 'service_civique';

type PageTemplate =
	'accueil'
	| 'accompagnement'
	| 'autres'
	| 'benevolat'
	| 'contenu_detail_niv_1'
	| 'contenu_detail_niv_2'
	| 'contenu_liste_niv_2'
	| 'contenu_statique'
	| 'cv'
	| 'deposer_offre_emploi_confirmation'
	| 'deposer_offre_emploi_etape_1'
	| 'deposer_offre_emploi_etape_intermediaire'
	| 'emplois'
	| 'emplois_detail'
	| 'emplois_liste'
	| 'engagement_entreprise_confirmation'
	| 'engagement_entreprise_etape_1'
	| 'engagement_entreprise_etape_intermediaire'
	| 'formation'
	| 'je_recrute_confirmation'
	| 'je_recrute_etape_1'
	| 'je_recrute_etape_intermediaire'
	| 'logement'
	| 'mes_aides_financières'
	| 'metiers'
	| 'mon_espace'
	| 'métier'
	| 'page_404'
	| 'participer_a_un_evenement'
	| 'reference_entreprise_confirmation'
	| 'reference_entreprise_etape_1'
	| 'reference_entreprise_etape_intermediaire'
	| 'service_civique';

interface PageTags {
	page_template: PageTemplate;
	pagegroup: PageGroup;
	pagelabel: PageLabel;
	'segment-site': SegmentSite;
}

export interface PageTagsConfig {
	'404': PageTags;
	'accessibilite': PageTags;
	'accompagnement': PageTags;
	'accueil': PageTags;
	'apprentissage': PageTags;
	'articles': PageTags;
	'autres': PageTags;
	'benevolat': PageTags;
	'benevolat/[id]': PageTags;
	'cgu': PageTags;
	'confidentialite': PageTags;
	'contrat-engagement-jeune': PageTags;
	'creer-mon-cv': PageTags;
	'decouvrir-les-metiers': PageTags;
	'decouvrir-les-metiers/[nomMetier]': PageTags;
	'emplois': PageTags;
	'emplois/[id]': PageTags;
	'emplois/deposer-offre': PageTags;
	'entreprendre': PageTags;
	'espace-jeune': PageTags;
	'europe': PageTags;
	'evenements': PageTags;
	'formations': PageTags;
	'formations/apprentissage': PageTags;
	'immersions': PageTags;
	'immersions/referencer-mon-entreprise': PageTags;
	'je-deviens-mentor': PageTags;
	'je-recrute': PageTags;
	'je-recrute-afpr-poei': PageTags;
	'je-recrute-afpr-poei/inscription': PageTags;
	'jobs-etudiants': PageTags;
	'jobs-etudiants/[id]': PageTags;
	'les-entreprises-s-engagent': PageTags;
	'les-entreprises-s-engagent/inscription': PageTags;
	'les-entreprises-s-engagent/inscription/confirmation': PageTags;
	'les-entreprises-s-engagent/inscription/intermediaire': PageTags;
	'logements/aides-logement': PageTags;
	'logements/annonces': PageTags;
	'logements/annonces/[id]': PageTags;
	'mentions-legales': PageTags;
	'mentorat': PageTags;
	'mes-aides': PageTags;
	'mesures-employeurs': PageTags;
	'mon-espace': PageTags;
	'plan-du-site': PageTags;
	'service-civique': PageTags;
	'service-civique/[id]': PageTags;
	'stages': PageTags;
	'stages/[id]': PageTags;
	'stages/deposer-offre': PageTags;
}

export const PAGE_TAGS_CONFIG: PageTagsConfig = {
	404: {
		page_template: 'page_404',
		pagegroup: 'page_404',
		pagelabel: 'page_404',
		'segment-site': 'page_404',
	},
	accessibilite: {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	accompagnement: {
		page_template: 'contenu_liste_niv_2',
		pagegroup: 'accompagnement_liste',
		pagelabel: 'contenu_liste_niv_2',
		'segment-site': 'contenu_liste',
	},
	accueil: {
		page_template: 'accueil',
		pagegroup: 'accueil',
		pagelabel: 'accueil',
		'segment-site': 'accueil',
	},
	apprentissage: {
		page_template: 'emplois_liste',
		pagegroup: 'apprentissage',
		pagelabel: 'emplois_liste',
		'segment-site': 'offres_d_emploi',
	},
	articles: {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	autres: {
		page_template: 'autres',
		pagegroup: 'autres',
		pagelabel: 'autres',
		'segment-site': 'autres',
	},
	benevolat: {
		page_template: 'contenu_liste_niv_2',
		pagegroup: 'benevolat_liste',
		pagelabel: 'contenu_liste_niv_2',
		'segment-site': 'contenu_liste',
	},
	'benevolat/[id]': {
		page_template: 'contenu_detail_niv_2',
		pagegroup: 'benevolat_detail',
		pagelabel: 'contenu_detail_niv_2',
		'segment-site': 'contenu_detail',
	},
	cgu: {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	confidentialite: {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	'contrat-engagement-jeune': {
		page_template: 'contenu_detail_niv_1',
		pagegroup: 'contrat_engagement_jeune_detail',
		pagelabel: 'contenu_detail_niv_1',
		'segment-site': 'contenu_detail',
	},
	'creer-mon-cv': {
		page_template: 'cv',
		pagegroup: 'cv',
		pagelabel: 'cv',
		'segment-site': 'contenu_liens',
	},
	'decouvrir-les-metiers': {
		page_template: 'contenu_liste_niv_2',
		pagegroup: 'decouvrir_les_metiers_liste',
		pagelabel: 'contenu_liste_niv_2',
		'segment-site': 'contenu_liste',
	},
	'decouvrir-les-metiers/[nomMetier]': {
		page_template: 'contenu_detail_niv_2',
		pagegroup: 'decouvrir_les_metiers_detail',
		pagelabel: 'contenu_detail_niv_2',
		'segment-site': 'contenu_detail',
	},
	emplois: {
		page_template: 'emplois_liste',
		pagegroup: 'emplois',
		pagelabel: 'emplois_liste',
		'segment-site': 'offres_d_emploi',
	},
	'emplois/[id]': {
		page_template: 'emplois_detail',
		pagegroup: 'emplois',
		pagelabel: 'emplois_detail',
		'segment-site': 'offres_d_emploi',
	},
	'emplois/deposer-offre': {
		page_template: 'deposer_offre_emploi_etape_1',
		pagegroup: 'deposer_offre_emploi',
		pagelabel: 'deposer_offre_emploi_etape_1',
		'segment-site': 'funnel_etape_1',
	},
	entreprendre: {
		page_template: 'contenu_detail_niv_1',
		pagegroup: 'entreprendre_detail',
		pagelabel: 'contenu_detail_niv_1',
		'segment-site': 'contenu_detail',
	},
	'espace-jeune': {
		page_template: 'contenu_detail_niv_1',
		pagegroup: 'contrat_engagement_jeune_detail',
		pagelabel: 'contenu_detail_niv_1',
		'segment-site': 'contenu_detail',
	},
	europe: {
		page_template: 'contenu_detail_niv_1',
		pagegroup: 'job_europe',
		pagelabel: 'contenu_detail_niv_1',
		'segment-site': 'contenu_detail',
	},
	evenements: {
		page_template: 'participer_a_un_evenement',
		pagegroup: 'participer_a_un_evenement',
		pagelabel: 'participer_a_un_evenement',
		'segment-site': 'contenu_liens',
	},
	formations: {
		page_template: 'formation',
		pagegroup: 'formation',
		pagelabel: 'formation',
		'segment-site': 'contenu_liens',
	},
	'formations/apprentissage': {
		page_template: 'contenu_liste_niv_2',
		pagegroup: 'formation_liste',
		pagelabel: 'contenu_liste_niv_2',
		'segment-site': 'contenu_liste',
	},
	immersions: {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	'immersions/referencer-mon-entreprise': {
		page_template: 'reference_entreprise_etape_1',
		pagegroup: 'reference_entreprise',
		pagelabel: 'reference_entreprise_etape_1',
		'segment-site': 'funnel_etape_1',
	},
	'je-deviens-mentor': {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'contenu_liens',
	},
	'je-recrute': {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'contenu_liens',
	},
	'je-recrute-afpr-poei': {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	'je-recrute-afpr-poei/inscription': {
		page_template: 'je_recrute_etape_1',
		pagegroup: 'je_recrute',
		pagelabel: 'je_recrute_etape_1',
		'segment-site': 'funnel_etape_1',
	},
	'jobs-etudiants': {
		page_template: 'emplois_liste',
		pagegroup: 'job_etudiants',
		pagelabel: 'emplois_liste',
		'segment-site': 'offres_d_emploi',
	},
	'jobs-etudiants/[id]': {
		page_template: 'emplois_detail',
		pagegroup: 'job_etudiants',
		pagelabel: 'emplois_detail',
		'segment-site': 'offres_d_emploi',
	},
	'les-entreprises-s-engagent': {
		page_template: 'contenu_statique',
		pagegroup: 'engagement_entreprise',
		pagelabel: 'contenu_statique',
		'segment-site': 'contenu_liens',
	},
	'les-entreprises-s-engagent/inscription': {
		page_template: 'engagement_entreprise_etape_1',
		pagegroup: 'engagement_entreprise',
		pagelabel: 'engagement_entreprise_etape_1',
		'segment-site': 'funnel_etape_1',
	},
	'les-entreprises-s-engagent/inscription/confirmation': {
		page_template: 'engagement_entreprise_confirmation',
		pagegroup: 'engagement_entreprise',
		pagelabel: 'engagement_entreprise_confirmation',
		'segment-site': 'funnel_etape_confirmation',
	},
	'les-entreprises-s-engagent/inscription/intermediaire': {
		page_template: 'engagement_entreprise_etape_intermediaire',
		pagegroup: 'engagement_entreprise',
		pagelabel: 'engagement_entreprise_etape_intermediaire',
		'segment-site': 'funnel_etape_intermediaire',
	},
	'logements/aides-logement': {
		page_template: 'contenu_detail_niv_1',
		pagegroup: 'aides_logement_detail',
		pagelabel: 'contenu_detail_niv_1',
		'segment-site': 'contenu_detail',
	},
	'logements/annonces': {
		page_template: 'contenu_liste_niv_2',
		pagegroup: 'logement',
		pagelabel: 'contenu_liste_niv_2',
		'segment-site': 'contenu_liste',
	},
	'logements/annonces/[id]': {
		page_template: 'contenu_detail_niv_2',
		pagegroup: 'logement',
		pagelabel: 'contenu_detail_niv_2',
		'segment-site': 'contenu_detail',
	},
	'mentions-legales': {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	mentorat: {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	'mes-aides': {
		page_template: 'mes_aides_financières',
		pagegroup: 'mes_aides_financières',
		pagelabel: 'mes_aides_financières',
		'segment-site': 'contenu_liens',
	},
	'mesures-employeurs': {
		page_template: 'contenu_liste_niv_2',
		pagegroup: 'mesures_employeurs_liste',
		pagelabel: 'contenu_liste_niv_2',
		'segment-site': 'contenu_liste',
	},
	'mon-espace': {
		page_template: 'mon_espace',
		pagegroup: 'mon_espace',
		pagelabel: 'mon_espace',
		'segment-site': 'contenu_liens',
	},
	'plan-du-site': {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'page_de_base',
	},
	'service-civique': {
		page_template: 'contenu_liste_niv_2',
		pagegroup: 'service_civique_liste',
		pagelabel: 'contenu_liste_niv_2',
		'segment-site': 'contenu_liste',
	},
	'service-civique/[id]': {
		page_template: 'contenu_detail_niv_2',
		pagegroup: 'service_civique_detail',
		pagelabel: 'contenu_detail_niv_2',
		'segment-site': 'contenu_detail',
	},
	stages: {
		page_template: 'emplois_liste',
		pagegroup: 'stages',
		pagelabel: 'emplois_liste',
		'segment-site': 'offres_d_emploi',
	},
	'stages/[id]': {
		page_template: 'emplois_detail',
		pagegroup: 'stages',
		pagelabel: 'emplois_detail',
		'segment-site': 'page_de_base',
	},
	'stages/deposer-offre': {
		page_template: 'contenu_statique',
		pagegroup: 'contenu_statique',
		pagelabel: 'contenu_statique',
		'segment-site': 'funnel_etape_1',
	},
};
