import { ButtonGroup, Link, Title } from '@dataesr/react-dsfr';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { TagList } from '~/client/components/ui/TagList/TagList';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useSanitize from '~/client/hooks/useSanitize';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { EmploiNotFoundException } from '~/server/offresEmploi/domain/emploiNotFound.exception';
import { OffreEmploi, OffreEmploiId } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';
import styles from '~/styles/OffreEmploi.module.css';

interface EmploiProps {
  offreEmploi: OffreEmploi;
}

export default function ConsulterOffreEmploi(props: EmploiProps) {
  const { offreEmploi } = props;
  const descriptionOffreEmploi = useSanitize(offreEmploi?.description);

  if (!offreEmploi) return null;

  return (
    <>
      <HeadTag title={`${offreEmploi.intitulé} | 1jeune1solution`} />
      <main>
        <article className={styles.offreEmploiContainer}>
          <header className={styles.offreEmploiHeader}>
            <Title as="h1" look="h3">{offreEmploi.intitulé}</Title>
            {offreEmploi.entreprise.nom && <span className="fr-text--lead">{offreEmploi.entreprise.nom}</span>}
          </header>
          <TagList list={[
            offreEmploi.lieuTravail,
            offreEmploi.expérience,
            offreEmploi.typeContrat,
            offreEmploi.duréeTravail,
          ]} />
          {offreEmploi.description && <p dangerouslySetInnerHTML={{ __html: descriptionOffreEmploi }}/>}
          <ButtonGroup size="md">
            <Link
              href={offreEmploi.urlOffreOrigine}
              target="_blank"
              className="fr-btn--md fr-btn"
              icon="ri-external-link-line"
              iconPosition="right"
              display="flex"
            >
              Je postule sur Pôle Emploi
            </Link>
          </ButtonGroup>
        </article>
      </main>
    </>
  );
}

interface EmploiContext extends ParsedUrlQuery {
  id: OffreEmploiId;
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
