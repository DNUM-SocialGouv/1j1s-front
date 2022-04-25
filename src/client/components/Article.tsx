import Image from "next/image";
import React from "react";

import { HomeProps } from "~/pages";
import styles from "~/styles/Article1J1S.module.css";

export const Article = (props: HomeProps) => {
  const { articles } = props;
  return (
    <section className={styles.container}>
      {articles.map((article: any, index) => {
        return (
          <div
            key={index}
            className="fr-card fr-enlarge-link"
            style={{
              width: 300,
            }}
          >
            <div className="fr-card__body">
              <h2 className="fr-card__title">{article.titre}</h2>
              <p className="fr-card__desc">{article.description}</p>
              <p className="fr-card__detail">{article.lien}</p>
            </div>
            <div className="fr-card__img">
              <Image alt="" src={article.image.url} layout="fill" />
            </div>
          </div>
        );
      })}
    </section>
  );
};
