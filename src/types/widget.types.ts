import { TransactionsPropsType } from '@/app/dashboard/widgets/Transactions/types';

export type WidgetType<T = TransactionsPropsType> = {
  title: string;
  widget: (props: T) => JSX.Element;
  description?: string;
  props?: { receiver?: string };
  reference: string;
  anchor?: string;
};
