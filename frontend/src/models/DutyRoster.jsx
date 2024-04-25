import React from 'react'

const DutyRoster = () => {
    const times = [
        '8:00 AM - 9:00 AM',
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
      ];
    
      const days = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
  return (
    <div className='flex flex-col justify-center items-center mt-10 '>
        <div className='flex-col'>
            <div className=''>
                <h1 className='text-2xl font-semibold mb-4'>Duty Roster</h1>
            </div>
            <div className="overflow-x-auto">
      <div className="grid grid-cols-8 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-teal-500 text-white font-semibold py-2 px-4">
            {day}
          </div>
        ))}

        {times.map((time, index) => (
          <React.Fragment key={index}>
            <div className="border py-2 px-4">{time}</div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="border"></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>

        </div>
        <div className='flex-col'>
           <div className=''>
                <h1 className='text-2xl font-semibold'>Namaz</h1>
           </div>
           <div>
     
            

           </div>

        </div>

    </div>
  )
}

export default DutyRoster