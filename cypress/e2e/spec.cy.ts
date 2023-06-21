describe('template spec', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });
  it('passes', () => {
    cy.get('[data-testid="loginBtn"]').click();
    cy.get('.dapp-web-wallet-login').click();
    cy.login();
  });
});
