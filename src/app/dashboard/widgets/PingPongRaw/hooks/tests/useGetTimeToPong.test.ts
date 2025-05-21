import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useGetTimeToPong } from '../useGetTimeToPong';
import { expect } from '@jest/globals';

beforeEach(() => {
  jest.mock(
    '@multiversx/sdk-dapp/out/store/selectors/hooks/network/useGetNetworkConfig',
    () => ({
      useGetNetworkConfig: jest.fn().mockReturnValue({
        network: { apiAddress: 'https://devnet-api.multiversx.com' }
      })
    })
  );
});

describe('useGetTimeToPong', () => {
  it('should return 180 seconds', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        data: {
          data: {
            returnData: 180 // 180 converted from b64 to hexa and from hexa to decimal
          }
        }
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    console.log('AAAA', { timeToPong });
    // Assert the result is correct based on your mock data
    expect(timeToPong).toBe(180);
  });

  it('should return 0', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        data: {
          data: {
            returnData: ['']
          }
        }
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();
    // Assert the result is correct based on your mock data
    expect(timeToPong).toBe(0);
  });

  it('should return null on axios error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBeNull();
  });
});
