const getYoutubeVideoId = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;

  const match = url.match(regex);
  return match ? match[1] : null;
};

const YouTubeThumbnailPreview = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => {
  const videoId = getYoutubeVideoId(url);

  if (!videoId) return null;

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <>
      <img src={thumbnail} alt="YouTube Thumbnail" className={className} />
    </>
  );
};
export default YouTubeThumbnailPreview;
