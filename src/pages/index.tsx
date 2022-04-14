import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import React from "react";

import styles from "../../styles/Home.module.css";
import { FooterUnJUnS } from "../client/components/FooterUnJUnS";
import { HeaderUnJUnS } from "../client/components/HeaderUnJUnS";
import { CardEmploiUnJUnS } from '../client/components/CardEmploiUnJUnS';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>1 jeune 1 solution</title>
        <meta name="description" content="Toutes les solutions pour l'avenir des jeunes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderUnJUnS />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

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

      <Script
        type="module"
        src="../../node_modules/@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js"
      />
      <Script
        type="text/javascript"
        noModule
        src="../../node_modules/@gouvfr/dsfr/dist/dsfr/dsfr.nomodule.min.js"
      />

      <FooterUnJUnS />
    </div>
  );
};

export default Home;
