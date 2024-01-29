import React, { FormEvent, useState } from 'react';
import styles
	from 'src/client/components/features/Accompagnement/DemandeDeContact/Formulaire/FormulaireDemandeDeContactAccompagnement.module.scss';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { LoadingButton } from '~/client/components/ui/Button/LoadingButton';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';
import { Link } from '~/client/components/ui/Link/Link';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { ageOptions } from '~/client/domain/selectAgeData';
import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { Age, DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { isSuccess } from '~/server/errors/either';
import {
	ContactÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import { emailRegex } from '~/shared/emailRegex';

interface FormulaireDemandeDeContactAccompagnementProps {
	contactÉtablissementAccompagnement: ContactÉtablissementAccompagnement
	onSuccess: () => void;
	onFailure: () => void;
}

export function FormulaireDemandeDeContactAccompagnement({
																													 contactÉtablissementAccompagnement,
																													 onSuccess,
																													 onFailure,
																												 }: FormulaireDemandeDeContactAccompagnementProps) {
	const établissementAccompagnementService = useDependency<ÉtablissementAccompagnementService>('établissementAccompagnementService');
	const [isLoading, setIsLoading] = useState(false);

	async function envoyerFormulaire(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const demandeDeContactAccompagnement = mapDemandeDeContactAccompagnement(data, contactÉtablissementAccompagnement);
		const result = await établissementAccompagnementService.envoyerDemandeContact(demandeDeContactAccompagnement);
		setIsLoading(false);
		if (isSuccess(result)) {
			onSuccess();
		} else {
			onFailure();
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
				pattern={emailRegex}
				label="Adresse e-mail (facultatif)"
				name="mail"
				type="email"
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
			<ComboboxCommune required/>
			<TextArea
				id="commentaire"
				label="Commentaires ou autres informations utiles (facultatif)"
				placeholder="Saisissez votre texte ici..."
				name="commentaire"
				rows={5}
				className={styles.commentaireDemandeDeContact}
			/>
			{isLoading
				? <LoadingButton label="Envoi en cours" className={styles.formulaireValidateButton}/>
				: <ButtonComponent
					type="submit"
					className={styles.formulaireValidateButton}
					label="Envoyer mes informations afin d‘être rappelé(e)"
				/>
			}
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
		commentaire: String(formData.get('commentaire')),
		commune: String(formData.get('libelleCommune')),
		email: String(formData.get('mail')),
		nom: String(formData.get('lastname')),
		prénom: String(formData.get('firstname')),
		téléphone: String(formData.get('phone')),
		établissement: contactÉtablissementAccompagnement,
	};
}
