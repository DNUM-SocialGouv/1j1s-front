import { Option } from '~/client/components/ui/Select/Select';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';

describe('récupérerLibelléDepuisValeur', () => {
	describe('quand la valeur est trouvée' , () => {
		it('retourne un libellé en fonction de la valeur', () => {
			//given
			const valeur = '10';
			const optionList: Option[] = [
				{ libellé: 'Indifférent', valeur: 'indifférent' },
				{ libellé: 'dix', valeur: '10' },
				{ libellé: '30', valeur: '30' },
				{ libellé: '60', valeur: '60' },
				{ libellé: '100', valeur: '100' },
			];
			const expected = 'dix';
			//when
			const result = récupérerLibelléDepuisValeur(optionList, valeur);
			//then
			expect(result).toEqual(expected);
		});
	});
	describe('quand la valeur n‘est pas trouvée' , () => {
		it('retourne une valeur par défaut', () => {
			//given
			const valeur = '101';
			const optionList: Option[] = [
				{ libellé: 'Indifférent', valeur: 'indifférent' },
				{ libellé: 'dix', valeur: '10' },
				{ libellé: '30', valeur: '30' },
				{ libellé: '60', valeur: '60' },
				{ libellé: '100', valeur: '100' },
			];
			const placeholder = 'Sélectionne';
			//when
			const result = récupérerLibelléDepuisValeur(optionList, valeur, placeholder);
			//then
			expect(result).toEqual(placeholder);
		});
	});

});
