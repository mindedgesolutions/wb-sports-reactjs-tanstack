import { customFetch } from '@/axios/custom.fetch';
import { servicesApp } from '@/constants/api.services';
import type { FairProgramSchema } from '@/schema/services/fair-program.schema';
import { parseDate } from '@/utils/date.utils';
import { chunkArray, optimizeImage } from '@/utils/image.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getFairPrograms = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(
    servicesApp.fairProgrammes.fairProgrammes.list,
    {
      params: { page, search },
      signal,
    },
  );
  return res.data;
};

// ---------------------------------------

export const getFairProgramById = async (id: number, signal: AbortSignal) => {
  const res = await customFetch.get(
    servicesApp.fairProgrammes.fairProgrammes.show(id),
    {
      signal,
    },
  );
  return res.data.data;
};

// ---------------------------------------

const formatFpPayload = async (data: FairProgramSchema, id?: number) => {
  const payload = new FormData();
  const eDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  for (const [key, value] of Object.entries(data)) {
    if (key === 'galleryImg') continue;
    if (!id && key === 'existingGalleryImg') continue;
    if (value == null) continue;

    if (key === 'coverImg' && value instanceof File) {
      const optimizedFile = await optimizeImage(value);
      payload.append(key, optimizedFile);
      continue;
    }

    if (key === 'eventDate' && eDate) {
      payload.append('eventDate', eDate);
      continue;
    }

    if (value !== '' && value !== undefined && value !== null) {
      payload.append(key, String(value));
      continue;
    }
  }
  return payload;
};

// ---------------------------------------

const formatImageChunkPayload = async (files: File[]) => {
  const payload = new FormData();

  for (const file of files) {
    const optimizedFile = await optimizeImage(file);
    payload.append('galleryImg[]', optimizedFile);
  }
  return payload;
};

// ---------------------------------------

export const fairProgrammeCreate = async (data: FairProgramSchema) => {
  const payload = await formatFpPayload(data);

  const res = await customFetch.post(
    servicesApp.fairProgrammes.fairProgrammes.create,
    payload,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// ---------------------------------------

export const uploadGalleryImages = async (
  galleryId: number,
  files: File[],
  onProgress?: (progress: number) => void,
) => {
  const chunks = chunkArray(files, 5);

  for (let i = 0; i < chunks.length; i++) {
    const payload = await formatImageChunkPayload(chunks[i]);

    await customFetch.post(
      servicesApp.fairProgrammes.fairProgrammes.photos(galleryId),
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

// ---------------------------------------

export const fairProgrammeUpdate = async (
  id: number,
  data: FairProgramSchema,
) => {
  const payload = await formatFpPayload(data, id);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    servicesApp.fairProgrammes.fairProgrammes.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};
