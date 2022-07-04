import '~/client/utils/string/string.util';

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTitle,
  Radio,
  RadioGroup,
  TextInput,
} from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { InputLocalisation } from '~/client/components/features/InputLocalisation/InputLocalisation';
import styles
  from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.css';
import { SelectMultiple } from '~/client/components/ui/Select/SelectMultiple/SelectMultiple';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
  générerTitreFiltre,
  mapExpérienceAttendueToOffreEmploiCheckboxFiltre,
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

  const toggleExpérience = useCallback((value: string) => {
    setInputExpérience(inputExpérience.appendOrRemoveSubStr(value));
  }, [inputExpérience]);

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
            data-testid="InputRechercheMotClé"
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
          <input type="hidden" name="typeDeContrats" value={inputTypeDeContrat}/>
          <input type="hidden" name="tempsDeTravail" value={inputTempsDeTravail}/>
          <input type="hidden" name="experienceExigence" value={inputExpérience}/>
          <input type="hidden" name="grandDomaine" value={inputDomaine}/>

          {isSmallScreen &&
            <Button
              styleAsLink
              className={`${styles.buttonFiltrerRecherche} fr-text--sm`}
              icon="ri-filter-fill"
              iconPosition="left"
              onClick={() => setIsFiltresAvancésMobileOpen(true)}
              data-testid="ButtonFiltrerRecherche"
            >
              Filtrer ma recherche
            </Button>
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
              <CheckboxGroup legend="Type de Contrat" data-testid="FiltreTypeDeContrats">
                {OffreEmploi.TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
                  <Checkbox
                    key={index}
                    label={typeDeContrat.libelléLong}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
                    value={typeDeContrat.valeur}
                    checked={inputTypeDeContrat.includes(typeDeContrat.valeur)}
                  />
                ))}
              </CheckboxGroup>
              <RadioGroup legend="Temps de travail" data-testid="FiltreTempsDeTravail">
                {OffreEmploi.TEMPS_DE_TRAVAIL_LIST.map((tempsDeTravail, index) => (
                  <Radio
                    key={index}
                    label={tempsDeTravail.libellé}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    checked={inputTempsDeTravail === `${tempsDeTravail.valeur}`}
                    onChange={() => setInputTempsDeTravail(`${tempsDeTravail.valeur}`)}
                    value={`${tempsDeTravail.valeur}`}
                  />
                ))}
              </RadioGroup>
              <CheckboxGroup legend="Niveau demandé">
                {OffreEmploi.EXPÉRIENCE.map((expérience, index) => (
                  <Checkbox
                    key={index}
                    label={expérience.libellé}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleExpérience(e.target.value)}
                    value={expérience.valeur}
                    checked={inputExpérience.includes(expérience.valeur)}
                  />
                ))}
              </CheckboxGroup>
              <CheckboxGroup legend="Domaine">
                {référentielDomaineList.map((domaine, index) => (
                  <Checkbox
                    key={index}
                    label={domaine.libelle}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleDomaine(e.target.value)}
                    value={domaine.code}
                    checked={inputDomaine.split(',').includes(domaine.code)}
                  />
                ))}
              </CheckboxGroup>
            </ModalContent>
            <ModalFooter className={styles.filtresAvancésModalFooter}>
              <Button
                onClick={applyFiltresAvancés}
                icon="ri-arrow-right-s-line"
                iconPosition="right"
                data-testid="ButtonAppliquerFiltres"
              >
                Appliquer les filtres
              </Button>
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
            />
            <SelectSingle
              titre={générerTitreFiltre('Temps de travail', inputTempsDeTravail)}
              optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
              onChange={(value) => setInputTempsDeTravail(value)}
              currentInput={inputTempsDeTravail}
            />
            <SelectMultiple
              titre={générerTitreFiltre('Niveau demandé', inputExpérience)}
              optionList={mapExpérienceAttendueToOffreEmploiCheckboxFiltre(OffreEmploi.EXPÉRIENCE)}
              onChange={toggleExpérience}
              currentInput={inputExpérience}
            />
            <SelectMultiple
              titre={générerTitreFiltre('Domaine', inputDomaine)}
              optionList={mapRéférentielDomaineToOffreEmploiCheckboxFiltre(référentielDomaineList)}
              onChange={toggleDomaine}
              currentInput={inputDomaine}
            />
          </div>
        )}
      </div>
      <Button
        className={styles.buttonRechercher}
        submit={true}
        icon="ri-search-line"
        iconPosition="right"
        data-testid="ButtonRechercher"
      >
        Rechercher
      </Button>
    </form>
  );
}
