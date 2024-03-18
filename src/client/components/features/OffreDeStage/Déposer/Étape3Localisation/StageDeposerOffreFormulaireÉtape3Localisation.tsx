import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import {
	StageDeposerOffreFormulaireLayout,
} from '~/client/components/features/OffreDeStage/Déposer/FormulaireLayout/StageDeposerOffreFormulaireLayout';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { LoadingButton } from '~/client/components/ui/Button/LoadingButton';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { Input } from '~/client/components/ui/Form/Input';
import { ModalErrorSubmission } from '~/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { paysList } from '~/client/domain/pays';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import useSessionStorage from '~/client/hooks/useSessionStorage';
import { BffStageService } from '~/client/services/stage/bff.stage.service';
import {
	ETAPE_ENTREPRISE,
	ETAPE_LOCALISATION,
	ETAPE_OFFRE_DE_STAGE,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';

enum LocalisationInputName {
	PAYS = 'pays',
	VILLE = 'ville',
	ADRESSE = 'adresse',
	CODE_POSTAL = 'codePostal',
	REGION = 'region',
	DEPARTEMENT = 'departement',
}

export default function StageDeposerOffreFormulaireÉtape3Localisation() {
	const router = useRouter();
	const [isModalErrorSubmitOpen, setIsModalErrorSubmitOpen] = useState<boolean>(false);
	const stageService = useDependency<BffStageService>('stageService');

	const formRef = useRef<HTMLFormElement>(null);

	const [isLoading, setIsLoading] = useState(false);

	const localStorageEntreprise = useLocalStorage<OffreDeStageDeposee.Entreprise>(ETAPE_ENTREPRISE);
	const informationsEntreprise = localStorageEntreprise.get();

	const sessionStorageStage = useSessionStorage<OffreDeStageDeposee.Stage>(ETAPE_OFFRE_DE_STAGE);
	const informationsStage = sessionStorageStage.get();

	const localStorageLocalisation = useLocalStorage<OffreDeStageDeposee.Localisation>(ETAPE_LOCALISATION);
	const informationsLocalisation = localStorageLocalisation.get();

	function getPaysDefaultValue() {
		const paysCodeStored = informationsLocalisation?.pays;
		if (!paysCodeStored) return undefined;

		const paysLabel = paysList.find((pays) => pays.code === paysCodeStored)?.libellé;
		if (!paysLabel) return undefined;

		return { code: paysCodeStored, label: paysLabel };
	}

	const paysDefaultValue = getPaysDefaultValue();

	useEffect(() => {
		if (!informationsEntreprise || !informationsStage) {
			router.push(URL_DEPOSER_OFFRE);
		}
	}, [router, informationsEntreprise, informationsStage]);

	function ChampsObligatoires() {
		return <>
			<ComboboxPays
				paysList={paysList}
				defaultValue={paysDefaultValue}
				label={'Pays'}
				labelComplement={'Exemple : France'}
				valueName={LocalisationInputName.PAYS}
				required
			/>
			<Champ>
				<Champ.Label>
					Ville
					<Champ.Label.Complement>Exemple : Paris</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input
					render={Input}
					name={LocalisationInputName.VILLE}
					required
					defaultValue={informationsLocalisation?.ville}
				/>
				<Champ.Error/>
			</Champ>
			<Champ>
				<Champ.Label>
					Adresse
					<Champ.Label.Complement>Exemple : 127 rue de Grenelle</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input
					render={Input}
					name={LocalisationInputName.ADRESSE}
					required
					defaultValue={informationsLocalisation?.adresse}
				/>
				<Champ.Error/>
			</Champ>
			<Champ>
				<Champ.Label>
					Code postal
					<Champ.Label.Complement>Exemple : 75007</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input
					render={Input}
					name={LocalisationInputName.CODE_POSTAL}
					required
					defaultValue={informationsLocalisation?.codePostal}
				/>
				<Champ.Error/>
			</Champ>
		</>;
	}

	function ChampsFacultatifs() {
		return <>
			<Champ>
				<Champ.Label>
					Région
					<Champ.Label.Complement>Exemple : Île-De-France</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input
					render={Input}
					name={LocalisationInputName.REGION}
					defaultValue={informationsLocalisation?.region}
				/>
				<Champ.Error/>
			</Champ>
			<Champ>
				<Champ.Label>
					Département
					<Champ.Label.Complement>Exemple : Yvelines</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input
					render={Input}
					name={LocalisationInputName.DEPARTEMENT}
					defaultValue={informationsLocalisation?.departement}
				/>
				<Champ.Error/>
			</Champ>
		</>;
	}

	function BoutonValidation() {
		return isLoading
			? <LoadingButton/>
			: <ButtonComponent
				icon={<Icon name="angle-right"/>}
				iconPosition="right"
				label="Envoyer ma demande de dépôt d’offre"
				type="submit"
				disabled={isLoading}
			/>;
	}

	function FormulaireLocalisation() {
		return <StageDeposerOffreFormulaireLayout
			inputsObligatoires={<ChampsObligatoires/>}
			inputsFacultatifs={<ChampsFacultatifs/>}
			formRef={formRef}
			handleFormSubmit={handleFormSubmit}
			boutonValidation={<BoutonValidation/>}
		/>;
	}

	async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		setIsLoading(true);
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
			setIsModalErrorSubmitOpen(true);
			setIsLoading(false);
		}
	}

	return (
		<>
			<FormulaireÉtapeLayout
				étape="Étape 3 sur 3 : Localisation du stage"
				urlÉtapePrécédente={`${URL_DEPOSER_OFFRE}/votre-offre-de-stage`}
			>
				<FormulaireLocalisation/>
			</FormulaireÉtapeLayout>
			<ModalErrorSubmission
				isOpen={isModalErrorSubmitOpen}
				onClose={() => setIsModalErrorSubmitOpen(false)}
				onBackToForm={() => setIsModalErrorSubmitOpen(false)}/>
		</>
	);
};

function parseDonnéesLocalisation(formData: FormData): OffreDeStageDeposee.Localisation {
	return {
		adresse: String(formData.get(LocalisationInputName.ADRESSE)),
		codePostal: String(formData.get(LocalisationInputName.CODE_POSTAL)),
		departement: String(formData.get(LocalisationInputName.DEPARTEMENT)),
		pays: String(formData.get(LocalisationInputName.PAYS)),
		region: String(formData.get(LocalisationInputName.REGION)),
		ville: String(formData.get(LocalisationInputName.VILLE)),
	};
}
