import { signTransactions } from './helpers';
import { walletIDEnum } from '../../constants/enums';

describe('Batch Transaction', () => {
  it('should successfully sign 5 transactions for auto-send batch', () => {
    cy.login(walletIDEnum.unguardedWallet1, 'Connect');

    signTransactions('sign-auto-send');
  });

  it('should successfully sign 5 transactions for send-transactions', () => {
    cy.login(walletIDEnum.unguardedWallet3, 'Connect');

    signTransactions('send-transactions');
  });

  it('should successfully sign 4 transactions for swap-lock', () => {
    cy.login(walletIDEnum.unguardedWallet2, 'Connect');

    signTransactions('swap-lock');
  });
});
