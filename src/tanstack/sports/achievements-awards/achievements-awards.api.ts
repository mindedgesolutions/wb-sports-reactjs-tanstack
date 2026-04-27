import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type {
  AwardsSchema,
  PlayersAchievementsSchema,
} from '@/schema/sports/achievements-awards.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

export const getPlayersAchievements = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(
    sportsApp.achievementsAwards.playersAchievements.list,
    { params: { page, search }, signal },
  );
  return res.data;
};

// -------------------------------

const formatPlayersAchievementPayload = (data: PlayersAchievementsSchema) => {
  const achDate =
    data.achievementDate instanceof Date
      ? parseDate(data.achievementDate)
      : null;
  const formData = {} as any;

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'achievementDate' && achDate) {
      formData[key] = achDate;
    } else {
      formData[key] = String(value);
    }
  });
  return formData;
};

// -------------------------------

export const playersAchievementsCreate = async (
  data: PlayersAchievementsSchema,
) => {
  const payload = formatPlayersAchievementPayload(data);

  const res = await customFetch.post(
    sportsApp.achievementsAwards.playersAchievements.create,
    payload,
  );
  return res.data;
};

// -------------------------------

export const playersAchievementsUpdate = async (id: number, data: any) => {
  const payload = formatPlayersAchievementPayload(data);

  const res = await customFetch.put(
    sportsApp.achievementsAwards.playersAchievements.update(id),
    payload,
  );
  return res.data;
};

// Awards start -------------------------------

export const getAwards = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.achievementsAwards.awards.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -------------------------------

const formatAwardPayload = (data: AwardsSchema) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
};

// -------------------------------

export const awardsCreate = async (data: any) => {
  const payload = formatAwardPayload(data);

  const res = await customFetch.post(
    sportsApp.achievementsAwards.awards.create,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

// -------------------------------

export const awardsUpdate = async (id: number, data: any) => {
  const payload = formatAwardPayload(data);
  payload.append('_method', 'put');

  const res = await customFetch.post(
    sportsApp.achievementsAwards.awards.update(id),
    payload,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data;
};
