import { Spinner } from '@/components/ui/spinner';

const AppTitleLoading = () => {
  return (
    <div className="flex justify-start items-center gap-1 text-muted-foreground">
      <Spinner className="h-3" />
      <span>Fetching data ...</span>
    </div>
  );
};
export default AppTitleLoading;
