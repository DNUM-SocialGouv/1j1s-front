import React from 'react';

import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { MétierDuSoinPartner } from '~/client/components/features/Partner/MétiersDuSoinPartner';
import { MonCompteFormationPartner } from '~/client/components/features/Partner/MonCompteFormationPartner';
import { OnisepPartnerCard } from '~/client/components/features/Partner/OnisepPartnerCard';
import { ParcourSupPartner } from '~/client/components/features/Partner/ParcourSupPartner';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function FormationPage() {
  return (
    <>
      <HeadTag title="Rechercher une formation | 1jeune1solution"/>
      <main id="contenu">
        <HeroWithButtonLink
          titlePrimaryText="Trouvez la formation pour réaliser "
          titleSecondaryText="votre projet professionnel"
          content={heroFormationContent()}
          buttonHref="https://reseau.intercariforef.org/"
          buttonLabel="Je trouve ma formation"
          imgSrc="/images/formations-initiales.webp"
        />
        {PartnerCardList([
          MonCompteFormationPartner().props,
          ParcourSupPartner().props,
          OnisepPartnerCard().props,
          MétierDuSoinPartner().props,
        ],
        'Je découvre les dispositifs pour m’accompagner dans ma formation')}
      </main>
    </>
  );
};

function heroFormationContent() {
  return(
    <>
      <span>Vous recherchez une formation qualifiante pour préparer au mieux votre entrée, votre maintien ou votre retour sur le marché du travail ? Grâce au moteur de recherche Carif Oref,</span>
      <b> trouvez la formation qu’il vous faut en fonction de sa localisation, du type de métier auquel vous souhaitez être préparé, du niveau de qualification souhaité et bien plus encore !</b>
    </>
  );
};

