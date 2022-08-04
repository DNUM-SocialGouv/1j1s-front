import { OffreDeStageAttributesFromCMS } from '~/client/components/features/OffreDeStage/OffreDeStage.type';

export interface OffreDeStageService {
    get(id: string): Promise<OffreDeStageAttributesFromCMS>;
}
