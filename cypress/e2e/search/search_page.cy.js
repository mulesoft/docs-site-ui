/// <reference types="cypress" />
// Setting up initial test suite for search
describe('Visit search page', () => {
    it('should visit', () => {
        cy.visit('http://localhost:8080/search.html')
    }
    )
})
