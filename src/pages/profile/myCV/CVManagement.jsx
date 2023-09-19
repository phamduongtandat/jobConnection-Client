import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CVItem from './../../../components/myCV/CVItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../components/button/Button';
import useGetCVs from '../../../react-query/cv/useGetCVs';
import useGetAuthInfo from '../../../hooks/useGetAuthInfo';
import useConfirmModal from '../../../hooks/useConfirmModal';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useAddCV from '../../../react-query/cv/useAddCV';
import { storage } from '../../../config/firebase';


function CVManagement() {

    // useEffect((() => {

    //     setID(user)
    // }, []))
    //const [id, setID] = useState('')
    const [isShow, setIsShow] = useState(false)
    const addCVFormSchema = yup.object().shape({
        files: yup.mixed()
            .test('required', 'CV của bạn chưa được chọn', value => value && value.length)
            .test(
                "fileSize",
                "File đã hơn 100MB",
                value => value && value?.[0]?.size <= 104857600)
            .test(
                "fileFormat",
                "Định dạng file không được hỗ trợ",
                value => value && ["application/pdf", "image/jpg", "image/jpeg", "image/png", "text/plain"].includes(value?.[0]?.type)),
    })

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(addCVFormSchema)
    })

    const { user } = useGetAuthInfo();
    //const { _id } = user
    const { CVs } = useGetCVs(user?._id)
    const { isConfirmed } = useConfirmModal();
    const { addCV } = useAddCV(user?._id)


    const uploadCV = (data) => {
        const cvRef = ref(storage, `CV/${data?.files[0]?.name + new Date().getTime()}`)
        uploadBytes(cvRef, data?.files[0]).then(snap => {
            getDownloadURL(snap.ref).then(url => {
                const { name } = snap.ref
                addCV({ file: url, name: name })
            })
            reset({ files: '' })
            setIsShow(false)
        })
    }

    const onSubmit = async (data) => {
        const confirm = await isConfirmed({
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Thôi',
            title: 'Xác nhận',
            subTitle: `Bạn có đồng ý thêm CV này?`,
        });

        if (confirm) {
            uploadCV(data)
        }
    }


    return (

        <div className="flex flex-col items-center px-0  sm:px-16  bg-[#E5E5E5] min-h-screen">

            <div className="flex items-center  justify-between gap-7 lg:gap-72 m-7 font-bold text-2xl font-sans">

                <span>QUẢN LÝ CV CỦA BẠN</span>

                <div className='relative'>
                    <Button onClick={() => { setIsShow(!isShow) }}>Thêm CV</Button>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`w-[300px] sm:w-[350px] right-0 z-10 mt-2 p-7 border-green-400 border-double border-8 rounded-lg bg-white top-auto absolute space-y-3
                    ${isShow ? '' : 'hidden'}`}
                    >

                        {/* NỘP CV */}
                        <div className="grid grid-cols-1">

                            <label className="text-sm  font-bold text-gray-500 tracking-wide">

                                {!errors.files
                                    ? <span className={` bg-white ml-2 italic text-sm font-sans tracking-wide 
                                    ${!watch('files') || watch('files').length === 0
                                            ? 'text-white' : ' text-purple-700'}`} >
                                        Đã chọn CV : {watch('files')?.[0]?.name}
                                    </span>
                                    : <span className="ml-2 italic text-sm font-thin text-red-500 tracking-wide">{errors.files.message}</span>}
                            </label>

                            <div className="flex  items-center justify-center w-full">

                                <label className="rounded-lg border-4 border-dashed hover:border-indigo-400 w-full h-60 p-2  text-center">

                                    <div className="h-full flex flex-col  justify-center items-center w-full">

                                        <img className="hidden sm:block h-40 "
                                            src="https://ouch-cdn2.icons8.com/kditLtX6pnqoZKjXvYp-L9s2F-7ibmC_5m2k87X1lqg/rs:fit:256:226/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTc3/LzAxYTdiNjBlLWYz/NDUtNGEzYi04MGIw/LWQ3NDYzZmZiYjM3/MS5zdmc.png"
                                            alt="freepik image" />

                                        <input type='file'
                                            name='files'
                                            {...register('files')}
                                            hidden
                                            placeholder="Nhấn để chọn CV"
                                        />

                                        <div className="text-green-600 sm:text-lg p-2">
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
                                className="my-5 w-full flex justify-center items-center border gap-3 bg-blue-400 text-gray-100 p-3  rounded-2xl tracking-wide font-semibold focus:outline-none focus:shadow-outline  hover:border-green-600 hover:text-green-600 hover:bg-white shadow-lg cursor-pointer transition ease-in duration-300"
                            >

                                <span className="text-xl" >Gửi CV lên</span>
                            </button>

                        </div>
                    </form>
                </div>
                {/* <label className='  rounded-md p-2 bg-orange-200'>
                    <div className="text-green-600 p-2  cursor-pointer">
                        <i>Thêm CV</i>
                    </div>
                    <input type='file'
                        name='files'
                        {...register('files')}
                        hidden
                        placeholder="Nhấn để chọn CV"
                    />
                </label> */}



            </div>

            <CVItem CVs={CVs?.CVs} />
        </div>


    )
}

export default CVManagement
