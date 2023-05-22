import React from 'react';

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

import styles from '../CampagneApprentissage.module.scss';

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
			text: 'Avoir une expérience professionnelle',
		},
		{
			iconName: 'euro',
			text: <>Être rémunéré <span>tous les mois</span></>,
		},
	];

	return (
		<>
			<header className={styles.titrePage}>
				<HeroWithIllustration image={'/images/campagne-apprentissage-jeune-avec-texte.webp'} className={styles.hero}>
					<h1>Avec l’apprentissage, vous apprenez directement <span className={styles.avoidLineBreakInside}>sur le terrain</span> <span className={styles.avoidLineBreakInside}>et vous êtes payés !</span></h1>
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
						titre={<>Ils ont fait le choix de l’apprentissage, <span>pourquoi pas vous ?</span> </>}
						description={'Découvrez les témoignages d’Elyna, Céline, Benoît et tous les autres !'}
					/>
				}
				<PreparationApprentissage/>
			</> : <>
				<PreparationApprentissage/>
				{ videos.length > 0 &&
					<VideosCampagneApprentissage
						videos={videos}
						titre={<>Ils ont fait le choix de l’apprentissage, <span>pourquoi pas vous ?</span> </>}
						description={'Découvrez les témoignages d’Elyna, Céline, Benoît et tous les autres !'}
					/>
				}
			</>
			}

			<EnSavoirPlusApprentissage/>
		</>
	);
}
