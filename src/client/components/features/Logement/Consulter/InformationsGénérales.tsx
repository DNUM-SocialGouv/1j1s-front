import classNames from 'classnames';
import React from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { useLocale } from '~/client/context/locale.context';
import formatLocalisation from '~/client/utils/formatLocalisation.util';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

import styles from './ConsulterAnnonce.module.scss';

interface InformationsGénéralesProps {
	annonce: AnnonceDeLogement;
}

function formatterÉtage(étage: number) {
	return (
		étage === 0 && 'Rez-de-chaussée'
		|| étage === 1 && '1er'
		|| `${étage}ème`
	);
}

export function InformationsGénérales({
	annonce: {
		prix,
		charge,
		devise,
		surface,
		surfaceMax,
		garantie,
		nombreDePièces,
		étage,
		typeBien,
		meublé,
		localisation,
		dateDeDisponibilité: dateDeDisponibilitéString,
	},
}: InformationsGénéralesProps) {
	const locale = useLocale();
	const dateDeDisponibilité = new Date(dateDeDisponibilitéString);
	return (
		<section className={classNames(styles.card, styles.informationsGenerales)} aria-labelledby="informations-annonce-title">
			<h2 id="informations-annonce-title">Informations générales</h2>
			<table>
				<caption><Icon name='euro' aria-hidden={false} aria-label="Prix"/></caption>
				<tbody>
					<tr>
						<th scope="row">Prix</th>
						<td>{prix}{devise}<abbr title="Charges Comprises">CC</abbr>/mois</td>
					</tr>
					{garantie != null && (
						<tr>
							<th scope="row">Caution</th>
							<td>{garantie}{devise}</td>
						</tr>
					)}
					{charge != null && (
						<tr>
							<th scope="row">Charges</th>
							<td>{charge}{devise}</td>
						</tr>
					)}
				</tbody>
			</table>
			<table>
				<caption><Icon name='community' aria-hidden={false} aria-label="Informations du logement"/></caption>
				<tbody>
					<tr>
						<th scope="row">Surface</th>
						{surfaceMax != null
							? <td>{surface} à {surfaceMax} m<sup>2</sup></td>
							: <td>{surface}m<sup>2</sup></td>}
					</tr>
					<tr>
						<th scope="row">Nombre de pièces</th>
						<td>{nombreDePièces}</td>
					</tr>
					{étage != null && (
						<tr>
							<th scope="row">Étage</th>
							<td>
								{formatterÉtage(étage)}
							</td>
						</tr>
					)}
					<tr>
						<th scope="row">Type de bien</th>
						<td>{typeBien}</td>
					</tr>
					<tr>
						<th scope="row">Meublé</th>
						<td>{meublé ? 'Oui' : 'Non'}</td>
					</tr>
				</tbody>
			</table>
			<table>
				<caption><Icon name='roadmap' aria-hidden={false} aria-label="Localisation"/></caption>
				<tbody>
					<tr>
						<th scope="row">Localisation</th>
						<td>{formatLocalisation(localisation)}</td>
					</tr>
				</tbody>
			</table>
			<table>
				<caption><Icon name='suitcase' aria-hidden={false} aria-label="Disponibilité"/></caption>
				<tbody>
					<tr>
						<th scope="row">Disponible</th>
						<td>le <time dateTime={dateDeDisponibilité.toISOString()}>
							{dateDeDisponibilité.toLocaleDateString(locale, { dateStyle: 'long' })}
						</time></td>
					</tr>
				</tbody>
			</table>
		</section>
	);
}
