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
import { SelectOptions } from '@/lib/types';

interface OptionsSelectProps {
  className?: string;
  triggerClassName?: string;
  placeholder: React.ReactNode;
  value: string;
  onSelectionChange: (...event: any[]) => void;
  options: SelectOptions[] | [];
  description?: React.ReactNode;
  defaultValue?: string;
  itemLabel?: string;
  keyLabel?: string;
  valueLabel?: string;
}

const OptionsSelect: React.FC<OptionsSelectProps> = memo(
  ({
    className = '',
    value = '',
    triggerClassName = '',
    placeholder,
    options = [],
    onSelectionChange = () => {},
    defaultValue,
    itemLabel = 'label',
    keyLabel = 'id',
    valueLabel = 'value',
  }) => {
    return (
      <Select
        value={value}
        onValueChange={onSelectionChange}
        defaultValue={defaultValue}
      >
        <SelectTrigger
          className={`h-12 w-44 rounded-[14px] ${triggerClassName}`}
        >
          <SelectValue placeholder={placeholder} />
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
    );
  }
);

OptionsSelect.displayName = 'OptionsSelect';

export default OptionsSelect;
