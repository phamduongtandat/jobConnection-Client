import { getPagesArray } from '../../utils/getPagesArray';
import Gotopage from './GotoPage';
import { PaginationItem } from './PaginationItem';

function Pagination({ pagination }) {
  let totalPages = pagination?.totalPages;
  let pageSize = pagination?.pageSize || 10;
  let currentPage = pagination?.currentPage;
  let matchingResults = pagination?.matchingResults;
  let returnedResults = pagination?.returnedResults || 0;

  if (!totalPages || !currentPage) return null;

  const pagesArray = getPagesArray(currentPage, totalPages);

  return (
    <div className="pt-8 pb-6 flex justify-between items-center px-3">
      <div>
        <Gotopage currentPage={currentPage} totalPages={totalPages} />
      </div>
      <div className="flex gap-x-2">
        {pagesArray.map((page, index) => (
          <PaginationItem
            key={index}
            pageNum={page}
            currentPage={currentPage}
          />
        ))}
      </div>
      <div>
        <p className="text-gray-500 text-md">
          Kết quả: {pageSize * (currentPage - 1) + 1}-
          {pageSize * (currentPage - 1) + returnedResults} trong{' '}
          {matchingResults}
        </p>
      </div>
    </div>
  );
}

export default Pagination;
