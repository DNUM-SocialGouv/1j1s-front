import React from 'react';

import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';

export function Detail({ annonce }: { annonce: DetailAlternance }) {
	return (
		<>
			<h1>{annonce.titre}</h1>
			<p>{annonce.nomEntreprise}</p>
			<p>{annonce.localisation}</p>
			<p>{annonce.typeDeContrat}</p>
			<p>{annonce.niveauRequis}</p>
			<dl>
				{annonce.description && (
					<>
						<dt>Description du contrat</dt>
						<dd>{annonce.description}</dd>
					</>)}
				{annonce.compétences && annonce.compétences.length > 0 && (
					<>
						<dt>Connaissances et compétences requises</dt>
						<dd>
							<ul>
								{annonce.compétences.map((compétence) => (
									<li key={compétence}>{compétence}</li>
								))}
							</ul>
						</dd>
					</>
				)}
				{annonce.niveauRequis && (
					<>
						<dt>Niveau requis</dt>
						<dd>{annonce.niveauRequis}</dd>
					</>
				)}
			</dl>
		</>
	);
}
