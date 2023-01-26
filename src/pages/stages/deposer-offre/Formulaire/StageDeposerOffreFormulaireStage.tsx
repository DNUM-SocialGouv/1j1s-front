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

	const [valueEtape1] = useLocalStorage('formulaireEtape1');

	const [valueEtape2, setValueEtape2] = useSessionStorage('formulaireEtape2');


	useEffect(() => {
		if (!valueEtape1){
			router.push('/stages/deposer-offre');
		}
	}, [valueEtape1]);

	useEffect(() => {
		if (valueEtape2 !== null) {
			const storedForm = JSON.parse(valueEtape2);
			if (formRef.current) {
				setInputNomOffre(storedForm.nomOffre);
				setInputLienCandidature(storedForm.lienCandidature);
				setInputDescriptionOffre(storedForm.descriptionOffre);
				setInputDateDebut(storedForm.dateDebut);
				setInputDureeStage(storedForm.dureeStage);
				setInputDomaineStage(storedForm.domaineStage);
				setInputRemunerationStage(storedForm.remunerationStage);
				setInputTeletravailStage(storedForm.teletravail);
			}
		}
	}, [valueEtape2]);

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
		const formulaireOffreStageEtape2 = JSON.stringify(parseFormulaireOffreStageEtape2(data));
		setValueEtape2(formulaireOffreStageEtape2);
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
				<p className={styles.champsObligatoires}>
					Les champs suivants sont obligatoires
				</p>
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
						label="Rédigez une description de l’offre de stage (200 caractères minimum)"
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
						min={disableBeforeToday}
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
				<p className={styles.champsFacultatifs}>
					Les champs suivants sont facultatifs mais recommandés
				</p>
				<div className={styles.bodyFormulaire}>
					<Select
						label="Domaine de l’offre de stage"
						name="domaineStage"
						value={inputDomaineStage}
						placeholder="Sélectionnez un domaine"
						optionList={domaineStage}
					/>
					<div className={styles.inputRenumerationWrapper}>
						<label className={styles.labelRemunueration} htmlFor="remunerationStage">Rémunération</label>
						<div className={styles.contenuRemunueration}>
							<input
								id="remunerationStage"
								type="number"
								name="remunerationStage"
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
								<Radio name="teletravail" value="true" label="Oui" checked={inputTeletravailStage === 'true'} onChange={ () => setInputTeletravailStage('true')}/>
								<Radio name="teletravail" value="false" label="Non" checked={inputTeletravailStage === 'false'} onChange={ () => setInputTeletravailStage('false')}/>
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

function parseFormulaireOffreStageEtape2(formData: FormData) {
	return {
		dateDebut: String(formData.get('dateDebut')),
		descriptionOffre: String(formData.get('descriptionOffre')),
		domaineStage: String(formData.get('domaineStage')),
		dureeStage: String(formData.get('dureeStage')),
		lienCandidature: String(formData.get('lienCandidature')),
		nomOffre: String(formData.get('nomOffre')),
		remunerationStage: String(formData.get('remunerationStage')),
		teletravail: String(formData.get('teletravail')),
	};
}
