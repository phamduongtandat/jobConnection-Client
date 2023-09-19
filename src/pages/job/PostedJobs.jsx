import JobItem from '../../components/job/JobItem';
import Pagination from '../../components/table/Pagination';
import useGetPostedJobs from '../../react-query/jobs/useGetPostedJobs';

const PostedJobs = () => {
  const { data: postedJobs, pagination } = useGetPostedJobs();

  return (
    <div>
      {postedJobs?.map((job) => (
        <JobItem key={job._id} item={job} />
      ))}
      <Pagination pagination={pagination} />
    </div>
  );
};

export default PostedJobs;
