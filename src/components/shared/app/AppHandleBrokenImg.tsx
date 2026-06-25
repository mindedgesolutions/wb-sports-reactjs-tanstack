import { titles } from '@/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type BrokenImgProps = {
  imagePath: string;
  alt?: string;
  className?: string;
  icon: React.ElementType;
  size?: number;
  iconContainerClass?: string;
  iconClass?: string;
};

const AppHandleBrokenImg = ({
  imagePath,
  alt,
  className,
  icon: Icon,
  size,
  iconContainerClass,
  iconClass,
}: BrokenImgProps) => {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);

  const baseUrl = imagePath.includes(`src/assets`) ? '' : titles.BASE_URL;

  const imageUrl = imagePath ? `${baseUrl}${imagePath}` : null;

  const shouldShowImage = imageUrl !== null && failedImageUrl !== imageUrl;

  return shouldShowImage ? (
    <img
      src={imageUrl}
      alt={alt || `Image`}
      className={cn('w-32 h-auto', className)}
      onError={() => setFailedImageUrl(imageUrl)}
    />
  ) : (
    <div className={cn(iconContainerClass)}>
      <Icon size={size || 24} className={iconClass} />
    </div>
  );
};
export default AppHandleBrokenImg;
