import { dAppName } from '@/config';
import { routeNames } from '@/routes';
import * as React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='mt-5'>
      <div className='d-flex flex-fill align-items-center container'>
        <div className='row w-100'>
          <div className='col-12 col-md-8 col-lg-5 mx-auto'>
            <div className='card shadow-sm rounded p-4 border-0'>
              <div className='card-body text-center'>
                <h2 className='mb-3' data-testid='title'>
                  {dAppName}
                </h2>

                <p className='mb-3'>
                  This is an MultiversX dapp sample.
                  <br /> Login using your MultiversX wallet.
                </p>

                <Link
                  href={routeNames.unlock}
                  className='btn btn-primary mt-3 text-white'
                  data-testid='loginBtn'
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
