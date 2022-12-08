/// <reference types="cypress" />

import { aBarmanOffre, aRésultatEchantillonOffre } from '~/server/offres/domain/offre.fixture';

describe('Parcours emplois', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('/emplois');
  });
  it('affiche 15 résultats par défaut', () => {
    cy.intercept('/api/emplois', aRésultatEchantillonOffre());
    cy.get('ul[aria-label="Offres d\'emplois"] > li').should('have.length', 15);
  });
  it('place le focus sur le premier input du formulaire de recherche', () => {
    cy.focused().should('have.attr', 'name', 'motCle');
  });
  context('quand l\'utilisateur rentre un mot clé', () => {
    it('filtre les résultats par mot clé', () => {
      cy.intercept({
        pathname: '/api/emplois',
        query: { motCle: 'barman' },
      }, { nombreRésultats: 1, résultats: [aBarmanOffre()] });
      cy.focused().type('barman').type('{enter}');

      cy.get('ul[aria-label="Offres d\'emplois"] > li').should('have.length', 1);
    });
    context('quand l\'utilisateur veut sélectionner la première offre', () => {
      it('navigue vers le détail de l\'offre', () => {
        const id = aBarmanOffre().id;
        cy.intercept(`/_next/data/development/emplois/${id}.json?id=${id}`, {
          pageProps: { offreEmploi: aBarmanOffre() },
        });
        cy.get('ul[aria-label="Offres d\'emplois"] > li a').first().click();
      });
    });
  });
});

describe('Parcours emplois - Erreur paramètres url', () => {
  describe("quand les paramètres de l'url ne respectent pas le schema de validation du controller", () => {
    context('quand le paramètre page est erroné ', () => {
      describe('quand le paramètre page est supérieur au maximum autorisé', () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/emplois?page=67');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe('quand le paramètre page est inférieur au minimum autorisé', () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/emplois?page=0');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe("quand le paramètre page n'est pas un nombre", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/emplois?page=erreur');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });

      describe("quand le paramètre page n'est pas présent", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/emplois?motCle=pas-de-page');
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
          cy.visit('/emplois?typeLocalisation=NATION&codeLocalisation=75000&page=1');
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
          cy.visit('/emplois?typeLocalisation=COMMUNE&codeLocalisation=erreur&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });

    context('quand le paramètre typeDeContrats est erroné', () => {
      describe("quand le paramètre typeDeContrats n'est pas autorisé", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/emplois?typeDeContrats=RSA&page=1');
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
          cy.visit('/emplois?grandDomaineList=CS12&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });

    context('quand le paramètre tempsDeTravail est erroné', () => {
      describe("quand le paramètre tempsDeTravail n'est pas autorisé", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/emplois?tempsDeTravail=tiersTemps&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });

    context('quand le paramètre experienceExigence est erroné', () => {
      describe("quand le paramètre experienceExigence n'est pas autorisé", () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.visit('/emplois?experienceExigence=A&page=1');
        });

        it('retourne une erreur de demande incorrecte', () => {
          cy.contains('Erreur - Demande incorrecte').should('exist');
        });
      });
    });
  });
});
