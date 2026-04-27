import { useMutation } from '@tanstack/react-query';
import {
  advertisementCreate,
  advertisementUpdate,
  announcementCreate,
  announcementUpdate,
} from './announcements.api';
import { queryClient } from '@/tanstack/query.client';
import type {
  AdvertisementSchema,
  AnnouncementSchema,
} from '@/schema/sports/announcements.schema';

export const useAnnouncementCreate = () => {
  return useMutation({
    mutationFn: announcementCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
};

// -------------------------------

type AnnouncementPayload = {
  data: AnnouncementSchema;
  id: number;
};

export const useAnnouncementUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: AnnouncementPayload) =>
      announcementUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
};

// -------------------------------

export const useAdvertisementCreate = () => {
  return useMutation({
    mutationFn: advertisementCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });
};

// -------------------------------

type AdvertisementPayload = {
  data: AdvertisementSchema;
  id: number;
};

export const useAdvertisementUpdate = () => {
  return useMutation({
    mutationFn: ({ id, data }: AdvertisementPayload) =>
      advertisementUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });
};
