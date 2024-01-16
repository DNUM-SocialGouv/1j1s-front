import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { InputDateDeDebut } from '~/client/components/features/OffreDeStage/Déposer/Étape2Stage/InputDateDeDebut';
import { RadioIsDatePrecise } from '~/client/components/features/OffreDeStage/Déposer/Étape2Stage/RadioIsDatePrecise';
import {
	StageDeposerOffreFormulaireLayout,
} from '~/client/components/features/OffreDeStage/Déposer/FormulaireLayout/StageDeposerOffreFormulaireLayout';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { domaineStage } from '~/client/components/features/OffreDeStage/Déposer/StageDomaines';
import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Option, Select } from '~/client/components/ui/Select/Select';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useSessionStorage from '~/client/hooks/useSessionStorage';
import { ETAPE_ENTREPRISE, ETAPE_OFFRE_DE_STAGE, URL_DEPOSER_OFFRE } from '~/pages/stages/deposer-offre/index.page';
import { DomainesStage } from '~/server/stages/repository/domainesStage';
import { emailRegex } from '~/shared/emailRegex';
import { urlRegex } from '~/shared/urlRegex';

import styles from './StageDeposerOffreFormulaireÉtape2Stage.module.scss';

const EMAIL_OR_URL_REGEX = `^${emailRegex}|${urlRegex}$`;
const DUREE_MOIS_EN_JOUR = 30;
const UNITE = '€';
const LONGUEUR_MAX_TITRE = 200;

export enum StageEnum {
	DATE_DE_DEBUT_MIN = 'dateDeDebutMin',
	DATE_DE_DEBUT_MAX = 'dateDeDebutMax',
	IS_DATE_DE_DEBUT_PRECISE = 'isDateDeDebutPrecise',
	NOM = 'nomOffre',
	LIEN_CANDIDATURE = 'lienCandidature',
	DESCRIPTION = 'descriptionOffre',
	DUREE = 'dureeStage',
	DOMAINE = 'domaineStage',
	REMUNERATION = 'remunerationStage',
	TELETRAVAIL = 'teletravail',
}

export enum Teletravail {
	OUI = 'true',
	NON = 'false',
}

export enum IsDateDeDebutPrecise {
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

function ChampsObligatoires(props: { informationsStage: OffreDeStageDeposee.Stage | null }) {
	const [displayDateDeDebutPrecise, setDisplayDateDeDebutPrecise] = useState<boolean>(props.informationsStage?.isDateDeDebutPrecise ? props.informationsStage.isDateDeDebutPrecise === IsDateDeDebutPrecise.OUI : true);

	return <>
		<InputText
			label="Nom de l’offre de stage (200 caractères maximum)"
			name={StageEnum.NOM}
			value={props.informationsStage?.nomOffre}
			placeholder="Exemple : Assistant de recherche (6mois) chez ABC.ENTREPRISE"
			maxLength={LONGUEUR_MAX_TITRE}
			required
			className={styles.inputNomOffre}
		/>
		<InputText
			pattern={EMAIL_OR_URL_REGEX}
			label="Lien sur lequel les candidats pourront postuler ou une adresse e-mail à laquelle envoyer sa candidature"
			name={StageEnum.LIEN_CANDIDATURE}
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
			name={StageEnum.DESCRIPTION}
			defaultValue={props.informationsStage?.descriptionOffre}
			required
			rows={10}
			minLength={200}
		/>
		<fieldset className={styles.contenuDateDeDebut}>
			<legend>Date de début du stage</legend>
			<RadioIsDatePrecise
				checked={displayDateDeDebutPrecise}
				onChange={() => setDisplayDateDeDebutPrecise(!displayDateDeDebutPrecise)}
			/>
			<InputDateDeDebut
				displayDateDeDebutPrecise={displayDateDeDebutPrecise}
				informationsStage={props.informationsStage}
			/>
		</fieldset>
		<Select
			label="Durée du stage"
			name={StageEnum.DUREE}
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
			name={StageEnum.DOMAINE}
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
					name={StageEnum.REMUNERATION}
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
					<Radio name={StageEnum.TELETRAVAIL} value="true" label="Oui"
					       defaultChecked={props.informationsStage?.teletravail === Teletravail.OUI}/>
					<Radio name={StageEnum.TELETRAVAIL} value="false" label="Non"
					       defaultChecked={props.informationsStage?.teletravail === Teletravail.NON}/>
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

	useEffect(() => {
		if (!informationsEntreprise) {
			router.push(URL_DEPOSER_OFFRE);
		}
	}, [router, informationsEntreprise]);

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const donnéesOffreDeStage = parseDonneesOffreDeStage(data);
		sessionStorageStage.set(donnéesOffreDeStage);
		return router.push(`${URL_DEPOSER_OFFRE}/localisation`);
	}

	return (
		<FormulaireÉtapeLayout
			étape="Étape 2 sur 3 : Votre offre de stage"
			urlÉtapePrécédente={URL_DEPOSER_OFFRE}
		>
			<StageDeposerOffreFormulaireLayout
				inputsObligatoires={
					<ChampsObligatoires informationsStage={informationsStage} />
				}
				inputsFacultatifs={<ChampsFaculatifs informationsStage={informationsStage} />}
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

function isDateDeDebutPrecise(formData: FormData): boolean {
	return formData.get(StageEnum.IS_DATE_DE_DEBUT_PRECISE) === IsDateDeDebutPrecise.OUI;
}

function parseDonneesOffreDeStage(formData: FormData): OffreDeStageDeposee.Stage {
	return {
		dateDeDebutMax: !isDateDeDebutPrecise(formData) ? String(formData.get(StageEnum.DATE_DE_DEBUT_MAX)) : String(formData.get(StageEnum.DATE_DE_DEBUT_MIN)),
		dateDeDebutMin: String(formData.get(StageEnum.DATE_DE_DEBUT_MIN)),
		descriptionOffre: String(formData.get(StageEnum.DESCRIPTION)),
		domaineStage: formData.get(StageEnum.DOMAINE) as DomainesStage,
		dureeStage: String(formData.get(StageEnum.DUREE)),
		isDateDeDebutPrecise: formData.get(StageEnum.IS_DATE_DE_DEBUT_PRECISE) as IsDateDeDebutPrecise,
		lienCandidature: String(formData.get(StageEnum.LIEN_CANDIDATURE)),
		nomOffre: String(formData.get(StageEnum.NOM)),
		remunerationStage: String(formData.get(StageEnum.REMUNERATION)),
		teletravail: formData.get(StageEnum.TELETRAVAIL) as Teletravail,
	};
}
