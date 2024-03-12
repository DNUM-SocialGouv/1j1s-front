import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import {
	StageDeposerOffreFormulaireLayout,
} from '~/client/components/features/OffreDeStage/Déposer/FormulaireLayout/StageDeposerOffreFormulaireLayout';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { LoadingButton } from '~/client/components/ui/Button/LoadingButton';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { ModalErrorSubmission } from '~/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { paysList } from '~/client/domain/pays';
import { BffStageService } from '~/client/services/stage/bff.stage.service';
import {
	StageDeposerOffreEtape1PersistenceService,
} from '~/client/services/stageDeposerOffreEtape1Persistence/stageDeposerOffreEtape1Persistence.service';
import {
	StageDeposerOffreEtape2PersistenceService,
} from '~/client/services/stageDeposerOffreEtape2Persistence/stageDeposerOffreEtape2Persistence.service';
import {
	StageDeposerOffreEtape3PersistenceService,
} from '~/client/services/stageDeposerOffreEtape3Persistence/stageDeposerOffreEtape3Persistence.service';
import {
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

	const persistenceEntreprise = useDependency<StageDeposerOffreEtape1PersistenceService>('stageDeposerOffreEtape1PersistenceService');
	const informationsEntreprise = persistenceEntreprise.getInformationsEtape1();

	const persistenceStage = useDependency<StageDeposerOffreEtape2PersistenceService>('stageDeposerOffreEtape2PersistenceService');
	const informationsStage = persistenceStage.getInformationsEtape2();

	const persistenceLocalisation = useDependency<StageDeposerOffreEtape3PersistenceService>('stageDeposerOffreEtape3PersistenceService');
	const informationsLocalisation = persistenceLocalisation.getInformationsEtape3();

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
				// FIXME (DORO: 20-02-2024) : Le placeholder devrait être un complément de label
				placeholder={'Exemple : France'}
				label={'Pays'}
				valueName={LocalisationInputName.PAYS}
				required
			/>
			<InputText
				label="Ville"
				name={LocalisationInputName.VILLE}
				placeholder="Exemple : Paris"
				required
				value={informationsLocalisation?.ville}
			/>
			<InputText
				label="Adresse"
				name={LocalisationInputName.ADRESSE}
				placeholder="Exemple : 127 rue de Grenelle"
				required
				value={informationsLocalisation?.adresse}
			/>
			<InputText
				label="Code postal"
				name={LocalisationInputName.CODE_POSTAL}
				placeholder="Exemple : 75007"
				required
				value={informationsLocalisation?.codePostal}
			/>
		</>;
	}

	function ChampsFacultatifs() {
		return <>
			<InputText
				label="Région"
				name={LocalisationInputName.REGION}
				placeholder="Exemple : Île-De-France"
				value={informationsLocalisation?.region}
			/>
			<InputText
				label="Département"
				name={LocalisationInputName.DEPARTEMENT}
				placeholder="Exemple : Yvelines"
				value={informationsLocalisation?.departement}
			/>
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
		persistenceLocalisation.setInformationsEtape3(donnéesLocalisation);

		if (informationsEntreprise !== null && informationsStage !== null) {
			const result = await stageService.enregistrerOffreDeStage(informationsEntreprise, informationsStage, donnéesLocalisation);
			if (result.instance === 'success') {
				persistenceStage.removeInformationsEtape2();
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
