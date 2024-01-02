import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export function aStrapiSingleRelation<T>(data: T): { [Key in keyof Strapi.SingleRelation<T>]: NonNullable<Strapi.SingleRelation<T>[Key]> } {
	return {
		data: {
			attributes: data,
			id: 1,
		},
	};
}

export function aStrapiCollectionRelation<T>(data: T[]): Strapi.CollectionRelation<T> {
	return {
		data: data.map((attribute: T, index: number) => ({
			attributes: attribute,
			id: index + 1,
		})),
	};
}

export function aStrapiSingleType<T>(data: T): Strapi.SingleType<T> {
	return {
		...aStrapiSingleRelation<T>(data),
		meta: {
			pagination: {
				page: 1,
				pageCount: 1,
				pageSize: 25,
				total: 1,
			},
		},
	};
}

export function aStrapiCollectionType<T>(data: T[], meta?: Partial<Strapi.Meta>): Strapi.CollectionType<T> {
	return {
		...aStrapiCollectionRelation(data),
		meta: {
			pagination: {
				page: 1,
				pageCount: 1,
				pageSize: 25,
				total: 1,
			},
			...meta,
		},
	};
}

export function aStrapiImage(override?: Strapi.Image): Strapi.Image {
	return {
		alternativeText: 'text',
		caption: 'string',
		createdAt: 'string',
		ext: 'string',
		formats: {
			large: {
				ext: 'string',
				hash: 'string',
				height: 100,
				mime: 'string',
				name: 'string',
				path: 'string',
				size: 100,
				url: 'string',
				width: 100,
			},
		},
		hash: 'string',
		height: 100,
		mime: 'string',
		name: 'string',
		previewUrl: 'string',
		provider: 'string',
		provider_metadata: 'string',
		size: 100,
		updatedAt: 'string',
		url: 'https://animage.jpg',
		width: 100,
		...override,
	};
}

export function aStrapiArticle(): Strapi.CollectionType.Article {
	return {
		banniere: aStrapiSingleRelation(aStrapiImage()),
		contenu: 'Avec le Parcours Emploi Compétences (PEC), vous permettez à des personnes éloignées de l’emploi de s’insérer professionnellement et vous bénéficiez d’une aide de l’État.',
		slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Aide à l’embauche d’un jeune en Parcours Emploi Compétences (PEC Jeunes) dans le secteur non marchand',
	};
}

export function aStrapiLesMesuresEmployeurs(): Strapi.SingleType.LesMesuresEmployeurs {
	return {
		dispositifs: [{
			article: aStrapiSingleRelation(aStrapiArticle()),
			banniere: aStrapiSingleRelation(aStrapiImage()),
			contenu: 'Un beau contenu de carte',
			pourQui: 'Ceci est pour tous ceux à qui ça s‘adresse',
			titre: 'Un titre de carte',
			url: 'https://some.example.com/1',
		}],
	};
}


