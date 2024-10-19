import { Select, Input, Row, Col, Form } from 'antd';

const { Option } = Select;

const PRECISIONS = [
    { label: '0 (1)', value: 0 },
    { label: '1 (1.0)', value: 1 },
    { label: '2 (1.00)', value: 2 },
    { label: '3 (1.000)', value: 3 },
    { label: '4 (1.0000)', value: 4 }
];

export const CurrencyField = () => {
    return (
        <Row gutter={16} align="middle">
            <Col span={12}>
                <Form.Item
                    label="Decimal Places"
                    name="precision"
                    rules={[{ required: true, message: 'Please select precision' }]}
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
            </Col>
            <Col span={12}>
                <Form.Item
                    label="Currency Type"
                    name="currencyType"
                    rules={[{ required: true, message: 'Please enter a currency type' }]}
                >
                    <Input placeholder="Enter currency symbol" />
                </Form.Item>
            </Col>
        </Row>
    );
};