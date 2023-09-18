import { Link, useSearchParams } from 'react-router-dom';
import KeywordHighlighter from '../../../components/keywordHighlighter/KeywordHighlighter';
import EditButton from '../../../components/table/EditButton';
import Pagination from '../../../components/table/Pagination';
import MultipleSelectFilter from '../../../components/table/multipleSelectFilter/MultipleSelectFilter';
import SearchBar from '../../../components/table/searchBar/SearchBar';
import useConfirmModal from '../../../hooks/useConfirmModal';
import useGetJobs from '../../../react-query/admin/useGetJobs';
import useUpdateJob from '../../../react-query/admin/useRemoveJob';
import formatDate from '../../../utils/formatDate';

const JobsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize');
  const page = searchParams.getAll('page');
  const keyword = searchParams.get('keyword');
  const account_type = searchParams.get('account_type');
  const { isConfirmed } = useConfirmModal();

  const query = {
    page,
    pageSize: pageSize || 7,
    keyword,
    account_type,
    searchBy: ['name', 'email'],
  };

  const { jobs, pagination, isLoading, isError } = useGetJobs({
    query,
  });
  const id = searchParams.get('id');

  const { removeJob } = useUpdateJob({ id });
  const removeStatusJob = async (id) => {
    searchParams.set('id', id);
    setSearchParams(searchParams);

    const confirm = await isConfirmed({
      confirmButtonText: 'Hoàn tất',
      cancelButtonText: 'Thôi',
      title: 'Xóa tin tuyển dụng này',
      subTitle: `Hãy xác nhận lại việc thay đổi trạng thái của tin tuyển dụng `,
    });
    if (confirm && id) {
      removeJob();
    }
  };

  return (
    <div className="px-16 py-6">
      <div className="bg-white">
        <div className="p-5 flex items-center justify-between">
          <MultipleSelectFilter
            fieldName="account_type"
            options={[
              { value: 'admin', name: 'Quản trị viên' },
              { value: 'business', name: 'Nhà tuyển dụng' },
              { value: 'personal', name: 'Người lao động' },
            ]}
          />
          <SearchBar placeholder="Tìm tin tuyển dụng theo title" />
        </div>

        <table className="shared-table border">
          <thead>
            <tr>
              <th>Tiêu đề tin</th>
              <th>Người đăng tin</th>
              <th>Ngày đăng - Hạn ứng tuyển</th>
              <th>Địa chỉ làm việc</th>
              <th>Lĩnh vực</th>
              <th>Trạng thái tin tuyển dụng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job) => (
              <tr className="hover:bg-gray-50" key={job._id}>
                <td>
                  <Link to={`/admin/jobs/${job._id}`}>
                    <KeywordHighlighter
                      textToHighlight={job.title}
                      searchWords={[keyword]}
                    />
                  </Link>
                </td>
                <td>{job.postedBy.name}</td>
                <td>{formatDate(job.createdAt, true)}</td>
                <td>{job.workLocation}</td>
                <td>{job.field}</td>
                <td>{job.status}</td>

                <td>
                  <div className="flex items-center justify-center gap-x-6">
                    <EditButton onClick={() => removeStatusJob(job._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && !jobs?.length && (
          <div className="py-12 px-6">
            {!keyword ? (
              ' Không thể tìm thấy danh sách tin ứng tuyển'
            ) : (
              <div>
                {' '}
                Không thể tìm thấy danh sách tin ứng tuyển dùng với từ khóa:{' '}
                <span className="bg-orange-400 text-white px-1">{keyword}</span>
              </div>
            )}
          </div>
        )}
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};

export default JobsTable;
