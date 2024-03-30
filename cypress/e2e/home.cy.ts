describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'Angular Workshop: Counters');
  });

  // it('has a create trip button', () => {
  //   cy.title().should('equal', 'Angular Workshop: Counters');
  // });
});
