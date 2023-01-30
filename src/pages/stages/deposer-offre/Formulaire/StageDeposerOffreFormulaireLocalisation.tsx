import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useLocalStorage from '~/client/hooks/useLocalStorage';

import styles from './StageDeposerOffreFormulaire.module.scss';

export default function StageDeposerOffreFormulaireLocalisation() {
	const formRef = useRef<HTMLFormElement>(null);

	const [inputPays, setInputPays] = useState('');
	const [inputVille, setInputVille] = useState('');
	const [inputAdresse, setInputAdresse] = useState('');
	const [inputCodePostal, setInputCodePostal] = useState('');
	const [inputRegion, setInputRegion] = useState('');
	const [inputDepartement, setInputDepartement] = useState('');

	const [value, setValue] = useLocalStorage('formulaireEtape3');

	useEffect(() => {
		if (window) {
			if (value !== null) {
				const storedForm = JSON.parse(value);
				if (formRef.current) {
					setInputPays(storedForm.pays);
					setInputVille(storedForm.ville);
					setInputAdresse(storedForm.adresse);
					setInputCodePostal(storedForm.codePostal);
					setInputRegion(storedForm.region);
					setInputDepartement(storedForm.departement);
				}
			}
		}
	}, [value]);

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape3 = JSON.stringify(parseFormulaireOffreStageEtape3(data));
		setValue(formulaireOffreStageEtape3);
	}

	return (
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 3 sur 3 : Localisation du stage</div>
			<Link
				href="/stages/deposer-offre/votre-offre-de-stage"
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
						label="Pays"
						name="pays"
						placeholder="Exemple : France"
						required
						value={inputPays}
					/>
					<InputText
						label="Ville"
						name="ville"
						placeholder="Exemple : Paris"
						required
						value={inputVille}
					/>
					<InputText
						label="Adresse"
						name="adresse"
						placeholder="Exemple : 127 rue de Grenelle"
						required
						value={inputAdresse}
					/>
					<InputText
						label="Code postal"
						name="codePostal"
						placeholder="Exemple : 75007"
						required
						value={inputCodePostal}
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
						value={inputRegion}
					/>
					<InputText
						label="Département"
						name="departement"
						placeholder="Exemple : PARIS"
						value={inputDepartement}
					/>
				</div>
				<div className={styles.validation}>
					<ButtonComponent
						icon={<Icon name="angle-right"/>}
						iconPosition="right"
						label="Envoyer ma demande de dépôt d’offre"
						type="submit"
						className={styles.validationLink}
					/>
				</div>
			</form>
		</Container>
	);
};

function parseFormulaireOffreStageEtape3(formData: FormData) {
	return {
		adresse: String(formData.get('adresse')),
		codePostal: String(formData.get('codePostal')),
		departement: String(formData.get('departement')),
		pays: String(formData.get('pays')),
		region: String(formData.get('region')),
		ville: String(formData.get('ville')),
	};
}
