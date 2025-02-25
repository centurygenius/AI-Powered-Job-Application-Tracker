import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import "../CustomDatePicker.css"; // For additional styling

const CustomDatePicker = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    if (onChange) {
      onChange(date); // Pass the selected date to parent component
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center px-3 py-2 cursor-pointer bg-white -mt-1">
        
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="EEE, d MMM"
          className="focus:outline-none bg-transparent cursor-pointer border-none "
          popperClassName="custom-datepicker"
          calendarClassName="custom-calendar"
          showPopperArrow={false}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;