import { EmploiEurope, ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import {
	ApiEuresEmploiEuropeDetailResponse, ApiEuresEmploiEuropeDetailXML,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { XmlService } from '~/server/services/xml/xml.service';

export class ApiEuresEmploiEuropeMapper {
	constructor(
		private readonly xmlService: XmlService,
	) {
	}

	private getElementOrFirstElementInArray<T>(element?: T | Array<T>): T | undefined {
		if (element === undefined) {
			return undefined;
		}
		if (Array.isArray(element)) {
			return element[0];
		}
		return element;
	}

	mapRechercheEmploiEurope(reponseRecherche: ApiEuresEmploiEuropeRechercheResponse, reponseDetailRecherche: ApiEuresEmploiEuropeDetailResponse): ResultatRechercheEmploiEurope {
		return {
			nombreResultats: reponseRecherche.data.dataSetInfo.totalMatchingCount,
			offreList: reponseRecherche.data.items.map((item): EmploiEurope => {
				const itemDetailXML = reponseDetailRecherche.data.items
					.find((detail) =>
						detail.jobVacancy.header.handle === item.header.handle)?.jobVacancy.hrxml;

				const itemDetailParsed = this.xmlService.parse<ApiEuresEmploiEuropeDetailXML>(itemDetailXML);

				const positionOpening = this.getElementOrFirstElementInArray(itemDetailParsed?.PositionOpening);
				const positionProfile = this.getElementOrFirstElementInArray(positionOpening?.PositionProfile);
				const positionOrganization = this.getElementOrFirstElementInArray(positionProfile?.PositionOrganization);
				const organizationIdentifiers = this.getElementOrFirstElementInArray(positionOrganization?.OrganizationIdentifiers);

				return {
					id: item.header.handle,
					nomEntreprise: organizationIdentifiers?.OrganizationName,
					titre: positionProfile?.PositionTitle,
				};
			}),
		};
	}
}
