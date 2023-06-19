import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import {
	StageDeposerOffreFormulaireLayout,
} from '~/client/components/features/OffreDeStage/Déposer/FormulaireLayout/StageDeposerOffreFormulaireLayout';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Option, Select } from '~/client/components/ui/Select/Select';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useSessionStorage from '~/client/hooks/useSessionStorage';
import {
	ETAPE_ENTREPRISE,
	ETAPE_OFFRE_DE_STAGE,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';

import { domaineStage } from '../StageDomaines';
import styles from './StageDeposerOffreFormulaireÉtape2Stage.module.scss';

const email_regex = '([a-zA-Z0-9!#$%&@\'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)';
const url_regex = '(https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*))';
const EMAIL_OR_URL_REGEX = `^${email_regex}|${url_regex}$`;
const DUREE_MOIS_EN_JOUR = 30;
const UNITE = '€';
const LONGUEUR_MAX_TITRE = 200;

enum Stage {
	DATE_DE_DEBUT_MIN = 'dateDeDebutMin',
	DATE_DE_DEBUT_MAX = 'dateDeDebutMax',
	DATE_DE_DEBUT_PRECISE = 'dateDeDebutPrecise',
	NOM = 'nomOffre',
	LIEN_CANDIDATURE = 'lienCandidature',
	DESCRIPTION = 'descriptionOffre',
	DUREE = 'dureeStage',
	DOMAINE = 'domaineStage',
	REMUNERATION = 'remunerationStage',
	TELETRAVAIL = 'teletravail',
}

enum Télétravail {
	OUI = 'true',
	NON = 'false',
}

enum DateDeDebutPrecise {
	OUI = 'true',
	NON = 'false',
}

const dureeStageList: Option[] = [
	{ libellé: '1 mois', valeur: DUREE_MOIS_EN_JOUR.toString() },
	{ libellé: '2 mois', valeur: (2 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '3 mois', valeur: (3 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '4 mois', valeur: (4 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '5 mois', valeur: (5 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '6 mois', valeur: (6 * DUREE_MOIS_EN_JOUR).toString() },
];

function RadioDateDeDebut(props: { checked: boolean, onChange: () => void }) {
	return <div className={styles.contenuDateDeDebutInputRadio}>
		<Radio
			label="Je connais la date précise du début de stage"
			name={Stage.DATE_DE_DEBUT_PRECISE}
			value={DateDeDebutPrecise.OUI}
			checked={props.checked}
			onChange={props.onChange}
			required
		/>
		<Radio
			label="Je ne connais pas la date précise du début de stage"
			name={Stage.DATE_DE_DEBUT_PRECISE}
			value={DateDeDebutPrecise.NON}
			checked={!props.checked}
			onChange={props.onChange}
			required
		/>
	</div>;
}

function InputDateDeDebut(props: { displayDateDeDebutPrecise: boolean, informationsStage: OffreDeStageDeposee.Stage | null, min: string }) {
	const [dateDeDebutMin, setDateDeDebutMin] = useState<string | undefined>(props.informationsStage?.dateDeDebutMin ?? undefined);
	const [dateDeDebutMax, setDateDeDebutMax] = useState<string | undefined>(props.informationsStage?.dateDeDebutMax ?? undefined);

	return <>
		{props.displayDateDeDebutPrecise ?
			<InputText
				label="Indiquez la date précise du début de stage"
				type="date"
				name={Stage.DATE_DE_DEBUT_MIN}
				value={dateDeDebutMin}
				required
				min={props.min}
				onChange={(event) => setDateDeDebutMin(event.target.value)}
			/>
			:
			<div className={styles.contenuDateDeDebutInputDate}>
				<InputText
					label="Date de début du stage au plus tôt :"
					type="date"
					name={Stage.DATE_DE_DEBUT_MIN}
					value={dateDeDebutMin}
					required
					min={props.min}
					onChange={(event) => setDateDeDebutMin(event.target.value)}
				/>
				<InputText
					label="Date de début du stage au plus tard :"
					type="date"
					name={Stage.DATE_DE_DEBUT_MAX}
					value={dateDeDebutMax}
					required
					min={dateDeDebutMin}
					onChange={(event) => setDateDeDebutMax(event.target.value)}
				/>
			</div>
		}
	</>;
}

function ChampsObligatoires(props: { informationsStage: OffreDeStageDeposee.Stage | null, checked: boolean, onChange: () => void, min: string }) {
	return <>
		<InputText
			label="Nom de l’offre de stage (200 caractères maximum)"
			name={Stage.NOM}
			value={props.informationsStage?.nomOffre}
			placeholder="Exemple : Assistant de recherche (6mois) chez ABC.ENTREPRISE"
			maxLength={LONGUEUR_MAX_TITRE}
			required
			className={styles.inputNomOffre}
		/>
		<InputText
			pattern={EMAIL_OR_URL_REGEX}
			label="Lien sur lequel les candidats pourront postuler ou une adresse e-mail à laquelle envoyer sa candidature"
			name={Stage.LIEN_CANDIDATURE}
			value={props.informationsStage?.lienCandidature}
			placeholder="Exemples : https://candidat.pole-emploi.fr/offres/142Y   OU   candidature_PE_technicien@exemple.com"
			required
			className={styles.inputLienCandidature}
		/>
		<TextArea
			className={styles.textareaWrapper}
			id="descriptionOffre"
			label={'Description de l’offre de stage (200 caractères minimum)'}
			placeholder="Informations sur le stage : les objectifs, les challenges, les missions..."
			name={Stage.DESCRIPTION}
			defaultValue={props.informationsStage?.descriptionOffre}
			required
			rows={10}
			minLength={200}
		/>
		<fieldset className={styles.contenuDateDeDebut}>
			<legend>Date de début du stage</legend>
			<RadioDateDeDebut
				checked={props.checked}
				onChange={props.onChange}
			/>
			<InputDateDeDebut
				displayDateDeDebutPrecise={props.checked}
				informationsStage={props.informationsStage}
				min={props.min}
			/>
		</fieldset>
		<Select
			label="Durée du stage"
			name={Stage.DUREE}
			value={props.informationsStage?.dureeStage}
			placeholder="Sélectionnez une durée"
			optionList={dureeStageList}
			className={styles.dureeStage}
			required
		/>
	</>;
}

function ChampsFaculatifs(props: { informationsStage: OffreDeStageDeposee.Stage | null }) {
	return <>
		<Select
			label="Domaine de l’offre de stage"
			name={Stage.DOMAINE}
			value={props.informationsStage?.domaineStage}
			placeholder="Sélectionnez un domaine"
			optionList={domaineStage}
		/>
		<div className={styles.rémunérationWrapper}>
			<label className={styles.rémunérationLabel} htmlFor="remunerationStage">Rémunération par mois</label>
			<div className={styles.rémunérationContenu}>
				<input
					id="remunerationStage"
					type="number"
					name={Stage.REMUNERATION}
					placeholder="Exemple : 560"
					min={0}
					defaultValue={props.informationsStage?.remunerationStage}
					className={styles.rémunérationContenuInput}
				/>
				<span className={styles.rémunérationContenuUnité}>{UNITE}</span>
			</div>
		</div>
		<div>
			<fieldset className={styles.contenuTeletravail}>
				<legend>Télétravail possible</legend>
				<div className={styles.inputTeletravail}>
					<Radio name={Stage.TELETRAVAIL} value="true" label="Oui"
					       defaultChecked={props.informationsStage?.teletravail === Télétravail.OUI}/>
					<Radio name={Stage.TELETRAVAIL} value="false" label="Non"
					       defaultChecked={props.informationsStage?.teletravail === Télétravail.NON}/>
				</div>
			</fieldset>
		</div>
	</>;
}

export default function StageDeposerOffreFormulaireÉtape2Stage() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	const localStorageEntreprise = useLocalStorage<OffreDeStageDeposee.Entreprise>(ETAPE_ENTREPRISE);
	const informationsEntreprise = localStorageEntreprise.get();

	const sessionStorageStage = useSessionStorage<OffreDeStageDeposee.Stage>(ETAPE_OFFRE_DE_STAGE);
	const informationsStage = sessionStorageStage.get();

	const [displayDateDeDebutPrecise, setDisplayDateDeDebutPrecise] = useState<boolean>(informationsStage?.dateDeDebutPrecise ? informationsStage.dateDeDebutPrecise === DateDeDebutPrecise.OUI : true);

	useEffect(() => {
		if (!informationsEntreprise) {
			router.push(URL_DEPOSER_OFFRE);
		}
	}, [router, informationsEntreprise]);

	const disableBeforeToday: string = useMemo(() => {
		return new Date().toISOString().split('T')[0];
	}, []);

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const donnéesOffreDeStage = parseDonnéesOffreDeStage(data);
		sessionStorageStage.set(donnéesOffreDeStage);
		return router.push(`${URL_DEPOSER_OFFRE}/localisation`);
	}

	return (
		<FormulaireÉtapeLayout
			étape="Etape 2 sur 3 : Votre offre de stage"
			urlÉtapePrécédente={URL_DEPOSER_OFFRE}
		>
			<StageDeposerOffreFormulaireLayout
				inputsObligatoires={
					<ChampsObligatoires
						informationsStage={informationsStage}
						checked={displayDateDeDebutPrecise}
						onChange={() => setDisplayDateDeDebutPrecise(!displayDateDeDebutPrecise)}
						min={disableBeforeToday}
					/>
				}
				inputsFacultatifs={<ChampsFaculatifs informationsStage={informationsStage}/>}
				formRef={formRef}
				handleFormSubmit={handleFormSubmit}
				boutonValidation={<ButtonComponent
					icon={<Icon name="angle-right"/>}
					iconPosition="right"
					label="Suivant"
					type="submit"
				/>}
			/>
		</FormulaireÉtapeLayout>
	);
};

// TODO (DORO 21-06-2023): à supprimer après la mise en place du nouveau modèle de données
function parseDonnéesOffreDeStage(formData: FormData): OffreDeStageDeposee.Stage {
	return {
		dateDeDebut: formData.get(Stage.DATE_DE_DEBUT_MIN),
		dateDeDebutMax: formData.get(Stage.DATE_DE_DEBUT_MAX ? Stage.DATE_DE_DEBUT_MAX : Stage.DATE_DE_DEBUT_MIN),
		dateDeDebutMin: formData.get(Stage.DATE_DE_DEBUT_MIN),
		dateDeDebutPrecise: formData.get(Stage.DATE_DE_DEBUT_PRECISE),
		descriptionOffre: formData.get(Stage.DESCRIPTION),
		domaineStage: formData.get(Stage.DOMAINE),
		dureeStage: formData.get(Stage.DUREE),
		lienCandidature: formData.get(Stage.LIEN_CANDIDATURE),
		nomOffre: formData.get(Stage.NOM),
		remunerationStage: formData.get(Stage.REMUNERATION),
		teletravail: formData.get(Stage.TELETRAVAIL),
	} as OffreDeStageDeposee.Stage;
}
