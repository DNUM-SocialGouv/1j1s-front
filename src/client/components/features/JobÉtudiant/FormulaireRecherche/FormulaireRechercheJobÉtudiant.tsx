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
  TextInput,
} from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.css';
import { InputLocalisation } from '~/client/components/ui/Input/InputLocalisation/InputLocalisation';
import { SelectMultiple } from '~/client/components/ui/Select/SelectMultiple/SelectMultiple';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
  générerTitreFiltre,
  mapRéférentielDomaineToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { référentielDomaineList } from '~/server/offresEmploi/domain/offreEmploi';

export function FormulaireRechercheJobÉtudiant() {
  const rechercheJobÉtudiantForm = useRef<HTMLFormElement>(null);

  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);
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
    rechercheJobÉtudiantForm.current?.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );
  }, []);

  const toggleDomaine = useCallback((value: string) => {
    setInputDomaine(inputDomaine.appendOrRemoveSubStr(value));
  }, [inputDomaine]);

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
            data-testid="InputRechercheMotClé"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
