import React, { FormEvent, useState } from 'react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { Stage3eEt2deService } from '~/client/services/stage3eEt2de/stage3eEt2de.service';
import {
	CandidatureEnPersonneStage3eEt2de,
	CandidatureTelephoneStage3eEt2de,
	ModeDeContact,
} from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
import { MetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de';
import { emailRegex } from '~/shared/emailRegex';

import styles from './FormulaireCandidaterStage3eEt2de.module.scss';

const INSTRUCTION_CANDIDATURE_TELEPHONE = <>
	<p className={styles.sousTitre}>Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer
		vos coordonnées.</p>
	<p className={styles.sousTitre}>Nous allons vous transmettre par e-mail le nom de la personne à contacter, son
		numéro de téléphone ainsi que des
		conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles.
		Elles ne peuvent pas être communiquées à d’autres personnes.
	</p>
</>;

const INSTRUCTION_CANDIDATURE_EN_PERSONNE = <>
	<p className={styles.sousTitre}>Cette entreprise souhaite que vous vous présentiez directement pour candidater.
		Merci de nous indiquer vos coordonnées.</p>
	<p className={styles.sousTitre}>Vous recevrez par e-mail le nom de la personne à contacter ainsi que des
		conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles.
		Elles ne peuvent pas être communiquées à d’autres personnes.
	</p>
</>;

const INSTRUCTION_CANDIDATURE_MAIL = <p className={styles.sousTitre}>Cette entreprise a choisi d’être contactée par e-mail. Veuillez compléter ce formulaire qui sera transmis à l’entreprise.</p>;

export function FormulaireCandidaterStage3eEt2de(props: {
	modeDeContact: ModeDeContact,
	nomEntreprise: string,
	siret: string,
	metiersStage3eEt2de: Array<MetierStage3eEt2de>,
	onSuccess: () => void,
	onFailure: () => void,
}) {
	const {
		modeDeContact,
		nomEntreprise,
		metiersStage3eEt2de,
		siret,
		onSuccess,
		onFailure,
	} = props;

	const stage3eEt2deService = useDependency<Stage3eEt2deService>('stage3eEt2deService');

	const [isLoading, setIsLoading] = useState(false);

	const isMoreThanOneMetier = metiersStage3eEt2de.length > 1 && metiersStage3eEt2de.length !== 0;

	async function envoyerCandidature(event: FormEvent<HTMLFormElement>) {
		setIsLoading(true);
		event?.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const candidature: CandidatureTelephoneStage3eEt2de | CandidatureEnPersonneStage3eEt2de = {
			// NOTE (SULI 25-01-2024): Deux façon de récupérer appellationCode car pour la présence d'un seul métier, on utilise le composant Select et il fournit seulement le label et pas le code
			appellationCode: isMoreThanOneMetier ? String(data.get('metierCode')) : metiersStage3eEt2de[0].code,
			email: String(data.get('email')),
			modeDeContact: modeDeContact === ModeDeContact.PHONE ? ModeDeContact.PHONE : ModeDeContact.IN_PERSON,
			nom: String(data.get('nom')),
			prenom: String(data.get('prenom')),
			siret: siret,
		};
		const resultat = await stage3eEt2deService.candidaterStage3eEt2de(candidature);
		setIsLoading(false);
		if (resultat.instance === 'success') onSuccess();
		if (resultat.instance === 'failure') onFailure();
	}

	return <>
		<div className={styles.header}>
			<div className={styles.headerTextContainer}>
				<h1 className={styles.titre}>Je candidate à l’offre de stage de 3e ou de 2de de
					l’entreprise <em>{nomEntreprise}</em></h1>
				{modeDeContact === ModeDeContact.PHONE && INSTRUCTION_CANDIDATURE_TELEPHONE}
				{modeDeContact === ModeDeContact.IN_PERSON && INSTRUCTION_CANDIDATURE_EN_PERSONNE}
				{modeDeContact === ModeDeContact.EMAIL && INSTRUCTION_CANDIDATURE_MAIL}
			</div>
		</div>

		<Container className={styles.formulaireContainer}>
			<BackButton className={styles.boutonRetour}/>

			<p className={styles.mentionChampsObligatoires}>Tous les champs sont obligatoires (sauf mention contraire)</p>

			<form
				aria-label={`Candidater à l’offre de stage de 3e et 2de de l’entreprise ${nomEntreprise}`}
				onSubmit={envoyerCandidature}
			>
				<Champ>
					<Champ.Label>Prénom
						<Champ.Label.Complement>Exemple : Alexis</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input render={Input}
					             name="prenom"
					             required
					             type="text"
					/>
					<Champ.Error/>
				</Champ>
				<Champ>
					<Champ.Label>Nom
						<Champ.Label.Complement>Exemple : Dupont</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input render={Input}
					             name="nom"
					             required
					             type="text"
					/>
					<Champ.Error/>
				</Champ>
				<Champ>
					<Champ.Label>E-mail
						<Champ.Label.Complement>Exemple : alexis.dupont@example.com</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input render={Input}
					             name="email"
					             required
					             type="email"
					             pattern={emailRegex}
					/>
					<Champ.Error/>
				</Champ>
				{ /* FIXME (DORO 22-01-2024: Ajouter la gestion de readonly dans Select */}
				{isMoreThanOneMetier ?
					<Select
						optionList={metiersStage3eEt2de.map((metier) => ({ libellé: metier.label, valeur: metier.code }))}
						label="Métier sur lequel porte la demande d’immersion"
						name="metierCode"
						required
						labelComplement="Un ou plusieurs métiers ont été renseignés par l’entreprise"
					/>
					:
					<Champ>
						<Champ.Label>
							Métier sur lequel porte la demande d’immersion
							<Champ.Label.Complement className={styles.elementDesactive}>Un ou plusieurs métiers ont été renseignés par
								l’entreprise</Champ.Label.Complement>
						</Champ.Label>
						<Champ.Input render={Input}
						             name="metierCode"
						             required
						             value={metiersStage3eEt2de[0].label}
						             readOnly
						             type="text"
						/>
						<Champ.Error/>
					</Champ>
				}
				<ButtonComponent
					className={styles.boutonSoumission}
					label="Envoyer les informations"
					type="submit"
					disabled={isLoading}
				/>
			</form>
		</Container>
		<div className={styles.decharge}>
			<p>
				Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour
				répondre à votre demande. Pour en savoir plus vous pouvez consulter la politique de confidentialité et les
				CGU de la DGEFP. En cliquant sur &quot;Envoyer mes informations&quot;, vos données seront transmises à la
				mission
				locale de la zone géographique dans laquelle vous résidez pour que celle-ci prenne contact avec vous
			</p>
		</div>
	</>;
}
