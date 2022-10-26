import classNames from 'classnames';
import React from 'react';

import RechercherMétier from '~/client/components/features/FicheMétier/Rechercher/RechercherMétier';
import { MétierDuSoinPartner } from '~/client/components/features/Partner/MétiersDuSoinPartner';
import { Container } from '~/client/components/layouts/Container/Container';
import { EnTeteSection } from '~/client/components/ui/EnTeteSection/EnTeteSection';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';

import styles from './decouvrir-les-metiers.module.scss';

export default function RechercherFicheMetierPage() {
  useReferrer();
  
  return (
    <>
      <HeadTag
        title={'Rechercher un métier | 1jeune1solution'}
        description="Trouver le métier qui vous correspond"/>
      <main id="contenu">
        <LightHero primaryText="Trouvez le métier" secondaryText="qui vous correspond" />
        <RechercherMétier />
        <EnTeteSection heading="Découvrez des services faits pour vous" />
        <div className={classNames(styles.additionalSection, 'background-white-lilac')}>
          <Container className={styles.partnerCardContainer}>
            <MétierDuSoinPartner />
          </Container>
        </div>
      </main>
    </>
  );
}
