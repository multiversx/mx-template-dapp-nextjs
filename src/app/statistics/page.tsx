'use client';

import React, { useEffect, useState } from 'react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { StatisticsLayout } from './components/StatisticsLayout';
import { routeNames } from '@/routes';
import { Loader, PageState } from '@/components';
import { TOOLS_API_URL } from '@/config';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';

interface StatisticsType {
  currentPrice: number;
  volume24h: number;
}

const Statistics = () => {
  const { tokenLogin } = useGetLoginInfo();
  const [statistics, setStatistics] = useState<StatisticsType | null>();

  const getStatistics = async () => {
    try {
      const { data } = await axios.get<
        {
          statistics: StatisticsType;
        }[]
      >('/growth-api/charts', {
        baseURL: TOOLS_API_URL,
        params: {
          types: 'price'
        },
        headers: {
          Authorization: `Bearer ${tokenLogin?.nativeAuthToken}`
        }
      });
      setStatistics(data[0].statistics);
    } catch (err) {
      console.error('Unable to fetch Statistics');
      setStatistics(null);
    }
  };

  useEffect(() => {
    if (!tokenLogin?.nativeAuthToken) {
      return;
    }
    getStatistics();
  }, [tokenLogin]);

  if (statistics === null) {
    return (
      <PageState
        icon={faTriangleExclamation}
        iconClass='text-white'
        iconBgClass='bg-warning'
        iconSize='3x'
        title='Unable to load statistics'
        action={<Link href={routeNames.dashboard}>Back to Dashboard</Link>}
      />
    );
  }

  if (!statistics) {
    return (
      <StatisticsLayout>
        <Loader />
      </StatisticsLayout>
    );
  }

  return (
    <StatisticsLayout>
      <div className='row mt-3'>
        <div className='col-12'>
          <p className='ml-2'>
            Information below is fetched using{' '}
            <span className='badge badge-primary'>nativeAuth</span> Bearer token
          </p>
          <ul className='list-group text-left'>
            <li className='list-group-item'>
              Current price: {statistics.currentPrice}
            </li>
            <li className='list-group-item'>
              24h Volume: {statistics.volume24h}
            </li>
          </ul>
        </div>
      </div>
    </StatisticsLayout>
  );
};

export default Statistics;
