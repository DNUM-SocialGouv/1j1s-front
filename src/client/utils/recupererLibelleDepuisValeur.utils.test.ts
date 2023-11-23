import { Option } from '~/client/components/ui/Select/Select';
import { recupererLibelleDepuisValeur } from '~/client/utils/recupererLibelleDepuisValeur.utils';

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
			const result = recupererLibelleDepuisValeur(optionList, valeur);
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
			//when
			const result = recupererLibelleDepuisValeur(optionList, valeur);
			//then
			expect(result).toEqual('');
		});
	});
});
