import {
	ApiEuresEmploiEuropeDetailItem,
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeRechercheRequestBody, ApiEuresEmploiEuropeResponseJobVacancy, ApiEuresEmploiEuropeResponseRelated,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';

export function anApiEuresRechercheBody(motCle = 'boulanger'): ApiEuresEmploiEuropeRechercheRequestBody {
	return {
		dataSetRequest: {
			excludedDataSources: [{ dataSourceId: 29 }, { dataSourceId: 81 }, { dataSourceId: 781 }],
			pageNumber: '1',
			resultsPerPage: '15',
			sortBy: 'BEST_MATCH',
		},
		searchCriteria: {
			facetCriteria: [],
			keywordCriteria:
				{
					keywordLanguageCode: 'fr', keywords: [
						{ keywordScope: 'EVERYWHERE', keywordText: motCle },
					],
				},
		},
	};
}

export function anApiEuresEmploiEuropeDetailResponse(itemsToAdd: Array<ApiEuresEmploiEuropeDetailItem> = []): ApiEuresEmploiEuropeDetailResponse {
	return {
		data: {
			items: [
				anApiEuresEmploiEuropeDetailItem(),
				anApiEuresEmploiEuropeDetailItem({
					jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
						header: {
							handle: '2',
						},
						hrxml: anApiEuresEmploiEuropeDetailXMLResponse('Pâtissier (H/F)', 'La Pâtisserie', 'FR', 'Paris'),
					}),
					related: anApiEuresEmploiEuropeDetailRelated({
						urls: [{
							urlValue: 'https://urlDeCandidature2.com',
						}],
					}),
				}),
				...itemsToAdd,
			],
		},
	};
}

export function anApiEuresEmploiEuropeDetailItem(override?: Partial<ApiEuresEmploiEuropeDetailItem>): ApiEuresEmploiEuropeDetailItem {
	return {
		jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy(),
		related: anApiEuresEmploiEuropeDetailRelated(),
		...override,
	};
}

export function anApiEuresEmploiEuropeDetailJobVacancy(override?: Partial<ApiEuresEmploiEuropeResponseJobVacancy>): ApiEuresEmploiEuropeResponseJobVacancy {
	return {
		header: {
			handle: '1',
		},
		hrxml: anApiEuresEmploiEuropeDetailXMLResponse('Boulanger (H/F)', 'La Boulangerie', 'FR', 'Paris'),
		...override,
	};
}

export function anApiEuresEmploiEuropeDetailRelated(override?: Partial<ApiEuresEmploiEuropeResponseRelated>): ApiEuresEmploiEuropeResponseRelated {
	return {
		urls: [{
			urlValue: 'https://urlDeCandidature.com',
		}],
		...override,
	};
}

