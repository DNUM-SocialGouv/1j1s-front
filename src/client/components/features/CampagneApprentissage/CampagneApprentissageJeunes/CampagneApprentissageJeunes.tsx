import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';
import EnSavoirPlusApprentissage
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/EnSavoirPlusApprentissageJeunes/EnSavoirPlusApprentissageJeunes';
import PreparationApprentissage
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/PreparationApprentissage/PreparationApprentissage';
import {
	Raisons,
	RaisonsDeChoisirApprentissage,
} from '~/client/components/features/CampagneApprentissage/RaisonsDeChoisirApprentissage/RaisonsDeChoisirApprentissage';
import VideosCampagneApprentissage
	from '~/client/components/features/CampagneApprentissage/VideosCampagneApprentissage/VideosCampagneApprentissage';
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { TYPE_SIMULATEUR } from '~/pages/apprentissage/simulation/index.page';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

interface CampagneApprentissageJeunesProps {
	videos: Array<VideoCampagneApprentissage>
}

export function CampagneApprentissageJeunes({ videos }: CampagneApprentissageJeunesProps) {
	const { isSmallScreen } = useBreakpoint();

	const raisons: Raisons[] = [
		{
			iconName: 'award',
			text: 'Obtenir un diplôme reconnu',
		},
		{
			iconName: 'account',
			text: 'Apprendre en pratiquant',
		},
		{
			iconName: 'sun',
			text: 'Être formé gratuitement pour l’apprenti',
		},
		{
			iconName: 'thumb-up',
			text: 'Avoir une expérience professionnelle complète',
		},
		{
			iconName: 'euro',
			text: 'Être rémunéré tous les mois',
		},
	];

	return (
		<>
			<header className={styles.titrePage}>
				<HeroWithIllustration image={'/images/campagne-apprentissage-bon-choix.webp'} className={styles.hero}>
					<h1>L’apprentissage, pour moi c’est le bon choix.</h1>
					<p className={styles.sousTitre}>Vous apprenez directement sur le terrain et vous êtes payés !</p>
					<Link href={`/apprentissage/simulation?simulateur=${TYPE_SIMULATEUR.ALTERNANT}`} appearance={'asPrimaryButton'} className={styles.cta}>
						Simuler votre rémunération { !isSmallScreen && 'en tant qu’apprenti' }
					</Link>
				</HeroWithIllustration>
			</header>
			<RaisonsDeChoisirApprentissage titre="5 bonnes raisons de choisir l’apprentissage" raisons={raisons}/>
			{ isSmallScreen ? <>
				{ videos.length > 0 &&
					<VideosCampagneApprentissage
						videos={videos}
						titre={'Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?'}
						description={'Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !'}
					/>
				}
				<PreparationApprentissage/>
			</> : <>
				<PreparationApprentissage/>
				{ videos.length > 0 &&
					<VideosCampagneApprentissage
						videos={videos}
						titre={'Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?'}
						description={'Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !'}
					/>
				}
			</>
			}

			<EnSavoirPlusApprentissage/>
		</>
	);
}
