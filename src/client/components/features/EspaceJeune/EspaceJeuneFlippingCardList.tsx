import classNames from 'classnames';
import React, { useMemo } from 'react';

import styles from '~/client/components/features/EspaceJeune/EspaceJeune.module.scss';
import { FlippingCard } from '~/client/components/ui/Card/FlippingCard';
import Marked from '~/client/components/ui/Marked/Marked';
import SeeMore from '~/client/components/ui/SeeMore/SeeMore';
import useSanitize from '~/client/hooks/useSanitize';
import { getExtrait } from '~/client/utils/getExtrait.utils';
import { CarteEspaceJeune } from '~/server/cms/domain/espaceJeune';

export function EspaceJeuneFlippingCardList(cardList: CarteEspaceJeune[], MAX_CARTE_PER_ROW: number) {

  function CarteEspaceJeune(carte: CarteEspaceJeune, index: number) {
    const titre = useSanitize(carte.titre);
    const bannière = carte.bannière?.url || '';
    const url = useSanitize(carte.url);
    const link = carte.article
      ? `/articles/${carte.article.slug}`
      : url;
    const contenu = useSanitize(carte.contenu);
    const extrait = useMemo(() => getExtrait(contenu, 110), [contenu]);
    const concerné = carte.concerné || '';

    return <FlippingCard
      key={index}
      imageUrl={bannière}
      link={link}
      title={titre}
      flippingCardContent={concerné}
      data-testid="card"
    >
      <Marked markdown={extrait} />
    </FlippingCard>;
  }

  function displayCartes(cardList: CarteEspaceJeune[]) {
    return cardList.map((carte, index) => {
      return CarteEspaceJeune(carte, index);
    });
  }

  function displaySectionCartes(cardList: CarteEspaceJeune[]) {
    return <>
      <div className={classNames(styles.cardList, styles.cardListPadding)}>
        {displayCartes(cardList.slice(0, MAX_CARTE_PER_ROW))}
      </div>
      {cardList.length > MAX_CARTE_PER_ROW &&
      <SeeMore>
        <div className={classNames(styles.cardList, styles.cardListPadding)}>
          {displayCartes(cardList.slice(MAX_CARTE_PER_ROW))}
        </div>
      </SeeMore>
      }
    </>;
  }

  return (
    <> {displaySectionCartes(cardList)} </>
  );


}
