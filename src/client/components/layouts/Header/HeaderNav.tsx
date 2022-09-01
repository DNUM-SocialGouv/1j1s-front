import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavSubItem } from '~/client/components/layouts/Header/NavSubItem';
import { CommonProps } from '~/client/components/props';
import { Accordion } from '~/client/components/ui/Accordion/Accordion';

interface NavigationItem {
  title: string
  link?: string
  current?: boolean
  childrens?: NavigationItem[]
}

export function HeaderNav({ children }: React.PropsWithChildren<CommonProps>) {
  return(
    <div className={styles.headerNavigationContainer}>
      <Container className={styles.headerNavigation}>
        <nav
          id="header-navigation"
          role="navigation"
          aria-label="Menu principal"
        >
          {children && (
            <ul className={styles.headerNavigationList}>
              {children}
            </ul>
          )}
        </nav>
      </Container>
    </div>
  );
}

export function buildNavigation(path: string, isModale: boolean, onClick?: () => void) {

  const OffresNav: NavigationItem =
    {
      childrens:
        [
          { current: path === '/emplois', link: '/emplois', title: 'Emplois' },
          { current: path === '/stages', link: '/stages', title: 'Stages' },
          { current: path === '/apprentissage', link: '/apprentissage', title: 'Contrats d’alternance' },
          { current: path === '/jobs-etudiants', link: '/jobs-etudiants', title: 'Jobs étudiants' },
        ],
      title: 'Offres',
    };

  const OrientationNav: NavigationItem =
    {
      childrens:
        [
          { current: path === '/formations', link: '/formations', title: 'Formations' },
          { current: path === '/decouvrir-les-metiers', link: '/decouvrir-les-metiers', title: 'Découvrir les métiers' },
        ],
      title: 'Formation et orientation',
    };

  const AccompagnementNav: NavigationItem =
    {
      childrens:
        [
          { current: path === '/contrat-engagement-jeune', link: '/contrat-engagement-jeune', title: 'Contrat Engagement Jeune' },
          { current: path === '/mes-aides', link: '/mes-aides', title: 'Mes aides financières' },
          { current: path === '/mentorat', link: '/mentorat', title: 'Mentorat' },
          { current: path === '/creer-mon-cv', link: '/creer-mon-cv', title: 'CV personnalisé' },
          { current: path === '/mesures-jeunes', link: '/mesures-jeunes', title: 'Les mesures jeunes' },
        ],
      title: 'Aides et accompagnement',
    };

  const EngagementNav: NavigationItem =
    {
      childrens:
        [
          { current: path === '/service-civique', link: '/service-civique', title: 'Service civique' },
          { current: path === '/benevolat', link: '/benevolat', title: 'Bénévolat' },
        ],
      title: 'Engagement et bénévolat',
    };

  const EmployeurNav: NavigationItem =
    {
      childrens:
        [
          { current: path === '/je-deviens-mentor', link: '/je-deviens-mentor', title: 'Je deviens mentor' },
          { current: path === '/les-entreprises-s-engagent', link: '/les-entreprises-s-engagent', title: 'Rejoindre la mobilisation' },
          { current: path === '/mesures-employeurs', link: '/mesures-employeurs', title: 'Les mesures employeurs' },
        ],
      title: 'Je suis employeur',
    };

  const navigationItemsList: NavigationItem[] = [OffresNav, OrientationNav, AccompagnementNav, EngagementNav, EmployeurNav];
  return(
    navigationItemsList.map((navigationItem) => {
      return(
        isModale ?
          <Accordion key={navigationItem.title} title={navigationItem.title}>
            {navigationItem.childrens?.map((navSubItem) => {
              return(
                <NavSubItem key={navSubItem.title} title={navSubItem.title} link={navSubItem.link ? navSubItem.link : ''} current={navSubItem.current} onClick={onClick}/>
              );
            })}
          </Accordion>
          :
          <NavItem key={navigationItem.title} title={navigationItem.title}>
            {navigationItem.childrens?.map((navSubItem) => {
              return(
                <NavSubItem key={navSubItem.title} title={navSubItem.title} link={navSubItem.link ? navSubItem.link : ''} current={navSubItem.current}/>
              );
            })}
          </NavItem>
      );
    })
  );
}



