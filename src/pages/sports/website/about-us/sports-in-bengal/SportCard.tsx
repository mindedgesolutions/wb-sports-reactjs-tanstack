import { SpwParagraphWrapper } from '@/components';

const SportCard = ({ text }: { text: string }) => {
  return (
    <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
      {text}
    </SpwParagraphWrapper>
  );
};
export default SportCard;
