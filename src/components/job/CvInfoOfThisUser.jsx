import React, { useRef, useState, useEffect } from 'react'
import { BsFillCloudSlashFill } from 'react-icons/bs';
import { MdOutlineQuickreply } from 'react-icons/md';


import { ref, deleteObject } from "firebase/storage";
import { storage } from '../../config/firebase';
//import useApplyForJob from '../../react-query/jobs/useApplyForJob';
import useConfirmModal from './../../hooks/useConfirmModal';
import { IoMdCalendar } from 'react-icons/io';
import formatDate from '../../utils/formatDate';
import useRemoveCV from './../../react-query/jobs/useRemoveCV';
import useGetCVs from '../../react-query/cv/useGetCVs';


function CvInfoOfThisUser({ jobID, info }) {
    const { CVs } = useGetCVs()
    const { removeCV } = useRemoveCV(jobID)
    let isExist = CVs?.CVs.some(i => i.name === info.fileName)

    const deleteFile = () => {

        if (isExist) {
            removeCV()
            return
        }

        const desertRef = ref(storage, `CV/${info.fileName}`);
        deleteObject(desertRef).then(() => {
            removeCV()
        }).catch(() => {
            removeCV()
        })
    }

    const { isConfirmed } = useConfirmModal();

    const onConfirm = async () => {
        const confirm = await isConfirmed({
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Thôi',
            title: 'Chúng tôi sẽ xóa ứng tuyển này của bạn',
            subTitle: `Bạn có đồng ý hủy yêu cầu không?`,
        });

        if (confirm) {
            deleteFile()
        }
    };

    //const { applyForJob } = useApplyForJob(jobDetail._id)

    return (
        <div className="sm:max-w-lg w-full bg-white rounded-xl z-10 border m-auto">

            <div className="sm:max-w-lg w-full p-7 bg-white rounded-xl z-10">

                {/* TIÊU ĐỀ */}
                <div className="text-center mb-3">
                    <h2 className="mt-5 text-2xl font-bold text-gray-900">
                        THÔNG TIN ỨNG TUYỂN CỦA BẠN
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Bên dưới là thông tin bạn đã ứng tuyển cho chúng tôi.</p>
                </div>

                <div className="">
                    <div className="flex gap-2 text-blue-500">
                        <span className="hidden sm:block "><IoMdCalendar color='blue' size={20} />
                        </span>Ngày ứng tuyển : <span className="text-gray-500">{formatDate(info?.createdAt, true)}</span>
                    </div>
                    <div className="flex gap-2 mt-2 text-green-500">
                        <span className="hidden sm:block "> <MdOutlineQuickreply color='green' size={20} />
                        </span>Phản hồi doanh nghiệp : <span className="text-gray-500">{info?.status}</span>
                    </div>
                </div>

                <div className="max-w-md pb-5 px-8 bg-white shadow-md rounded-lg my-16 border border-grey-500">
                    <div className="flex justify-center md:justify-end -mt-8 ">
                        <img className="w-14 h-14 object-cover rounded-full bg-amber-300 " src="https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/premium/chat-text-dynamic-premium.png" />
                    </div>
                    <div>
                        <h2 className="text-amber-400 text-sm md:text-3xl font-semibold">Ghi chú của bạn:</h2>
                        <p className="mt-2 text-gray-600">{info?.note}</p>
                    </div>
                </div>


                <div className="max-w-md h-32 px-8 bg-white shadow-md rounded-lg my-16 border border-grey-500 hover:border-dashed hover:border-4 " >
                    <a href={info?.file} target="_blank" >
                        <div className="flex justify-center md:justify-end -mt-8 ">
                            <img className="w-16 h-16 object-cover rounded-full p-1 bg-purple-400" src="https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/color/file-text-dynamic-color.png" />
                        </div>

                        <h2 className="text-purple-400 text-sm md:text-3xl font-semibold">CV của bạn:</h2>
                        <div className="mt-2 italic text-gray-600" >Bấm để xem CV của bạn</div>
                    </a>
                </div>


                <button
                    type="submit"
                    className="my-5 w-full flex justify-center items-center border gap-3 bg-blue-600 text-gray-100 p-3  rounded-2xl tracking-wide font-semibold focus:outline-none focus:shadow-outline  hover:border-red-600 hover:text-red-600 hover:bg-white shadow-lg cursor-pointer transition ease-in duration-300"
                    onClick={() => { onConfirm() }}
                >
                    <BsFillCloudSlashFill className="hidden sm:block" color='red' size={35} />
                    <span className="text-xl" >Hủy yêu cầu</span>
                </button>

            </div>

        </div>

    )
}

export default CvInfoOfThisUser



