import { avataaarsNeutral, botttsNeutral, bigEarsNeutral, funEmoji } from '@dicebear/collection';
import { createAvatar, Options } from '@dicebear/core';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: 'avataaarsNeutral' | 'botttsNeutral' | 'bigEarsNeutral' | 'funEmoji';
  options?: Partial<Options>;
}

export default function GeneratedAvatar({
  seed,
  className,
  variant,
  options,
}: GeneratedAvatarProps) {
  const baseOptions = { ...options, seed };
  const avatarDataUri = useMemo(() => {
  let avatar;

  if (variant === 'avataaarsNeutral') {
    avatar = createAvatar(avataaarsNeutral, baseOptions);
  } else if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, baseOptions);
  } else if (variant === 'bigEarsNeutral') {
    avatar = createAvatar(bigEarsNeutral, baseOptions);
  } else {
    avatar = createAvatar(funEmoji, baseOptions);
  }

  return avatar.toDataUri();
}, [seed, variant, options]);

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatarDataUri} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
