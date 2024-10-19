import { Select, Form } from 'antd';

const { Option } = Select;

const DATE_FORMATS = [
    { label: 'Friendly (MMM DD, YYYY)', value: 'MMM DD, YYYY' },
    { label: 'US (MM/DD/YYYY)', value: 'MM/DD/YYYY' },
    { label: 'Europe (DD/MM/YYYY)', value: 'DD/MM/YYYY' },
    { label: 'ISO (YYYY-MM-DD)', value: 'YYYY-MM-DD' }
];

export const DateField = () => {
    return (
        <Form.Item
            label="Date Format"
            name="dateFormat"
            rules={[{ required: true, message: 'Please select a date format' }]}
        >
            <Select 
                placeholder="Select a date format" 
                style={{ width: '100%' }}
            >
                {DATE_FORMATS.map((format) => (
                    <Option key={format.value} value={format.value}>
                        {format.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};