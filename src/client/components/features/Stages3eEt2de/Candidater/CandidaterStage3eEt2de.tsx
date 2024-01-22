import React from 'react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import styles from '~/client/components/features/Stages3eEt2de/Candidater/CandidaterStage3eEt2de.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
import { Select } from '~/client/components/ui/Select/Select';
import { Stage3eEt2deCandidaterPageProps } from '~/pages/stages-3e-et-2de/candidater/index.page';


export default function CandidaterStage3eEt2de(props: Stage3eEt2deCandidaterPageProps) {
	const {
		nomEntreprise,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		siret,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		modeDeContact,
		appellations,
	} = props;

	return <>
		<div className={styles.header}>
			<div className={styles.headerTextContainer}>
				<h1 className={styles.titre}>Je candidate à l’offre de stage de 3e ou de 2de de l’entreprise <em>{nomEntreprise}</em></h1>
				<p className={styles.sousTitre}>Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer vos coordonnées.</p>
				<p className={styles.sousTitre}>Nous allons vous transmettre par e-mail le nom de la personne à contacter, son numéro de téléphone ainsi que des
					conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne
					peuvent pas être communiquées à d’autres personnes.
				</p>
			</div>
		</div>

		<Container className={styles.formulaireContainer}>
			<BackButton className={styles.boutonRetour}/>

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
				{ /* FIXME (DORO 22-01-2024: Ajouter la gestion de disabled dans Select */ }
				{ appellations.length > 1 ?
					<Select
						optionList={appellations.map((appellation) => ({ libellé: appellation.label, valeur: appellation.code }))}
						label="Métier sur lequel porte la demande d’immersion"
						name="appellation"
						required
						labelComplement="Un ou plusieurs métiers ont été renseignés par l’entreprise"
					/>
					:
					<Champ>
						{ /* FIXME (DORO 22-01-2024): Embarquer la gestion de l'etat désactivé (voir UI kit) */ }
						<Champ.Label className={styles.elementDesactive}>
							Métier sur lequel porte la demande d’immersion
							<Champ.Label.Complement className={styles.elementDesactive}>Un ou plusieurs métiers ont été renseignés par l’entreprise</Champ.Label.Complement>
						</Champ.Label>
						<Champ.Input render={Input}
												 name="appellation"
												 required
												 value={appellations[0].label}
												 disabled
						             className={styles.elementDesactive}
						             type="text"
						/>
						<Champ.Error/>
					</Champ>
				}
				<ButtonComponent className={styles.boutonSoumission} label="Envoyer les informations" type="submit" />{/*TODO pas ouf le wording nan ?*/}
			</form>
			<div className={styles.decharge}>
				<p>
					Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP pour
					répondre à votre demande. Pour en savoir plus vous pouvez consulter la politique de confidentialité et les
					CGU de la DGEFP. En cliquant sur &quot;Envoyer mes informations&quot;, vos données seront transmises à la mission
					locale de la zone géographique dans laquelle vous résidez pour que celle-ci prenne contact avec vous
				</p>
			</div>
		</Container>
	</>;
}
