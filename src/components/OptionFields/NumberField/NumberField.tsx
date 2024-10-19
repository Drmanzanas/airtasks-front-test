import { Select, Form } from 'antd';

const { Option } = Select;

const PRECISIONS = [
    { label: '1 (1.0)', value: 1 },
    { label: '2 (1.00)', value: 2 },
    { label: '3 (1.000)', value: 3 },
    { label: '4 (1.0000)', value: 4 }
];

export const NumberField = () => {
    return (
        <Form.Item
            label="Decimal Places"
            name="precision"
            rules={[{ required: true, message: 'Please select a precision' }]}
        >
            <Select 
                placeholder="Select precision" 
                style={{ width: '100%' }}
            >
                {PRECISIONS.map((precision) => (
                    <Option key={precision.value} value={precision.value}>
                        {precision.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
}