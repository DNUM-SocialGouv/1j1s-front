import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';
import EnSavoirPlusApprentissageEntreprises
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/EnSavoirPlusApprentissageEntreprises/EnSavoirPlusApprentissageEntreprises';
import {
	InformationSurEmbaucheApprenti,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/InformationSurEmbaucheApprenti/InformationSurEmbaucheApprenti';
import {
	NewInformationSurEmbaucheApprenti,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/NewInformationSurEmbaucheApprenti/NewInformationSurEmbaucheApprenti';
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
	videos: Array<VideoCampagneApprentissage> | null
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
			<HeroWithIllustration image={'/images/campagne-apprentissage-employeur.webp'} className={styles.hero}>
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
			imageUrl: '/images/campagne-verbatim-fabrice.webp',
			nomApprenti: 'Fabrice, maître d’apprentissage d’Emma',
			verbatim: '« En venant en entreprise, les jeunes vont apprendre à connaître et respecter ses règles, ses processus, mais aussi l’esprit d’entreprise. C’est tout aussi important que les compétences techniques. »',
		},
		{
			imageUrl: '/images/campagne-verbatim-gael.webp',
			nomApprenti: 'Gaël, maître d’apprentissage de Benoît',
			verbatim: '« J’ai été apprenti il y a 20 ans, j’ai été très bien formé et j’ai à cœur de bien transmettre à mon tour. »',
		},
		{
			imageUrl: '/images/campagne-verbatim-julien.webp',
			nomApprenti: 'Julien, maître d’apprentissage de Céline',
			verbatim: '« Nous, notre travail, c’est leur donner la confiance aussi, leur faire comprendre qu’ils peuvent y arriver. Il n’y a pas d’âge pour apprendre. »',
		},
		{
			imageUrl: '/images/campagne-verbatim-emma.webp',
			nomApprenti: 'Emma, en apprentissage avec Fabrice',
			verbatim: '« L’apprentissage, c’est que du plus : j’ai un diplôme et de l’expérience et c’est ça qui est important pour la suite. »',
		},
		{
			imageUrl: '/images/campagne-verbatim-benoit.webp',
			nomApprenti: 'Benoît, en apprentissage avec Gaël',
			verbatim: '« L’entreprise, c’est là où on s’amuse le plus, c’est là où on voit le plus de choses, que ce soit côté humain ou côté professionnel. »',
		},
		{
			imageUrl: '/images/campagne-verbatim-celine.webp',
			nomApprenti: 'Céline, en apprentissage avec Julien',
			verbatim: '« Avec l’apprentissage, je suis une vraie salariée. C’est une fierté de voir le salaire arriver sur mon compte chaque mois grâce à mon travail. »',
		},
	];

	return (
		<>
			<header className={styles.titrePage}>
				{campagneApprentissageEstEnCours ? nouveauBandeauDeCampagne()
					: ancienBandeauDeCampagne()}
			</header>
			<RaisonsDeChoisirApprentissage titre="5 bonnes raisons de choisir l’apprentissage :" raisons={raisons} />
			{(!campagneApprentissageEstEnCours &&
				<EnSavoirPlusApprentissageEntreprises />
			)}
			{ videos && videos.length > 0 && (
				<VideosCampagneApprentissage
					titre={'Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?'}
					description={'Découvrez les témoignages des maîtres d’apprentissage et des apprentis qu’ils accompagnent au quotidien.'}
					videos={videos} />
			)}
			{campagneApprentissageEstEnCours && (
				<section aria-labelledby={'titre-section-verbatims'} className={styles.sectionVerbatims}>
					<Container>
						<hgroup>
							<h2 id={'titre-section-verbatims'}>Ils ont choisi de former des apprentis, pourquoi pas vous ?</h2>
							<p>Découvrez les témoignages de Fabrice, Gaël, Julien, et de leurs apprentis !</p>
						</hgroup>
						<SeeMoreItemList
							itemList={verbatimsApprentisListe.map((verbatim, index) => {
								return (
									<PresentationCard
										className={styles.temoignage}
										key={index}
										imageSrc={verbatim.imageUrl}
										titleLabel={verbatim.nomApprenti}
										titleHeadingTag="h3"
										imageFit="cover">
										{verbatim.verbatim}
									</PresentationCard>
								);
							})}
							numberOfVisibleItems={3}
							seeMoreAriaLabel={'Voir plus de témoignages'}
							seeLessAriaLabel={'Voir moins de témoignages'} />
					</Container>
				</section>
			)}
			{(campagneApprentissageEstEnCours ? <NewInformationSurEmbaucheApprenti /> :
				<InformationSurEmbaucheApprenti />)}
		</>
	);
}
