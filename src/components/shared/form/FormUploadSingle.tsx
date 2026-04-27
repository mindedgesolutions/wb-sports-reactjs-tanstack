import { Button } from '@/components/ui/button';
import { ImageUp } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type Dispatch, type SetStateAction } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';

// Plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// Styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { getCroppedImg } from '@/utils/image.utils';

// Register plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateSize);

const FormUploadSingle = ({
  files,
  setFiles,
  setFormImg,
  maxAllowed,
}: {
  files: any[];
  setFiles: Dispatch<SetStateAction<any[] | []>>;
  setFormImg: (file: File) => void;
  maxAllowed?: number;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [open, setOpen] = useState(false);

  // -------------------------------

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // -------------------------------

  const labelText = `<div class="flex flex-col gap-2 items-center text-xs! text-muted-foreground">
      <span>Click to upload</span>
      <span class="opacity-60">
        PNG or JPG (max ${maxAllowed ? maxAllowed / (1024 * 1024) : 1} MB)
      </span>
    </div>`;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size={'icon-xs'}
            variant={'ghost'}
            className="absolute -right-7 top-0"
          >
            <ImageUp className="size-4 text-muted-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm min-w-sm p-4">
          <DialogHeader>
            <DialogTitle>Upload an image</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-80 overflow-hidden">
            {files.length === 0 ? (
              <FilePond
                className="uploader"
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                allowFileSizeValidation={true}
                maxFileSize={maxAllowed ? `${maxAllowed}MB` : '1MB'}
                labelMaxFileSizeExceeded={`Image must be smaller than ${maxAllowed ? maxAllowed / (1024 * 1024) : 1} MB`}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                labelIdle={labelText}
              />
            ) : (
              <Cropper
                image={URL.createObjectURL(files[0].file)}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                size={'sm'}
                variant="outline"
                onClick={() => setFiles([])}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button size={'sm'} variant="outline" onClick={() => setFiles([])}>
              Clear Image
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={async () => {
                if (!croppedAreaPixels) return;

                const blob = await getCroppedImg(
                  URL.createObjectURL(files[0].file),
                  croppedAreaPixels,
                );

                const croppedFile = new File([blob], 'cropped.jpg', {
                  type: 'image/jpeg',
                });

                setFiles([{ file: croppedFile }]);
                setFormImg(croppedFile);
                setOpen(false);
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default FormUploadSingle;
