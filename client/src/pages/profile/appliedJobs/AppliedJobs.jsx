import { Link, useParams, useSearchParams } from "react-router-dom";

import useGetAppliedJobs from "./../../../react-query/jobs/useGetAppliedJobs";

import JobItem from "../../../components/job/JobItem";
import Pagination from "../../../components/table/Pagination";
import NoData from "../../../components/job/NoData";

const AppliedJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize');
  const page = searchParams.getAll('page');
  const keyword = searchParams.get('keyword');

  const query = {
    page,
    pageSize: pageSize || 7,
    keyword,

  };

  const { id } = useParams();
  const { appliedJobs, pagination } = useGetAppliedJobs({ id, query });
  return (
    <div>
      {appliedJobs?.length === 0 ? <NoData content='BẠN CHƯA ỨNG TUYỂN CÔNG VIỆC NÀO' />
        : <div className="p-10">
          {appliedJobs?.map((item) => (
            <JobItem
              key={item._id}
              status={item.candidateList.filter((x) => x.user === id)[0]?.status}
              item={item}
            />
          ))}
          <Pagination pagination={pagination} />
        </div>
      }

    </div>

  );
};

export default AppliedJobs;
