import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useGetPongTransaction } from '../useGetPongTransaction';
import { expect } from '@jest/globals';

const pongTransaction = {
  nonce: 10702,
  value: '0',
  receiver: 'erd1qqqqqqqqqqqqqpgq72l6vl07fkn3alyfq753mcy4nakm0l72396qkcud5x',
  sender: 'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex',
  gasPrice: 1000000000,
  gasLimit: 6000000,
  data: 'cG9uZw==',
  chainID: 'D',
  version: 1
};

jest.mock('@/lib', () => ({
  useGetLoginInfo: jest.fn()
}));

jest.mock('@/config', () => ({
  EnvironmentsEnum: {
    devnet: 'devnet',
    testnet: 'testnet',
    mainnet: 'mainnet'
  }
}));

describe('useGetPongTransaction', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return Pong transaction', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: pongTransaction
    });

    const { result } = renderHook(() => useGetPongTransaction());
    const transactionReceived = await result.current();

    expect(transactionReceived).toBe(pongTransaction);
  });

  it('should return null', async () => {
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));

    const { result } = renderHook(() => useGetPongTransaction());
    const transactionReceived = await result.current();

    expect(transactionReceived).toBeNull();
  });
});
