import { getByIdApi, getByParamsApi, postApi, putApi, deleteApi } from '@/api/api';
import { toast } from 'sonner';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const profileService = {
  async getUserProfile(userId: string) {
    const { status, data } = await getByIdApi('/users', userId);
    if (status === 200) return data['Fetched user'];
    toast.error('Failed to fetch profile');
    return null;
  },

  async updateProfile(userId: string, userData: any) {
    const { status, data } = await putApi(`/users/${userId}`, userData);
    if (status === 200) return data.user;
    toast.error(data?.message || 'Update failed');
    return null;
  },

  async getSocialLinks(userId: string) {
    const { status, data } = await getByParamsApi('/social', { userId });
    return status === 200 ? data : [];
  },

  async createSocialLink(userId: string, name: string, link: string) {
    const { status, data } = await postApi('/social', { userId, name, link });
    if (status === 201) return data.socialLink;
    toast.error('Failed to create link');
    return null;
  },

  async updateSocialLink(linkId: string, link: string) {
    const { status, data } = await putApi(`/social/${linkId}`, { link });
    return status === 200 ? data.updatedLink : null;
  },

  async deleteSocialLink(linkId: string) {
    const { status } = await deleteApi(`/social/${linkId}`);
    return status === 204;
  },
};
