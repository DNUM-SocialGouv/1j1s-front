import React from 'react';

import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';



interface ConsulterAnnonceDeLogementProps {
	annonceDeLogement: AnnonceDeLogement
}

export function ConsulterAnnonce({ annonceDeLogement }: ConsulterAnnonceDeLogementProps) {

	return (
		<h1>{annonceDeLogement.titre}</h1>
	);
}
