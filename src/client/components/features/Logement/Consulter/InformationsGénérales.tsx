import React from 'react';

import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';

import { Icon } from '../../../ui/Icon/Icon';
import styles from './ConsulterAnnonce.module.scss';

interface InformationsGénéralesProps {
	annonce: AnnonceDeLogement;
}

export function InformationsGénérales({ annonce: { prix, charge } }: InformationsGénéralesProps) {
	return (
		<section className={styles.card} aria-labelledby="informations-annonce-title">
			<h2 id="informations-annonce-title">Informations générales</h2>
			<table>
				<caption><Icon name='euro' aria-hidden={false} aria-label="Prix"/></caption>
				<tbody>
					<tr>
						<th scope="row">Prix</th>
						<td>{prix}€<abbr title="Charges Comprises">CC</abbr>/mois</td>
					</tr>
					<tr>
						<th scope="row">Caution</th>
						<td>500$</td>
					</tr>
					<tr>
						<th scope="row">Charges</th>
						<td>{charge}€</td>
					</tr>
					<tr>
						<th scope="row">Frais d&apos;agence</th>
						<td>500$</td>
					</tr>
				</tbody>
			</table>
			<table>
				<caption><Icon name='community' aria-hidden={false} aria-label="Informations du logement"/></caption>
				<tbody>
					<tr>
						<th scope="row">Surface</th>
						<td>19 à 25 m2</td>
					</tr>
					<tr>
						<th scope="row">Nombre de pièces</th>
						<td>1</td>
					</tr>
					<tr>
						<th scope="row">Étage</th>
						<td>3ème</td>
					</tr>
					<tr>
						<th scope="row">Type de bien</th>
						<td>Studio</td>
					</tr>
					<tr>
						<th scope="row">Meublé</th>
						<td>Non</td>
					</tr>
					<tr>
						<th scope="row">Ascenceur</th>
						<td>Oui</td>
					</tr>
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
