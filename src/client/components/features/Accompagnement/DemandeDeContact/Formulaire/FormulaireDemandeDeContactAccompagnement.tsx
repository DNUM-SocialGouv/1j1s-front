import React, { FormEvent, PropsWithChildren } from 'react';
import styles
	from 'src/client/components/features/Accompagnement/DemandeDeContact/Formulaire/FormulaireDemandeDeContactAccompagnement.module.scss';
import { ButtonComponent } from 'src/client/components/ui/Button/ButtonComponent';
import { InputCommune } from 'src/client/components/ui/Form/InputCommune/InputCommune';
import { InputText } from 'src/client/components/ui/Form/InputText/InputText';
import { Link } from 'src/client/components/ui/Link/Link';
import { Select } from 'src/client/components/ui/Select/Select';
import { TextArea } from 'src/client/components/ui/TextArea/TextArea';
import { useDependency } from 'src/client/context/dependenciesContainer.context';
import { ageOptions } from 'src/client/domain/selectAgeData';
import {
	ÉtablissementAccompagnementService,
} from 'src/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { isSuccess } from 'src/server/errors/either';

import { Age, DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import {
	ContactÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

interface FormulaireDemandeDeContactAccompagnementProps {
  contactÉtablissementAccompagnement: ContactÉtablissementAccompagnement

  onSuccess(): void;
}

export function FormulaireDemandeDeContactAccompagnement(props: PropsWithChildren<FormulaireDemandeDeContactAccompagnementProps>) {
	const { contactÉtablissementAccompagnement, onSuccess } = props;
	const établissementAccompagnementService = useDependency<ÉtablissementAccompagnementService>('établissementAccompagnementService');

	async function envoyerFormulaire(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const demandeDeContactAccompagnement = mapDemandeDeContactAccompagnement(data, contactÉtablissementAccompagnement);
		const result = await établissementAccompagnementService.envoyerDemandeContact(demandeDeContactAccompagnement);
		if (isSuccess(result)) {
			onSuccess();
		}
	}

	return (
		<form
			className={styles.formulaire}
			onSubmit={envoyerFormulaire}
		>
			<InputText
				label="Prénom"
				name="firstname"
				autoFocus
				placeholder="Exemple : Jean"
				required
			/>
			<InputText
				label="Nom"
				name="lastname"
				placeholder="Exemple : Dupont"
				required
			/>
			<InputText
				type="email"
				label="Adresse e-mail (facultatif)"
				name="mail"
				placeholder="Exemple : jean.dupont@gmail.com"
			/>
			<InputText
				type="tel"
				pattern="^(\+33|0|0033)[1-9]\d{8}$"
				label="Téléphone"
				name="phone"
				placeholder="Exemple : 0606060606"
				required
			/>
			<Select
				required
				label="Age"
				name="age"
				optionList={ageOptions}
			/>
			<InputCommune
				required
				id="autocomplete-commune"
				libellé=""
				code=""
				placeholder="Exemple: Paris, Béziers..."
				showRadius={false}
			/>
			<TextArea
				id="commentaire"
				label="Vous avez la possibilité de nous faire part de vos commentaires ou toute autres informations que vous jugeriez utiles (facultatif)"
				placeholder="Saisissez votre texte ici..."
				name="commentaire"
				className={styles.formulaireTextArea}
			/>
			<ButtonComponent
				type="submit"
				className={styles.formulaireValidateButton}
				label="Envoyer mes informations afin d‘être rappelé(e)"
			/>
			<div className={styles.formulaireDécharge}>
				<p>
          Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour répondre
          à votre demande. Pour en savoir plus vous pouvez consulter la <Link href="/confidentialite">politique de
          confidentialité</Link> et les <Link href="/cgu">CGU</Link> de la DGEFP. En cliquant sur “Envoyer mes
          informations“ vos données seront transmises à la mission locale de la zone géographique dans laquelle vous
          résidez pour que celle-ci prenne contact avec vous.
				</p>
			</div>
		</form>
	);
}

function mapDemandeDeContactAccompagnement(formData: FormData, contactÉtablissementAccompagnement: ContactÉtablissementAccompagnement): DemandeDeContactAccompagnement {
	return {
		age: Number(formData.get('age')) as Age,
		codeCommune: String(formData.get('codeCommune')),
		commentaire: String(formData.get('commentaire')),
		email: String(formData.get('mail')),
		nom: String(formData.get('lastname')),
		nomCommune: String(formData.get('libelleCommune')),
		prénom: String(formData.get('firstname')),
		téléphone: String(formData.get('phone')),
		établissement: contactÉtablissementAccompagnement,
	};
}
