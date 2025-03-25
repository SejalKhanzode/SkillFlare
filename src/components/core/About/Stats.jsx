import React from 'react'
const Stats = [
  { count: "100+", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "5+", label: "Courses" },
  { count: "1+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <div className='bg-richblack-700'>
         <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
         <div className="grid grid-cols-2 md:grid-cols-4 text-center">
         {
        Stats.map((ele, index)=>{
          return(<>
            <div key={index} className='flex flex-col py-10'>
              <h1 className='font-bold text-3xl text-richblack-5'>{ele.count}</h1>
            
              <h2 className='font-semibold text-xl text-richblack-200'>{ele.label}</h2>
            </div>
          </>
          )
        })
        }
        </div>
      </div>
    </div>
  )
}

export default StatsComponent
