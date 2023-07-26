import { FormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.type';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

export type FormationInitialeDetailComplete =  FormationInitiale & FormationInitialeDetailCMS;

