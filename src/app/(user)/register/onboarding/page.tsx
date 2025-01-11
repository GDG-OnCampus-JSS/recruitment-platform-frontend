'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/common/form-input';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import LogoGrid from '@/components/common/logo-grid';
import { motion } from 'framer-motion';
import OptionsSelect from '@/components/common/options-select';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const personalInfoSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    academicYear: z.enum(['1', '2', '3', '4', '5']),
    admissionNumber: z.string().min(5, 'Admission number must be at least 5 characters'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const additionalDetailsSchema = z.object({
  domain: z.string().min(1, 'Please select a domain'),
  resume: z
    .any()
    .refine((file) => !file || file instanceof File, 'Please upload a file')
    .optional(),
});

const steps = [
  {
    title: 'Personal Information',
    description: 'Tell us a bit about yourself',
    schema: personalInfoSchema,
  },
  {
    title: 'Additional Details',
    description: 'Choose your domain and set your password',
    schema: additionalDetailsSchema,
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentSchema = steps[step].schema;
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      fullName: '',
      academicYear: '',
      admissionNumber: '',
      phoneNumber: '',
      domain: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: any) {
    try {
      if (step < steps.length - 1) {
        setStep(step + 1);
        form.reset(form.getValues()); // Preserve values while switching steps
      } else {
        // Final submission
        const finalData = {
          ...form.getValues(),
        };
        console.log('Final submission:', finalData);
        // Here you would typically send the data to your backend
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <LogoGrid>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto mt-11 w-full max-w-[500px] overflow-hidden rounded-[1rem] border-2 border-card bg-white shadow-card"
      >
        <div className="p-12">
          <div className="mb-10 space-y-1">
            <div className="flex min-w-[400px] items-center justify-between">
              <h1 className="text-heading-1 font-medium text-gray-900">{steps[step].title}</h1>
              <Link href="/">
                <Image src="/gdg-logo.svg" height={40} width={40} alt="GDG Logo" />
              </Link>
            </div>
            <p className="text-sm font-extralight text-muted-foreground">
              {steps[step].description}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 0 && (
                <>
                  <FormInput
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    isAsterisk
                  />
                  <div className="relative">
                    <FormInput
                      name="phoneNumber"
                      label="Phone Number"
                      placeholder="Enter Phone Number"
                      isAsterisk
                      className="pl-14"
                    />
                    <div className="absolute left-3 top-[36px] text-sm">
                      + 91
                      <span className="ml-2 text-gray-light">|</span>
                    </div>
                  </div>
                  <div className="relative">
                    <FormInput
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="Create a password"
                      isAsterisk
                    />
                    <Icon
                      icon={showPassword ? 'fluent:eye-16-regular' : 'fluent:eye-off-16-regular'}
                      width="24"
                      height="24"
                      className="absolute right-4 top-9 cursor-pointer text-neutral-700"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <div className="relative">
                    <FormInput
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      isAsterisk
                    />
                    <Icon
                      icon={
                        showConfirmPassword ? 'fluent:eye-16-regular' : 'fluent:eye-off-16-regular'
                      }
                      width="24"
                      height="24"
                      className="absolute right-4 top-9 cursor-pointer text-gray-light"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <OptionsSelect
                    name="academicYear"
                    label="Academic Year"
                    placeholder="Select your academic year"
                    isAsterisk
                    options={[
                      { id: '1', label: '1st Year', value: '1' },
                      { id: '2', label: '2nd Year', value: '2' },
                    ]}
                    onSelectionChange={(value) => form.setValue('academicYear', value)}
                  />
                  <FormInput
                    name="admissionNumber"
                    label="Admission Number"
                    placeholder="Enter your admission number"
                    isAsterisk
                  />
                  <OptionsSelect
                    name="domain"
                    label="Domain"
                    placeholder="Select your domain"
                    isAsterisk
                    options={[
                      { id: 'app', label: 'App Development', value: 'app' },
                      { id: 'ml', label: 'Machine Learning', value: 'ml' },
                      { id: 'programming', label: 'Programming', value: 'programming' },
                      { id: 'design', label: 'UI/UX Design', value: 'design' },
                      { id: 'web', label: 'Web Development', value: 'web' },
                    ]}
                    onSelectionChange={(value) => form.setValue('domain', value)}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume (Optional)</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="h-11 cursor-pointer py-3"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue('resume', file);
                        }
                      }}
                    />
                  </div>
                </>
              )}
              <div>
                <Button
                  type="submit"
                  className="h-11 w-full border bg-btn-primary tracking-wide hover:bg-indigo-600"
                  disabled={form.formState.isSubmitting}
                  onClick={onSubmit}
                >
                  {step === 0 ? 'Next' : 'Submit'}
                </Button>
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="mt-2 w-full"
                  >
                    Back
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </LogoGrid>
  );
}
