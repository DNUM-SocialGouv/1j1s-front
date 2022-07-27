import RechercheLocalisationUtils from '~/server/localisations/domain/rechercheLocalisationUtils';

describe('RechercheLocalisationUtils', () => {
  describe('isRechercheByNumeroCodePostal', () => {
	  describe('Lorsque la recherche contient moins de 5 chiffres', () => {
		  it('renvoie faux', () => {
			  const result = RechercheLocalisationUtils.isRechercheByNumeroCodePostal('0123');
			  expect(result).toBe(false);
		  });
	  });
	  describe('Lorsque la recherche contient plus de 5 chiffres', () => {
		  it('renvoie faux', () => {
			  const result = RechercheLocalisationUtils.isRechercheByNumeroCodePostal('012345');
			  expect(result).toBe(false);
		  });
	  });
	  describe('Lorsque la recherche contient exactement 5 chiffres', () => {
		  it('renvoie vrai', () => {
			  const result = RechercheLocalisationUtils.isRechercheByNumeroCodePostal('01234');
			  expect(result).toBe(true);
		  });
	  });
  });
  describe('isRechercheByNumeroDepartement', () => {
	  describe('Lorsque la recherche contient moins de 2 chiffres', () => {
		  it('renvoie faux', () => {
			  const result = RechercheLocalisationUtils.isRechercheByNumeroDepartement('0');
			  expect(result).toBe(false);
		  });
	  });
	  describe('Lorsque la recherche contient plus de 2 chiffres', () => {
		  it('renvoie faux', () => {
			  const result = RechercheLocalisationUtils.isRechercheByNumeroDepartement('012');
			  expect(result).toBe(false);
		  });
	  });
	  describe('Lorsque la recherche contient exactement 2 chiffres', () => {
		  it('renvoie vrai', () => {
			  const result = RechercheLocalisationUtils.isRechercheByNumeroDepartement('01');
			  expect(result).toBe(true);
		  });
	  });
  });
  describe('checkRechercheOnlyNumber', () => {
    describe('Lorsque la longueur de chaîne à vérifier est supérieure à 0', () => {
		  describe('Lorsque la chaîne contient aucun caractère', () => {
			  it('renvoie faux', () => {
				  const result = RechercheLocalisationUtils.checkRechercheOnlyNumber(3, '');
				  expect(result).toBe(false);
			  });
		  });
		  describe('Lorsque la chaîne contient des caractères autres que des chiffres', () => {
			  it('renvoie faux', () => {
				  const result = RechercheLocalisationUtils.checkRechercheOnlyNumber(3, 'ab1');
				  expect(result).toBe(false);
			  });
		  });
      describe('Lorsque la chaîne ne contient que des chiffres et est inférieure à la longueur', () => {
        it('renvoie false', () => {
          const result = RechercheLocalisationUtils.checkRechercheOnlyNumber(3, '01');
          expect(result).toBe(false);
        });
      });
      describe('Lorsque la chaîne ne contient que des chiffres et est supérieure à la longueur', () => {
        it('renvoie false', () => {
          const result = RechercheLocalisationUtils.checkRechercheOnlyNumber(3, '0123');
          expect(result).toBe(false);
        });
      });
		  describe('Lorsque la chaîne ne contient que des chiffres et correspond à la longueur', () => {
			  it('renvoie vrai', () => {
				  const result = RechercheLocalisationUtils.checkRechercheOnlyNumber(3, '012');
				  expect(result).toBe(true);
			  });
		  });
    });
    describe('Lorsque la longueur de chaîne à vérifier est égale à 0', () => {
      describe('Lorsque la chaîne contient des caractères', () => {
        it('retourne faux', () => {
          const result = RechercheLocalisationUtils.checkRechercheOnlyNumber(0, '01');
          expect(result).toBe(false);
        });
      });
      describe('Lorsque la chaîne ne contient aucun caractère', () => {
        it('retourne true', () => {
          const result = RechercheLocalisationUtils.checkRechercheOnlyNumber(0, '');
          expect(result).toBe(true);
        });
      });
    });
  });
});
