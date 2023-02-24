import React from 'react';

import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';
import { useLocale } from '~/client/context/locale.context';

export function Detail({ annonce }: { annonce: DetailAlternance }) {
	const locale = useLocale();
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
				{annonce.dateDébut && (
					<>
						<dt>Début du contrat</dt>
						<dd>{annonce.dateDébut?.toLocaleDateString(locale, { dateStyle: 'long' })}</dd>
					</>
				)}
			</dl>
		</>
	);
}
