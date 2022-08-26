import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { buildNavigation } from '~/client/components/layouts/Header/HeaderNav';
import { BurgerMenuIcon } from '~/client/components/ui/Icon/burger-menu.icon';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

export function HeaderBody() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [path, setPath] = useState(() => router.pathname || '');

  const onClickSetModal = () => setIsModalOpen(!isModalOpen);
  
  useEffect(() => {
    if (path !== router.pathname){
      setPath(router.pathname);
    }
  }, [path, setPath, router]);

  return(
    <Container>
      <div className={styles.headerBody}>
        <Container className={styles.headerLogoServiceContainer}>
          <div className={styles.headerLogo}>
            <Link href="/" className={styles.headerLogoTitle}>
              <p>RÉPUBLIQUE</p>
              <p>FRANÇAISE</p>
            </Link>
          </div>
          <div className={styles.headerOperator}>
            <Image
              src="/images/logos/france-relance.svg"
              alt="France Relance"
              width="200"
              height="66"
            />
          </div>
          <button className={styles.headerModalButton} onClick={onClickSetModal}>
            <BurgerMenuIcon/>
            <p>Menu</p>
          </button>
        </Container>
        <Link className={styles.headerService} href="/">
          1jeune1solution
        </Link>

        <ModalComponent
          close={onClickSetModal}
          closeLabel=''
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
