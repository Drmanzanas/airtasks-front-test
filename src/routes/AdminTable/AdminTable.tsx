import { AgGridReact, CustomCellEditorProps, CustomCellRendererProps } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { useMemo, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { Button } from 'antd'; 
import { HeaderButton } from '../../components/HeaderButton/HeaderButton';
import { ColumnModal } from '../../components/ColumnModal/ColumnModal';
import { useColumns } from '../../hooks/useColumns/useColumns';
import cellEditors from '../../helpers/cellEditors/cellEditors';

interface IRow {
    title: string;
}

export const AdminTable = () => {
    const initialData = [
        { title: 'Record 1' },
        { title: 'Record 2' },
        { title: 'Record 3' }
    ]
    
    const [rowData, setRowData] = useState<IRow[]>(initialData);
    const { colDefs, addColumn, resetColumns } = useColumns();

    const lastColumn: ColDef = {
        headerComponent: () => <HeaderButton onClick={showModal} />,
        width: 200,
        suppressHeaderMenuButton: true, 
        sortable: false,
        editable: false
    };

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 200,
            editable: true
        };
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (name: string, type: string, options?: unknown) => {
        addColumn(name, type, options);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columnDefsWithRenderers = colDefs.map(col => {
        const editor = cellEditors.find(e => e.title === col.type);
        return {
            ...col,
            cellEditor: editor ? (params: CustomCellEditorProps) => editor.component(params) : undefined,
            cellRenderer: editor ? (params: CustomCellRendererProps) => editor.renderCell?.(params) : undefined
        };
    });

    const resetData = () => {
        setRowData([...initialData])
        resetColumns();
    };

    const handleAddNewRow = () => {
        const newRow = { title: `Record ${rowData.length + 1}` };
        setRowData(prevRowData => [...prevRowData, newRow]); 
    };

    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
                <Button onClick={resetData} type="default">
                    Reset Columns
                </Button>
                <Button onClick={handleAddNewRow} type="primary">
                    Add New Row
                </Button>
            </div>
            <div
                className="ag-theme-quartz-dark"
                style={{ width: '100%', height: '100%' }}
            >
                <AgGridReact 
                    rowData={rowData} 
                    columnDefs={[...columnDefsWithRenderers, lastColumn]} 
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                    suppressHorizontalScroll={false}
                    suppressColumnVirtualisation={false}
                />
            </div>
            <ColumnModal 
                open={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            />
        </>
    );
};