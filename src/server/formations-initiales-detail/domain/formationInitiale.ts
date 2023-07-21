import { FormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.type';
import { FormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale';

export type FormationInitialeDetailComplete =  FormationInitialeDetail & FormationInitialeDetailCMS;

