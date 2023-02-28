import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useMemo, useRef } from 'react';

import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Option, Select } from '~/client/components/ui/Select/Select';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useSessionStorage from '~/client/hooks/useSessionStorage';
import { OffreDeStageDéposée } from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffre';
import { StageDeposerOffreFormulaireLayout } from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLayout/StageDeposerOffreFormulaireLayout';
import {
	ETAPE_ENTREPRISE,
	ETAPE_OFFRE_DE_STAGE,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';

import styles from './StageDeposerOffreFormulaireStage.module.scss';
import { domaineStage } from './StageDomaines';

const email_regex = '([a-zA-Z0-9!#$%&@\'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)';
const url_regex = '(https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*))';
const EMAIL_OR_URL_REGEX = `^${email_regex}|${url_regex}$`;
const DUREE_MOIS_EN_JOUR = 30;
const UNITE = '€';
const LONGUEUR_MAX_TITRE = 200;

enum Stage {
	DATE_DE_DEBUT = 'dateDebut',
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

const dureeStageList: Option[] = [
	{ libellé: '1 mois', valeur: DUREE_MOIS_EN_JOUR.toString() },
	{ libellé: '2 mois', valeur: (2 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '3 mois', valeur: (3 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '4 mois', valeur: (4 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '5 mois', valeur: (5 * DUREE_MOIS_EN_JOUR).toString() },
	{ libellé: '6 mois', valeur: (6 * DUREE_MOIS_EN_JOUR).toString() },
];

export default function StageDeposerOffreFormulaireStage() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	const localStorageEntreprise = useLocalStorage<OffreDeStageDéposée.Entreprise>(ETAPE_ENTREPRISE);
	const informationsEntreprise = localStorageEntreprise.get();

	const sessionStorageStage = useSessionStorage<OffreDeStageDéposée.Stage>(ETAPE_OFFRE_DE_STAGE);
	const informationsStage = sessionStorageStage.get();

	useEffect(() => {
		if (!informationsEntreprise) {
			router.push(URL_DEPOSER_OFFRE);
		}
	}, [router, informationsEntreprise]);

	const disableBeforeToday: string = useMemo(() => {
		return new Date().toISOString().split('T')[0];
	}, []);

	function ChampsObligatoires() {
		return <>
			<InputText
				label="Indiquez le nom de l’offre de stage (200 caractères maximum)"
				name={Stage.NOM}
				value={informationsStage?.nomOffre}
				placeholder="Exemple : Assistant de recherche (6mois) chez ABC.ENTREPRISE"
				maxLength={LONGUEUR_MAX_TITRE}
				required
				className={styles.inputNomOffre}
			/>
			<InputText
				pattern={EMAIL_OR_URL_REGEX}
				label="Partagez le lien sur lequel les candidats pourront postuler ou une adresse e-mail à laquelle envoyer sa candidature"
				name={Stage.LIEN_CANDIDATURE}
				value={informationsStage?.lienCandidature}
				placeholder="Exemples : https://candidat.pole-emploi.fr/offres/142Y   OU   candidature_PE_technicien@exemple.com"
				required
				className={styles.inputLienCandidature}
			/>
			<TextArea
				className={styles.textareaWrapper}
				id="descriptionOffre"
				label={'Rédigez une description de l’offre de stage (200 caractères minimum)'}
				placeholder="Indiquez des informations sur le stage : les objectifs, les challenges, les missions..."
				name={Stage.DESCRIPTION}
				defaultValue={informationsStage?.descriptionOffre}
				required
				rows={10}
				minLength={200}
			/>
			<InputText
				label="Date de début du stage"
				type="date"
				name={Stage.DATE_DE_DEBUT}
				value={informationsStage?.dateDebut}
				required
				min={disableBeforeToday}
			/>
			<Select
				label="Indiquez la durée du stage"
				name={Stage.DUREE}
				value={informationsStage?.dureeStage}
				placeholder="Sélectionnez une durée"
				optionList={dureeStageList}
				required
			/>
		</>;
	}

	function ChampsFacultatifs() {
		return <>
			<Select
				label="Domaine de l’offre de stage"
				name={Stage.DOMAINE}
				value={informationsStage?.domaineStage}
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
						defaultValue={informationsStage?.remunerationStage}
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
									 defaultChecked={informationsStage?.teletravail === Télétravail.OUI}/>
						<Radio name={Stage.TELETRAVAIL} value="false" label="Non"
									 defaultChecked={informationsStage?.teletravail === Télétravail.NON}/>
					</div>
				</fieldset>
			</div>
		</>;
	}

	function BoutonValidation() {
		return <ButtonComponent
			icon={<Icon name="angle-right"/>}
			iconPosition="right"
			label="Suivant"
			type="submit"
		/>;
	}

	function FormulaireOffreDeStage() {
		return <StageDeposerOffreFormulaireLayout
			inputsObligatoires={<ChampsObligatoires/>}
			inputsFacultatifs={<ChampsFacultatifs/>}
			formRef={formRef}
			handleFormSubmit={handleFormSubmit}
			boutonValidation={<BoutonValidation/>}
		/>;
	}

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
			formulaire={<FormulaireOffreDeStage/>}
			urlÉtapePrécédente={URL_DEPOSER_OFFRE}
		/>
	);
};

function parseDonnéesOffreDeStage(formData: FormData): OffreDeStageDéposée.Stage {
	return {
		dateDebut: formData.get(Stage.DATE_DE_DEBUT),
		descriptionOffre: formData.get(Stage.DESCRIPTION),
		domaineStage: formData.get(Stage.DOMAINE),
		dureeStage: formData.get(Stage.DUREE),
		lienCandidature: formData.get(Stage.LIEN_CANDIDATURE),
		nomOffre: formData.get(Stage.NOM),
		remunerationStage: formData.get(Stage.REMUNERATION),
		teletravail: formData.get(Stage.TELETRAVAIL),
	} as OffreDeStageDéposée.Stage;
}
