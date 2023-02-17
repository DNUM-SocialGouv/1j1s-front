import classNames from 'classnames';
import React from 'react';

import Bannière from '~/client/components/features/MesuresEmployeurs/Bannière/Bannière';
import styles from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs.module.scss';
import { Head } from '~/client/components/head/Head';
import { FlippingCard } from '~/client/components/ui/Card/Flipping/FlippingCard';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import useSanitize from '~/client/hooks/useSanitize';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';

export interface MesuresEmployeursProps {
  mesureEmployeurList: MesureEmployeur[];
}

export function MesuresEmployeursComponent({ mesureEmployeurList }: MesuresEmployeursProps) {
	const { isLargeScreen } = useBreakpoint();
	const isMobile = !isLargeScreen;
	return (
		<>
			<Head
				title="Mesures Employeurs | 1jeune1solution"
				description="Plus de 400 000 offres d‘emplois et d‘alternances sélectionnées pour vous"
				robots="index,follow"
			/>
			<main id="contenu" className={classNames({ [styles.mobile]: isMobile })}>
				<Bannière/>
				<section className={styles.dispositifs}>
					<h2 id="dispositifs">
            Découvrir les dispositifs pour vous aider à recruter
					</h2>
					<ul className={styles.cartes} aria-labelledby="dispositifs">
						{mesureEmployeurList.map((carte) => (
							<li key={carte.url}>
								<CarteMesureEmployeur carte={carte} isMobile={isMobile}/>
							</li>
						))}
					</ul>
				</section>
			</main>
		</>
	);
}

interface CarteMesureEmployeurProps {
  carte: MesureEmployeur;
  isMobile: boolean;
}

function CarteMesureEmployeur({ carte }: CarteMesureEmployeurProps) {
	const titre = useSanitize(carte.titre);
	const bannière = carte.bannière?.url || '';
	const link = carte.link;
	const pourQui = carte.pourQui || '';

	return <FlippingCard
		imageUrl={bannière}
		link={link}
		title={titre}
		flippingCardContent={pourQui}
		data-testid="carteMesuresEmployeurs"
	/>;
}
