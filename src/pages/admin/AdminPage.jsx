import { Route, Routes } from 'react-router-dom';
import DirectChatContainer from '../../components/chat/DirectChatContainer';
import RequireAdmin from '../../components/hoc/RequireAdmin';
import RequireLogin from '../../components/hoc/RequireLogin';
import LinkNotFound from '../../components/linkNotFound/LinkNotFound';
import FieldsList from './fields/FieldsList';
import JobsList from './jobs/JobsList';
import UsersList from './users/UsersList';
import AppliedJobs from '../profile/appliedJobs/AppliedJobs';
import JobDetailPage from '../job/JobDetailPage';

const ProfilePage = () => {
  return (
    <RequireLogin>
      <RequireAdmin>
        <div className="bg-base min-h-screen">
          <div className="flex-grow rounded-sm">
            <Routes>
              <Route path="users" element={<UsersList />} />
              <Route path="fields" element={<FieldsList />} />
              <Route path="jobs" element={<JobsList />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />

              <Route
                path="messages/direct/*"
                element={<DirectChatContainer />}
              />
              <Route
                path="messages/pending/*"
                element={<DirectChatContainer />}
              />
              <Route path="*" element={<LinkNotFound />} />
            </Routes>
          </div>
        </div>
      </RequireAdmin>
    </RequireLogin>
  );
};

export default ProfilePage;
