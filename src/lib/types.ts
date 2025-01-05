export interface SelectOptions {
  id: string | number;
  key?: string | number;
  label?: string | number;
  value?: any;
  disabled?: boolean;
  [key: string]: any;
}
export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: DropdownOption[];
}
export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}
