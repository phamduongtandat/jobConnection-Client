import React from 'react';
import { BsBookmarkHeart, BsCalendar3 } from 'react-icons/bs';
import { GiModernCity, GiMoneyStack } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { SiLevelsdotfyi } from 'react-icons/si';
import formatDate from './../../utils/formatDate';

function JobDetail({ jobDetail }) {
  //   const { id } = useParams();
  //   const { jobDetail } = useGetJobDetail({ id });

  return (
    <div className="m-7">
      <div className="mb-16">
        <h1 className="flex items-center gap-2 leading-relaxed tracking-wide text-gray-700 ml-2  text-5xl ">
          {jobDetail?.title}
          {jobDetail?.isApplied && (
            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded  ">
              Đã ứng tuyển
            </span>
          )}
        </h1>
        <div className="flex gap-2 ml-7">
          <GiModernCity color="orange" size={21} />
          <span>Địa điểm làm việc:</span>
          <span className="italic ml-2">{jobDetail?.workLocation}</span>
        </div>
      </div>

      <div className=" border  p-7 rounded-lg">
        <div className="flex flex-col md:flex-row sm:justify-around ">
          <div className="mb-7 sm:mb-0">
            <div className="flex gap-2 mb-7 items-center">
              <BsCalendar3 color="blue" size={20} />
              Ngày đăng:
              <span className="ml-auto">
                {formatDate(jobDetail?.createdAt, true)}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <BsBookmarkHeart color="purple" size={22} />
              Lĩnh vực ứng tuyển:
              <span className="ml-auto">{jobDetail?.field}</span>
            </div>
          </div>
          <div className="mb-7 sm:mb-0">
            <div className="flex mb-7 gap-2 items-center">
              <BsCalendar3 color="red" size={20} />
              Hạn tuyển:
              <span className="ml-auto">
                {formatDate(jobDetail?.deadlineDate, true)}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <SiLevelsdotfyi color="gray" size={18} />
              Vị trí làm việc:
              <span className="ml-auto">{jobDetail?.position}</span>
            </div>
          </div>
          <div>
            <div className="flex mb-7 gap-2 items-center">
              <HiUserGroup color="pink" size={20} />
              Số lượng ứng viên:
              <span className="ml-auto">{jobDetail?.numberApplicants}</span>
            </div>
            <div className="flex gap-2 items-center">
              <GiMoneyStack color="green" size={27} />
              Mức lương:
              <span className="ml-auto">
                {jobDetail?.salary.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mx-14 mt-16 mb-7 text-2xl text-gray-900 font-extralight">
        MÔ TẢ CÔNG VIỆC:
      </h2>
      <div className="mx-14 tracking-wide ">{jobDetail?.description}</div>
    </div>
  );
}

export default JobDetail;
