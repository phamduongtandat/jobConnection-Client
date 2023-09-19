import { useSearchParams } from 'react-router-dom';
import Avatar from '../../../components/avatar/Avatar';
import Button from '../../../components/button/Button';
import KeywordHighlighter from '../../../components/keywordHighlighter/KeywordHighlighter';
import Modal from '../../../components/modal/Modal';
import EditButton from '../../../components/table/EditButton';
import Pagination from '../../../components/table/Pagination';
import MultipleSelectFilter from '../../../components/table/multipleSelectFilter/MultipleSelectFilter';
import SearchBar from '../../../components/table/searchBar/SearchBar';
import useModal from '../../../hooks/useModal';
import useGetUsers from '../../../react-query/users/useGetUsers';
import getAccountType from '../../../utils/getAccountType';
import CreateOrUpdateUserForm from './CreateOrUpdateUserForm';
import ToggleUserStatusBtn from './ToggleUserStatusBtn';

const UsersTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize');
  const page = searchParams.getAll('page');
  const keyword = searchParams.get('keyword');
  const account_type = searchParams.get('account_type');

  const query = {
    page,
    pageSize: pageSize || 7,
    keyword,
    account_type,
    searchBy: ['name', 'email'],
  };

  const { users, pagination, isLoading, isError } = useGetUsers({ query });
  const { openCreateOrUpdateUserModal } = useModal();

  const openUpdateUserModal = (id) => {
    searchParams.set('id', id);
    setSearchParams(searchParams);
    openCreateOrUpdateUserModal();
  };

  const openCreateUserModal = () => openCreateOrUpdateUserModal();

  return (
    <div className="px-16 py-6">
      <Modal modalName="create_or_update_user">
        <CreateOrUpdateUserForm />
      </Modal>

      <Button onClick={openCreateUserModal} className="ml-auto block mb-6">
        Tạo mới tài khoản
      </Button>
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
          <SearchBar placeholder="Tìm người dùng theo tên hoặc email" />
        </div>

        <table className="shared-table border">
          <thead>
            <tr>
              <th>Ảnh đại diện</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Loại tài khoản</th>
              <th>Trạng thái tài khoản</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr className="hover:bg-gray-50" key={user._id}>
                <td className="text-center">
                  <Avatar className="!w-10 uppercase" />
                </td>
                <td>
                  <KeywordHighlighter
                    textToHighlight={user.name}
                    searchWords={[keyword]}
                  />
                </td>
                <td>
                  <KeywordHighlighter
                    textToHighlight={user.email}
                    searchWords={[keyword]}
                  />
                </td>
                <td>{user.phone}</td>
                <td>{getAccountType(user.role, user.account_type)}</td>
                <td className="">
                  <ToggleUserStatusBtn
                    status={user.status}
                    userId={user._id}
                    role={user.role}
                  />
                </td>
                <td>
                  <div className="flex items-center justify-center gap-x-6">
                    <EditButton onClick={() => openUpdateUserModal(user._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && !users?.length && (
          <div className="py-12 px-6">
            {!keyword ? (
              ' Không thể tìm thấy danh sách người dùng'
            ) : (
              <div>
                {' '}
                Không thể tìm thấy danh sách người dùng với từ khóa:{' '}
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

export default UsersTable;
