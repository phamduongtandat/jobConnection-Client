import { useSearchParams } from 'react-router-dom';

function PaginationItem({ pageNum, currentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickHandler = () => {
    if (pageNum === '...') return;
    searchParams.set('page', pageNum);
    setSearchParams(searchParams);
  };

  return (
    <button
      onClick={onClickHandler}
      className={`text-paragraph w-9 text-sm aspect-square rounded-full hover:bg-primary hover:text-white ${currentPage == pageNum ? 'bg-primary text-white' : ''
        }`}
    >
      {pageNum}
    </button>
  );
}

export { PaginationItem };
