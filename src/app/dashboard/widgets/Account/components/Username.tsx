import { trimUsernameDomain, type AccountType } from '@/lib';
import { Label } from '@/components/Label';
import { ProfileType } from '@/types';

export const Username = (props: {
  account: AccountType | ProfileType | null;
}) => {
  const { account } = props;

  if (!account) {
    return null;
  }

  return (
    <p>
      <Label>Herotag: </Label>
      <span daata-testid='heroTag'>
        {account.username ? trimUsernameDomain(account.username) : 'N/A'}
      </span>
    </p>
  );
};
