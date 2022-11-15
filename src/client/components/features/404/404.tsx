import classNames from 'classnames';
import Image from 'next/legacy/image';
import React from 'react';

import styles from '~/client/components/features/404/404.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function PageNotFound(){
  const { isSmallScreen } = useBreakpoint();
  return(
    <>
      <HeadTag
        title={'Page indisponible | 1jeune1solution'}
      />
      <main id="contenu" className={classNames(styles.flexContainer)}>
        <div className={styles.textWrapper}>
          <h1>Page non trouvée</h1>
          <p className="bold">La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.</p>
          <p>Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.</p>
          <div className={styles.buttonWrapper}>
            <Link href="/" appearance="asPrimaryButton">Retourner à l&apos;accueil</Link>
          </div>
        </div>
        {!isSmallScreen &&
        <div className={styles.errorLogo}>
          <Image src={'/images/logos/technical-error.svg'} alt="" width='185' height='205'/>
        </div>
        }
      </main>
    </>
  );
}
