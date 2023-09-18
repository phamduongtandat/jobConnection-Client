import React from 'react';
import { Route, Routes } from 'react-router-dom';

import JobTab from './../../components/layout/JobTab';

import AppliedJobs from './../profile/appliedJobs/AppliedJobs';
import AllJobs from './AllJobs';
import PostedJobs from './PostedJobs';

function JobListPage() {
  return (
    <div className="">
      <JobTab
        tab1="Danh sách việc làm"
        tab2="Công việc đã ứng tuyển"
        tab3="Công việc đã đăng"
        navi="job-list"
      >
        <Routes>
          <Route path="job-list" element={<AllJobs />} />
          <Route path="applied-jobs/:id" element={<AppliedJobs />} />
          <Route path="posted-jobs" element={<PostedJobs />} />
        </Routes>
      </JobTab>
    </div>
  );
}

export default JobListPage;
