import { RouteNamesEnum } from '@/localConstants';

interface RouteWithTitleType {
  path: RouteNamesEnum;
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home'
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard'
  },
  {
    path: RouteNamesEnum.disclaimer,
    title: 'Disclaimer'
  }
];
