import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Register | GDG",
  description: "Register to GDG for recruitments 2025."
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
