import { toast } from 'sonner';
import { FaRegCheckCircle } from 'react-icons/fa';

export function showSuccess(message: string) {
  return toast.success(message, {
    icon: <FaRegCheckCircle size={16} className="text-success" />,
    closeButton: true,
  });
}
