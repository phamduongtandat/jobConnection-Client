import React, { useState } from 'react';
import JobTab from '../../components/layout/JobTab';
import JobDetail from '../../components/job/JobDetail';
import useGetJobDetail from './../../react-query/jobs/useGetJobDetail';
import { useParams } from 'react-router-dom';
import ApplyForm from './../../components/job/ApplyForm';
import ApplicationForm from "../../components/job/ApplicationForm";

function JobDetailPage() {
  const [isSwitch, setIsSwitch] = useState(true);
  const { id } = useParams();
  const { jobDetail } = useGetJobDetail({ id });

  return (
    <div className="">
      <JobTab
        isSwitch={isSwitch}
        setIsSwitch={setIsSwitch}
        tab1="Chi tiết tuyển dụng"
        tab2="Ứng tuyển công việc"
        tab3="Danh sách ứng viên"
        tabAdmin="Danh sách ứng viên"
        button
      >
        {isSwitch ? (
          <JobDetail jobDetail={jobDetail} />
        ) : (
          // <ApplyForm jobDetail={jobDetail} />
          <ApplicationForm jobDetail={jobDetail} />
        )}
      </JobTab>
    </div>
  );
}

export default JobDetailPage;
