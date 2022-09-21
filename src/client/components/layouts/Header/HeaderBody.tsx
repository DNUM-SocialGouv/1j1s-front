import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { buildNavigation } from '~/client/components/layouts/Header/HeaderNav';
import { navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { Button } from '~/client/components/ui/Button/Button';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function HeaderBody() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [path, setPath] = useState(() => router.pathname || '');
  const { isLargeScreen } = useBreakpoint();
  const onClickSetModal = () => setIsModalOpen(!isModalOpen);
  
  useEffect(() => {
    if (path !== router.pathname){
      setPath(router.pathname);
    }
  }, [path, setPath, router]);

  return (
    <Container className={styles.headerBody}>
      <div className={styles.headerBodyContainer}>
        <div className={styles.headerLogoWrapper}>
          <Link href="/" className={styles.headerLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logos/logo_rf.svg" alt="Logo République Française" />
          </Link>
          { !isLargeScreen && <Button buttonType='withTopIcon' icon={<Icon name='burger-menu'/>} onClick={onClickSetModal}>Menu</Button>}
        </div>
        <Link className={styles.headerTitle} href="/">1jeune1solution</Link>
      </div>
      { !isLargeScreen &&
        <ModalComponent
          className={styles.headerModal}
          close={onClickSetModal}
          isOpen={isModalOpen}>
          <ModalComponent.Title>
            <Icon name="menu" />
            <span>Menu</span>
          </ModalComponent.Title>
          <ModalComponent.Content>
            <Container className={styles.headerModalContainer}>
              <nav role="navigation">
                <ul className={styles.headerModalNavigationList}>
                  {buildNavigation(navigationItemList, 0, path)}
                </ul>
              </nav>
            </Container>
          </ModalComponent.Content>
        </ModalComponent>
      }
    </Container>
  );
}
