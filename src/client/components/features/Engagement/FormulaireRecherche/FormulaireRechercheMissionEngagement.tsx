import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles from '~/client/components/features/Engagement/FormulaireRecherche/FormulaireRechercheMissionEngagement.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { InputCommune } from '~/client/components/ui/Input/InputCommune/InputCommune';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { générerTitreFiltre } from '~/client/utils/offreEmploi.mapper';
import { MissionEngagement } from '~/server/engagement/domain/engagement';

interface FormulaireRechercheMissionEngagementProps {
  domainList: MissionEngagement.Domaine[]
}

export function FormulaireRechercheMissionEngagement({ domainList }: FormulaireRechercheMissionEngagementProps) {
  const router = useRouter();
  const queryParams = useMissionEngagementQuery();

  const [domainValue, setDomainValue] = useState('');
  const [inputLibelleCommune, setInputLibelleCommune] = useState<string>('');
  const [inputLatitudeCommune, setInputLatitudeCommune] = useState<string>('');
  const [inputLongitudeCommune, setInputLongitudeCommune] = useState<string>('');
  const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
  const [inputDistanceCommune, setInputDistanceCommune] = useState<string>('');
  const [ouvertAuxMineurs, setOuvertAuxMineurs] = useState<boolean>(false);


  useEffect(function initFormValues() {
    setDomainValue(queryParams.domain || '');
    setInputLongitudeCommune(queryParams.longitudeCommune || '');
    setInputLatitudeCommune(queryParams.latitudeCommune || '');
    setInputCodeCommune(queryParams.codeCommune || '');
    setInputLibelleCommune(queryParams.libelleCommune || '');
    setInputDistanceCommune(queryParams.distanceCommune || '');
    setOuvertAuxMineurs(queryParams.ouvertsAuxMineurs || false);
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
      <div className={styles.rechercheMissionEngagementForm__Container}>
        <div className={styles.inputButtonWrapper}>
          <SelectSingle
            titre={générerTitreFiltre('Sélectionnez un domaine', domainValue)}
            optionList={domainList}
            onChange={(value) => setDomainValue(value)}
            currentInput={domainValue}
          />
          <input type="hidden" name="domain" value={domainValue}/>
          <InputCommune
            code={inputCodeCommune}
            libellé={inputLibelleCommune}
            latitude={inputLatitudeCommune}
            longitude={inputLongitudeCommune}
            distance={inputDistanceCommune}
          />
        </div>

        <div className={styles.accessibleAuxMineursWrapper}>
          <Checkbox
            label="Dès 16 ans"
            id="ouvertAuxMineurs"
            checked={ouvertAuxMineurs}
            onChange={() => setOuvertAuxMineurs(!ouvertAuxMineurs)}
          />
          <input type="hidden" name="ouvertsAuxMineurs" value={String(ouvertAuxMineurs)}/>
        </div>
      </div>

      <div className={styles.rechercherMissionEngagementButton}>
        <Button
          buttonType="withRightIcon"
          icon={<MagnifyingGlassIcon />}
          type="submit"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
}
