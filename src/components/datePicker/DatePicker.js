import React, { useState } from 'react';
import REACT_DATE_PICKER from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker(props) {
    const [startDate, setStartDate] = useState(new Date())

    const onChange = (date) => {
        setStartDate(date);

        // Keep state logic seperate from parent
        // but with ability to do callback
        if (props.onChange) {
            props.onChange(date);
        }
    }

    return (
        <REACT_DATE_PICKER
            dateFormat='yyyy-MM-dd'
            selected={startDate}
            onChange={onChange}
        />
    );
}