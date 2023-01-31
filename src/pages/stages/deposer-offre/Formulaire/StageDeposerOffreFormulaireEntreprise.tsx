import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useLocalStorage from '~/client/hooks/useLocalStorage';

import styles from './StageDeposerOffreFormulaire.module.scss';

const EMAIL_REGEX = "^[a-zA-Z0-9!#$%&@'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";

export const LABEL_FORMULAIRE_1 = 'formulaireEtape1';
export const LABEL_FORMULAIRE_2 = 'formulaireEtape2';
export const LABEL_FORMULAIRE_3 = 'formulaireEtape3';

export default function StageDeposerOffreFormulaireEntreprise() {
	const formRef = useRef<HTMLFormElement>(null);

	const [inputNom, setInputNom] = useState('');
	const [inputEmail, setInputEmail] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputLogo, setInputLogo] = useState('');
	const [inputSite, setInputSite] = useState('');
	const router = useRouter();

	const [value, setValue] = useLocalStorage(LABEL_FORMULAIRE_1);

	useEffect(() => {
		if (window) {
			if (value !== null) {
				const storedForm = JSON.parse(value);
				if (formRef.current) {
					setInputNom(storedForm.nom);
					setInputEmail(storedForm.email);
					setInputDescription(storedForm.description);
					setInputLogo(storedForm.logo);
					setInputSite(storedForm.site);
				}
			}
		}
	}, [value]);

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape1 = JSON.stringify(parseFormulaireOffreStageEtape1(data));
		setValue(formulaireOffreStageEtape1);
		return router.push('/stages/deposer-offre/votre-offre-de-stage');
	}
	
	return (
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 1 sur 3 : Votre entreprise</div>
			<form className={styles.formulaire} ref={formRef} onSubmit={handleFormSubmit}>
				<p className={styles.champsObligatoires}>
					Les champs suivants sont obligatoires
				</p>
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
				<p className={styles.champsFacultatifs}>
					Les champs suivants sont facultatifs mais recommandés
				</p>
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
};

function parseFormulaireOffreStageEtape1(formData: FormData) {
	return {
		description: String(formData.get('description')),
		email: String(formData.get('email')),
		logo: String(formData.get('logo')),
		nom: String(formData.get('nom')),
		site: String(formData.get('site')),
	};
}
