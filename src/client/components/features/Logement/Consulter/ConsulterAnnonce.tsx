import React from 'react';

import {
	AnnonceDeLogement,
} from '../AnnonceDeLogement.type';
import { DescriptionDuLogement } from './DescriptionDuLogement';
import { EnTête } from './EnTête';
import { InformationsGénérales } from './InformationsGénérales';

interface ConsulterAnnonceDeLogementProps {
	annonceDeLogement: AnnonceDeLogement
}

export function ConsulterAnnonce({ annonceDeLogement }: ConsulterAnnonceDeLogementProps) {
	const {
		enTête,
		informationsGénérales,
		description,
	} = annonceDeLogement;

	return (
		<>
			<EnTête data={enTête} />
			<InformationsGénérales data={informationsGénérales} />
			<DescriptionDuLogement description={description} />
		</>
	);
}
