import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Notification } from '@/types/types';

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message:
        'Congratulations! You are shortlisted for interview. Visit dashboard for more information',
      isRead: false,
      type: 'recruitment',
    },
    {
      id: '2',
      message:
        'Congratulations! You are shortlisted for interview. Visit dashboard for more information',
      isRead: false,
      type: 'recruitment',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative h-[36px] w-[36px] rounded-[37px] border border-[#DDE3FF] bg-[#FFFFFF] p-[8px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-12 z-50 h-[417px] w-[455px] gap-2 overflow-hidden rounded-[8px] border border-[#DDE3FF] bg-[#FFFFFF] p-4 shadow-lg">
            <div className="w-[423px] p-3">
              <h3 className="text-sm font-normal text-[#100C2C]">Notification</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex h-[82px] items-start gap-3 p-4 hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="h-8 w-8 flex-shrink-0">
                      <img
                        src="/logo.jpeg"
                        alt="GDG Logo"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default NotificationButton;
