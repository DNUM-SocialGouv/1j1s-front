describe('Middleware', () => {
  describe('quand le paramètre est opti_enovate', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/jobs-etudiants?page=1?opti_enovate');
    });
    it('retourne une demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
  describe('quand le paramètre est utm_medium', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/jobs-etudiants?page=1?utm_medium');
    });
    it('retourne une demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
  describe('quand le paramètre est utm_source', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/jobs-etudiants?page=1?utm_source');
    });
    it('retourne une demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
  describe('quand le paramètre est dclid', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/jobs-etudiants?page=1?dclid');
    });
    it('retourne une demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
  describe('quand le paramètre est xtor', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/jobs-etudiants?page=1?xtor');
    });
    it('retourne une demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
  describe('quand le paramètre est gclsrc', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/jobs-etudiants?page=1?gclsrc');
    });
    it('retourne une demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
  describe('quand le paramètre est gclid', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit('/jobs-etudiants?page=1?gclid');
    });
    it('retourne une demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('exist');
    });
  });
});
