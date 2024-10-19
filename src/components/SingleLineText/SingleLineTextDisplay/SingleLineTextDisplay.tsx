import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface SingleLineTextDisplayProps {
    value: string;
}

const SingleLineTextDisplay: React.FC<SingleLineTextDisplayProps> = ({ value }) => {
    if (value === null || value === undefined || value === '') {
        return  <Text style={{ color: '#d3d3d3', opacity: 0.3 }}>EMPTY</Text>
    }

    return (
        <Text style={{ color: '#FFFFFF' }}>
            {value || '-'}
        </Text>
    );
};

export default SingleLineTextDisplay;