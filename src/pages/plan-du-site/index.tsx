import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { navigationItemList, NavigationItemWithChildren } from '~/client/components/layouts/Header/NavigationStructure';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './PlanDuSite.module.scss';

export default function PlanDuSite() {

  const MAIL_TO = 'contact-1j1s@sg.social.gouv.fr';

  function displayLinkWithChildren(children: NavigationItemWithChildren) {
    return (
      <li>
        <span>{children.label}</span>
        <ul>
          {
            children.children.map((value, index) => <li key={index}><Link href={value.link} >{value.label}</Link></li>)
          }
        </ul>
      </li>
    );
  }

  return (
    <>
      <HeadTag title="Plan du site | 1jeune1solution" description="Plan du site-"/>
      <Container className={styles.planDuSiteContainer}>
        <main>

          <h1 className={styles.planDuSiteTitre}>Plan du site</h1>

          <ul>
            <li>
              <Link href={navigationItemList.accueil.link}>{navigationItemList.accueil.label}</Link>
            </li>

            {displayLinkWithChildren(navigationItemList.offresNav)}
            {displayLinkWithChildren(navigationItemList.orientationNav)}
            {displayLinkWithChildren(navigationItemList.accompagnementNav)}
            {displayLinkWithChildren(navigationItemList.engagementNav)}
            {displayLinkWithChildren(navigationItemList.employeurNav)}
            
            <li><Link href="/cgu" >Conditions Générales d’utilisation</Link></li>
            <li><Link href="/accessibilite" >Accessibilité</Link></li>
            <li><Link href="/mentions-legales" >Mentions légales</Link></li>
            <li><Link href="/confidentialite" >Politique de confidentialité</Link></li>
            <li><Link href={`mailto:${MAIL_TO}`}><TextIcon text="Nous contacter" icon={<ExternalRedirectionIcon />}/></Link></li>
          </ul>

        </main>
      </Container>
    </>

  );
}
