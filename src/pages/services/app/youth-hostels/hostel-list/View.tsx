import type { IYouthHostel } from '@/interface/services.interface';
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
import { defaultIcons, titles } from '@/constants';
import { ScrollArea } from '@/components/ui/scroll-area';

const View = ({ data }: { data: IYouthHostel }) => {
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
            queryClient.setQueryData(['youth-hostel-view'], data);
          }}
        >
          <Eye className="size-3.5 text-info" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full max-h-125 overflow-y-scroll">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm font-semibold text-primary-muted">
                    Address
                  </h1>
                  <p className="text-[10px] font-medium">
                    {data.address.toUpperCase()}
                  </p>
                  <div className="flex gap-4">
                    {data.phone_1 && (
                      <div className="text-[11px] flex items-center gap-1">
                        <defaultIcons.phone />
                        {data.phone_1}
                      </div>
                    )}
                    {data.phone_2 && (
                      <div className="text-[11px] flex items-center gap-1">
                        <defaultIcons.phone />
                        {data.phone_2}
                      </div>
                    )}
                    {data.email && (
                      <div className="text-xs flex items-center gap-1">
                        <defaultIcons.email />
                        {data.email}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-sm font-semibold text-primary-muted">
                    Accommodation(s)
                  </h1>
                  {data.accommodation?.split(',').length > 0 ? (
                    <ol className="list-disc list-inside text-[10px] uppercase">
                      {data.accommodation.split(',').map((ac) => (
                        <li key={ac} className="mb-1">
                          {ac}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    `N/A`
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                {data.hostel_img ? (
                  <img
                    src={`${titles.BASE_URL}${data.hostel_img}`}
                    className="w-32 h-32 object-cover"
                  />
                ) : (
                  <defaultIcons.building className="w-20 h-32 object-cover text-muted-foreground/30" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-primary-muted">
                  How to reach
                </h1>
                {data.how_to_reach ? (
                  <p className="text-[10px] font-medium">
                    {data.how_to_reach.toUpperCase()}
                  </p>
                ) : (
                  `N/A`
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-primary-muted">
                  Nearest railway station
                </h1>
                {data.railway_station ? (
                  <p className="text-[10px] font-medium">
                    {data.railway_station.toUpperCase()}
                  </p>
                ) : (
                  `N/A`
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-primary-muted">
                  Nearest bus stop
                </h1>
                {data.bus_stop ? (
                  <p className="text-[10px] font-medium">
                    {data.bus_stop.toUpperCase()}
                  </p>
                ) : (
                  `N/A`
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-primary-muted">
                  Nearest airport
                </h1>
                {data.airport ? (
                  <p className="text-[10px] font-medium">
                    {data.airport.toUpperCase()}
                  </p>
                ) : (
                  `N/A`
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-primary-muted">
                  Road transportation network
                </h1>
                {data.road_network ? (
                  <p className="text-[10px] font-medium">
                    {data.road_network.toUpperCase()}
                  </p>
                ) : (
                  `N/A`
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 flex flex-col gap-2">
                <h1 className="text-sm font-semibold text-primary-muted">
                  Remarks
                </h1>
                {data.remarks ? (
                  <p className="text-[10px] font-medium">
                    {data.remarks.toUpperCase()}
                  </p>
                ) : (
                  `N/A`
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default View;
