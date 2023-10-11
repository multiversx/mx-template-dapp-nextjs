/// <reference types="cypress" />
import { pingPongHandler } from './SCActions';
import { walletIDEnum } from '../../constants/enums';

describe('Smart Contract Transactions', () => {
  afterEach(() => {
    cy.clearCookies();
  });

  it('should successfully execute the Ping & Pong ABI', () => {
    cy.login(walletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
    pingPongHandler('Abi');
  });

  it('should successfully execute the Ping & Pong RAW ', () => {
    cy.login(walletIDEnum.unguardedWallet2, 'Connect');
    cy.wait(5000);
    pingPongHandler('Raw');
  });

  it('should successfully execute the Ping & Pong Service', () => {
    cy.login(walletIDEnum.unguardedWallet3, 'Connect');
    cy.wait(5000);
    pingPongHandler('Raw');
  });
});
