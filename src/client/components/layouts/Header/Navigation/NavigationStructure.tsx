import { ReactNode } from 'react';

export interface NavigationItemWithChildren {
	label: string;
	legend?: string;
	children: Array<NavigationItem | NavigationItemWithChildren>;
}

export interface NavigationItem {
	label: string | ReactNode;
	link: string;
}

export function isNavigationItem(nav: NavigationItem | NavigationItemWithChildren): nav is NavigationItem {
	return 'link' in nav;
}
const accueil = (): NavigationItem => ({ label: 'Accueil', link: '/' });

const offresNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Emplois', link: '/emplois' },
		...(process.env.NEXT_PUBLIC_STAGES_SECONDE_RECHERCHE_FEATURE === '1' && process.env.NEXT_PUBLIC_STAGES_SECONDE_URL ? [{
			label: 'Stage de 2de GT',
			link: process.env.NEXT_PUBLIC_STAGES_SECONDE_URL,
		}] : []),
		{ label: 'Stages d’études', link: '/stages' },
		...(process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE === '1' ? [{
			label: 'Stages de 3e et 2de',
			link: '/stages-3e-et-2de',
		}] : []),
		{ label: 'Contrats d’alternance', link: '/apprentissage' },
		...(process.env.NEXT_PUBLIC_JOB_ETE_FEATURE === '1' ? [{ label: 'Jobs d‘été ', link: '/jobs-ete' }] : []),
		{ label: 'Jobs étudiants', link: '/jobs-etudiants' },
		...(process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE === '1' ? [{
			label: 'Emplois en Europe ',
			link: '/emplois-europe',
		}] : []),
	],
	label: 'Offres',
});

const orientationNav = (): NavigationItemWithChildren => ({
	children: [
		...(process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1' ? [{
			label: 'Formations initiales',
			link: '/formations-initiales',
		}] : []),
		...(process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE === '1' ? [{
			label: 'Formations en apprentissage',
			link: '/formations/apprentissage',
		}] : []),
		{ label: 'Découvrir les métiers', link: '/decouvrir-les-metiers' },
		{ label: 'Participer à des évènements', link: '/evenements' },
		{ label: 'Découvrir et trouver sa voie avec l’apprentissage', link: '/choisir-apprentissage' },
	],
	label: 'Formations et orientation',
});

const accompagnementNav = (): NavigationItemWithChildren => ({
	children: [
		{ label: 'Contrat Engagement Jeune', link: '/contrat-engagement-jeune' },
		{ label: 'Echanger avec un mentor', link: '/mentorat' },
		{ label: 'Trouver une structure d’accompagnement', link: '/accompagnement' },
		{ label: 'Entreprendre : financements, aides et accompagnement', link: '/entreprendre' },
		{ label: 'Expérience en Europe', link: '/experience-europe' },
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
				...(process.env.NEXT_PUBLIC_CAMPAGNE_ALTERNANCE_FEATURE === '1' ? [{ label: 'Découvrir et trouver sa voie grâce à l’apprentissage', link: '/choisir-apprentissage' }] : []),
			],
			label: 'Recruter et agir pour les jeunes',
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
		...(process.env.NEXT_PUBLIC_1JEUNE1PERMIS_FEATURE === '1' ? [{
			label: 'Aides au permis de conduire',
			link: '/1jeune1permis',
		}] : []),
		{ label: 'Créer son CV personnalisé', link: '/creer-mon-cv' },
	],
	label: 'Aides et outils',
});

export type NavigationItemList = Record<string, NavigationItem | NavigationItemWithChildren>;

type SpecificNavigationItemList = {
	accueil: NavigationItem,
	aidesEtOutilsNav: NavigationItemWithChildren,
	offresNav: NavigationItemWithChildren,
	orientationNav: NavigationItemWithChildren,
	accompagnementNav: NavigationItemWithChildren,
	engagementNav: NavigationItemWithChildren,
	logementsNav: NavigationItemWithChildren
	employeurNav: NavigationItemWithChildren,
}

export const navigationItemList = (): SpecificNavigationItemList => ({
	accompagnementNav: accompagnementNav(),
	accueil: accueil(),
	aidesEtOutilsNav: aidesEtOutilsNav(),
	employeurNav: employeurNav(),
	engagementNav: engagementNav(),
	logementsNav: logementsNav(),
	offresNav: offresNav(),
	orientationNav: orientationNav(),
});
