import { Modal, ModalContent } from '@dataesr/react-dsfr';
import React, { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export default function Allocations() {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const isMobile = isSmallScreen || isMediumScreen;

  const [isPôleEmploiOpen, setIsPôleEmploiOpen] = useState(false);

  const lienPôleEmploi = 'https://authentification-candidat.pole-emploi.fr/connexion/XUI/?realm=%2Findividu&goto=https%3A%2F%2Fauthentification-candidat.pole-emploi.fr%2Fconnexion%2Foauth2%2Frealms%2Froot%2Frealms%2Findividu%2Fauthorize%3Frealm%3D%252Findividu%26response_type%3Did_token%2520token%26scope%3Dopenid%2520compteUsager%2520profile%2520contexteAuthentification%2520email%2520courrier%2520notifications%2520etatcivil%2520logW%2520individu%2520pilote%2520nomenclature%2520coordonnees%2520navigation%2520reclamation%2520prdvl%2520idIdentiteExterne%2520pole_emploi%2520suggestions%2520actu%2520application_USG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26client_id%3DUSG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26state%3DOZ3c4XQiDGwEdFxx%26nonce%3DF54AlR39GLoLCIpT%26redirect_uri%3Dhttps%253A%252F%252Fcandidat.pole-emploi.fr%252Fespacepersonnel%252F#login/';

  const question = <div className={styles.accompagnementExplication}>Pour entrer en Contrat d&apos;Engagement Jeune, vous devez vous rapprocher
    d&apos;un professionnel de l&apos;accompagnement chez Pôle Emploi ou en Mission Locale. Pour vous aider à identifier l&apos;interlocuteur à
    contacter, répondez à ces quelques questions.
  </div>;

  const formulaireDémarrage = <>
    <p className={styles.accompagnementQuestion}>Bénéficiez-vous actuellement d&apos;un accompagnement ?</p>
    <div>
      {isMobile && <span>Sélectionnez l&apos;option qui vous correspond :</span>}
      <button className={styles.optionBouton}>Oui, je suis accompagné(e) par la Mission Locale</button>
      <button className={styles.optionBouton}>Oui, je suis accompagné(e) par Pôle Emploi</button>
      <button className={styles.optionBouton} onClick={() => setFormulaireAffiché(formulairePasDAccompagnement)}>Non, je ne bénéficie d&apos;aucun
        accompagnement
      </button>
    </div>
  </>;

  const formulairePasDAccompagnement = <>
    <button className={styles.boutonRetour} onClick={() => setFormulaireAffiché(formulaireDémarrage)}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Quel âge avez-vous ?</p>
    <div>
      {isMobile && <span>Sélectionnez l&apos;option qui vous correspond :</span>}
      <button className={styles.optionBouton}>Moins de 18 ans</button>
      <button className={styles.optionBouton}>Entre 18 et 25 ans</button>
      <button className={styles.optionBouton}>Plus de 26 ans</button>
    </div>
  </>;

  const [formulaireAffiché, setFormulaireAffiché] = useState(formulaireDémarrage);

  return (
    <section className={styles.accompagnement}>
      <div className={styles.accompagnementContainer}>
        <div>
          <h2>Contrat d&apos;Engagement Jeune, je me lance !</h2>
          {!isMobile && question}
        </div>

        <article className={styles.accompagnementArticle}>
          {formulaireAffiché}

          <Modal isOpen={isPôleEmploiOpen} hide={() => setIsPôleEmploiOpen(false)} className={styles.accompagnementModal}>
            <ModalContent className={styles.accompagnementModalContent}>
              <div>Vous pouvez bénéficier d’informations sur le Contrat d’Engagement Jeune auprès de votre conseiller Pôle Emploi</div>

              <LinkAsButton href={lienPôleEmploi} className={styles.accompagnementModalContentLink}>
                Je contacte mon conseiller
                <ExternalRedirectionIcon/>
              </LinkAsButton>
            </ModalContent>
          </Modal>
        </article>

        {isMobile && question}
      </div>
    </section>
  );
}
