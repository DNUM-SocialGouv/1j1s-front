import { GetStaticPropsResult } from "next";
import Head from "next/head";
import Script from "next/script";
import React from "react";

import { Article1J1S } from "~/client/components/Article1J1S";
import { CardEmploiUnJUnS } from "~/client/components/CardEmploiUnJUnS";
import { FooterUnJUnS } from "~/client/components/FooterUnJUnS";
import { HeaderUnJUnS } from "~/client/components/HeaderUnJUnS";
import Tracker from "../client/utils/tracker.util";
import { PageAccueilArticle } from "~/server/services/cms/infra/repostitories/strapiCms.service";
import { dependencies } from "~/server/start";
import styles from "~/styles/Home.module.css";

export interface HomeProps {
  articles: PageAccueilArticle[];
}

export default function Home(props: HomeProps) {
  const { articles } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>1 jeune 1 solution</title>
        <meta
          name="description"
          content="Toutes les solutions pour l'avenir des jeunes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderUnJUnS />

      <Article1J1S articles={articles} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <button onClick={() => Tracker.trackEvent("click", "matomo test")}>
          Test Matomo
        </button>

        <button
          type="button"
          onClick={() => {
            throw new Error("Sentry Frontend Error");
          }}
        >
          Throw error
        </button>

        <div className={styles.grid}>
          <CardEmploiUnJUnS />

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <Script type="module" src="@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js" />
      <Script
        type="text/javascript"
        noModule
        src="@gouvfr/dsfr/dist/dsfr/dsfr.nomodule.min.js"
      />

      <FooterUnJUnS />
    </div>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeProps>
> {
  const articles =
    await dependencies.accueilCMSDependencies.getPageAccueilList();

  return {
    props: {
      articles,
    },
  };
}
