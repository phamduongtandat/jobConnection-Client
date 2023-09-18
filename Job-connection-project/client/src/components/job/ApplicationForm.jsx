import React, { useRef, useState, useEffect } from 'react'

import { IoMdCloudUpload } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { applyFormSchema, storeFormSchema } from '../../validation/applyForm.schema';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../config/firebase';
import useApplyForJob from '../../react-query/jobs/useApplyForJob';
import CvInfoOfThisUser from './CvInfoOfThisUser';
import useConfirmModal from './../../hooks/useConfirmModal';
import CVDropDown from '../myCV/CVDropDown';


function ApplicationForm({ jobDetail }) {
    const [isCVList, setIsCVList] = useState(false)
    const [isChose, setIsChose] = useState(false)

    const { applyForJob } = useApplyForJob(jobDetail._id)


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(isChose ? storeFormSchema : applyFormSchema)
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

    const uploadStoreCV = (data) => {
        const { name, file } = isChose
        applyForJob({ note: data?.note, file, fileName: name })
        reset({ note: '', files: '' })
        setIsChose(false)
    }

    const choseCV = ({ name, file }) => {
        setIsChose({ name, file })
        //console.log('choseCV :', { name, file })       
    }



    const { isConfirmed } = useConfirmModal();
    const onSubmit = async (data) => {
        const confirm = await isConfirmed({
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Thôi',
            title: 'Xác nhận',
            subTitle: `Bạn có đồng ý ứng tuyển?`,
        });

        if (confirm && !isChose) {
            uploadCV(data)
            return
        }

        if (confirm && isChose) {
            uploadStoreCV(data)
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
                                    : <span className="ml-2 italic text-sm font-thin text-red-500 tracking-wide">{errors?.note?.message}</span>}
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
                                {isChose ? '' : !errors.files
                                    ? <span className={` bg-white ml-2 italic text-sm font-sans tracking-wide 
                                    ${!watch('files') || watch('files').length === 0 ? 'text-white' : ' text-purple-700'}`} >
                                        Đã chọn CV : {watch('files')?.[0]?.name}
                                    </span>
                                    : <span className="ml-2 italic text-sm font-thin text-red-500 tracking-wide">{errors?.files?.message}</span>}
                            </label>

                            <div className="flex  items-center justify-center w-full">

                                <div className="rounded-lg border-4 border-dashed hover:border-indigo-400 w-full h-60 p-2  text-center bg-contain bg-no-repeat bg-center
                                bg-[url('https://img.freepik.com/free-vector/cloud-connection-abstract-concept-illustration_335657-3873.jpg?w=826&t=st=1689411239~exp=1689411839~hmac=98ea91abf0fe7276613aea63f34871007eb6346a78dabdfda58caf6f42b1f698')]">


                                    {/* MỤC TỪ KHO */}
                                    <div
                                        onClick={() => { setIsCVList(!isCVList) }}
                                        className={`
                                        relative cursor-pointer flex flex-col  justify-center items-center  border bg-gradient-to-bl from-yellow-200 via-yellow-200to-sky-200  w-full rounded-lg hover:font-semibold h-1/2
                                    hover:shadow-[5px_5px_10px_#a29374,-5px_-5px_10px_#dcc79c]`}>

                                        <div className="text-blue-500 lg:text-lg rounded-md p-2 ">
                                            <i>{`${isChose ? 'Nhấn bỏ chọn để lựa CV khác' : 'Nhấn chọn CV từ mục lưu trữ của bạn'}`}</i>
                                            {isChose && <div onClick={() => { setIsChose(false) }} className='cursor-pointer p-2 bg-red-200 rounded-2xl hover:bg-red-300'>Bỏ chọn</div>}
                                        </div>

                                        <CVDropDown
                                            choseCV={choseCV}
                                            isCVList={isCVList}
                                        />

                                    </div>


                                    {/* MỤC TỪ MÁY */}
                                    <label className={`${isChose ? 'bg-white' : ''} 
                                    cursor-pointer h-1/2   flex flex-col  justify-center items-center w-full border bg-gradient-to-tl from-yellow-200 via-yellow-200to-sky-200 rounded-lg hover:font-semibold
                                    hover:shadow-[5px_5px_10px_#a29374,-5px_-5px_10px_#dcc79c]`}>


                                        {isChose ? <div className="text-blue-500  lg:text-lg p-2">
                                            <h2 className='text-black'>Bạn đã chọn CV có tên:</h2>
                                            <i>{isChose.name}</i>

                                        </div>
                                            : <div>
                                                <input type='file'
                                                    name='files'
                                                    {...register('files')}
                                                    hidden
                                                    placeholder="Nhấn để chọn CV"
                                                />

                                                <div className="text-blue-500  lg:text-lg p-2">
                                                    <i>Nhấn chọn CV từ máy của bạn</i>
                                                </div>
                                            </div>}

                                    </label>

                                </div>


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

export default ApplicationForm
