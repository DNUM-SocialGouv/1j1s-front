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
import { OffreDeStageDéposée } from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffre';
import {
	ETAPE_ENTREPRISE,
	ETAPE_LOCALISATION,
	ETAPE_OFFRE_DE_STAGE,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';

import styles from './StageDeposerOffreFormulaire.module.scss';

enum Localisation {
	PAYS = 'pays',
	VILLE = 'ville',
	ADRESSE = 'adresse',
	CODE_POSTAL = 'codePostal',
	REGION = 'region',
	DEPARTEMENT = 'departement',
}
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

	const localStorageEntreprise = useLocalStorage<OffreDeStageDéposée.Entreprise>(ETAPE_ENTREPRISE);
	const informationsEntreprise = localStorageEntreprise.get();

	const sessionStorageStage = useSessionStorage<OffreDeStageDéposée.Stage>(ETAPE_OFFRE_DE_STAGE);
	const informationsStage = sessionStorageStage.get();

	const localStorageLocalisation = useLocalStorage<OffreDeStageDéposée.Localisation>(ETAPE_LOCALISATION);
	const informationsLocalisation = localStorageLocalisation.get();

	useEffect(() => {
		if (!informationsEntreprise || !informationsStage) {
			router.push(URL_DEPOSER_OFFRE);
		}
	}, [router, informationsEntreprise, informationsStage]);

	useEffect(() => {
		if (informationsLocalisation !== null && formRef.current) {
			setInputPays(informationsLocalisation.pays);
			setInputVille(informationsLocalisation.ville);
			setInputAdresse(informationsLocalisation.adresse);
			setInputCodePostal(informationsLocalisation.codePostal);
			setInputRegion(informationsLocalisation.region || '');
			setInputDepartement(informationsLocalisation.departement || '');
		}
	}, [informationsLocalisation]);

	async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		setSubmitButtonDisabled(true);
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const donnéesLocalisation = parseDonnéesLocalisation(data);
		localStorageLocalisation.set(donnéesLocalisation);

		if (informationsEntreprise !== null && informationsStage !== null) {
			const result = await stageService.enregistrerOffreDeStage(informationsEntreprise, informationsStage, donnéesLocalisation);
			if (result.instance === 'success') {
				sessionStorageStage.remove();
				return router.push(`${URL_DEPOSER_OFFRE}/confirmation-envoi`);
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
						name={Localisation.PAYS}
						placeholder="Exemple : France"
						required
					/>
					<InputText
						label="Ville"
						name={Localisation.VILLE}
						placeholder="Exemple : Paris"
						required
						value={inputVille}
					/>
					<InputText
						label="Adresse"
						name={Localisation.ADRESSE}
						placeholder="Exemple : 127 rue de Grenelle"
						required
						value={inputAdresse}
					/>
					<InputText
						label="Code postal"
						name={Localisation.CODE_POSTAL}
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
						name={Localisation.REGION}
						placeholder="Exemple : Île-De-France"
						value={inputRegion}
					/>
					<InputText
						label="Département"
						name={Localisation.DEPARTEMENT}
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

function parseDonnéesLocalisation(formData: FormData): OffreDeStageDéposée.Localisation {
	return {
		adresse: formData.get(Localisation.ADRESSE),
		codePostal: formData.get(Localisation.CODE_POSTAL),
		departement: formData.get(Localisation.DEPARTEMENT),
		pays: formData.get(Localisation.PAYS),
		region: formData.get(Localisation.REGION),
		ville: formData.get(Localisation.VILLE),
	} as OffreDeStageDéposée.Localisation;
}
