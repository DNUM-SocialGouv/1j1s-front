import { LBA_CANDIDAT_URL, LBA_RECRUTEUR_URL } from '~/shared/lbaLandingUrls';

describe('lbaLandingUrls', () => {
	it('LBA_CANDIDAT_URL cible la landing candidats avec les 3 UTM attendus', () => {
		expect(LBA_CANDIDAT_URL).toContain('/1jeune1solution?');
		expect(LBA_CANDIDAT_URL).not.toContain('/1jeune1solution-recruteurs');
		expect(LBA_CANDIDAT_URL).toContain('utm_source=1j1s');
		expect(LBA_CANDIDAT_URL).toContain('utm_medium=website');
		expect(LBA_CANDIDAT_URL).toContain('utm_campaign=landinglba1j1s');
		expect(LBA_CANDIDAT_URL).not.toContain('utm_campaign=recruteurs_');
	});

	it('LBA_RECRUTEUR_URL cible la landing recruteurs avec les 3 UTM attendus', () => {
		expect(LBA_RECRUTEUR_URL).toContain('/1jeune1solution-recruteurs?');
		expect(LBA_RECRUTEUR_URL).toContain('utm_source=1j1s');
		expect(LBA_RECRUTEUR_URL).toContain('utm_medium=website');
		expect(LBA_RECRUTEUR_URL).toContain('utm_campaign=recruteurs_landinglba1j1s');
	});

	it('les deux URLs sont syntaxiquement valides', () => {
		expect(() => new URL(LBA_CANDIDAT_URL)).not.toThrow();
		expect(() => new URL(LBA_RECRUTEUR_URL)).not.toThrow();
	});
});
