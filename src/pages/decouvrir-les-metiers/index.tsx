import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { Link } from '~/client/components/ui/Link/Link';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { TextInput } from '~/client/components/ui/TextInput/TextInput';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { FicheMetierService } from '~/client/services/ficheMetier/ficheMetier.service';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import styles from './decouvrir-les-metiers.module.scss';

export default function RechercherFicheMetierPage() {
  const router = useRouter();
  const [fiches, setFiches] = useState<FicheMétier[]>([]);
  const [total, setTotal] = useState(0);

  const fichesMetierService  = useDependency<FicheMetierService>('ficheMetierService');

  const card = (résultat: FicheMétier) => (
    <Link href={'/'}>
      <div className={styles.cardTitle}>{résultat.nomMetier[0].toUpperCase() + résultat.nomMetier.slice(1)}</div>
      <div className={styles.cardContent} dangerouslySetInnerHTML={{ __html: résultat.accrocheMetier }}/>
      <div className={styles.cardLink}>
        <span>En savoir plus</span>
        <AngleRightIcon className={styles.cardLinkIcon}/>
      </div>
    </Link>
  );

  useEffect (() => {
    const queryString = stringify(router.query);
    if (queryString) {
      fichesMetierService.rechercherFichesMétier(queryString).then((response) => {
        if (response.instance === 'success') {
          setFiches(response.result.results);
          setTotal(response.result.estimatedTotalResults);
        }
      });
    }
  }, [router.query]);

  return (
    <>
      <HeadTag
        title={'Rechercher un métier | 1jeune1solution'}
        description="Trouver le métier qui vous correspond"/>
      <div className={styles.heroSection}>
        <Container>
          <div className={styles.heroMessage}>
            <span className={styles.heroMessageFirstPart}>Trouvez le métier</span>
            <span className={styles.heroMessageSecondPart}>qui vous correspond</span>
          </div>
        </Container>
      </div>
      <div className={styles.headingSection}>
        <Container className={styles.formContainer}>
          <TextInput className={styles.inputNomMetier} label="Indiquez le métier que vous recherchez" placeholder="Exemple: cuisinier"/>
          <Button buttonType='withRightIcon' icon={<MagnifyingGlassIcon className={styles.submitButtonIcon} />}>Rechercher</Button>
        </Container>
      </div>
      <div className={styles.resultInfosContainer}>
        <Container>
          <div><strong>{total}</strong> fiches métiers</div>
        </Container>
      </div>
      <div className={styles.bodySection}>
        <Container>
          <ol className={styles.resultList}>
            {fiches.map((ficheMetier) =>
              <li className={styles.resultCard} key={ficheMetier.id}>{card(ficheMetier)}</li>,
            )}
          </ol>
          { total > 0 && fiches.length > 0 &&
            <Pagination numberOfResult={total} numberOfResultPerPage={fiches.length} />
          }
        </Container>
      </div>
    </>
  );
}
