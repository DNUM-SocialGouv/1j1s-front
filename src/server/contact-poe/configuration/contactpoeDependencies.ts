import { FormerPoleEmploiRepository } from '~/server/contact-poe/domain/FormerPoleEmploi.repository';
import { JeRecruteAfprPoeiUseCase } from '~/server/contact-poe/usecase/jeRecruteAfprPoeiUseCase';

export interface ContactpoeDependencies {
  jeRecruteAfprPoeiUseCase: JeRecruteAfprPoeiUseCase
}

export const contactpoeDependenciesContainer = (
  jeRecruteAfprPoei: FormerPoleEmploiRepository,
): ContactpoeDependencies => {
  return {
    jeRecruteAfprPoeiUseCase: new JeRecruteAfprPoeiUseCase(jeRecruteAfprPoei),
  };
};
