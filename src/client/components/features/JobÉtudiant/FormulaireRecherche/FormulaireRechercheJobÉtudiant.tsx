import '~/client/utils/string/string.util';

import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles
  from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.css';
import { Accordion } from '~/client/components/ui/Accordion/Accordion';
import { Button } from '~/client/components/ui/Button/Button';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { FilterIcon } from '~/client/components/ui/Icon/filter.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { InputLocalisation } from '~/client/components/ui/Input/InputLocalisation/InputLocalisation';
import { Select } from '~/client/components/ui/Select/Select';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
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

          {isSmallScreen &&
            <>
              <Button
                buttonType="linkWithRightIcon"
                icon={<FilterIcon />}
                onClick={() => setIsFiltresAvancésMobileOpen(true)}
              >
              Filtrer ma recherche
              </Button>
              <input type="hidden" name="grandDomaine" value={inputDomaine}/>
            </>
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
              <Accordion title="Domaine">
                {référentielDomaineList.map((domaine, index) => (
                  <Checkbox
                    key={index}
                    label={domaine.libelle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleDomaine(e.target.value)}
                    value={domaine.code}
                    checked={inputDomaine.split(',').includes(domaine.code)}
                  />
                ))}
              </Accordion>
            </ModalContent>
            <ModalFooter className={styles.filtresAvancésModalFooter}>
              <div onClick={applyFiltresAvancés}>
                <Button
                  buttonType="withRightIcon"
                  icon={<ArrowRightIcon />}
                >
                  Appliquer les filtres
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
        {!isSmallScreen && (
          <div className={styles.filtreRechercheDesktop} data-testid="FiltreRechercheDesktop">
            <Select
              multiple
              optionList={mapRéférentielDomaineToOffreEmploiCheckboxFiltre(référentielDomaineList)}
              onChange={setInputDomaine}
              label="Domaine"
              value={inputDomaine}
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
