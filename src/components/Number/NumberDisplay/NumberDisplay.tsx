import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface NumberDisplayProps {
    value?: number | null;  
    precision?: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value, precision = 1 }) => {
    const formattedValue = value !== null && value !== undefined  && value.toFixed(precision) 

    if (value === null || value === undefined) {
        return  <Text style={{ color: '#d3d3d3', opacity: 0.3 }}>EMPTY</Text>
    }


    
    return (
        <Text style={{ color: '#FFFFFF' }}>
            {formattedValue}
        </Text>
    );
};

export default NumberDisplay;