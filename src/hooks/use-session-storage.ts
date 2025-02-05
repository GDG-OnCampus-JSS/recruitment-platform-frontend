export function useSessionStorage() {
  const setSessionData = (key: string, value: any) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting sessionStorage key:', key, error);
    }
  };

  const getSessionData = (key: string) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading sessionStorage key:', key, error);
      return null;
    }
  };

  const removeSessionData = (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing sessionStorage key:', key, error);
    }
  };

  return { setSessionData, getSessionData, removeSessionData };
}
