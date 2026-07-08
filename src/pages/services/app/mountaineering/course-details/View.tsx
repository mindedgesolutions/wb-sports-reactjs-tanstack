import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { defaultIcons } from '@/constants';
import type { IMountainCourse } from '@/interface/services.interface';
import { queryClient } from '@/tanstack/query.client';
import { Eye } from 'lucide-react';
import { useState } from 'react';

const View = ({ data }: { data?: IMountainCourse }) => {
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
            queryClient.setQueryData(['mountain-course-view'], data);
          }}
        >
          <Eye className="size-3.5 text-info" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{data?.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold text-primary-muted">
              Course name
            </h1>
            <p className="text-xs font-medium">{data?.name.toUpperCase()}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-semibold text-primary-muted">
                No. of courses
              </h1>
              <p className="text-xs font-medium">{data?.courses_count}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-semibold text-primary-muted">
                Course duration
              </h1>
              <p className="text-xs font-medium">{data?.duration} Days</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <h1 className="text-sm font-semibold text-primary-muted">
                Age group
              </h1>
              <p className="text-xs font-medium">
                {data?.age_group_start} - {data?.age_group_end} Years
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold text-primary-muted">
              Remarks
            </h1>
            <p className="text-xs font-medium">{data?.remarks || `N/A`}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold text-primary-muted">
              Course fee
            </h1>
            <p className="text-xs font-medium flex items-center gap-0.5">
              <defaultIcons.inr />
              {data?.course_fee || `N/A`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default View;
