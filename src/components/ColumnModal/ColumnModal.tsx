import { Modal, Select, Input, Row, Col, Space, Form } from 'antd';
import { FieldNumberOutlined, CalendarOutlined, DollarCircleOutlined, FileTextOutlined, BarsOutlined } from '@ant-design/icons'; 
import { useEffect, useState } from 'react';
import cellEditors from '../../helpers/cellEditors/cellEditors';


interface FormValues {
    columnType?: string;
    [key: string]: unknown;
}
const { Option } = Select;

const COLUMN_TYPES = [
    { label: 'Single Line Text', value: 'SingleLineText', icon: <FileTextOutlined /> },
    { label: 'Single Select', value: 'SingleSelect', icon: <BarsOutlined /> },
    { label: 'Number', value: 'Number', icon: <FieldNumberOutlined /> },
    { label: 'Currency', value: 'Currency', icon: <DollarCircleOutlined /> },
    { label: 'Date', value: 'Date', icon: <CalendarOutlined /> }
];

export const ColumnModal = ({ open, onOk, onCancel }: 
    { open: boolean, 
      onOk: (name: string, type: string, options?: Record<string, unknown> | null) => void,  
      onCancel:() => void }) => {

    const [form] = Form.useForm();
    const [columnType, setColumnType] = useState<string>('SingleLineText');

    const handleColumnTypeChange = (value: string) => {
        setColumnType(value);
        form.setFieldsValue({ options: {} });
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            const { columnName, columnType, ...options } = values
          
            const filteredOptions = Object.fromEntries(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                Object.entries(options).filter(([_, v]) => v !== undefined)
            );
            onOk(columnName, columnType, Object.keys(filteredOptions).length > 0 ? filteredOptions : null);
            form.resetFields();
        });
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    const renderAdditionalFields = () => {
        const editor = cellEditors.find(editor => editor.title === columnType);
        return editor && editor.renderOptions ? editor.renderOptions(form) : null;
    };

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setColumnType('SingleLineText');
        }
    }, [open]);

    const onFormValuesChange = (changedValues: Partial<FormValues>) => {
        if (changedValues.columnType) {
            setColumnType(changedValues.columnType);
        }
    };

    return (
        <Modal open={open} onOk={handleOk} onCancel={handleCancel} title="Add Field" centered>
            <Form form={form} layout="vertical" onValuesChange={onFormValuesChange}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Space direction="vertical" style={{ width: '100%' }} size="middle">
                            <Form.Item
                                label="Field title"
                                name="columnName"
                                rules={[{ required: true, message: 'Please enter a field title' }]}
                            >
                                <Input placeholder="Enter column name" />
                            </Form.Item>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <Space direction="vertical" style={{ width: '100%' }} size="middle">
                            <Form.Item
                                label="Field type"
                                name="columnType"
                                rules={[{ required: true, message: 'Please select a field type' }]}
                                initialValue="SingleLineText"
                            >
                                <Select onChange={handleColumnTypeChange} style={{ width: '100%' }}>
                                    {COLUMN_TYPES.map(type => (
                                        <Option key={type.value} value={type.value}>
                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                {type.icon} <span style={{ marginLeft: '8px' }}>{type.label}</span>
                                            </span>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '16px' }}>
                    <Col span={24}>
                        {renderAdditionalFields()}
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};