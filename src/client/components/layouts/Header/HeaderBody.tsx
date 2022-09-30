import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderNavMobile } from '~/client/components/layouts/Header/HeaderNavMobile';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function HeaderBody() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLargeScreen } = useBreakpoint();
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Container className={styles.headerBody}>
      <div className={styles.headerBodyContainer}>
        <div className={styles.headerLogoWrapper}>
          <Link href="/" className={styles.headerLogo} aria-label="Redirection vers la page d'accueil">
            <Image src="/images/logos/république-française.svg" alt="" layout="fill"/>
          </Link>
          { !isLargeScreen &&
            <ButtonComponent appearance='tertiary' icon={<Icon name='burger-menu'/>} iconPosition='top' onClick={toggleModal} label='Menu' />
          }
        </div>
        <Link className={styles.headerTitle} href="/">1jeune1solution</Link>
      </div>
      { !isLargeScreen &&
        <ModalComponent close={toggleModal} isOpen={isModalOpen}>
          <ModalComponent.Title>
            <Icon name="menu" />
            <span>Menu</span>
          </ModalComponent.Title>
          <ModalComponent.Content>
            <HeaderNavMobile toggleModal={toggleModal} />
          </ModalComponent.Content>
        </ModalComponent>
      }
    </Container>
  );
}
