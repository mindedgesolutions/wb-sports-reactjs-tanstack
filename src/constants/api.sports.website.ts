const prefix = `/sports/website`;

export const sportsWeb = {
  homepage: {
    homepageSliders: `${prefix}/homepage-slider/all`,
    newsScroller: `${prefix}/news-events/scroll`,
    visionMissionImages: (count: number) =>
      `${prefix}/gallery-images-ltd/${count}`,
  },
  aboutUs: {
    adminStructute: `${prefix}/org-structure/all`,
    keyPersonnel: `${prefix}/web-key-personnel/all`,
    achievements: `${prefix}/achievements/all`,
  },
  sports: {
    sportsPersonnel: (sport: string) =>
      `${prefix}/sports-personnel-web/${sport}`,
    sportsEvents: `${prefix}/events/all`,
  },
  wbsCouncil: {
    wbsDesignations: (type: string) => `${prefix}/wbs-designations/${type}`,
    advisoryBoard: `${prefix}/advisory-board`,
    workingCommittee: `${prefix}/working-committee`,
  },
  announcements: {
    announcements: (type: string) => `${prefix}/announcements/all/${type}`,
    advertisements: `${prefix}/advertisements/all`,
  },
  achievementsAwards: {
    playersAchievements: (sport: string) =>
      `${prefix}/single-achievement/${sport}`,
    awards: `${prefix}/awards/all`,
  },
  infoAbout: {
    stadiums: `${prefix}/stadiums/all`,
    stadium: (slug: string) => `${prefix}/stadium-info/${slug}`,
    associations: `${prefix}/associations/all`,
  },
};
