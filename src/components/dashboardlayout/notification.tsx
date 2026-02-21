import { zodResolver } from '@hookform/resolvers/zod';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getApi, postApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import FormInput from '@/components/common/form-input';
import FormTextArea from '@/components/common/form-textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { statusCode } from '@/constants/apiStatus';
import { useDismissOnClick } from '@/hooks/use-dismiss-onclick';
import { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';
import useUserStore from '@/stores/userStore';

type Props = {
  mode: 'admin' | 'user';
  className?: string;
};

const notificationSchema = z.object({
  notificationTitle: z.string().nonempty('Please enter a valid title'),
  notificationMessage: z.string().nonempty('Please enter a message'),
  notificationUrl: z.string().optional(),
});

const NotificationButton = ({ mode, className }: Props) => {
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      notificationTitle: '',
      notificationMessage: '',
      notificationUrl: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof notificationSchema>) => {
    // console.log('Sending payload:', {
    //   title: data.notificationTitle,
    //   message: data.notificationMessage,
    //   url: data.notificationUrl,
    //   userId: user?.id,
    // });

    const { status, data: responseData } = await postApi(apiEndPoints.admin.sendNotifications, {
      title: data.notificationTitle,
      message: data.notificationMessage,
      url: data.notificationUrl,
    });

    if (status === statusCode.Ok200) {
      alert('Notification sent successfully!');
      setIsAdminOpen(false);
    } else {
      console.error('Failed to send notification');
    }
  };

  const fetchNotifications = useCallback(async () => {
    if (mode === 'user') {
      const { status, data } = await getApi(apiEndPoints.notification.getNotifications);
      if (status === statusCode.Ok200) {
        setNotifications(data);
      }
    }
  }, [mode]);

  const fetchSubscription = async () => {
    setIsAdminOpen(!isAdminOpen);
    const { status, data } = await getApi(apiEndPoints.notification.getSubscription);
    // console.log('subscriptions: ', data);
  };
  useEffect(() => {
    if (mode === 'user' && user?.id) {
      fetchNotifications();
    }
  }, [user?.id, mode, fetchNotifications]);

  // const unreadCount = notifications.filter((n) => !n.isRead).length;

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

  const handleNotificationClick = async (notificationId: string) => {
    // const { status } = await putApi(apiEndPoints.notification.markAsRead(notificationId)
    //   ,
    // );
    // if (status === statusCode.Ok200) {
    //   setNotifications((prev) =>
    //     prev.map((notification) =>
    //       notification.id === notificationId ? { ...notification, isRead: true } : notification,
    //     ),
    //   );
    //   setIsOpen(false);
    // } else {
    //   console.error('Failed to mark notification as read');
    // }
  };

  const notificationModalRef = useRef<HTMLDivElement | null>(null);
  useDismissOnClick(notificationModalRef, () => setIsOpen(false));

  return (
    <div className={cn('relative', className)}>
      {mode === 'admin' ? (
        <Button
          variant="ghost"
          className="relative ml-20 w-[160px] rounded-[16px] border border-[#DDE3FF] bg-[#FFFFFF] py-5 sm:ml-0"
          onClick={fetchSubscription}
        >
          {/* onClick={handleSendNotification} */}
          <Bell className="h-5 w-5 text-[#100C2C]" />
          Notify All Users
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="relative ml-20 size-12 rounded-[37px] border border-[#DDE3FF] bg-transparent p-[8px] shadow-inner backdrop-blur-lg sm:ml-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bell className="h-5 w-5 text-[#100C2C]" />
          {unreadCount > 0 && (
            <span className="absolute right-0 top-1 size-3 rounded-full bg-red-500" />
          )}
        </Button>
      )}

      {mode === 'admin' && isAdminOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsAdminOpen(false)} />
          <Card className="absolute right-0 top-12 z-50 h-[417px] w-[82vw] gap-2 overflow-hidden rounded-[8px] border border-[#DDE3FF] bg-[#FFFFFF] p-4 shadow-lg sm:w-[455px]">
            <div className="w-full p-3">
              <h1 className="mb-4 text-2xl font-bold">Notify All Users </h1>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid justify-center space-y-4"
                >
                  <FormInput
                    name="notificationTitle"
                    placeholder="Enter the title"
                    className="w-[100%]"
                    isAsterisk
                  />

                  <FormTextArea
                    name="notificationMessage"
                    placeholder="Type Something..."
                    className="w-[100%] lg:h-[120px]"
                    isAsterisk
                  />

                  <FormInput
                    name="notificationUrl"
                    placeholder="Enter the url"
                    className="w-[100%]"
                  />

                  <div className="flex gap-5">
                    <Button
                      type="button"
                      className="w-40 rounded-md bg-white px-5 py-3 text-base text-red-500"
                      onClick={() => setIsAdminOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-40 rounded-md bg-[#635BFF] px-5 py-3 text-base text-white"
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </Card>
        </>
      )}

      {mode === 'user' && isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card
            className="absolute right-0 top-14 z-50 h-[417px] w-[82vw] gap-2 overflow-hidden rounded-[8px] border border-[#DDE3FF] bg-[#FFFFFF] p-4 shadow-lg sm:w-[455px]"
            ref={notificationModalRef}
          >
            <div className="w-full p-3">
              <h3 className="text-sm font-normal text-[#100C2C]">Notifications</h3>
            </div>
            <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto pb-20 pt-5">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 rounded-lg p-4 shadow hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="size-10 flex-shrink-0">
                      <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={32}
                        width={32}
                        className="h-full w-full rounded-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                        {notification.title}
                      </h1>
                      <p className="text-sm text-neutral-500">{notification.message}</p>
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
