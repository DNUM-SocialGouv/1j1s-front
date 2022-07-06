import { Button } from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles from '~/client/components/features/Engagement/FormulaireRecherche/FormulaireRechercheMissionEngagement.module.css';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { générerTitreFiltre } from '~/client/utils/offreEmploi.mapper';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';
import { radiusListEngagement } from '~/server/alternances/domain/alternance';
import { MissionEngagement } from '~/server/engagement/domain/engagement';

interface FormulaireRechercheMissionEngagementProps {
  domainList: MissionEngagement.Domaine[]
}

export function FormulaireRechercheMissionEngagement({ domainList }: FormulaireRechercheMissionEngagementProps) {
  const router = useRouter();
  const queryParams = useMissionEngagementQuery();

  const [domainValue, setDomainValue] = useState('');
  const [distanceValue, setDistanceValue] = useState('10');

  useEffect(function initFormValues() {
    setDomainValue(queryParams.domain || '');
    setDistanceValue(queryParams.distance || '');
  }, [queryParams]);

  async function rechercherMission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = getFormAsQuery(event.currentTarget);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <form
      className={styles.rechercheMissionEngagementForm}
      onSubmit={rechercherMission}
      role="form"
    >
      <div className={styles.inputButtonWrapper}>
        <SelectSingle
          titre={générerTitreFiltre('Sélectionnez un domaine', domainValue)}
          optionList={domainList}
          onChange={(value) => setDomainValue(value)}
          currentInput={domainValue}
        />
        <SelectSingle
          label="Rayon"
          titre={récupérerLibelléDepuisValeur(radiusListEngagement, distanceValue)}
          optionList={radiusListEngagement}
          onChange={setDistanceValue}
          currentInput={distanceValue}
        />
        <input type="hidden" name="domain" value={domainValue}/>
        <input type="hidden" name="distance" value={distanceValue}/>
        <Button
          submit={true}
          className={styles.rechercherMissionEngagementButton}
          icon="ri-search-line"
          iconPosition="right"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
}
