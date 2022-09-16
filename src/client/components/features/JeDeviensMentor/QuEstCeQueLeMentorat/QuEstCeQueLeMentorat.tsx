import Image from 'next/image';

import styles from '~/client/components/features/JeDeviensMentor/QuEstCeQueLeMentorat/QuEstCeQueLeMentorat.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function QuEstCeQueLeMentorat() {
  const { isLargeScreen } = useBreakpoint();
  if (!isLargeScreen) {
    return (<></>);
  }
  return (
    <article className={styles.quEstCeQueLeMentorat}>
      <Image src="/icons/community.svg" alt="" layout="fixed" width={120} height={120} />
      <Marked markdown={quEstCeQueLeMentorat} />
    </article>
  );
}

const quEstCeQueLeMentorat = `
Qu'est-ce que le mentorat ?
===========================

Le mentorat est un engagement personnel pour le mentor comme pour le jeune mentoré, basé sur le volontariat de chaque côté, la confiance, la bienveillance et le respect mutuel. Il s'inscrit dans la durée : le "binôme" que forment le mentor et le jeune se rencontre plusieurs heures par mois, pendant au moins six mois. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.
`;

