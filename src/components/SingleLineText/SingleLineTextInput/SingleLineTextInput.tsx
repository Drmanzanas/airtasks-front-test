import React, { memo, useEffect, useRef } from 'react';
import { CustomCellEditorProps, useGridCellEditor } from 'ag-grid-react';
import { Input } from 'antd';
import type { InputRef } from 'antd'; 

const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';
const KEY_ESCAPE = 'Escape';

const SingleLineTextInput = memo((props: CustomCellEditorProps) => {
    const refInput = useRef<InputRef>(null); 

    const { value, stopEditing, onValueChange, eventKey } = props;

    const updateValue = (val: string) => {
        onValueChange(val);
    };

    useEffect(() => {
        const eInput = refInput.current?.input;
        if (eInput) {
            eInput.focus();
            eInput.select();
        }
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onKeyDown = (event: any) => {
        if (event.key === KEY_ENTER || event.key === KEY_TAB) {
            stopEditing();
        } else if (event.key === KEY_ESCAPE) {
            stopEditing(true);
        }
    };

    useGridCellEditor({
        isCancelBeforeStart: () => {
            return !!eventKey && eventKey.length === 1 && !/^[a-zA-Z0-9\s]$/.test(eventKey);
        },
    });

    return (
        <Input
            ref={refInput} 
            defaultValue={value}
            onChange={(e) => updateValue(e.target.value)}
            onKeyDown={onKeyDown}
        />
    );
});

export default SingleLineTextInput;