import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface CurrencyDisplayProps {
    value: number | null;
    precision?: number;
    currencyType: string;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ value, precision = 2, currencyType }) => {
    if (value === null || value === undefined) {
        return  <Text style={{ color: '#d3d3d3', opacity: 0.3 }}>EMPTY</Text>
    }

    const formattedValue = value.toFixed(precision);

    return (
        <Text style={{ color: '#FFFFFF' }}>
            {currencyType}{formattedValue}
        </Text>
    );
};

export default CurrencyDisplay;