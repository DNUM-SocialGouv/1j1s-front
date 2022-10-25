import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { isNavigationItem, NavigationItem, navigationItemList, NavigationItemWithChildren } from '~/client/components/layouts/Header/NavigationStructure';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './PlanDuSite.module.scss';

export default function PlanDuSite() {

  const MAIL_TO = 'contact-1j1s@sg.social.gouv.fr';

  function displayNavigationTree(item: NavigationItem | NavigationItemWithChildren) {
    if (isNavigationItem(item)) {
      return (
        <li key={item.link}><Link href={ item.link }>{item.label}</Link></li>
      );
    } else {
      return (
        <li key={item.label}>
          <span>{item.label}</span>
          <ul>
            {item.children.map((sub) => displayNavigationTree(sub))}
          </ul>
        </li>
      );
    }
  }

  return (
    <>
      <HeadTag title="Plan du site | 1jeune1solution" description="Plan du site-"/>
      <Container className={styles.planDuSiteContainer}>
        <main id="contenu">

          <h1 className={styles.planDuSiteTitre}>Plan du site</h1>

          <ul>
            <li>
              <Link href={navigationItemList.accueil.link}>{navigationItemList.accueil.label}</Link>
            </li>

            {displayNavigationTree(navigationItemList.offresNav)}
            {displayNavigationTree(navigationItemList.orientationNav)}
            {displayNavigationTree(navigationItemList.accompagnementNav)}
            {displayNavigationTree(navigationItemList.engagementNav)}
            {displayNavigationTree(navigationItemList.employeurNav)}
            
            <li><Link href="/cgu" >Conditions Générales d’utilisation</Link></li>
            <li><Link href="/accessibilite" >Accessibilité : Partiellement conforme</Link></li>
            <li><Link href="/mentions-legales" >Mentions légales</Link></li>
            <li><Link href="/confidentialite" >Politique de confidentialité</Link></li>
            <li><Link href={`mailto:${MAIL_TO}`}><TextIcon text="Nous contacter" icon={<ExternalRedirectionIcon />}/></Link></li>
          </ul>

        </main>
      </Container>
    </>

  );
}
