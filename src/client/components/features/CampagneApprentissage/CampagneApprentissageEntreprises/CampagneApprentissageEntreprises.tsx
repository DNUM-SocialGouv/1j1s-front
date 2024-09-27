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
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';
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
	return (
		<>
			<header className={styles.titrePage}>
				{campagneApprentissageEstEnCours ? (
					<HeroWithIllustration image={'/images/campagne-apprentissage-entreprise-avec-texte.webp'} className={styles.hero}>
						<h1>Avec l’apprentissage, recrutez la future pépite de votre entreprise&nbsp;!</h1>
						<p>Des milliers de jeunes motivés, avec des compétences à revendre, n’attendent que vous pour démarrer leur contrat d’apprentissage.</p>
						<Link href={'/apprentissage/deposer-offre'} appearance={'asPrimaryButton'} className={styles.cta}>
							Déposer mon offre d’apprentissage
							<Link.Icon />
						</Link>
					</HeroWithIllustration>
				)
					: (
						<HeroWithIllustration image={'/images/campagne-apprentissage-entreprise-avec-texte.webp'} className={styles.hero}>
							<h1>L’apprentissage, pour mon entreprise <span className={styles.avoidLineBreakInside}>c’est le bon choix&nbsp;!</span></h1>
							<Link href={`/apprentissage/simulation?simulateur=${TYPE_SIMULATEUR.EMPLOYEUR}`} appearance={'asPrimaryButton'} className={styles.cta}>
								<span className={styles.mobileOnly}>Simuler le coût d’embauche</span>
								<span className={styles.desktopOnly}>Simuler le coût de l’embauche d’un apprenti</span>
								<Link.Icon />
							</Link>
						</HeroWithIllustration>
					)}
			</header>
			<RaisonsDeChoisirApprentissage titre="5 bonnes raisons de choisir l’apprentissage :" raisons={raisons} />
			<EnSavoirPlusApprentissageEntreprises />
			{ videos.length > 0 && (
				<VideosCampagneApprentissage
					titre={'Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?'}
					description={'Découvrez les témoignages des maîtres d’apprentissage et des apprentis qu’ils accompagnent au quotidien.'}
					videos={videos} />
			)}
			<InformationSurEmbaucheApprenti />
		</>
	);
}
