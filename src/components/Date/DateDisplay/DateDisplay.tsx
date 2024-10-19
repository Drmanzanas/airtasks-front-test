import React from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;

interface DateDisplayProps {
    value: string | null;
    dateFormat: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ value, dateFormat }) => {

    const formattedDate = value && dayjs(value, dateFormat).isValid()
        ? dayjs(value, dateFormat).format(dateFormat)
        : <Text style={{ color: '#d3d3d3', opacity: 0.3 }}>EMPTY</Text>;

    return (
        <Text style={{ color: '#FFFFFF' }}>
            {formattedDate}
        </Text>
    );
};

export default DateDisplay;