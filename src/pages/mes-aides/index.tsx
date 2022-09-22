import Image from 'next/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { SectionLayout } from '~/client/components/layouts/Section/SectionLayout';
import { Color } from '~/client/components/props';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/mes-aides/index.module.scss';

export default function MesAidesPage() {

  return (
    <>
      <HeadTag title="Mes aides financières | 1jeune1solution" />
      <main id="contenu">
        <SectionLayout backgroundColor={Color.WHITE_LILAC}>
          <Container className={styles.mesAidesBannière}>
            <div className={styles.mesAidesBannièreWrapper}>
              <h1 className="headline">Je découvre les aides auxquelles j’ai droit en moins de 5 minutes</h1>
              <p>Avant de démarrer la simulation de vos aides, pensez à vous munir de vos ressources et de celles de vos parents si vous êtes encore à leur charge.</p>
              <LinkAsButton
                href="https://mes-aides.1jeune1solution.beta.gouv.fr/simulation/individu/demandeur/date_naissance"
                target="_blank"
                className={styles.mesAidesBannièreCommencerSimulation}
              >
                Je commence la simulation
              </LinkAsButton>
            </div>
            <div className={styles.mesAidesBannièreIllustration}>
              <Image src="/images/banners/mes-aides-financières.jpg" alt="" layout="fill" objectFit="cover" objectPosition="top left" />
            </div>
          </Container>
        </SectionLayout>

        {/* next section is hidden until cookies are set
        <MesAidesVideos/>
        */}


      </main>
    </>
  );
}
