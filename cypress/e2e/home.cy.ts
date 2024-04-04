describe("Home", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has the correct title", () => {
    cy.title().should("equal", "Home Page")
  })

  it("should display trip overview cards", () => {
    // Check if at least one trip overview card is rendered
    cy.get("app-trip-overview-card").should('have.length.greaterThan', 0);
  });

  it("should redirect to trip details page when a trip overview card is clicked", () => {
    // Click on the first trip overview card
    cy.get("app-trip-overview-card").first().click();

    // Check if the URL now includes '/tripDetails'
    cy.url().should('include', '/tripDetails');
  });

  it('should have a working new trip button', () => {
    cy.get('app-button-new-trip').click()
    cy.url().should('include', '/createTrip')
  });

  it("should have a working dark mode toggle", () => {
    // In Cypress, the browser storage is cleared between tests, so the toggle should always start with light mode
    cy.get("#dark-mode-toggle").click();
    cy.get("body").should("have.class", "dark-theme");
    cy.get("app-dark-mode-toggle").click();
    cy.get("body").should("not.have.class", "dark-theme");
  }



  // navbar collapses into hamburger menu
  // cy.viewport(320, 480);

  // add test case that submits form and receives trip id from backend

  // example: should + expect
  // cy.get('p').should(($p) => {
  //   // massage our subject from a DOM element
  //   // into an array of texts from all of the p's
  //   let texts = $p.map((i, el) => {
  //     return Cypress.$(el).text()
  //   })

  //   // jQuery map returns jQuery object
  //   // and .get() converts this to an array
  //   texts = texts.get()

  //   // array should have length of 3
  //   expect(texts).to.have.length(3)

  //   // with this specific content
  //   expect(texts).to.deep.eq([
  //     'Some text from first p',
  //     'More text from second p',
  //     'And even more text from third p',
  //   ])
  // })

  // example: multiple assertions
  // it('creates two items', () => {
  //   cy.visit('/')

  //   cy.get('.new-todo').type('todo A{enter}')
  //   cy.get('.new-todo').type('todo B{enter}')

  //   cy.get('.todo-list li') // query
  //     .should('have.length', 2) // assertion
  //     .and(($li) => { // note how param is passed from original get command
  //       // 2 mocha assertions inside of the .and() assertion
  //       expect($li.get(0).textContent, 'first item').to.equal('todo a')
  //       expect($li.get(1).textContent, 'second item').to.equal('todo B')
  //     })
  // })
})
