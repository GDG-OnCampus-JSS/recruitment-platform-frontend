'use client';

import React, { memo } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type SelectOptions } from '@/lib/types';
import { Label } from '@/components/ui/label';

interface OptionsSelectProps {
  className?: string;
  triggerClassName?: string;
  placeholder: React.ReactNode;
  value: string | undefined;
  onSelectionChange: (...event: any[]) => void;
  options: SelectOptions[] | [];
  description?: React.ReactNode;
  defaultValue?: string;
  itemLabel?: string;
  keyLabel?: string;
  valueLabel?: string;
  label?: string;
  isAsterisk?: boolean;
}

const OptionsSelect: React.FC<OptionsSelectProps> = memo(
  ({
    className = '',
    value,
    triggerClassName = '',
    placeholder,
    options = [],
    onSelectionChange = () => {},
    itemLabel = 'label',
    keyLabel = 'id',
    valueLabel = 'value',
    label,
    isAsterisk = false,
  }) => {
    return (
      <div>
        {label && (
          <Label>
            {label} {isAsterisk && <span className="text-red-500">*</span>}
          </Label>
        )}
        <Select value={value || undefined} onValueChange={onSelectionChange}>
          <SelectTrigger className={`h-12 w-full ${triggerClassName}`}>
            <SelectValue placeholder={placeholder}/>
          </SelectTrigger>
          <SelectContent className={className}>
            <SelectGroup>
              {options.map((option) => {
                return (
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
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
);

OptionsSelect.displayName = 'OptionsSelect';

export default OptionsSelect;
