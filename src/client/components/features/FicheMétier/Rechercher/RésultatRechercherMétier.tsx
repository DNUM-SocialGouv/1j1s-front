import React from 'react';

import styles
  from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier.module.scss';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { Link } from '~/client/components/ui/Link/Link';
import useSanitize from '~/client/hooks/useSanitize';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

interface RésultatRechercherMétierProps {
  résultat: Partial<FicheMétier>
}

export function RésultatRechercherMétier({ résultat }: RésultatRechercherMétierProps) {
  const accrocheMétier = useSanitize(résultat.accrocheMetier);

  if (!résultat.nomMetier) return null;

  return (
    <Link href={`/decouvrir-les-metiers/${encodeURIComponent(résultat.nomMetier)}`} className="underline-none">
      <article className={styles.cardBody}>
        <div className={styles.cardTitle}>
          {`${résultat.nomMetier?.charAt(0).toUpperCase()}${résultat.nomMetier?.slice(1)}`}
        </div>
        <div className={styles.cardContent} dangerouslySetInnerHTML={{ __html: accrocheMétier || '' }}/>
        <div className={styles.cardLink}>
          <span>En savoir plus</span>
          <AngleRightIcon className={styles.cardLinkIcon}/>
        </div>
      </article>
    </Link>
  );
}
