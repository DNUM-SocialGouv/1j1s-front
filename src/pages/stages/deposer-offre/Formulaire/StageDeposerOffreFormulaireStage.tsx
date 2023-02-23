import { useRouter } from 'next/router';
import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Option, Select } from '~/client/components/ui/Select/Select';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useSessionStorage from '~/client/hooks/useSessionStorage';
import { OffreDeStageDéposée } from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffre';
import {
	ETAPE_ENTREPRISE,
	ETAPE_OFFRE_DE_STAGE,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';

import styles from './StageDeposerOffreFormulaire.module.scss';
import { domaineStage } from './StageDomaines';

const email_regex = '([a-zA-Z0-9!#$%&@\'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)';
const url_regex =  '(https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*))';
const EMAIL_OR_URL_REGEX = `^${email_regex}|${url_regex}$`;
const DUREE_MOIS_EN_JOUR = 30;
const UNITE = '€';

enum Stage {
	DATE_DE_DEBUT= 'dateDebut',
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
	const inputTeletravailRef = useRef<HTMLDivElement>(null);

	const [inputNomOffre, setInputNomOffre] = useState('');
	const [inputLienCandidature, setInputLienCandidature] = useState('');
	const [inputDescriptionOffre, setInputDescriptionOffre] = useState('');
	const [inputDateDebut, setInputDateDebut] = useState('');
	const [inputDureeStage, setInputDureeStage] = useState('');
	const [inputDomaineStage, setInputDomaineStage] = useState('');
	const [inputRemunerationStage, setInputRemunerationStage] = useState('');
	const [inputTeletravailStage, setInputTeletravailStage] = useState('');

	const localStorageEntreprise = useLocalStorage<OffreDeStageDéposée.Entreprise>(ETAPE_ENTREPRISE);
	const informationsEntreprise = localStorageEntreprise.get();

	const sessionStorageStage = useSessionStorage<OffreDeStageDéposée.Stage>(ETAPE_OFFRE_DE_STAGE);
	const informationsStage = sessionStorageStage.get();

	useEffect(() => {
		if (!informationsEntreprise) {
			router.push(URL_DEPOSER_OFFRE);
		}
	}, [router, informationsEntreprise]);

	useEffect(() => {
		if (informationsStage !== null && formRef.current) {
			setInputNomOffre(informationsStage.nomOffre);
			setInputLienCandidature(informationsStage.lienCandidature);
			setInputDescriptionOffre(informationsStage.descriptionOffre);
			setInputDateDebut(informationsStage.dateDebut);
			setInputDureeStage(informationsStage.dureeStage);
			setInputDomaineStage(informationsStage.domaineStage  || '');
			setInputRemunerationStage(informationsStage.remunerationStage  || '');
			setInputTeletravailStage(informationsStage.teletravail || '');
		}
	}, [informationsStage]);

	const disableBeforeToday: string = useMemo(() => {
		return new Date().toISOString().split('T')[0];
	}, []);

	const onInputChangeRemuneration = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setInputRemunerationStage(value);
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
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 2 sur 3 : Votre offre de stage</div>
			<Link
				href={URL_DEPOSER_OFFRE}
				appearance="asBackButton"
				className={styles.boutonRetour}
			>
				Retour à l’étape précédente
			</Link>
			<form className={styles.formulaire} onSubmit={handleFormSubmit} ref={formRef}>
				<p className={styles.champsObligatoires}>
					Les champs suivants sont obligatoires
				</p>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Indiquez le nom de l’offre de stage"
						name={Stage.NOM}
						value={inputNomOffre}
						placeholder="Exemple : Assistant de recherche (6mois) chez ABC.ENTREPRISE"
						required
						className={styles.inputNomOffre}
					/>
					<InputText
						pattern={EMAIL_OR_URL_REGEX}
						label="Partagez le lien sur lequel les candidats pourront postuler ou une adresse e-mail à laquelle envoyer sa candidature"
						name={Stage.LIEN_CANDIDATURE}
						value={inputLienCandidature}
						placeholder="Exemples : https://candidat.pole-emploi.fr/offres/142Y   OU   candidature_PE_technicien@exemple.com"
						required
						className={styles.inputLienCandidature}
					/>
					<InputArea
						className={styles.textareaWrapper}
						id="descriptionOffre"
						label={'Rédigez une description de l’offre de stage (200 caractères minimum)'}
						placeholder="Indiquez des informations sur le stage : les objectifs, les challenges, les missions..."
						name={Stage.DESCRIPTION}
						defaultValue={inputDescriptionOffre}
						required
						rows={10}
						minLength={200}
					/>
					<InputText
						label="Date de début du stage"
						type="date"
						name={Stage.DATE_DE_DEBUT}
						value={inputDateDebut}
						required
						min={disableBeforeToday}
					/>
					<Select
						label="Indiquez la durée du stage"
						name={Stage.DUREE}
						value={inputDureeStage}
						placeholder="Sélectionnez une durée"
						optionList={dureeStageList}
						required
					/>
				</div>
				<p className={styles.champsFacultatifs}>
					Les champs suivants sont facultatifs mais recommandés
				</p>
				<div className={styles.bodyFormulaire}>
					<Select
						label="Domaine de l’offre de stage"
						name={Stage.DOMAINE}
						value={inputDomaineStage}
						placeholder="Sélectionnez un domaine"
						optionList={domaineStage}
					/>
					<div className={styles.inputRenumerationWrapper}>
						<label className={styles.labelRemunueration} htmlFor="remunerationStage">Rémunération par mois</label>
						<div className={styles.contenuRemunueration}>
							<input
								id="remunerationStage"
								type="number"
								name={Stage.REMUNERATION}
								placeholder="Exemple : 560"
								min={0}
								value={inputRemunerationStage}
								onChange={onInputChangeRemuneration}
								className={styles.inputRemunueration}
							/>
							<span className={styles.uniteRemunueration}>{UNITE}</span>
						</div>
					</div>
					<div>
						<fieldset className={styles.contenuTeletravail}>
							<legend>Télétravail possible</legend>
							<div ref={inputTeletravailRef} className={styles.inputTeletravail}>
								<Radio name={Stage.TELETRAVAIL} value="true" label="Oui" checked={inputTeletravailStage === Télétravail.OUI} onChange={ () => setInputTeletravailStage(Télétravail.OUI)}/>
								<Radio name={Stage.TELETRAVAIL} value="false" label="Non" checked={inputTeletravailStage === Télétravail.NON} onChange={ () => setInputTeletravailStage(Télétravail.NON)}/>
							</div>
						</fieldset>
					</div>
				</div>
				<div className={styles.validation}>
					<ButtonComponent
						icon={<Icon name="angle-right"/>}
						iconPosition="right"
						label="Suivant"
						type="submit"
						className={styles.validationLink}
					/>
				</div>
			</form>
		</Container>
	);
}

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
