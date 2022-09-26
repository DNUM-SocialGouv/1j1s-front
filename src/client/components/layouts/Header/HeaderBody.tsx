import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderNavMobile } from '~/client/components/layouts/Header/HeaderNavMobile';
import { Button } from '~/client/components/ui/Button/Button';
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
          <Link href="/" className={styles.headerLogo}>
            <Image src="/images/logos/logo_rf.svg" alt="" layout="fill"/>
          </Link>
          { !isLargeScreen && <Button buttonType='withTopIcon' icon={<Icon name='burger-menu'/>} onClick={toggleModal}>Menu</Button>}
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
