import { toast } from 'sonner';
import { RxCrossCircled } from 'react-icons/rx';

export function showError(message: string) {
  return toast.error(message, {
    icon: <RxCrossCircled size={16} className="text-destructive" />,
    closeButton: true,
  });
}
