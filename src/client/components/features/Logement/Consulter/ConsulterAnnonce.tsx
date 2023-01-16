import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import {
	AnnonceDeLogement,
} from '../AnnonceDeLogement.type';
// import { DescriptionDuLogement } from './DescriptionDuLogement';
import { EnTête } from './EnTête';
// import { InformationsGénérales } from './InformationsGénérales';

interface ConsulterAnnonceDeLogementProps {
	annonceDeLogement: AnnonceDeLogement
}

export function ConsulterAnnonce({ annonceDeLogement }: ConsulterAnnonceDeLogementProps) {
	return (
		<main id="contenu">
			<Container>
				<EnTête annonce={annonceDeLogement} />
				{/*<InformationsGénérales annonce={annonceDeLogement} />*/}
				{/*<DescriptionDuLogement description={annonceDeLogement.description} />*/}
			</Container>
		</main>
	);
}
