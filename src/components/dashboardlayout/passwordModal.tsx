import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PasswordFormData, PasswordModalProps } from '@/types/types';

const PasswordModal = ({ isOpen, onOpenChange, onSave }: PasswordModalProps) => {
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSave(passwordForm);
    onOpenChange(false);

    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[598px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Change Password</DialogTitle>
            <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => onOpenChange(false)} />
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="font-sans text-[16px] text-sm font-normal leading-[19.41px]">
              Old password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-lg border p-3"
              placeholder="••••••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="font-sans text-[16px] text-sm font-normal leading-[19.41px]">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-lg border p-3"
              placeholder="••••••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="font-sans text-[16px] text-sm font-normal leading-[19.41px]">
              Repeat New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-lg border p-3"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <Button
          onClick={handleSavePassword}
          className="w-full bg-[#635BFF] text-white hover:bg-[#635BFF]/90"
        >
          Save Password
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
