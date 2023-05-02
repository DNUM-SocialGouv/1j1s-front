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
			text: 'Une formation gratuite',
		},
		{
			iconName: 'thumb-up',
			text: 'Avoir une expérience professionnelle complète',
		},
		{
			iconName: 'euro',
			text: 'Un salaire chaque mois',
		},
	];

	return (
		<>
			<header className={styles.titrePage}>
				<HeroWithIllustration image={'/images/campagne-apprentissage.webp'} className={styles.hero}>
					<h1>L’apprentissage : <small>pour moi c’est le bon choix</small></h1>
					<Link href={'/apprentissage/simulation'} appearance={'asPrimaryButton'} className={styles.cta}>
						Simuler ma rémunération
					</Link>
				</HeroWithIllustration>
			</header>
			<RaisonsDeChoisirApprentissage titre="Choisir l’apprentissage c’est…" raisons={raisons}/>
			{ isSmallScreen ? <>
				{ videos.length > 0 && <VideosCampagneApprentissage videos={videos}/> }
				<PreparationApprentissage/>
			</> : <>
				<PreparationApprentissage/>
				{ videos.length > 0 && <VideosCampagneApprentissage videos={videos}/> }
			</>
			}

			<EnSavoirPlusApprentissage/>
		</>
	);
}
