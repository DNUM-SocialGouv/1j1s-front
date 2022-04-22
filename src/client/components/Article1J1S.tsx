import React from "react";
import Image from 'next/image'

import styles from "../../../styles/Article1J1S.module.css";
import { HomeProps } from '../../pages'

export const Article1J1S = (props: HomeProps) => {
  const { articles } = props;
  return (
    <section className={styles.container}>
      {articles.map((article: any) => {
        return (
          <div className="fr-card fr-enlarge-link" style={{
            width:300
          }}>
            <div className="fr-card__body">
              <h2 className="fr-card__title">
                {article.titre}
              </h2>
              <p className="fr-card__desc">{article.description}</p>
              <p className="fr-card__detail">{article.lien}</p>
            </div>
            <div className="fr-card__img">
              <Image src={article.image.url} layout="fill"/>
            </div>
          </div>
        )
      })}
    </section>
  );
};
