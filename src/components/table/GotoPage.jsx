import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Gotopage({ currentPage, totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(currentPage);
  const [validPage, setValidPage] = useState(true);

  const submitHanlder = (e) => {
    e.preventDefault();

    if (page > 0 && page <= totalPages) {
      searchParams.set('page', page);
      setSearchParams(searchParams);
      setValidPage(true);
    } else {
      setValidPage(false);
    }
  };

  const onPageChangeHandler = (e) => {
    const newPage = +e.target.value;
    setValidPage(true);

    if (newPage > totalPages) {
      setPage(totalPages);
      return;
    }

    if (newPage < 0) {
      setPage(1);
      return;
    }

    if (newPage >= 0 && newPage <= totalPages) {
      setPage(newPage);
      return;
    }

    setPage(currentPage);
  };

  return (
    <form onSubmit={submitHanlder}>
      <span>Đi tới trang: </span>
      <input
        type="text"
        className={`w-14 h-7 border-2 rounded-sm text-center outline-none ${
          !validPage ? 'border border-red-400' : ''
        }`}
        min={0}
        max={totalPages}
        value={page}
        onChange={onPageChangeHandler}
      />
    </form>
  );
}

export default Gotopage;
