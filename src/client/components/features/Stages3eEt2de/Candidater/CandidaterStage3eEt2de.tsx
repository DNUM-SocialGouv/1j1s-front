import React from 'react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import styles from '~/client/components/features/Stages3eEt2de/Candidater/CandidaterStage3eEt2de.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Select } from '~/client/components/ui/Select/Select';
import { Stage3eEt2deCandidaterPageProps } from '~/pages/stages-3e-et-2de/candidater/index.page';


export default function CandidaterStage3eEt2de(props: Stage3eEt2deCandidaterPageProps) {
	const {
		nomEntreprise,
		siret,
		modeDeContact,
		appellations,
	} = props;

	return <>
		<div className={styles.header}>
			<h1 className={styles.titre}>Je candidate à l’offre de stage de 3e et 2de de l’entreprise {nomEntreprise}</h1>
			{/*TODO stage de 3e et 2de ou 3e et 2de ?*/}
			<p className={styles.sousTitre}>Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer vos coordonnées.</p>
			<p className={styles.sousTitre}>Nous allons vous transmettre par e-mail le nom de la personne à contacter, son numéro de téléphone ainsi que des
				conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne
				peuvent pas être communiquées à d’autres personnes.
			</p>
		</div>

		<Container className={styles.formulaireContainer}>
			<BackButton label={'Retour à la recherche'}/>

			<p>Tous les champs sont obligatoires (sauf mention contraire)</p>

			<form
				aria-label={`Candidater à l’offre de stage de 3e et 2de de l’entreprise ${nomEntreprise}`}
			>
				<InputText
					label="Prénom"
					name="prenom"
					required
				/>
				<InputText
					label="Nom"
					name="nom"
					required
				/>
				<InputText
					label="E-mail"
					name="email"
					required
				/>
				<Select
					optionList={appellations.map((appellation) => ({ libellé: appellation.label, valeur: appellation.code }))}
					label="Appellation"
					name="appellation"
					required
				/>
				<ButtonComponent label="Envoyer les informations" type="submit" />{/*TODO pas ouf le wording nan ?*/}
			</form>
			<p>
				Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour répondre à
				votre demande. Pour en savoir plus vous pouvez consulter la politique de confidentialité et les CGU de la DGEFP.
				En cliquant sur &quot;Envoyer mes informations&quot;, vos données seront transmises à la mission locale de la zone
				géographique dans laquelle vous résidez pour que celle-ci prenne contact avec vous.
			</p>
		</Container>
	</>;
}
