import { ColDef } from 'ag-grid-community';
import { useState } from 'react';
import { getColumnsFromStorage } from '../../helpers/getColumnsFromStorage/getColumnsFromStorage';

export const useColumns = () => {
    const [colDefs, setColDefs] = useState<ColDef[]>(getColumnsFromStorage); 

    const reFetchColumns = () => {
        const updatedColDefs = getColumnsFromStorage();
        setColDefs(updatedColDefs); 
    };

    const addColumn = (name: string, type: string, options?: unknown) => {

        const existingColumns = JSON.parse(localStorage.getItem('columns') || '[]');
        const updatedColumns = [...existingColumns, { name, type, options }];
        localStorage.setItem('columns', JSON.stringify(updatedColumns));

        reFetchColumns();
    };

    const resetColumns = () => {
        localStorage.removeItem('columns');
        reFetchColumns();
    };

    return {
      colDefs,
      addColumn,
      resetColumns,
      reFetchColumns
    };
};