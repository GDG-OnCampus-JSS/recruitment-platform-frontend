'use client';

import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  onChange: (otp: string) => void;
  label?: string;
  className?: string;
  isAsterisk?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ onChange, label, className, isAsterisk = false }) => {
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
        <InputOTPGroup className="justify-between flex w-full">
          {Array.from({ length: 6 }, (_, index) => (
            <InputOTPSlot key={index} index={index} className="h-[43.2px] w-[58.5px] rounded-md border" />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OTPInput;
