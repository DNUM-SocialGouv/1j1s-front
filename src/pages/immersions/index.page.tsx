import React from 'react';

import {
  RéférencerEntreprises,
} from '~/client/components/features/Immersions/ReferencesEntreprises/RéférencerEntreprises';
import AidesExceptionnelles
  from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function Immersions() {
  return (
    <>
      <HeadTag
        title="Je propose des immersions | 1jeune1solution"
      />
      <main id="contenu">
        <RéférencerEntreprises />
        <AidesExceptionnelles />
      </main>
    </>
  );
}
