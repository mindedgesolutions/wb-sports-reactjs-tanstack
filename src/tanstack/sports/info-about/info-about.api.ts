import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type {
  AssociationSchema,
  AssocSiteSchema,
  FifaGallerySchema,
  SportsPolicySchema,
  StadiumSchema,
} from '@/schema/sports/info-about.schema';
import { parseDate } from '@/utils/date.utils';
import { chunkArray, optimizeImage } from '@/utils/image.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

// Stadiums start ------------

export const getStadiums = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.infoAbout.stadiums.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

const formatStadiumPayload = (data: StadiumSchema) => {
  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'newGalleryImg') {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((file) => {
          if (file instanceof File) {
            payload.append('newGalleryImg[]', file);
          }
        });
      }
      return;
    }

    if (value instanceof File && key === 'coverImg') {
      payload.append('coverImg', value);
      return;
    }

    if (key === 'highlights') {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (
            typeof item === 'object' &&
            item !== null &&
            'value' in item &&
            typeof item.value === 'string' &&
            item.value.trim() !== ''
          ) {
            payload.append(`highlights[${index}][value]`, item.value);
          }
        });
      }
      return;
    }

    if (value == undefined || value === null) {
      return;
    }

    payload.append(key, String(value));
  });
  return payload;
};

// -------------------------------

export const stadiumCreate = async (data: StadiumSchema) => {
  const payload = formatStadiumPayload(data);

  const res = await customFetch.post(
    sportsApp.infoAbout.stadiums.create,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -------------------------------

export const stadiumUpdate = async (data: StadiumSchema, id: number) => {
  const payload = formatStadiumPayload(data);
  payload?.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.infoAbout.stadiums.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -------------------------------

export const fetchStadium = async (id: number, signal: AbortSignal) => {
  const res = await customFetch.get(sportsApp.infoAbout.stadiums.show(id), {
    signal,
  });
  return res.data.data;
};

// Stadiums end ------------

// Associations start ------------

export const getAssociations = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.infoAbout.associations.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

const formatAssociationPayload = (data: AssociationSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'newImg' && value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (value !== '' && value != null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

// -------------------------------

export const associationCreate = async (data: AssociationSchema) => {
  const payload = formatAssociationPayload(data);

  const res = await customFetch.post(
    sportsApp.infoAbout.associations.create,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -------------------------------

export const associationUpdate = async (
  data: AssociationSchema,
  id: number,
) => {
  const payload = formatAssociationPayload(data);
  payload?.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.infoAbout.associations.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// Associations end ------------

// FIFA starts ------------

export const getFifaGallery = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.infoAbout.fifa.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

export const fetchFifaGallery = async (id: number, signal: AbortSignal) => {
  const res = await customFetch.get(sportsApp.infoAbout.fifa.show(id), {
    signal,
  });
  return res.data.data;
};

// -------------------------------

const formatFifaGalleryPayload = async (
  data: FifaGallerySchema,
  id?: number,
) => {
  const payload = new FormData();
  const eDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  for (const [key, value] of Object.entries(data)) {
    if (key === 'newGalleryImg') continue;
    if (!id && key === 'existingGalleryImg') continue;
    if (value == null) continue;

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
    payload.append('newGalleryImg[]', optimizedFile);
  }

  return payload;
};

// -------------------------------

export const fifaGalleryCreate = async (data: FifaGallerySchema) => {
  const payload = await formatFifaGalleryPayload(data);

  const res = await customFetch.post(sportsApp.infoAbout.fifa.create, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// -------------------------------

export const uploadGalleryImages = async (
  galleryId: number,
  files: File[],
  onProgress?: (progress: number) => void,
) => {
  const chunks = chunkArray(files, 5);

  for (let i = 0; i < chunks.length; i++) {
    const payload = await formatImageChunkPayload(chunks[i]);

    await customFetch.post(
      sportsApp.infoAbout.fifa.upload(galleryId),
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

export const fifaGalleryUpdate = async (
  id: number,
  data: FifaGallerySchema,
) => {
  const payload = await formatFifaGalleryPayload(data, id);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.infoAbout.fifa.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// FIFA ends ------------

// Sports Policies start ------------

export const getSportsPolicies = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(sportsApp.infoAbout.sportsPolicies.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

const formatSportsPolicyPayload = (data: SportsPolicySchema) => {
  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'newFile' && value instanceof File) {
      payload.append('newFile', value);
      return;
    }
    if (value !== '' && value !== undefined) {
      payload.append(key, String(value));
    }
  });
  return payload;
};

// -------------------------------

export const sportsPolicyCreate = async (data: SportsPolicySchema) => {
  const payload = formatSportsPolicyPayload(data);

  const res = await customFetch.post(
    sportsApp.infoAbout.sportsPolicies.create,
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// -------------------------------

export const sportsPolicyUpdate = async (
  data: SportsPolicySchema,
  id: number,
) => {
  const payload = formatSportsPolicyPayload(data);
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.infoAbout.sportsPolicies.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// Sports Policies end ------------

// Associated Websites start ------------

export const getAssocSites = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.infoAbout.assocSites.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

export const assocSiteCreate = async (data: AssocSiteSchema) => {
  const res = await customFetch.post(
    sportsApp.infoAbout.assocSites.create,
    data,
  );
  return res.data;
};

// -------------------------------

export const assocSiteUpdate = async (data: AssocSiteSchema, id: number) => {
  const res = await customFetch.put(
    sportsApp.infoAbout.assocSites.update(id),
    data,
  );
  return res.data;
};

// Associated Websites end ------------
