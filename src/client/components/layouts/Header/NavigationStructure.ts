export interface NavigationItemWithChildren {
  label: string;
  legend?: string;
  children: Array<NavigationItem | NavigationItemWithChildren>;
}

export interface NavigationItem {
  label: string;
  link: string;
}

export function isNavigationItem(nav: NavigationItem | NavigationItemWithChildren): nav is NavigationItem {
	return 'link' in nav;
}

const accueil = (): NavigationItem => ({ label: 'Accueil', link: '/' });

const offresNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Emplois', link: '/emplois' },
		{ label: 'Stages', link: '/stages' },
		{ label: 'Contrats d’alternance', link: '/apprentissage' },
		...(process.env.NEXT_PUBLIC_JOB_ETE_FEATURE === '1' ? [{ label: 'Jobs d‘été ', link: '/jobs-ete' }] : []),
		{ label: 'Jobs étudiants', link: '/jobs-etudiants' },
		{ label: 'Expérience en Europe', link: '/europe' },
	],
	label: 'Offres',
});

const orientationNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Formations', link: '/formations' },
		...(process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1' ? [{ label: 'Formations initiales', link: '/formations-initiales' }] : []),
		...(process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE === '1' ? [{ label: 'Formations en apprentissage', link: '/formations/apprentissage' }] : []),
		{ label: 'Découvrir les métiers', link: '/decouvrir-les-metiers' },
		{ label: 'Participer à des évènements', link: '/evenements' },
		...(process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1' ? [{ label: 'Découvrir et trouver sa voie avec l’apprentissage', link: '/choisir-apprentissage' }] : []),
	],
	label: 'Formations et orientation',
});

const accompagnementNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Contrat Engagement Jeune', link: '/contrat-engagement-jeune' },
		{ label: 'Echanger avec un mentor', link: '/mentorat' },
		{ label: 'Trouver une structure d’accompagnement', link: '/accompagnement' },
		{ label: 'Entreprendre : financements, aides et accompagnement', link: '/entreprendre' },
	],
	label: 'Accompagnement',
});

const engagementNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Bénévolat', link: '/benevolat' },
		{ label: 'Service civique', link: '/service-civique' },
	],
	label: 'Engagement',
});

const employeurNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Rejoindre la mobilisation', link: '/les-entreprises-s-engagent' },
		{
			children: [
				{ label: 'Je recrute', link: '/je-recrute' },
				{ label: 'Je deviens mentor', link: '/je-deviens-mentor' },
				{ label: 'Je propose des immersions', link: '/immersions' },
				{ label: 'Je forme les jeunes grâce à l‘emploi', link: '/je-recrute-afpr-poei' },
			], label: 'Recruter et agir pour les jeunes',
		},
		{ label: 'Découvrir les mesures employeurs', link: '/mesures-employeurs' },
		{ label: 'Accéder à mon espace', link: '/mon-espace' },
	],
	label: 'Je suis employeur',
	legend: 'Découvrez des services faits pour vous !',
});

const logementsNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Annonces', link: '/logements/annonces' },
		{ label: 'Aides financières au logement', link: '/logements/aides-logement' },
		{ label: 'Découvrir tous nos conseils', link: '/logements/conseils' },
	],
	label: 'Logement',
});

const aidesEtOutilsNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Simulateur d’aides financières', link: '/mes-aides' },
		{ label: 'Créer son CV personnalisé', link: '/creer-mon-cv' },
	],
	label: 'Aides et outils',
});

export interface NavigationItemList {
  accueil: NavigationItem,
	aidesEtOutilsNav: NavigationItemWithChildren,
  offresNav: NavigationItemWithChildren,
  orientationNav: NavigationItemWithChildren,
  accompagnementNav: NavigationItemWithChildren,
  engagementNav: NavigationItemWithChildren,
  logementsNav: NavigationItemWithChildren
  employeurNav: NavigationItemWithChildren,
}

export const navigationItemList = (): NavigationItemList => ({
	accompagnementNav: accompagnementNav(),
	accueil: accueil(),
	aidesEtOutilsNav: aidesEtOutilsNav(),
	employeurNav: employeurNav(),
	engagementNav: engagementNav(),
	logementsNav: logementsNav(),
	offresNav: offresNav(),
	orientationNav: orientationNav(),
});
