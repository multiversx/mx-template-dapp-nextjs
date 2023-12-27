export type WidgetProps = {
  callbackRoute: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WidgetType<T = any> = {
  title: string;
  widget: (props: T) => JSX.Element;
  description?: string;
  props?: { receiver?: string };
  reference: string;
  anchor?: string;
};
