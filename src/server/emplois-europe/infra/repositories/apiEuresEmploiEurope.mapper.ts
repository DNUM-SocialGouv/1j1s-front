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

		const positionOfferingTypeCode = this.getElementOrFirstElementInArray<string>(positionProfile?.PositionOfferingTypeCode);
		const contractType = positionOfferingTypeCode ? this.mapToContractType(positionOfferingTypeCode) : undefined;

		return {
			id: handle,
			nomEntreprise: organizationIdentifiers?.OrganizationName,
			pays: country,
			titre: positionProfile?.PositionTitle,
			typeContrat: contractType,
			urlCandidature: itemDetail?.related.urls[0].urlValue,
			ville: addressCityName,
		};
	};

	private mapToContractType(positionOfferingTypeCode: string) {

		const positionOfferingTypeCodeLowerCased = positionOfferingTypeCode?.toLowerCase();

		const referentiel = [
			{ contractType: 'Apprentissage', euresCode: 'apprenticeship' },
			{ contractType: 'Contrat déterminé', euresCode: 'contract' },
			{ contractType: 'Contrat déterminé pour permanent', euresCode: 'contracttohire' },
			{ contractType: 'Non spécifié', euresCode: 'NS' },
			{ contractType: 'Embauche direct', euresCode: 'directhire' },
			{ contractType: 'Stage', euresCode: 'internship' },
			{ contractType: 'De garde / Sur appel', euresCode: 'oncall' },
			{ contractType: 'Réserve de recrutement', euresCode: 'recruitmentreserve' },
			{ contractType: 'Saisonnier', euresCode: 'seasonal' },
			{ contractType: 'Indépendant', euresCode: 'selfemployed' },
			{ contractType: 'Temporaire', euresCode: 'temporary' },
			{ contractType: 'Temporaire pour permanent', euresCode: 'temporarytohire' },
			{ contractType: 'Bénévole', euresCode: 'volunteer' },
		];

		return referentiel.find((totopasinspire) => totopasinspire.euresCode === positionOfferingTypeCodeLowerCased)?.contractType;
	}
}
