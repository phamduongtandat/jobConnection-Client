import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGetJobs from '../../react-query/jobs/useGetJobs';
import JobItem from '../../components/job/JobItem';
import Pagination from '../../components/table/Pagination';
import NoData from '../../components/job/NoData';

function AllJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize');
  const page = searchParams.getAll('page');
  const keyword = searchParams.get('keyword');
  const field = searchParams.get('field');
  const sort = searchParams.getAll('sort');
  const word = searchParams.get('word');

  let isActiveF = JSON.parse(localStorage.getItem('isActiveF'))

  useEffect(() => {
    if (isActiveF) {
      let fieldKey = JSON.parse(localStorage.getItem('fFilter')) || ''
      let sortBy = JSON.parse(localStorage.getItem('sFilter')) || 'deadlineDate'
      let order = JSON.parse(localStorage.getItem('oFilter')) || 'desc'
      let word = JSON.parse(localStorage.getItem('keyword')) || ''
      searchParams.set('word', word);
      searchParams.set('field', fieldKey);
      searchParams.set('sort', sortBy)
      searchParams.append('sort', order);
      setSearchParams(searchParams);
      localStorage.setItem('isActiveF', JSON.stringify(false))
    }

    setSearchParams(searchParams)

  }, [isActiveF])

  const query = {
    page,
    pageSize: pageSize || 7,
    keyword,
    searchBy: ['title', 'position'],
    field,
    sort,
    word
  };

  const { jobs, pagination } = useGetJobs({ query });
  return (

    <div>
      {jobs?.length === 0
        ? <NoData content='KHÔNG CÓ CÔNG VIỆC MÀ BẠN KIẾM' />
        : <div className="p-10">
          {jobs?.map((item) => (
            <JobItem key={item._id} item={item} />
          ))}
          <Pagination pagination={pagination} />
        </div>}
    </div>


  );
}

export default AllJobs;
