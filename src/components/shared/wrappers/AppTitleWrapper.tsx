import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const AppTitleWrapper = ({
  title,
  className,
  children,
  isFetching,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
  isFetching?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center bg-muted mb-1">
      <div
        className={cn(
          'text-xs font-medium text-card-foreground tracking-wider uppercase p-2',
          className,
        )}
      >
        {isFetching ? (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Link to="#">{title}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Fetching data</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          title
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};
export default AppTitleWrapper;
