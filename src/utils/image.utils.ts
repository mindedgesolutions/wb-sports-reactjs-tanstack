import imageCompression from 'browser-image-compression';

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });

export async function getCroppedImg(imageSrc: string, crop: any) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), 'image/jpeg'),
  );
}

// -----------------------------------

const MAX_FILE_SIZE = 1024 * 1024;

export const optimizeImage = async (file: File): Promise<File> => {
  if (file.size <= MAX_FILE_SIZE) {
    return file;
  }

  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.8,
  });

  return new File([compressed], file.name, {
    type: compressed.type,
    lastModified: Date.now(),
  });
};

// -----------------------------------

export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
};
