import axios from 'axios';
import { mockUser } from '@/types/options';

const isDevelopment = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const handleRequest = async (requestFn: () => Promise<any>) => {
  if (isDevelopment) {
    return mockUser;
  }
  try {
    return await requestFn();
  } catch (error) {
    console.log('Error during request:', error);
    return mockUser; // Fallback to mock user if there's an error
  }
};

export const profileService = {
  getUserProfile: (userId: string) =>
    handleRequest(() =>
      api.get(`/users/${userId}`).then((response) => response.data['Fetched user']),
    ),

  updateProfile: (userId: string, userData: any) =>
    handleRequest(() =>
      api.put(`/users/${userId}`, userData).then((response) => response.data.user),
    ),

  getSocialLinks: (userId: string) =>
    handleRequest(() => api.get(`/social/${userId}`).then((response) => response.data)),

  createSocialLink: (userId: string, name: string, link: string) =>
    api.post(`/social/${userId}`, { name, link }).then((response) => response.data.socialLink),

  updateSocialLink: (linkId: string, link: string) =>
    api.put(`/social/${linkId}`, { link }).then((response) => response.data.updatedLink),

  deleteSocialLink: (linkId: string) =>
    api.put(`/social/${linkId}/delete`).catch((error) => {
      console.error('Error deleting social link:', error);
      throw error;
    }),
};
