import { IAutoCompleteListItem } from './AutoComplete.interface';
import { EnumInputType } from '../Enums/Form.enum';


export interface FormControl<ConfigType> {
    label: string;
    type: EnumInputType;
    config: Config<ConfigType>;
    value: any;
    change: any;
    valid: boolean;
    touched: boolean;
    validation: IValidation;
    list: IAutoCompleteListItem[];
    extraFunctions: any;
}

export interface IValidation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}


export interface Config<ConfigType> {
    type: ConfigType;
    placeholder: string;
    name: string;
    label: string;
    options?: Option[];
}

export interface Option {
    value: any;
    displayName: string;
}

