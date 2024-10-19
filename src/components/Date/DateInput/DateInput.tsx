import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface DateInputProps {
    value: string | null;
    dateFormat: string;
    onChange?: (value: string | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, dateFormat, onChange }) => {
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            onChange?.(date.format(dateFormat)); 
        } else {
            onChange?.(null);
        }
    };

    const formattedValue = value ? dayjs(value, dateFormat) : null;  

    return (
        <DatePicker
            value={formattedValue && formattedValue.isValid() ? formattedValue : null}
            format={dateFormat}
            onChange={handleDateChange}
            style={{ width: '100%' }}
        />
    );
};

export default DateInput;