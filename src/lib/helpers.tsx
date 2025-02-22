export const checkIfObjectNotEmpty = (obj: any): boolean => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
};
