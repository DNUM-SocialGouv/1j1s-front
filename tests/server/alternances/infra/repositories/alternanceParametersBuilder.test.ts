import {
  buildParamètresRechercheAlternance,
} from '~/server/alternances/infra/repositories/alternanceParametersBuilder';

describe('buildParamètresRechercheAlternance', () => {
  describe('quand on cherche des codeRomes', () => {
    it('quand on cherche des codeRomes', async () => {
      const result = buildParamètresRechercheAlternance({ codeRomeList: ['D1103', 'D1101', 'H2101'] });

      expect(result).toEqual('romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
    });
  });

  it('quand on cherche avec un lieu', async () => {
    const result = buildParamètresRechercheAlternance({ code: '75001', codeRomeList: ['D1103','D1101','H2101'], latitude:'48.08', longitude:'2.01', radius: '30' });

    expect(result).toEqual('insee=75001&latitude=48.08&longitude=2.01&radius=30&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
  });

  it('quand on cherche avec un lieu et un rayon', async () => {
    const result = buildParamètresRechercheAlternance({
      code: '75035',
      codeRomeList: ['D1103', 'D1101', 'H2101'],
      latitude: '44',
      longitude: '3',
      radius:'40',
    });

    expect(result).toEqual('insee=75035&latitude=44&longitude=3&radius=40&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
  });

  it('quand on cherche sans lieu et un rayon undefined, on retourne juste le codeRome', async () => {
    const result = buildParamètresRechercheAlternance({
      code: undefined,
      codeRomeList: ['D1103', 'D1101', 'H2101'],
      radius: undefined,
    });

    expect(result).toEqual('romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
  });
});
