import Link from 'next/link';
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
      <footer id="footer" className={styles.footer}>
        <Container>
          <div className={styles.footerHeader}>
            <div className={styles.footerSlogan}>
              <div className={styles.footerLogo}>
                <img src="/images/logos/mariane.svg" alt="Mariane" width="55" height="20" />
                <div className={styles.footerProprietaire}>
                  Ministère du travail, de l&apos;emploi et de l&apos;insertion
                </div>
                <div className={styles.footerDevise}>
                  Liberté, <br /> égalité, <br /> fraternité
                </div>
              </div>
              <div className={styles.footerLogoFranceRelance}>
                <img src="/images/logos/france-relance.svg" alt="Mariane" width="65" height="65" />
              </div>
            </div>
            <div className={styles.footerMessageWrapper}>
              <div className={styles.footerMessage}>
                <div>#1jeune1solution</div>
                <div>Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie
                  professionnelle de tous les jeunes de 13 à 30 ans, sur tous les territoires.
                </div>
              </div>
              <div className={styles.footerLienExterne}>
                <Link href="/">
                  <a>legifrance.gouv.fr <ExternalRedirectionIcon color="#3A3A3A" /></a>
                </Link>
                <Link href="/">
                  <a>gouvernement.fr <ExternalRedirectionIcon color="#3A3A3A" /></a>
                </Link>
                <Link href="/">
                  <a>service-public.fr <ExternalRedirectionIcon color="#3A3A3A" /></a>
                </Link>
                <Link href="/">
                  <a>data.gouv.fr <ExternalRedirectionIcon color="#3A3A3A" /></a>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.footerLienUtile}>
            <Link href="/"><a>Plan du site</a></Link>
            <Link href="/"><a>Accessibilité</a></Link>
            <Link href="/"><a>Mentions légales</a></Link>
            <Link href="/"><a>Données personnelles</a></Link>
          </div>
          <div className={styles.footerCopyRight}>
            Sauf mention contraire, tous les contenus de ce site sont sous licence
            <Link href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf">
              <a> etalab-2.0 <ExternalRedirectionIcon color="#3A3A3A" /></a>
            </Link>
          </div>
        </Container>
      </footer>
    </>
  );
}
