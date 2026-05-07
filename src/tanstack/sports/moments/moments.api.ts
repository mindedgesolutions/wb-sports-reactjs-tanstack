import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type {
  AmphanPhotosSchema,
  AudioVisualSchema,
  BulletinsSchema,
  PhotoGallerySchema,
} from '@/schema/sports/moments.schema';
import { parseDate } from '@/utils/date.utils';
import { chunkArray, optimizeImage } from '@/utils/image.utils';

type ListProps = {
  search?: string;
  page?: number;
  signal: AbortSignal;
};

// Photo Gallery starts ------------

export const getPhotoGalleries = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(sportsApp.moments.photoGalleries.list, {
    params: { search, page },
    signal,
  });
  return res.data;
};

// -------------------------------

export const getPhotoGallery = async (id: number, signal: AbortSignal) => {
  const res = await customFetch.get(sportsApp.moments.photoGalleries.show(id), {
    signal,
  });
  return res.data.data;
};

// -------------------------------

const formatGalleryPayload = async (data: PhotoGallerySchema, id?: number) => {
  const payload = new FormData();
  const eDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  for (const [key, value] of Object.entries(data)) {
    if (key === 'galleryImg') continue;
    if (!id && key === 'existingGalleryImg') continue;
    if (value == null) continue;

    if (key === 'coverImg' && value instanceof File) {
      payload.append(key, value);
      continue;
    }

    if (key === 'eventDate' && eDate) {
      payload.append('eventDate', eDate);
      continue;
    }

    payload.append(key, String(value));
  }
  return payload;
};

// -------------------------------

const formatImageChunkPayload = async (files: File[]) => {
  const payload = new FormData();

  for (const file of files) {
    const optimizedFile = await optimizeImage(file);
    payload.append('galleryImg[]', optimizedFile);
  }

  return payload;
};

// -------------------------------

export const photoGalleryCreate = async (data: PhotoGallerySchema) => {
  const payload = await formatGalleryPayload(data);

  const res = await customFetch.post(
    sportsApp.moments.photoGalleries.create,
    payload,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

//-------------------------------

export const uploadGalleryImages = async (
  galleryId: number,
  files: File[],
  onProgress?: (progress: number) => void,
) => {
  const chunks = chunkArray(files, 5);

  for (let i = 0; i < chunks.length; i++) {
    const payload = await formatImageChunkPayload(chunks[i]);

    await customFetch.post(
      sportsApp.moments.photoGalleries.upload(galleryId),
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const progress = Math.round(((i + 1) / chunks.length) * 100);
    onProgress?.(progress);
  }
};

// -------------------------------

export const photoGalleryUpdate = async (
  id: number,
  data: PhotoGallerySchema,
) => {
  const payload = await formatGalleryPayload(data, id);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.moments.photoGalleries.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// Photo Gallery ends ------------

// Audio Visual starts ------------

export const getAudioVisuals = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.moments.audioVisuals.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

const formatAudioVisualPayload = (data: AudioVisualSchema) => {
  const payload = {} as any;

  Object.entries(data).forEach(([key, value]) => {
    payload[key] = String(value);
  });
  return payload;
};

// -------------------------------

export const audioVisualCreate = async (data: AudioVisualSchema) => {
  const payload = formatAudioVisualPayload(data);

  const res = await customFetch.post(
    sportsApp.moments.audioVisuals.create,
    payload,
  );
  return res.data;
};

// -------------------------------

export const audioVisualUpdate = async (
  id: number,
  data: AudioVisualSchema,
) => {
  const payload = formatAudioVisualPayload(data);

  const res = await customFetch.put(
    sportsApp.moments.audioVisuals.update(id),
    payload,
  );
  return res.data;
};

// Audio Visual ends ------------

// Bulletins starts ------------

export const getBulletins = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.moments.bulletins.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

const formatBulletinPayload = (data: BulletinsSchema) => {
  const eventDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'eventDate' && eventDate) {
      payload.append('eventDate', eventDate);
      return;
    }

    if (key === 'newFile' && value instanceof File) {
      payload.append('newFile', value);
      return;
    }

    if (value != null && value !== '') {
      payload.append(key, String(value));
    }
  });
  return payload;
};

// -------------------------------

export const bulletinCreate = async (data: BulletinsSchema) => {
  const payload = formatBulletinPayload(data);

  const res = await customFetch.post(
    sportsApp.moments.bulletins.create,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -------------------------------

export const bulletinUpdate = async (id: number, data: BulletinsSchema) => {
  const payload = formatBulletinPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.moments.bulletins.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// Bulletins ends ------------

// Amphan Photos starts ------------

export const getAmphanPhotos = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.moments.amphanPhotos.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

const formatAmphanPhotoPayload = (data: AmphanPhotosSchema) => {
  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'newImage' && value instanceof File) {
      payload.append('newImage', value);
      return;
    }

    if (value != null && value !== '') {
      payload.append(key, String(value));
    }
  });
  return payload;
};

// -------------------------------

export const amphanPhotoCreate = async (data: AmphanPhotosSchema) => {
  const payload = formatAmphanPhotoPayload(data);

  const res = await customFetch.post(
    sportsApp.moments.amphanPhotos.create,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -------------------------------

export const amphanPhotoUpdate = async (
  id: number,
  data: AmphanPhotosSchema,
) => {
  const payload = formatAmphanPhotoPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.moments.amphanPhotos.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// Amphan Photos ends ------------
