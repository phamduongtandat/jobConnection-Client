import { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({ placeholder }) => {
  const [showSearch, setshowSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current) return;
    const keyword = inputRef.current.value;
    if (!keyword) return;

    searchParams.set('keyword', keyword);
    setSearchParams(searchParams);
  };

  const handleHideSearch = () => {
    setshowSearch(false);
    searchParams.delete('keyword');
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={onSubmit} className={`flex-grow max-w-xl flex gap-x-3`}>
      <div className="flex-grow flex justify-end">
        {showSearch && (
          <input
            className="h-10 px-4 rounded-sm w-full border border-border focus:border-border-focus outline-none"
            type="text"
            placeholder={placeholder}
            ref={inputRef}
          />
        )}
        {!showSearch && (
          <button
            type="button"
            className="flex items-center justify-center h-10 aspect-square bg-base border border-gray-300 text-text rounded-r-sm"
            onClick={() => setshowSearch(true)}
          >
            <BsSearch />
          </button>
        )}
      </div>
      {showSearch && (
        <button type="button" onClick={handleHideSearch}>
          Ẩn
        </button>
      )}
    </form>
  );
};

export default SearchBar;
