import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';

export default function Allocations() {
  return (
    <section className={styles.accompagnement}>
      <div className={styles.accompagnementContainer}>
        <h2>Contrat d&apos;Engagement Jeune, je me lance !</h2>
        <article className={styles.accompagnementArticle}>
          <p className={styles.accompagnementQuestion}>Bénéficiez-vous actuellement d&apos;un accompagnement ?</p>

          <div>
            Sélectionnez l&apos;option qui vous correspond :
            <button>Oui, je suis accompagné(e) par la Mission Locale</button>
            <button>Oui, je suis accompagné(e) par Pôle Emploi</button>
            <button>Non, je ne bénéficie d&apos;aucun accompagnement</button>
          </div>
        </article>
        <div className={styles.accompagnementExplication}>Pour entrer en Contrat d&apos;Engagement Jeune, vous devez vous rapprocher d&apos;un
          professionnel de l&apos;accompagnement chez Pôle Emploi ou en Mission Locale. Pour vous aider à identifier l&apos;interlocuteur à contacter,
          répondez à ces quelques questions.
        </div>
      </div>
    </section>
  );
}
