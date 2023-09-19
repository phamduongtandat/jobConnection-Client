import React, { useState } from 'react'
import useGetAllFields from '../../react-query/fields/useGetAllFields'

function FieldFilter() {
    const [isShow, setIsShow] = useState(false)
    const [selectedF, setselectedF] = useState('')
    const { allFields } = useGetAllFields()

    return (

        <div className="relative z-10 flex flex-col gap-2 ">
            {/* Khung bao input và dấu */}
            <div className=" my-2 flex rounded border border-gray-200 bg-white p-1">

                <input
                    maxLength={30}
                    value={JSON.parse(localStorage.getItem('fFilter')) || selectedF}
                    onChange={(e) => {
                        setIsShow(true)
                        setselectedF(e.target.value)
                    }}
                    className="w-full  appearance-none p-1 px-2 text-gray-800 outline-none"
                    placeholder='Chọn hoặc gõ lĩnh vực'
                />
                {/* Dấu mũi tên */}
                <div className={`bg-teal-200 flex w-8 items-center rounded-md hover:rotate-180  py-1 pl-2 pr-1 ${isShow ? 'rotate-180' : ''}`}
                    onClick={() => {
                        localStorage.removeItem('fFilter')
                        setselectedF('')
                        setIsShow(!isShow)
                    }}
                >
                    <button className="h-6 w-6 cursor-pointer text-gray-600 outline-none focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up h-4 w-4">
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Khung Option */}
            <div className={`absolute top-full w-full h-60 overflow-y-auto rounded-md drop-shadow-lg small-scrollbar
            ${isShow ? '' : 'hidden'}`}>
                <div className="flex  flex-col">

                    {allFields?.filter(f => f.name?.toLowerCase().includes(selectedF?.toLowerCase())).map(field => {
                        return (
                            <div
                                key={field._id}
                                className="w-full cursor-pointer border-b border-gray-100 hover:bg-teal-100"
                                onClick={() => {
                                    localStorage.setItem('fFilter', JSON.stringify(field.name))
                                    setselectedF((pre) => { return field.name })
                                    setIsShow(!isShow)
                                }}
                            >
                                <div className="relative flex w-full items-center border-l-2 border-teal-600 border-transparent bg-white p-2 pl-2 hover:bg-teal-600 hover:text-teal-100">
                                    <div className="flex w-full items-center">
                                        <div className="mx-2 leading-6"
                                        >{field.name}</div>
                                    </div>
                                </div>
                            </div>)
                    })}


                </div>
            </div>
        </div>







    )
}

export default FieldFilter
