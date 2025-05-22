import axios from 'axios';
import { API_URL } from '@/config';
import { TimeToPongResponseType } from '../types';
import { useGetLoginInfo } from '@/lib';

export const useGetTimeToPong = () => {
  const loginInfo = useGetLoginInfo();

  const getTimeToPong = async () => {
    if (!loginInfo.tokenLogin?.nativeAuthToken) {
      return;
    }

    try {
      const { data } = await axios.get<TimeToPongResponseType>(
        '/ping-pong/abi/time-to-pong',
        {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${loginInfo.tokenLogin.nativeAuthToken}`
          }
        }
      );

      return data.timeToPong;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return getTimeToPong;
};
