import { ColDef } from 'ag-grid-community';

interface ColumnOptions {
  [key: string]: unknown;
}

interface StoredColumn {
  name: string;
  type: string;
  options?: ColumnOptions;
}

export const getColumnsFromStorage = (): ColDef[] => {
    const storedColumns: StoredColumn[] = JSON.parse(localStorage.getItem('columns') || '[]');

    const initialColDefs: ColDef[] = [
        { field: 'title', headerName: 'Title', type: 'SingleLineText', pinned: 'left' }
    ];

    const enhancedColumns = storedColumns.map((col) => {
        const baseColDef: ColDef = {
            field: col.name,
            headerName: col.name,
            type: col.type,
            filter: true,
            cellEditorParams: col.options,
            cellRendererParams: col.options
        };
        return baseColDef;
    });

    return [...initialColDefs, ...enhancedColumns];
};