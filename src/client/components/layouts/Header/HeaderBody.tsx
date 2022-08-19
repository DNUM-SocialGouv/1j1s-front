import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { NavSubItem } from '~/client/components/layouts/Header/NavSubItem';
import { Accordion } from '~/client/components/ui/Accordion/Accordion';
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
          </button>
        </Container>
        <Link className={styles.headerService} href="/src/pages">
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
              <Accordion title="Offres">
                <NavSubItem title="Emplois" link="/emplois" current={path === '/emplois'} onClick={onClickSetModal}/>
                <NavSubItem title="Stages" link="/stages" current={path === '/stages'} onClick={onClickSetModal}/>
                <NavSubItem title="Apprentissage" link="/apprentissage" current={path === '/apprentissage'} onClick={onClickSetModal}/>
                <NavSubItem title="Jobs étudiants" link="/jobs-etudiants" current={path === '/jobs-etudiants'} onClick={onClickSetModal}/>
              </Accordion>
              <Accordion title="Aides, orientation et accompagnement">
                <NavSubItem title="Contrat Engagement Jeune" link="/contrat-engagement-jeune" current={path === '/contrat-engagement-jeune'} onClick={onClickSetModal}/>
                <NavSubItem title="Mes aides financières" link="/mes-aides" current={path === '/mes-aides'} onClick={onClickSetModal}/>
                <NavSubItem title="Mentorat" link="/mentorat" current={path === '/mentorat'} onClick={onClickSetModal}/>
                <NavSubItem title="Les mesures jeunes" link="/mesures-jeunes" current={path === '/mesures-jeunes'} onClick={onClickSetModal}/>
              </Accordion>
              <Accordion title="Engagement et bénévolat">
                <NavSubItem title="Service civique" link="/service-civique" current={path === '/service-civique'} onClick={onClickSetModal}/>
                <NavSubItem title="Bénévolat" link="/benevolat" current={path === '/benevolat'} onClick={onClickSetModal}/>
              </Accordion>
              <Accordion title="Employeur">
                <NavSubItem title="On s'amuse" link="/violet" current={path === '/violet'} onClick={onClickSetModal}/>
              </Accordion>
            </Container>
          </ModalComponent.Content>
        </ModalComponent>
      </div>
    </Container>
  );
}
