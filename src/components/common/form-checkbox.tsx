'use client';

import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

export interface FormCheckboxProps {
  name: string;
  label?: string;
  description?: React.ReactNode | string;
  disabled?: boolean;
  containerClassName?: string;
  className?: string;
  [key: string]: any;
}

const FormCheckbox: React.FC<FormCheckboxProps> = memo(
  ({
    name,
    label,
    description,
    disabled = false,
    containerClassName = '',
    className = '',
    ...rest
  }) => {
    const { control } = useFormContext();
    return (
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FormItem
            className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow ${containerClassName}`}
            aria-disabled={disabled}
          >
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
                disabled={disabled}
                className={className}
                {...rest}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              {label && <FormLabel>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
              {error && <FormMessage>{error.message}</FormMessage>}
            </div>
          </FormItem>
        )}
      />
    );
  },
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
