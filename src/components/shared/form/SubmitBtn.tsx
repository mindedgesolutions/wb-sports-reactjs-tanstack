import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

type SubmitBtnProps = {
  label: string;
  submitLabel?: string;
  isSubmitting: boolean;
  className?: string;
};

const SubmitBtn = ({
  label,
  submitLabel,
  isSubmitting,
  className,
}: SubmitBtnProps) => {
  return (
    <Button
      type="submit"
      size="default"
      disabled={isSubmitting}
      className={cn('bg-primary flex gap-1.5 items-center', className)}
    >
      {isSubmitting && <Spinner className="h-3" />}
      <span className="text-xs tracking-wider">
        {isSubmitting ? submitLabel : label}
      </span>
    </Button>
  );
};
export default SubmitBtn;
