import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import FormInput from '@/components/common/form-input';
import OptionsSelect from '@/components/common/options-select';
import { Spinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { statusCode } from '@/constants/apiStatus';
import { academicYearOptions, domainOptions } from '@/constants/registration';
import { useSessionStorage } from '@/hooks/use-session-storage';
import { checkIfObjectNotEmpty, handleToastApiResponse } from '@/lib/helpers';
import useUserStore from '@/stores/userStore';

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
  prevStep: () => void;
}

export const AdditionalDetails = ({ formData, setFormData, prevStep }: Props) => {
  const { getSessionData } = useSessionStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();

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

  const onSubmit = async (values: AdditionalDetailsFormValues) => {
    setIsSubmitting(true);

    const updatedFormData = { ...formData, ...values };
    setFormData(updatedFormData);

    const finalData = {
      ...updatedFormData,
      email: getSessionData('email'),
      year: updatedFormData.year ? Number(formData.year) : undefined,
    };
    const { status, data: responseData } = await postApi(apiEndPoints.users.register, finalData);

    handleToastApiResponse(status, responseData);

    if (status === statusCode.Created201) {
      setUser(responseData.user);
      sessionStorage.removeItem('email');
      router.push('/dashboard');
    }
    setIsSubmitting(false);
  };

  const onPrevClick = (values: AdditionalDetailsFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
    prevStep();
  };

  const { handleSubmit } = form;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 tracking-[0.02em] leading-[1em]">
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
