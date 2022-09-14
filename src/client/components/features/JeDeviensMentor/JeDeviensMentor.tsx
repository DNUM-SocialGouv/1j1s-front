import Image from 'next/image';
import React from 'react';

import AidesExceptionnelles
  from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import styles from '~/client/components/features/JeDeviensMentor/JeDeviensMentor.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import { PourQui } from './PourQui/PourQui';
import { QuEstCeQueLeMentorat } from './QuEstCeQueLeMentorat/QuEstCeQueLeMentorat';

export default function JeDeviensMentor() {
  return (
    <>
      <HeadTag
        title="Je deviens mentor | 1jeune1solution"
        description="1 jeune 1 mentor, accompagner un jeune pour l’aider à réussir"
      />
      <main>
        <PourQui />
        <QuEstCeQueLeMentorat />
        <Pourquoi />
        <AidesExceptionnelles />
      </main>
    </>
  );
}

const siVousÊtesEmployeur = `
#### Si vous êtes employeur :

* Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure spécialisée dans le mentorat

* Cela permet de contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex : bienveillance, écoute, conseil) et à leur épanouissement personnel

* Le mentorat permettra également la mise en valeur de votre entreprise et de vos métiers
`;

const siVousÊtesCitoyen = `
#### Si vous êtes citoyen :

*   Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure spécialisée dans le mentorat

*   Cela permet de contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex : bienveillance, écoute, conseil) et à leur épanouissement personnel

*   Le mentorat permettra également la mise en valeur de votre entreprise et de vos métiers
`;


function Pourquoi() {
  const { isLargeScreen } = useBreakpoint();
  return (
    <div className={styles.pourquoi}>
      <h1>Pourquoi participer à l&apos;aventure du mentorat ?</h1>
      <article>
        <section>
          { isLargeScreen && <Image src="/images/employeurs/employeur.png" alt="" layout="fixed" width={500} height={250}/> }
          <Marked markdown={siVousÊtesEmployeur} />
        </section>
        <section>
          { isLargeScreen && <Image src="/images/employeurs/citoyen.png" alt="" layout="fixed" width={500} height={250}/>}
          <Marked markdown={siVousÊtesCitoyen} />
        </section>
      </article>
    </div>);
}
