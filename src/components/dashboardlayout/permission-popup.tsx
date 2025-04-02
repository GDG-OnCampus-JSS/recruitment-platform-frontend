'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { statusCode } from '@/constants/apiStatus';
import { mockUser } from '@/lib/options';
import { User } from '@/lib/types';
import useUserStore from '@/stores/userStore';
import { ApiRoutes } from '@/api/routes';

const PermissionPopup = ({ onClose }: { onClose: () => void }) => {

  const user = useUserStore((state) => state.user);
  const displayUser = (user || mockUser) as User
  // console.log(" userid",displayUser.id)
  const [isVisible, setIsVisible] = useState(true);  

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("subscribed");
    if (!hasSubscribed) {
      setIsVisible(true);
    }
  }, []);

  const handleAllowNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        await subscribeToNotifications();
      } else {
        console.warn('User denied notifications.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
    setIsVisible(false);
    onClose();
  };

  const subscribeToNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log('User already subscribed:', existingSubscription);
        localStorage.setItem("subscribed", "true"); 
        return;
      }   
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
      });
      console.log('User Subscribed:', displayUser.id, subscription);
      console.log(subscription.endpoint)
      // const { status, data } = await ApiRoutes.subscribeUser(displayUser.id, subscription);
      const { status, data } = await ApiRoutes.subscribeUser(
        {userId: displayUser.id,
        subscription}
      );
      
      console.log(status)

    if (status !== statusCode.Ok200) {
      throw new Error(`Failed to store subscription on server: ${data}`);
    }

    console.log('Subscription saved successfully on server:', data);
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
  }
  };


  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Enable Notifications?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Do you want to receive notifications for updates and important alerts?
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsVisible(false)}>
            No, Thanks
          </Button>
          <Button className='rounded-md bg-[#635BFF] text-base text-white' onClick={handleAllowNotifications}>
            Yes, Enable
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PermissionPopup;
