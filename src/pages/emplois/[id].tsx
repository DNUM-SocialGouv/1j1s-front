import { Title } from '@dataesr/react-dsfr';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { TagList } from '~/client/components/TagList/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { EmploiNotFoundException } from '~/server/offresEmploi/domain/emploiNotFound.exception';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';
import styles from '~/styles/OffreEmploi.module.css';

interface EmploiProps {
  offreEmploi: OffreEmploi | undefined;
}

export default function EmploiDetails(props: EmploiProps) {
  const { offreEmploi } = props;
  const descriptionOffreEmploi = useSanitize(offreEmploi?.description);

  if (!offreEmploi) return null;

  return (
    <main>
      <article className={styles.offreEmploiContainer}>
        <header className={styles.offreEmploiHeader}>
          <Title as="h1" look="h3">{offreEmploi.intitulé}</Title>
          {offreEmploi.entreprise.nom && <span className="fr-text--lead">{offreEmploi.entreprise.nom}</span>}
        </header>
        <TagList list={[offreEmploi.expérience, offreEmploi.typeContrat, offreEmploi.duréeTravail]}>
        </TagList>
        {offreEmploi.description && <p dangerouslySetInnerHTML={{ __html: descriptionOffreEmploi }}/>}
      </article>
    </main>
  );
}

interface EmploiContext extends ParsedUrlQuery {
  id: string;
}

export async function getStaticProps(context: GetStaticPropsContext<EmploiContext>): Promise<GetStaticPropsResult<EmploiProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id } = context.params;
  const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi.handle(id);

  if (!offreEmploi) {
    throw new EmploiNotFoundException(id);
  }

  return {
    props: {
      offreEmploi: JSON.parse(JSON.stringify(offreEmploi)),
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    fallback: true,
    paths: [],
  };
}
