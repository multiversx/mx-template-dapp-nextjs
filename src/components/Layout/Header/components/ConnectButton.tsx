import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { RouteNamesEnum } from '@/localConstants';

export const ConnectButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(RouteNamesEnum.unlock);
  };

  return <Button onClick={handleClick}>Connect</Button>;
};
