import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';

import styles from '~/client/components/features/404/404.module.css';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function PageNotFound(){
  const { isSmallScreen } = useBreakpoint();
  return(
    <div className={`${styles.flexContainer} fr-container fr-my-14v`}>
      <div className="fr-mx-4v">
        <Title as="h1" look="h3">Page non trouvée</Title>
        <p className="fr-text--bold">La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.</p>
        <p className="fr-text--md">Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut de page. Sinon contactez-nous pour que l’on puisse vous rediriger vers la bonne information.</p>
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
  );
}
