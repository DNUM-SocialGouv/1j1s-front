export type NavigationItem = NavigationItemWithChildren | NavigationItemLeaf

export interface NavigationItemWithChildren {
	label: string
	children: NavigationItem[]
}

export interface NavigationItemLeaf {
	label: string
	link: string
}

const accueil: NavigationItemLeaf = { label: 'Accueil', link: '/' };

const offresNav: NavigationItemWithChildren = {
  children: [
    { label: 'Emplois', link: '/emplois' },
    { label: 'Stages', link: '/stages' },
    { label: 'Contrats d’alternance', link: '/apprentissage' },
    { label: 'Jobs étudiants', link: '/jobs-etudiants' },
  ],
  label: 'Offres',
};

const orientationNav: NavigationItemWithChildren = {
  children: [
    { label: 'Formations', link: '/formations' },
    { label: 'Découvrir les métiers', link: '/decouvrir-les-metiers' },
  ],
  label: 'Formations et orientation',
};

const accompagnementNav: NavigationItemWithChildren = {
  children: [
    { label: 'Contrat Engagement Jeune', link: '/contrat-engagement-jeune' },
    { label: 'Mes aides financières', link: '/mes-aides' },
    { label: 'Mentorat', link: '/mentorat' },
    { label: 'CV personnalisé', link: '/creer-mon-cv' },
    { label: 'Les mesures jeunes', link: '/mesures-jeunes' },
  ],
  label: 'Aides et accompagnement',
};

const engagementNav: NavigationItemWithChildren = {
  children: [
    { label: 'Service civique', link: '/service-civique' },
    { label: 'Bénévolat', link: '/benevolat' },
  ],
  label: 'Engagement',
};

const employeurNav: NavigationItemWithChildren = {
  children: [
    { label: 'Je deviens mentor', link: '/je-deviens-mentor' },
    { label: 'Rejoindre la mobilisation', link: '/les-entreprises-s-engagent' },
    { label: 'Je propose des immersions', link: '/immersions' },
    { label: 'Les mesures employeurs', link: '/mesures-employeurs' },
    { label: 'Accéder à mon espace', link: '/mon-espace' },
    { label: 'Je forme les jeunes grâce à l\'emploi', link: '/rejoindre-mobilisation-poe' },
  ],
  label: 'Je suis employeur',
};

export const navigationItemList: NavigationItem[] = [
  accueil,
  offresNav,
  orientationNav,
  accompagnementNav,
  engagementNav,
  employeurNav,
];
