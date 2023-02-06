import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/Logement/Consulter/BilanEnergetiqueLogement.module.scss';
import cardStyles from '~/client/components/features/Logement/Consulter/ConsulterAnnonce.module.scss';
import { CategorieEnergetique } from '~/server/cms/domain/annonceDeLogement.type';

const LESS_OR_EQUAL = '\u{02A7D}';
const MORE_OR_EQUAL = '\u{02A7E}';
const LESS_THAN = '\u{0003C}';
const MORE_THAN = '\u{0003E}';
const METTRE_CARRÉ = <abbr title="mètre carré">m<sup>2</sup></abbr>;

const CONSOMMATION_ENERGETIQUE: Record<CategorieEnergetique, React.ReactNode> = {
	A: <>Excellente performance énergétique (consommation {LESS_THAN} 50 kWh/{METTRE_CARRÉ}/an)</>,
	B: <>Très bonne performance énergétique (consommation de 51 à 90 kWh/{METTRE_CARRÉ}/an)</>,
	C: <>Bonne performance énergétique (consommation de 91 à 150 kWh/{METTRE_CARRÉ}/an)</>,
	D: <>Assez bonne performance énergétique (consommation de 151 à 230 kWh/{METTRE_CARRÉ}/an)</>,
	E: <>Performance énergétique moyenne (consommation de 231 à 330 kWh/{METTRE_CARRÉ}/an)</>,
	F: <>Mauvaise performance énergétique (consommation de 331 à 450 kWh/{METTRE_CARRÉ}/an)</>,
	G: <>Très mauvaise performance énergétique (consommation {MORE_OR_EQUAL} 451 kWh/{METTRE_CARRÉ}/an)</>,
};

const EMISSION_DE_GAZ: Record<CategorieEnergetique, React.ReactNode> = {
	A: <>Très peu d’émission de gaz à effet de serre (émission de gaz {LESS_OR_EQUAL} 5 kg/{METTRE_CARRÉ}/an)</>,
	B: <>Peu d’émission de gaz à effet de serre (émission de gaz de 6 à 10 kg/{METTRE_CARRÉ}/an)</>,
	C: <>Émission de gaz à effet de serre correcte (émission de gaz de 11 à 20 kg/{METTRE_CARRÉ}/an) </>,
	D: <>Émission de gaz à effet de serre notable (émission de gaz de 21 à 35 kg/{METTRE_CARRÉ}/an)</>,
	E: <>Émission assez importante de gaz à effet de serre (émission de gaz de 36 à 55 kg/{METTRE_CARRÉ}/an)</>,
	F: <>Importante émission de gaz à effet de serre (émission de gaz de 56 à 80 kg/{METTRE_CARRÉ}/an)</>,
	G: <>Très importante émission de gaz à effet de serre (émission de gaz {MORE_THAN} 80 kg/{METTRE_CARRÉ}/an)</>,
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
			{consommationEnergetique && (
				<p id="consommation-energetique">
					{ CONSOMMATION_ENERGETIQUE[consommationEnergetique] }
				</p>
			)}
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
			{emissionDeGaz && <p id="emission-de-gaz">{ EMISSION_DE_GAZ[emissionDeGaz] }</p>}
		</figure>
	</section>;
}
