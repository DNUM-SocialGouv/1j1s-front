import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import AutresBesoins
	from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/AutresBesoins';
import AutresBesoins26ans
	from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/AutresBesoins26ans';
import BesoinAide from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/BesoinAide';
import BesoinAide26ans
	from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/BesoinAide26ans';
import Démarrage from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/Démarrage';
import Handicap from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/Handicap';
import PasDAccompagnement
	from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/PasDAccompagnement';
import {
	ModaleDispositifsReferences,
} from '~/client/components/features/ContratEngagementJeune/Accompagnement/Modales/ModaleDispositifsReferences';
import {
	ModaleInscriptionPoleEmploi,
} from '~/client/components/features/ContratEngagementJeune/Accompagnement/Modales/ModaleInscriptionPoleEmploi';
import {
	ModaleMissionLocale,
} from '~/client/components/features/ContratEngagementJeune/Accompagnement/Modales/ModaleMissionLocale';
import {
	ModalePoleEmploi,
} from '~/client/components/features/ContratEngagementJeune/Accompagnement/Modales/ModalePoleEmploi';


export type Formulaires =
	'Démarrage'
	| 'PasDAccompagnement'
	| 'BesoinAide'
	| 'BesoinAide26ans'
	| 'AutresBesoins'
	| 'Handicap'
	| 'AutresBesoins26ans';

export interface FormulairesProps {
	setTypeFormulaireAffiché: Dispatch<SetStateAction<Formulaires>>;
	setIsPôleEmploiModalOpen: Dispatch<SetStateAction<boolean>>;
	setIsInscriptionPôleEmploiModalOpen: Dispatch<SetStateAction<boolean>>;
	setIsMissionLocaleModalOpen: Dispatch<SetStateAction<boolean>>;
	setIsDispositifsReferencesModalOpen: Dispatch<SetStateAction<boolean>>;
}


export default function Accompagnement() {
	const [typeFormulaireAffiché, setTypeFormulaireAffiché] = useState<Formulaires>('Démarrage');
	const [isPôleEmploiModalOpen, setIsPôleEmploiModalOpen] = useState(false);
	const [isInscriptionPôleEmploiModalOpen, setIsInscriptionPôleEmploiModalOpen] = useState(false);
	const [isMissionLocaleModalOpen, setIsMissionLocaleModalOpen] = useState(false);
	const [isDispositifsReferencesModalOpen, setIsDispositifsReferencesModalOpen] = useState(false);
	const lienPôleEmploi = 'https://authentification-candidat.pole-emploi.fr/connexion/XUI/?realm=%2Findividu&goto=https%3A%2F%2Fauthentification-candidat.pole-emploi.fr%2Fconnexion%2Foauth2%2Frealms%2Froot%2Frealms%2Findividu%2Fauthorize%3Frealm%3D%252Findividu%26response_type%3Did_token%2520token%26scope%3Dopenid%2520compteUsager%2520profile%2520contexteAuthentification%2520email%2520courrier%2520notifications%2520etatcivil%2520logW%2520individu%2520pilote%2520nomenclature%2520coordonnees%2520navigation%2520reclamation%2520prdvl%2520idIdentiteExterne%2520pole_emploi%2520suggestions%2520actu%2520application_USG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26client_id%3DUSG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26state%3DOZ3c4XQiDGwEdFxx%26nonce%3DF54AlR39GLoLCIpT%26redirect_uri%3Dhttps%253A%252F%252Fcandidat.pole-emploi.fr%252Fespacepersonnel%252F#login/';
	const deuxièmeLienPôleEmploi = 'https://candidat.pole-emploi.fr/inscription-en-ligne/accueil';
	const formulaire = getFormulaireÀAfficher(typeFormulaireAffiché, setTypeFormulaireAffiché, setIsPôleEmploiModalOpen, setIsInscriptionPôleEmploiModalOpen, setIsMissionLocaleModalOpen, setIsDispositifsReferencesModalOpen);

	return (
		<>
			<section className={styles.accompagnement}>
				<div className={styles.accompagnementContainer}>
					<div>
						<h2 id="accompagnement">Contrat d‘Engagement Jeune, je me lance !</h2>
						<div className={styles.accompagnementExplication}>
							Pour entrer en Contrat d‘Engagement Jeune, vous devez vous rapprocher d‘un professionnel de
							l‘accompagnement chez Pôle emploi ou en Mission Locale. Pour vous aider à
							identifier l‘interlocuteur à contacter, répondez à ces quelques questions.
						</div>
					</div>
					<article className={styles.accompagnementArticle}>
						{formulaire}
					</article>
				</div>
			</section>

			<ModalePoleEmploi
				open={isPôleEmploiModalOpen}
				close={() => setIsPôleEmploiModalOpen(false)}
				href={lienPôleEmploi}/>

			<ModaleInscriptionPoleEmploi
				open={isInscriptionPôleEmploiModalOpen}
				close={() => setIsInscriptionPôleEmploiModalOpen(false)}
				href={deuxièmeLienPôleEmploi}/>

			<ModaleMissionLocale
				isMissionLocaleModaleOpen={isMissionLocaleModalOpen}
				setIsMissionLocaleModaleOpen={setIsMissionLocaleModalOpen}/>

			<ModaleDispositifsReferences
				open={isDispositifsReferencesModalOpen}
				close={() => setIsDispositifsReferencesModalOpen(false)}/>
		</>
	);
}

function getFormulaireÀAfficher(typeFormulaireÀAfficher: Formulaires, setTypeFormulaireAffiché: Dispatch<SetStateAction<Formulaires>>, setIsPôleEmploiModalOpen: Dispatch<SetStateAction<boolean>>, setIsInscriptionPôleEmploiModalOpen: Dispatch<SetStateAction<boolean>>, setIsMissionLocaleModalOpen: Dispatch<SetStateAction<boolean>>, setIsDispositifsReferencesModalOpen: Dispatch<SetStateAction<boolean>>) {
	switch (typeFormulaireÀAfficher) {
		case 'PasDAccompagnement':
			return <PasDAccompagnement
				setTypeFormulaireAffiché={setTypeFormulaireAffiché}
				setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
			/>;
		case 'BesoinAide':
			return <BesoinAide
				setTypeFormulaireAffiché={setTypeFormulaireAffiché}
				setIsDispositifsReferencesModalOpen={setIsDispositifsReferencesModalOpen}
			/>;
		case 'BesoinAide26ans':
			return <BesoinAide26ans
				setTypeFormulaireAffiché={setTypeFormulaireAffiché}
				setIsDispositifsReferencesModalOpen={setIsDispositifsReferencesModalOpen}
			/>;
		case 'AutresBesoins':
			return <AutresBesoins
				setTypeFormulaireAffiché={setTypeFormulaireAffiché}
				setIsInscriptionPôleEmploiModalOpen={setIsInscriptionPôleEmploiModalOpen}
				setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
			/>;
		case 'Handicap':
			return <Handicap
				setTypeFormulaireAffiché={setTypeFormulaireAffiché}
				setIsInscriptionPôleEmploiModalOpen={setIsInscriptionPôleEmploiModalOpen}
			/>;
		case 'AutresBesoins26ans':
			return <AutresBesoins26ans
				setTypeFormulaireAffiché={setTypeFormulaireAffiché}
				setIsInscriptionPôleEmploiModalOpen={setIsInscriptionPôleEmploiModalOpen}
				setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
			/>;
		default:
			return <Démarrage
				setTypeFormulaireAffiché={setTypeFormulaireAffiché}
				setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
				setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
			/>;
	}
}
