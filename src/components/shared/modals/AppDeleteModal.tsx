import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteEntity } from '@/tanstack/shared/delete/delete.mutation';
import { FaRegTrashCan } from 'react-icons/fa6';

type DeleteProps = {
  api: string;
  queryKey: string;
  id: number;
  deleteQueryKey: string;
  additionalQueryKeys?: string[];
};

const AppDeleteModal = ({
  api,
  queryKey,
  id,
  deleteQueryKey,
  additionalQueryKeys,
}: DeleteProps) => {
  const deleteEntity = useDeleteEntity(
    queryKey,
    deleteQueryKey,
    additionalQueryKeys,
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size={'icon-xs'}>
          <FaRegTrashCan className="size-4 text-destructive cursor-pointer" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will be permanently deleted from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size={'sm'}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={'destructive'}
            size={'sm'}
            onClick={() => deleteEntity.mutate({ url: api, id })}
            disabled={deleteEntity.isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AppDeleteModal;
