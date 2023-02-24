import React from 'react';

import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';
import { useLocale } from '~/client/context/locale.context';

function toISODuration(duration: number) {
	return `P${duration}Y`;
}

function toISODate(date: Date) {
	return date.toISOString().split('T')[0];
}

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
						<dd>
							<time dateTime={toISODate(annonce.dateDébut)}>{annonce.dateDébut.toLocaleDateString(locale, { dateStyle: 'long' })}</time></dd>
					</>
				)}
				{annonce.typeDeContrat && (
					<>
						<dt>Type de contrat</dt>
						<dd>{annonce.typeDeContrat}</dd>
					</>
				)}
				{annonce.durée && (
					<>
						<dt>Durée du contrat</dt>
						<dd>
							<time dateTime={toISODuration(annonce.durée)}>{annonce.durée} {annonce.durée > 1 ? 'ans' : 'an'}</time></dd>
					</>
				)}
			</dl>
		</>
	);
}
