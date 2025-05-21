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

jest.mock('@/config', () => ({
  API_URL: 'https://devnet-template-api.multiversx.com'
}));

jest.mock(
  '@multiversx/sdk-dapp/out/store/selectors/hooks/network/useGetNetworkConfig',
  () => ({
    useGetNetworkConfig: jest.fn().mockReturnValue({
      network: { apiAddress: 'https://devnet-api.multiversx.com' }
    })
  })
);

describe('useGetTimeToPong - Service', () => {
  beforeEach(() => {
    (useGetLoginInfo as jest.Mock).mockReturnValue({
      tokenLogin: {
        nativeAuthToken:
          'ZXJkMWhmczk5Mmh0eDBhaHFrYTI3dmZwa3dqcmZ5dWZ4NmZqNzlodWxnOHY1aG1tc2djZmNuOHN3MG54N3Q.YUhSMGNITTZMeTkxZEdsc2N5NXRkV3gwYVhabGNuTjRMbU52YlEuMzliMTA4YzM1YTBiMmRkNmRkNmI1NGJhNzc0NzExZDRmOTUyMWRkZjdhN2Q5MjA0MmNmNjEyNDE0YzdjYzM3ZC43MjAwLmV5SjBhVzFsYzNSaGJYQWlPakUzTkRjNE1qYzFORFo5.c50f3784a3d532e469b441c90a71747fabc9d7302ef8858aa5ed97a834344402abe2adbd19d44b0469941f4b10a27227cf52bec66fd54e8941aca4f8dc7fee0d'
      }
    });
  });

  it('should return 180 seconds', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
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
