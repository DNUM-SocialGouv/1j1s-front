import Image from 'next/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Footer/Footer.module.scss';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';

export function Footer() {
  return (
    <>
      <div className={styles.preFooter}>
        Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 13 à 30 ans, sur tous les territoires.
      </div>
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
                <a href="/" target="_blank" rel="noreferrer">legifrance.gouv.fr <ExternalRedirectionIcon /></a>
                <a href="/" target="_blank" rel="noreferrer">gouvernement.fr <ExternalRedirectionIcon /></a>
                <a href="/" target="_blank" rel="noreferrer">service-public.fr <ExternalRedirectionIcon /></a>
                <a href="/" target="_blank" rel="noreferrer">data.gouv.fr <ExternalRedirectionIcon /></a>
              </div>
            </div>
          </div>
          <div className={styles.footerLienUtile}>
            <a>Plan du site</a>
            <a>Accessibilité</a>
            <a>Mentions légales</a>
            <a>Données personnelles</a>
          </div>
          <div className={styles.footerCopyRight}>
            Sauf mention contraire, tous les contenus de ce site sont sous licence&nbsp;
            <a href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf"
              target="_blank" rel="noreferrer">etalab-2.0 <ExternalRedirectionIcon /></a>

          </div>
        </Container>
      </footer>
    </>
  );
}
