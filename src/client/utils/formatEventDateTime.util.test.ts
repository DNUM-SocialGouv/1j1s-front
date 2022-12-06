import { formatEventDateTime } from '~/client/utils/formatEventDateTime.util';

describe('formatEventDateTime', () => {
  function mockDateFormatLocale() {
    const toLocaleString = Date.prototype.toLocaleString;
    Date.prototype.toLocaleString = function(locale = 'fr-FR', ...args) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return toLocaleString.call(this, locale, ...args);
    };

    const toLocaleTimeString = Date.prototype.toLocaleTimeString;
    Date.prototype.toLocaleTimeString = function(locale = 'fr-FR', ...args) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return toLocaleTimeString.call(this, locale, ...args);
    };
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('quand la date de début et de fin sont identiques', () => {
    it('retourne la même date avec les heures correspondantes', () => {
      mockDateFormatLocale();

      const dateDebut = '2022-12-01T20:00:00.000Z';
      const dateFin = '2022-12-01T22:00:00.000Z';
      const expected = 'jeu. 1 décembre de 20:00 à 22:00';

      const actual = formatEventDateTime(dateDebut, dateFin);
      expect(actual).toEqual(expected);
    });
  });

  describe('quand la date de début et de fin sont différentes', () => {
    it('retourne les dates formatées avec les heures', () => {
      const dateDebut = '2022-12-01T09:00:00.000Z';
      const dateFin = '2022-12-02T18:00:00.000Z';
      const expected = 'jeu. 1 décembre à 09:00 - ven. 2 décembre à 18:00';

      const actual = formatEventDateTime(dateDebut, dateFin);
      expect(actual).toEqual(expected);
    });
  });
  describe('quand les heures sont à 00:00', () => {
    it('retourne la date sans les heures', () => {
      const dateDebut = '2022-12-02T00:00:00.000Z';
      const dateFin = '2022-12-03T00:00:00.000Z';
      const expected = 'ven. 2 décembre - sam. 3 décembre';

      const actual = formatEventDateTime(dateDebut, dateFin);
      expect(actual).toEqual(expected);
    });
  });
});
