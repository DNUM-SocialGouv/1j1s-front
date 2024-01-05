import { useRouter } from 'next/router';
import React, { FormEvent, useRef } from 'react';

import {
	StageDeposerOffreFormulaireLayout,
} from '~/client/components/features/OffreDeStage/Déposer/FormulaireLayout/StageDeposerOffreFormulaireLayout';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { FormulaireÉtapeLayout } from '~/client/components/layouts/FormulaireEtape/FormulaireEtapeLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import { ETAPE_ENTREPRISE, URL_DEPOSER_OFFRE } from '~/pages/stages/deposer-offre/index.page';
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
			<Champ className={styles.nomEntreprise}>
				<Champ.Label>Nom de l’entreprise ou de l’employeur
					<Champ.Label.Complement>Exemples : Crédit Agricole, SNCF…</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input render={Input}
										 name={InputName.NOM}
										 required
										 type="text"
										 maxLength={255}
										 defaultValue={informationsEntreprise?.nomEmployeur}/>
				<Champ.Error/>
				<Champ.Hint>255 caractères maximum</Champ.Hint>
			</Champ>
			<Champ>
				<Champ.Label>Adresse mail de contact
					<Champ.Label.Complement>Exemple : contactRH@example.com</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input render={Input}
										 name={InputName.EMAIL}
										 pattern={emailRegex}
										 defaultValue={informationsEntreprise?.emailEmployeur}
										 required
										 type="email"/>
				<Champ.Error/>
				<Champ.Hint>
					Cette adresse de contact sera utilisée dans le cas où
					il manquerait des informations pour valider votre demande, ou pour vous informer du statut de cette dernière.
					Cette adresse peut donc être différente de l’adresse sur laquelle il faudra candidater.
				</Champ.Hint>
			</Champ>
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
			<Champ>
				<Champ.Label>Logo de l’entreprise - lien/URL
					<Champ.Label.Complement>Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3…</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input render={Input}
										 type="url"
										 name={InputName.LOGO}
										 defaultValue={informationsEntreprise?.logoEmployeur}
										 pattern={URL_REGEX}/>
				<Champ.Error/>
			</Champ>
			<Champ>
				<Champ.Label>Lien du site de l’entreprise - lien/URL
					<Champ.Label.Complement>Exemple : https://1jeune1solution.gouv.fr</Champ.Label.Complement>
				</Champ.Label>
				<Champ.Input render={Input}
										 type="url"
										 name={InputName.SITE}
										 defaultValue={informationsEntreprise?.siteEmployeur}
										 pattern={URL_REGEX}/>
				<Champ.Error/>
			</Champ>
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
