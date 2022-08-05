import Image from 'next/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Footer/Footer.module.scss';

export function Footer() {
  return (
    <>
      <p className={styles.preFooter}>
        Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 13 à 30 ans, sur tous les territoires.
      </p>
      <footer id="footer" className={styles.footer} role="contentinfo">
        <Container>
          <div className={styles.footerHeader}>
            <div className={styles.footerSlogan}>
              <div className={styles.footerLogo}>
                <Image src="/images/logos/mariane.svg" alt="Mariane" width="55" height="20" />
                <div className={styles.footerProprietaire}>
                  Ministère du <br />travail, de<br /> l&apos;emploi et de<br /> l&apos;insertion
                </div>
                <div className={styles.footerDevise}>
                  <Image src="/images/logos/devise.svg" alt="Mariane" width="52" height="37" />
                </div>
              </div>
              <div className={styles.footerLogoFranceRelance}>
                <Image src="/images/logos/france-relance.svg" alt="Mariane" width="65" height="65" />
              </div>
            </div>
            <div className={styles.footerMessageWrapper}>
              <p className={styles.footerMessage}>
                #1jeune1solution <br /><br />
                Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie
                  professionnelle de tous les jeunes de 13 à 30 ans, sur tous les territoires.
              </p>
              <div className={styles.footerLienExterne}>
                <a href="/" target="_blank" rel="noreferrer">legifrance.gouv.fr</a>
                <a href="/" target="_blank" rel="noreferrer">gouvernement.fr</a>
                <a href="/" target="_blank" rel="noreferrer">service-public.fr</a>
                <a href="/" target="_blank" rel="noreferrer">data.gouv.fr</a>
              </div>
            </div>
          </div>
          <div className={styles.footerLienUtile}>
            <a href="#">Plan du site</a>
            <a href="#">Accessibilité</a>
            <a href="#">Mentions légales</a>
            <a href="#">Données personnelles</a>
          </div>
          <p className={styles.footerCopyRight}>
            Sauf mention contraire, tous les contenus de ce site sont sous licence&nbsp;
            <a href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf"
              target="_blank" rel="noreferrer">etalab-2.0</a>
          </p>
        </Container>
      </footer>
    </>
  );
}
