import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useGetTimeToPong } from '../useGetTimeToPong';
import { expect } from '@jest/globals';
import { useGetLoginInfo } from '@/lib';

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

jest.mock(
  '@multiversx/sdk-dapp/out/store/selectors/hooks/network/useGetNetworkConfig',
  () => ({
    useGetNetworkConfig: jest.fn().mockReturnValue({
      network: { apiAddress: 'https://devnet-api.multiversx.com' }
    })
  })
);

describe('useGetTimeToPong', () => {
  beforeEach(() => {
    (useGetLoginInfo as jest.Mock).mockReturnValue({
      tokenLogin: {
        nativeAuthToken: 'mock-token'
      }
    });
  });

  it('should return 180 seconds', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        status: 'awaiting_pong',
        timeToPong: 180
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBe(180);
  });

  it('should return undefined', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        status: 'not_yet_pinged'
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBeUndefined();
  });

  it('should return null', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));

    const { result } = renderHook(() => useGetTimeToPong());

    const timeToPong = await result.current();
    expect(timeToPong).toBeNull();
  });
});
