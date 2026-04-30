export const sportsApp = {
  aboutUs: {
    adminStructure: {
      create: `/sports/about-us/admin-structure`,
      list: `/sports/about-us/admin-structure`,
      all: `/sports/about-us/admin-structure/all`,
      sort: `/sports/about-us/admin-structure/sort`,
      toggle: (id: number) => `/sports/about-us/admin-structure/toggle/${id}`,
      update: (id: number) => `/sports/about-us/admin-structure/${id}`,
      delete: (id: number) => `/sports/about-us/admin-structure/${id}`,
    },
    keyPersonnel: {
      create: `/sports/about-us/key-personnel`,
      list: `/sports/about-us/key-personnel`,
      all: `/sports/about-us/key-personnel/all`,
      sort: `/sports/about-us/key-personnel/sort`,
      toggle: (id: number) => `/sports/about-us/key-personnel/toggle/${id}`,
      update: (id: number) =>
        `/sports/about-us/key-personnel/update-member/${id}`,
      delete: (id: number) => `/sports/about-us/key-personnel/${id}`,
    },
    achievements: {
      create: `/sports/about-us/achievements`,
      list: `/sports/about-us/achievements`,
      toggle: (id: number) => `/sports/about-us/achievements/toggle/${id}`,
      update: (id: number) => `/sports/about-us/achievements/${id}`,
      delete: (id: number) => `/sports/about-us/achievements/${id}`,
    },
  },
  sports: {
    sportsPersonnel: {
      create: `/sports/sports/sports-personnel`,
      list: `/sports/sports/sports-personnel`,
      toggle: (id: number) => `/sports/sports/sports-personnel/toggle/${id}`,
      update: (id: number) => `/sports/sports/sports-personnel/${id}`,
      delete: (id: number) => `/sports/sports/sports-personnel/${id}`,
    },
    sportsEvents: {
      create: `/sports/sports/sports-events`,
      list: `/sports/sports/sports-events`,
      toggle: (id: number) => `/sports/sports/sports-events/toggle/${id}`,
      update: (id: number) => `/sports/sports/sports-events/${id}`,
      delete: (id: number) => `/sports/sports/sports-events/${id}`,
    },
  },
  wbsCouncil: {
    designations: `/sports/wbs-council/designations`,
    create: `/sports/wbs-council/wbs-members`,
    list: `/sports/wbs-council/wbs-members`,
    update: (id: number) => `/sports/wbs-council/wbs-members/${id}`,
    delete: (id: number) => `/sports/wbs-council/wbs-members/${id}`,
    toggle: (id: number) => `/sports/wbs-council/wbs-members/toggle/${id}`,
  },
  announcements: {
    announcements: {
      create: `/sports/announcements/announcements`,
      list: `/sports/announcements/announcements`,
      update: (id: number) => `/sports/announcements/announcements/${id}`,
      delete: (id: number) => `/sports/announcements/announcements/${id}`,
      toggle: (id: number) =>
        `/sports/announcements/announcements/toggle/${id}`,
    },
    advertisements: {
      create: `/sports/announcements/advertisements`,
      list: `/sports/announcements/advertisements`,
      update: (id: number) => `/sports/announcements/advertisements/${id}`,
      delete: (id: number) => `/sports/announcements/advertisements/${id}`,
      toggle: (id: number) =>
        `/sports/announcements/advertisements/toggle/${id}`,
    },
  },
  achievementsAwards: {
    playersAchievements: {
      create: `/sports/achievements-awards/players-achievements`,
      list: `/sports/achievements-awards/players-achievements`,
      update: (id: number) =>
        `/sports/achievements-awards/players-achievements/${id}`,
      delete: (id: number) =>
        `/sports/achievements-awards/players-achievements/${id}`,
      toggle: (id: number) =>
        `/sports/achievements-awards/players-achievements/toggle/${id}`,
    },
    awards: {
      create: `/sports/achievements-awards/awards`,
      list: `/sports/achievements-awards/awards`,
      update: (id: number) => `/sports/achievements-awards/awards/${id}`,
      delete: (id: number) => `/sports/achievements-awards/awards/${id}`,
      toggle: (id: number) => `/sports/achievements-awards/awards/toggle/${id}`,
    },
  },
  infoAbout: {
    stadiums: {
      create: `/sports/info-about/stadiums`,
      list: `/sports/info-about/stadiums`,
      show: (id: number) => `/sports/info-about/stadiums/${id}`,
      update: (id: number) => `/sports/info-about/stadiums/${id}`,
      delete: (id: number) => `/sports/info-about/stadiums/${id}`,
      toggle: (id: number) => `/sports/info-about/stadiums/toggle/${id}`,
    },
    associations: {
      create: `/sports/info-about/associations`,
      list: `/sports/info-about/associations`,
      update: (id: number) => `/sports/info-about/associations/${id}`,
      delete: (id: number) => `/sports/info-about/associations/${id}`,
      toggle: (id: number) => `/sports/info-about/associations/toggle/${id}`,
    },
    fifa: {
      create: `/sports/info-about/fifa`,
      list: `/sports/info-about/fifa`,
      show: (id: number) => `/sports/info-about/fifa/${id}`,
      update: (id: number) => `/sports/info-about/fifa/${id}`,
      delete: (id: number) => `/sports/info-about/fifa/${id}`,
      toggle: (id: number) => `/sports/info-about/fifa/toggle/${id}`,
      upload: (id: number) => `/sports/info-about/fifa/photos/${id}`,
    },
    sportsPolicies: {
      create: `/sports/info-about/sports-policies`,
      list: `/sports/info-about/sports-policies`,
      update: (id: number) => `/sports/info-about/sports-policies/${id}`,
      delete: (id: number) => `/sports/info-about/sports-policies/${id}`,
      toggle: (id: number) => `/sports/info-about/sports-policies/toggle/${id}`,
    },
    assocSites: {
      create: `/sports/info-about/assoc-sites`,
      list: `/sports/info-about/assoc-sites`,
      update: (id: number) => `/sports/info-about/assoc-sites/${id}`,
      delete: (id: number) => `/sports/info-about/assoc-sites/${id}`,
      toggle: (id: number) => `/sports/info-about/assoc-sites/toggle/${id}`,
    },
  },
};
