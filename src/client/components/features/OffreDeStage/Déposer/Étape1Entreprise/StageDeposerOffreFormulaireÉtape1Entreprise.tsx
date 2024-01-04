import { useRouter } from 'next/router';
import React, {
	FormEvent,
	useRef,
} from 'react';

import {
	StageDeposerOffreFormulaireLayout,
} from '~/client/components/features/OffreDeStage/Déposer/FormulaireLayout/StageDeposerOffreFormulaireLayout';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
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

enum InputName {
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
			<Champ>
				<Champ.Label>Nom de l’entreprise ou de l’employeur
					<Champ.Label.Complement>Exemples : Crédit Agricole, SNCF…</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input render={Input}
										 name={InputName.NOM}
										 required
										 maxLength={255}
										 defaultValue={informationsEntreprise?.nomEmployeur}/>
				<Champ.Error/>
				<Champ.Hint>255 caractères maximum</Champ.Hint>
			</Champ>
			<Champ>
				<Champ.Label>Adresse mail de contact
					<Tooltip icon="information" ariaLabel="informations supplémentaires"
									 tooltipId="informations-supplementaires">Cette adresse de contact sera utilisée dans le cas où
						il manquerait des informations pour valider votre demande, ou pour vous informer du statut de cette dernière.
						Cette adresse peut donc être différente de l’adresse sur laquelle il faudra candidater.
					</Tooltip>
					<Champ.Label.Complement>Exemple : contactRH@example.com</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input render={Input}
										 name={InputName.EMAIL}
										 pattern={emailRegex}
										 defaultValue={informationsEntreprise?.emailEmployeur}
										 required/>
				<Champ.Error/>
			</Champ>
			{/*			<Champ className={styles.textareaWrapper}>
				<Champ.Label>Courte description de l’entreprise
					<Champ.Label.Complement>Informations sur votre entreprise : son histoire, des objectifs, des enjeux…</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input render={TextArea}
										 name={InputName.DESCRIPTION}
										 required
										 maxLength={500}
										 rows={10}
										 defaultValue={informationsEntreprise?.descriptionEmployeur}/>
				<Champ.Error/>
				<Champ.Hint>255 caractères maximum</Champ.Hint>
			</Champ>*/}
			<TextArea
				className={styles.textareaWrapper}
				id="description"
				label="Courte description de l’entreprise (500 caractères maximum)"
				placeholder="Informations sur votre entreprise : son histoire, des objectifs, des enjeux..."
				name={InputName.DESCRIPTION}
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
				name={InputName.LOGO}
				value={informationsEntreprise?.logoEmployeur}
				pattern={URL_REGEX}
				placeholder="Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3..."
			/>
			<InputText
				label="Lien du site de l’entreprise - lien/URL"
				type="url"
				name={InputName.SITE}
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
			étape="Étape 1 sur 3 : Votre entreprise"
		>
			<FormulaireEntreprise/>
		</FormulaireÉtapeLayout>
	);
};

function parseDonnéesEntreprise(formData: FormData): OffreDeStageDeposee.Entreprise {
	return {
		descriptionEmployeur: String(formData.get(InputName.DESCRIPTION)),
		emailEmployeur: String(formData.get(InputName.EMAIL)),
		logoEmployeur: String(formData.get(InputName.LOGO)),
		nomEmployeur: String(formData.get(InputName.NOM)),
		siteEmployeur: String(formData.get(InputName.SITE)),
	};
}
