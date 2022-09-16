import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Footer/Footer.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';

export function Footer() {

  const linkList = [
    {
      title: 'legifrance.gouv.fr',
      url: 'https://www.legifrance.gouv.fr/',
    },
    {
      title: 'gouvernement.fr',
      url: 'https://www.gouvernement.fr/',
    },
    {
      title: 'service-public.fr',
      url: 'https://www.service-public.fr/',
    },
    {
      title: 'data.gouv.fr',
      url: 'https://www.data.gouv.fr/',
    },
    {
      title: 'france.fr',
      url: 'https://www.france.fr/',
    },
  ];

  return (
    <>
      <p className={styles.preFooter}>
        Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 13 à 30 ans, sur tous les territoires.
      </p>
      <footer id="footer" className={styles.footer}>
        <Container>
          <div className={styles.footerHeader}>
            <div className={styles.footerSlogan}>
              <div className={styles.footerLogo}>
                <Image src="/images/logos/mariane.svg" alt="Mariane" width="55" height="20" />
                <div className={styles.footerPropriétaire}>
                  <span>Ministère du</span>
                  <span>travail, de</span>
                  <span>l&apos;emploi et de</span>
                  <span>l&apos;insertion</span>
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
              <div className={styles.footerMessage}>
                <p>#1jeune1solution</p>
                <p>Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 13 à 30 ans, sur tous les territoires.</p>
              </div>
              <div className={styles.footerLienExterne}>
                {linkList.map((link) => (<Link href={link.url} key={link.title}>
                  <span className={styles.footerLinkAction}>
                    {link.title}
                    <Icon name="external-redirection" />
                  </span>
                </Link>))}
              </div>
            </div>
          </div>
          <div className={styles.footerLienUtile}>
            <Link href="/cgu">Conditions générales d&apos;utilisations</Link>
            <Link href="/accessibilite">Accessibilité</Link>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </div>
          <p className={styles.footerCopyRight}>
            Sauf mention contraire, tous les contenus de ce site sont sous licence&nbsp;
            <Link
              href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf"
            >
              <span className={classNames(styles.footerLinkAction, 'underline')}>
                etalab-2.0
                <Icon name="external-redirection" />
              </span>
            </Link>
          </p>
        </Container>
      </footer>
    </>
  );
}
