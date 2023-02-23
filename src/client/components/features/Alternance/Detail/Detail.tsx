import React from 'react';

import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';

export function Detail({ annonce }: { annonce: DetailAlternance }) {
	return (
		<>
			<h1>{annonce.titre}</h1>
			<p>{annonce.nomEntreprise}</p>
			<ul>
				<li>{annonce.localisation}</li>
				<li>{annonce.typeDeContrat}</li>
				<li>{annonce.niveauRequis}</li>
			</ul>
			<dl>
				{annonce.description && (
					<>
						<dt>Description du contrat</dt>
						<dd>{annonce.description}</dd>
					</>)}
			</dl>
		</>
	);
}
