import { bénévolatDomaineList,serviceCiviqueDomaineList } from '~/server/engagement/domain/engagement';


describe('serviceCiviqueDomaineList', () => {
	it('doit être ordonnée par ordre alphabétique à l‘exception de autres en dernier', () => {
		const serviceCiviqueDomaineListCopy = [...serviceCiviqueDomaineList];
		const expected = serviceCiviqueDomaineListCopy.sort((a,b) => (a.libellé.localeCompare(b.libellé) >= 1) || a.libellé === 'Autre' ? 1 : -1);
		expect(serviceCiviqueDomaineList).toEqual(expected);
	});

});

describe('bénévolatDomaineList', () => {
	it('doit être ordonnée par ordre alphabétique à l‘exception de autres en dernier', () => {
		const bénévolatDomaineListCopy = [...bénévolatDomaineList];
		const expected = bénévolatDomaineListCopy.sort((a,b) => (a.libellé.localeCompare(b.libellé) >= 1) || a.libellé === 'Autre' ? 1 : -1);
		expect(bénévolatDomaineList).toEqual(expected);

	});
});