export function anApiEuresEmploiEuropeDetailXMLResponse(titre?: string, nomEntreprise?: string, pays?: string, ville?: string): string {
	return `
		<PositionOpening xmlns="http://www.hr-xml.org/3" xmlns:ns2="http://www.url.com" majorVersionID="3" minorVersionID="2">
    <DocumentID
            schemeVersionID="1.3">DOCUMENT_ID
    </DocumentID>
    <AlternateDocumentID>
        ALTERNATE_DOCUMENT_ID
    </AlternateDocumentID>
    <PositionOpeningStatusCode name="Active">
        Active
    </PositionOpeningStatusCode>
    <PostingRequester agencyRoleCode="Requester">
        <PartyID>NL001</PartyID>
        <PartyName>ABC</PartyName>
    </PostingRequester>
    <PositionProfile languageCode="nl">
        <PostingInstruction>
            <PostingOptionCode>EURESFlag</PostingOptionCode>
            <ApplicationMethod>
                <Instructions>CV with attached letter,Letter,Telephone</Instructions>
                <PersonContact>
                    <PersonName>
                        <ns2:GivenName></ns2:GivenName>
                        <FamilyName
                                prefix=" ">Jean BONOT
                        </FamilyName>
                    </PersonName>
                    <Communication>
                        <ChannelCode>
                            Email
                        </ChannelCode>
                        <ns2:URI>info@email.com</ns2:URI>
                    </Communication>
                    <Communication>
                        <ChannelCode>Telephone</ChannelCode>
                        <ns2:DialNumber>
                            0102030405
                        </ns2:DialNumber>
                    </Communication>
                    <Communication>
                        <Address>
                            <ns2:BuildingNumber>123</ns2:BuildingNumber>
                            <ns2:StreetName>
                                Rue Victor Hugo
                            </ns2:StreetName>
                            <ns2:CityName>Paris</ns2:CityName>
                            <ns2:CountrySubDivisionCode>
                                75011
                            </ns2:CountrySubDivisionCode>
                            <CountryCode>
                            		NL
														</CountryCode>
                            <ns2:PostalCode>75001</ns2:PostalCode>
                        </Address>
                    </Communication>
                </PersonContact>
            </ApplicationMethod>
        </PostingInstruction>
        ${titre ? `<PositionTitle>${titre}</PositionTitle>` : ''}
        <PositionLocation>
            <Address currentAddressIndicator="true">
                ${ville ? `<ns2:CityName>${ville}</ns2:CityName>` : ''}
                <ns2:CountrySubDivisionCode>
                    75011
                </ns2:CountrySubDivisionCode>
                ${pays ? `<CountryCode>${pays}</CountryCode>` : ''}
                <ns2:PostalCode>75001</ns2:PostalCode>
            </Address>
        </PositionLocation>
        <PositionOrganization>
            <OrganizationIdentifiers>
                ${nomEntreprise ? `<OrganizationName>${nomEntreprise}</OrganizationName>` : ''}
                <OrganizationLegalID>
                    12345
                </OrganizationLegalID>
            </OrganizationIdentifiers>
            <OrganizationSizeCode>microenterprise</OrganizationSizeCode>
        </PositionOrganization>
        <PositionOpenQuantity>1</PositionOpenQuantity>
        <JobCategoryCode listName="ESCO_Occupations"
                         listURI="https://ec.europa.eu/esco/portal"
                         listVersionID="ESCOv1">
            http://data.europa.eu/esco/occupation/uuid
        </JobCategoryCode>
        <PositionOfferingTypeCode>
            DirectHire
        </PositionOfferingTypeCode>
        <PositionQualifications>
            <PositionCompetency>
                <CompetencyID schemeID="ESCO_Skills" schemeVersionID="ESCOv1">
                    http://data.europa.eu/esco/skill/uuid-2
                </CompetencyID>
                <TaxonomyID>other</TaxonomyID>
                <RequiredProficiencyLevel>
                    <ScoreText maximumScoreText="C2" minimumScoreText="A1">
                        B2
                    </ScoreText>
                </RequiredProficiencyLevel>
            </PositionCompetency>
            <PositionCompetency>
                <CompetencyID schemeID="ESCO_Skills" schemeVersionID="ESCOv1">
                    http://data.europa.eu/esco/skill/uuid-3
                </CompetencyID>
                <TaxonomyID>other</TaxonomyID>
                <RequiredProficiencyLevel>
                    <ScoreText maximumScoreText="C2" minimumScoreText="A1">
                        A2
                    </ScoreText>
                </RequiredProficiencyLevel>
            </PositionCompetency>
            <ExperienceSummary>
                <ExperienceCategory>
                    <CategoryCode listName="ESCO_Occupations"
                                  listURI="https://ec.europa.eu/esco/portal"
                                  listVersionID="ESCOv1">
                        http://data.europa.eu/esco/occupation/uuid-4
                    </CategoryCode>
                    <Measure
                            unitCode="month">12
                    </Measure>
                    <ns2:Description>Description de l offre d
                        emploi
                    </ns2:Description>
                </ExperienceCategory>
            </ExperienceSummary>
        </PositionQualifications>
        <PositionFormattedDescription>
            <Content>Contenu de l offre</Content>
        </PositionFormattedDescription>
        <TravelPreference>
            <ns2:Description>UNKNOWN</ns2:Description>
        </TravelPreference>
        <WorkingLanguageCode>nl</WorkingLanguageCode>
        <ImmediateStartIndicator>
            false
        </ImmediateStartIndicator>
        <PositionScheduleTypeCode>FullTime</PositionScheduleTypeCode>
        <OfferedRemunerationPackage>
            <RemunerationRange>
                <RemunerationTypeCode>BasePay</RemunerationTypeCode>
            </RemunerationRange>
            <ns2:Description type="RemunerationBasisCodeContentType"/>
        </OfferedRemunerationPackage>
        <ApplicationCloseDate>2023-10-15</ApplicationCloseDate>
    </PositionProfile>
</PositionOpening>
	`;
}
