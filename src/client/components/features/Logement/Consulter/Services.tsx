import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Logement/Consulter/ConsulterAnnonce.module.scss';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import ServiceInclus = AnnonceDeLogement.ServiceInclus;
import { Icon, IconName } from '~/client/components/ui/Icon/Icon';

interface ServicesProps {
	inclus: Array<AnnonceDeLogement.ServiceInclus>;
	optionnels: Array<AnnonceDeLogement.ServiceOptionnel>;
}

const Icônes: Record<
	ServiceInclus,
	IconName
> = {
	[ServiceInclus.ASCENSEUR]: 'bike',
	[ServiceInclus.ASPIRATEUR]: 'vacuum',
	[ServiceInclus.CAVE]: 'error',
	[ServiceInclus.FER_A_REPASSER]: 'iron',
	[ServiceInclus.FIBRE_OPTIQUE]: 'error',
	[ServiceInclus.FOUR]: 'error',
	[ServiceInclus.GARAGE]: 'error',
	[ServiceInclus.GARDIEN_RESIDENCE]: 'error',
	[ServiceInclus.INTERNET]: 'wifi',
	[ServiceInclus.LAVE_LINGE]: 'washing-machine',
	[ServiceInclus.LAVE_VAISSELLE]: 'error',
	[ServiceInclus.LOCAL_A_VELO]: 'bike',
	[ServiceInclus.MICRO_ONDE]: 'microwave',
	[ServiceInclus.NECESSAIRE_DE_NETTOYAGE]: 'clean-hands',
	[ServiceInclus.PARKING]: 'car',
	[ServiceInclus.PISCINE]: 'error',
	[ServiceInclus.REFRIGERATEUR]: 'error',
	[ServiceInclus.SALLE_DE_BAIN_PRIVATIVE]: 'lock',
	[ServiceInclus.SALLE_DE_SPORT]: 'sport',
	[ServiceInclus.SECHE_LINGE]: 'error',
	[ServiceInclus.TERRACE]: 'error',
	[ServiceInclus.TV]: 'TV',
	[ServiceInclus.NON_RENSEIGNE]: 'error',
};

export function Services({ inclus, optionnels }: ServicesProps) {
	return (
		<section className={classNames(styles.card, styles.services)} aria-label="Équipements et services">
			<h2>Équipements et services inclus</h2>
			<ul>
				{inclus.map((service) => (
					<li key={service}>
						<Icon name={Icônes[service]} />
						{service}
					</li>
				))}
			</ul>
			<h2>Équipements et services optionnels</h2>
			<ul>
				{optionnels.map((service) => (
					<li key={service}>
						<Icon name={Icônes[service]} />
						{service}
					</li>
				))}
			</ul>
		</section>
	);
}
