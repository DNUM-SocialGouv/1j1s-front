import React from 'react';

import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

import { Icon } from '../../../ui/Icon/Icon';
import styles from './ConsulterAnnonce.module.scss';

interface InformationsGénéralesProps {
	annonce: AnnonceDeLogement;
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
	},
}: InformationsGénéralesProps) {
	return (
		<section className={styles.card} aria-labelledby="informations-annonce-title">
			<h2 id="informations-annonce-title">Informations générales</h2>
			<table>
				<caption><Icon name='euro' aria-hidden={false} aria-label="Prix"/></caption>
				<tbody>
					<tr>
						<th scope="row">Prix</th>
						<td>{prix}{devise}<abbr title="Charges Comprises">CC</abbr>/mois</td>
					</tr>
					{garantie && (
						<tr>
							<th scope="row">Caution</th>
							<td>{garantie}{devise}</td>
						</tr>
					)}
					{charge && (
						<tr>
							<th scope="row">Charges</th>
							<td>{charge}{devise}</td>
						</tr>
					)}
					{/*<tr>*/}
					{/*	<th scope="row">Frais d&apos;agence</th>*/}
					{/*	<td>500$</td>*/}
					{/*</tr>*/}
				</tbody>
			</table>
			<table>
				<caption><Icon name='community' aria-hidden={false} aria-label="Informations du logement"/></caption>
				<tbody>
					<tr>
						<th scope="row">Surface</th>
						{surfaceMax
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
								{étage === 0 && 'Rez-de-chaussée'
								|| étage === 1 && '1er'
								|| `${étage}ème`}
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
					{/*<tr>*/}
					{/*	<th scope="row">Ascenceur</th>*/}
					{/*	<td>Oui</td>*/}
					{/*</tr>*/}
				</tbody>
			</table>
			<table>
				<caption><Icon name='roadmap' aria-hidden={false} aria-label="Localisation"/></caption>
				<tbody>
					<tr>
						<th scope="row">Localisation</th>
						<td>4 rue de l’exemple, Paris (75012)</td>
					</tr>
				</tbody>
			</table>
			<table>
				<caption><Icon name='suitcase' aria-hidden={false} aria-label="Disponibilité"/></caption>
				<tbody>
					<tr>
						<th scope="row">Disponible</th>
						<td>le 3 janvier 2024</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
}
