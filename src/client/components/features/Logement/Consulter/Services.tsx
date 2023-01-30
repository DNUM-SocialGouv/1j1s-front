import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Logement/Consulter/ConsulterAnnonce.module.scss';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import ServiceInclus = AnnonceDeLogement.ServiceInclus;
import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import ServiceOptionnel = AnnonceDeLogement.ServiceOptionnel;

interface ServicesProps {
	inclus: Array<AnnonceDeLogement.ServiceInclus>;
	optionnels: Array<AnnonceDeLogement.ServiceOptionnel>;
}

type ServicesAffichables =
	| Exclude<ServiceInclus, ServiceInclus.NON_RENSEIGNE>
	| Exclude<ServiceOptionnel, ServiceOptionnel.NON_RENSEIGNE>

const Icônes: Record<
	ServicesAffichables,
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
};

export function Services({ inclus, optionnels }: ServicesProps) {
	return (
		<section className={classNames(styles.card, styles.services)} aria-label="Équipements et services">
			<h2>Équipements et services inclus</h2>
			<ul>
				{inclus.map((service) => (
					service !== ServiceInclus.NON_RENSEIGNE && <li key={service}>
						<Icon name={Icônes[service]} />
						{service}
					</li>
				))}
			</ul>
			<h2>Équipements et services optionnels</h2>
			<ul>
				{optionnels.map((service) => (
					service !== ServiceOptionnel.NON_RENSEIGNE && <li key={service}>
						<Icon name={Icônes[service]} />
						{service}
					</li>
				))}
			</ul>
		</section>
	);
}
