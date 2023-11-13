import React from 'react'
import Calendar from 'react-calendar'
import DatePicker from 'react-date-picker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';


function About() {
    const [date, setDate] = React.useState();
    const pick = date => {
        setDate(date)
    }
  
    return (
        <div className="about">
            <div className="cal-1">
                <Calendar
                    selectRange={true}
                    onChange={pick}
                    // onClickDay={onClickDay}
                    // onDrillDown={onDrillDown}
                    x={date}
                />
            </div>
            {/* <h3>{date.toString()}</h3> */}
            <div className="cal-2">
                <DatePicker onChange={pick} selectRange={true} returnValue="range"  value={date}/>
            </div>
            <div className="cal-2">
                <DateRangePicker onChange={pick} selectRange={true} returnValue="range"  value={date}/>
            </div>
            <p>{process.env.REACT_APP_HOST}</p>
            <p>{process.env.NODE_ENV}</p>
            <p>{process.env.REACT_APP_LOGIN}</p>
        </div>
    )
}

export default About