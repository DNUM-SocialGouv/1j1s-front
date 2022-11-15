import { OffreDeStageAttributesFromCMS } from '~/client/components/features/OffreDeStage/OffreDeStage.type';

export interface OffreDeStageService {
    listeTousLesSlugs(): Promise<Array<string>>;
    get(id: string): Promise<OffreDeStageAttributesFromCMS>;
}
