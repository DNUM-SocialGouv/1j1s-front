import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/Accompagnement/FormulaireRecherche/FormulaireRechercheAccompagnement.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useAccompagnementQuery } from '~/client/hooks/useAccompagnementQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercheAccompagnement() {
  const rechercheAccompagnementForm = useRef<HTMLFormElement>(null);

  const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
  const [inputLibelléCommune, setInputLibelléCommune] = useState<string>('');

  const queryParams = useAccompagnementQuery();
  const router = useRouter();

  useEffect(function initFormValues() {
    setInputCodeCommune(queryParams.codeCommune || '');
    setInputLibelléCommune(queryParams.libelleCommune || '');
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
      onSubmit={updateRechercheAccompagnementQueryParams}
    >
      <div className={styles.filtresRechercherOffre}>
        <div className={styles.inputButtonWrapper}>
          <InputCommune
            code={inputCodeCommune}
            libellé={inputLibelléCommune}
            showRadius={false}
            required
          />
        </div>
      </div>
      <div className={styles.buttonRechercher}>
        <ButtonComponent
          label='Rechercher'
          icon={<Icon name="magnifying-glass" />}
          iconPosition='right'
          type='submit'
        />
      </div>
    </form>
  );
}
