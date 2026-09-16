import { images } from '@/constants';

const YswFooterBottom = () => {
  return (
    <div className="bg-primary p-2 py-4 md:p-2.5 md:py-2 flex flex-col md:flex-row gap-4 md:gap-0 justify-center items-center">
      <span className="flex flex-col md:flex-row justify-start md:justify-center text-center md:text-justify items-center gap-4 md:gap-2 text-card-foreground font-inter tracking-wider text-[10px] md:text-[11px]">
        <p className="mr-1">
          This site is designed by National Informatics Centre (NIC). Content,
          DATA, Process and Operation owned and maintained by Department of
          Youth Services & Sports (Youth Services Wing), Government of West
          Bengal.{' '}
        </p>
        <img
          src={images.nicLogo}
          alt="National Informatics Centre"
          className="h-4"
        />
      </span>
    </div>
  );
};
export default YswFooterBottom;
