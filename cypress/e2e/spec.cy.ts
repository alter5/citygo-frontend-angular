describe('My First Test', () => {
  xit('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('app is running!')
  })
})
