import { statusCode } from '@/constants/apiStatus';
import { toast } from '@/hooks/use-toast';

export const checkIfObjectNotEmpty = (obj: any): boolean => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
};

export const blobUrl = (imagePath: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
  const signedUrl = process.env.NEXT_PUBLIC_BLOB_SIGNED_URL;
  return `${baseUrl}${imagePath}${signedUrl}`;
};

export const extractBlobUrlSegment = (url: string) => {
  const parts = url.split('windows.net/');
  if (parts.length < 2) return null;
  return parts[1].split('?sv=')[0];
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
