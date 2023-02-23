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
import { StageService } from '~/client/services/stage/stage.service';
import { removeNullOrEmptyValue } from '~/client/utils/removeNullOrEmptyValue.util';
import {
	LABEL_FORMULAIRE_1,
	LABEL_FORMULAIRE_2,
	LABEL_FORMULAIRE_3,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';
import {
	EmployeurDepotStage,
	LocalisationDepotStageIndexée,
	OffreDeStageDepot,
} from '~/server/cms/domain/offreDeStage.type';
import { isSuccess } from '~/server/errors/either';

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
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

	const [valueEtape1] = useLocalStorage(LABEL_FORMULAIRE_1);

	const [valueEtape2, , clearSessionStorage] = useSessionStorage(LABEL_FORMULAIRE_2);

	const [valueEtape3, setValueEtape3] = useLocalStorage(LABEL_FORMULAIRE_3);

	useEffect(() => {
		if (!valueEtape1 || !valueEtape2) {
			router.push(URL_DEPOSER_OFFRE);
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

	function retrieveForm(formulaireOffreStageEtape1: string, formulaireOffreStageEtape2: string, formulaireOffreStageEtape3: string) {
		const etape1Data = JSON.parse(formulaireOffreStageEtape1);
		const etape2Data = JSON.parse(formulaireOffreStageEtape2);
		const etape3Data = JSON.parse(formulaireOffreStageEtape3);

		const formData: OffreDeStageDepot = {
			dateDeDebut: etape2Data.dateDebut,
			description: etape2Data.descriptionOffre,
			domaine: etape2Data.domaineStage,
			duree: etape2Data.dureeStage,
			employeur: {
				description: etape1Data.descriptionEmployeur,
				email: etape1Data.emailEmployeur,
				logoUrl: etape1Data.logoEmployeur || null,
				nom: etape1Data.nomEmployeur,
				siteUrl: etape1Data.siteEmployeur || null,
			} as EmployeurDepotStage,
			localisation: {
				adresse: etape3Data.adresse,
				codePostal: etape3Data.codePostal,
				departement: etape3Data.departement || null,
				pays: etape3Data.pays,
				region: etape3Data.region || null,
				ville: etape3Data.ville,
			} as LocalisationDepotStageIndexée,
			remunerationBase: etape2Data.remunerationStage ?? null,
			teletravailPossible: etape2Data.teletravail ? etape2Data.teletravail === 'true' : null,
			titre: etape2Data.nomOffre,
			urlDeCandidature: etape2Data.lienCandidature.startsWith('http') ? etape2Data.lienCandidature : 'mailto:' + etape2Data.lienCandidature,
		};
		return removeNullOrEmptyValue<OffreDeStageDepot>(formData);
	}

	async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		setSubmitButtonDisabled(true);
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const formulaireOffreStageEtape3 = JSON.stringify(mapFormulaireOffreStageEtape3(data));
		setValueEtape3(formulaireOffreStageEtape3);
		if (valueEtape1 !== null && valueEtape2 !== null) {
			const formattedData = retrieveForm(valueEtape1, valueEtape2, formulaireOffreStageEtape3);
			const result = await stageService.enregistrerOffreDeStage(formattedData);
			if (isSuccess(result)) {
				clearSessionStorage();
				return router.push('/stages/deposer-offre/confirmation-envoi');
			}
			setSubmitButtonDisabled(false);
		}

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
			<form className={styles.formulaire} onSubmit={handleFormSubmit} ref={formRef} aria-label='dépôt offre de stage'>
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
						placeholder="Exemple : Yvelines"
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
						disabled={submitButtonDisabled}
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
