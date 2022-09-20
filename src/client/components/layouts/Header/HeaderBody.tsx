import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { buildNavigation } from '~/client/components/layouts/Header/HeaderNav';
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
    <Container>
      <div className={styles.headerBody}>
        <Container className={styles.headerLogoServiceContainer}>
          <div className={styles.headerLogo}>
            <Link href="/" className={classNames(styles.headerLogoTitle, 'underline-none')}>
              <p>RÉPUBLIQUE</p>
              <p>FRANÇAISE</p>
            </Link>
          </div>
          { !isLargeScreen && <Button buttonType='withTopIcon' icon={<Icon name='burger-menu'/>} onClick={onClickSetModal}>Menu</Button>}
        </Container>
        <Link className={classNames(styles.headerService, 'underline-none')} href="/">
          1jeune1solution
        </Link>
        <ModalComponent
          close={onClickSetModal}
          isOpen={isModalOpen}
          className={styles.headerModal}>
          <ModalComponent.Title>
            <Icon name="menu" />
            <span>Menu</span>
          </ModalComponent.Title>
          <ModalComponent.Content>
            <Container className={styles.headerModalContainer}>
              <Link href={'/'} onClick={onClickSetModal}>Accueil</Link>
              {buildNavigation(path, true, onClickSetModal)}
            </Container>
          </ModalComponent.Content>
        </ModalComponent>
      </div>
    </Container>
  );
}
