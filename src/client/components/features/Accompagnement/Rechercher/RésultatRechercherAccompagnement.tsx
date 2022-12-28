import React, { useCallback, useState } from 'react';

import {
  ModalDemandeDeContactAccompagnement,
} from '~/client/components/features/Accompagnement/DemandeDeContact/ModalDemandeDeContactAccompagnement';
import {
  RésultatRechercherAccompagnementDesktop,
} from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnementDesktop';
import {
  RésultatRechercherAccompagnementMobile,
} from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnementMobile';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import {
  ÉtablissementAccompagnement,
  TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

import styles from './RésultatRechercherAccompagnement.module.scss';

function formatHeure(heure: string) {
  const split = heure.split(':');
  return `${split[0]}h${split[1] !== '00' ? split[1] : ''}`;
}

export function displayHeures(heure: ÉtablissementAccompagnement.Horaire.Heure[]): React.ReactNode {
  if (!heure || heure.length === 0) {
    return (
      <span className={styles.horaireHeure}>Fermé</span>
    );
  }
  if (heure.length > 1) {
    return (
      <span className={styles.horaireHeure}>
        <time dateTime={heure[0].début}>{formatHeure(heure[0].début)}</time> -
        <time dateTime={heure[0].fin}>{formatHeure(heure[0].fin)}</time> et
        <time dateTime={heure[1].début}>{formatHeure(heure[1].début)}</time> -
        <time dateTime={heure[1].fin}>{formatHeure(heure[1].fin)}</time>
      </span>
    );
  } else {
    return (
      <span className={styles.horaireHeure}>
        <time dateTime={heure[0].début}>{formatHeure(heure[0].début)}</time> -
        <time dateTime={heure[0].fin}>{formatHeure(heure[0].fin)}</time>
      </span>
    );
  }
}

export interface RésultatRechercherAccompagnementProps {
  établissement: ÉtablissementAccompagnement
}

export function RésultatRechercherAccompagnement({ établissement }: RésultatRechercherAccompagnementProps) {
  const { isLargeScreen } = useBreakpoint();

  const isMissionLocale = établissement.type === TypeÉtablissement.MISSION_LOCALE;
  const [isPopInOpen, setIsPopInOpen] = useState(false);
  
  const openContactÉtablissementModal = useCallback(() => {
    setIsPopInOpen(true);
  }, []);

  return (
    <>
      {
        isLargeScreen ?
          <RésultatRechercherAccompagnementDesktop
            établissement={établissement}
            onContactClick={openContactÉtablissementModal}
          />
          :
          <RésultatRechercherAccompagnementMobile
            établissement={établissement}
            onContactClick={openContactÉtablissementModal}
          />
      }
      {
        isMissionLocale && établissement.email &&
        <ModalDemandeDeContactAccompagnement
          contactÉtablissementAccompagnement={{
            email: établissement.email,
            nom: établissement.nom,
            type: établissement.type,
          }}
          isOpen={isPopInOpen}
          setIsOpen={setIsPopInOpen}
        />
      }
    </>
  );
}
