import React from 'react';

import AidesExceptionnelles from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import RecrutementCandidatPôleEmploi from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/RecrutementCandidatPôleEmploi';
import { HeadTag } from '~/client/components/utils/HeaderTag';


export default function LesEntreprisesSEngagent() {
  return (
    <>
      <HeadTag
        title="Je forme les jeunes grâce à l'emploi"
        description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
      />
      <main id="contenu">
        <RecrutementCandidatPôleEmploi/>
        <AidesExceptionnelles/>
      </main>
    </>
  );
}
