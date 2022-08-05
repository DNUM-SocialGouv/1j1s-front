import '~/client/utils/string/string.util';

import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { InputLocalisation } from '~/client/components/ui/Input/InputLocalisation/InputLocalisation';
import { Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
  mapRéférentielDomaineToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { référentielDomaineList } from '~/server/offresEmploi/domain/offreEmploi';


export function FormulaireRechercheJobÉtudiant() {
  const rechercheJobÉtudiantForm = useRef<HTMLFormElement>(null);

  const [inputDomaine, setInputDomaine] = useState('');
  const [inputMotCle, setInputMotCle] = useState<string>('');
  const [inputTypeLocalisation, setInputTypeLocalisation] = useState<string>('');
  const [inputLibelleLocalisation, setInputLibelleLocalisation] = useState<string>('');
  const [inputCodeLocalisation, setInputCodeLocalisation] = useState<string>('');

  const queryParams = useOffreEmploiQuery();
  const router = useRouter();

  useEffect(function initFormValues() {
    setInputMotCle(queryParams.motCle || '');
    setInputDomaine(queryParams.grandDomaine || '');
    setInputTypeLocalisation(queryParams.typeLocalisation || '');
    setInputCodeLocalisation(queryParams.codeLocalisation || '');
    setInputLibelleLocalisation(queryParams.libelleLocalisation || '');
  }, [queryParams]);

  async function updateRechercherJobÉtudiantQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = getFormAsQuery(event.currentTarget);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <form
      ref={rechercheJobÉtudiantForm}
      role="form"
      className={styles.rechercheOffreForm}
      onSubmit={updateRechercherJobÉtudiantQueryParams}
    >
      <div className={styles.filtresRechercherOffre}>
        <div className={styles.inputButtonWrapper}>
          <TextInput
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

          <Select
            multiple
            optionList={mapRéférentielDomaineToOffreEmploiCheckboxFiltre(référentielDomaineList)}
            onChange={setInputDomaine}
            label="Domaine"
            value={inputDomaine}
            name="grandDomaine"
            closeOnSelect={false}
          />
        </div>
      </div>

      <div className={styles.buttonRechercher}>
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
