import type { PropsWithChildren } from 'react';
import { WithClassnameType } from '@/types';
import Link from 'next/link';

interface MxLinkPropsType extends PropsWithChildren, WithClassnameType {
  to: string;
}

export const MxLink = ({
  to,
  children,
  className = 'inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 ml-2 mr-0'
}: MxLinkPropsType) => {
  return (
    <Link href={to} className={className}>
      {children}
    </Link>
  );
};
