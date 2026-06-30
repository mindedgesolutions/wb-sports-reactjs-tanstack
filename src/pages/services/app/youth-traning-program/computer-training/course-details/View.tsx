import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ICompCourseDetails } from '@/interface/services.interface';
import { queryClient } from '@/tanstack/query.client';
import { Eye, IndianRupee } from 'lucide-react';
import { useState } from 'react';

const View = ({ data }: { data: ICompCourseDetails }) => {
  const [open, setOpen] = useState(false);
  const openModal = (state: boolean) => {
    setOpen(state);
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={'icon-xs'}
          onClick={() => {
            queryClient.setQueryData(['district-block-office-view'], data);
          }}
        >
          <Eye className="size-3.5 text-info" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{data.course_name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold text-primary-muted">
              Course type
            </h1>
            <p className="text-xs font-medium">
              {data.course_type.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold text-primary-muted">
              Course eligibility
            </h1>
            <p className="text-xs font-medium">{data.course_eligibility}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold text-primary-muted">
              Course duration
            </h1>
            <p className="text-xs font-medium">{data.course_duration}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold text-primary-muted">
              Course fee
            </h1>
            <p className="text-xs font-medium flex items-center gap-1">
              <IndianRupee className="w-3 h-3" />
              {data.course_fees}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default View;
