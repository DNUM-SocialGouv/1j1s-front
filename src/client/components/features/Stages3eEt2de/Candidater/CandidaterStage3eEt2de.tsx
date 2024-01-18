import React from 'react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import styles from '~/client/components/features/Stages3eEt2de/Candidater/CandidaterStage3eEt2de.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
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
			<div className={styles.headerTextContainer}>
				<h1 className={styles.titre}>Je candidate à l’offre de stage de 3e et 2de de l’entreprise <em>{nomEntreprise}</em></h1>
				{/*TODO stage de 3e et 2de ou 3e et 2de ?*/}
				<p className={styles.sousTitre}>Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer vos coordonnées.</p>
				<p className={styles.sousTitre}>Nous allons vous transmettre par e-mail le nom de la personne à contacter, son numéro de téléphone ainsi que des
					conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne
					peuvent pas être communiquées à d’autres personnes.
				</p>
			</div>
		</div>

		<Container className={styles.formulaireContainer}>
			<BackButton className={styles.boutonRetour} label={'Retour à la recherche'}/>

			<p className={styles.mentionChampsObligatoires}>Tous les champs sont obligatoires (sauf mention contraire)</p>

			<form
				aria-label={`Candidater à l’offre de stage de 3e et 2de de l’entreprise ${nomEntreprise}`}
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
					<Champ.Label>Téléphone
						<Champ.Label.Complement>Exemple : 0601020304</Champ.Label.Complement>
					</Champ.Label>
					<Champ.Input render={Input}
											 name="telephone"
											 required
											 type="tel" // todo : ajouter le pattern de validation téléphone
					/>
					<Champ.Error/>
				</Champ>
				<Select
					optionList={appellations.map((appellation) => ({ libellé: appellation.label, valeur: appellation.code }))}
					label="Métier sur lequel porte la demande d’immersion"
					name="appellation"
					required
				/>
				<ButtonComponent className={styles.boutonSoumission} label="Envoyer les informations" type="submit" />{/*TODO pas ouf le wording nan ?*/}
			</form>
			<div className={styles.decharge}>
				<p>
					En cliquant sur &quot;Envoyer les informations&quot;, vous acceptez que vos données à caractère personnel soient
					transmises à l’entreprise {nomEntreprise} pour que celle-ci prenne contact avec vous.
					Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour répondre à
					votre demande. Pour en savoir plus vous pouvez consulter la politique de confidentialité et les CGU de la DGEFP.
				</p>
			</div>
		</Container>
	</>;
}
