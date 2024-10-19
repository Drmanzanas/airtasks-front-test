import React from 'react';
import { Tag, Typography } from 'antd'; 

const { Text } = Typography;

interface OptionItem {
    label: string;
    color: string;
}

interface SingleSelectDisplayProps {
    value: string;
    options: OptionItem[];
}

const SingleSelectDisplay: React.FC<SingleSelectDisplayProps> = ({ value, options }) => {
    const hasValidOptions = Array.isArray(options) && options.some(option => option && Object.keys(option).length > 0);
    const selectedOption = hasValidOptions ? options.find(option => option.label === value) : null;

    if (value === null || value === undefined) {
        return  <Text style={{ color: '#d3d3d3', opacity: 0.3 }}>EMPTY</Text>
    }

    return (
        <div>
            {selectedOption ? (
                <Tag color={selectedOption.color} style={{ padding: '0 8px' }}>
                    {selectedOption.label}
                </Tag>
            ) : (
                <Tag>{value}</Tag>
            )}
        </div>
    );
};

export default SingleSelectDisplay;