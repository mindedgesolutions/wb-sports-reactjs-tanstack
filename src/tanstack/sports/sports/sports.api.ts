import { customFetch } from '@/axios/custom.fetch';
import { sportsApp } from '@/constants/api.sports';
import type {
  SportsEventsSchema,
  SportsPersonnelSchema,
} from '@/schema/sports/sports.schema';
import { parseDate } from '@/utils/date.utils';

type ListProps = {
  page?: number;
  search?: string;
  signal: AbortSignal;
};

// Sports personnel starts ----------

export const getSportsPersonnel = async ({
  page,
  search,
  signal,
}: ListProps) => {
  const res = await customFetch.get(sportsApp.sports.sportsPersonnel.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

const formatSportsPersonnelPayload = (data: SportsPersonnelSchema) => {
  const dob = data.dob instanceof Date ? parseDate(data.dob) : null;

  const payload: any = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'dob') {
      payload[key] = dob;
    } else {
      payload[key] = value;
    }
  });
  return payload;
};

// -----------------------------

export const sportsPersonnelCreate = async (data: SportsPersonnelSchema) => {
  const formData = formatSportsPersonnelPayload(data);

  const res = await customFetch.post(
    sportsApp.sports.sportsPersonnel.create,
    formData,
  );
  return res.data;
};

// -----------------------------

export const sportsPersonnelUpdate = async (
  id: number,
  data: SportsPersonnelSchema,
) => {
  const formData = formatSportsPersonnelPayload(data);

  const res = await customFetch.put(
    sportsApp.sports.sportsPersonnel.update(id),
    formData,
  );
  return res.data;
};

// Sports personnel ends ----------

// Sports events starts ----------

export const getSportsEvents = async ({ page, search, signal }: ListProps) => {
  const res = await customFetch.get(sportsApp.sports.sportsEvents.list, {
    params: { page, search },
    signal,
  });
  return res.data;
};

// -----------------------------

const formatSportsEventPayload = (data: SportsEventsSchema) => {
  const eventDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  const payload: any = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'eventDate') {
      payload[key] = eventDate;
    } else {
      payload[key] = value;
    }
  });
  return payload;
};

// -----------------------------

export const sportsEventsCreate = async (data: SportsEventsSchema) => {
  const payload = formatSportsEventPayload(data);

  const res = await customFetch.post(
    sportsApp.sports.sportsEvents.create,
    payload,
  );
  return res.data;
};

// -----------------------------

export const sportsEventsUpdate = async (
  id: number,
  data: SportsEventsSchema,
) => {
  const payload = formatSportsEventPayload(data);

  const res = await customFetch.put(
    sportsApp.sports.sportsEvents.update(id),
    payload,
  );
  return res.data;
};

// Sports events ends ----------
