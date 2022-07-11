import { useRouter } from 'next/router';
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles
  from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance.module.css';
import { Button } from '~/client/components/ui/Button/Button';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { InputCommune } from '~/client/components/ui/Input/InputCommune/InputCommune';
import { InputMétierRecherché } from '~/client/components/ui/Input/InputMétierRecherché/InputMétierRecherché';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import {
  getFormAsQuery,
  getFormValue,
} from '~/client/utils/form.util';

export function FormulaireRechercheAlternance() {
  const rechercheAlternanceForm = useRef<HTMLFormElement>(null);

  const queryParams = useAlternanceQuery();
  const router = useRouter();

  const [inputIntituléMétier, setInputIntituléMétier] = useState<string>('');
  const [inputLibelleCommune, setInputLibelleCommune] = useState<string>('');
  const [inputLatitudeCommune, setInputLatitudeCommune] = useState<string>('');
  const [inputLongitudeCommune, setInputLongitudeCommune] = useState<string>('');
  const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
  const [inputCodeRome, setInputCodeRome] = useState<string>('');
  const [inputDistanceCommune, setInputDistanceCommune] = useState<string>('');

  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);

  useEffect(function initFormValues() {
    setInputIntituléMétier(queryParams.metierSelectionne || '');
    setInputCodeRome(queryParams.codeRomes || '');
    setInputLongitudeCommune(queryParams.longitudeCommune || '');
    setInputLatitudeCommune(queryParams.latitudeCommune || '');
    setInputCodeCommune(queryParams.codeCommune || '');
    setInputLibelleCommune(queryParams.libelleCommune || '');
    setInputDistanceCommune(queryParams.distanceCommune || '');
  }, [queryParams]);

  function resetHandleErrorMessageActive() {
    setInputIntituleMétierObligatoireErrorMessage(false);
  }

  async function updateRechercherAlternanceQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const métierSéléctionné = getFormValue(event.currentTarget, 'metierSelectionne');
    const codeRomeList = getFormValue(event.currentTarget, 'codeRomes');
    if(!codeRomeList?.length || !métierSéléctionné) {
      return setInputIntituleMétierObligatoireErrorMessage(true);
    }
    const query = getFormAsQuery(event.currentTarget);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <form
      className={styles.rechercheAlternanceForm}
      onSubmit={updateRechercherAlternanceQueryParams}
      role="form"
      ref={rechercheAlternanceForm}
    >
      <div className={styles.inputButtonWrapper}>
        <InputMétierRecherché
          libellé={inputIntituléMétier}
          code={inputCodeRome.length ? inputCodeRome.split(',') : []}
          handleErrorMessageActive={inputIntituleMétierObligatoireErrorMessage}
          resetHandleErrorMessageActive={resetHandleErrorMessageActive}
        />
        <InputCommune
          code={inputCodeCommune}
          libellé={inputLibelleCommune}
          latitude={inputLatitudeCommune}
          longitude={inputLongitudeCommune}
          distance={inputDistanceCommune}
        />
        <div className={styles.buttonRechercher}>
          <Button
            icon={<MagnifyingGlassIcon />}
            type="submit"
            dataTestId="ButtonRechercherAlternance"
          >
            Rechercher
          </Button>
        </div>
      </div>
    </form>
  );
}
