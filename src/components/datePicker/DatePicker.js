import React, { useState } from 'react';
import REACT_DATE_PICKER from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

export default function DatePicker(props) {
    const [startDate, setStartDate] = useState(new Date())

    const onChange = (_date) => {
        const date = _date || new Date();
        setStartDate(date);

        // Keep state logic seperate from parent
        // but with ability to do callback
        if (props.onChange) {
            props.onChange(date);
        }
    }

    return (
        <div className='date-picker'>
            <REACT_DATE_PICKER
                todayButton='TODAY'
                dateFormat='yyyy-MM-dd'
                selected={startDate}
                onSelect={onChange}
                className='date-picker__input'
                calendarClassName='date-picker__calendar'
            />
        </div>
    );
}