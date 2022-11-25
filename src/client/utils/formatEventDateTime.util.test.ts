import { Settings } from 'luxon';

import { formatEventDateTime } from '~/client/utils/formatEventDateTime.util';

describe('formatEventDateTime', () => {
  beforeAll(() => {
    Settings.defaultLocale = 'fr-FR';
    Settings.defaultZone = 'Europe/Paris';
  });
  describe('quand la date de début et de fin sont identiques', () => {
    it('retourne la même date avec les heures correspondantes', () => {
      const dateDebut = '2022-12-01T20:00:00.000Z';
      const dateFin = '2022-12-01T22:00:00.000Z';
      const expected = 'jeu. 1 décembre de 21:00 à 23:00';

      const actual = formatEventDateTime(dateDebut, dateFin);
      expect(actual).toEqual(expected);
    });
  });

  describe('quand la date de début et de fin sont différentes', () => {
    it('retourne les dates formatées avec les heures', () => {
      const dateDebut = '2022-12-01T09:00:00.000Z';
      const dateFin = '2022-12-02T18:00:00.000Z';
      const expected = 'jeu. 1 décembre à 10:00 - ven. 2 décembre à 19:00';

      const actual = formatEventDateTime(dateDebut, dateFin);
      expect(actual).toEqual(expected);
    });
  });
  describe('quand les heures sont à 00:00', () => {
    it('retourne la date sans les heures', () => {
      const dateDebut = '2022-12-01T23:00:00.000Z';
      const dateFin = '2022-12-02T23:00:00.000Z';
      const expected = 'ven. 2 décembre - sam. 3 décembre';

      const actual = formatEventDateTime(dateDebut, dateFin);
      expect(actual).toEqual(expected);
    });
  });
});
