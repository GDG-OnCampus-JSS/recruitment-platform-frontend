import React, { useState, useEffect } from 'react';

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface EventCountdownProps {
  eventStart: Date;
  eventEnd: Date;
}

const calculateTimeLeft = (target: Date): TimeLeft => {
  const total = target.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
};

const EventCountdown: React.FC<EventCountdownProps> = ({ eventStart, eventEnd }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const now = new Date();
    if (now < eventStart) {
      return calculateTimeLeft(eventStart);
    } else if (now < eventEnd) {
      return calculateTimeLeft(eventEnd);
    }
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now < eventStart) {
        const newTimeLeft = calculateTimeLeft(eventStart);
        setTimeLeft(newTimeLeft);
        if (newTimeLeft.total <= 0) clearInterval(timer);
      } else if (now < eventEnd) {
        const newTimeLeft = calculateTimeLeft(eventEnd);
        setTimeLeft(newTimeLeft);
        if (newTimeLeft.total <= 0) clearInterval(timer);
      } else {
        // Event has ended
        setTimeLeft({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventStart, eventEnd]);

  const now = new Date();
  let prefix = '';

  if (now < eventStart) {
    prefix = 'Starts in ';
  } else if (now < eventEnd) {
    prefix = 'Ends in ';
  } else {
    return <div className='text-red-400 text-sm'>Event Ended</div>;
  }

  // Format the remaining time.
  const formattedParts = [];
  if (timeLeft.days > 0) {
    formattedParts.push(`${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''}`);
  }
  if (timeLeft.hours > 0 || formattedParts.length > 0) {
    formattedParts.push(`${timeLeft.hours} hr${timeLeft.hours !== 1 ? 's' : ''}`);
  }
  formattedParts.push(`${timeLeft.minutes} min${timeLeft.minutes !== 1 ? 's' : ''}`);

  return (
    <div className='text-sm w-full text-center sm:text-start'>
      {prefix}
      {formattedParts.join(' ')}
    </div>
  );
};

export default EventCountdown;
