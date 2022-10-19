describe('Page d\'accueil', () => {
  before(() => {
    cy.visit('/');
  });
  context('Sur mobile', () => {
    before(() => {
      cy.viewport('iphone-6');
    });
    it('contient un titre', () => {
      cy.get('h1').should('contain.text', 'À chacun sa solution.' +
        'Vous avez entre 15 et 30 ans ? Découvrez toutes les solutions pour votre avenir !');
    });
    it('contient 4 sections de présentation différentes', () => {
      cy.get('section').should('have.length', 4);
    });
    it('contient le pied de page', () => {
      cy.get('footer').should('exist');
    });
  });
  context('Sur desktop', () => {
    before(() => {
      cy.viewport(1248, 800);
    });
    it('contient le menu de navigation', () => {
      cy.get('nav').should('exist');
    });
  });
});
