import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import AutresBesoins
  from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/AutresBesoins';
import AutresBesoins26ans
  from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/AutresBesoins26ans';
import BesoinAide from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/BesoinAide';
import BesoinAide26ans from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/BesoinAide26ans';
import Démarrage from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/Démarrage';
import Handicap from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/Handicap';
import PasDAccompagnement from '~/client/components/features/ContratEngagementJeune/Accompagnement/Formulaires/PasDAccompagnement';
import { Button } from '~/client/components/ui/Button/Button';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import FormulaireDeContactCEJ from '../FormulaireDeContact/FormulaireDeContactCEJ';

export type Formulaires = 'Démarrage' | 'PasDAccompagnement' | 'BesoinAide' | 'BesoinAide26ans' | 'AutresBesoins' | 'Handicap' | 'AutresBesoins26ans' ;

export interface FormulairesProps {
  setTypeFormulaireAffiché: Dispatch<SetStateAction<Formulaires>>;
  setIsPôleEmploiModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsMissionLocaleModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDispositifsReferencesModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Accompagnement() {
  const [typeFormulaireAffiché, setTypeFormulaireAffiché] = useState<Formulaires>('Démarrage');
  const [isPôleEmploiModalOpen, setIsPôleEmploiModalOpen] = useState(false);
  const [isMissionLocaleModalOpen, setIsMissionLocaleModalOpen] = useState(false);
  const [isDispositifsRefencesModalOpen, setIsDispositifsReferencesModalOpen] = useState(false);
  const lienPôleEmploi = 'https://authentification-candidat.pole-emploi.fr/connexion/XUI/?realm=%2Findividu&goto=https%3A%2F%2Fauthentification-candidat.pole-emploi.fr%2Fconnexion%2Foauth2%2Frealms%2Froot%2Frealms%2Findividu%2Fauthorize%3Frealm%3D%252Findividu%26response_type%3Did_token%2520token%26scope%3Dopenid%2520compteUsager%2520profile%2520contexteAuthentification%2520email%2520courrier%2520notifications%2520etatcivil%2520logW%2520individu%2520pilote%2520nomenclature%2520coordonnees%2520navigation%2520reclamation%2520prdvl%2520idIdentiteExterne%2520pole_emploi%2520suggestions%2520actu%2520application_USG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26client_id%3DUSG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26state%3DOZ3c4XQiDGwEdFxx%26nonce%3DF54AlR39GLoLCIpT%26redirect_uri%3Dhttps%253A%252F%252Fcandidat.pole-emploi.fr%252Fespacepersonnel%252F#login/';
  const formulaire = getFormulaireÀAfficher(typeFormulaireAffiché, setTypeFormulaireAffiché, setIsPôleEmploiModalOpen, setIsMissionLocaleModalOpen, setIsDispositifsReferencesModalOpen);
  const [isSuccess, setIsSuccess] = useState(false);

  function onFormulaireEnvoyé() {
    setIsSuccess(true);
  }

  const title = isSuccess ? '' : (
    <>
      Vous pouvez bénéficier d&apos;un accompagnement répondant à vos besoins auprès de votre Mission Locale
      <small>(Tous les champs sont obligatoires)</small>
    </>
  );

  const question = <div className={styles.accompagnementExplication}>Pour entrer en Contrat d&apos;Engagement Jeune, vous devez vous rapprocher
    d&apos;un professionnel de l&apos;accompagnement chez Pôle Emploi ou en Mission Locale. Pour vous aider à identifier l&apos;interlocuteur à
    contacter, répondez à ces quelques questions.
  </div>;

  return (
    <section className={styles.accompagnement}>
      <div className={styles.accompagnementContainer}>
        <div>
          <h2 id="accompagnement">Contrat d&apos;Engagement Jeune, je me lance !</h2>
          {question}
        </div>

        <article className={styles.accompagnementArticle}>
          {formulaire}

          <ModalComponent isOpen={isPôleEmploiModalOpen} close={() => setIsPôleEmploiModalOpen(false)} className={styles.accompagnementModal}>
            <ModalComponent.Content className={styles.accompagnementModalContent}>
              <div>Vous pouvez bénéficier d’informations sur le Contrat d’Engagement Jeune auprès de votre conseiller Pôle Emploi</div>

              <LinkAsButton href={lienPôleEmploi} className={styles.accompagnementModalContentLink} target="_blank">
                Je contacte mon conseiller
              </LinkAsButton>
            </ModalComponent.Content>
          </ModalComponent>
        </article>
      </div>
      <ModalComponent isOpen={isMissionLocaleModalOpen} close={() => setIsMissionLocaleModalOpen(false)} className={styles.accompagnementMission}>
        <ModalComponent.Title className={styles.accompagnementMission__Title}>{ title }</ModalComponent.Title>
        <ModalComponent.Content>
          <FormulaireDeContactCEJ onSuccess={() => onFormulaireEnvoyé() }>
            <Button onClick={ () => setIsMissionLocaleModalOpen(false)} buttonType="primary" title="Revenir à la page" className={styles.accompagnementMissionBtnSuccess}>Fermer</Button>
          </FormulaireDeContactCEJ>
        </ModalComponent.Content>
      </ModalComponent>
      <ModalComponent isOpen={isDispositifsRefencesModalOpen} close={() => setIsDispositifsReferencesModalOpen(false)} className={styles.accompagnementDispositifs}>
        <ModalComponent.Content>
          <div className={styles.accompagnementDispositifs__Title}>
            Découvrez les dispositifs référencés sur le portail 1jeune1solution
          </div>
          <div className={styles.accompagnementDispositifsPosition}>
            <Link href={'/#offres'} className={styles.accompagnementDispositifsPositionIcon}>
              <BriefCaseIcon className={styles.accompagnementDispositifsPositionIconOffre} />
              <p>Découvrez nos offres</p>
            </Link>
            <Link href={'/#formation'} className={styles.accompagnementDispositifsPositionIcon}>
              <BookIcon className={styles.accompagnementDispositifsPositionIconFormation} />
              <p>Formation et orientation</p>
            </Link>
            <Link href={'/#aides-orientation-accompagnement'} className={styles.accompagnementDispositifsPositionIcon}>
              <CompassIcon className={styles.accompagnementDispositifsPositionIconAide} />
              <p>Aides et accompagnement</p>
            </Link>
            <Link href={'/#engagement-benevolat'} className={styles.accompagnementDispositifsPositionIcon}>
              <TrophyIcon className={styles.accompagnementDispositifsPositionIconBenevolat} />
              <p>Engagement</p>
            </Link>
          </div>
        </ModalComponent.Content>
      </ModalComponent>
    </section>
  );
}

function getFormulaireÀAfficher(typeFormulaireÀAfficher: Formulaires, setTypeFormulaireAffiché: Dispatch<SetStateAction<Formulaires>>, setIsPôleEmploiModalOpen: Dispatch<SetStateAction<boolean>>, setIsMissionLocaleModalOpen: Dispatch<SetStateAction<boolean>>, setIsDispositifsRefencesModalOpen: Dispatch<SetStateAction<boolean>>) {
  switch (typeFormulaireÀAfficher) {
    case 'PasDAccompagnement':
      return <PasDAccompagnement
        setTypeFormulaireAffiché={setTypeFormulaireAffiché}
        setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
        setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
        setIsDispositifsReferencesModalOpen={setIsDispositifsRefencesModalOpen}
      />;
    case 'BesoinAide':
      return <BesoinAide
        setTypeFormulaireAffiché={setTypeFormulaireAffiché}
        setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
        setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
        setIsDispositifsReferencesModalOpen={setIsDispositifsRefencesModalOpen}
      />;
    case 'BesoinAide26ans':
      return <BesoinAide26ans
        setTypeFormulaireAffiché={setTypeFormulaireAffiché}
        setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
        setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
        setIsDispositifsReferencesModalOpen={setIsDispositifsRefencesModalOpen}
      />;
    case 'AutresBesoins':
      return <AutresBesoins
        setTypeFormulaireAffiché={setTypeFormulaireAffiché}
        setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
        setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
        setIsDispositifsReferencesModalOpen={setIsDispositifsRefencesModalOpen}
      />;
    case 'Handicap':
      return <Handicap
        setTypeFormulaireAffiché={setTypeFormulaireAffiché}
        setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
        setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
        setIsDispositifsReferencesModalOpen={setIsDispositifsRefencesModalOpen}
      />;
    case 'AutresBesoins26ans':
      return <AutresBesoins26ans
        setTypeFormulaireAffiché={setTypeFormulaireAffiché}
        setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
        setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
        setIsDispositifsReferencesModalOpen={setIsDispositifsRefencesModalOpen}
      />;
    default:
      return <Démarrage
        setTypeFormulaireAffiché={setTypeFormulaireAffiché}
        setIsPôleEmploiModalOpen={setIsPôleEmploiModalOpen}
        setIsMissionLocaleModalOpen={setIsMissionLocaleModalOpen}
        setIsDispositifsReferencesModalOpen={setIsDispositifsRefencesModalOpen}
      />;
  }
}
