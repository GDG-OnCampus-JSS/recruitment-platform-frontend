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
import { academicYearOptions, domainOptions } from '@/constants/registration';
import { checkIfObjectNotEmpty } from '@/lib/helpers';
import { Spinner } from '@/components/common/spinner';

const additionalDetailsSchema = z.object({
  admissionNumber: z
    .string()
    .min(1, 'Admission number is required')
    .regex(/^\d{2}[A-Za-z]{2,7}\d{1,3}$/, 'Admission number must follow the pattern XX[AA]XXX'),
  year: z
    .string({
      required_error: 'Please select an academic year',
    })
    .min(1, 'Academic year is required'),
  domain: z.string().min(1, 'Please select a domain'),
  resume: z
    .any()
    .refine((file) => !file || file instanceof File, 'Please upload a file')
    .optional(),
});

type AdditionalDetailsFormValues = z.infer<typeof additionalDetailsSchema>;

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting?: boolean;
}

export const AdditionalDetails = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  isSubmitting,
}: Props) => {
  const form = useForm<AdditionalDetailsFormValues>({
    resolver: zodResolver(additionalDetailsSchema),
    defaultValues: checkIfObjectNotEmpty(formData)
      ? {
          ...formData,
          admissionNumber: formData?.admissionNumber ?? '',
          domain: formData?.domain ?? '',
          year: formData?.year ?? '',
          resume: formData?.resume ?? '',
        }
      : {
          admissionNumber: '',
          domain: '',
          year: '',
          resume: null,
        },
  });

  const onSubmit = (values: AdditionalDetailsFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
    nextStep();
  };

  const onPrevClick = (values: AdditionalDetailsFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
    prevStep();
  };

  const { reset, handleSubmit } = form;

  useEffect(() => {
    reset({ ...formData });
  }, [formData, reset]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="admissionNumber"
            label="Admission Number"
            placeholder="Enter your admission number"
            isAsterisk
          />

          <OptionsSelect
            name="year"
            label="Academic Year"
            placeholder="Select your academic year"
            isAsterisk
            options={academicYearOptions}
          />

          <OptionsSelect
            name="domain"
            label="Domain"
            placeholder="Select your domain"
            isAsterisk
            options={domainOptions}
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
                  setFormData((prev: any) => ({ ...prev, resume: file }));
                  form.setValue('resume', file);
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              onClick={() => onPrevClick(form.getValues())}
              variant="outline"
              className="h-11 w-full"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="h-11 w-full bg-btn-primary hover:bg-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="text-white" />
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
