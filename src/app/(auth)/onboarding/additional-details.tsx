import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FormInput from '@/components/common/form-input';
import OptionsSelect from '@/components/common/options-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const additionalDetailsSchema = z.object({
  admissionNumber: z
    .string()
    .min(1, 'Admission number is required')
    .regex(/^\d{2}[A-Za-z]{2,7}\d{1,3}$/, 'Admission number must follow the pattern 23CSEAIML083'), // custom regex for admission number
  domain: z.string().min(1, 'Please select a domain'),
  academicYear: z.enum(['1', '2'], {
    required_error: 'Please select an academic year',
  }),
  resume: z
    .any()
    .refine((file) => !file || file instanceof File, 'Please upload a file')
    .optional(),
});

type AdditionalDetailsFormValues = z.infer<typeof additionalDetailsSchema>;

interface Props {
  initialValues?: {
    admissionNumber?: string;
    domain?: string;
    academicYear?: '1' | '2';
    resume?: File;
  };
  onSubmit: (values: AdditionalDetailsFormValues) => void;
  onBack: () => void;
}

export const AdditionalDetails = ({ initialValues, onSubmit, onBack }: Props) => {
  const form = useForm<AdditionalDetailsFormValues>({
    resolver: zodResolver(additionalDetailsSchema),
    defaultValues: {
      admissionNumber: initialValues?.admissionNumber || '',
      domain: initialValues?.domain || '',
      academicYear: initialValues?.academicYear || undefined,
      resume: initialValues?.resume,
    },
  });

  const academicYearOptions = [
    { id: '1', label: '1st Year', value: '1', key: 'year-1' },
    { id: '2', label: '2nd Year', value: '2', key: 'year-2' },
  ];

  const domainOptions = [
    { id: 'app', label: 'App Development', value: 'app', key: 'domain-app' },
    { id: 'ml', label: 'Machine Learning', value: 'ml', key: 'domain-ml' },
    { id: 'programming', label: 'Programming', value: 'programming', key: 'domain-prog' },
    { id: 'design', label: 'UI/UX Design', value: 'design', key: 'domain-design' },
    { id: 'web', label: 'Web Development', value: 'web', key: 'domain-web' },
  ];

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        if (value) {
          form.setValue(key as keyof AdditionalDetailsFormValues, value);
        }
      });
    }
  }, [initialValues, form]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="admissionNumber"
            label="Admission Number"
            placeholder="Enter your admission number"
            isAsterisk
          />

          <OptionsSelect
            name="academicYear"
            label="Academic Year"
            placeholder="Select your academic year"
            isAsterisk
            options={academicYearOptions}
            onSelectionChange={(value) => form.setValue('academicYear', value as '1' | '2')}
          />

          <OptionsSelect
            name="domain"
            label="Domain"
            placeholder="Select your domain"
            isAsterisk
            options={domainOptions}
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

          <div className="space-y-2">
            <Button type="button" onClick={onBack} variant="outline" className="h-11 w-full">
              Back
            </Button>
            <Button type="submit" className="h-11 w-full bg-btn-primary hover:bg-indigo-600">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
