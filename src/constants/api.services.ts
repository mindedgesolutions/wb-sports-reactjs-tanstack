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
  aboutUs: {
    orgChart: {
      create: `/services/about-us/org-chart`,
      list: `/services/about-us/org-chart`,
      all: `/services/about-us/org-chart/all`,
      sort: `/services/about-us/org-chart/sort`,
      toggle: (id: number) => `/services/about-us/org-chart/toggle/${id}`,
      update: (id: number) => `/services/about-us/org-chart/${id}`,
      delete: (id: number) => `/services/about-us/org-chart/${id}`,
    },
    districtBlockOffices: {
      create: `/services/about-us/district-block-offices`,
      list: `/services/about-us/district-block-offices`,
      toggle: (id: number) =>
        `/services/about-us/district-block-offices/toggle/${id}`,
      update: (id: number) => `/services/about-us/district-block-offices/${id}`,
      delete: (id: number) => `/services/about-us/district-block-offices/${id}`,
    },
  },
};
