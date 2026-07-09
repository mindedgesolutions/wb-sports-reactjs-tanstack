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
      trainingCentres: {
        create: `/services/computer-training/training-centres`,
        list: `/services/computer-training/training-centres`,
        toggle: (id: number) =>
          `/services/computer-training/training-centres/toggle/${id}`,
        update: (id: number) =>
          `/services/computer-training/training-centres/${id}`,
        delete: (id: number) =>
          `/services/computer-training/training-centres/${id}`,
      },
    },
    vocTraining: {
      schemes: {
        create: `/services/vocatioanl-training/schemes`,
        list: `/services/vocatioanl-training/schemes`,
        all: `/services/vocatioanl-training/schemes/all`,
        sort: `/services/vocatioanl-training/schemes/sort`,
        toggle: (id: number) =>
          `/services/vocatioanl-training/schemes/toggle/${id}`,
        update: (id: number) => `/services/vocatioanl-training/schemes/${id}`,
        delete: (id: number) => `/services/vocatioanl-training/schemes/${id}`,
      },
      trainingCentres: {
        create: `/services/vocatioanl-training/training-centres`,
        list: `/services/vocatioanl-training/training-centres`,
        toggle: (id: number) =>
          `/services/vocatioanl-training/training-centres/toggle/${id}`,
        update: (id: number) =>
          `/services/vocatioanl-training/training-centres/${id}`,
        delete: (id: number) =>
          `/services/vocatioanl-training/training-centres/${id}`,
      },
    },
  },
  mountaineering: {
    gbMembers: {
      create: `/services/mountaineering/general-body`,
      list: `/services/mountaineering/general-body`,
      all: `/services/mountaineering/general-body/all`,
      sort: `/services/mountaineering/general-body/sort`,
      toggle: (id: number) =>
        `/services/mountaineering/general-body/toggle/${id}`,
      update: (id: number) => `/services/mountaineering/general-body/${id}`,
      delete: (id: number) => `/services/mountaineering/general-body/${id}`,
    },
    courseDetails: {
      create: `/services/mountaineering/course-details`,
      list: `/services/mountaineering/course-details`,
      toggle: (id: number) =>
        `/services/mountaineering/course-details/toggle/${id}`,
      update: (id: number) => `/services/mountaineering/course-details/${id}`,
      delete: (id: number) => `/services/mountaineering/course-details/${id}`,
    },
  },
  fairProgrammes: {
    create: `/services/fair-programmes`,
    list: `/services/fair-programmes`,
    show: (id: number) => `/services/fair-programmes/${id}`,
    update: (id: number) => `/services/fair-programmes/${id}`,
    delete: (id: number) => `/services/fair-programmes/${id}`,
    toggle: (id: number) => `/services/fair-programmes/toggle/${id}`,
    photos: (id: number) => `/services/fair-programmes/photos/${id}`,
  },
};
