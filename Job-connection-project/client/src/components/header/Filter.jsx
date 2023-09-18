import React from 'react'
import Button from '../button/Button';
import FieldFilter from './FieldFilter';
import OrderFilter from './OrderFilter';
import SortFilter from './SortFilter';
import { useSearchParams, useNavigate } from 'react-router-dom';
function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navi = useNavigate()
    const handleAdvancedSearch = () => {
        // let fieldKey = JSON.parse(localStorage.getItem('fFilter')) || ''
        // let sortBy = JSON.parse(localStorage.getItem('sFilter')) || 'deadlineDate'
        // let order = JSON.parse(localStorage.getItem('oFilter')) || 'desc'
        localStorage.setItem('isActiveF', JSON.stringify(true))
        // searchParams.set('field', fieldKey);
        // searchParams.set('sort', sortBy)
        // searchParams.append('sort', order);
        // setSearchParams(searchParams);
        // navi(`/jobs/all-jobs/job-list?${searchParams}`)
        navi(`/jobs/all-jobs/job-list`)
        //console.log(fieldKey, sortBy, order)
    }



    return (
        <div className=' sm:mx-7   lg:flex md:items-center md:gap-10 md:justify-around'>
            <FieldFilter />
            <SortFilter />
            <OrderFilter />
            <div onClick={handleAdvancedSearch}
                className="mb-2 lg:mb-0"
            >
                <Button className="w-full  bg-teal-200"><span className="text-green-800">Lọc</span></Button></div>
        </div>
    )
}

export default Filter
