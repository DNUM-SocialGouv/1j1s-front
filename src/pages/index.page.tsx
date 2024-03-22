import classNames from 'classnames';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkCard } from '~/client/components/ui/Card/Link/LinkCard';
import { HeroPrimaryText, HeroSecondaryText, HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/index.analytics';
import styles from '~/pages/index.module.scss';


interface CardContent {
	children: React.ReactElement
	imageUrl: string
	link: string
	linkLabel: string
	title: string
}

export default function Accueil() {
	useAnalytics(analytics);

	const isJobEteCardVisible = process.env.NEXT_PUBLIC_JOB_ETE_FEATURE === '1';
	const isFormationsInitalesVisible = process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1';
	const isStages3eEt2deVisible = process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE === '1';
	const is1Jeune1PermisVisible = process.env.NEXT_PUBLIC_1JEUNE1PERMIS_FEATURE === '1';

	const isBanniereStagesSecondeVisible = process.env.NEXT_PUBLIC_STAGES_SECONDE_FEATURE === '1';
	const isBanniereStagesSecondePourCampagneDu25Mars = process.env.NEXT_PUBLIC_STAGES_SECONDE_RECHERCHE_FEATURE === '1';
	const urlDepotOffreStagesSeconde = process.env.NEXT_PUBLIC_DEPOT_STAGES_SECONDE_URL ?? '';
	const urlHomePageStageDeSeconde = process.env.NEXT_PUBLIC_STAGES_SECONDE_HOMEPAGE_URL ?? '';

	const offreCardListContent: CardContent[] = [
		{
			children: <p>Plus de 300 000 offres d’emplois sélectionnées spécialement pour vous</p>,
			imageUrl: '/images/emploi.webp',
			link: '/emplois',
			linkLabel: 'Voir les offres',
			title: 'Emplois',
		},
		{
			children: <p>Plus de 20 000 offres de stages sélectionnées spécialement pour vous</p>,
			imageUrl: '/images/stage.webp',
			link: '/stages',
			linkLabel: 'Voir les offres',
			title: 'Stages d’études',
		},
		isStages3eEt2deVisible ? {
			children: <p>Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3e et 2de</p>,
			imageUrl: '/images/stages-3eme/stages-3eme.webp',
			link: '/stages-3e-et-2de',
			linkLabel: 'Voir les offres',
			title: 'Stages de 3e et 2de',
		} : undefined,
		{
			children: <p>Trouvez votre entreprise pour concrétiser vos projets d’alternance</p>,
			imageUrl: '/images/alternance.webp',
			link: '/apprentissage',
			linkLabel: 'Voir les offres',
			title: 'Contrats d‘alternance',
		},
		isJobEteCardVisible ?
			{
				children: <p>Des milliers d‘offres de jobs d‘été sélectionnées pour vous (durée maximale de 2 mois)</p>,
				imageUrl: '/images/jobs-ete.webp',
				link: '/jobs-ete',
				linkLabel: 'Voir les offres',
				title: 'Jobs d‘été',
			} : undefined,
		{
			children: <p>Plus de 10 000 offres d’emploi compatibles avec vos études (moins de 15h par semaine)</p>,
			imageUrl: '/images/jobs-étudiant.webp',
			link: '/jobs-etudiants',
			linkLabel: 'Voir les offres',
			title: 'Jobs étudiants',
		},
		{
			children: <p>Retrouvez des offres d‘emploi, des stages, des VIE | VIA et des aides financières pour une expérience
				en Europe</p>,
			imageUrl: '/images/europe.webp',
			link: '/europe',
			linkLabel: 'Voir les offres',
			title: 'Expérience en Europe',
		},
	].filter<CardContent>((cardContent?: CardContent): cardContent is CardContent => cardContent !== undefined);

	const formationEtOrientationCardListContent = [
		isFormationsInitalesVisible ? {
			children: <p>Plus de 6 000 formations accessibles pour réaliser votre projet et trouver un emploi</p>,
			imageUrl: '/images/formations-initiales.webp',
			link: '/formations-initiales',
			linkLabel: 'En savoir plus',
			title: 'Formations initiales',
		} : undefined,
		{
			children: <p>Plus de 40 000 formations accessibles pour réaliser votre projet et trouver un emploi</p>,
			imageUrl: '/images/formations-apprentissage.webp',
			link: '/formations/apprentissage',
			linkLabel: 'En savoir plus',
			title: 'Formations en apprentissage',
		},
		{
			children: <p>Parcourez plus de 700 fiches métiers et trouvez celui qui vous correspond</p>,
			imageUrl: '/images/métiers.webp',
			link: '/decouvrir-les-metiers',
			linkLabel: 'En savoir plus',
			title: 'Découvrir les métiers',
		},
		{
			children: <p>Des centaines d‘événements de recrutement pour tous les jeunes, partout en France</p>,
			imageUrl: '/images/évènements.webp',
			link: '/evenements',
			linkLabel: 'En savoir plus',
			title: 'Participer à des évènements',
		},
	].filter<CardContent>((cardContent?: CardContent): cardContent is CardContent => cardContent !== undefined);

	const engagementEtBenevolatCardListContent = [
		{
			children: <p>Réalisez une mission d’engagement civique courte auprès d’organisations publiques ou
				associatives</p>,
			imageUrl: '/images/bénévolat.webp',
			link: '/benevolat',
			linkLabel: 'Voir les offres',
			title: 'Bénévolat',
		},
		{
			children: <p>Réalisez une mission citoyenne de 6 à 12 mois donnant le droit à une indemnisation</p>,
			imageUrl: '/images/service-civique.webp',
			link: '/service-civique',
			linkLabel: 'Voir les offres',
			title: 'Service civique',
		},
	];

	const logementCardListContent = [
		{
			children: <p>Trouvez votre logement étudiant ou votre location jeune actif partout en France</p>,
			imageUrl: '/images/logement-annonces.webp',
			link: '/logements/annonces',
			linkLabel: 'Voir les offres',
			title: 'Annonces',
		},
		{
			children: <p>Découvrez les aides auxquelles vous avez droit pour votre logement</p>,
			imageUrl: '/images/logement-aides-financieres.webp',
			link: '/logements/aides-logement',
			linkLabel: 'Voir les aides',
			title: 'Aides financières au logement',
		},
		{
			children: <p>Découvrez tous nos conseils sur les logements : dossier locatif, garants...</p>,
			imageUrl: '/images/logement-conseils.webp',
			link: '/logements/conseils',
			linkLabel: 'Voir les conseils sur le logement',
			title: 'Découvrir tous nos conseils',
		},
	];

	const accompagnementCardListContent = [
		{
			children: <p>Un parcours personnalisé pour vous aider à définir votre projet et trouver un emploi</p>,
			imageUrl: '/images/cej.webp',
			link: '/contrat-engagement-jeune',
			linkLabel: 'Découvrir le CEJ',
			title: 'Contrat d’Engagement Jeune (CEJ)',
		},
		{
			children: <p>Une association vous recontacte pour vous proposer le programme de mentorat adapté à vos besoins</p>,
			imageUrl: '/images/mentorat.webp',
			link: '/mentorat',
			linkLabel: 'En savoir plus',
			title: 'Echanger avec un mentor',
		},
		{
			children: <p>Retrouvez les structures proches de chez vous pouvant vous aider dans vos démarches ou votre
				parcours</p>,
			imageUrl: '/images/accompagnement-structure.webp',
			link: '/accompagnement',
			linkLabel: 'Découvrir mes aides',
			title: 'Trouver une structure d’accompagnement',
		},
		{
			children: <p>Retrouvez les conseils, outils et structures d’accompagnement pour vous aider à entreprendre</p>,
			imageUrl: '/images/entrepreneurs.webp',
			link: '/entreprendre',
			linkLabel: 'En savoir plus',
			title: 'Entreprendre : financements, aides et accompagnement',
		},
	];

	const aideEtOutilCardListContent = [
		{
			children: <p>Avec La Boussole, trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi,
				culture, etc.</p>,
			imageUrl: '/images/aides-financières.webp',
			link: '/mes-aides',
			linkLabel: 'Découvrir mes aides',
			title: 'Simulateur d’aides financières',
		},
		is1Jeune1PermisVisible ? {
			children: <p>Découvrez les aides auxquelles vous avez droit pour passer votre permis de conduire</p>,
			imageUrl: '/images/1jeune1permis.webp',
			link: '/1jeune1permis',
			linkLabel: 'En savoir plus',
			title: 'Aides au permis de conduire',
		} : undefined,
		{
			children: <p>Mettez en avant vos compétences dans un CV, même si vous pensez ne pas avoir d‘expérience</p>,
			imageUrl: '/images/créer-son-cv.webp',
			link: '/creer-mon-cv',
			linkLabel: 'En savoir plus',
			title: 'Je crée mon CV personnalisé',
		},
	].filter<CardContent>((cardContent?: CardContent): cardContent is CardContent => cardContent !== undefined);


	const getCardList = (cardListContent: CardContent[]) => {
		return cardListContent.map((props, index) => (
			<LinkCard className={styles.card} key={index} {...props} />
		));
	};

	return (
		<>
			<Head
				title="Toutes les solutions pour l'avenir des jeunes | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<HeroWithIllustration image="/images/portraits-verticaux.webp">
					<h1><HeroPrimaryText className={styles.heroTitle}>À chacun sa solution.</HeroPrimaryText></h1>
					<HeroSecondaryText>
						Vous avez entre 15 et 30 ans ? Découvrez toutes les solutions pour votre avenir !
					</HeroSecondaryText>
					<Link href={'/espace-jeune'} appearance={'asSecondaryButton'} className={styles.heroButton}>
						<span className={styles.heroButtonLargeScreenText}>Découvrir les actualités et services jeunes</span>
						<span className={styles.heroButtonSmallMediumScreenText}>Actualités et services jeunes</span>
						<Link.Icon/>
					</Link>
				</HeroWithIllustration>

				{isBanniereStagesSecondeVisible
				&& <HeroWithIllustration image="/images/stages-seconde/banniere-stages-seconde.webp"
																 className={styles.stageSecondeBanner}>
					{isBanniereStagesSecondePourCampagneDu25Mars ?
						<>
							<HeroPrimaryText className={styles.heroTitle}>
								Un stage du 17 au 28 juin 2024.
							</HeroPrimaryText>
							<HeroSecondaryText>
								Pour permettre aux élèves de seconde générale et technologique de diversifier leur connaissance des métiers.
							</HeroSecondaryText>
							<Link href={urlHomePageStageDeSeconde} appearance={'asSecondaryButton'} className={styles.heroButton}>
								Proposer un stage ou candidater
								<Link.Icon/>
							</Link>
						</> :
						<>
							<HeroPrimaryText className={styles.heroTitle}>
									Accueillez des élèves en stages de seconde générale et technologique.
							</HeroPrimaryText>
							<HeroSecondaryText>
								Inspirez, transmettez, faites découvrir vos métiers.
							</HeroSecondaryText>
							<Link href={urlDepotOffreStagesSeconde} appearance={'asSecondaryButton'} className={styles.heroButton}>
								Déposer votre offre de stage
								<Link.Icon/>
							</Link>
						</>
					}
				</HeroWithIllustration>
				}

				<section className={classNames(styles.section, styles.sectionNosOffres)}>
					<h2 id="offres" className={styles.sectionHeader}>
						<Icon name="brief-case" className={styles.sectionNosOffresHeaderIcon}/>
				Offres
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={getCardList(offreCardListContent)}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les offres d‘emplois'}
							seeLessAriaLabel={'Voir moins de résultats sur les offres d‘emplois'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionFormationsOrientation)}>
					<h2 id="formation" className={styles.sectionHeader}>
						<Icon name={'book'} className={styles.sectionFormationsOrientationHeaderIcon}/>
				Formations et orientation
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={getCardList(formationEtOrientationCardListContent)}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les formations et orientation'}
							seeLessAriaLabel={'Voir moins de résultats sur les formations et orientation'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionEngagementBénévolat)}>
					<h2 id="engagement-benevolat" className={styles.sectionHeader}>
						<Icon name="trophy" className={styles.sectionEngagementBénévolatHeaderIcon}/>
				Engagement
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={getCardList(engagementEtBenevolatCardListContent)}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les engagements et bénévolats'}
							seeLessAriaLabel={'Voir moins de résultats sur les engagements et bénévolats'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionLogement)}>
					<h2 id="logement" className={styles.sectionHeader}>
						<Icon name={'home'} className={styles.sectionLogementHeaderIcon}/>
				Logement
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={getCardList(logementCardListContent)}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les logements'}
							seeLessAriaLabel={'Voir moins de résultats sur les logements'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionAidesOrientationAccompagnement)}>
					<h2 id="aides-orientation-accompagnement" className={styles.sectionHeader}>
						<Icon name={'compass'} className={styles.sectionAidesOrientationAccompagnementHeaderIcon}/>
				Accompagnement
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={getCardList(accompagnementCardListContent)}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les aides et accompagnements'}
							seeLessAriaLabel={'Voir moins de résultats sur les aides et accompagnements'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionAidesEtOutils)}>
					<h2 id="aides-et-outils" className={styles.sectionHeader}>
						<Icon name={'mark-pen'} className={styles.sectionAidesEtOutilsHeaderIcon}/>
				Aides et outils
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={getCardList(aideEtOutilCardListContent)}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les aides et outils'}
							seeLessAriaLabel={'Voir moins de résultats sur les aides et outils'}/>
					</Container>
				</section>
			</main>
		</>
	);
};
