import classNames from 'classnames';
import React from 'react';

import Bannière from '~/client/components/features/MesuresEmployeurs/Bannière/Bannière';
import styles from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs.module.scss';
import { CardFlip } from '~/client/components/ui/Card/CardFlip';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import useSanitize from '~/client/hooks/useSanitize';
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
  const brief = extrait(contenu, 110);
  const link = carte.article
    ? `/articles/${carte.article.slug}`
    : url;
  const pourQui = useSanitize(carte.pourQui) || '';


  return <CardFlip
    imageUrl={bannière}
    link={link}
    linkLabel="En savoir plus"
    title={titre}
    flipCardContent={pourQui}
    data-testid="card"
  >
    <Marked markdown={brief} />
  </CardFlip>;
}

function extrait(contenu: string, size = 120): string {
  const end = contenu.substring(size);
  const charactersLeft = end.indexOf(' ');
  const brief = contenu.substring(0, size + charactersLeft);
  return `${brief} [...]`;
}
