import React from 'react';
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <Link
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href='https://multiversx.com/'
        >
          Made by MultiversX.
        </Link>
      </div>
    </footer>
  );
};
