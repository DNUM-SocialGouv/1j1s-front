import AidesExceptionnelles
  from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import DecouvrirMesuresEmployeurs
  from '~/client/components/features/JeRecrute/DecouvrirMesuresEmployeurs/DecouvrirMesuresEmployeurs';

import { HeadTag } from '../../utils/HeaderTag';
import { DécouvrirDispositifs } from './DecouvrirDispositifs/DecouvrirDispositifs';

export function JeRecrute () {
  return (
    <>
      <HeadTag
        title="Recruter et agir pour les jeunes | 1jeune1solution"
        description="Emploi, formation, accompagnement"
      />
      <main id="contenu">
        <DécouvrirDispositifs />
        <DecouvrirMesuresEmployeurs />
        <AidesExceptionnelles />
      </main>
    </>
  );
}
