import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Logement/Consulter/ConsulterAnnonce.module.scss';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import ServiceInclus = AnnonceDeLogement.ServiceInclus;

interface ServicesProps {
	inclus: Array<AnnonceDeLogement.ServiceInclus>;
	optionels: Array<AnnonceDeLogement.ServiceOptionnel>;
}

// const ServiceElements: Record<
// 	ServiceInclus,
// 	string
// > = {
// 	[ServiceInclus.BIKE_STORAGE]: 'Parking à vélo',
// 	[ServiceInclus.CLEANING_TOOLS]: 'Nécessaire de nettoyage',
// 	[ServiceInclus.FITNESS_ROOM]: 'Salle de sport',
// 	[ServiceInclus.INTERNET]: 'Wi-Fi',
// 	[ServiceInclus.IRON]: 'Fer à repasser',
// 	[ServiceInclus.MICROWAVE]: 'Micro-onde',
// 	[ServiceInclus.PARKING]: 'Parking voiture',
// 	[ServiceInclus.PRIVATE_BATHROOM]: 'Salle de bain privative',
// 	[ServiceInclus.TV]: 'Télévision',
// 	[ServiceInclus.VACUUM]: 'Aspirateur',
// 	[ServiceInclus.WASHING_MACHINE]: 'Machine à laver',
// };

export function Services({ inclus }: ServicesProps) {
	return (
		<section className={classNames(styles.card, styles.services)} aria-label="Services">
			<ul>
				{inclus.map((service) => (
					<li key={service}>{service}</li>
				))}
			</ul>
		</section>
	);
}
