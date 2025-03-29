'use client';

import { Copy, AlertCircle } from 'lucide-react';
import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import InfoTooltip from './info-tooltip';

interface FormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  info?: string;
  onInputChange?: (...event: any) => void;
  description?: React.ReactNode | string;
  isAsterisk?: boolean;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  showError?: boolean;
  enableCopyText?: boolean;
  [key: string]: any;
}

const FormTextArea: React.FC<FormTextAreaProps> = memo(
  ({
    name,
    label = '',
    placeholder = '',
    info = '',
    onInputChange = () => {},
    description,
    isAsterisk = false,
    className = '',
    containerClassName = '',
    disabled = false,
    showError = true,
    enableCopyText = false,
    ...rest
  }) => {
    const { control } = useFormContext();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          const { value, onChange } = field;
          return (
            <FormItem aria-disabled={disabled} className={`w-full ${containerClassName}`}>
              {label && (
                <FormLabel htmlFor={name}>
                  <div className="flex flex-row items-center">
                    <p className="mr-[4px] text-small font-medium">
                      {label} {isAsterisk && <span className="text-red-500">*</span>}
                    </p>
                    {info && (
                      <div className="bg-dp-5 flex rounded-full p-0 text-white">
                        <InfoTooltip info={info} />
                      </div>
                    )}
                  </div>
                </FormLabel>
              )}
              <FormControl>
                <div className="relative">
                  <Textarea
                    id={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${className} resize-none tracking-wider placeholder:text-gray-light`}
                    {...field}
                    {...rest}
                    // Allow for any external onInputChange callbacks
                    onChange={(e) => {
                      onChange(e);
                      onInputChange(e.target.value);
                    }}
                  />
                  {enableCopyText && (
                    <button
                      className="absolute inset-y-0 right-5 flex cursor-pointer items-center space-x-1"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(value);
                      }}
                    >
                      <Copy size={16} className="text-muted-foreground" />
                    </button>
                  )}
                </div>
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              {showError && error && (
                <div className="flex items-center gap-x-1">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <FormMessage />
                </div>
              )}
            </FormItem>
          );
        }}
      />
    );
  },
);

FormTextArea.displayName = 'FormTextArea';

export default FormTextArea;
