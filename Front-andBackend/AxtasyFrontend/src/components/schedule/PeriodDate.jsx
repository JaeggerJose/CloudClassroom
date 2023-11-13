import React, {useState} from 'react'
import DatePicker from 'react-date-picker';


function PeriodDate() {
    const [value2,setDate] = useState(new Date());
    const [dateList, setDateList] = useState([])
    return (
        
            <DatePicker 
                onChange={(value) => {
                    setDate(value)
                        
                    setDateList(p => [...p, value.toLocaleDateString('en-US')]);
                    if (document.querySelector('.react-calendar__tile--active')) document.querySelector('.react-calendar__tile--active').style.backgroundColor = 'blue';

                }}
                value={value2}
                closeCalendar={false}
                isOpen={true}
                format="MM-dd"
                calendarClassName="xxx"
                onCalendarOpen={()=>{
                    // for (i of document.querySelectorAll('.react-calendar__navigation__arrow')){
                    //     i.addEventListener('click', () => )
                    // }
                }}
            />    
        
    )
}

export default PeriodDate