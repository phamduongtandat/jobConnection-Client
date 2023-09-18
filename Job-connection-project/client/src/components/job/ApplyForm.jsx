import React, { useRef, useState, useEffect } from 'react'
import { BsFillCloudSlashFill } from 'react-icons/bs';
import { IoMdCloudUpload } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { applyFormSchema } from '../../validation/applyForm.schema';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/firebase';
import useApplyForJob from '../../react-query/jobs/useApplyForJob';
import CvInfoOfThisUser from './CvInfoOfThisUser';
import useConfirmModal from './../../hooks/useConfirmModal';
function ApplyForm({ jobDetail }) {

    const { applyForJob } = useApplyForJob(jobDetail._id)


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(applyFormSchema)
    })

    const uploadCV = (data) => {
        const cvRef = ref(storage, `CV/${data?.files[0]?.name + new Date().getTime()}`)
        uploadBytes(cvRef, data?.files[0]).then(snap => {
            getDownloadURL(snap.ref).then(url => {
                const { name } = snap.ref
                applyForJob({ note: data?.note, file: url, fileName: name })
            })
            reset({ note: '', files: '' })
        })
    }
    const { isConfirmed } = useConfirmModal();
    const onSubmit = async (data) => {
        const confirm = await isConfirmed({
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Thôi',
            title: 'Xác nhận',
            subTitle: `Bạn có đồng ý ứng tuyển?`,
        });

        if (confirm) {
            uploadCV(data)
        }
    };




    // console.log(' watch:', watch('files'), watch('note'))
    // console.log('errors :', errors)

    return (
        <div className='m-7'>

            {/* NỀN */}
            <div className="relative min-h-screen flex items-center justify-center py-12 px-4 rounded-3xl bg-no-repeat bg-cover "
                style={
                    {
                        backgroundImage: 'url(https://img.freepik.com/free-psd/square-calendar-mockup-with-plant_1094-82.jpg?w=996&t=st=1689351773~exp=1689352373~hmac=6d67783f030db6f9379410c7fac64ee61e0ab4729c36904284edece769ff220f)'
                    }
                }
            >
                {/* LÀM MỜ */}
                <div className="absolute rounded-3xl bg-gray-400 opacity-60 inset-0 z-0" />

                {jobDetail?.isApplied ? <CvInfoOfThisUser jobID={jobDetail._id} info={jobDetail?.ApplicationOfThisUser} /> : <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">

                    {/* TIÊU ĐỀ */}
                    <div className="text-center">
                        <h2 className="mt-5 text-2xl font-bold text-gray-900">
                            {jobDetail?.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">Chúng tôi rất vui khi bạn ứng tuyển.</p>
                    </div>

                    {/* PHẦN FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3" >

                        {/* GHI CHÚ */}
                        <div className="grid grid-cols-1 space-y-2 mb-10">

                            <label className="text-sm font-bold text-gray-500 tracking-wide">
                                Ghi chú:
                                {!errors.note
                                    ? <span className="ml-2 italic text-xs font-thin text-gray-500 tracking-wide">{watch('note')?.length || 0}/1000</span>
                                    : <span className="ml-2 italic text-sm font-thin text-red-500 tracking-wide">{errors.note.message}</span>}
                            </label>

                            <textarea
                                name='note'
                                rows="3" cols="20"
                                maxLength={1000}
                                className=" p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                placeholder="Hãy để lại lời nhắn cho chúng tôi..."
                                {...register('note')}
                            />
                        </div>

                        {/* NỘP CV */}
                        <div className="grid grid-cols-1  space-y-2">

                            <label className="text-sm  font-bold text-gray-500 tracking-wide">
                                Nộp CV của bạn:
                                {!errors.files
                                    ? <span className={` bg-white ml-2 italic text-sm font-sans tracking-wide 
                                    ${!watch('files') || watch('files').length === 0 ? 'text-white' : ' text-purple-700'}`} >
                                        Đã chọn CV : {watch('files')?.[0]?.name}
                                    </span>
                                    : <span className="ml-2 italic text-sm font-thin text-red-500 tracking-wide">{errors.files.message}</span>}
                            </label>

                            <div className="flex  items-center justify-center w-full">

                                <label className="rounded-lg border-4 border-dashed hover:border-indigo-400 w-full h-60 p-2  text-center">

                                    <div className="h-full flex flex-col  justify-center items-center w-full">

                                        <img className="hidden sm:block h-40 "
                                            src="https://img.freepik.com/free-vector/cloud-connection-abstract-concept-illustration_335657-3873.jpg?w=826&t=st=1689411239~exp=1689411839~hmac=98ea91abf0fe7276613aea63f34871007eb6346a78dabdfda58caf6f42b1f698"
                                            alt="freepik image" />

                                        <input type='file'
                                            name='files'
                                            {...register('files')}
                                            hidden
                                            placeholder="Nhấn để chọn CV"
                                        />

                                        <div className="text-green-600 p-2">
                                            <i>Nhấn để chọn CV của bạn</i>
                                        </div>

                                    </div>
                                </label>


                            </div>
                        </div>

                        <p className="mb-7 text-sm text-gray-500">
                            <span>Chỉ hỗ trợ files: pdf, jpg, png, jpeg - file không quá 100MB</span>
                        </p>

                        {/* NÚT NHẤN */}
                        <div>

                            <button
                                type="submit"
                                className="my-5 w-full flex justify-center items-center border gap-3 bg-blue-600 text-gray-100 p-3  rounded-2xl tracking-wide font-semibold focus:outline-none focus:shadow-outline  hover:border-green-600 hover:text-green-600 hover:bg-white shadow-lg cursor-pointer transition ease-in duration-300"
                            >
                                <IoMdCloudUpload className="hidden sm:block" color='green' size={40} />
                                <span className="text-xl" >Gửi yêu cầu</span>
                            </button>

                        </div>
                    </form>
                </div>}
            </div>

        </div>

    )
}

export default ApplyForm
