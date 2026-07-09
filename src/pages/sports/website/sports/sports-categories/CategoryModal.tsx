import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

type SportsDetailsProps = {
  id: string;
  title: string;
  para1: string;
  para2?: string;
  para3?: string;
  para4?: string;
  sport: string;
  image1: string;
  image2?: string;
};

const CategoryModal = (category: SportsDetailsProps) => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(!open);

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <div className="flex justify-center md:justify-start">
          <Button
            size={'sm'}
            className="hidden md:block mt-4 rounded-none text-xs text-primary-foreground"
          >
            Read More
          </Button>
          <Button
            variant={'default'}
            size={'sm'}
            className="block mt-4 md:hidden rounded-none text-xs text-primary-foreground"
          >
            Read More
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full md:max-w-5xl">
        <ScrollArea className="w-full max-h-150 pr-4 m-0">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-oswald">
              {category.title.toUpperCase()}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center items-center gap-8">
            {/* for desktop view */}
            <div className="hidden md:block prose">
              {category.image1 && (
                <img
                  src={category.image1}
                  alt={category.sport}
                  className="float-right ml-4 mb-2 w-48"
                />
              )}
              <p className="text-justify text-xs md:text-sm font-inter tracking-normal md:tracking-wider leading-normal md:leading-relaxed">
                {category.para1}
              </p>
            </div>
            {/* for mobile view */}
            <div className="block md:hidden">
              {category.image1 && (
                <img
                  src={category.image1}
                  alt={category.sport}
                  className="w-full h-auto object-cover mb-4"
                />
              )}
              <p className="text-justify text-xs md:text-sm font-inter tracking-normal md:tracking-wider leading-normal md:leading-relaxed">
                {category.para1}
              </p>
            </div>
            {category.para2 && (
              <p className="text-justify text-xs md:text-sm font-inter tracking-normal md:tracking-wider leading-normal md:leading-relaxed">
                {category.para2}
              </p>
            )}
            {category.para3 && (
              <p className="text-justify text-xs md:text-sm font-inter tracking-normal md:tracking-wider leading-normal md:leading-relaxed">
                {category.para3}
              </p>
            )}
            {category.para4 && (
              <>
                <div className="hidden md:block prose">
                  {category.image2 && (
                    <img
                      src={category.image2}
                      alt={category.sport}
                      className="float-right ml-4 mb-2 w-48"
                    />
                  )}
                  <p className="text-justify text-xs md:text-sm font-inter tracking-normal md:tracking-wider leading-normal md:leading-relaxed">
                    {category.para4}
                  </p>
                </div>

                <div className="block md:hidden">
                  {category.image2 && (
                    <img
                      src={category.image2}
                      alt={category.sport}
                      className="w-full h-auto object-cover mb-4"
                    />
                  )}
                  <p className="text-justify text-xs md:text-sm font-inter tracking-normal md:tracking-wider leading-normal md:leading-relaxed">
                    {category.para4}
                  </p>
                </div>
              </>
            )}
          </div>
          {category.sport === 'football' && (
            <div className="flex flex-col justify-start items-start -mt-8 gap-8">
              <h1 className="mt-16 md:mt-0 text-base text-primary-foreground font-oswald font-medium uppercase tracking-widest">
                Santosh Trophy
              </h1>
              <ol className="-mt-16 md:-mt-4 list-disc list-inside marker:text-primary marker:text-2xl text-justify space-y-4 text-xs md:text-sm font-inter leading-normal md:leading-relaxed">
                <li>
                  Santosh Trophy is an annual Indian football tournament which
                  is contested by states and government institutions. The first
                  winner was Bengal, who also lead the all-time winners list
                  with 31 titles till date.
                </li>
                <li>
                  The tournament first began in 1941, and was the premier
                  football competition in the country before the National
                  Football League started in the year 1996. The trophy as named
                  after the late Maharaja Sir Manmatha Nath Roy Chowdhary of
                  Santosh, which is now in Bangladesh, who had been the
                  President of the Indian Football Association, the football
                  organisation of Bengal and the donators of the trophy.
                </li>
                <li>
                  The runners-up trophy, Kamla Gupta Trophy, was also donated by
                  the IFA
                </li>
              </ol>
              <h1 className="text-base text-primary font-medium uppercase tracking-widest">
                Winner : 31
              </h1>
              <ol className="-mt-4 list-disc list-inside text-xs md:text-sm text-justify marker:text-primary marker:text-2xl">
                <li>
                  1941-42, 1945-46, 1945-46, 1949-50, 1950-51, 1951-52, 1953-54,
                  1955-56, 1958-59, 1959-60, 1962-63, 1969-70, 1971-72, 1972-73,
                  1975-76, 1976-77, 1977-78, 1978-79, 1979-80, 1981-82, 1982-83
                  (Shared with Goa), 1986-87, 1988-89, 1993-94, 1994-95,
                  1995-96, 1996-97, 1997-98, 1998-99, 2010-11, 2011-12
                </li>
              </ol>
              <h1 className="text-base text-primary font-medium uppercase tracking-widest">
                Runners-up : 12
              </h1>
              <ol className="-mt-4 list-disc list-inside text-xs md:text-sm text-justify marker:text-primary marker:text-2xl">
                <li>
                  1944-45, 1946-47, 1946-47, 1960-61, 1964-65, 1965-66, 1967-68,
                  1968-69, 1974-75, 1985-86, 2006-07, 2008-09
                </li>
              </ol>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default CategoryModal;