export function aStrapiArticleSlugList(): Strapi.CollectionType<Pick<Strapi.CollectionType.Article, 'slug'>> {
	return {
		data: [
			{
				attributes: { slug: 'l-aide-exceptionnelle-pour-l-apprentissage-l-atout-qu-il-faut-pour-vos-candidatures' },
				id: 15,
			}, {
				attributes: { slug: 'pec-jeunes-pour-developper-des-competences-transferables' },
				id: 16,
			}, {
				attributes: { slug: 'faire-un-service-civique' },
				id: 1,
			}, {
				attributes: { slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand' },
				id: 19,
			}, {
				attributes: { slug: 'aide-a-l-embauche-d-un-jeune-en-contrat-initiative-emploi-jeunes-cie-jeunes-dans-le-secteur-marchand' },
				id: 20,
			}, {
				attributes: { slug: 'prime-pour-le-recrutement-d-un-jeune-en-contrat-d-apprentissage' },
				id: 21,
			}, {
				attributes: { slug: 'prime-pour-l-accueil-d-un-jeune-en-volontariat-territorial-en-entreprise-vte-vert' },
				id: 23,
			}, {
				attributes: { slug: 'financement-du-recrutement-d-un-jeune-sur-un-poste-d-animation-locale-en-association' },
				id: 24,
			}, {
				attributes: { slug: 'prime-pour-le-recrutement-d-un-jeune-en-contrat-de-professionnalisation' },
				id: 22,
			}, {
				attributes: { slug: 'service-civique' },
				id: 26,
			}, {
				attributes: { slug: 'choisir-un-secteur-qui-recrute-16-000-formations-creees-dans-le-secteur-de-la-sante-pour-devenir-infirimier-e-ou-aide-soignant-e' },
				id: 28,
			}, {
				attributes: { slug: 'votre-emploi-dans-le-domaine-sportif-c-est-grace-a-l-ans' },
				id: 27,
			}, {
				attributes: { slug: 'l-e2c-un-accompagnement-sur-mesure-vers-une-insertion-durable' },
				id: 33,
			}, {
				attributes: { slug: 'grace-au-dispositif-sesame-accedez-aux-metiers-du-sport-de-l-animation' },
				id: 34,
			}, {
				attributes: { slug: 'la-promo-16-18-afpa' },
				id: 37,
			}, {
				attributes: { slug: 'le-contrat-d-initiative-emploi-jeunes-cie-jeunes-votre-passeport-vers-l-emploi' },
				id: 38,
			}, {
				attributes: { slug: 'le-parcours-d-accompagnement-contractualise-vers-l-emploi-et-l-autonomie-pacea-veritable-levier-dans-votre-insertion-sociale-et-professionnelle' },
				id: 40,
			}, {
				attributes: { slug: 'accedez-a-une-formation-pour-progresser-rapidement-dans-le-numerique' },
				id: 39,
			}, {
				attributes: { slug: 'des-places-supplementaires-pour-vous-en-cap-et-bts' },
				id: 30,
			}, {
				attributes: { slug: 'dans-le-centre-epide-de-votre-choix-beneficiez-d-une-formation-individualisee-pour-acceder-a-l-emploi-ou-a-une-formation-qualifiante' },
				id: 31,
			}, {
				attributes: { slug: 'boostez-votre-recherche-d-emploi-grace-a-l-accompagnement-intensif-jeunes' },
				id: 32,
			}, {
				attributes: { slug: '16-18-obligation-de-formation' },
				id: 2,
			}, {
				attributes: { slug: 'mission-locale' },
				id: 48,
			}, {
				attributes: { slug: 'comment-constituer-un-dossier-locatif' },
				id: 82,
			},
		],
		meta: {
			pagination: {
				page: 1,
				pageCount: 1,
				pageSize: 27,
				total: 27,
			},
		},
	};
}

export function anEntrepriseRejoindreLaMobilisationStrapi(): Strapi.CollectionType.Entreprise {
	return {
		code_postal: '75015',
		email: 'machin.chose@bidule.com',
		erreur: 'annotation',
		nom: 'Chose',
		nom_societe: 'Bidule co.',
		prenom: 'Machin',
		secteur: 'other-services',
		siret: '12345678901114',
		taille: 'medium',
		telephone: '+33123456789',
		travail: 'Chef',
		ville: 'Paris (15e arrondissement)',
	};
}

export function aStrapiArticleCollectionType(): Strapi.CollectionType<Strapi.CollectionType.Article> {
	return aStrapiCollectionType([aStrapiArticle()]);
}

export function anActualiteFixture(): Strapi.SingleType<Strapi.SingleType.ListeActualités> {
	return aStrapiSingleType({
		listeActualites: [{
			article: aStrapiSingleRelation(aStrapiArticle()),
			banniere: aStrapiSingleRelation(aStrapiImage()),
			contenu: 'Contenu',
			titre: 'Actualité 1',
			url: 'https://www.google.com',
		}],
	});
}

export function aStrapiMesureJeune(override?: Partial<Strapi.SingleType.LesMesuresJeunes.MesureJeune>): Strapi.SingleType.LesMesuresJeunes.MesureJeune {
	return {
		article: aStrapiSingleRelation(aStrapiArticle()),
		banniere: aStrapiSingleRelation(aStrapiImage()),
		contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		pourQui: 'pour les 12 à 18mois',
		titre: 'Un titre de carte',
		url: 'Une belle url de carte',
		...override,
	};
}

export function aStrapiLesMesuresJeunesSingleType(): Strapi.SingleType<Strapi.SingleType.LesMesuresJeunes> {
	return aStrapiSingleType({
		accompagnement: [aStrapiMesureJeune({
			titre: 'Une formation en centre EPIDE',
		})],
		aidesFinancieres: [aStrapiMesureJeune({
			article: undefined,
			titre: 'Des aides pour financer son permis de conduire',
		})],
		orienterFormer: [aStrapiMesureJeune({
			titre: 'Les Junior Entreprises',
		})],
		vieProfessionnelle: [aStrapiMesureJeune({
			titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
		})],
	});
}

export function aStrapiVideosCampagneApprentissage(): Strapi.CollectionType<Strapi.CollectionType.VideoCampagneApprentissage> {
	return aStrapiCollectionType([{
		Titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
		Transcription: '[transcription]',
		Url: 'https://www.youtube.com/watch?v=V3cxW3ZRV-I',
	}]);
}

