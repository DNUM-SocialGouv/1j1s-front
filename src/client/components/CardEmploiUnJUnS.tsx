import Link from "next/link";
import React from "react";

import styles from "../../../styles/Home.module.css";

export const CardEmploiUnJUnS = () => {
  return (
    <Link href="/emplois">
      <a className={styles.card} data-testid="lien-emploi">
        <h2>Les emplois &rarr;</h2>
        <p>Le test de l api pole emplois.</p>
      </a>
    </Link>
  );
};
