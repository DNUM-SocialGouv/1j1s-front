import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/Accompagnement/FormulaireRecherche/FormulaireRechercheAccompagnement.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Option, Select } from '~/client/components/ui/Select/Select';
import { useAccompagnementQuery } from '~/client/hooks/useAccompagnementQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercheAccompagnement() {
  const rechercheAccompagnementForm = useRef<HTMLFormElement>(null);

  const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
  const [inputAccompagnement, setInputAccompagnement] = useState<string>('');
  const [inputLibelléCommune, setInputLibelléCommune] = useState<string>('');

  const queryParams = useAccompagnementQuery();
  const router = useRouter();

  const typeAccompagnementListe: Option[] = [
    { libellé: 'Agences Pôle Emploi', valeur: 'pole_emploi' },
    { libellé: 'Missions locales', valeur: 'mission_locale' },
    { libellé: 'Info jeunes', valeur: 'cij' },
  ];

  useEffect(function initFormValues() {
    setInputCodeCommune(queryParams.codeCommune || '');
    setInputLibelléCommune(queryParams.libelleCommune || '');
    setInputAccompagnement(queryParams.typeAccompagnement || '');
  }, [queryParams]);

  async function updateRechercheAccompagnementQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = getFormAsQuery(event.currentTarget, queryParams, false);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <form
      ref={rechercheAccompagnementForm}
      role="form"
      className={styles.rechercheOffreForm}
      onSubmit={updateRechercheAccompagnementQueryParams}>
      <div className={styles.filtresRecherche}>
        <InputCommune
          className={styles.inputCommune}
          code={inputCodeCommune}
          libellé={inputLibelléCommune}
          required
          showRadius={false}/>
        <Select
          className={styles.inputAccompagnement}
          label={'Type d‘accompagnement'}
          name={'typeAccompagnement'}
          optionList={typeAccompagnementListe}
          value={inputAccompagnement}
          onChange={(value) => setInputAccompagnement(value)}/>
      </div>
      <ButtonComponent
        className={styles.buttonRechercher}
        label='Rechercher'
        icon={<Icon name="magnifying-glass" />}
        iconPosition='right'
        type='submit'/>
    </form>
  );
}
