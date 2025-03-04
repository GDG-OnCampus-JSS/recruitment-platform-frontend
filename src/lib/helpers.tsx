import { statusCode } from '@/constants/apiStatus';
import { toast } from '@/hooks/use-toast';

export const checkIfObjectNotEmpty = (obj: any): boolean => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
};

export const handleToastApiResponse = (
  status: number,
  responseData: any,
  successMessage = 'Operation successful.',
) => {
  if (
    status === statusCode.Created201 ||
    status === statusCode.Ok200 ||
    status === statusCode.NoContent204 ||
    status === statusCode.Accepted202
  ) {
    toast({
      variant: 'success',
      title: 'Success',
      description: responseData?.message || successMessage,
    });
  } else {
    const errorMessage =
      Array.isArray(responseData?.errors) && responseData.errors.length > 0
        ? responseData.errors[0]
        : responseData?.message || 'Something went wrong. Please try again.';
    toast({
      variant: 'destructive',
      title: 'Error!',
      description: errorMessage,
    });
  }
};
