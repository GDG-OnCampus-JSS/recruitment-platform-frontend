import { toast } from 'sonner';
import { ApiRoutes } from '@/api/routes';

export const profileService = {
  async getUserProfile(userId: string) {
    const { status, data } = await ApiRoutes.getUserById(userId);
    if (status === 200) return data['Fetched user'];
    toast.error('Failed to fetch profile');
    return null;
  },

  async updateProfile(userId: string, formData: FormData) {
    const { status, data } = await ApiRoutes.updateUser(userId, formData);
    if (status === 200) return data;
    toast.error(data?.message || 'Update failed');
    return null;
  },

  async getSocialLinks(userId: string) {
    const { status, data } = await ApiRoutes.getAllSocialLinks(userId);
    return status === 200 ? data : [];
  },

  async createSocialLink(userId: string, platform: string, newLink: string) {
    const { status, data } = await ApiRoutes.createSocialLink(userId, {
      name: platform,
      link: newLink,
    });
    if (status === 201) return data.socialLink;
    toast.error('Failed to create link');
    return null;
  },

  async updateSocialLink(linkId: string, link: string) {
    const { status, data } = await ApiRoutes.updateSocialLink(linkId, { link });
    return status === 200 ? data : null;
  },

  async deleteSocialLink(linkId: string) {
    const { status } = await ApiRoutes.deleteSocialLink(linkId);
    return status === 204;
  },
};
