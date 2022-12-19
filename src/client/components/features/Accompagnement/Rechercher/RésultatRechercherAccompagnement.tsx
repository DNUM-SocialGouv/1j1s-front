import React, { useState } from 'react';

import {
  ModaleFormulaireDeContactMissionLocale,
} from '~/client/components/features/Accompagnement/FormulaireDeContactMissionLocale/ModaleFormulaireDeContactMissionLocale';
import {
  LienSolutionAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import {
  RésultatRechercherAccompagnementDesktop,
} from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnementDesktop';
import {
  RésultatRechercherAccompagnementMobile,
} from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnementMobile';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { TypeÉtablissement } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';

import styles from './RésultatRechercherAccompagnement.module.scss';

export interface RésultatRechercherAccompagnementProps extends Omit<LienSolutionAccompagnement, 'id'> {
  setIsPopInOpen: (value: boolean) => void;
}

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
        <time dateTime={heure[0].début}>{formatHeure(heure[0].début)}</time> - <time dateTime={heure[0].fin}>{formatHeure(heure[0].fin)}</time> et <time dateTime={heure[1].début}>{formatHeure(heure[1].début)}</time> - <time dateTime={heure[1].fin}>{formatHeure(heure[1].fin)}</time>
      </span>
    );
  } else {
    return (
      <span className={styles.horaireHeure}>
        <time dateTime={heure[0].début}>{formatHeure(heure[0].début)}</time> - <time dateTime={heure[0].fin}>{formatHeure(heure[0].fin)}</time>
      </span>
    );
  }
}

export function RésultatRechercherAccompagnement(props: Omit<LienSolutionAccompagnement, 'id'>) {
  const { isLargeScreen } = useBreakpoint();
  const { nomEntreprise, étiquetteOffreList, lienOffre, intituléOffre, logoEntreprise, horaires, typeAccompagnement } = props;

  const isMissionLocale = typeAccompagnement === TypeÉtablissement.MISSION_LOCALE;
  const [isPopInOpen, setIsPopInOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  return (
    <>
      {
        isLargeScreen ?
          <RésultatRechercherAccompagnementDesktop
            logoEntreprise={logoEntreprise}
            intituléOffre={intituléOffre}
            nomEntreprise={nomEntreprise}
            étiquetteOffreList={étiquetteOffreList}
            lienOffre={lienOffre}
            horaires={horaires}
            typeAccompagnement={typeAccompagnement}
            setIsPopInOpen={setIsPopInOpen}
          />
          :
          <RésultatRechercherAccompagnementMobile
            logoEntreprise={logoEntreprise}
            intituléOffre={intituléOffre}
            nomEntreprise={nomEntreprise}
            étiquetteOffreList={étiquetteOffreList}
            lienOffre={lienOffre}
            horaires={horaires}
            typeAccompagnement={typeAccompagnement}
            setIsPopInOpen={setIsPopInOpen}
          />
      }
      {
        isMissionLocale &&
        <ModaleFormulaireDeContactMissionLocale
          isPopInOpen={isPopInOpen}
          setIsPopInOpen={setIsPopInOpen}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      }
    </>
  );
}
