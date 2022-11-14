/* eslint-disable jest/expect-expect */
describe('Parcours alternance', () => {
  describe("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
    context('quand le paramètre page est erroné ', () => {
      describe('quand le paramètre page est supérieur au maximum autorisé', () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/apprentissage?page=67');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe("quand le paramètre page n'est pas un nombre", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/apprentissage?page=erreur');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe("quand le paramètre page n'est pas présent", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/apprentissage?motCle=pas-de-page');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });

    context('quand le paramètre typeLocalisation est erroné', () => {
      describe("quand le paramètre typeLocalisation n'est pas autorisé", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/apprentissage?typeLocalisation=NATION&codeLocalisation=75000&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });

    context('quand le paramètre codeLocalisation est erroné', () => {
      describe("quand le paramètre codeLocalisation n'est pas autorisé", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/apprentissage?typeLocalisation=COMMUNE&codeLocalisation=erreur&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });
  });
});
