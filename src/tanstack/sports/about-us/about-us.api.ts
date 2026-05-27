import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';
import { sportsApp } from '@/constants/api.sports';
import { sportsWeb } from '@/constants/api.sports.website';
import type {
  AchievementSchema,
  AdminStructureSchema,
  KeyPersonnelSchema,
} from '@/schema/sports/about-us.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

// Admin structure starts ----------

export const getAdminStructure = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(sportsApp.aboutUs.adminStructure.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

export const getAdminStructureAll = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  const res = await customFetch.get(sportsApp.aboutUs.adminStructure.all, {
    signal,
  });
  return res.data;
};

// -----------------------------

export const getAdminStructureAllWb = async (signal: AbortSignal) => {
  const res = await simpleFetch.get(sportsWeb.aboutUs.adminStructute, {
    signal,
  });
  return res.data.data;
};

// -----------------------------

export const adminStructureCreate = async (data: AdminStructureSchema) => {
  const res = await customFetch.post(
    sportsApp.aboutUs.adminStructure.create,
    data,
  );
  return res.data;
};

// -----------------------------

export const adminStructureUpdate = async (
  id: number,
  data: AdminStructureSchema,
) => {
  const res = await customFetch.put(
    sportsApp.aboutUs.adminStructure.update(id),
    data,
  );
  return res.data;
};

// Admin structure ends ----------

// Key personnel starts ----------

export const getKeyPersonnel = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.aboutUs.keyPersonnel.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

export const getKeyPersonnelWb = async (signal: AbortSignal) => {
  const res = await simpleFetch.get(sportsWeb.aboutUs.keyPersonnel, { signal });
  return res.data.data;
};

// -----------------------------

export const getKeyPersonnelAll = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  const res = await customFetch.get(sportsApp.aboutUs.keyPersonnel.all, {
    signal,
  });
  return res.data;
};

// -----------------------------

const formatKeyPersonnelPayload = (data: KeyPersonnelSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (value !== '' && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
};

export const keyPersonnelCreate = async (data: KeyPersonnelSchema) => {
  const formData = formatKeyPersonnelPayload(data);

  const res = await customFetch.post(
    sportsApp.aboutUs.keyPersonnel.create,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// -----------------------------

export const keyPersonnelUpdate = async (
  id: number,
  data: KeyPersonnelSchema,
) => {
  const formData = formatKeyPersonnelPayload(data);

  const res = await customFetch.post(
    sportsApp.aboutUs.keyPersonnel.update(id),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};

// Key personnel ends ----------

// Achievements starts ----------

export const getAchievements = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.aboutUs.achievements.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

export const getAchievementsWb = async ({
  signal,
  page,
}: {
  signal: AbortSignal;
  page: number;
}) => {
  const res = await simpleFetch.get(sportsWeb.aboutUs.achievements, {
    params: { page },
    signal,
  });
  return res.data.data;
};

// -----------------------------

const formatAchievementPayload = (data: AchievementSchema) => {
  const achDate =
    data.achievementDate instanceof Date
      ? parseDate(data.achievementDate)
      : null;

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'achievementDate' && achDate) {
      formData.append(key, achDate);
      return;
    }

    if (value !== '' && value !== null && value !== undefined) {
      formData.append(key, value as string);
    }
  });
  return formData;
};

// -----------------------------

export const achievementsCreate = async (data: AchievementSchema) => {
  const formData = formatAchievementPayload(data);

  const res = await customFetch.post(
    sportsApp.aboutUs.achievements.create,
    formData,
  );
  return res.data;
};

// -----------------------------

export const achievementsUpdate = async (
  id: number,
  data: AchievementSchema,
) => {
  const formData = formatAchievementPayload(data);
  formData.append('_method', 'PUT');

  const res = await customFetch.post(
    sportsApp.aboutUs.achievements.update(id),
    formData,
  );
  return res.data;
};
