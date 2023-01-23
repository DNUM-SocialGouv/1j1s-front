import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import Localisation = AnnonceDeLogement.Localisation;
import formatLocalisation from '~/client/utils/formatLocalisation.util';

describe('Localisation formatting', () => {
	it("n'affiche que la ville si que la ville n'est présente", async () => {
		const localisation: Localisation = {
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('Paris');
	});
	it("n'affiche que l'adresse si que l'adresse n'est présente", async () => {
		const localisation: Localisation = {
			adresse: "15 rue de l'impasse",
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('15 rue de l\'impasse');
	});
	it("affiche l'adresse et la ville si toutes deux sont présentes", async () => {
		const localisation: Localisation = {
			adresse: "15 rue de l'impasse",
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('15 rue de l\'impasse, Paris');
	});
	it("n'affiche que le code postal si que le code postal n'est présente", async () => {
		const localisation: Localisation = {
			codePostal: '75001',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('75001');
	});
	it('affiche le code postal et la ville si tous deux sont présents', async () => {
		const localisation: Localisation = {
			codePostal: '75001',
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('Paris (75001)');
	});
	it("affiche le code postal et l'adresse si tous deux sont présents", async () => {
		const localisation: Localisation = {
			adresse: "15 rue de l'impasse",
			codePostal: '75001',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual("15 rue de l'impasse (75001)");
	});
	it('affiche toutes les informations quand elles sont toutes présentes', async () => {
		const localisation: Localisation = {
			adresse: "15 rue de l'impasse",
			codePostal: '75001',
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual("15 rue de l'impasse, Paris (75001)");
	});
});
