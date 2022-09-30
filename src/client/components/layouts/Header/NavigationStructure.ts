export interface NavigationItemWithChildren {
	label: string
	children: NavigationItem[]
}

export interface NavigationItem {
	label: string
	link: string
}

const accueil: NavigationItem = { label: 'Accueil', link: '/' };

const offresNav: NavigationItemWithChildren = {
  children: [
    { label: 'Emplois', link: '/emplois' },
    { label: 'Stages', link: '/stages' },
    { label: 'Contrats d’alternance', link: '/apprentissage' },
    { label: 'Jobs étudiants', link: '/jobs-etudiants' },
    { label: 'Emplois en Europe', link: '/europe' },
  ],
  label: 'Offres',
};

const orientationNav: NavigationItemWithChildren = {
  children: [
    { label: 'Formations', link: '/formations' },
    { label: 'Découvrir les métiers', link: '/decouvrir-les-metiers' },
    { label: 'Événements', link: '/evenements' },
  ],
  label: 'Formations et orientation',
};

const accompagnementNav: NavigationItemWithChildren = {
  children: [
    { label: 'Contrat Engagement Jeune', link: '/contrat-engagement-jeune' },
    { label: 'Mes aides financières', link: '/mes-aides' },
    { label: 'Mentorat', link: '/mentorat' },
    { label: 'Accompagnement', link: '/accompagnement' },
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
    { label: 'Recruter et agir pour les jeunes', link: '/je-recrute' },
    { label: 'Je forme les jeunes grâce à l\'emploi', link: '/rejoindre-mobilisation-poe' },
  ],
  label: 'Je suis employeur',
};

export interface NavigationItemList {
  accueil: NavigationItem,
  offresNav: NavigationItemWithChildren,
  orientationNav: NavigationItemWithChildren,
  accompagnementNav: NavigationItemWithChildren,
  engagementNav: NavigationItemWithChildren,
  employeurNav: NavigationItemWithChildren,
}

export const navigationItemList: NavigationItemList = {
  accompagnementNav,
  accueil,
  employeurNav,
  engagementNav,
  offresNav,
  orientationNav,
};
