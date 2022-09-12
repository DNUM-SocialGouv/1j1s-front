import Bannière from '~/client/components/features/MesuresEmployeurs/Bannière/Bannière';
import useSanitize from '~/client/hooks/useSanitize';
import { CarteMesuresEmployeurs, MesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';

import { LinkCard } from '../../ui/Card/LinkCard';
import Marked from '../../ui/Marked/Marked';
import { HeadTag } from '../../utils/HeaderTag';

export interface MesuresEmployeursProps {
  mesuresEmployeurs : MesuresEmployeurs
}
export function MesuresEmployeursComponent ({ mesuresEmployeurs }: MesuresEmployeursProps) {
  const { dispositifs } = mesuresEmployeurs;
  return (
    <>
      <HeadTag
        title="Mesures Employeurs | 1jeune1solution"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu">
        <Bannière />
        <section>
          <h2 id="dispositifs">
            Découvrir les dispositifs pour vous aider à recruter
          </h2>
          <ul>
            {dispositifs.map((carte) => (<li key={carte.url}><CarteMesureEmployeur carte={carte} /></li>))}
          </ul>
        </section>
      </main>
    </>
  );
}

function CarteMesureEmployeur ({ carte }: { carte: CarteMesuresEmployeurs }) {
  const titre = useSanitize(carte.titre);
  const bannière = carte.bannière?.url || '';
  const url = useSanitize(carte.url);
  const contenu = useSanitize(carte.contenu);

  return <LinkCard
    imageUrl={bannière}
    link={url}
    linkLabel="En savoir plus"
    title={titre}
  >
    <Marked markdown={contenu} />
  </LinkCard>;
  
}
