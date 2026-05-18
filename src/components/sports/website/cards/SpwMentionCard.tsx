import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const SpwMentionCard = ({
  mention,
  className,
}: {
  mention: IHomepageMention;
  className?: string;
}) => {
  return (
    <div className={cn('p-2 w-60 font-roboto', className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          {mention.image ? (
            <img
              src={mention.image}
              alt={mention.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="p-8 w-full h-full bg-muted text-muted-foreground/50" />
          )}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-primary uppercase text-base font-semibold tracking-wider">
            {mention.name}
          </span>
          <span className="text-muted-foreground text-sm font-medium tracking-wider">
            {mention.designation}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SpwMentionCard;
