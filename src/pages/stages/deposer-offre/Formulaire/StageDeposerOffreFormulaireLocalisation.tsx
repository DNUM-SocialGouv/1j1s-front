import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionPays
	from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionPays/InputAutocomplétionPays';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useSessionStorage from '~/client/hooks/useSessionStorage';
import {
	OffreDeStageFormulaire,
	OffreDeStageFormulaireNotFormatted,
	StageService,
} from '~/client/services/stage/stage.service';
import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';
import {
	LABEL_FORMULAIRE_1,
	LABEL_FORMULAIRE_2, LABEL_FORMULAIRE_3,
} from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireEntreprise';

import styles from './StageDeposerOffreFormulaire.module.scss';

export default function StageDeposerOffreFormulaireLocalisation() {
	const router = useRouter();
	const stageService = useDependency<StageService>('stageService');

	const formRef = useRef<HTMLFormElement>(null);

	const [inputPays, setInputPays] = useState('');
	const [inputVille, setInputVille] = useState('');
	const [inputAdresse, setInputAdresse] = useState('');
	const [inputCodePostal, setInputCodePostal] = useState('');
	const [inputRegion, setInputRegion] = useState('');
	const [inputDepartement, setInputDepartement] = useState('');

	const [valueEtape1] = useLocalStorage(LABEL_FORMULAIRE_1);

	const [valueEtape2] = useSessionStorage(LABEL_FORMULAIRE_2);

	const [valueEtape3, setValueEtape3] = useLocalStorage(LABEL_FORMULAIRE_3);

	useEffect(() => {
		if (!valueEtape1 || !valueEtape2) {
			router.push('/stages/deposer-offre');
		}
	}, [router, valueEtape1, valueEtape2]);

	useEffect(() => {
		if (window && valueEtape3 !== null) {
			const storedForm = JSON.parse(valueEtape3);
			if (formRef.current) {
				setInputPays(storedForm.pays);
				setInputVille(storedForm.ville);
				setInputAdresse(storedForm.adresse);
				setInputCodePostal(storedForm.codePostal);
				setInputRegion(storedForm.region);
				setInputDepartement(storedForm.departement);
			}
		}
	}, [valueEtape3]);

	function formatFormulaire(formData: OffreDeStageFormulaireNotFormatted): OffreDeStageFormulaire {
		const formattedData = removeNullOrEmptyValue(formData) as unknown as OffreDeStageFormulaire;
		if (formData.teletravail === 'true' || formData.teletravail === 'false') {
			formattedData.teletravail = formData.teletravail === 'true';
		}
		if (!formattedData.lienCandidature.startsWith('http')) {
			formattedData.lienCandidature = 'mailto:' + formattedData.lienCandidature;
		}
		return formattedData;
	}

	async function retrieveForm(formulaireOffreStageEtape1: string, formulaireOffreStageEtape2: string, formulaireOffreStageEtape3: string) {
		// Transformer en object
		const formData = {
			...JSON.parse(formulaireOffreStageEtape1),
			...JSON.parse(formulaireOffreStageEtape2),
			...JSON.parse(formulaireOffreStageEtape3),
		};
		const formattedData = formatFormulaire(formData);
		// Envoyer dans strapi
		const result = await stageService.enregistrerOffreDeStage(formattedData);
		if (result.instance === 'success') {
			// passer à la page suivante
		}
	}

	async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape3 = JSON.stringify(mapFormulaireOffreStageEtape3(data));
		setValueEtape3(formulaireOffreStageEtape3);
		if (valueEtape1 !== null && valueEtape2 !== null) {
			await retrieveForm(valueEtape1, valueEtape2, formulaireOffreStageEtape3);
		}
		return router.push('/stages/deposer-offre/confirmation-envoi');
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
				<p className={styles.champsObligatoires}>
					Les champs suivants sont obligatoires
				</p>
				<div className={styles.bodyFormulaire}>
					<InputAutocomplétionPays
						codePays={inputPays}
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
				<p className={styles.champsFacultatifs}>
					Les champs suivants sont facultatifs mais recommandés
				</p>
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

function mapFormulaireOffreStageEtape3(formData: FormData) {
	return {
		adresse: formData.get('adresse'),
		codePostal: formData.get('codePostal'),
		departement: formData.get('departement'),
		pays: formData.get('pays'),
		region: formData.get('region'),
		ville: formData.get('ville'),
	};
}
