import { aMissionEngagementFiltre } from '@tests/fixtures/domain/missionEngagement.fixture';

import { buildParamètresRechercheApiEngagement } from '~/server/engagement/infra/repositories/apiEngagement.builder';

describe('buildParamètresRechercheApiEngagement', () => {
  it('retourner les paramétres de recherche pour l api engagement', () => {
    const filter = aMissionEngagementFiltre();

    const result = buildParamètresRechercheApiEngagement(filter);

    expect(result).toEqual('distance=10km&domain=sante&from=1&lat=2.3522&lon=48.8566&openToMinors=yes&publisher=a-publisher-id&size=30');
  });
});
