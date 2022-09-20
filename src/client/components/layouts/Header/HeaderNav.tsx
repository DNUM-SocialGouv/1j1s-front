import { useRouter } from 'next/router';
import React, {
  useEffect,
  useState,
} from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { NavigationItem,navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavItemWithSubItems } from '~/client/components/layouts/Header/NavItemWithSubItems';

export function HeaderNav() {
  const router = useRouter();
  const [path, setPath] = useState(() => router.pathname || '');

  useEffect(() => {
    if (path !== router.pathname){
      setPath(router.pathname);
    }
  }, [path, setPath, router]);

  return (
    <Container className={styles.headerNavigation}>
      <nav id="header-navigation"
        role="navigation"
        aria-label="Menu principal">
        <ul className={styles.headerNavigationList}>
          {buildNavigation(navigationItemList, 0, path)}
        </ul>
      </nav>
    </Container>
  );
}

export function buildNavigation(navigationItemList: NavigationItem[], nestingLevel: number, path: string) {
  return navigationItemList.map((item, index) => {
    if ('children' in item && item.children.length > 0) {
      return (
        <NavItemWithSubItems key={index} label={item.label} className={styles.navItem} path={path} subItemList={item.children}>
          {buildNavigation(item.children, nestingLevel + 1, path)}
        </NavItemWithSubItems>
      );
    } else if ('link' in item) {
      return <NavItem label={item.label} link={item.link} key={index} className={nestingLevel > 0 ? styles.subNavItem : styles.navItem} path={path}/>;
    }
  });
}

/*
export function buildNavigation(path: string, isModale: boolean, onClick?: () => void) {
  const offresNav: NavigationItem = {
    childrenList: [
      { current: path === '/emplois', link: '/emplois', title: 'Emplois' },
      { current: path === '/stages', link: '/stages', title: 'Stages' },
      { current: path === '/apprentissage', link: '/apprentissage', title: 'Contrats d’alternance' },
      { current: path === '/jobs-etudiants', link: '/jobs-etudiants', title: 'Jobs étudiants' },
    ],
    title: 'Offres',
  };

  const orientationNav: NavigationItem = {
    childrenList: [
      { current: path === '/formations', link: '/formations', title: 'Formations' },
      { current: path === '/decouvrir-les-metiers', link: '/decouvrir-les-metiers', title: 'Découvrir les métiers' },
    ],
    title: 'Formations et orientation',
  };

  const accompagnementNav: NavigationItem = {
    childrenList: [
      { current: path === '/contrat-engagement-jeune', link: '/contrat-engagement-jeune', title: 'Contrat Engagement Jeune' },
      { current: path === '/mes-aides', link: '/mes-aides', title: 'Mes aides financières' },
      { current: path === '/mentorat', link: '/mentorat', title: 'Mentorat' },
      { current: path === '/accompagnement', link: '/accompagnement', title: 'Accompagnement' },
          { current: path === '/creer-mon-cv', link: '/creer-mon-cv', title: 'CV personnalisé' },
      { current: path === '/mesures-jeunes', link: '/mesures-jeunes', title: 'Les mesures jeunes' },
    ],
    title: 'Aides et accompagnement',
  };

  const engagementNav: NavigationItem = {
    childrenList: [
      { current: path === '/service-civique', link: '/service-civique', title: 'Service civique' },
      { current: path === '/benevolat', link: '/benevolat', title: 'Bénévolat' },
    ],
    title: 'Engagement',
  };

  const employeurNav: NavigationItem = {
    childrenList: [
      { current: path === '/je-deviens-mentor', link: '/je-deviens-mentor', title: 'Je deviens mentor' },
      { current: path === '/les-entreprises-s-engagent', link: '/les-entreprises-s-engagent', title: 'Rejoindre la mobilisation' },
      { current: path === '/immersions', link: '/immersions', title: 'Je propose des immersions' },
      { current: path === '/mesures-employeurs', link: '/mesures-employeurs', title: 'Les mesures employeurs' },
      { current: path === '/mon-espace', link: '/mon-espace', title: 'Accéder à mon espace' },
      { current: path === '/je-recrute', link: '/je-recrute', title: 'Recruter et agir pour les jeunes' },
          { current: path === '/rejoindre-mobilisation-poe', link: '/rejoindre-mobilisation-poe', title: 'Je forme les jeunes grâce à l\'emploi' },
    ],
    title: 'Je suis employeur',
  };

  const navigationItemsList: NavigationItem[] = [offresNav, orientationNav, accompagnementNav, engagementNav, employeurNav];

  return (
    navigationItemsList.map((navigationItem) => {
      return (
        isModale ?
          <Accordion key={navigationItem.title} title={navigationItem.title}>
            {navigationItem.childrenList?.map((navSubItem) => {
              return (
                <NavSubItem key={navSubItem.title} title={navSubItem.title} link={navSubItem.link ? navSubItem.link : ''} current={navSubItem.current} onClick={onClick}/>
              );
            })}
          </Accordion>
          :
          <NavItem
            key={navigationItem.title}
            title={navigationItem.title}
            current={navigationItem.childrenList ? navigationItem.childrenList.some((navigationItem) => navigationItem.current === true) : false}>
            {navigationItem.childrenList?.map((navSubItem) => {
              return (
                <NavSubItem key={navSubItem.title} title={navSubItem.title} link={navSubItem.link ?? ''} current={navSubItem.current}/>
              );
            })}
          </NavItem>
      );
    })
  );
}
*/

