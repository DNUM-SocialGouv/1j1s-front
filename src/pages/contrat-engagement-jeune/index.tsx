import React from 'react';

import { Hero } from '~/client/components/ui/Hero/Hero';
/*import styles from '~/pages/contrat-engagement-jeune/index.module.css';*/


export default function ContratEngagementJeune() {
  const titre = 'Je découvre le Contrat d\'Engagement Jeune';
  return (
    <Hero image="/images/banners/CEJ_banner_hero.jpg">
      <h1>{ titre }</h1>
    </Hero>
  );
}
