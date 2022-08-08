import { Either } from '~/server/errors/either';
import { MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';
import { MesuresJeunesRepository } from '~/server/mesuresJeunes/domain/mesuresJeunes.repository';
import { mapMesuresJeunes } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.mapper';
import { MesuresJeunesContentType } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.response';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class ApiStrapiMesuresJeunesRepository implements MesuresJeunesRepository {
  constructor(private strapiHttpClientService: StrapiHttpClientService) {}

  async getMesuresJeunes(): Promise<Either<MesuresJeunes>> {

    return await this.strapiHttpClientService.get<MesuresJeunesContentType, MesuresJeunes>('mesure-jeune?populate[vieProfessionnelle][populate]=*&populate[orienterFormer][populate]=*&populate[accompagnement][populate]=*&populate[aidesFinancieres][populate]=*', mapMesuresJeunes);
  }
}
