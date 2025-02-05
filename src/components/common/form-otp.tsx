'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { AlertCircle } from 'lucide-react';

interface OTPInputProps {
  name: string;
  label?: string;
  className?: string;
  isAsterisk?: boolean;
  showError?: boolean;
  length?: number;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  label,
  name,
  className,
  isAsterisk = false,
  showError = true,
  length = 6,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {isAsterisk && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <InputOTP className={className} maxLength={length} {...field}>
              <InputOTPGroup className="flex w-full gap-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-[43.2px] flex-1 rounded-md border"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          {showError && fieldState.error && (
            <>
              <div className="mt-1 flex items-center gap-x-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <FormMessage />
              </div>
            </>
          )}
        </FormItem>
      )}
    />
  );
};
