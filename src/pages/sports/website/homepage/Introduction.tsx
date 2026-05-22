import {
  SpwPageTitle,
  SpwParagraphWrapper,
  SpwSectionWrapper,
} from '@/components';

const Introduction = () => {
  return (
    <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8">
      <SpwPageTitle
        title="Welcome to Department of youth Services and Sports (Sports Wing)"
        className="text-center"
      />
      <SpwParagraphWrapper className="[text-align-last:center]">
        It is universally accepted that sports is an essential prerequisite for
        good health. There is no better platform to bring all the youth in a
        single track, lure away from the evils of society and increase their
        social values. The main aim of the Department is to improve and develop
        sports infrastructure in the State, as also to search and nurture sports
        talents. With this in view, the department lays special emphasis on
        creation of sports facilities at the district, sub-division and block
        level, to ensure participation of maximum number in sports and games.
        Emphasis is also given to promote vulnerable sections like women,
        schedule tribes and schedule castes in sporting arena.
      </SpwParagraphWrapper>
    </SpwSectionWrapper>
  );
};
export default Introduction;
