const ALL_MODE_REDIRECT = [
	{
		destination: '/decouvrir-les-metiers',
		permanent: true,
		source: '/trouver-mon-metier',
	},
	{
		destination: '/decouvrir-les-metiers',
		permanent: true,
		source: '/trouver-mon-metier',
	},
	{
		destination: '/logements/annonces',
		permanent: true,
		source: '/logements',
	},
	{
		destination: '/logements/aides-logement',
		permanent: true,
		source: '/logements/articles',
	},
	{
		destination: '/articles/16-18-obligation-de-formation',
		permanent: true,
		source: '/16-18-obligation-de-formation',
	},
	{
		destination: '/articles/16-18-obligation-de-formation',
		permanent: true,
		source: '/promo-16-18-afpa',
	},
	{
		destination: '/europe',
		permanent: true,
		source: '/emploi-europe',
	},
	{
		destination: '/articles/mission-locale',
		permanent: true,
		source: '/mission-locale',
	},
	{
		destination: '/articles/faire-un-service-civique',
		permanent: true,
		source: '/faire-un-service-civique',
	},
	{
		destination: '/mesures-employeurs',
		permanent: true,
		source: '/je-recrute/articles',
	},
	{
		destination: '/mon-espace',
		permanent: true,
		source: '/les-entreprises-s-engagent/:nom*/espace-securise/mon-engagement',
	},
	{
		destination: '/mon-espace',
		permanent: true,
		source: '/les-entreprises-s-engagent/:nom*/espace-securise/ma-page-entreprise',
	},
	{
		destination: '/mon-espace',
		permanent: true,
		source: '/les-entreprises-s-engagent/:nom*/espace-securise/mon-kit-communication',
	},
	{
		destination: '/mon-espace',
		permanent: true,
		source: '/les-entreprises-s-engagent/:nom*/espace-securise/offres-emploi',
	},
	{
		destination: '/immersions',
		permanent: true,
		source: '/entreprises/immersion',
	},
	{
		destination: '/les-entreprises-s-engagent/inscription',
		permanent: true,
		source: '/mentorat/inscription',
	},
	{
		destination: '/immersions',
		permanent: true,
		source: '/entreprises/immersion',
	},
	{
		destination: '/les-entreprises-s-engagent',
		permanent: true,
		source: '/entreprises/:nom*',
	},
	{
		destination: '/emplois/deposer-offre',
		permanent: true,
		source: '/je-recrute/deposer-une-offre-d-emploi',
	},
	{
		destination: '/je-recrute',
		permanent: true,
		source: '/stages/deposer-offre',
	},
];
module.exports = { ALL_MODE_REDIRECT };
