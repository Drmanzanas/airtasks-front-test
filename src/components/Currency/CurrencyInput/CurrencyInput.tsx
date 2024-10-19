import React from 'react';
import { InputNumber } from 'antd';

interface CurrencyInputProps {
    value: number | null;
    precision: number;
    currencyType: string;
    onChange?: (value: number | null) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, precision, currencyType, onChange }) => {
    return (
        <InputNumber
            value={value}
            onChange={onChange}
            precision={precision} 
            style={{ width: '100%' }}
            prefix={currencyType}
        />
    );
};

export default CurrencyInput;