import { PageAccueilArticle } from '~/server/services/cms/infra/repositories/strapiCms.service';

export function anArticleList(): PageAccueilArticle[] {
  return [
    {
      description: 'Un parcours personnalisé pour m\'aider à définir mon projet professionnel et trouver un emploi',
      image: {
        height: 20,
        url: 'https://1j1s-cms.osc-fr1.scalingo.io//uploads/logo1j1s_france_relance_f6a2f05ebb.svg',
        width: 20,
      },
      lien: 'https://1j1s-front.osc-fr1.scalingo.io/contrat-engagement-jeune',
      titre: 'Je découvre le Contrat d\'Engagement Jeune',
    },
    {
      description: 'Trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi, culture, etc.',
      image: {
        height: 20,
        url: 'https://1j1s-cms.osc-fr1.scalingo.io//uploads/logo1j1s_france_relance_f6a2f05ebb.svg',
        width: 20,
      },
      lien: 'https://1j1s-front.osc-fr1.scalingo.io//mes-aides',
      titre: 'J\'accède à mes aides financières',
    },
  ];
}
