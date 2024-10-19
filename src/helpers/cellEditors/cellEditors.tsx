import { CustomCellEditorProps, CustomCellRendererProps } from 'ag-grid-react';
import NumberInput from '../../components/Number/NumberInput/NumberInput';
import CurrencyInput from '../../components/Currency/CurrencyInput/CurrencyInput';
import DateInput from '../../components/Date/DateInput/DateInput';
import { OptionItem, SingleSelectField } from '../../components/OptionFields/SingleSelectField/SingleSelectField';
import { NumberField } from '../../components/OptionFields/NumberField/NumberField';
import { CurrencyField } from '../../components/OptionFields/CurrencyField/CurrencyField';
import { DateField } from '../../components/OptionFields/DateField/DateField';
import SingleSelectDisplay from '../../components/SingleSelect/SingleSelectDisplay/SingleSelectDisplay';
import NumberDisplay from '../../components/Number/NumberDisplay/NumberDisplay'; 
import CurrencyDisplay from '../../components/Currency/CurrencyDisplay/CurrencyDisplay'; 
import DateDisplay from '../../components/Date/DateDisplay/DateDisplay'; 
import SingleSelectInput from '../../components/SingleSelect/SingleSelectInput/SingleSelectInput';
import SingleLineTextInput from '../../components/SingleLineText/SingleLineTextInput/SingleLineTextInput';
import SingleLineTextDisplay from '../../components/SingleLineText/SingleLineTextDisplay/SingleLineTextDisplay';
import { FormInstance } from 'antd';

interface CustomEditorParams extends CustomCellEditorProps {
    options?: OptionItem[]; 
    precision?: number; 
    currencyType?: string;
    dateFormat?: string; 
}

interface CustomRenderParams extends CustomCellRendererProps {
    options?: OptionItem[]; 
    precision?: number; 
    currencyType?: string;
    dateFormat?: string; 
}

const cellEditors = [
  {
    title: 'SingleLineText',
    component: (params: CustomEditorParams) => <SingleLineTextInput {...params} />,
    renderOptions: () => null,
    renderCell: (params: CustomRenderParams) => (
      <SingleLineTextDisplay value={params.value} />
    )
  },
  {
    title: 'SingleSelect',
    component: (params: CustomEditorParams) => (
      <SingleSelectInput
        value={params.value}
        onChange={(value: string) => params.onValueChange(value)}
        options={params.options || []} 
      />
    ),
    requiresForm: true,
    renderOptions: (form: FormInstance) => (
      <SingleSelectField form={form} />
    ),
    renderCell: (params: CustomRenderParams) => (
      <SingleSelectDisplay value={params.value} options={params.options || []} />
    )
  },
  {
    title: 'Number',
    component: (params: CustomEditorParams) => (
      <NumberInput 
        value={params.value}
        onChange={(value: number | null) => params.onValueChange(value)}
        precision={params.precision} 
      />
    ),
    renderOptions: () => (
      <NumberField />
    ),
    renderCell: (params: CustomRenderParams) => (
      <NumberDisplay value={params.value} precision={params.precision} />
    )
  },
  {
    title: 'Currency',
    component: (params: CustomEditorParams) => (
      <CurrencyInput 
        value={params.value}
        onChange={(value: number | null) => params.onValueChange(value)}
        precision={params?.precision || 1}
        currencyType={params?.currencyType || '$'} 
      />
    ),
    renderOptions: () => (
      <CurrencyField />
    ),
    renderCell: (params: CustomRenderParams) => (<CurrencyDisplay value={params.value} precision={params.precision} currencyType={params.currencyType || '$'} />)
  },
  {
    title: 'Date',
    component: (params: CustomEditorParams) => (
      <DateInput 
        value={params.value}
        onChange={(value: string | null) => params.onValueChange(value)}
        dateFormat={params?.dateFormat || 'MMM DD, YYYY'} 
      />
    ),
    renderOptions: () => (
      <DateField />
    ),
    renderCell: (params: CustomRenderParams) => (
      <DateDisplay value={params.value} dateFormat={params.dateFormat || 'MMM DD, YYYY'} />
    )
  }
];

export default cellEditors;