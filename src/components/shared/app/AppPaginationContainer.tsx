import { useLocation } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { constructPrevOrNext, constructUrl } from '@/utils/functions';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  addClass?: string;
  onPageChange: (page: number) => void;
};

const AppPaginationContainer = ({
  currentPage,
  totalPages,
  addClass,
  onPageChange,
}: PaginationProps) => {
  if (totalPages < 2) return null;

  const { search, pathname } = useLocation();
  Array.from({ length: totalPages }, (_, index) => index + 1);

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
  }) => {
    const url = constructUrl({ pageNumber, search, pathname });
    return (
      <PaginationItem
        key={`page-${pageNumber}`}
        onClick={() => onPageChange(pageNumber)}
      >
        <PaginationLink
          className={`text-xs ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
          to={url}
          isActive={isActive}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (key: any) => {
    return (
      <PaginationItem key={`ellipsis-${key}`}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const renderPageButtons = () => {
    let pages = [];
    // First page : page=1
    pages.push(constructButton({ pageNumber: 1, isActive: currentPage === 1 }));

    // Ellipsis
    if (currentPage > 2) {
      pages.push(constructEllipsis('dots-1'));
    }

    // Active page : page=currentPage
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(constructButton({ pageNumber: currentPage, isActive: true }));
    }

    // Ellipsis
    if (currentPage < totalPages - 1) {
      pages.push(constructEllipsis('dots-2'));
    }

    // Last page : page=totalPages
    pages.push(
      constructButton({
        pageNumber: totalPages,
        isActive: currentPage === totalPages,
      }),
    );
    return pages;
  };

  const { prevUrl, nextUrl } = constructPrevOrNext({
    curretPage: currentPage,
    pageCount: totalPages,
    pathname,
    search,
  });

  return (
    <div className={`${addClass || 'w-full'} mt-8`}>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem onClick={() => onPageChange(currentPage - 1)}>
              <PaginationPrevious to={prevUrl} />
            </PaginationItem>
          )}

          {renderPageButtons()}

          {totalPages > currentPage && (
            <PaginationItem onClick={() => onPageChange(currentPage + 1)}>
              <PaginationNext to={nextUrl} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default AppPaginationContainer;
