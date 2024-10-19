import React from 'react';
import { InputNumber } from 'antd';

interface NumberInputProps {
    value?: number | null;  
    precision?: number;
    onChange?: (value: number | null) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ value = 0, precision, onChange }) => {

    return (
        <InputNumber
            value={value}
            onChange={onChange}
            precision={value !== 0 ? precision : undefined}  
            style={{ width: '100%' }}
        />
    );
};

export default NumberInput;