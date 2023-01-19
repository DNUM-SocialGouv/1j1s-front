import React, { FormEvent } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './StageDeposerOffreFormulaireLocalisation.module.scss';

export default function StageDeposerOffreFormulaireLocalisation() {

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape3 = FormulaireOffreStageEtape3(data);
		const stockage = JSON.stringify(formulaireOffreStageEtape3);
		localStorage.setItem('formulaireEtape3',stockage);
	}

	return (
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 3 sur 3 : Localisation du stage</div>
			<form className={styles.formulaire} onSubmit={handleFormSubmit}>
				<div className={styles.champsObligatoires}>
					<p>Les champs suivants sont obligatoires</p>
				</div>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Pays"
						name="pays"
						placeholder="Exemple : France"
						required
					/>
					<InputText
						label="Ville"
						name="ville"
						placeholder="Exemple : Paris"
						required
					/>
					<InputText
						label="Adresse"
						name="adresse"
						placeholder="Exemple : 127 rue de Grenelle"
						required
					/>
					<InputText
						label="Code postal"
						name="code_postal"
						placeholder="Exemple : 75007"
						required
					/>
				</div>
				<div className={styles.champsFacultatifs}>
					<p>Les champs suivants sont facultatifs mais recommandés</p>
				</div>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Région"
						name="region"
						placeholder="Exemple : Île-De-France"
					/>
					<InputText
						label="Département"
						name="departement"
						placeholder="Exemple : PARIS"
					/>
				</div>
				<div className={styles.validation}>
					<ButtonComponent
						icon={<Icon name="angle-right"/>}
						iconPosition="right"
						label="Envoyer ma demande de dépôt d’offre"
						type="submit"
					/>
				</div>
			</form>
		</Container>
	);
};

function FormulaireOffreStageEtape3(formData: FormData) {
	return {
		adresse: String(formData.get('adresse')),
		code_postal: String(formData.get('code_postal')),
		departement: String(formData.get('departement')),
		pays: String(formData.get('pays')),
		region: String(formData.get('region')),
		ville: String(formData.get('ville')),
	};
}
