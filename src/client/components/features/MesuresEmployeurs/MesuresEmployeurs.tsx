import classNames from 'classnames';
import React, { useMemo } from 'react';

import Bannière from '~/client/components/features/MesuresEmployeurs/Bannière/Bannière';
import styles from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs.module.scss';
import { FlippingCard } from '~/client/components/ui/Card/FlippingCard';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import useSanitize from '~/client/hooks/useSanitize';
import { getExtrait } from '~/client/utils/getExtrait.utils';
import { CarteMesuresEmployeurs, MesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';

import Marked from '../../ui/Marked/Marked';
import { HeadTag } from '../../utils/HeaderTag';

export interface MesuresEmployeursProps {
  mesuresEmployeurs: MesuresEmployeurs;
}

export function MesuresEmployeursComponent({ mesuresEmployeurs }: MesuresEmployeursProps) {
  const { dispositifs } = mesuresEmployeurs;
  const { isLargeScreen } = useBreakpoint();
  const isMobile = !isLargeScreen;
  return (
    <>
      <HeadTag
        title="Mesures Employeurs | 1jeune1solution"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu" className={classNames({ [styles.mobile]: isMobile })}>
        <Bannière/>
        <section className={styles.dispositifs}>
          <h2 id="dispositifs">
            Découvrir les dispositifs pour vous aider à recruter
          </h2>
          <ul className={styles.cartes}>
            {dispositifs.map((carte) => (<li key={carte.url}><CarteMesureEmployeur carte={carte} isMobile={isMobile}/></li>))}
          </ul>
        </section>
      </main>
    </>
  );
}

interface CarteMesureEmployeurProps {
  carte: CarteMesuresEmployeurs;
  isMobile: boolean;
}

function CarteMesureEmployeur({ carte }: CarteMesureEmployeurProps) {
  const titre = useSanitize(carte.titre);
  const bannière = carte.bannière?.url || '';
  const url = useSanitize(carte.url);
  const contenu = useSanitize(carte.contenu);
  const brief = useMemo(() => getExtrait(contenu, 110), [contenu]);
  const link = carte.article
    ? `/articles/${carte.article.slug}`
    : url;
  const pourQui = carte.pourQui || '';


  return <FlippingCard
    imageUrl={bannière}
    link={link}
    title={titre}
    flippingCardContent={pourQui}
    data-testid="card"
  >
    <Marked markdown={brief} />
  </FlippingCard>;
}
