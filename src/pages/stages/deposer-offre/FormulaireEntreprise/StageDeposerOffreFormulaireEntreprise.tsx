import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './StageDeposerOffreFormulaireEntreprise.module.scss';

const EMAIL_REGEX = "^[a-zA-Z0-9!#$%&@'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";
const FORM_NAME = 'formulaireEtape1';

export default function StageDeposerOffreFormulaireEntreprise() {
	const formRef = useRef<HTMLFormElement>(null);

	const [inputNom, setInputNom] = useState('');
	const [inputEmail, setInputEmail] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputLogo, setInputLogo] = useState('');
	const [inputSite, setInputSite] = useState('');

	useEffect(() => {
		if (window) {
			if (localStorage.getItem(FORM_NAME) !== null) {
				const storedForm = JSON.parse(localStorage.getItem(FORM_NAME) || '');
				if (formRef.current) {
					setInputNom(storedForm.nom);
					setInputEmail(storedForm.email);
					setInputDescription(storedForm.description);
					setInputLogo(storedForm.logo);
					setInputSite(storedForm.site);
				}
			}
		}
	}, []);

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape1 = FormulaireOffreStageEtape1(data);
		const stockage = JSON.stringify(formulaireOffreStageEtape1);
		localStorage.setItem(FORM_NAME,stockage);
	}
	
	return (
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 1 sur 3 : Votre entreprise</div>
			<form className={styles.formulaire} ref={formRef} onSubmit={handleFormSubmit}>
				<div className={styles.champsObligatoires}>
					<p>Les champs suivants sont obligatoires</p>
				</div>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Indiquez le nom de l’entreprise ou de l’employeur"
						name="nom"
						value={inputNom}
						placeholder="Exemple : Crédit Agricole, SNCF…"
						required
					/>
					<InputText
						label="Indiquez une adresse mail de contact"
						pattern={EMAIL_REGEX}
						name="email"
						value={inputEmail}
						placeholder="Exemple : contactRH@exemple.com"
						required
					/>
					<InputArea
						className={styles.textareaWrapper}
						id="description"
						label="Rédigez une courte description de l’entreprise (500 caractères maximum)"
						placeholder="Indiquez des informations sur votre entreprise : son histoire, des objectifs, des enjeux..."
						name="description"
						value={inputDescription}
						required
						rows={10}
						maxLength={500}
					/>
				</div>
				<div className={styles.champsFacultatifs}>
					<p>Les champs suivants sont facultatifs mais recommandés</p>
				</div>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Partagez le logo de l’entreprise - lien/URL"
						type="url"
						name="logo"
						value={inputLogo}
						placeholder="Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3..."
					/>
					<InputText
						label="Indiquez le lien du site de l’entreprise - lien/URL"
						type="url"
						name="site"
						value={inputSite}
						placeholder="Exemple : https://1jeune1solution.gouv.fr"
					/>
				</div>
				<div className={styles.validation}>
					<Link
						// icon={<Icon name="angle-right"/>}
						// iconPosition="right"
						// label="Suivant"
						// type="submit"
						appearance={'asPrimaryButton'}
						href="/stages/deposer-offre/votre-offre-de-stage"
						className={styles.validationLink}
					>
						Suivant
					</Link>
				</div>
			</form>
		</Container>
	);
};

function FormulaireOffreStageEtape1(formData: FormData) {
	return {
		description: String(formData.get('description')),
		email: String(formData.get('email')),
		logo: String(formData.get('logo')),
		nom: String(formData.get('nom')),
		site: String(formData.get('site')),
	};
}
