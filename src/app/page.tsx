import { AuthRedirectWrapper, PageWrapper } from '@/wrappers';
import { Transaction } from './transaction';

export default function Home() {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <PageWrapper>
        <div className='flex flex-col-reverse sm:flex-row items-center h-full w-full'>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center'>
            <div className='flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl'>
              <div>
                <h1>Template dApp Next.js</h1>
                <p className='text-gray-400'>
                  The{' '}
                  <a
                    href='https://www.npmjs.com/package/@multiversx/sdk-dapp'
                    target='_blank'
                    className='text-gray-400 underline decoration-dotted hover:decoration-solid'
                  >
                    sdk-dapp
                  </a>{' '}
                  starter project for any dApp{' '}
                  <br className='hidden xl:block' />
                  built on the{' '}
                  <a
                    href='https://multiversx.com/'
                    target='_blank'
                    className='text-gray-400 underline decoration-dotted hover:decoration-solid'
                  >
                    MultiversX
                  </a>{' '}
                  blockchain.
                </p>
              </div>
              <Transaction />
            </div>
          </div>
          <div className="h-4/6 bg-[url('/assets/img/multiversx-white.svg')] bg-contain bg-center bg-no-repeat w-1/2" />
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
}
