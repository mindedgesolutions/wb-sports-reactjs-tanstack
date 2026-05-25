const WbSliderPlaceholder = () => {
  return (
    <section className="relative w-full h-60 md:h-125 overflow-visible mb-20">
      <div className="relative h-60 md:h-125 overflow-hidden">
        <div className="absolute inset-0 bg-white animate-pulse" />
        <img
          src="/default_banner.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
export default WbSliderPlaceholder;
