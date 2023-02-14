import React, { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';

import { DéchargeRGPD } from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import InputAutocomplétionSecteurActivité, {
	SecteurActivité,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import {
	Hero,
	HeroPrimaryText,
	HeroSecondaryText,
} from '~/client/components/ui/Hero/Hero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import styles
	from '~/pages/je-recrute-afpr-poei/inscription/index.module.scss';
import { TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

const EMAIL_REGEX = "^[a-zA-Z0-9!#$%&@'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";

export type FormulairesPoleEmploi = FormulaireÉtape1Props & FormulaireÉtape2Props & FormulaireÉtape3Props;

interface FormulaireÉtape1Props {
	nomSociété: string;
	codePostal: string;
	ville: string;
	siret: string;
	secteur: string;
	taille: string;
}

interface FormulaireÉtape2Props {
	nom: string;
	prénom: string;
	téléphone: string;
	email: string;
	travail: string;
}

interface FormulaireÉtape3Props {
	nombreARecruter: string;
	commentaire: string;
}

enum Étape {
	ETAPE_1 = 'Etape 1 sur 3',
	ETAPE_2 = 'Etape 2 sur 3',
	ETAPE_3 = 'Etape 3 sur 3',
}

const taillesEntreprises = Object.entries(TailleDEntreprise).map(([valeur, libellé]) => ({ libellé, valeur }));

export default function JeRecruteAfprPoeiInscription() {
	const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');
	const [étape, setÉtape] = useState<Étape>(Étape.ETAPE_1);
	const [isFormSuccessfullySent, setIsFormSuccessfullySent] = useState<boolean>(false);
	const [formulaireÉtape1, setFormulaireÉtape1] = useState<FormulaireÉtape1Props>({
		codePostal: '',
		nomSociété: '',
		secteur: '',
		siret: '',
		taille: '',
		ville: '',
	});

	const [formulaireÉtape2, setFormulaireÉtape2] = useState<FormulaireÉtape2Props>({
		email: '',
		nom: '',
		prénom: '',
		travail: '',
		téléphone: '',
	});

	const [formulaireÉtape3, setFormulaireÉtape3] = useState<FormulaireÉtape3Props>({
		commentaire: '',
		nombreARecruter: '',
	});

	const isPremièreÉtape = useMemo(() => étape === Étape.ETAPE_1, [étape]);
	const isDeuxièmeÉtape = useMemo(() => étape === Étape.ETAPE_2, [étape]);
	const isTroisièmeÉtape = useMemo(() => étape === Étape.ETAPE_3, [étape]);
	const isPremièreÉtapeValid = useMemo(() => Object.values(formulaireÉtape1).every((value) => value.length > 0), [formulaireÉtape1]);
	const isDeuxièmeÉtapeValid = useMemo(() => Object.values(formulaireÉtape2).every((value) => value.length > 0), [formulaireÉtape2]);

	const [autocomplétionCommuneValeur, setAutocomplétionCommuneValeur] = useState<Commune>();
	const [secteurActivitéValeur, setSecteurActivitéValeur] = useState<SecteurActivité>();

	const redirectionÉtape2 = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		return (isPremièreÉtape && isPremièreÉtapeValid) && setÉtape(Étape.ETAPE_2);
	}, [isPremièreÉtape, isPremièreÉtapeValid]);

	const redirectionÉtape3 = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		isDeuxièmeÉtape && isDeuxièmeÉtapeValid && setÉtape(Étape.ETAPE_3);
	}, [isDeuxièmeÉtape, isDeuxièmeÉtapeValid]);

	const retourÉtape1 = useCallback(() => {
		setÉtape(Étape.ETAPE_1);
	}, []);

	const retourÉtape2 = useCallback(() => {
		setÉtape(Étape.ETAPE_2);
	}, []);

	const sendForm = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isPremièreÉtapeValid && isDeuxièmeÉtapeValid) {
			const response = await demandeDeContactService.envoyerPourLePOE({ ...formulaireÉtape1, ...formulaireÉtape2, ...formulaireÉtape3 });

			if (isSuccess(response)) {
				setIsFormSuccessfullySent(true);
			}
		}
	}, [isPremièreÉtapeValid, isDeuxièmeÉtapeValid, formulaireÉtape1, formulaireÉtape2, formulaireÉtape3, demandeDeContactService]);

	return (
		<main id="contenu">
			<Head
				title="Je forme les jeunes grâce à l‘emploi"
				description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
				robots="index,follow"
			/>
			{!isFormSuccessfullySent &&
        <>
        	<Hero>
        		<h1>
        			<HeroPrimaryText className={styles.heroTitle}>
                Vous avez besoin d’accompagnement pour bénéficier d’une aide à la formation avant l’embauche
        			</HeroPrimaryText>
        		</h1>
        		<HeroSecondaryText className={styles.heroSubtitle}>
              Remplissez le formulaire ci-dessous et un conseiller Pôle Emploi prendra contact avec vous rapidement
        		</HeroSecondaryText>
        	</Hero>

        	<div className={styles.content}>
        		<Container className={styles.container}>
        			<div className={styles.etape}>{étape}</div>
        			{
        				isPremièreÉtape && <>
        					<Link
        						appearance="asBackButton"
        						className={styles.boutonRetour}
        						href="/je-recrute-afpr-poei"
        					>
                    Retour
        					</Link>
        					<div className={styles.champsObligatoires}>
        						<p>Etape 1 : Votre entreprise</p>
        						<p>Tous les champs du formulaire sont obligatoires</p>
        					</div>
        					<form className={styles.formulaire} onSubmit={redirectionÉtape2}>
        						<div className={styles.bodyFormulaire}>
        							<InputText
        								label="Indiquez le nom de l’entreprise"
        								name="companyName"
        								placeholder="Exemple : Crédit Agricole, SNCF…"
        								required
        								value={formulaireÉtape1.nomSociété}
        								onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape1({
        									...formulaireÉtape1,
        									nomSociété: event.currentTarget.value,
        								})}
        							/>
        							<InputAutocomplétionCommune
        								required
        								id="autocomplete-commune"
        								label="Indiquez la ville du siège social de l’entreprise"
        								name="companyPostalCode"
        								placeholder="Exemple : Paris, Marseille..."
        								valeurInitiale={autocomplétionCommuneValeur}
        								onSuggestionSelected={(event, suggestion) => {
        									setAutocomplétionCommuneValeur(suggestion);
        									setFormulaireÉtape1({
        										...formulaireÉtape1,
        										codePostal: suggestion.codePostal,
        										ville: suggestion.ville,
        									});
        								}}
        							/>
        							<InputText
        								label="Indiquez votre numéro de SIRET"
        								name="companySiret"
        								placeholder="Exemple : 12345678901112"
        								required
        								pattern={'^[0-9]{14}$'}
        								value={formulaireÉtape1.siret}
        								onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape1({
        									...formulaireÉtape1,
        									siret: event.currentTarget.value,
        								})}
        							/>
        							<InputAutocomplétionSecteurActivité
        								required
        								id="autocomplete-secteur-activité"
        								label="Indiquez le secteur d’activité de l’entreprise"
        								name="companySector"
        								placeholder="Exemple : Administration publique, Fonction publique d’Etat …"
        								valeurInitiale={secteurActivitéValeur}
        								onSuggestionSelected={(event, suggestion) => {
        									setSecteurActivitéValeur(suggestion);
        									setFormulaireÉtape1({
        										...formulaireÉtape1,
        										secteur: suggestion.valeur,
        									});
        								}}
        							/>
        							<Select
        								required
        								label="Indiquez la taille de l’entreprise"
        								name="companySize"
        								placeholder="Exemple : 500 à 999 salariés"
        								optionList={taillesEntreprises}
        								value={formulaireÉtape1.taille}
        								onChange={(value: string) => setFormulaireÉtape1({
        									...formulaireÉtape1,
        									taille: value,
        								})}
        							/>
        						</div>
        						<div className={styles.validation}>
        							<ButtonComponent
        								icon={<Icon name="angle-right"/>}
        								iconPosition="right"
        								label="Suivant"
        								type="submit"
        							/>
        							<DéchargeRGPD/>
        						</div>
        					</form>
        				</>
        			}
        			{isDeuxièmeÉtape && <>
        				<ButtonComponent
        					appearance="secondary"
        					className={styles.boutonRetour}
        					icon={<Icon name="angle-left"/>}
        					iconPosition="left"
        					onClick={retourÉtape1}
        					label="Retour"
        				/>
        				<div className={styles.champsObligatoires}>
        					<p>Etape 2 : Vos informations personnelles</p>
        					<p>Tous les champs du formulaire sont obligatoires</p>
        				</div>
        				<form className={styles.formulaire} onSubmit={redirectionÉtape3}>
        					<div className={styles.bodyFormulaire}>
        						<InputText
        							label="Indiquez votre nom"
        							name="lastName"
        							placeholder="Exemple : Dupont"
        							required
        							value={formulaireÉtape2.nom}
        							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
        								...formulaireÉtape2,
        								nom: event.currentTarget.value,
        							})}
        						/>
        						<InputText
        							label="Indiquez votre prénom"
        							name="firstName"
        							placeholder="Exemple : David"
        							required
        							value={formulaireÉtape2.prénom}
        							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
        								...formulaireÉtape2,
        								prénom: event.currentTarget.value,
        							})}
        						/>
        						<InputText
        							label="Indiquez un numéro de téléphone"
        							name="phone"
        							placeholder="Exemple : 0601020304"
        							pattern="^(\+33|0|0033)[1-9]\d{8}$"
        							required
        							value={formulaireÉtape2.téléphone}
        							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
        								...formulaireÉtape2,
        								téléphone: event.currentTarget.value,
        							})}
        						/>
        						<InputText
        							label="Indiquez une adresse e-mail"
        							pattern={EMAIL_REGEX}
        							name="email"
        							placeholder="Exemple : david.dupont@exemple.fr"
        							required
        							value={formulaireÉtape2.email}
        							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
        								...formulaireÉtape2,
        								email: event.currentTarget.value,
        							})}
        						/>
        						<InputText
        							label="Indiquez votre rôle au sein de l’entreprise"
        							name="job"
        							placeholder="Exemple : RH, Manager référent"
        							required
        							value={formulaireÉtape2.travail}
        							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
        								...formulaireÉtape2,
        								travail: event.currentTarget.value,
        							})}
        						/>
        					</div>

        					<div className={styles.validation}>
        						<ButtonComponent
        							icon={<Icon name="angle-right"/>}
        							iconPosition="right"
        							label="Suivant"
        							type="submit"
        						/>
        						<DéchargeRGPD/>
        					</div>
        				</form>
        			</>
        			}
        			{isTroisièmeÉtape && <>
        				<ButtonComponent
        					appearance="secondary"
        					className={styles.boutonRetour}
        					icon={<Icon name="angle-left"/>}
        					iconPosition="left"
        					onClick={retourÉtape2}
        					label="Retour"
        				/>
        				<div className={styles.champsObligatoires}>
        					<p> Etape 3 : Vos besoins et commentaires</p>
        				</div>
        				<form className={styles.formulaire} onSubmit={sendForm}>
        					<div className={styles.bodyFormulaireEtape3}>
        						<InputText
        							label="Indiquez le nombre de recrutements AFPR/POE que vous souhaitez"
        							name="nombre-recrutement"
        							placeholder="Exemple : 3"
        							pattern="^([1-9]\d{0,4})$"
        							value={formulaireÉtape3.nombreARecruter}
        							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape3({
        								...formulaireÉtape3,
        								nombreARecruter: event.currentTarget.value,
        							})}
        						/>
        						<InputArea
        							className={styles.textArea}
        							label="Vous avez la possibilité de nous faire part de vos commentaires ou toutes autres informations que vous jugeriez utiles"
        							name="commentaires"
        							placeholder="Saisissez votre texte ici"
        							defaultValue={formulaireÉtape3.commentaire}
        							onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setFormulaireÉtape3({
        								...formulaireÉtape3,
        								commentaire: event.currentTarget.value,
        							})}
        						/>
        					</div>
        					<div className={styles.validation}>
        						<ButtonComponent
        							icon={<Icon name="angle-right"/>}
        							iconPosition="right"
        							label="Envoyer mes informations afin d’être rappelé(e)"
        							type="submit"
        						/>
        						<p>En cliquant sur &ldquo;Je souhaite être rappelé&rdquo;, j‘accepte que mes données soient
                      transférées au Pole emploi de la
                      zone géographique
                      dans laquelle je réside en vue d‘être rappelé</p>
        					</div>
        				</form>
        			</>
        			}
        		</Container>
        	</div>
        </>
			}
			{isFormSuccessfullySent &&
        <Container className={styles.container}>
        	<div className={styles.success}>
        		<p>Félicitations, votre formulaire a bien été envoyé !</p>
        		<p>Vous serez recontacté(e) dès que possible</p>
        		<Link href="/" appearance="asPrimaryButton">Retourner à l‘accueil</Link>
        	</div>
        </Container>
			}
		</main>
	);
}
