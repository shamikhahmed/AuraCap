import { useState } from 'react';
import { getAppIconUrl } from '@/lib/appIcons';
import { cn } from '@/lib/utils';

interface AppIconProps {
  name: string;
  emoji: string;
  size?: number;
  className?: string;
}

export function AppIcon({ name, emoji, size = 16, className }: AppIconProps) {
  const iconUrl = getAppIconUrl(name);
  const [failed, setFailed] = useState(false);

  if (!iconUrl || failed) {
    return <span className={cn('shrink-0 leading-none', className)} style={{ fontSize: size }}>{emoji}</span>;
  }

  return (
    <img
      src={iconUrl}
      alt=""
      width={size}
      height={size}
      className={cn('shrink-0 rounded-[22%] object-cover', className)}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
