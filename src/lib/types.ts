export interface SelectOptions {
  id: string | number;
  key?: string | number;
  label?: string | number;
  value?: unknown;
  disabled?: boolean;
  [key: string]: unknown;
}
