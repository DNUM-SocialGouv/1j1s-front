import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Option, Select } from '~/client/components/ui/Select/Select';

import styles from './StageDeposerOffreFormulaire.module.scss';
import { domaineStage } from './StageDomaines';

const email_regex = '([a-zA-Z0-9!#$%&@\'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)';
const url_regex =  '(https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*))';
const EMAIL_OR_URL_REGEX = `^${email_regex}|${url_regex}$`;
const DUREEMOIS = 30;
const UNITE = '€';

const dureeStageList: Option[] = [
	{ libellé: '1 mois', valeur: DUREEMOIS.toString() },
	{ libellé: '2 mois', valeur: (2 * DUREEMOIS).toString() },
	{ libellé: '3 mois', valeur: (3 * DUREEMOIS).toString() },
	{ libellé: '4 mois', valeur: (4 * DUREEMOIS).toString() },
	{ libellé: '5 mois', valeur: (5 * DUREEMOIS).toString() },
	{ libellé: '6 mois', valeur: (6 * DUREEMOIS).toString() },
];

export default function StageDeposerOffreFormulaireStage() {
	const formRef = useRef<HTMLFormElement>(null);
	const inputTeletravailRef = useRef<HTMLDivElement>(null);

	const [inputNomOffre, setInputNomOffre] = useState('');
	const [inputLienCandidature, setInputLienCandidature] = useState('');
	const [inputDescriptionOffre, setInputDescriptionOffre] = useState('');
	const [inputDateDebut, setInputDateDebut] = useState('');
	const [inputDureeStage, setInputDureeStage] = useState('');
	const [inputDomaineStage, setInputDomaineStage] = useState('');
	const [inputRemunerationStage, setInputRemunerationStage] = useState('');


	useEffect(() => {
		if (window) {
			if (localStorage.getItem('formulaireEtape2') !== null) {
				const storedForm = JSON.parse(localStorage.getItem('formulaireEtape2') || '');
				if (formRef.current) {
					setInputNomOffre(storedForm.nomOffre);
					setInputLienCandidature(storedForm.lienCandidature);
					setInputDescriptionOffre(storedForm.descriptionOffre);
					setInputDateDebut(storedForm.dateDebut);
					setInputDureeStage(storedForm.dureeStage);
					setInputDomaineStage(storedForm.domaineStage);
					setInputRemunerationStage(storedForm.remunerationStage);

					if (storedForm['teletravail'] === String(true)) {
						inputTeletravailRef.current?.children[0].children[0].setAttribute('checked', String(true));
					} else if (storedForm['teletravail'] === String(false)) {
						inputTeletravailRef.current?.children[1].children[0].setAttribute('checked', String(true));
					}
				}
			}
		}
	}, []);

	const onInputChangeRemuneration = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setInputRemunerationStage(value);
	}, []);

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape2 = FormulaireOffreStageEtape2(data);
		const stockage = JSON.stringify(formulaireOffreStageEtape2);
		localStorage.setItem('formulaireEtape2',stockage);
	}
	
	return (
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 2 sur 3 : Votre offre de stage</div>
			<Link
				href="/stages/deposer-offre"
				appearance="asBackButton"
				className={styles.boutonRetour}
			>
				Retour à l’étape précédente
			</Link>
			<form className={styles.formulaire} onSubmit={handleFormSubmit} ref={formRef}>
				<div className={styles.champsObligatoires}>
					<p>Les champs suivants sont obligatoires</p>
				</div>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Indiquez le nom de l’offre de stage"
						name="nomOffre"
						value={inputNomOffre}
						placeholder="Exemple : Assistant de recherche (6mois) chez ABC.ENTREPRISE"
						required
						className={styles.inputNomOffre}
					/>
					<InputText
						pattern={EMAIL_OR_URL_REGEX}
						label="Partagez le lien sur lequel les candidats pourront postuler ou une adresse e-mail à laquelle envoyer sa candidature"
						name="lienCandidature"
						value={inputLienCandidature}
						placeholder="Exemples : https://candidat.pole-emploi.fr/offres/142Y   OU   candidature_PE_technicien@exemple.com"
						required
						className={styles.inputLienCandidature}
					/>
					<InputArea
						className={styles.textareaWrapper}
						id="descriptionOffre"
						label="Rédigez une description de l’offre de stage"
						placeholder="Indiquez des informations sur le stage : les objectifs, les challenges, les missions..."
						name="descriptionOffre"
						value={inputDescriptionOffre}
						required
						rows={10}
						minLength={200}
					/>
					<InputText
						label="Date de début du stage"
						type="date"
						name="dateDebut"
						value={inputDateDebut}
						required
					/>
					<Select
						label="Indiquez la durée du stage"
						name="dureeStage"
						value={inputDureeStage}
						placeholder="Sélectionnez une durée"
						optionList={dureeStageList}
						required
					/>
				</div>
				<div className={styles.champsFacultatifs}>
					<p>Les champs suivants sont facultatifs mais recommandés</p>
				</div>
				<div className={styles.bodyFormulaire}>
					<Select
						label="Domaine de l’offre de stage"
						name="domaineStage"
						value={inputDomaineStage}
						placeholder="Sélectionnez un domaine"
						optionList={domaineStage}
					/>
					<div className={styles.inputRenumerationWrapper}>
						<label htmlFor="remunerationStage">Rémunération</label>
						<div>
							<input
								id="remunerationStage"
								type="number"
								name="remunerationStage"
								placeholder="Exemple : 560"
								min={0}
								value={inputRemunerationStage}
								onChange={onInputChangeRemuneration}
							/>
							<span>{UNITE}</span>
						</div>
					</div>
					<div>
						<label htmlFor="teletravailId">Télétravail possible</label>
						<div id="teletravailId" ref={inputTeletravailRef} className={styles.inputTeletravail}>
							<Radio name="teletravail" value="true" label="Oui" className={styles.inputTeletravailRadio}/>
							<Radio name="teletravail" value="false" label="Non"/>
						</div>
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

function FormulaireOffreStageEtape2(formData: FormData) {
	return {
		dateDebut: String(formData.get('dateDebut')),
		descriptionOffre: String(formData.get('descriptionOffre')),
		domaineStage: String(formData.get('domaineStage')),
		dureeStage: String(formData.get('dureeStage')),
		lienCandidature: String(formData.get('lienCandidature')),
		nomOffre: String(formData.get('nomOffre')),
		remunerationStage: String(formData.get('remunerationStage')),
		teletravailNon: String(formData.get('teletravail')),
		teletravailOui: String(formData.get('teletravail')),
	};
}
