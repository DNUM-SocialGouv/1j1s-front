import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/404/404.module.scss';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function UnavailableOffer(){
  const { isSmallScreen } = useBreakpoint();
  return(
    <>
      <HeadTag
        title={'Offre indisponible | 1jeune1solution'}
      />
      <div className={classNames(styles.flexContainer)}>
        <div className={styles.textWrapper}>
          <h3>L&apos;offre n&apos;est plus disponible</h3>
          <b>L&apos;offre que vous cherchez est indisponible. Excusez-nous pour la gêne occasionnée.</b>
          <p>Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.</p>

          <div className={styles.buttonWrapper}>
            <LinkAsButton href="/">
            Retourner à l&apos;accueil
            </LinkAsButton>
          </div>
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
