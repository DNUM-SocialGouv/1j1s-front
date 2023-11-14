import { useRouter } from 'next/router';
import React, {
	FormEvent,
	useRef,
} from 'react';

import { StageDeposerOffreFormulaireLayout } from '~/client/components/features/OffreDeStage/Déposer/FormulaireLayout/StageDeposerOffreFormulaireLayout';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Tooltip } from '~/client/components/ui/Tooltip/Tooltip';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import {
	ETAPE_ENTREPRISE,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';
import { emailRegex } from '~/shared/emailRegex';

import styles from './StageDeposerOffreFormulaireÉtape1Entreprise.module.scss';

const URL_REGEX = '(https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*))';

enum Employeur {
	DESCRIPTION = 'descriptionEmployeur',
	EMAIL = 'emailEmployeur',
	LOGO = 'logoEmployeur',
	NOM = 'nomEmployeur',
	SITE = 'siteEmployeur'
}

export default function StageDeposerOffreFormulaireÉtape1Entreprise() {
	const formRef = useRef<HTMLFormElement>(null);

	const router = useRouter();

	const localStorageEntreprise = useLocalStorage<OffreDeStageDeposee.Entreprise>(ETAPE_ENTREPRISE);
	const informationsEntreprise = localStorageEntreprise.get();

	function ChampsObligatoires() {
		return <>
			<InputText
				label="Nom de l’entreprise ou de l’employeur"
				name={Employeur.NOM}
				value={informationsEntreprise?.nomEmployeur}
				placeholder="Exemples : Crédit Agricole, SNCF…"
				required
			/>
			<InputText
				label="Adresse mail de contact"
				pattern={emailRegex}
				name={Employeur.EMAIL}
				value={informationsEntreprise?.emailEmployeur}
				placeholder="Exemple : contactRH@exemple.com"
				required
				tooltip={<Tooltip icon='information' ariaLabel='informations supplémentaires' tooltipId='informations-supplementaires'>Cette adresse de contact sera utilisée dans le cas où il manquerait des informations pour valider votre demande, ou pour vous informer du statut de cette dernière. Cette adresse peut donc être différente de l’adresse sur laquelle il faudra candidater.</Tooltip>}
			/>
			<TextArea
				className={styles.textareaWrapper}
				id="description"
				label="Courte description de l’entreprise (500 caractères maximum)"
				placeholder="Informations sur votre entreprise : son histoire, des objectifs, des enjeux..."
				name={Employeur.DESCRIPTION}
				defaultValue={informationsEntreprise?.descriptionEmployeur}
				required
				rows={10}
				maxLength={500}
			/>
		</>;
	}

	function ChampsFacultatifs() {
		return <>
			<InputText
				label="Logo de l’entreprise - lien/URL"
				type="url"
				name={Employeur.LOGO}
				value={informationsEntreprise?.logoEmployeur}
				pattern={URL_REGEX}
				placeholder="Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3..."
			/>
			<InputText
				label="Lien du site de l’entreprise - lien/URL"
				type="url"
				name={Employeur.SITE}
				value={informationsEntreprise?.siteEmployeur}
				pattern={URL_REGEX}
				placeholder="Exemple : https://1jeune1solution.gouv.fr"
			/>
		</>;
	}

	function BoutonValidation() {
		return <ButtonComponent
			icon={<Icon name="angle-right"/>}
			iconPosition="right"
			label="Suivant"
			type="submit"
		/>;
	}

	function FormulaireEntreprise() {
		return <StageDeposerOffreFormulaireLayout
			inputsObligatoires={<ChampsObligatoires/>}
			inputsFacultatifs={<ChampsFacultatifs/>}
			formRef={formRef}
			handleFormSubmit={handleFormSubmit}
			boutonValidation={<BoutonValidation/>}
		/>;
	}

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const donnéesEntreprise = parseDonnéesEntreprise(data);
		localStorageEntreprise.set(donnéesEntreprise);
		return router.push(`${URL_DEPOSER_OFFRE}/votre-offre-de-stage`);
	}

	return (
		<FormulaireÉtapeLayout
			étape="Etape 1 sur 3 : Votre entreprise"
		>
			<FormulaireEntreprise/>
		</FormulaireÉtapeLayout>
	);
};

function parseDonnéesEntreprise(formData: FormData): OffreDeStageDeposee.Entreprise {
	return {
		descriptionEmployeur: String(formData.get(Employeur.DESCRIPTION)),
		emailEmployeur: String(formData.get(Employeur.EMAIL)),
		logoEmployeur: String(formData.get(Employeur.LOGO)),
		nomEmployeur: String(formData.get(Employeur.NOM)),
		siteEmployeur: String(formData.get(Employeur.SITE)),
	};
}
