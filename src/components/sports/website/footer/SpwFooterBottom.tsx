import { images } from '@/constants';

const SpwFooterBottom = () => {
  return (
    <div className="bg-primary p-2 py-4 md:p-2.5 md:py-2 flex flex-col md:flex-row gap-4 md:gap-0 justify-center items-center">
      <span className="flex flex-row justify-start md:justify-center text-justify items-center gap-2 text-card-foreground font-inter tracking-wider text-[11px]">
        <p className="mr-1">
          This site is designed by National Informatics Centre (NIC). Content,
          DATA, Process and Operation owned and maintained by Department of
          Youth Services & Sports (Sports Wing), Government of West Bengal.{' '}
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
export default SpwFooterBottom;
