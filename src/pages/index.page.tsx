import classNames from 'classnames';
import dynamic from 'next/dynamic';
import React from 'react';

import { LinkCard } from '~/client/components/ui/Card/Link/LinkCard';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/index.module.scss';

import { Carousel } from '../client/components/ui/Carousel/Carousel';
import { Icon } from '../client/components/ui/Icon/Icon';

const SeeMore = dynamic(() => import(/* webpackChunkName: 'seeMore' */ '~/client/components/ui/SeeMore/SeeMore'), { ssr: false });

export default function Accueil() {
	return (
		<>
			<HeadTag title="Toutes les solutions pour l'avenir des jeunes | 1jeune1solution" />
			<main id="contenu">
				<Hero image="/images/portraits-verticaux.webp">
					<p><b>À chacun sa solution.</b></p>
					<p>Vous avez entre 15 et 30 ans ? Découvrez toutes les solutions pour votre avenir !</p>
				</Hero>
				<section className={styles.todelete}>
					<Carousel imageUrlList={['/images/emploi.webp', '/images/stage.webp', '/images/alternance.webp', '/images/jobs-étudiant.webp']} titreDeLAnnonce="Logement avec vue sur le parking"/>
				</section>
				<section className={classNames(styles.section, styles.sectionNosOffres)}>
					<h2 id="offres" className={styles.sectionHeader}>
						<Icon name="brief-case" className={styles.sectionNosOffresHeaderIcon} />
            Découvrez nos offres
					</h2>
					<ul className={classNames(styles.cardList, styles.cardListPadding)}>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/emploi.webp"
								link="/emplois"
								linkLabel="Voir les offres"
								title="Emplois"
							>
								<p>Plus de 300 000 offres d’emplois sélectionnées spécialement pour vous.</p>
							</LinkCard>
						</li>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/stage.webp"
								link="/stages"
								linkLabel="Voir les offres"
								title="Stages"
							>
								<p>Plus de 20 000 offres de stages sélectionnées spécialement pour vous.</p>
							</LinkCard>
						</li>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/alternance.webp"
								link="/apprentissage"
								linkLabel="Voir les offres"
								title="Contrats d‘alternance"
							>
								<p>Trouvez votre entreprise pour concrétiser vos projets d’alternance.</p>
							</LinkCard>
						</li>
					</ul>

					<SeeMore>
						<ul className={classNames(styles.cardList, styles.cardListPaddingSeeMore)}>
							<li className={styles.cardListElement}>
								<LinkCard
									imageUrl="/images/jobs-étudiant.webp"
									link="/jobs-etudiants"
									linkLabel="Voir les offres"
									title="Jobs étudiants"
								>
									<p>Des milliers d‘offres d‘emplois pour les étudiants</p>
								</LinkCard>
							</li>
							<li className={styles.cardListElement}>
								<LinkCard
									imageUrl="/images/europe.webp"
									link="/europe"
									linkLabel="Voir les offres"
									title="Une expérience en Europe"
								>
									<p>Retrouvez des offres d‘emploi, des stages, des VIE | VIA et des aides financières pour une expérience en Europe.</p>
								</LinkCard>
							</li>
						</ul>
					</SeeMore>

				</section>

				<section className={classNames(styles.section, styles.sectionFormationsOrientation)}>
					<h2 id="formation" className={styles.sectionHeader}>
						<Icon name={'book'} className={styles.sectionFormationsOrientationHeaderIcon} />
            Formations et orientation
					</h2>
					<ul className={styles.cardList}>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/formations-initiales.webp"
								link="/formations"
								linkLabel="En savoir plus"
								title="Formations"
							>
								<p>Plus de 330 000 formations accessibles pour réaliser votre projet et trouver un emploi.</p>
							</LinkCard>
						</li>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/métiers.webp"
								link="/decouvrir-les-metiers"
								linkLabel="En savoir plus"
								title="Je découvre mon futur métier"
							>
								<p>Parcourez plus de 700 fiches métiers et trouvez celui qui vous correspond.</p>
							</LinkCard>
						</li>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/évènements.webp"
								link="/evenements"
								linkLabel="En savoir plus"
								title="Je participe à un évènement"
							>
								<p>Des centaines d‘événements de recrutement pour tous les jeunes, partout en France.</p>
							</LinkCard>
						</li>
					</ul>
				</section>

				<section className={classNames(styles.section, styles.sectionAidesOrientationAccompagnement)}>
					<h2 id="aides-orientation-accompagnement" className={styles.sectionHeader}>
						<Icon name={'compass'} className={styles.sectionAidesOrientationAccompagnementHeaderIcon}/>
            Aides et accompagnement
					</h2>
					<ul className={classNames(styles.cardList, styles.cardListPadding)}>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/cej.webp"
								link="/contrat-engagement-jeune"
								linkLabel="Découvrir le CEJ"
								title="Je découvre le Contrat d’Engagement Jeune (CEJ)"
							>
								<p>Un parcours personnalisé pour vous aider à définir votre projet et trouver un emploi.</p>
							</LinkCard>
						</li>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/aides-financières.webp"
								link="/mes-aides"
								linkLabel="Découvrir mes aides"
								title="J‘accède à mes aides"
							>
								<p>Trouvez les aides auxquelles vous avez droit en moins de 5 minutes : logement, santé, mobilité, emploi, culture, etc.</p>
							</LinkCard>
						</li>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/aides-au-logement.webp"
								link="/logements/aides-logement"
								linkLabel="Découvrir mes aides"
								title="Je découvre les aides au logement"
							>
								<p>Découvrez les aides au logement auxquels vous avez le droit et recevez des conseils pour constituer votre dossier.</p>
							</LinkCard>
						</li>
					</ul>

					<SeeMore>
						<ul className={classNames(styles.cardList, styles.cardListPaddingSeeMore)}>
							<li className={styles.cardListElement}>
								<LinkCard
									imageUrl="/images/mentorat.webp"
									link="/mentorat"
									linkLabel="En savoir plus"
									title="Je souhaite échanger avec un mentor"
								>
									<p>Une association vous recontacte pour vous proposer le programme de mentorat adapté à vos besoins.</p>
								</LinkCard>
							</li>
							<li className={styles.cardListElement}>
								<LinkCard
									imageUrl="/images/créer-son-cv.webp"
									link="/creer-mon-cv"
									linkLabel="En savoir plus"
									title="Je crée mon CV personnalisé"
								>
									<p>Mettez en avant vos compétences dans un CV, même si vous pensez ne pas avoir d‘expérience.</p>
								</LinkCard>
							</li>
							<li className={styles.cardListElement}>
								<LinkCard
									imageUrl="/images/entrepreneurs.webp"
									link="/entreprendre"
									linkLabel="En savoir plus"
									title="Je veux devenir entrepreneur"
								>
									<p>Je retrouve les conseils, outils et structures d’accompagnement pour m‘aider à entreprendre.</p>
								</LinkCard>
							</li>
							<li className={styles.cardListElement}>
								<LinkCard
									imageUrl="/images/accompagnement.webp"
									link="/accompagnement"
									linkLabel="En savoir plus"
									title="Je souhaite être accompagné·e"
								>
									<p>Retrouvez les structures proches de chez vous pouvant vous aider dans vos démarches ou votre parcours.</p>
								</LinkCard>
							</li>
							<li className={styles.cardListElement}>
								<LinkCard
									imageUrl="/images/mesures-jeunes.webp"
									link="/espace-jeune"
									linkLabel="En savoir plus"
									title="Je consulte les mesures jeunes"
								>
									<p>Découvrez les solutions pour aider chacun d’entre vous à accéder à l‘emploi.</p>
								</LinkCard>
							</li>
						</ul>
					</SeeMore>
				</section>

				<section className={classNames(styles.section, styles.sectionEngagementBénévolat)}>
					<h2 id="engagement-benevolat" className={styles.sectionHeader}>
						<Icon name="trophy" className={styles.sectionEngagementBénévolatHeaderIcon} />
            Engagement et bénévolat
					</h2>
					<ul className={styles.cardList}>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/service-civique.webp"
								link="/service-civique"
								linkLabel="Voir les offres"
								title="Service civique"
							>
								<p>Je réalise une mission citoyenne de 6 à 12 mois, donnant le droit à une indemnisation.</p>
							</LinkCard>
						</li>
						<li className={styles.cardListElement}>
							<LinkCard
								imageUrl="/images/bénévolat.webp"
								link="/benevolat"
								linkLabel="Voir les offres"
								title="Bénévolat"
							>
								<p>Je réalise une mission d‘engagement civique courte auprès d‘organisations publiques ou associatives.</p>
							</LinkCard>
						</li>
					</ul>
				</section>
			</main>
		</>
	);
}
