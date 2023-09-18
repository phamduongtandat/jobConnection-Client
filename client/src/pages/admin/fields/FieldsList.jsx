import { useSearchParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import KeywordHighlighter from '../../../components/keywordHighlighter/KeywordHighlighter';
import Modal from '../../../components/modal/Modal';
import EditButton from '../../../components/table/EditButton';
import Pagination from '../../../components/table/Pagination';
import SearchBar from '../../../components/table/searchBar/SearchBar';
import useModal from '../../../hooks/useModal';
import useGetFields from '../../../react-query/fields/useGetFields';
import CreateOrUpdateFieldForm from './CreateOrUpdateFieldForm';
import formatDate from './../../../utils/formatDate';



const FieldsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize');
  const page = searchParams.getAll('page');
  const keyword = searchParams.get('keyword');
  

  const query = {
    page,
    pageSize: pageSize || 7,
    keyword,    
    searchBy: ['name'],
  };

  const { fields, pagination } = useGetFields({ query });
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
        <CreateOrUpdateFieldForm />
      </Modal>

      <Button onClick={openCreateUserModal} className="ml-auto block mb-6">
        Tạo mới lĩnh vực
      </Button>
      <div className="bg-white">
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-accent"><b>DANH SÁCH LĨNH VỰC</b></h1>          
          <SearchBar placeholder="Tìm lĩnh vực" />
        </div>
        <table className="shared-table ext border">
          <thead>
            <tr>
              <th>Tên lĩnh vực</th>
              <th>Người chịu trách nhiệm(ID)</th>
              <th>Ngày tạo</th>              
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {fields?.map((field) => (
              <tr className="hover:bg-gray-50" key={field._id}>
                
                <td>
                  <KeywordHighlighter
                    textToHighlight={field.name}
                    searchWords={[keyword]}
                  />
                </td>
                <td>
                  <KeywordHighlighter
                    textToHighlight={field.creator}
                    searchWords={[keyword]}
                  />
                </td>
                <td>
                  <KeywordHighlighter
                    textToHighlight={formatDate(field.updatedAt)}
                    searchWords={[keyword]}
                  />
                </td>                
                <td>
                  <div className="flex items-center justify-center gap-x-6">
                    <EditButton onClick={() => openUpdateUserModal(field._id)} />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};



export default FieldsTable;
