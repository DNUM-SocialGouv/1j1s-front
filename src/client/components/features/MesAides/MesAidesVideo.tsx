import Image from 'next/legacy/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Accordion } from '~/client/components/ui/Accordion/Accordion';
import styles from '~/pages/mes-aides/index.module.scss';

export function MesAidesVideo() {
  const [showVideo, setShowVideo] = useState(false);

  const onClick = () => setShowVideo(true);
  return (
    <Container className={styles.mesAidesVidéo}>
      <div className={styles.mesAidesVidéoDescription}>
        <p className={styles.mesAidesVidéoDescriptionText}>
          <strong className={styles.mesAidesVidéoDescriptionBoldText}>Toutes vos aides sont maintenant à portée de clic ! </strong>
          Découvrez comment faire en regardant la vidéo ci-dessous :
        </p>
      </div>
      <div className={styles.mesAidesVidéoPlayer}>
        {!showVideo ?
          (
            <button className={styles.mesAidesVidéoButton} onClick={onClick} aria-label='Lancer la vidéo'>
              <Image
                src='/images/lancer-la-vidéo.png'
                className={styles.mesAidesVidéoIframe}
                layout='fill'
                objectFit='cover'
                alt=''
              />
            </button>
          ) :
          (
            <iframe src="https://www.youtube.com/embed/Eznp8f-2li4?autoplay=1&mute=0"
              title="Vous avez 5 minutes ? Trouvez vos aides en quelques clics avec #1jeune1solution"
              allowFullScreen
              allow="autoplay"
              frameBorder="0"
              className={styles.mesAidesVidéoIframe}
            />
          )
        }


        <div className={styles.mesAidesVidéoTranscription}>
          <Accordion
            summary="Lire la transcription"
            className={styles.mesAidesVidéoAccordion}
          >
            <p>
              L’image d’une jeune femme tenant son téléphone sur un fond rose apparaît. Au centre, les phrases « Vous avez moins de 30 ans » et « Bonne Nouvelle ! » s’affichent successivement. Apparition d’un fond blanc avec au centre la phrase « Toutes vos aides sont maintenant à portée de clic ! » qui est ensuite remplacée par le #1jeune1solutionApparition d’un fond vert avec au centre la phrase « Parce qu’en 5 min ». Apparition d’un fond jaune où s’affiche au centre un pictogramme d’emballage de plat avec en dessous la phrase « on peut se commander à manger ». Apparition d’un fond rose où s’affiche au centre un pictogramme de tasse de café avec en dessous la phrase « se faire un café ». Apparition d’un fond orange où s’affiche au centre un pictogramme de main avec un pouce levé, avec en dessous la phrase « et désormais trouver toutes ses aides facilement ». Apparition d’un fond bleu où l’url « 1jeune1solution.gouv.fr » apparait au centre et défile en rétrécissant jusqu’en haut. En dessous de l’url, sept mots avec à chaque fois à leur gauche un pictogramme de côche verte apparaissent successivement : « Famille », « Logement », « Emploi et insertion », « Santé », « Culture et Loisirs », « Etudiants » et « Permis de conduire ». Apparition d’un fond jaune où s’affichent successivement, au centre, les phrases « plus de 600 aides », « 1 questionnaire », « 5minutes ». Apparition d’un fond blanc avec au centre la question « Vous êtes prêt(e) ? ». Apparition d’un fond bleu où s’affiche au centre l’url « 1jeune1solution.gouv.fr » avec en dessous la phrase « Toutes vos aides à portée de clic ! ». Apparition d’un fond blanc avec le logo du gouvernement.
            </p>
          </Accordion>
        </div>
      </div>
    </Container>
  );
}
