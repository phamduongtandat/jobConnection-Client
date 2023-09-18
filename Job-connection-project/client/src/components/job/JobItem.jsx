import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import formatDate from './../../utils/formatDate';
function JobItem({ item, status }) {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
      <div className="flow-root">
        <ul className="divide-y divide-gray-200">
          <li className="p-3 sm:py-4 tracking-wide  hover:bg-base hover:rounded-t-xl">

            <div className="flex sm:flex-row flex-col sm:items-center space-x-4  ">
              <div className="flex-1 min-w-0 ">
                <div className="flex items-center gap-2 ">
                  <Link
                    to={`/jobs/${item._id}`}
                    className="text-xl font-extralight uppercase text-light "
                  >
                    {item.title}
                  </Link>

                  {status ? (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-1 py-0.5 rounded   ">
                      {status}
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <p className="text-sm uppercase leading-7 text-gray-500 ">
                  Tên doanh nghiệp {item.name}
                </p>

                <p className="text-sm flex gap-2 text-gray-500 ">
                  <span>
                    <FaMapMarkerAlt size={16} />
                  </span>
                  <span>{item.workLocation}</span>
                </p>

                <p className="text-sm font-medium leading-7 text-blue-400 ">
                  Mức lương: {item.salary.toLocaleString('vi-VN')} VNĐ
                </p>
              </div>

              <div className=" items-center italic font-semibold">
                <p className=" font-normal leading-8 uppercase text-gray-600 ">
                  {item.field}
                </p>

                <div className="text-sm  text-green-500 font-medium ">
                  Ngày đăng: {formatDate(item.createdAt, true)}
                </div>

                <div className="text-sm  text-red-300 font-medium ">
                  Hạn ứng tuyển: {formatDate(item.deadlineDate, true)}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default JobItem;
