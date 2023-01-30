import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Logement/Consulter/BilanEnergetiqueLogement.module.scss';
import cardStyles from '~/client/components/features/Logement/Consulter/ConsulterAnnonce.module.scss';
import { CategorieEnergetique } from '~/server/cms/domain/annonceDeLogement.type';


const CONSOMMATION_ENERGETIQUE: Record<CategorieEnergetique, string> = {
	A: 'Excellente performance énergétique (consommation < 50 kWh/m²/an)',
	B: 'Très bonne performance énergétique (consommation de 51 à 90 kWh/m²/an)',
	C: 'Bonne performance énergétique (consommation de 91 à 150 kWh/m²/an)',
	D: 'Assez bonne performance énergétique (consommation de 151 à 230 kWh/m²/an)',
	E: 'Performance énergétique moyenne (consommation de 231 à 330 kWh/m²/an)',
	F: 'Mauvaise performance énergétique (consommation de 331 à 450 kWh/m²/an)',
	G: 'Très mauvaise performance énergétique (consommation >=451 kWh/m²/an)',
};

const EMISSION_DE_GAZ: Record<CategorieEnergetique, string> = {
	A: 'Très peu d’émission de gaz à effet de serre (émission de gaz <= 5 kg/m2/an)',
	B: 'Peu d’émission de gaz à effet de serre (émission de gaz de 6 à 10 kg/m2/an)',
	C: 'Émission de gaz à effet de serre correcte (émission de gaz de 11 à 20 kg/m2/an) ',
	D: 'Émission de gaz à effet de serre notable (émission de gaz de 21 à 35 kg/m2/an)',
	E: 'Émission assez importante de gaz à effet de serre (émission de gaz de 36 à 55 kg/m2/an)',
	F: 'Importante émission de gaz à effet de serre (émission de gaz de 56 à 80 kg/m2/an)',
	G: 'Très importante émission de gaz à effet de serre (émission de gaz > 80 kg/m2/an)',
};

interface BilanEnergetiqueLogementProps {
    consommationEnergetique?: CategorieEnergetique
    emissionDeGaz?: CategorieEnergetique
}

export function BilanEnergetiqueLogement(props: BilanEnergetiqueLogementProps) {
	const { consommationEnergetique, emissionDeGaz } = props;
	return <section className={classNames(styles.energy, cardStyles.card)} aria-label="bilan énergétique du logement">
		<figure>
			<figcaption>Classe énergie</figcaption>
			<div role="img" aria-label={consommationEnergetique ?? 'Non renseigné'} aria-describedby="consommation-energetique"
				className={styles.tag}
				style={{
					'--color': `var(--color-${consommationEnergetique?.toLowerCase()})`,
					'--text-color': `var(--text-color-${consommationEnergetique?.toLowerCase()})`,
				} as React.CSSProperties}
			>{consommationEnergetique ?? 'Non renseigné'}</div>
			<p id="consommation-energetique">
				{ consommationEnergetique && CONSOMMATION_ENERGETIQUE[consommationEnergetique]}
			</p>
		</figure>
		<figure>
			<figcaption>Émissions de gaz à effet de serre</figcaption>
			<div role="img" aria-label={emissionDeGaz ?? 'Non renseigné'} aria-describedby="emission-de-gaz"
				 className={styles.tag}
				 style={{
					 '--color': `var(--color-${emissionDeGaz?.toLowerCase()})`,
					 '--text-color': `var(--text-color-${emissionDeGaz?.toLowerCase()})`,
				 } as React.CSSProperties}
			>{emissionDeGaz ?? 'Non renseigné'}</div>
			<p id="emission-de-gaz">{emissionDeGaz && EMISSION_DE_GAZ[emissionDeGaz]}</p>
		</figure>
	</section>;
}
