import { LEVEL_CODE } from '~/server/emplois-europe/infra/langageEures';
import {
	ApiEuresEmploiEuropeDetailItem,
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeDetailXML,
	ApiEuresEmploiEuropeRechercheRequestBody,
	ApiEuresEmploiEuropeResponseJobVacancy,
	ApiEuresEmploiEuropeResponseRelated,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { UNITE_EXPERIENCE_NECESSAIRE } from '~/server/emplois-europe/infra/uniteExperienceNecessaire';
import NiveauEtudeAPIEures = ApiEuresEmploiEuropeDetailXML.NiveauEtudeAPIEures;

export function anApiEuresRechercheBody(override: Partial<ApiEuresEmploiEuropeRechercheRequestBody>): ApiEuresEmploiEuropeRechercheRequestBody {
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
						{ keywordScope: 'EVERYWHERE', keywordText: 'boulanger' },
					],
				},
		},
		...override,
	};
}

export function anApiEuresEmploiEuropeDetailResponse(itemsToAdd?: Array<ApiEuresEmploiEuropeDetailItem>): ApiEuresEmploiEuropeDetailResponse {
	return {
		data: {
			items: itemsToAdd ? itemsToAdd : [
				anApiEuresEmploiEuropeDetailItem({
					jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
						header: {
							handle: '1',
						},
						hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
							{
								localisations: [{ pays: 'FR', ville: 'Paris' }],
								nomEntreprise: 'La Boulangerie',
								titre: 'Boulanger (H/F)',
							}),
					}),
				}),
				anApiEuresEmploiEuropeDetailItem({
					jobVacancy: anApiEuresEmploiEuropeDetailJobVacancy({
						header: {
							handle: '2',
						},
						hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
							{
								localisations: [{ pays: 'FR', ville: 'Paris' }],
								nomEntreprise: 'La Pâtisserie',
								titre: 'Pâtissier (H/F)',
							}),
					}),
					related: anApiEuresEmploiEuropeDetailRelated({ urls: [{ urlValue: 'https://urlDeCandidature2.com' }] }),
				}),
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
		hrxml: anApiEuresEmploiEuropeDetailXMLResponse(
			{
				educationLevelCode: undefined,
				experiencesNecessaires: [{
					duree: 3,
					unite: UNITE_EXPERIENCE_NECESSAIRE.YEAR,
				}],
				localisations: [{ pays: 'FR', ville: 'Paris' }],
				nomEntreprise: undefined,
				tempsDeTravail: undefined,
				titre: undefined,
			}),
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

interface languageCompetency {
	language: string,
	levelCode?: LEVEL_CODE
	competenceType?: string
	competenciesDimensions?: Array<{
		competencyDimensionName: string,
		levelCode: LEVEL_CODE
	}>
}

function anXMLResponseLanguageCompetency(languageCompetencies: Array<languageCompetency> = [{
	competenciesDimensions: [{
		competencyDimensionName: 'CEF-Speaking-interaction',
		levelCode: LEVEL_CODE.B2,
	}],
	language: 'fr',
	levelCode: LEVEL_CODE.A2,
}]) {
	return (languageCompetencies.map((competenceInfo) =>
		`<PositionCompetency><CompetencyID>${competenceInfo.language}</CompetencyID>
<TaxonomyID>${competenceInfo.competenceType ? competenceInfo.competenceType : 'Language'}</TaxonomyID>
<RequiredProficiencyLevel>
	${competenceInfo.levelCode && `<ScoreText>${competenceInfo.levelCode}</ScoreText>`}
</RequiredProficiencyLevel>
${competenceInfo.competenciesDimensions?.map((competencyInfo) =>
			`<CompetencyDimension>
				<CompetencyDimensionTypeCode>${competencyInfo.competencyDimensionName}</CompetencyDimensionTypeCode>
				<Score>
					<ScoreText>${competencyInfo.levelCode}</ScoreText>
				</Score>
			</CompetencyDimension>`)}
</PositionCompetency>`));
}


interface ApiEuresEmploiEuropeDetailXMLResponseFixture {
	titre?: string,
	nomEntreprise?: string,
	localisations?: Array<{ pays?: string, ville?: string }>
	typeContrat?: string,
	description?: string,
	listePermis?: Array<string>,
	listeCompetencesLinguistiques?: Array<languageCompetency>
	listeLangueDeTravail?: Array<string>
	tempsDeTravail?: string,
	educationLevelCode?: NiveauEtudeAPIEures,
	experiencesNecessaires?: Array<{
		duree: number,
		unite?: UNITE_EXPERIENCE_NECESSAIRE
	} | undefined>,
	codeLangueDeLOffre?: string
}

function anXMLLicenseDriving(listePermis?: Array<string>) {
	if (!listePermis) {
		return '<LicenseTypeCode>B</LicenseTypeCode>';
	}
	return `${listePermis.map((permis) => (`<LicenseTypeCode>${permis}</LicenseTypeCode>`))}`;
}

function anXMLWorkingLanguage(listeLangueDeTravail?: Array<string>) {
	if (!listeLangueDeTravail) {
		return '<WorkingLanguageCode>nl</WorkingLanguageCode>';
	}
	return `${listeLangueDeTravail.map((langueDeTravail) => (`<WorkingLanguageCode>${langueDeTravail}</WorkingLanguageCode>`))}`;
}

