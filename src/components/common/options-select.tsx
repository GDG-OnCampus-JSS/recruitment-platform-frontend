'use client';
import { AlertCircle } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type SelectOptions } from '@/lib/types';
import InfoTooltip from './info-tooltip';

interface OptionsSelectProps {
  name: string;
  className?: string;
  triggerClassName?: string;
  placeholder?: React.ReactNode;
  options: SelectOptions[];
  description?: React.ReactNode;
  defaultValue?: string;
  itemLabel?: string;
  keyLabel?: string;
  valueLabel?: string;
  label?: string;
  isAsterisk?: boolean;
  info?: string;
  containerClassName?: string;
  disabled?: boolean;
  showError?: boolean;
  onSelectionChange?: (value: string) => void;
}

const OptionsSelect: React.FC<OptionsSelectProps> = memo(
  ({
    name,
    className = '',
    triggerClassName = '',
    placeholder = 'Select an option',
    options = [],
    description,
    itemLabel = 'label',
    keyLabel = 'id',
    valueLabel = 'value',
    label = '',
    isAsterisk = false,
    info = '',
    containerClassName = '',
    disabled = false,
    showError = true,
    onSelectionChange = () => {},
  }) => {
    const { control } = useFormContext();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
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
              <Select
                disabled={disabled}
                onValueChange={(value) => {
                  field.onChange(value);
                  onSelectionChange(value);
                }}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger
                  className={`h-12 w-full tracking-wider ${triggerClassName}`}
                  id={name}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className={className}>
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem
                        className="px-3.5 py-2.5 pr-6"
                        value={option[valueLabel]}
                        key={option[keyLabel]}
                      >
                        <div className="flex flex-row items-center gap-2">
                          {option.icon && option.icon}
                          {option[itemLabel]}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {showError && error && (
              <div className="flex items-center gap-x-1">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <FormMessage />
              </div>
            )}
          </FormItem>
        )}
      />
    );
  },
);

OptionsSelect.displayName = 'OptionsSelect';
export default OptionsSelect;
