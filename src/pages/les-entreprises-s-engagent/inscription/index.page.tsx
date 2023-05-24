import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';

import { DéchargeRGPD } from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD';
import { Head } from '~/client/components/head/Head';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import InputAutocomplétionSecteurActivité, {
	SecteurActivité,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import {
	LesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagent.service';
import analytics from '~/pages/les-entreprises-s-engagent/inscription/index.analytics';
import styles from '~/pages/les-entreprises-s-engagent/inscription/index.module.scss';
import { TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { isSuccess } from '~/server/errors/either';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

const EMAIL_REGEX = "^[a-zA-Z0-9!#$%&@'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";


export type FormulaireEngagement = FormulaireÉtape1Props & FormulaireÉtape2Props;

interface FormulaireÉtape1Props {
	nomSociété: string
	codePostal: string
	ville: string
	siret: string
	secteur: string
	taille: string
}

interface FormulaireÉtape2Props {
	prénom: string
	nom: string
	email: string
	travail: string
	téléphone: string
}

enum Etape {
	ETAPE_1 = 'Etape 1 sur 2',
	ETAPE_2 = 'Etape 2 sur 2'
}

export const TITLE_ÉTAPE_1 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 1 sur 2 | 1jeune1solution';
export const TITLE_ÉTAPE_2 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 2 sur 2 | 1jeune1solution';
export const TITLE_VALIDÉE = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Formulaire envoyé | 1jeune1solution';

const taillesEntreprises = Object.entries(TailleDEntreprise).map(([valeur, libellé]) => ({ libellé, valeur }));

export default function LesEntreprisesSEngagentInscription() {
	useAnalytics(analytics);
	const lesEntreprisesSEngagentService = useDependency<LesEntreprisesSEngagentService>('lesEntreprisesSEngagentService');
	const [title, setTitle] = useState<string>(TITLE_ÉTAPE_1);
	const [étape, setÉtape] = useState<Etape>(Etape.ETAPE_1);
	const [isFormSuccessfullySent, setIsFormSuccessfullySent] = useState<boolean>(false);
	const [autocomplétionCommuneValeur, setAutocomplétionCommuneValeur] = useState<Commune>();
	const [secteurActivitéValeur, setSecteurActivitéValeur] = useState<SecteurActivité>();

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

	const isPremièreÉtape = useMemo(() => étape === Etape.ETAPE_1, [étape]);
	const isDeuxièmeÉtape = useMemo(() => étape === Etape.ETAPE_2, [étape]);
	const isPremièreÉtapeValid = useMemo(() => Object.values(formulaireÉtape1).every((value) => value.length > 0), [formulaireÉtape1]);
	const isDeuxièmeÉtapeValid = useMemo(() => Object.values(formulaireÉtape2).every((value) => value.length > 0), [formulaireÉtape2]);

	const goToÉtape2 = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setTitle(TITLE_ÉTAPE_2);
		if (isPremièreÉtape && isPremièreÉtapeValid) {
			setTitle(TITLE_ÉTAPE_2);
			setÉtape(Etape.ETAPE_2);
		}
	}, [isPremièreÉtape, isPremièreÉtapeValid]);

	const returnToÉtape1 = useCallback(() => {
		setTitle(TITLE_ÉTAPE_1);
		setÉtape(Etape.ETAPE_1);
	}, []);

	const submitFormulaire = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isPremièreÉtapeValid && isDeuxièmeÉtapeValid) {
			const response = await lesEntreprisesSEngagentService.envoyerFormulaireEngagement({ ...formulaireÉtape1, ...formulaireÉtape2 });

			if (isSuccess(response)) {
				setTitle(TITLE_VALIDÉE);
				setIsFormSuccessfullySent(true);
			}
		}
	}, [isPremièreÉtapeValid, isDeuxièmeÉtapeValid, formulaireÉtape1, formulaireÉtape2, lesEntreprisesSEngagentService]);


	return (
		<main id="contenu">
			<Head
				title={title}
				description="Formulaire d’inscription pour rejoindre la mobilisation “Les Entreprises s’Engagent”"
				robots="index,follow"
			/>
			{
				!isFormSuccessfullySent &&
          <>
          	<div className={styles.header}>
          		<div className={styles.logo}>
          			<Image src="/icons/les-entreprises-s-engagent.svg" alt="" width={144} height={80}/>
          		</div>
          		<h1 className={styles.titre}>JE REJOINS &ldquo;LES ENTREPRISES S‘ENGAGENT&rdquo;</h1>
          	</div>
          	<div className={styles.content}>
          		<div className={styles.etape}>{étape}</div>
          		<div className={styles.mandatoryFields}>Tous les champs du formulaire sont obligatoires</div>
          		{isPremièreÉtape && (
          			<>
          				<LinkStyledAsButton
          					href="/les-entreprises-s-engagent"
          					appearance="asSecondaryButton"
          					iconPosition={'left'}
          					icon={<Icon name="angle-left"/>}
          					className={styles.boutonRetour}>
											Retour
          				</LinkStyledAsButton>
          				<form className={styles.formulaire} onSubmit={goToÉtape2}>
          					<div className={styles.bodyFormulaire}>
          						<InputText
          							label="Nom de l’entreprise"
          							name="companyName"
          							placeholder="Exemples : Crédit Agricole, SNCF…"
          							value={formulaireÉtape1.nomSociété}
          							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape1({
          								...formulaireÉtape1,
          								nomSociété: event.currentTarget.value,
          							})}
          							required
          						/>
          						<InputAutocomplétionCommune
          							required
          							id="autocomplete-commune"
          							label="Ville du siège social de l’entreprise"
          							name="companyPostalCode"
          							placeholder="Exemples : Paris, Béziers..."
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
          							label="Numéro de SIRET"
          							name="companySiret"
          							placeholder="Exemple : 12345678901112"
          							value={formulaireÉtape1.siret}
          							required
          							pattern={'^[0-9]{14}$'}
          							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape1({
          								...formulaireÉtape1,
          								siret: event.currentTarget.value,
          							})}
          						/>
          						<InputAutocomplétionSecteurActivité
          							required
          							id="autocomplete-secteur-activité"
          							label="Secteur d’activité de l’entreprise"
          							name="companySector"
          							placeholder="Exemples : Administration publique, Fonction publique d’Etat …"
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
          							label="Taille de l’entreprise"
          							name="companySize"
          							placeholder="Exemple : 250 à 499 salariés"
          							optionList={taillesEntreprises}
          							onChange={(value: string) => setFormulaireÉtape1({
          								...formulaireÉtape1,
          								taille: value,
          							})}
          							value={formulaireÉtape1.taille}
          						/>
          					</div>

          					<div className={styles.validationEtape1}>
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
          		)}
          		{isDeuxièmeÉtape && (
          			<>
          				<ButtonComponent
          					appearance="secondary"
          					className={styles.boutonRetour}
          					icon={<Icon name="angle-left"/>}
          					iconPosition="left"
          					onClick={returnToÉtape1}
          					label="Retour"
          				/>
          				<form className={styles.formulaire} onSubmit={submitFormulaire}>
          					<div className={styles.bodyFormulaire}>
          						<InputText
          							label="Prénom"
          							name="firstName"
          							placeholder="Exemples : Marc, Sonia…"
          							value={formulaireÉtape2.prénom}
          							required
          							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
          								...formulaireÉtape2,
          								prénom: event.currentTarget.value,
          							})}
          						/>
          						<InputText
          							label="Nom"
          							name="lastName"
          							placeholder="Exemples : Ducourt, Dupont…"
          							value={formulaireÉtape2.nom}
          							required
          							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
          								...formulaireÉtape2,
          								nom: event.currentTarget.value,
          							})}
          						/>
          						<InputText
          							label="Fonction au sein de l’entreprise"
          							name="job"
          							placeholder="Exemples : RH, Chargé de communications"
          							value={formulaireÉtape2.travail}
          							required
          							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
          								...formulaireÉtape2,
          								travail: event.currentTarget.value,
          							})}
          						/>
          						<InputText
          							label="Adresse e-mail de contact"
          							pattern={EMAIL_REGEX}
          							name="email"
          							placeholder="Exemple : mail@exemple.com"
          							hint="Cette adresse vous permettra d’accéder à votre espace sécurisé afin de gérer les informations suivies."
          							value={formulaireÉtape2.email}
          							required
          							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
          								...formulaireÉtape2,
          								email: event.currentTarget.value,
          							})}
          						/>
          						<InputText
          							label="Numéro de téléphone de contact"
          							name="phone"
          							placeholder="Exemple : 0199999999"
          							pattern="^(\+33|0|0033)[1-9]\d{8}$"
          							hint="Ce numéro nous permettra de communiquer avec vous afin de gérer les informations suivies."
          							value={formulaireÉtape2.téléphone}
          							required
          							onChange={(event: ChangeEvent<HTMLInputElement>) => setFormulaireÉtape2({
          								...formulaireÉtape2,
          								téléphone: event.currentTarget.value,
          							})}
          						/>
          					</div>
          					<div className={styles.validationEtape2}>
          						<ButtonComponent
          							icon={<Icon name="angle-right"/>}
          							iconPosition="right"
          							label="Envoyer le formulaire"
          							type="submit"
          						/>
          						<DéchargeRGPD/>
          					</div>
          				</form>
          			</>
          		)}
          		<p className={styles.footer}>
                      Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une modification,{' '}
          			<LinkStyledAsButton
          				appearance={'asQuaternayButton'}
          				href="mailto:contact@lesentreprises-sengagent.org"
          				prefetch={false}
          				className={styles.contactLink}>
          				nous contacter
          			</LinkStyledAsButton>
          		</p>
          	</div>
          </>
			}
			{isFormSuccessfullySent &&
          <div className={styles.success}>
          	<h1>Félicitations, votre formulaire a bien été envoyé !</h1>
          </div>}
		</main>
	);
}
