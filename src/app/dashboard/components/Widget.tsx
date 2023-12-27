'use client';
import { Card } from '@/components/Card';
import { getCallbackRoute } from '@/utils/getCallbackRoute';
import { WidgetType } from '@/types/widget.types';
import { useIsWebProvider } from '@/hooks';

export const Widget = ({
  title,
  description,
  reference,
  anchor,
  widget: MxWidget,
  props = {}
}: WidgetType) => {
  const { isWebWallet } = useIsWebProvider();
  const callbackRoute = anchor ? getCallbackRoute({ anchor, isWebWallet }) : '';

  return (
    <Card
      title={title}
      description={description}
      reference={reference}
      anchor={anchor}
    >
      <MxWidget callbackRoute={callbackRoute} {...props} />
    </Card>
  );
};
