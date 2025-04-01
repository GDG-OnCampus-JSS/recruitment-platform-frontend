import { Bell } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDismissOnClick } from '@/hooks/use-dismiss-onclick';
import { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const NotificationButton = ({ className }: Props) => {
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

  const notificationModalRef = useRef<HTMLDivElement | null>(null);
  useDismissOnClick(notificationModalRef, () => setIsOpen(false));

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="ghost"
        className="relative ml-20 h-[36px] w-[36px] rounded-[37px] border border-[#DDE3FF] bg-[#FFFFFF] p-[8px] sm:ml-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5 text-[#100C2C]" />
        {unreadCount && (
          <span className="absolute right-[1px] top-[1px] h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card
            className="absolute right-0 top-12 z-50 h-[417px] w-[82vw] gap-2 overflow-hidden rounded-[8px] border border-[#DDE3FF] bg-[#FFFFFF] p-4 shadow-lg sm:w-[455px]"
            ref={notificationModalRef}
          >
            <div className="w-full p-3">
              <h3 className="text-sm font-normal text-[#100C2C]">Notification</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex min-h-[82px] items-start gap-3 p-4 hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="h-5 w-5 flex-shrink-0 sm:h-8 sm:w-8">
                      <Image
                        src="/logo.svg"
                        alt="GDG Logo"
                        height={32}
                        width={32}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`sm:text:sm break-words text-xs ${!notification.isRead ? 'font-medium' : ''}`}
                      >
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
