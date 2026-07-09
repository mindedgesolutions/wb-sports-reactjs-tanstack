import type { IGalleryImage } from '@/interface/services.interface';
import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar';
import { titles } from '@/constants';

const AppAvatarMultiple = ({
  images,
  imgCount,
}: {
  images: IGalleryImage[];
  imgCount: number;
}) => {
  if (images.length === 0) {
    return 'N/A';
  }

  return (
    <AvatarGroup>
      {images.map((img: IGalleryImage) => (
        <Avatar key={img.image_path}>
          <AvatarImage
            src={`${titles.BASE_URL}${img.image_path}`}
            alt={img.image_path}
          />
        </Avatar>
      ))}
      {imgCount > 3 && (
        <AvatarGroupCount className="text-xs">+{imgCount - 3}</AvatarGroupCount>
      )}
    </AvatarGroup>
  );
};
export default AppAvatarMultiple;
