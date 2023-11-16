import { paysEuropeList } from '~/client/domain/pays';
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
				const handle = item.header.handle;
				return this.mapDetailOffre(handle, reponseDetailRecherche);
			}),
		};
	}

	public mapDetailOffre = (handle: string, responseDetail: ApiEuresEmploiEuropeDetailResponse): EmploiEurope => {
		const itemDetail = responseDetail.data.items
			.find((detail) => detail.jobVacancy.header.handle === handle);
		const itemDetailXML= itemDetail?.jobVacancy.hrxml;
		
		const itemDetailParsed = this.xmlService.parse<ApiEuresEmploiEuropeDetailXML>(itemDetailXML);

		const positionOpening = this.getElementOrFirstElementInArray(itemDetailParsed?.PositionOpening);
		const positionProfile = this.getElementOrFirstElementInArray(positionOpening?.PositionProfile);
		const positionOrganization = this.getElementOrFirstElementInArray(positionProfile?.PositionOrganization);
		const organizationIdentifiers = this.getElementOrFirstElementInArray(positionOrganization?.OrganizationIdentifiers);

		const positionLocation = this.getElementOrFirstElementInArray(positionProfile?.PositionLocation);
		const address = this.getElementOrFirstElementInArray(positionLocation?.Address);
		const addressCityName = address?.['ns2:CityName'];
		const countryCode = address?.CountryCode;
		const country = countryCode ? paysEuropeList.find((pays) => pays.code === countryCode)?.libellé : undefined;

		return {
			id: handle,
			nomEntreprise: organizationIdentifiers?.OrganizationName,
			pays: country,
			titre: positionProfile?.PositionTitle,
			urlCandidature: itemDetail?.related.urls[0].urlValue,
			ville: addressCityName,
		};
	};
}
