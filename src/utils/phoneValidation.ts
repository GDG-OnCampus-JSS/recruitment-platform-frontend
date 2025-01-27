import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function validatePhoneNumber(phone: string): boolean {
  const phoneNumber = parsePhoneNumberFromString(phone, 'IN');
  return phoneNumber ? phoneNumber.isValid() : false;
}
