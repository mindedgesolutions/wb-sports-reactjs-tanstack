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
    <div className={cn('p-2 w-60 font-inter', className)}>
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
        <div className="flex flex-col items-center">
          <span className="mt-4 text-sm font-semibold font-inter uppercase tracking-wider text-primary">
            {mention.name}
          </span>
          <span className="mt-2 text-muted-foreground/70 tracking-widest text-xs font-inter">
            {mention.designation}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SpwMentionCard;
