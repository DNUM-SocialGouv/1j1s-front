import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputLocalisation } from '~/client/components/ui/Form/InputLocalisation/InputLocalisation';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { getFormAsQuery } from '~/client/utils/form.util';


export function FormulaireRechercheAlternance() {
  const rechercheAlternanceForm = useRef<HTMLFormElement>(null);

  const [inputMotCle, setInputMotCle] = useState<string>('');
  const [inputTypeLocalisation, setInputTypeLocalisation] = useState<string>('');
  const [inputLibelleLocalisation, setInputLibelleLocalisation] = useState<string>('');
  const [inputCodeLocalisation, setInputCodeLocalisation] = useState<string>('');

  const queryParams = useOffreEmploiQuery();
  const router = useRouter();

  useEffect(function initFormValues() {
    setInputMotCle(queryParams.motCle || '');
    setInputTypeLocalisation(queryParams.typeLocalisation || '');
    setInputCodeLocalisation(queryParams.codeLocalisation || '');
    setInputLibelleLocalisation(queryParams.libelleLocalisation || '');
  }, [queryParams]);

  async function updateRechercherAlternanceQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = getFormAsQuery(event.currentTarget);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <form
      ref={rechercheAlternanceForm}
      role="form"
      className={styles.rechercheOffreForm}
      onSubmit={updateRechercherAlternanceQueryParams}
    >
      <div className={styles.filtresRechercherOffre}>
        <div className={styles.inputButtonWrapper}>
          <InputText
            label="Métier, mot-clé"
            value={inputMotCle}
            name="motCle"
            autoFocus
            placeholder="Exemple : serveur, tourisme..."
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
          />
          <InputLocalisation
            libellé={inputLibelleLocalisation}
            code={inputCodeLocalisation}
            type={inputTypeLocalisation}
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
