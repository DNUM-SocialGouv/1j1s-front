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
import { TypeÉtablissement } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';

const typeAccompagnementListe: Option[] = [
  { libellé: 'Agences Pôle Emploi', valeur: TypeÉtablissement.AGENCE_POLE_EMPLOI },
  { libellé: 'Missions locales', valeur: TypeÉtablissement.MISSION_LOCALE },
  { libellé: 'Info jeunes', valeur: TypeÉtablissement.INFO_JEUNE },
];

export function FormulaireRechercheAccompagnement() {
  const rechercheAccompagnementForm = useRef<HTMLFormElement>(null);

  const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
  const [inputTypeAccompagnement, setInputTypeAccompagnement] = useState<string>('');
  const [inputLibelléCommune, setInputLibelléCommune] = useState<string>('');

  const queryParams = useAccompagnementQuery();
  const router = useRouter();

  useEffect(function initFormValues() {
    setInputCodeCommune(queryParams.codeCommune || '');
    setInputLibelléCommune(queryParams.libelleCommune || '');
    setInputTypeAccompagnement(queryParams.typeAccompagnement || '');
  }, [queryParams]);

  async function updateRechercheAccompagnementQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = getFormAsQuery(event.currentTarget, queryParams, false);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <>
      <div className={styles.rechercherAccompagnementHint}>Tous les champs sont obligatoires</div>
      <form
        ref={rechercheAccompagnementForm}
        role="form"
        className={styles.rechercheAccompagnementForm}
        onSubmit={updateRechercheAccompagnementQueryParams}>
        <div className={styles.filtresRecherche}>
          <InputCommune
            className={styles.inputCommune}
            code={inputCodeCommune}
            libellé={inputLibelléCommune}
            required
            showRadius={false}/>
          <Select
            id={'type-accompagnement'}
            required
            className={styles.inputAccompagnement}
            label={'Type d‘accompagnement'}
            name={'typeAccompagnement'}
            optionList={typeAccompagnementListe}
            value={inputTypeAccompagnement}
            onChange={setInputTypeAccompagnement}/>
        </div>
        <ButtonComponent
          className={styles.buttonRechercher}
          label='Rechercher'
          icon={<Icon name="magnifying-glass" />}
          iconPosition='right'
          type='submit'/>
      </form>
    </>
  );
}
