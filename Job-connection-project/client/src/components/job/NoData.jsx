import React from 'react'

function NoData({ content }) {
    return (

        <div className=" flex flex-col items-center py-10 rounded-lg bg-white">

            <img
                className="opacity-50 bg-gradient-to-tr my-7 from-cyan-100 to-cyan-50 sm:w-1/3 w-1/2 rounded-full shadow-xl shadow-cyan-100"
                src="https://ouch-cdn2.icons8.com/12VI9PKkET2ZnXvraRq55jtMOBFtdTkHJBS2mm9jeMY/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzIw/L2I3NTlhYjcyLTE1/ZjgtNDA4MS1hYjE3/LTUyZTY2ZjllYWZi/MS5zdmc.png" alt="KHÔNG CÓ DỮ LIỆU"
            />
            <p className="text-xs md:text-2xl  font-semibold my-20 text-gray-400">{content}</p>

        </div>

    )
}


export default NoData
