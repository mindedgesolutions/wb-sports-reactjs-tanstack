import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import { titles } from '@/constants';
import AppDefaultUser from './AppDefaultUser';
import { useSortList } from '@/tanstack/shared/sort-list/sort-list.mutation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SubmitBtn from '../form/SubmitBtn';

type SortableItemProps = {
  id: number;
  primary: string;
  secondary?: string;
  img?: string;
};

function SortableItem({ id, primary, secondary, img }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex gap-2 justify-start items-center text-muted-foreground text-xs bg-muted hover:bg-muted-foreground/15 rounded my-3 p-2 cursor-grab"
    >
      {img ? (
        <img
          src={`${titles.BASE_URL}${img}`}
          alt={primary}
          className="max-w-12 max-h-12 object-cover"
        />
      ) : (
        <AppDefaultUser />
      )}
      <section className="flex flex-col gap-1">
        <span className="font-medium tracking-wider uppercase">{primary}</span>
        <span className="text-[10px]">{secondary}</span>
      </section>
    </div>
  );
}

const AppSortList = ({
  data,
  queryKey,
  api,
  additionalQueryKeys,
}: {
  data: SortableItemProps[];
  queryKey: string;
  api: string;
  additionalQueryKeys?: string[];
}) => {
  const [items, setItems] = useState<SortableItemProps[]>([]);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen((op) => !op);
  const { mutate, isPending } = useSortList(queryKey, additionalQueryKeys);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = items.map((item: any, index: number) => ({
      id: item.id,
      show: index,
    }));

    mutate({ api, data: payload });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={'sm'}
          onClick={() => openModal}
          className="rounded-sm"
        >
          Sort structure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Sort structure</DialogTitle>
          <DialogDescription>
            Click the Save button at the bottom
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <ScrollArea className="sm:max-w-xl max-h-96 overflow-y-scroll">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!over || active.id === over.id) return;

                  if (active.id !== over?.id) {
                    setItems((data: any[]) => {
                      const oldIndex = data.findIndex(
                        (item) => item.id === active.id,
                      );
                      const newIndex = data.findIndex(
                        (item) => item.id === over.id,
                      );
                      return arrayMove(data, oldIndex, newIndex);
                    });
                  }
                }}
              >
                <SortableContext
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((item: SortableItemProps) => (
                    <SortableItem key={item.id} {...item} />
                  ))}
                </SortableContext>
              </DndContext>
            </ScrollArea>
          </div>
          <div className="mt-8 flex justify-end">
            <SubmitBtn isSubmitting={isPending} label="Save" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AppSortList;
