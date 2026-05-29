import { customFetch } from '@/axios/custom.fetch';
import { simpleFetch } from '@/axios/refresh.fetch';
import { sportsApp } from '@/constants/api.sports';
import { sportsWeb } from '@/constants/api.sports.website';
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

export const getSportsPersonnelWb = async ({
  sport,
  signal,
}: {
  sport: string;
  signal: AbortSignal;
}) => {
  const res = await simpleFetch.get(sportsWeb.sports.sportsPersonnel(sport), {
    signal,
  });
  return res.data.data;
};

// -----------------------------

const formatSportsPersonnelPayload = (data: SportsPersonnelSchema) => {
  const dob = data.dob instanceof Date ? parseDate(data.dob) : null;

  const payload: any = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'dob') {
      payload[key] = dob;
      return;
    }

    if (value !== '' && value !== undefined && value !== null) {
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

export const getSportsEventsWb = async ({
  page,
  signal,
}: {
  page: number;
  signal: AbortSignal;
}) => {
  const res = await simpleFetch.get(sportsWeb.sports.sportsEvents, {
    params: { page },
    signal,
  });
  return res.data.data;
};

// -----------------------------

const formatSportsEventPayload = (data: SportsEventsSchema) => {
  const eventDate =
    data.eventDate instanceof Date ? parseDate(data.eventDate) : null;

  const payload: any = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'eventDate' && eventDate) {
      payload[key] = eventDate;
    }

    if (
      key !== 'eventDate' &&
      value !== '' &&
      value !== undefined &&
      value !== null
    ) {
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
