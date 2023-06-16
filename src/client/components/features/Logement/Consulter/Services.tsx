import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Logement/Consulter/ConsulterAnnonce.module.scss';
import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import Service = AnnonceDeLogement.Service;

interface ServicesProps {
	inclus: Array<AnnonceDeLogement.Service>;
	optionnels: Array<AnnonceDeLogement.Service>;
}

type ServicesAffichables = Exclude<Service, Service.NON_RENSEIGNE>

const Icônes: Record<
	ServicesAffichables,
	IconName
> = {
	[Service.ASCENSEUR]: 'exit',
	[Service.ASPIRATEUR]: 'vacuum',
	[Service.CAVE]: 'exit',
	[Service.FER_A_REPASSER]: 'iron',
	[Service.FIBRE_OPTIQUE]: 'wifi',
	[Service.FOUR]: 'microwave',
	[Service.GARAGE]: 'car',
	[Service.GARDIEN_RESIDENCE]: 'user',
	[Service.INTERNET]: 'wifi',
	[Service.LAVE_LINGE]: 'washing-machine',
	[Service.LAVE_VAISSELLE]: 'clean-hands',
	[Service.LOCAL_A_VELO]: 'bike',
	[Service.MICRO_ONDE]: 'microwave',
	[Service.NECESSAIRE_DE_NETTOYAGE]: 'clean-hands',
	[Service.PARKING]: 'car',
	[Service.PISCINE]: 'swimming',
	[Service.REFRIGERATEUR]: 'restaurant',
	[Service.SALLE_DE_BAIN_PRIVATIVE]: 'lock',
	[Service.SALLE_DE_SPORT]: 'sport',
	[Service.SECHE_LINGE]: 'washing-machine',
	[Service.TERRACE]: 'plant',
	[Service.TV]: 'TV',
};

export function Services({ inclus, optionnels }: ServicesProps) {
	const hasServiceInclus = inclus.length === 0;
	const hasServiceOptionnels = optionnels.length === 0;
	return (
		<section className={classNames(styles.card, styles.services)} aria-label="Équipements et services">
			<h2>Équipements et services inclus</h2>
			<ul>
				{inclus.map((service) => (
					service !== Service.NON_RENSEIGNE && <li key={service}>
						<Icon name={Icônes[service]}/>
						{service}
					</li>
				))}
			</ul>
			{hasServiceInclus && <p>Aucun service inclus</p>}
			<h2>Équipements et services optionnels</h2>
			<ul>
				{optionnels.map((service) => (
					service !== Service.NON_RENSEIGNE && <li key={service}>
						<Icon name={Icônes[service]} />
						{service}
					</li>
				))}
			</ul>
			{hasServiceOptionnels && <p>Aucun service optionnel</p>}
		</section>
	);
}
