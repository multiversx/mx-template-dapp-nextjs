import React from 'react';
import { AuthRedirectWrapper } from '@/components/AuthRedirectWrapper';
import { UnlockContent } from '@/app/unlock/components/UnlockContent';

export default function Unlock() {
  return (
    <AuthRedirectWrapper>
      <UnlockContent />
    </AuthRedirectWrapper>
  );
}
