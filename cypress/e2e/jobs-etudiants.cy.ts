/// <reference types="cypress" />

describe('Parcours jobs étudiants', () => {
  describe("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
    context('quand le paramètre page est erroné ', () => {
      describe('quand le paramètre page est supérieur au maximum autorisé', () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/jobs-etudiants?page=67');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe('quand le paramètre page est inférieur au minimum autorisé', () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/jobs-etudiants?page=0');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe("quand le paramètre page n'est pas un nombre", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/jobs-etudiants?page=erreur');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe("quand le paramètre page n'est pas présent", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/jobs-etudiants?motCle=pas-de-page');
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
          cy.visit('/jobs-etudiants?typeLocalisation=NATION&codeLocalisation=75000&page=1');
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
          cy.visit('/jobs-etudiants?typeLocalisation=COMMUNE&codeLocalisation=erreur&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });

    context('quand le paramètre grandDomaineList est erroné', () => {
      describe("quand le paramètre grandDomaineList n'est pas autorisé", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/jobs-etudiants?grandDomaineList=CS12&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });
  });
});
