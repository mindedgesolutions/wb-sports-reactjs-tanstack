const prefix = `/sports/website`;

export const sportsWeb = {
  homepage: {
    homepageSliders: `${prefix}/homepage-slider/all`,
    newsScroller: `${prefix}/news-events/scroll`,
    visionMissionImages: (count: number) =>
      `${prefix}/gallery-images-ltd/${count}`,
  },
};
