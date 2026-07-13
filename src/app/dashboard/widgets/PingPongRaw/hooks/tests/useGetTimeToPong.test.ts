import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useGetTimeToPong } from '../useGetTimeToPong';
import { expect } from '@jest/globals';
import { useGetAccount, useGetNetworkConfig } from '@/lib';

// Keep the real sdk-core exports (Address, AddressValue) and only stub the
// dApp hooks the raw query hook depends on.
jest.mock('@/lib', () => {
  const actual = jest.requireActual('@/lib');
  return {
    ...actual,
    useGetAccount: jest.fn(),
    useGetNetworkConfig: jest.fn()
  };
});

describe('useGetTimeToPong', () => {
  // Return values are set here (not in the mock factory) because the jest
  // config uses resetMocks, which clears implementations before each test.
  beforeEach(() => {
    (useGetAccount as jest.Mock).mockReturnValue({
      address: 'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex'
    });
    (useGetNetworkConfig as jest.Mock).mockReturnValue({
      network: { apiAddress: 'https://devnet-api.multiversx.com' }
    });
  });

  it('should return 180 seconds', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        // 'tA==' is base64 for the byte 0xB4 -> hex 'b4' -> 180 decimal
        data: { data: { returnData: ['tA=='] } }
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBe(180);
  });

  it('should return 0', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        data: { data: { returnData: [''] } }
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBe(0);
  });

  it('should return null on axios error', async () => {
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBeNull();
  });
});
