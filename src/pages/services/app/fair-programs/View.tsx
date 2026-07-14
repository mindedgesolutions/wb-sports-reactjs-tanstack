import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { Eye } from 'lucide-react';
import { titles } from '@/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFairProgram } from '@/tanstack/services/fair-programs/fair-program.query';
import type { IFairProgrammeDetails } from '@/interface/services.interface';
import { SrwParagraphWrapper } from '@/components';

const View = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const openModal = (state: boolean) => {
    setOpen(state);
  };

  const { data, isLoading: fetching } = useFairProgram(id, {
    enabled: !!id,
  }) as { data: IFairProgrammeDetails | undefined; isLoading: boolean };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={'icon-xs'}
          onClick={() => {
            queryClient.setQueryData(['fair-program-view'], data);
          }}
        >
          <Eye className="size-3.5 text-info" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-bold uppercase">
            {fetching ? 'Loading ...' : data?.title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full max-h-125 overflow-y-scroll">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-3 flex flex-col gap-6">
                {data?.description && (
                  <SrwParagraphWrapper className="text-[13px] leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                    />
                  </SrwParagraphWrapper>
                )}
              </div>
              <div className="w-full h-44">
                {data?.cover_image ? (
                  <img
                    src={`${titles.BASE_URL}${data?.cover_image}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  'N/A'
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-6 gap-4">
              {data?.images.map((img) => (
                <div key={img.image_path} className="w-full h-28">
                  <img
                    src={`${titles.BASE_URL}${img.image_path}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default View;
