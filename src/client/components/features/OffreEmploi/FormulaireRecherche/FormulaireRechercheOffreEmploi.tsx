import '~/client/utils/string/string.util';

import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { Accordion } from '~/client/components/ui/Accordion/Accordion';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { InputLocalisation } from '~/client/components/ui/Input/InputLocalisation/InputLocalisation';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/Text/TextInput';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
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
  const [inputMotCle, setInputMotCle] = useState('');
  const [inputTypeLocalisation, setInputTypeLocalisation] = useState('');
  const [inputLibelleLocalisation, setInputLibelleLocalisation] = useState('');
  const [inputCodeLocalisation, setInputCodeLocalisation] = useState('');

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
                icon={<Icon name="filter" />}
                onClick={() => setIsFiltresAvancésMobileOpen(!isFiltresAvancésMobileOpen)}
              >
                Filtrer ma recherche
              </Button>
              <input type="hidden" name="typeDeContrats" value={inputTypeDeContrat} />
              <input type="hidden" name="tempsDeTravail" value={inputTempsDeTravail} />
              <input type="hidden" name="experienceExigence" value={inputExpérience} />
              <input type="hidden" name="grandDomaine" value={inputDomaine} />
            </div>
          }
          <ModalComponent
            close={() => setIsFiltresAvancésMobileOpen(!isFiltresAvancésMobileOpen)}
            closeTitle="Fermer les filtres"
            isOpen={isFiltresAvancésMobileOpen}>
            <ModalComponent.Title>
              <Icon name="menu" />
              <span>Filtrer ma recherche</span>
            </ModalComponent.Title>
            <ModalComponent.Content className={styles.filtresAvancésModalContenu}>
              <Accordion title="Type de contrat">
                {OffreEmploi.TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
                  <Checkbox
                    key={`Type de contrat${index}`}
                    label={typeDeContrat.libelléLong}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
                    value={typeDeContrat.valeur}
                    checked={inputTypeDeContrat.includes(typeDeContrat.valeur)}
                  />
                ))}
              </Accordion>
              <Accordion title="Temps de travail">
                {OffreEmploi.TEMPS_DE_TRAVAIL_LIST.map((tempsDeTravail, index) => (
                  <Radio
                    key={index}
                    label={tempsDeTravail.libellé}
                    name="tempsDeTravail"
                    checked={inputTempsDeTravail === tempsDeTravail.valeur}
                    onChange={() => setInputTempsDeTravail(tempsDeTravail.valeur)}
                    value={tempsDeTravail.valeur}
                  />
                ))}
              </Accordion>
              <Accordion title="Niveau demandé">
                {OffreEmploi.EXPÉRIENCE.map((expérience, index) => (
                  <Radio
                    key={`Niveau demandé${index}`}
                    label={expérience.libellé}
                    name={expérience.libellé}
                    checked={inputExpérience === expérience.valeur}
                    onChange={() => setInputExpérience(expérience.valeur)}
                    value={expérience.valeur}
                  />
                ))}
              </Accordion>
              <Accordion title="Domaine">
                {référentielDomaineList.map((domaine, index) => (
                  <Checkbox
                    key={`Domaine${index}`}
                    label={domaine.libelle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleDomaine(e.target.value)}
                    value={domaine.code}
                    checked={inputDomaine.split(',').includes(domaine.code)}
                  />
                ))}
              </Accordion>
            </ModalComponent.Content>
            <ModalComponent.Footer>
              <div className={styles.applyFiltersButton}>
                <Button
                  onClick={applyFiltresAvancés}
                  buttonType="withRightIcon"
                  icon={<Icon name="angle-right" />}
                >
                  Appliquer les filtres
                </Button>
              </div>
            </ModalComponent.Footer>
          </ModalComponent>
        </div>

        {!isSmallScreen && (
          <div className={styles.filtreRechercheDesktop}>
            <Select
              multiple
              optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(OffreEmploi.TYPE_DE_CONTRAT_LIST)}
              onChange={setInputTypeDeContrat}
              label="Type de contrat"
              value={inputTypeDeContrat}
              name="typeDeContrats"
            />
            <Select
              name="tempsDeTravail"
              optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
              onChange={setInputTempsDeTravail}
              value={inputTempsDeTravail}
              label="Temps de travail"
            />
            <Select
              name="experienceExigence"
              optionList={OffreEmploi.EXPÉRIENCE}
              onChange={setInputExpérience}
              value={inputExpérience}
              label="Niveau demandé"
            />
            <Select
              multiple
              optionList={mapRéférentielDomaineToOffreEmploiCheckboxFiltre(référentielDomaineList)}
              onChange={setInputDomaine}
              value={inputDomaine}
              name="grandDomaine"
              label="Domaine"
            />
          </div>
        )}
      </div>
      <div className={styles.buttonRechercher}>
        <Button
          buttonType="withRightIcon"
          icon={<Icon name="magnifying-glass" />}
          type="submit"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
}
