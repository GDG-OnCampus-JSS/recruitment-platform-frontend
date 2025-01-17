'use client';

import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface OTPInputProps {
  onChange: (otp: string) => void;
  label?: string;
  className?: string;
  isAsterisk?: boolean;
  validationError?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  onChange,
  label,
  className,
  isAsterisk = false,
  validationError,
}) => {
  const handleOtpChange = (otp: string) => {
    onChange(otp);
  };

  return (
    <div className={cn('', className)}>
      {label && (
        <Label>
          {label} {isAsterisk && <span className="text-red-500">*</span>}
        </Label>
      )}
      <InputOTP maxLength={6} onChange={handleOtpChange}>
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
      {validationError && (
        <>
          <div className="mt-1 flex items-center gap-x-1 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {validationError}
          </div>
        </>
      )}
    </div>
  );
};

export default OTPInput;
