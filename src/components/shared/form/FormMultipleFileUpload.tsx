import { Button } from '@/components/ui/button';
import { FieldDescription } from '@/components/ui/field';
import { titles } from '@/constants';
import { fileSizes } from '@/utils/format.validation';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ExistingImage = {
  type: 'existing';
  url: string;
};

type NewImage = {
  type: 'new';
  file: File;
  preview: string;
};

type ImageItem = ExistingImage | NewImage;

type Props = {
  maxCount?: number;
  maxSize?: number;
  initialImages?: string[];
  onChange: (data: { newFiles: File[]; existing: string[] }) => void;
  resetTrigger?: number;
  label?: string;
  description?: string;
};

const FormMultipleFileUpload = ({
  maxCount = 10,
  maxSize = 1,
  initialImages = [],
  onChange,
  resetTrigger,
  label,
  description,
}: Props) => {
  const allowedSize = maxSize * fileSizes().max1mb;
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageItem[]>(
    initialImages.map((url) => ({
      type: 'existing',
      url,
    })),
  );

  // ----------------------------

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => file.size <= allowedSize);

    const remainingSlots = maxCount - images.length;

    const newImages: NewImage[] = validFiles
      .slice(0, remainingSlots)
      .map((file) => ({
        type: 'new',
        file,
        preview: URL.createObjectURL(file),
      }));

    const updated = [...images, ...newImages];

    setImages(updated);
    notifyParent(updated);
  };

  // ----------------------------

  const removeImage = (index: number) => {
    const removed = images[index];

    if (removed?.type === 'new') {
      URL.revokeObjectURL(removed.preview);
    }

    const updated = images.filter((_, i) => i !== index);

    setImages(updated);
    notifyParent(updated);
  };

  // ----------------------------

  const notifyParent = (list: ImageItem[]) => {
    const newFiles = list
      .filter((img): img is NewImage => img.type === 'new')
      .map((img) => img.file);

    const existing = list
      .filter((img): img is ExistingImage => img.type === 'existing')
      .map((img) => img.url);

    onChange({ newFiles, existing });
  };

  // ----------------------------

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.type === 'new') {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, []);

  // ----------------------------

  useEffect(() => {
    setImages(
      initialImages.map((url) => ({
        type: 'existing',
        url,
      })),
    );
  }, [resetTrigger]);

  return (
    <div>
      {images.length < maxCount && (
        <>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleSelect}
            className="hidden"
          />
          <div className="flex gap-2 items-center">
            <Button
              type="button"
              size={'sm'}
              className="rounded-sm"
              onClick={() => inputRef.current?.click()}
            >
              {label}
            </Button>
            <FieldDescription>
              Max. {maxCount} images allowed{' '}
              {images.length > 0 && `(${maxCount - images.length} remains)`}
            </FieldDescription>
          </div>
        </>
      )}

      <div className="grid grid-cols-6 gap-2 mt-4">
        {images.map((img, index) => (
          <div key={index} className="col-span-1 relative">
            <div className="w-36 h-36 border border-muted-foreground/20 p-1">
              <img
                src={
                  img.type === 'existing'
                    ? titles.BASE_URL + img.url
                    : img.preview
                }
                alt=""
                className="w-full h-full max-h-32 object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute top-0 right-0 rounded-full p-1 bg-muted text-destructive cursor-pointer"
              onClick={() => removeImage(index)}
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
        {description && (
          <FieldDescription className="text-destructive text-xs">
            {description}
          </FieldDescription>
        )}
      </div>
    </div>
  );
};
export default FormMultipleFileUpload;
