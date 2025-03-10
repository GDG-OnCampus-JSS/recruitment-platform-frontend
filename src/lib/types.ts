import { ReactElement } from 'react';
export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
  phone?: string;
  admissionNumber?: string;
  domain?: string;
  year?: string;
  photo?: string;
  resume?: string | null;
  socialLinks?: { platform: string; url: string }[];
  projectStatus?: boolean;
  interviewStatus?: boolean;
  reviewStatus?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: User;
}
export interface LogoutResponse {
  message: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  fetchUserDetails: (id: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}
export interface DropdownOption {
  label: string;
  value: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export interface DropdownProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

export interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType;
  buttonText: string;
  buttonVariant: 'outline' | 'default' | 'destructive';
  iconColor: string;
  buttonBgColor: string;
  gradientBg: string;
  action: string;
}
export interface SocialPlatform {
  platform: string;
  icon: ReactElement;
}

export interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface FormData {
  name: string;
  email: string;
  phone: string;
  admissionNumber: string;
  domain: string;
  year: string;
  photo: string;
  resume: string;
  [key: string]: string;
}
export interface SocialLink {
  id: string;
  name: string;
  link: string;
}
export type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  type: 'recruitment' | 'general' | 'event';
};

export interface SelectOptions {
  id: string | number;
  key?: string | number;
  label?: string | number;
  value?: any;
  disabled?: boolean;
  [key: string]: any;
}
export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: DropdownOption[];
}
export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}
