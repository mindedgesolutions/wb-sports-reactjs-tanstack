import { images } from '@/constants';

const SpwFooterBottom = () => {
  return (
    <div className="bg-card-foreground dark:bg-black p-2 md:p-2.5 flex flex-col md:flex-row gap-4 md:gap-0 justify-center items-center">
      <span className="flex flex-row justify-start md:justify-center items-center gap-2 text-primary font-roboto tracking-wider text-xs">
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
