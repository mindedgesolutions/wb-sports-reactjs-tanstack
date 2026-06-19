import { homepageMentions, images, titles } from '@/constants';
import { Link } from 'react-router-dom';
import RootLandingCard from './RootLandingCard';

const relativePath = '../../';

const RootLanding = () => {
  return (
    <>
      <div className="flex min-h-screen mx-auto flex-1 flex-col">
        <div className="fixed top-0 left-0 z-10 w-full bg-fixed bg-card shadow-md shadow-primary-muted/10">
          <div className="flex justify-start items-center max-w-7xl mx-auto py-7">
            <div className="flex w-full flex-col md:flex-row justify-between items-center">
              <div className="flex h-14 gap-4">
                <span className="h-full">
                  <img
                    src={images.nationalEmblem}
                    alt="National emblem"
                    className="w-auto h-full object-cover"
                  />
                </span>
                <span className="flex flex-col justify-center gap-0.5">
                  <h1 className="text-xs md:text-2xl tracking-wider font-semibold uppercase font-oswald">
                    Department of youth services and sports
                  </h1>
                  <h2 className="text-xs md:text-base tracking-wider text-card-foreground/60 font-medium uppercase font-oswald">
                    Government of West Bengal
                  </h2>
                </span>
              </div>
              <div className="flex flex-col md:flex-row mt-4 md:mt-0 gap-4">
                <Link to={titles.SERVICES_WEB_URL}>
                  <div className="flex flex-row justify-left items-center gap-2 p-1 rounded-md group w-auto min-w-44 bg-primary hover:bg-primary/80 shadow-md shadow-card-foreground/50">
                    <div className="overflow-hidden rounded-md w-10 h-10">
                      <img
                        src={`${relativePath}/sports/youth 1.png`}
                        alt="sportsyouth"
                        className="w-full h-full group-hover:transform group-hover:scale-110 duration-300 transition-all"
                      />
                    </div>
                    <span className="pr-2 text-xs uppercase font-roboto font-semibold md:font-normal tracking-widest text-card">
                      Youth Services
                    </span>
                  </div>
                  {/* </div> */}
                </Link>
                <Link to={titles.SPORTS_WEB_URL}>
                  <div className="flex flex-row justify-left items-center gap-2 p-1 rounded-md group w-auto min-w-44 bg-primary hover:bg-primary/80 shadow-md shadow-card-foreground/50">
                    <div className="overflow-hidden rounded-md w-10 h-10">
                      <img
                        src={`${relativePath}/sports/sports 1.png`}
                        alt="sportsyouth"
                        className="w-full h-full group-hover:transform group-hover:scale-110 duration-300 transition-all"
                      />
                    </div>
                    <span className="pr-2 text-xs uppercase font-roboto font-semibold md:font-normal tracking-widest text-card">
                      Sports
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-72 md:mt-32">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-32">
            {homepageMentions
              .filter((p) => p.cm === true)
              .map((mention: IHomepageMention) => (
                <RootLandingCard {...mention} />
              ))}
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-32 mt-0 md:-mt-40">
            {homepageMentions
              .filter((p) => p.cm === false)
              .map((mention) => (
                <RootLandingCard {...mention} />
              ))}
          </div>
          <div className="p-4 md:p-0">
            <div className="mt-4 flex flex-col justify-center items-center">
              <h3 className="font-roboto text-xl font-bold text-primary uppercase mb-3">
                Vision
              </h3>
              <p className="font-roboto text-sm md:text-sm text-card-foreground text-justify [text-align-last:center] mt-1">
                To create scope and opportunities for the overall benefit of the
                youth in order to lead them to the right path enabling them to
                serve the nation and to promote and inculcate sports culture
                among the youth of the state through competitive spirit,
                camaraderie and sportsmanship.
              </p>
            </div>
            <div className="mt-4 flex flex-col justify-center items-center">
              <h3 className="font-roboto text-xl font-bold text-primary uppercase mb-3">
                Mission
              </h3>
              <p className="font-roboto text-sm md:text-sm text-card-foreground text-justify [text-align-last:center] mt-1">
                To build strong moral character and make them employable through
                various cultural and physical activities which help them to
                build scientific temper and attitude to contribute positively
                for eradicating blind faith and superstitions prevailing in our
                society and to provide the facilities interms of sports
                infrastructures and sports academies and scouting of talents :
                their early identification , nurturing within the ambit of
                international sports standard and incentivizing sports persons
                for promoting sports as a stand-alone profession.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-primary-muted justify-center md:justify-center items-start md:items-center p-2 px-4 md:px-10 -mt-10">
        <span className="flex flex-row justify-end items-center">
          <p className="text-left text-[11px] md:text-[11px] tracking-widest text-white mr-1">
            This site is designed by National Informatics Centre (NIC). Content,
            DATA, Process and Operation owned and maintained by Department of
            Youth Services & Sports, Government of West Bengal.{' '}
          </p>
          <img
            src={images.nationalEmblemInverted}
            alt="National Informatics Centre"
            className="h-6"
          />
        </span>
      </div>
    </>
  );
};
export default RootLanding;
