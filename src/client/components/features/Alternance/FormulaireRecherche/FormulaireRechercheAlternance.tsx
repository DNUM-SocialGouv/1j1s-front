import { Button } from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from '~/client/components/features/Alternance/Rechercher/RechercherAlternance.module.css';
import { InputCommune } from '~/client/components/features/InputCommune/InputCommune';
import commonStyles from '~/client/components/features/RechercherOffre.module.css';
import { AutoCompletionForMétierRecherché } from '~/client/components/ui/AutoCompletion/AutoCompletionForMétierRecherché';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import {
  getFormAsQuery,
  getFormValue,
} from '~/client/utils/form.util';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';
import { radiusList } from '~/server/alternances/domain/alternance';

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
  const [inputRadius, setInputRadius] = useState<string>('');

  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);


  useEffect(function initFormValues() {
    setInputIntituléMétier(queryParams.metierSelectionne || '');
    setInputCodeRome(queryParams.codeRomes || '');
    setInputLongitudeCommune(queryParams.longitudeCommune || '');
    setInputLatitudeCommune(queryParams.latitudeCommune || '');
    setInputCodeCommune(queryParams.codeCommune || '');
    setInputLibelleCommune(queryParams.libelleCommune || '');
    setInputRadius(queryParams.radius || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className={commonStyles.rechercheOffreForm}
      onSubmit={updateRechercherAlternanceQueryParams}
      role="form"
      ref={rechercheAlternanceForm}
    >
      <div className={commonStyles.inputButtonWrapper}>
        <AutoCompletionForMétierRecherché
          className={styles.rechercheAlternanceInput}
          libellé={inputIntituléMétier}
          code={inputCodeRome}
          handleErrorMessageActive={inputIntituleMétierObligatoireErrorMessage}
          resetHandleErrorMessageActive={resetHandleErrorMessageActive}
        />
        <InputCommune
          code={inputCodeCommune}
          libellé={inputLibelleCommune}
          latitude={inputLatitudeCommune}
          longitude={inputLongitudeCommune}
        />
        <SelectSingle
          label="Rayon"
          titre={récupérerLibelléDepuisValeur(radiusList, inputRadius) || 'Indifférent'}
          optionList={radiusList}
          onChange={(value) => setInputRadius(value === 'Indifférent' ? '' : value)}
          currentInput={inputRadius}
        />
        <Button
          submit={true}
          icon="ri-search-line"
          iconPosition="right"
          data-testid="ButtonRechercherAlternance"
          className={commonStyles.buttonRechercher}
        >
          Rechercher
        </Button>
      </div>
      <input type="hidden" name="radius" value={inputRadius}/>

    </form>
  );
}
