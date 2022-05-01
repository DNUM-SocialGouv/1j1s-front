import Image from 'next/image';
import React from 'react';

import { PageAccueilArticle } from '~/server/services/cms/infra/repositories/strapiCms.service';

interface ArticleProps {
  data: PageAccueilArticle
}

export const Article = ({ data }: ArticleProps) => {
  return (
    <div
      className="fr-card fr-enlarge-link"
      style={{ width: 300 }}
    >
      <div className="fr-card__body">
        <h2 className="fr-card__title">{data.titre}</h2>
        <p className="fr-card__desc">{data.description}</p>
        <p className="fr-card__detail">{data.lien}</p>
      </div>
      <div className="fr-card__img">
        <Image alt="" src={data.image.url} layout="fill"/>
      </div>
    </div>
  );
};
