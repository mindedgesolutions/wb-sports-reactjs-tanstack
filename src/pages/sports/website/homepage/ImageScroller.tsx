import { titles } from '@/constants';
import type { IPhotoRow } from '@/interface/sports.interface';
import SliderImport from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SpwSectionWrapper } from '@/components';

const ImageScroller = ({ thumbnails }: { thumbnails: IPhotoRow[] }) => {
  const Slider =
    typeof (SliderImport as any)?.default === 'function'
      ? (SliderImport as any).default
      : SliderImport;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <SpwSectionWrapper>
      {thumbnails && (
        <div className="w-full overflow-hidden p-1">
          <Slider {...settings}>
            {thumbnails?.map((img, index: number) => (
              <div key={index} className="w-full h-32 md:h-44 px-0.5">
                <img
                  src={`${titles.BASE_URL}${img.image_path}`}
                  alt={`NA`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </SpwSectionWrapper>
  );
};
export default ImageScroller;
