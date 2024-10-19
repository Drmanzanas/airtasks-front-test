import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface OptionItem {
    label: string;
    color: string;
}

interface SingleSelectProps {
    value: string;
    options: OptionItem[];
    onChange: (value: string) => void;  
}

const SingleSelectInput: React.FC<SingleSelectProps> = ({ value, options, onChange }) => {
    return (
        <Select value={value} onChange={onChange} style={{ width: '100%' }}>
            {Array.isArray(options) && options.length > 0 && options.map(option => (
                <Option key={option.label} value={option.label}>
                    <span style={{ backgroundColor: option.color, padding: '0 8px', borderRadius: '4px' }}>
                        {option.label}
                    </span>
                </Option>
            ))}
        </Select>
    );
};

export default SingleSelectInput;