import formatLocalisation from '~/client/utils/formatLocalisation.util';
import { AnnonceDeLogement } from '~/server/logements/domain/annonceDeLogement';

describe('Localisation formatting', () => {
	it("n'affiche que la ville si que la ville n'est présente", async () => {
		const localisation: AnnonceDeLogement.Localisation = {
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('Paris');
	});
	it("n'affiche que l'adresse si que l'adresse n'est présente", async () => {
		const localisation: AnnonceDeLogement.Localisation = {
			adresse: "15 rue de l'impasse",
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('15 rue de l\'impasse');
	});
	it("affiche l'adresse et la ville si toutes deux sont présentes", async () => {
		const localisation: AnnonceDeLogement.Localisation = {
			adresse: "15 rue de l'impasse",
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('15 rue de l\'impasse, Paris');
	});
	it("n'affiche que le code postal si que le code postal n'est présent", async () => {
		const localisation: AnnonceDeLogement.Localisation = {
			codePostal: '75001',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('75001');
	});
	it('affiche le code postal et la ville si tous deux sont présents', async () => {
		const localisation: AnnonceDeLogement.Localisation = {
			codePostal: '75001',
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual('Paris (75001)');
	});
	it("affiche le code postal et l'adresse si tous deux sont présents", async () => {
		const localisation: AnnonceDeLogement.Localisation = {
			adresse: "15 rue de l'impasse",
			codePostal: '75001',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual("15 rue de l'impasse (75001)");
	});
	it('affiche toutes les informations quand elles sont toutes présentes', async () => {
		const localisation: AnnonceDeLogement.Localisation = {
			adresse: "15 rue de l'impasse",
			codePostal: '75001',
			ville: 'Paris',
		};
		const résultat = formatLocalisation(localisation);

		expect(résultat).toEqual("15 rue de l'impasse, Paris (75001)");
	});
});
