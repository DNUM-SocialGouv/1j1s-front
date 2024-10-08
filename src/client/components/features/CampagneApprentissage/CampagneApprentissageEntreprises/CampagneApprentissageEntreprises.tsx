import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';
import EnSavoirPlusApprentissageEntreprises
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/EnSavoirPlusApprentissageEntreprises/EnSavoirPlusApprentissageEntreprises';
import {
	InformationSurEmbaucheApprenti,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/InformationSurEmbaucheApprenti/InformationSurEmbaucheApprenti';
import {
	Raisons,
	RaisonsDeChoisirApprentissage,
} from '~/client/components/features/CampagneApprentissage/RaisonsDeChoisirApprentissage/RaisonsDeChoisirApprentissage';
import VideosCampagneApprentissage
	from '~/client/components/features/CampagneApprentissage/VideosCampagneApprentissage/VideosCampagneApprentissage';
import { Container } from '~/client/components/layouts/Container/Container';
import { PresentationCard } from '~/client/components/ui/Card/Presentation/PresentationCard';
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import { TYPE_SIMULATEUR } from '~/pages/apprentissage/simulation/index.page';
import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';

interface CampagneApprentissageEntreprisesProps {
	videos: Array<VideoCampagneApprentissage>
}

export function CampagneApprentissageEntreprises({ videos }: CampagneApprentissageEntreprisesProps) {
	const raisons: Raisons[] = [
		{
			iconName: 'award',
			text: 'Former votre futur collaborateur',
		},
		{
			iconName: 'account',
			text: <>Transmettre votre <span>savoir-faire</span> </>,
		},
		{
			iconName: 'euro',
			text: 'Bénéficier d’aides pour le recrutement',
		},
		{
			iconName: 'sun',
			text: 'Découvrir de nouvelles idées et pratiques',
		},
		{
			iconName: 'thumb-up',
			text: 'Préparer l’avenir de votre entreprise',
		},
	];

	const campagneApprentissageEstEnCours = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';

	function nouveauBandeauDeCampagne() {
		return (
			<HeroWithIllustration image={'/images/campagne-apprentissage-entreprise-avec-texte.webp'} className={styles.hero}>
				<h1>Avec l’apprentissage, recrutez la future pépite de votre entreprise&nbsp;!</h1>
				<p>Des milliers de jeunes motivés, avec des compétences à revendre, n’attendent que
				vous pour démarrer leur contrat d’apprentissage.</p>
				<Link href={'/apprentissage/deposer-offre'} appearance={'asPrimaryButton'} className={styles.cta}>
				Déposer mon offre d’apprentissage
					<Link.Icon />
				</Link>
			</HeroWithIllustration>
		);
	}

	function ancienBandeauDeCampagne() {
		return (
			<HeroWithIllustration image={'/images/campagne-apprentissage-entreprise-avec-texte.webp'} className={styles.hero}>
				<h1>L’apprentissage, pour mon entreprise <span
					className={styles.avoidLineBreakInside}>c’est le bon choix&nbsp;!</span></h1>
				<Link href={`/apprentissage/simulation?simulateur=${TYPE_SIMULATEUR.EMPLOYEUR}`}
					appearance={'asPrimaryButton'}
					className={styles.cta}>
					<span className={styles.mobileOnly}>Simuler le coût d’embauche</span>
					<span className={styles.desktopOnly}>Simuler le coût de l’embauche d’un apprenti</span>
					<Link.Icon />
				</Link>
			</HeroWithIllustration>
		);
	}

	const verbatimsApprentisListe = [
		{
			imageUrl: '/images/bénévolat.webp',
			nomApprenti: 'Tarik',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
		{
			imageUrl: '/images/emploi.webp',
			nomApprenti: 'Laura',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
		{
			imageUrl: '/images/jobs-ete.webp',
			nomApprenti: 'Marc',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
		{
			imageUrl: '/images/alternance.webp',
			nomApprenti: 'Sandrine',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
		{
			imageUrl: '/images/bénévolat.webp',
			nomApprenti: 'Tarik',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
		{
			imageUrl: '/images/emploi.webp',
			nomApprenti: 'Laura',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
		{
			imageUrl: '/images/jobs-ete.webp',
			nomApprenti: 'Marc',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
		{
			imageUrl: '/images/alternance.webp',
			nomApprenti: 'Sandrine',
			verbatim: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Erat aliquet massa aliquam est pretium ante nisi maecenas arcu.',
		},
	];

	return (
		<>
			<header className={styles.titrePage}>
				{campagneApprentissageEstEnCours ? nouveauBandeauDeCampagne()
					: ancienBandeauDeCampagne()}
			</header>
			<RaisonsDeChoisirApprentissage titre="5 bonnes raisons de choisir l’apprentissage :" raisons={raisons} />
			<EnSavoirPlusApprentissageEntreprises />
			{ videos.length > 0 && (
				<VideosCampagneApprentissage
					titre={'Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?'}
					description={'Découvrez les témoignages des maîtres d’apprentissage et des apprentis qu’ils accompagnent au quotidien.'}
					videos={videos} />
			)}
			{campagneApprentissageEstEnCours && (
				<section aria-labelledby={'titre-section-verbatims'} className={styles.sectionVerbatims}>
					<Container>
						<h2>Pour vous, le plus compliqué sera de trouver un apprenti. <span id={'titre-section-verbatims'}>Découvrez les témoignages des apprentis.</span></h2>
						<SeeMoreItemList
							itemList={verbatimsApprentisListe.map((verbatim, index) => {
								return (
									<PresentationCard
										className={styles.card}
										key={index}
										imageSrc={verbatim.imageUrl}
										titleLabel={verbatim.nomApprenti}
										titleHeadingTag="h3"
										imageFit="cover">
										{verbatim.verbatim}
									</PresentationCard>
								);
							})}
							numberOfVisibleItems={4}
							seeMoreAriaLabel={'Voir plus'}
							seeLessAriaLabel={'Voir moins'} />
					</Container>
				</section>
			)}
			<InformationSurEmbaucheApprenti />
		</>
	);
}
