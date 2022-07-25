import '~/client/utils/string/string.util';

import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTitle,
  TextInput,
} from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.css';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { CheckboxGroup } from '~/client/components/ui/CheckboxGroup/CheckboxGroup';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { FilterIcon } from '~/client/components/ui/Icon/filter.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { InputLocalisation } from '~/client/components/ui/Input/InputLocalisation/InputLocalisation';
import { RadioButton } from '~/client/components/ui/RadioButton/RadioButton';
import { RadioButtonGroup } from '~/client/components/ui/RadioButtonGroup/RadioButtonGroup';
import { SelectMultiple } from '~/client/components/ui/Select/SelectMultiple/SelectMultiple';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
  générerTitreFiltre,
  mapRéférentielDomaineToOffreEmploiCheckboxFiltre,
  mapTypeDeContratToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { OffreEmploi, référentielDomaineList } from '~/server/offresEmploi/domain/offreEmploi';

export function FormulaireRechercheOffreEmploi() {
  const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);

  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);
  const [inputTypeDeContrat, setInputTypeDeContrat] = useState('');
  const [inputExpérience, setInputExpérience] = useState('');
  const [inputTempsDeTravail, setInputTempsDeTravail] = useState('');
  const [inputDomaine, setInputDomaine] = useState('');
  const [inputMotCle, setInputMotCle] = useState<string>('');
  const [inputTypeLocalisation, setInputTypeLocalisation] = useState<string>('');
  const [inputLibelleLocalisation, setInputLibelleLocalisation] = useState<string>('');
  const [inputCodeLocalisation, setInputCodeLocalisation] = useState<string>('');

  const queryParams = useOffreEmploiQuery();
  const { isSmallScreen } = useBreakpoint();
  const router = useRouter();

  useEffect(function initFormValues() {
    setInputMotCle(queryParams.motCle || '');
    setInputDomaine(queryParams.grandDomaine || '');
    setInputTempsDeTravail(queryParams.tempsDeTravail || '');
    setInputTypeDeContrat(queryParams.typeDeContrats || '');
    setInputExpérience(queryParams.experienceExigence || '');
    setInputTypeLocalisation(queryParams.typeLocalisation || '');
    setInputCodeLocalisation(queryParams.codeLocalisation || '');
    setInputLibelleLocalisation(queryParams.libelleLocalisation || '');
  }, [queryParams]);

  useEffect(function fermerFiltresAvancésSurÉcranLarge() {
    if (!isSmallScreen) {
      setIsFiltresAvancésMobileOpen(false);
    }
  }, [isSmallScreen]);

  const applyFiltresAvancés = useCallback(() => {
    setIsFiltresAvancésMobileOpen(false);
    rechercheOffreEmploiForm.current?.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );
  }, []);

  const toggleTypeDeContrat = useCallback((value: string) => {
    setInputTypeDeContrat(inputTypeDeContrat.appendOrRemoveSubStr(value));
  }, [inputTypeDeContrat]);

  const toggleDomaine = useCallback((value: string) => {
    setInputDomaine(inputDomaine.appendOrRemoveSubStr(value));
  }, [inputDomaine]);

  function updateRechercherOffreEmploiQueryParams(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = getFormAsQuery(event.currentTarget);
    return router.push({ query }, undefined, { shallow: true });
  }

  return (
    <form
      ref={rechercheOffreEmploiForm}
      role="form"
      className={styles.rechercheOffreForm}
      onSubmit={updateRechercherOffreEmploiQueryParams}
    >
      <div className={styles.filtresRechercherOffre}>
        <div className={styles.inputButtonWrapper}>
          <TextInput
            label="Métier, mot-clé"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value={inputMotCle}
            name="motCle"
            autoFocus
            placeholder="Exemple : boulanger, informatique..."
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
          />
          <InputLocalisation
            libellé={inputLibelleLocalisation}
            code={inputCodeLocalisation}
            type={inputTypeLocalisation}
          />

          {isSmallScreen &&
            <div>
              <Button
                buttonType="linkWithRightIcon"
                icon={<FilterIcon />}
                onClick={() => setIsFiltresAvancésMobileOpen(true)}
              >
                Filtrer ma recherche
              </Button>
              <input type="hidden" name="typeDeContrats" value={inputTypeDeContrat}/>
              <input type="hidden" name="tempsDeTravail" value={inputTempsDeTravail}/>
              <input type="hidden" name="experienceExigence" value={inputExpérience}/>
              <input type="hidden" name="grandDomaine" value={inputDomaine}/>
            </div>

          }

          <Modal
            isOpen={isFiltresAvancésMobileOpen}
            hide={() => setIsFiltresAvancésMobileOpen(false)}
            data-testid="FiltreRechercheMobile"
          >
            <ModalClose hide={() => setIsFiltresAvancésMobileOpen(false)} title="Fermer les filtres"/>
            <ModalTitle className={styles.filtresAvancésModalTitle} icon="ri-menu-2-line">
              Filtrer ma recherche
            </ModalTitle>
            <ModalContent className={styles.filtresAvancésModalContenu}>
              <CheckboxGroup legend="Type de contrat">
                {OffreEmploi.TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
                  <Checkbox
                    key={`Type de contrat${index}`}
                    label={typeDeContrat.libelléLong}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
                    value={typeDeContrat.valeur}
                    checked={inputTypeDeContrat.includes(typeDeContrat.valeur)}
                  />
                ))}
              </CheckboxGroup>
              <RadioButtonGroup legend="Temps de travail">
                {OffreEmploi.TEMPS_DE_TRAVAIL_LIST.map((tempsDeTravail, index) => (
                  <RadioButton
                    key={index}
                    label={tempsDeTravail.libellé}
                    name="tempsDeTravail"
                    checked={inputTempsDeTravail === `${tempsDeTravail.valeur}`}
                    onChange={() => setInputTempsDeTravail(`${tempsDeTravail.valeur}`)}
                    value={`${tempsDeTravail.valeur}`}
                  />
                ))}
              </RadioButtonGroup>
              <RadioButtonGroup legend="Niveau demandé">
                {OffreEmploi.EXPÉRIENCE.map((expérience, index) => (
                  <RadioButton
                    key={`Niveau demandé${index}`}
                    label={expérience.libellé}
                    name={expérience.libellé}
                    checked={inputExpérience === expérience.valeur}
                    onChange={() => setInputExpérience(expérience.valeur)}
                    value={expérience.valeur}
                  />
                ))}
              </RadioButtonGroup>
              <CheckboxGroup legend="Domaine">
                {référentielDomaineList.map((domaine, index) => (
                  <Checkbox
                    key={`Domaine${index}`}
                    label={domaine.libelle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleDomaine(e.target.value)}
                    value={domaine.code}
                    checked={inputDomaine.split(',').includes(domaine.code)}
                  />
                ))}
              </CheckboxGroup>
            </ModalContent>
            <ModalFooter className={styles.filtresAvancésModalFooter}>
              <div onClick={applyFiltresAvancés}>
                <Button
                  buttonType="withRightIcon"
                  icon={<AngleRightIcon color="#FFF" />}
                >
                  Appliquer les filtres
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>

        {!isSmallScreen && (
          <div className={styles.filtreRechercheDesktop} data-testid="FiltreRechercheDesktop">
            <SelectMultiple
              titre={générerTitreFiltre('Type de contrat', inputTypeDeContrat)}
              optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(OffreEmploi.TYPE_DE_CONTRAT_LIST)}
              onChange={toggleTypeDeContrat}
              currentInput={inputTypeDeContrat}
              name="typeDeContrats"
            />
            <SelectSingle
              titre={générerTitreFiltre('Temps de travail', inputTempsDeTravail)}
              name="tempsDeTravail"
              optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
              onChange={(value) => {
                setInputTempsDeTravail(value);
              }}
              currentInput={inputTempsDeTravail}
            />
            <SelectSingle
              titre={générerTitreFiltre('Niveau demandé', inputExpérience)}
              name="experienceExigence"
              optionList={OffreEmploi.EXPÉRIENCE}
              onChange={(value) => setInputExpérience(value)}
              currentInput={inputExpérience}
            />
            <SelectMultiple
              titre={générerTitreFiltre('Domaine', inputDomaine)}
              optionList={mapRéférentielDomaineToOffreEmploiCheckboxFiltre(référentielDomaineList)}
              onChange={toggleDomaine}
              currentInput={inputDomaine}
              name="grandDomaine"
            />
          </div>
        )}
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
