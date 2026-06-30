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
  youthTraining: {
    compTraining: {
      courseDetails: {
        create: `/services/computer-training/course-details`,
        list: `/services/computer-training/course-details`,
        toggle: (id: number) =>
          `/services/computer-training/course-details/toggle/${id}`,
        update: (id: number) =>
          `/services/computer-training/course-details/${id}`,
        delete: (id: number) =>
          `/services/computer-training/course-details/${id}`,
      },
      courseSyllabus: {
        create: `/services/computer-training/course-syllabus`,
        list: `/services/computer-training/course-syllabus`,
        toggle: (id: number) =>
          `/services/computer-training/course-syllabus/toggle/${id}`,
        update: (id: number) =>
          `/services/computer-training/course-syllabus/${id}`,
        delete: (id: number) =>
          `/services/computer-training/course-syllabus/${id}`,
      },
      trainingCentres: {},
    },
    vocTraining: {},
  },
};
