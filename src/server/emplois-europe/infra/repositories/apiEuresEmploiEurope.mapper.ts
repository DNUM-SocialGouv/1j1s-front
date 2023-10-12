import { XMLParser } from 'fast-xml-parser';

import { EmploiEurope, ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import {
	ApiEuresEmploiEuropeDetailResponse, ApiEuresEmploiEuropeDetailXML,
	ApiEuresEmploiEuropeRechercheResponse,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';

function parseXML(xml?: string) {
	if (xml === undefined) {
		return undefined;
	}
	const parser = new XMLParser();
	return parser.parse(xml);
}

function getElementOrFirstElementInArray<T>(element?: T | Array<T>): T | undefined {
	if (element === undefined) {
		return undefined;
	}
	if (Array.isArray(element)) {
		return element[0];
	}
	return element;
}

export function mapRechercheEmploiEurope(reponseRecherche: ApiEuresEmploiEuropeRechercheResponse, reponseDetailRecherche: ApiEuresEmploiEuropeDetailResponse): ResultatRechercheEmploiEurope {
	return {
		nombreResultats: reponseRecherche.data.dataSetInfo.totalMatchingCount,
		offreList: reponseRecherche.data.items.map((item): EmploiEurope => {
			const itemDetailXML = reponseDetailRecherche.data.items
				.find((detail) =>
					detail.jobVacancy.header.handle === item.header.handle)?.jobVacancy.hrxml;

			const itemDetailParsed = parseXML(itemDetailXML) as ApiEuresEmploiEuropeDetailXML;

			const positionOpening = getElementOrFirstElementInArray(itemDetailParsed?.PositionOpening);
			const positionProfile = getElementOrFirstElementInArray(positionOpening?.PositionProfile);
			const positionOrganization = getElementOrFirstElementInArray(positionProfile?.PositionOrganization);
			const organizationIdentifiers = getElementOrFirstElementInArray(positionOrganization?.OrganizationIdentifiers);

			return {
				id: item.header.handle,
				nomEntreprise: organizationIdentifiers?.OrganizationName,
				titre: positionProfile?.PositionTitle,
			};
		}),
	};
}