function anXMLPositionLocation(localisations: ApiEuresEmploiEuropeDetailXMLResponseFixture['localisations']) {
	return localisations?.map(({ pays, ville }) => {
		return `<PositionLocation>
									<Address currentAddressIndicator="true">
									${ville ? `<ns2:CityName>${ville}</ns2:CityName>` : ''}
									<ns2:CountrySubDivisionCode>
					75011
					</ns2:CountrySubDivisionCode>
					${pays ? `<CountryCode>${pays}</CountryCode>` : ''}
					<ns2:PostalCode>75001</ns2:PostalCode>
					</Address>
					</PositionLocation>`;
	});
}


export function anApiEuresEmploiEuropeDetailXMLResponse({
	titre,
	nomEntreprise,
	localisations,
	typeContrat,
	description,
	listePermis,
	listeCompetencesLinguistiques,
	listeLangueDeTravail,
	tempsDeTravail,
	educationLevelCode,
	experiencesNecessaires,
	codeLangueDeLOffre,
}: ApiEuresEmploiEuropeDetailXMLResponseFixture): string {

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
    <PositionProfile languageCode="${codeLangueDeLOffre || 'nl'}">
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
                            <CountryCode>NL</CountryCode>
                            <ns2:PostalCode>75001</ns2:PostalCode>
                        </Address>
                    </Communication>
                </PersonContact>
            </ApplicationMethod>
        </PostingInstruction>
        ${titre ? `<PositionTitle>${titre}</PositionTitle>` : ''}
        ${(anXMLPositionLocation(localisations))}						
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
        ${typeContrat ? `<PositionOfferingTypeCode> ${typeContrat}</PositionOfferingTypeCode>` : ''}
        <PositionQualifications>
           	${anXMLLicenseDriving(listePermis)}
            ${anXMLResponseLanguageCompetency(listeCompetencesLinguistiques)}
             <EducationRequirement>
            ${(educationLevelCode !== undefined) ? `<EducationLevelCode listName="EURES_ISCEDEducationLevel"
                 					 listURI="https://ec.europa.eu/eures"
                 					 listVersionID="2011"
                 >
                 					 ${educationLevelCode}
                 </EducationLevelCode>` : ''}            
            </EducationRequirement>
            ${buildExperienceSummary(experiencesNecessaires)}
        </PositionQualifications>
        <PositionFormattedDescription>
        	${description ? `<Content>${description}</Content>` : '<Content>&lt;p&gt;&lt;strong&gt;Fonction:&lt;/strong&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;En tant que Co&amp;#233;quipier cuisine, tu es un ambassadeur/une ambassadrice de la marque et tu portes nos valeurs dans ta boulangerie-restaurant.&lt;/li&gt; &lt;li&gt;Tu pr&amp;#233;pares nos plats dans ta cuisine et tu es un soutien au service en salle si n&amp;#233;cessaire. La pr&amp;#233;paration (mise en place) est &amp;#233;galement sous ta responsabilit&amp;#233;.&lt;/li&gt; &lt;/ul&gt;</Content>'}
        </PositionFormattedDescription>
        <TravelPreference>
            <ns2:Description>UNKNOWN</ns2:Description>
        </TravelPreference>
        ${anXMLWorkingLanguage(listeLangueDeTravail)}
        <ImmediateStartIndicator>
            false
        </ImmediateStartIndicator>
        ${tempsDeTravail ? `<PositionScheduleTypeCode>${tempsDeTravail}</PositionScheduleTypeCode>` : ''}
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

function buildExperienceSummary(experiencesNecessaires: ApiEuresEmploiEuropeDetailXMLResponseFixture['experiencesNecessaires']): string {
	if (!experiencesNecessaires) {
		return `
			<ExperienceSummary>
				<ExperienceCategory>
					<CategoryCode listName="ESCO_Occupations" listURI="https://ec.europa.eu/esco/portal" listVersionID="ESCOv1">
						http://data.europa.eu/esco/occupation/uuid-4
					</CategoryCode>
					<Measure unitCode="${UNITE_EXPERIENCE_NECESSAIRE.YEAR}">3</Measure>
					<ns2:Description>description de l‘experience demandée</ns2:Description>
				</ExperienceCategory>
			</ExperienceSummary>`;
	}

	const experiencesCategories = experiencesNecessaires.map((experienceNecessaire) => {
		if (!experienceNecessaire) {
			return `
				<ExperienceCategory>
					<CategoryCode listName="ESCO_Occupations" listURI="https://ec.europa.eu/esco/portal" listVersionID="ESCOv1">
					\thttp://data.europa.eu/esco/occupation/uuid-4
					</CategoryCode>
					<ns2:Description>description de l‘experience demandée</ns2:Description>
				</ExperienceCategory>`;
		}
		return `
			<ExperienceCategory>
				<CategoryCode listName="ESCO_Occupations" listURI="https://ec.europa.eu/esco/portal" listVersionID="ESCOv1">
					http://data.europa.eu/esco/occupation/uuid-4
				</CategoryCode>
				<Measure unitCode=${experienceNecessaire.unite ? `"${experienceNecessaire.unite}"` : undefined}>${experienceNecessaire.duree}</Measure>
				<ns2:Description>description de l‘experience demandée</ns2:Description>
			</ExperienceCategory>`;
	});

	return `
		<ExperienceSummary>
			${experiencesCategories}		
		</ExperienceSummary>`;
}
