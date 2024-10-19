import { useState, useEffect } from 'react';
import { Button, Input, Space, Form, FormInstance } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export interface OptionItem {
    label: string;
    color: string;
}

export const SingleSelectField = ({ form }: { form: FormInstance }) => {
    const [newOption, setNewOption] = useState<string>('');
    const [newColor, setNewColor] = useState<string>('#ffffff');
    const [inputError, setInputError] = useState<boolean>(false);
    const [options, setOptions] = useState<OptionItem[]>([]);

    useEffect(() => {
        const formOptions = form.getFieldValue('options');
        if (Array.isArray(formOptions)) {
            setOptions(formOptions);
        }
    }, [form]);

    const handleAddOption = () => {
        if (newOption.trim() && newColor) {
            const updatedOptions = [...options, { label: newOption, color: newColor }];
            setOptions(updatedOptions); 
            form.setFieldsValue({ options: updatedOptions });
            setNewOption(''); 
            setNewColor('#ffffff');
            setInputError(false);
        } else {
            setInputError(true); 
        }
    };

    const handleDeleteOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        form.setFieldsValue({ options: updatedOptions });
    };

    return (
        <Form.Item
            label="Options"
            required
            validateFirst
            validateStatus={inputError ? 'error' : undefined}
            help={inputError ? 'Please add a valid option.' : undefined}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {options.length > 0 ? options.map((option, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                        <span style={{ backgroundColor: option.color, padding: '0 8px', borderRadius: '4px', marginRight: '4px'}}>
                            {option.label}
                        </span>
                        <CloseCircleOutlined
                            onClick={() => handleDeleteOption(index)}
                            style={{ color: 'red', cursor: 'pointer' }}
                        />
                    </div>
                )) : <span style={{ color: 'gray' }}>No options added yet</span>}

                <Form.Item name="options" hidden>
                    <Input />
                </Form.Item>

                <Space.Compact>
                    <Input
                        style={{ width: '60%', borderColor: inputError && !newOption ? 'red' : undefined }}
                        placeholder="Option label"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                    />
                    <Input
                        type="color"
                        style={{ width: '20%' }}
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                    />
                    <Button type="dashed" onClick={handleAddOption}>
                        Add Option
                    </Button>
                </Space.Compact>
            </Space>
        </Form.Item>
    );
};