import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type {
  AssociationSchema,
  StadiumSchema,
} from '@/schema/sports/info-about.schema';

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
    if (value instanceof File && key === 'newImg') {
      formData.append(key, value);
      return;
    }

    if (value !== '' || value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

// -------------------------------

export const associationCreate = async (data: AssociationSchema) => {
  const payload = formatAssociationPayload(data);
  console.log(payload);
  return;

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
  payload.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.infoAbout.associations.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};

// Associations end ------------
