import Image from 'next/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Footer/Footer.module.scss';
import { Link } from '~/client/components/ui/Link/Link';

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
                <div className={styles.footerPropriétaire}>
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
                <Link href="https://www.legifrance.gouv.fr/">legifrance.gouv.fr</Link>
                <Link href="https://www.gouvernement.fr/">gouvernement.fr</Link>
                <Link href="https://www.service-public.fr/">service-public.fr</Link>
                <Link href="https://www.data.gouv.fr/">data.gouv.fr</Link>
              </div>
            </div>
          </div>
          <div className={styles.footerLienUtile}>
            <Link href="/cgu">Conditions générales d&apos;utilisations | 1jeune1solution</Link>
            <Link href="/accessibilite">Accessibilité | 1jeune1solution</Link>
            <Link href="/mentions-legales">Mentions légales | 1jeune1solution</Link>
            <Link href="/confidentialite">Politique de confidentialité | 1jeune1solution</Link>
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
