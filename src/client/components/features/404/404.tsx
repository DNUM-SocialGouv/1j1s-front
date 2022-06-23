import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/features/404/404.module.css';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function PageNotFound(){
  const { isSmallScreen } = useBreakpoint();
  return(
    <>
      <HeadTag
        title={'Page indisponible | 1jeune1solution'}
      />
      <div className={`${styles.flexContainer} fr-container fr-my-14v`}>
        <div className="fr-mx-4v">
          <Title as="h1" look="h3">Page non trouvée</Title>
          <p className="fr-text--bold">La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.</p>
          <p className="fr-text--md">Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.</p>
          <ButtonGroup
            className={styles.utilsButton}
            size="sm"
            isInlineFrom="sm">
            <Button>
              <Link href="/">
                <a>Retourner à l&apos;accueil</a>
              </Link>
            </Button>
          </ButtonGroup>
        </div>
        {!isSmallScreen &&
        <div className={styles.errorLogo}>
          <Image src={'/images/logos/technical-error.svg'} alt="" width='185' height='205'/>
        </div>
        }
      </div>
    </>
  );
}
