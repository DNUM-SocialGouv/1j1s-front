import classNames from 'classnames';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkCard } from '~/client/components/ui/Card/Link/LinkCard';
import {
	HeroPrimaryText,
	HeroSecondaryText,
	HeroWithIllustration,
} from '~/client/components/ui/Hero/Hero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useAnalytics from '~/client/hooks/useAnalytics';
import styles from '~/pages/index.module.scss';

export default function Accueil() {
	useAnalytics('accueil');

	const nosOffresCardList = [
		<LinkCard
			className={styles.card}
			key={1}
			imageUrl="/images/emploi.webp"
			link="/emplois"
			linkLabel="Voir les offres"
			title="Emplois">
			<p>Plus de 300 000 offres d’emplois sélectionnées spécialement pour vous.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={2}
			imageUrl="/images/stage.webp"
			link="/stages"
			linkLabel="Voir les offres"
			title="Stages">
			<p>Plus de 20 000 offres de stages sélectionnées spécialement pour vous.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={3}
			imageUrl="/images/alternance.webp"
			link="/apprentissage"
			linkLabel="Voir les offres"
			title="Contrats d‘alternance">
			<p>Trouvez votre entreprise pour concrétiser vos projets d’alternance.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={4}
			imageUrl="/images/jobs-étudiant.webp"
			link="/jobs-etudiants"
			linkLabel="Voir les offres"
			title="Jobs étudiants">
			<p>Des milliers d‘offres d‘emplois pour les étudiants</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={5}
			imageUrl="/images/europe.webp"
			link="/europe"
			linkLabel="Voir les offres"
			title="Une expérience en Europe">
			<p>Retrouvez des offres d‘emploi, des stages, des VIE | VIA et des aides financières pour une expérience en Europe.</p>
		</LinkCard>,
	];
	const formationEtOrientationCardList = [
		<LinkCard
			className={styles.card}
			key={1}
			imageUrl="/images/formations-initiales.webp"
			link="/formations"
			linkLabel="En savoir plus"
			title="Formations">
			<p>Plus de 330 000 formations accessibles pour réaliser votre projet et trouver un emploi.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={2}
			imageUrl="/images/métiers.webp"
			link="/decouvrir-les-metiers"
			linkLabel="En savoir plus"
			title="Je découvre mon futur métier">
			<p>Parcourez plus de 700 fiches métiers et trouvez celui qui vous correspond.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={3}
			imageUrl="/images/évènements.webp"
			link="/evenements"
			linkLabel="En savoir plus"
			title="Je participe à un évènement">
			<p>Des centaines d‘événements de recrutement pour tous les jeunes, partout en France.</p>
		</LinkCard>,
	];
	const aidesEtAccompagnementCardList = [
		<LinkCard
			className={styles.card}
			key={1}
			imageUrl="/images/cej.webp"
			link="/contrat-engagement-jeune"
			linkLabel="Découvrir le CEJ"
			title="Je découvre le Contrat d’Engagement Jeune (CEJ)">
			<p>Un parcours personnalisé pour vous aider à définir votre projet et trouver un emploi.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={2}
			imageUrl="/images/aides-financières.webp"
			link="/mes-aides"
			linkLabel="Découvrir mes aides"
			title="J‘accède à mes aides">
			<p>Trouvez les aides auxquelles vous avez droit en moins de 5 minutes : logement, santé, mobilité, emploi, culture, etc.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={3}
			imageUrl="/images/aides-au-logement.webp"
			link="/logements/aides-logement"
			linkLabel="Découvrir mes aides"
			title="Je découvre les aides au logement">
			<p>Découvrez les aides au logement auxquels vous avez le droit et recevez des conseils pour constituer votre dossier.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={4}
			imageUrl="/images/mentorat.webp"
			link="/mentorat"
			linkLabel="En savoir plus"
			title="Je souhaite échanger avec un mentor">
			<p>Une association vous recontacte pour vous proposer le programme de mentorat adapté à vos besoins.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={5}
			imageUrl="/images/créer-son-cv.webp"
			link="/creer-mon-cv"
			linkLabel="En savoir plus"
			title="Je crée mon CV personnalisé">
			<p>Mettez en avant vos compétences dans un CV, même si vous pensez ne pas avoir d‘expérience.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={6}
			imageUrl="/images/entrepreneurs.webp"
			link="/entreprendre"
			linkLabel="En savoir plus"
			title="Je veux devenir entrepreneur">
			<p>Je retrouve les conseils, outils et structures d’accompagnement pour m‘aider à entreprendre.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={7}
			imageUrl="/images/accompagnement.webp"
			link="/accompagnement"
			linkLabel="En savoir plus"
			title="Je souhaite être accompagné·e">
			<p>Retrouvez les structures proches de chez vous pouvant vous aider dans vos démarches ou votre parcours.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={8}
			imageUrl="/images/mesures-jeunes.webp"
			link="/espace-jeune"
			linkLabel="En savoir plus"
			title="Je consulte les mesures jeunes">
			<p>Découvrez les solutions pour aider chacun d’entre vous à accéder à l‘emploi.</p>
		</LinkCard>,
	];
	const engagementEtBenevolatCardList = [
		<LinkCard
			className={styles.card}
			key={1}
			imageUrl="/images/service-civique.webp"
			link="/service-civique"
			linkLabel="Voir les offres"
			title="Service civique">
			<p>Je réalise une mission citoyenne de 6 à 12 mois, donnant le droit à une indemnisation.</p>
		</LinkCard>,
		<LinkCard
			className={styles.card}
			key={2}
			imageUrl="/images/bénévolat.webp"
			link="/benevolat"
			linkLabel="Voir les offres"
			title="Bénévolat">
			<p>Je réalise une mission d‘engagement civique courte auprès d‘organisations publiques ou associatives.</p>
		</LinkCard>,
	];

	return (
		<>
			<Head
				title="Toutes les solutions pour l'avenir des jeunes | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<HeroWithIllustration image="/images/portraits-verticaux.webp">
					<h1><HeroPrimaryText className={styles.heroTitle}>À chacun sa solution.</HeroPrimaryText></h1>
					<HeroSecondaryText>Vous avez entre 15 et 30 ans ? Découvrez toutes les solutions pour votre avenir !</HeroSecondaryText>
				</HeroWithIllustration>
				<section className={classNames(styles.section, styles.sectionNosOffres)}>
					<h2 id="offres" className={styles.sectionHeader}>
						<Icon name="brief-case" className={styles.sectionNosOffresHeaderIcon} />
            Découvrez nos offres
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={nosOffresCardList}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les offres d‘emplois'}
							seeLessAriaLabel={'Voir moins de résultats sur les offres d‘emplois'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionFormationsOrientation)}>
					<h2 id="formation" className={styles.sectionHeader}>
						<Icon name={'book'} className={styles.sectionFormationsOrientationHeaderIcon} />
            Formations et orientation
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={formationEtOrientationCardList}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les formations et orientation'}
							seeLessAriaLabel={'Voir moins de résultats sur les formations et orientation'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionAidesOrientationAccompagnement)}>
					<h2 id="aides-orientation-accompagnement" className={styles.sectionHeader}>
						<Icon name={'compass'} className={styles.sectionAidesOrientationAccompagnementHeaderIcon}/>
            Aides et accompagnement
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={aidesEtAccompagnementCardList}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les aides et accompagnements'}
							seeLessAriaLabel={'Voir moins de résultats sur les aides et accompagnements'}/>
					</Container>
				</section>
				<section className={classNames(styles.section, styles.sectionEngagementBénévolat)}>
					<h2 id="engagement-benevolat" className={styles.sectionHeader}>
						<Icon name="trophy" className={styles.sectionEngagementBénévolatHeaderIcon} />
            Engagement et bénévolat
					</h2>
					<Container>
						<SeeMoreItemList
							itemList={engagementEtBenevolatCardList}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de résultats sur les engagements et bénévolats'}
							seeLessAriaLabel={'Voir moins de résultats sur les engagements et bénévolats'}/>
					</Container>
				</section>
			</main>
		</>
	);
}
