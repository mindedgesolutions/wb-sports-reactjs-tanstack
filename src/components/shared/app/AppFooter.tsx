import { images } from '@/constants';

const AppFooter = ({ text }: { text: string }) => {
  return (
    <div className="bg-muted-foreground/15 p-3 mt-16">
      <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-4 md:gap-2">
        <span className="text-xs text-muted-foreground tracking-wide">
          {text}
        </span>
        <img
          src={images.nicLogo}
          alt="National Informatics Centre"
          className="w-auto h-4"
        />
      </div>
    </div>
  );
};
export default AppFooter;
