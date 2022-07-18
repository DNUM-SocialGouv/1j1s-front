import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { IconColor } from '~/client/components/ui/Icon/icon';

import styles from './Mentorat.module.scss';

export default function MentoratPage() {
  return (
    <>
      <div>
        <h1>1 jeune 1 mentor, être accompagné par un mentor pour réussir</h1>
        <h2>Faire la rencontre qui change tout !</h2>
        <h3>Vous avez moins de 30 ans ?</h3>
        <p>Trouvez le mentor qui vous correspond ! Grâce à son accompagnement régulier et ses conseils.</p>
      </div>
      <div>
        <article className={styles.RaisonParticipationMentoratWrapper}>
          <div>
            <h1>Pourquoi participer à l’aventure du mentorat ?</h1>
          </div>

          <RaisonParticipationsMentorat/>
        </article>
        <article className={styles.QuestCeQueMentoratWrapper}>
          <div>
            <h1>Qu’est-ce que le mentorat ?</h1>
          </div>

          <p>Le mentorat est un engagement personnel pour le mentor comme pour le jeune mentoré, basé sur le volontariat de chaque côté, la confiance, la bienveillance et le respect mutuel. Il s&apos;inscrit dans la durée : le &quot;binôme&quot; que forment le mentor et le jeune se rencontre plusieurs heures par mois, pendant au moins six mois. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.</p>
        </article>
      </div>
    </>
  );
}

function RaisonParticipationsMentorat() {
  return (
    <section className={styles.RaisonParticipationMentoratContainer}>
      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={IconColor.COLOR_ON_PRIMARY}/>
          <h4>J’ai des difficultés à l’école</h4>
        </div>
        <p>Votre mentor pourra vous aider à organiser votre travail et à améliorer vos résultats scolaires</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={IconColor.COLOR_ON_PRIMARY}/>
          <h4>Je ne sais pas quelle orientation choisir</h4>
        </div>
        <p>Votre mentor pourra vous conseiller et vous guider</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={IconColor.COLOR_ON_PRIMARY}/>
          <h4>Je cherche un stage, une alternance, un premier emploi</h4>
        </div>
        <p>Votre mentor pourra vous aider et vous ouvrir son réseau professionnel</p>
      </div>
    </section>
  );
}
