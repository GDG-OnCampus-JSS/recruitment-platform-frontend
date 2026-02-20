import { Metadata } from 'next';
import Link from 'next/link';
import { isRegistrationDisabled } from '@/constants/registration';

export const metadata: Metadata = {
  title: 'Register | GDG',
  description: 'Register to GDG for recruitments 2025.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  if (isRegistrationDisabled) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <p>Registrations are closed.</p>
        <Link href="/" className="text-blue-500 underline">
          Go to home
        </Link>
      </div>
    );
  }

  return children;
}
