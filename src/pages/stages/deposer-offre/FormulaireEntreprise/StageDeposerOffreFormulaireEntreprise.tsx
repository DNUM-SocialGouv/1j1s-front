import React, { FormEvent } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './StageDeposerOffreFormulaireEntreprise.module.scss';

const EMAIL_REGEX = "^[a-zA-Z0-9!#$%&@'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";


export default function StageDeposerOffreFormulaireEntreprise() {

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape1 = FormulaireOffreStageEtape1(data);
		const stockage = JSON.stringify(formulaireOffreStageEtape1);
		localStorage.setItem('formulaireEtape1',stockage);
	}
	
	return (
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 1 sur 3 : Votre entreprise</div>
			<form className={styles.formulaire} onSubmit={handleFormSubmit}>
				<div className={styles.champsObligatoires}>
					<p>Les champs suivants sont obligatoires</p>
				</div>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Indiquez le nom de l’entreprise ou de l’employeur"
						name="nom"
						placeholder="Exemple : Crédit Agricole, SNCF…"
						required
					/>
					<InputText
						label="Indiquez une adresse mail de contact"
						pattern={EMAIL_REGEX}
						name="email"
						placeholder="Exemple : contactRH@exemple.com"
						required
					/>
					<InputArea
						className={styles.textareaWrapper}
						id="description"
						label="Rédigez une courte description de l’entreprise (500 caractères maximum)"
						placeholder="Indiquez des informations sur votre entreprise : son histoire, des objectifs, des enjeux..."
						name="description"
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
						placeholder="Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3..."
					/>
					<InputText
						label="Indiquez le lien du site de l’entreprise - lien/URL"
						type="url"
						name="site"
						placeholder="Exemple : https://1jeune1solution.gouv.fr"
					/>
				</div>
				<div className={styles.validation}>
					<ButtonComponent
						icon={<Icon name="angle-right"/>}
						iconPosition="right"
						label="Suivant"
						type="submit"
					/>
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
