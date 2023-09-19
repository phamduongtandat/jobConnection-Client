import { Route, Routes } from 'react-router-dom';
import SectionContainer from '../../components/container/SectionContainer';
import RequireLogin from '../../components/hoc/RequireLogin';
import LinkNotFound from '../../components/linkNotFound/LinkNotFound';
import ProfilePageNav from './ProfilePageNav';
import UpdateCurrentUserInfo from './UpdateCurrentUserInfo';
import UpdatePassword from './UpdatePassword';
import AppliedJobs from './appliedJobs/AppliedJobs';

const ProfilePage = () => {
  return (
    <RequireLogin>
      <SectionContainer
        wrapperClassName="bg-base py-10 min-h-screen"
        className="flex gap-x-12"
      >
        <ProfilePageNav />
        <div className="bg-white flex-grow p-6 rounded-sm">
          <Routes>
            <Route path="user-info" element={<UpdateCurrentUserInfo />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="*" element={<LinkNotFound />} />
            <Route path="applied-jobs/:id" element={<AppliedJobs />} />
          </Routes>
        </div>
        {/* <Notification /> */}
      </SectionContainer>
    </RequireLogin>
  );
};

export default ProfilePage;
