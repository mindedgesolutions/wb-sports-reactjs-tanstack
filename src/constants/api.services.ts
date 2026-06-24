export const servicesApp = {
  banners: {
    banners: {
      create: `/services/banners/banners`,
      list: `/services/banners/banners`,
      toggle: (id: number) => `/services/banners/banners/toggle/${id}`,
      update: (id: number) => `/services/banners/banners/${id}`,
      delete: (id: number) => `/services/banners/banners/${id}`,
    },
  },
};
