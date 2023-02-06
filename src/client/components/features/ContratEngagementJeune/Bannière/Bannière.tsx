import Image from 'next/image';
import bannièreImage from 'public/images/cej.webp';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Bannière/Bannière.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';


export default function Bannière () {
	const { isLargeScreen } = useBreakpoint();
	const titre = 'Je découvre le Contrat d‘Engagement Jeune';
	const accroche = 'Contrat d‘engagement jeune, finie la galère, trouvez un métier qui va vous plaire.';

	return (
		<div className={styles.bannière}>
			<div className={styles.bannièreContent}>
				<span className={styles.bannièreTitle}>
					<h1 className={ styles.titre } >{ titre }</h1>
					{ !isLargeScreen && (<p className={ styles.bannièreAccroche}>{ accroche }</p>) }
					<a href="#accompagnement" className={ styles.cta } aria-label={'Je me lance : Contrat d‘Engagement Jeune'}>Je me lance &nbsp;<Icon name="angle-right" /></a>
				</span>
			</div>
			{isLargeScreen && (
				<Image
					priority
					src={bannièreImage}
					alt={ accroche }
					width={800}
					height={400}
					style={{ height: 'auto', width: 800 }}
				/>
			)}
		</div>
	);
}

