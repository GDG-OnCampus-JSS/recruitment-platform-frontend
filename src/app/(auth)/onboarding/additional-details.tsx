import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { postApi, uploadApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import FormInput from '@/components/common/form-input';
import OptionsSelect from '@/components/common/options-select';
import { Spinner } from '@/components/common/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { statusCode } from '@/constants/apiStatus';
import { academicYearOptions, domainOptions } from '@/constants/registration';
import { useSessionStorage } from '@/hooks/use-session-storage';
import {
  checkIfObjectNotEmpty,
  extractBlobUrlSegment,
  handleToastApiResponse,
} from '@/lib/helpers';
import useUserStore from '@/stores/userStore';

const additionalDetailsSchema = z.object({
  admissionNumber: z
    .string()
    .min(1, 'Admission number is required'),
  year: z
    .string({
      required_error: 'Please select an academic year',
    })
    .min(1, 'Academic year is required'),
  domain: z.string().min(1, 'Please select a domain'),
  resume: z.string().optional(),
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
  const resumeUploadRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploadProgress, setResumeUploadProgress] = useState(0);

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
      year: values.year ? Number(values.year) : undefined,
    };
    const { status, data: responseData } = await postApi(apiEndPoints.users.register, finalData);

    handleToastApiResponse(status, responseData);

    if (status === statusCode.Created201) {
      sessionStorage.removeItem('email');
      router.push('/dashboard');
      setUser(responseData.user);
    }
    setIsSubmitting(false);
  };

  const onPrevClick = (values: AdditionalDetailsFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
    prevStep();
  };

  const handleResumeUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleResumeUpload');
    const file = e.target.files?.[0];
    if (file) {
      const { status, data } = await uploadApi(
        apiEndPoints.upload.uploadResume,
        file,
        'resume',
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          setResumeUploadProgress(percentCompleted);
        },
      );

      form.setValue('resume', extractBlobUrlSegment(data.url) || '');
      setResumeFile(file);

      handleToastApiResponse(status, data);
    }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    form.setValue('resume', '');
    const fileInput = resumeUploadRef.current;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const { handleSubmit } = form;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 leading-[1em] tracking-[0.02em]"
        >
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
            <Label>Resume (Optional)</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => resumeUploadRef.current?.click()}
              className="h-12 w-full"
            >
              <Upload /> Select file
            </Button>
            <input
              title="resume upload"
              type="file"
              id="resume-upload"
              className="hidden"
              onChange={handleResumeUpload}
              ref={resumeUploadRef}
              accept=".pdf"
            />
          </div>
          {resumeFile && (
            <div className="flex flex-col items-center justify-between gap-3 rounded-md border border-gray-200 px-4 py-3">
              <div className="flex w-full items-center justify-between">
                <span className="max-w-[200px] truncate text-sm text-gray-600">
                  {resumeFile.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveResume}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              <Progress value={resumeUploadProgress} className="h-2 w-full" />
            </div>
          )}

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
